# Despliegue de Three Purple Greens - Guía Completa 🚀

**Status**: Tu aplicación está lista para desplegar  
**Tiempo estimado**: 30-40 minutos  
**Complejidad**: Muy fácil (solo hacer clic en botones)

---

## 🎯 Objetivo Final

Después de completar esta guía, tendrás:
- ✅ Tu página web en `https://tudominio.vercel.app` (accesible desde cualquier dispositivo)
- ✅ Tu API backend en Railway (procesando órdenes)
- ✅ Base de datos MongoDB en la nube (guardando productos y pedidos)
- ✅ WhatsApp checkout funcionando en producción

---

## 📋 PASO 1: Crear Repositorio en GitHub

### 1.1 Ir a GitHub

Abre tu navegador y ve a:
```
https://github.com/new
```

### 1.2 Crear Repositorio

1. **Repository name**: `three-purple-greens`
2. **Description**: `E-commerce platform for Three Purple Greens with WhatsApp checkout`
3. **Public** ✅ (selecciona esta opción)
4. Haz clic en **"Create repository"**

### 1.3 Copiar la URL

Después de crear, verás:
```
https://github.com/YOUR_USERNAME/three-purple-greens.git
```

Copia esta URL (la necesitarás luego).

---

## 📤 PASO 2: Subir Código a GitHub

Abre PowerShell en la carpeta del proyecto:

```powershell
cd "C:\Users\jcami\OneDrive\Documentos\TPG\web\uploads\three-purple-greens"
```

Ejecuta estos comandos:

```powershell
# Verificar que Git está listo
git status

# Configurar remote (reemplaza con tu URL)
git remote add origin https://github.com/YOUR_USERNAME/three-purple-greens.git

# Cambiar rama a main
git branch -M main

# Subir el código
git push -u origin main
```

✅ **Listo!** Tu código está en GitHub.

---

## 🗄️ PASO 3: Configurar MongoDB Atlas (Base de Datos)

### 3.1 Abrir MongoDB Atlas

Ve a:
```
https://www.mongodb.com/cloud/atlas
```

### 3.2 Crear Cuenta

1. Haz clic en **"Try Free"**
2. Completa el formulario:
   - Email: tu@email.com
   - Contraseña: una segura
3. Verifica tu email
4. Inicia sesión

### 3.3 Crear Proyecto

1. Haz clic en **"New Project"**
2. Nombre del proyecto: `three-purple-greens`
3. Haz clic en **"Create Project"**

### 3.4 Crear Cluster

1. Haz clic en **"Create"**
2. Elige **"FREE"** (M0 - completamente gratis)
3. **Cloud Provider & Region**:
   - Proveedor: AWS
   - Región: elige la más cercana a Colombia/México (us-east-1)
4. Haz clic en **"Create"**
5. Espera 2-3 minutos a que se cree

### 3.5 Crear Usuario de Base de Datos

1. Ve a **"Security"** → **"Database Access"**
2. Haz clic en **"Add New Database User"**
3. Completa:
   - **Username**: `tpg_admin`
   - **Password**: `Mi2024TPGSecura!` (copia esto en un lugar seguro)
   - **Built-in Role**: `Atlas Admin`
4. Haz clic en **"Add User"**

### 3.6 Obtener Connection String

1. Ve a **"Deployment"** → **"Clusters"**
2. Haz clic en **"Connect"** (botón gris)
3. Selecciona **"Connect your application"**
4. Driver: **Node.js**
5. Copia el connection string:

```
mongodb+srv://tpg_admin:PASSWORD@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Modifica:**
- Reemplaza `PASSWORD` por `Mi2024TPGSecura!`
- Agrega `/tpg` al final: `/tpg?retryWrites=true&w=majority`

**Resultado final:**
```
mongodb+srv://tpg_admin:Mi2024TPGSecura!@cluster0.abc123.mongodb.net/tpg?retryWrites=true&w=majority
```

**⚠️ Guarda esta URL** - la necesitarás en 10 minutos.

### 3.7 Permitir Acceso desde Internet

1. Ve a **"Security"** → **"Network Access"**
2. Haz clic en **"Add IP Address"**
3. En la ventana, selecciona **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Haz clic en **"Confirm"**

✅ **MongoDB está listo!**

---

## 🚀 PASO 4: Desplegar Backend en Railway

### 4.1 Abrir Railway

Ve a:
```
https://railway.app
```

### 4.2 Crear Cuenta

1. Haz clic en **"Start Project"**
2. Selecciona **"Continue with GitHub"**
3. Autoriza Railway para acceder a tu GitHub

### 4.3 Crear Nuevo Proyecto

1. Haz clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Busca y selecciona: `three-purple-greens`
4. Haz clic en **"Deploy Now"**

Railway empezará a hacer deploy (tarda 3-5 minutos).

### 4.4 Configurar Variables de Entorno

Mientras espera que se haga deploy:

1. En la ventana de Railway, haz clic en **"Add Variable"**
2. Agrega estas variables:

```
PORT = 5000
NODE_ENV = production
DATABASE_URL = mongodb+srv://tpg_admin:Mi2024TPGSecura!@cluster0.abc123.mongodb.net/tpg?retryWrites=true&w=majority
JWT_SECRET = tu-clave-super-secreta-cambiar-en-produccion
WHATSAPP_PHONE = 573001234567
```

**IMPORTANTE**: Reemplaza:
- `DATABASE_URL` con la que copiaste de MongoDB
- `WHATSAPP_PHONE` con el número real de WhatsApp de TPG

### 4.5 Verificar que está Deployado

1. Espera a que termine el deploy (Railway te lo indicará)
2. Ve a la sección **"Domains"**
3. Verás una URL como: `https://three-purple-greens-production-abc123.up.railway.app`
4. Copia esta URL (**la necesitarás en 5 minutos**)

**Para verificar que funciona**, abre en el navegador:
```
https://your-railway-url.up.railway.app/api/health
```

Deberías ver:
```json
{"status":"Server running","timestamp":"2026-07-01T..."}
```

✅ **Backend está vivo!**

---

## 🌐 PASO 5: Desplegar Frontend en Vercel

### 5.1 Abrir Vercel

Ve a:
```
https://vercel.com
```

### 5.2 Crear Cuenta

1. Haz clic en **"Sign Up"**
2. Selecciona **"Continue with GitHub"**
3. Autoriza Vercel

### 5.3 Importar Proyecto

1. Haz clic en **"Add New..."**
2. Selecciona **"Project"**
3. Busca `three-purple-greens` en tu lista de repositorios
4. Haz clic en **"Import"**

### 5.4 Configurar Variables de Entorno

Antes de hacer deploy:

1. Desplázate a **"Environment Variables"**
2. Agrega estas 2 variables:

```
VITE_API_BASE_URL = https://your-railway-url.up.railway.app
VITE_WHATSAPP_PHONE = 573001234567
```

**IMPORTANTE**: Reemplaza `your-railway-url` con la URL de Railway que copiaste (sin https:// ni .up.railway.app).

Ejemplo:
```
VITE_API_BASE_URL = https://three-purple-greens-production-abc123.up.railway.app
```

### 5.5 Hacer Deploy

1. Haz clic en **"Deploy"**
2. Espera 2-3 minutos a que compile

### 5.6 Tu Dominio

Vercel te asignará automáticamente un dominio como:
```
https://three-purple-greens-omega.vercel.app
```

✅ **Frontend está vivo!**

---

## ✅ PASO 6: Verificar que Todo Funciona

### 6.1 Abrir tu Aplicación

Abre en el navegador tu URL de Vercel:
```
https://three-purple-greens-omega.vercel.app
```

Deberías ver:
- ✅ La página de Three Purple Greens
- ✅ El age gate (verificación de edad)
- ✅ El catálogo de productos

### 6.2 Probar el Checkout

1. Haz clic en "Estoy dentro" (edad verificada)
2. Agrega un producto al carrito
3. Abre el carrito (ícono de carrito arriba)
4. Haz clic en **"Proceder al Pago en WhatsApp"**
5. Debería abrirse un modal pidiendo email y teléfono
6. **Importante**: Verifica en la consola del navegador (F12) que NO hay errores

### 6.3 Verificar Backend

Abre esta URL en el navegador:
```
https://your-railway-url.up.railway.app/api/health
```

Debería ver JSON con estado del servidor.

---

## 🎉 ¡LISTO! Ahora tienes:

| Componente | URL | Estado |
|-----------|-----|--------|
| **Frontend** | https://three-purple-greens-omega.vercel.app | ✅ En vivo |
| **Backend** | https://your-railway-url.up.railway.app | ✅ En vivo |
| **Base de Datos** | MongoDB Atlas | ✅ En vivo |

---

## 📱 Acceso desde Otros Dispositivos

Tu aplicación está lista para usar desde:
- ✅ Computadora (Windows, Mac, Linux)
- ✅ Tablet
- ✅ Teléfono
- ✅ Cualquier dispositivo con navegador

Solo abre:
```
https://three-purple-greens-omega.vercel.app
```

---

## 🆘 Troubleshooting

### "No se conecta con el backend"

**Solución**:
1. Verifica en F12 → Console los errores CORS
2. Verifica que `VITE_API_BASE_URL` es correcto en Vercel
3. Redeploy Vercel: Ve a "Deployments" → haz clic en los 3 puntos → "Redeploy"

### "MongoDB error"

**Solución**:
1. Verifica que la `DATABASE_URL` es correcta en Railway
2. Verifica que permitiste acceso desde 0.0.0.0/0 en MongoDB Atlas
3. Revisa los logs en Railway: Settings → Logs

### "El servidor de Railway no inicia"

**Solución**:
1. Ve a Railway → Settings → Logs
2. Busca mensajes de error
3. Verifica que todas las variables de entorno están completas

---

## 🔗 Próximos Pasos

Ahora que tienes la aplicación en vivo:

1. **Agregar Productos Reales**
   - Usa la API o crea un admin panel
   - Endpoint: `POST https://your-railway-url.up.railway.app/api/products`

2. **Personalizar Dominio** (Opcional)
   - En Vercel: Settings → Domains
   - En Railway: Settings → Domains

3. **Monitorear la App**
   - Vercel: Analytics
   - Railway: Logs & Metrics

4. **Test Completo**
   - Prueba el checkout en producción
   - Verifica que los pedidos se guardan en MongoDB

---

## 📞 Soporte

Si algo no funciona:
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- MongoDB Docs: https://docs.mongodb.com

---

## 🎓 Lo que Acabas de Hacer

✨ Has construido y desplegado:
- Aplicación React moderna
- Servidor Express con API RESTful
- Integración WhatsApp para checkout
- Base de datos MongoDB en la nube
- Todo automatizado y escalable

**¡Felicidades!** 🎉

