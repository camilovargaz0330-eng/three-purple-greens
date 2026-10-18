package com.minerva.pointer

import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.geometry.Offset
import kotlin.math.hypot
import kotlin.math.max

/** One sample along the trail: where the pen tip was and how wide to draw it. */
data class TrailPoint(val x: Float, val y: Float, val width: Float)

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

    val trail = mutableStateListOf<TrailPoint>()

    private var tipX = 0f
    private var tipY = 0f
    private var velX = 0f
    private var velY = 0f
    private var targetX = 0f
    private var targetY = 0f
    private var engaged = false
    private var smoothedSpeed = 0f

    /** Last tip position, for drawing the head. Null until the first touch. */
    var tip: Offset? = null
        private set

    fun setTarget(x: Float, y: Float) {
        targetX = x
        targetY = y
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
        val w = max(0.6f, baseWidth.value * reactW)

        trail.add(TrailPoint(tipX, tipY, w))
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
