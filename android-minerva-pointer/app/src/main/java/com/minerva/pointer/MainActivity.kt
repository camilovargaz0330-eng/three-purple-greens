package com.minerva.pointer

import android.os.Bundle
import android.view.MotionEvent
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.systemBars
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Slider
import androidx.compose.material3.Surface
import androidx.compose.material3.Switch
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.ExperimentalComposeUiApi
import androidx.compose.ui.input.pointer.pointerInteropFilter
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.minerva.pointer.ui.MinervaTheme
import com.minerva.pointer.ui.stageDark
import com.minerva.pointer.ui.stageLight
import androidx.compose.foundation.isSystemInDarkTheme
import kotlin.math.cos
import kotlin.math.sin

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MinervaTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    PointerApp()
                }
            }
        }
    }
}

@Composable
fun PointerApp() {
    val engine = remember { PointerEngine() }
    val configuration = LocalConfiguration.current
    val wide = configuration.screenWidthDp >= 720

    // Drive the simulation at the display's frame cadence.
    LaunchedEffect(Unit) {
        while (true) {
            androidx.compose.runtime.withFrameNanos { engine.step() }
        }
    }

    if (wide) {
        Row(Modifier.fillMaxSize()) {
            Stage(engine, Modifier.weight(1f).fillMaxHeight())
            ControlRail(
                engine,
                Modifier
                    .width(340.dp)
                    .fillMaxHeight()
                    .windowInsetsPadding(WindowInsets.systemBars)
            )
        }
    } else {
        Column(Modifier.fillMaxSize()) {
            Stage(engine, Modifier.weight(1f).fillMaxWidth())
            ControlRail(
                engine,
                Modifier
                    .fillMaxWidth()
                    .height((configuration.screenHeightDp * 0.5f).dp)
                    .windowInsetsPadding(WindowInsets.systemBars)
            )
        }
    }
}

@OptIn(ExperimentalComposeUiApi::class)
@Composable
fun Stage(engine: PointerEngine, modifier: Modifier = Modifier) {
    val dark = isSystemInDarkTheme()
    val stage = if (dark) stageDark else stageLight
    val gridColor = if (dark) Color(0x0DFFFFFF) else Color(0x0F203764)
    val strokeColor = Color(MinervaPalette[engine.colorIndex.value])

    Box(modifier.background(stage).fillMaxSize()) {
        Canvas(
            Modifier
                .fillMaxSize()
                // Raw MotionEvent so we can read stylus pressure and tilt,
                // which Compose's gesture detectors do not expose.
                .pointerInteropFilter { ev ->
                    when (ev.actionMasked) {
                        MotionEvent.ACTION_DOWN,
                        MotionEvent.ACTION_MOVE,
                        MotionEvent.ACTION_UP -> {
                            val i = ev.actionIndex.coerceIn(0, ev.pointerCount - 1)
                            val isStylus =
                                ev.getToolType(i) == MotionEvent.TOOL_TYPE_STYLUS
                            engine.hasStylus.value = isStylus
                            // Tilt axis is radians 0..PI/2; normalize to 0..1.
                            val tiltRad = ev.getAxisValue(MotionEvent.AXIS_TILT, i)
                            val tilt01 = (tiltRad / (Math.PI.toFloat() / 2f)).coerceIn(0f, 1f)
                            val pressure = ev.getPressure(i).coerceIn(0f, 1f)
                            engine.setTarget(ev.getX(i), ev.getY(i), pressure, tilt01)
                            true
                        }
                        else -> false
                    }
                }
        ) {
            // faint grid
            val g = 44.dp.toPx()
            var x = g
            while (x < size.width) {
                drawLine(gridColor, Offset(x, 0f), Offset(x, size.height), 1f)
                x += g
            }
            var y = g
            while (y < size.height) {
                drawLine(gridColor, Offset(0f, y), Offset(size.width, y), 1f)
                y += g
            }

            val pts = engine.trail
            val mode = engine.mode.value
            val count = pts.size

            if (count >= 2 && mode != EffectMode.ORBIT) {
                for (i in 1 until count) {
                    val p0 = pts[i - 1]
                    val p1 = pts[i]
                    val frac = i.toFloat() / count
                    val a = frac * frac
                    // Both modes carry the point's pressure/tilt-aware width;
                    // RIBBON keeps full body, LINE tapers toward the tail.
                    val w = if (mode == EffectMode.RIBBON) p1.width else p1.width * frac
                    drawLine(
                        color = strokeColor.copy(alpha = 0.15f + a * 0.85f),
                        start = Offset(p0.x, p0.y),
                        end = Offset(p1.x, p1.y),
                        strokeWidth = w.coerceAtLeast(0.5f),
                        cap = StrokeCap.Round
                    )
                }
            } else if (mode == EffectMode.ORBIT) {
                for (j in 0 until count) {
                    val p = pts[j]
                    val fr = j.toFloat() / count.coerceAtLeast(1)
                    val ang = j * 0.6f + (System.nanoTime() / 1_000_000L) * 0.004f
                    val rad = (1f - fr) * 26f + 2f
                    val px = p.x + cos(ang) * rad * 0.4f
                    val py = p.y + sin(ang) * rad * 0.4f
                    drawCircle(
                        color = strokeColor.copy(alpha = 0.1f + fr * 0.8f),
                        radius = (p.width * 0.4f * fr).coerceAtLeast(1f),
                        center = Offset(px, py)
                    )
                }
            }

            // pen head — scaled by live pressure so a hard press reads bigger
            engine.tip?.let { t ->
                val r = (engine.baseWidth.value * (0.35f + engine.livePressure.value * 0.6f))
                    .coerceAtLeast(3f)
                drawCircle(strokeColor.copy(alpha = 0.95f), r, t)
                drawCircle(
                    color = strokeColor.copy(alpha = 0.4f),
                    radius = r + 6f,
                    center = t,
                    style = Stroke(width = 1.5f)
                )
            }
        }

        Column(Modifier.align(Alignment.TopStart).padding(18.dp)) {
            Text(
                "Minerva Pointer",
                fontSize = 26.sp,
                fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.onBackground
            )
            Text(
                "MOTOR DE FÍSICA · S PEN LIBRE",
                fontSize = 10.sp,
                letterSpacing = 2.sp,
                fontFamily = FontFamily.Monospace,
                color = MaterialTheme.colorScheme.onBackground.copy(alpha = 0.6f)
            )
            Spacer(Modifier.height(6.dp))
            val p = (engine.livePressure.value * 100).toInt()
            val tDeg = (engine.liveTilt.value * 90).toInt()
            val src = if (engine.hasStylus.value) "S PEN" else "DEDO"
            Text(
                "$src · PRESIÓN $p% · INCLINACIÓN $tDeg°",
                fontSize = 11.sp,
                fontFamily = FontFamily.Monospace,
                color = MaterialTheme.colorScheme.primary
            )
        }
    }
}

@Composable
fun ControlRail(engine: PointerEngine, modifier: Modifier = Modifier) {
    Surface(modifier, color = MaterialTheme.colorScheme.surface) {
        Column(
            Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(18.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text("Ajustes del trazo", fontSize = 18.sp, fontWeight = FontWeight.Bold,
                color = MaterialTheme.colorScheme.primary)

            Group("FÍSICA DEL SEGUIMIENTO") {
                SliderRow("Rigidez del resorte", engine.stiffness.value, 0.02f, 0.5f) {
                    engine.stiffness.value = it
                }
                SliderRow("Amortiguación", engine.damping.value, 0.5f, 0.95f) {
                    engine.damping.value = it
                }
                SliderRow("Estela (puntos)", engine.trailLength.value.toFloat(), 2f, 60f) {
                    engine.trailLength.value = it.toInt()
                }
            }

            Group("EFECTO VISUAL") {
                ModeRow(engine)
                SliderRow("Grosor base", engine.baseWidth.value, 1f, 26f) {
                    engine.baseWidth.value = it
                }
                SliderRow("Reacción a velocidad", engine.reaction.value, 0f, 1f) {
                    engine.reaction.value = it
                }
            }

            Group("S PEN") {
                SliderRow("Sensibilidad a presión", engine.pressureSensitivity.value, 0f, 1f) {
                    engine.pressureSensitivity.value = it
                }
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Switch(
                        checked = engine.tiltAffectsWidth.value,
                        onCheckedChange = { engine.tiltAffectsWidth.value = it }
                    )
                    Spacer(Modifier.width(10.dp))
                    Text("Inclinación ensancha el trazo", color = MaterialTheme.colorScheme.onSurface)
                }
                Text(
                    "Presión e inclinación se leen del MotionEvent real del S Pen. " +
                        "Con el dedo, la presión suele reportarse como 100% y la inclinación 0°.",
                    fontSize = 11.sp,
                    color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
                )
            }

            Group("COLOR DEL TRAZO") {
                SwatchRow(engine)
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Switch(checked = engine.glow.value, onCheckedChange = { engine.glow.value = it })
                    Spacer(Modifier.width(10.dp))
                    Text("Resplandor", color = MaterialTheme.colorScheme.onSurface)
                }
            }

            OutlinedButton(onClick = { engine.clear() }, modifier = Modifier.fillMaxWidth()) {
                Text("Limpiar lienzo")
            }

            Text(
                "Código original de Minerva. Replica solo la mecánica " +
                    "(puntero con resorte, inercia y estela reactiva); no reutiliza binario ni assets ajenos.",
                fontSize = 11.sp,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f)
            )
        }
    }
}

@Composable
private fun Group(label: String, content: @Composable () -> Unit) {
    Card(
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surface),
        border = androidx.compose.foundation.BorderStroke(1.dp, MaterialTheme.colorScheme.outline.copy(alpha = 0.4f)),
        shape = RoundedCornerShape(12.dp)
    ) {
        Column(Modifier.padding(14.dp), verticalArrangement = Arrangement.spacedBy(12.dp)) {
            Text(label, fontSize = 10.sp, letterSpacing = 2.sp,
                fontFamily = FontFamily.Monospace,
                color = MaterialTheme.colorScheme.onSurface.copy(alpha = 0.6f))
            content()
        }
    }
}

@Composable
private fun SliderRow(label: String, value: Float, min: Float, max: Float, onChange: (Float) -> Unit) {
    Column {
        Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceBetween) {
            Text(label, fontSize = 13.sp, color = MaterialTheme.colorScheme.onSurface)
            Text(
                String.format("%.2f", value),
                fontSize = 12.sp,
                fontFamily = FontFamily.Monospace,
                color = MaterialTheme.colorScheme.primary
            )
        }
        Slider(value = value, onValueChange = onChange, valueRange = min..max)
    }
}

@Composable
private fun ModeRow(engine: PointerEngine) {
    Row(Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(6.dp)) {
        EffectMode.values().forEach { m ->
            val selected = engine.mode.value == m
            val label = when (m) {
                EffectMode.LINE -> "Línea"
                EffectMode.RIBBON -> "Cinta"
                EffectMode.ORBIT -> "Órbita"
            }
            if (selected) {
                Button(onClick = { engine.mode.value = m }, modifier = Modifier.weight(1f)) {
                    Text(label, fontSize = 12.sp)
                }
            } else {
                OutlinedButton(onClick = { engine.mode.value = m }, modifier = Modifier.weight(1f)) {
                    Text(label, fontSize = 12.sp)
                }
            }
        }
    }
}

@Composable
private fun SwatchRow(engine: PointerEngine) {
    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        MinervaPalette.forEachIndexed { i, c ->
            val sel = engine.colorIndex.value == i
            Box(
                Modifier
                    .size(30.dp)
                    .background(Color(c), CircleShape)
                    .border(
                        width = if (sel) 2.dp else 0.dp,
                        color = MaterialTheme.colorScheme.onSurface,
                        shape = CircleShape
                    )
                    .clickable { engine.colorIndex.value = i }
            )
        }
    }
}
