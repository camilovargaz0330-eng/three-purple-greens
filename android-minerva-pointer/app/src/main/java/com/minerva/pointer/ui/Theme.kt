package com.minerva.pointer.ui

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val Rojo = Color(0xFFD3121A)
val Azul = Color(0xFF203764)
val Oro = Color(0xFFFFC107)

private val DarkColors = darkColorScheme(
    primary = Rojo,
    secondary = Oro,
    background = Color(0xFF0D1220),
    surface = Color(0xFF181E2E),
    onBackground = Color(0xFFE8ECF4),
    onSurface = Color(0xFFE8ECF4)
)

private val LightColors = lightColorScheme(
    primary = Rojo,
    secondary = Azul,
    background = Color(0xFFEEF1F6),
    surface = Color(0xFFFFFFFF),
    onBackground = Color(0xFF1A2234),
    onSurface = Color(0xFF1A2234)
)

/** Stage (drawing surface) and grid colors for a given theme. */
val stageDark = Color(0xFF0A0E1A)
val stageLight = Color(0xFFF3F5FA)

@Composable
fun MinervaTheme(content: @Composable () -> Unit) {
    val dark = isSystemInDarkTheme()
    MaterialTheme(
        colorScheme = if (dark) DarkColors else LightColors,
        content = content
    )
}
