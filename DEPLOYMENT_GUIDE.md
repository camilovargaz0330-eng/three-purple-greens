# Three Purple Greens - Deployment Guide

## 📋 Overview

Esta guía te llevará paso a paso a desplegar tu aplicación completa:
- **Frontend**: Vercel (https://vercel.com)
- **Backend**: Railway (https://railway.app)
- **Base de Datos**: MongoDB Atlas (https://www.mongodb.com/cloud/atlas)

**Tiempo estimado**: 20-30 minutos

---

## Step 1: Preparar el Código

### 1.1 Push a GitHub

Primero, sube el código a GitHub:

```bash
cd C:\Users\jcami\OneDrive\Documentos\TPG\web\uploads\three-purple-greens

# Inicializar Git
git init

# Agregar archivos
git add .

# Commit
git commit -m "Initial commit: TPG e-commerce platform with WhatsApp checkout"

# Crear repositorio en GitHub
# Ve a https://github.com/new y crea un repositorio llamado "three-purple-greens"

# Agregar remote
git remote add origin https://github.com/YOUR_USERNAME/three-purple-greens.git

# Push
git branch -M main
git push -u origin main
```

---

## Step 2: MongoDB Atlas Setup

### 2.1 Crear Cuenta y Cluster

1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea cuenta o inicia sesión
3. Crea un nuevo proyecto llamado "TPG"
4. Haz clic en "Create" para crear un cluster
5. Selecciona el plan "FREE" (M0)
6. Elige región: "AWS" + "us-east-1" (o la más cercana)
7. Crea el cluster

### 2.2 Configurar Acceso

1. Ve a "Network Access"
2. Haz clic en "Add IP Address"
3. Selecciona "Allow Access from Anywhere" (0.0.0.0/0)
4. Confirma

### 2.3 Crear Usuario de Base de Datos

1. Ve a "Database Access"
2. Haz clic en "Add New Database User"
3. Elige "Password" como autenticación
4. Username: `tpg_admin`
5. Password: `GeneraUnaClave123Segura!` (guarda esto)
6. Database User Privileges: "Atlas Admin"
7. Crea el usuario

### 2.4 Obtener Connection String

1. Ve a "Clusters"
2. Haz clic en "Connect"
3. Selecciona "Connect your application"
4. Elige "Driver: Node.js"
5. Copia el connection string:
```
mongodb+srv://tpg_admin:PASSWORD@cluster0.xxxxx.mongodb.net/tpg?retryWrites=true&w=majority
```

Reemplaza:
- `PASSWORD` con la contraseña que creaste
- Cambia `/` al final a `/tpg`

**Ejemplo:**
```
mongodb+srv://tpg_admin:GeneraUnaClave123Segura!@cluster0.abc123.mongodb.net/tpg?retryWrites=true&w=majority
```

---

## Step 3: Deploy Backend a Railway

### 3.1 Crear Cuenta en Railway

1. Ve a https://railway.app
2. Haz clic en "Start Project"
3. Inicia sesión con GitHub (recomendado)

### 3.2 Crear Proyecto

1. Haz clic en "New Project"
2. Selecciona "Deploy from GitHub repo"
3. Conecta tu cuenta GitHub
4. Selecciona el repositorio `three-purple-greens`

### 3.3 Configurar Variables de Entorno

En Railway, en la sección "Variables":

```
PORT=5000
NODE_ENV=production
DATABASE_URL=mongodb+srv://tpg_admin:GeneraUnaClave123Segura!@cluster0.abc123.mongodb.net/tpg?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-change-in-production
WHATSAPP_PHONE=573001234567
GEMINI_API_KEY=optional-api-key
```

### 3.4 Configurar Start Command

En Railway, en "Settings":
- Build Command: `npm install`
- Start Command: `npm run build:server && node dist/index.js`

### 3.5 Deploy

1. Haz clic en "Deploy"
2. Espera a que termine (5-10 minutos)
3. Copia la URL del dominio asignado (ej: `https://three-purple-greens-production.up.railway.app`)

**Tu backend estará en**: `https://your-railway-url.up.railway.app`

Verifica que funciona:
```
https://your-railway-url.up.railway.app/api/health
```

---

## Step 4: Deploy Frontend a Vercel

### 4.1 Crear Cuenta en Vercel

1. Ve a https://vercel.com
2. Haz clic en "Sign Up"
3. Selecciona "Continue with GitHub"

### 4.2 Importar Proyecto

1. Haz clic en "New Project"
2. Selecciona el repositorio `three-purple-greens`
3. Haz clic en "Import"

### 4.3 Configurar Variables de Entorno

En Vercel, en "Environment Variables", agrega:

```
VITE_API_BASE_URL=https://your-railway-url.up.railway.app
VITE_WHATSAPP_PHONE=573001234567
```

Reemplaza `your-railway-url` con la URL de tu backend en Railway.

### 4.4 Deploy

1. Haz clic en "Deploy"
2. Espera a que termine (3-5 minutos)
3. Tu app estará lista en `https://your-project.vercel.app`

---

## Step 5: Verificar Despliegue

### 5.1 Frontend

Abre tu app en `https://your-project.vercel.app`:
- ✅ Verifica que carga la página
- ✅ Comprueba que el age gate aparece
- ✅ Intenta agregar un producto al carrito

### 5.2 Backend

Verifica que el backend funciona:
```
curl https://your-railway-url.up.railway.app/api/health
```

Deberías ver:
```json
{"status":"Server running","timestamp":"2026-07-01T..."}
```

### 5.3 Conectividad Frontend-Backend

En el navegador (abre la consola: F12):
1. Agrega un producto al carrito
2. Abre la consola del navegador
3. Verifica que NO hay errores CORS
4. Intenta abrir el checkout

---

## Step 6: Configurar Dominio Personalizado (Opcional)

### Vercel

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado

### Railway

1. Ve a tu proyecto en Railway
2. Settings → Domains
3. Agrega tu dominio personalizado

---

## URLs de tu Aplicación

Después del despliegue, tendrás:

**Frontend (Vercel):**
- URL: `https://your-project.vercel.app`
- Usuarios pueden acceder desde cualquier dispositivo

**Backend (Railway):**
- API Base: `https://your-railway-url.up.railway.app`
- Health Check: `/api/health`

---

## Troubleshooting

### Frontend no conecta con backend

**Problema**: CORS error en la consola

**Solución**:
1. Verifica que `VITE_API_BASE_URL` está correcto en Vercel
2. Verifica que el backend tiene CORS habilitado
3. Redeploy ambos

### Backend no inicia

**Problema**: Railway dice "Build failed"

**Solución**:
1. Verifica las variables de entorno en Railway
2. Verifica que `DATABASE_URL` es válida
3. Revisa los logs de Railway: Project → Settings → Logs

### MongoDB connection error

**Problema**: "MongoDB connection failed"

**Solución**:
1. Verifica la `DATABASE_URL` en Railway
2. Verifica que el IP 0.0.0.0/0 está permitido en MongoDB Atlas
3. Verifica el usuario y contraseña

---

## Next Steps

Ahora que está desplegado:

1. **Agregar Productos**: Usa la API o crea admin panel
2. **Test Completo**: Prueba el checkout en producción
3. **Configurar Stripe/Pagos**: Si quieres agregar pagos más tarde
4. **Monitor**: Configura logs y alertas

---

## Comandos Útiles

```bash
# Ver logs de Railway
railway logs

# Redeploy sin cambios
vercel --prod

# Test backend local
curl http://localhost:5000/api/health

# Ver variables de entorno
railway variables

# SSH a Railway
railway shell
```

---

## Soporte

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- MongoDB Docs: https://docs.mongodb.com


