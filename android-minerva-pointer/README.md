# Minerva Pointer

App Android nativa (Kotlin + Jetpack Compose) que implementa un **puntero con
física**: un resorte con inercia y amortiguación persigue el dedo o el S Pen, y
deja una estela cuyo grosor reacciona a la velocidad del trazo.

Código **original**. Reproduce únicamente la *mecánica* (concepto), no el
binario ni los recursos de ninguna app de terceros.

## Qué incluye

- `PointerEngine.kt` — modelo de física (resorte, inercia, estela, reacción a velocidad).
- `MainActivity.kt` — UI Compose: lienzo `Canvas` + panel de ajustes.
- 3 efectos: **Línea**, **Cinta** (grosor variable), **Órbita** (partículas).
- Ajustes en vivo: rigidez, amortiguación, longitud de estela, grosor, reacción, color, resplandor.
- Tema claro/oscuro automático y edge-to-edge.

## Requisitos de compilación

- Android Studio (Ladybug o posterior) **o** línea de comandos con el Android SDK.
- JDK 17.
- `compileSdk` 34 · `minSdk` 26 · `targetSdk` 34.

> El SDK de Android no se pudo instalar en el entorno de la sesión (el proxy
> bloquea `dl.google.com`). La compilación se hace en tu equipo.

## Compilar el APK

```bash
cd android-minerva-pointer

# 1) Indica dónde está tu Android SDK (una vez):
echo "sdk.dir=/ruta/a/tu/Android/Sdk" > local.properties

# 2) APK de depuración (instalable directo en la tablet):
./gradlew assembleDebug
#   -> app/build/outputs/apk/debug/app-debug.apk

# 3) APK de release (requiere firma para publicar):
./gradlew assembleRelease
```

## Instalar en la tablet

Con depuración USB activada y `adb` disponible:

```bash
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

O copia el `app-debug.apk` a la tablet y ábrelo (permite "instalar apps
desconocidas").

## Abrir en Android Studio

`File > Open` y selecciona la carpeta `android-minerva-pointer/`. Deja que
Gradle sincronice; luego `Run` sobre tu dispositivo o un emulador.
