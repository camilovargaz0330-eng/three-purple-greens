package com.minerva.pointer

import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.geometry.Offset
import kotlin.math.hypot
import kotlin.math.max

/** One sample along the trail: tip position, draw width, and the sensor
 *  values captured at that moment (pressure 0..1, tilt 0..1). */
data class TrailPoint(
    val x: Float,
    val y: Float,
    val width: Float,
    val pressure: Float,
    val tilt: Float
)

/** Visual treatments for the trail. */
enum class EffectMode { LINE, RIBBON, ORBIT }

/**
 * Original physics model for a spring-chased pen tip.
 *
 * The finger/stylus sets a [target]; the tip accelerates toward it under a
 * spring (stiffness) with velocity decay (damping), so fast strokes overshoot
 * and settle. Stroke width reacts to tip speed by [reaction].
 */
class PointerEngine {

    // Tunables, surfaced to the UI as observable state.
    var stiffness = mutableStateOf(0.18f)
    var damping = mutableStateOf(0.75f)
    var trailLength = mutableStateOf(26)
    var baseWidth = mutableStateOf(9f)
    var reaction = mutableStateOf(0.6f)
    var mode = mutableStateOf(EffectMode.LINE)
    var glow = mutableStateOf(true)
    var colorIndex = mutableStateOf(0)
    var pressureSensitivity = mutableStateOf(0.7f)
    var tiltAffectsWidth = mutableStateOf(true)

    val trail = mutableStateListOf<TrailPoint>()

    // Live sensor readouts, surfaced for the on-screen HUD.
    var livePressure = mutableStateOf(0f)
    var liveTilt = mutableStateOf(0f)
    var hasStylus = mutableStateOf(false)

    private var tipX = 0f
    private var tipY = 0f
    private var velX = 0f
    private var velY = 0f
    private var targetX = 0f
    private var targetY = 0f
    private var engaged = false
    private var smoothedSpeed = 0f
    private var pressure = 1f   // 0..1
    private var tilt = 0f       // 0..1 (0 perpendicular, 1 flat)

    /** Last tip position, for drawing the head. Null until the first touch. */
    var tip: Offset? = null
        private set

    /**
     * @param pressure normalized 0..1 (finger reports ~1).
     * @param tilt normalized 0..1 from the stylus tilt axis.
     */
    fun setTarget(x: Float, y: Float, pressure: Float = 1f, tilt: Float = 0f) {
        targetX = x
        targetY = y
        this.pressure = pressure.coerceIn(0f, 1f)
        this.tilt = tilt.coerceIn(0f, 1f)
        livePressure.value = this.pressure
        liveTilt.value = this.tilt
        if (!engaged) {
            tipX = x; tipY = y
            engaged = true
        }
    }

    fun center(x: Float, y: Float) {
        tipX = x; tipY = y; targetX = x; targetY = y
        velX = 0f; velY = 0f
    }

    fun clear() = trail.clear()

    fun reset() {
        engaged = false
        velX = 0f; velY = 0f
        trail.clear()
        tip = null
    }

    /** Advance the simulation one frame. */
    fun step() {
        if (!engaged) return

        val ax = (targetX - tipX) * stiffness.value
        val ay = (targetY - tipY) * stiffness.value
        velX = (velX + ax) * damping.value
        velY = (velY + ay) * damping.value
        tipX += velX
        tipY += velY

        val speed = hypot(velX, velY)
        smoothedSpeed += (speed - smoothedSpeed) * 0.25f

        val reactW = 1f + (smoothedSpeed * 0.14f - 0.5f) * reaction.value

        // Pressure thickens the stroke, scaled by sensitivity (1.0 -> full range).
        val s = pressureSensitivity.value
        val pFactor = (1f - s) + s * (0.2f + pressure * 1.6f)

        // Flatter tilt spreads the nib wider, like a chisel edge.
        val tFactor = if (tiltAffectsWidth.value) 1f + tilt * 1.4f else 1f

        val w = max(0.6f, baseWidth.value * reactW * pFactor * tFactor)

        trail.add(TrailPoint(tipX, tipY, w, pressure, tilt))
        while (trail.size > trailLength.value) trail.removeAt(0)

        tip = Offset(tipX, tipY)
    }
}

/** Minerva stroke palette (ARGB). */
val MinervaPalette = listOf(
    0xFFD3121A.toInt(), // rojo
    0xFF203764.toInt(), // azul
    0xFFFFC107.toInt(), // oro
    0xFF1DB9A0.toInt(), // teal
    0xFF9B5DE5.toInt(), // violeta
    0xFFF1F3F8.toInt()  // claro
)
