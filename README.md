# Three Purple Greens 🌿

E-commerce de CBD y productos naturales premium con **checkout directo por WhatsApp** (sin pasarela de pagos).

**Aplicación moderna con React 19, Express, MongoDB y despliegue en la nube.**

---

## 🚀 Inicio Rápido (30 segundos)

### Desarrollo Local
```bash
npm install          # Instalar dependencias
npm run dev         # Inicia frontend (3000) + backend (5000)
```

Abre: http://localhost:3000

### Despliegue en la Nube
Ver: [DESPLIEGUE_PASO_A_PASO.md](DESPLIEGUE_PASO_A_PASO.md)

---

## ✨ Características

✅ **Age Verification Gate** - Verificación de edad con localStorage  
✅ **Catálogo de Productos** - Con filtros y detalles  
✅ **Carrito Persistente** - LocalStorage + sincronización  
✅ **WhatsApp Checkout** - Sin pasarela de pagos, directo a WhatsApp  
✅ **Backend API** - Express + MongoDB  
✅ **Orden de Compra** - Sistema de estados (pending → confirmed → shipped)  
✅ **Analytics** - Tracking de eventos (preparado)  
✅ **Responsive Design** - Funciona en celular, tablet, desktop  

---

## 📁 Estructura

```
.
├── src/                    # React Frontend
│   ├── components/        # Components (Cart, Products, etc.)
│   ├── App.tsx           # Main app
│   └── data.ts           # Product data
├── server/               # Express Backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   └── index.ts         # Server entry
├── DESPLIEGUE_PASO_A_PASO.md  # ⭐ Guía de despliegue
├── QUICK_START.md             # Setup rápido
├── SETUP.md                   # Setup detallado
└── IMPLEMENTATION.md          # Estado del proyecto
```

---

## 🔧 Stack Tecnológico

| Layer | Tech |
|-------|------|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Motion |
| **Backend** | Express.js, Node.js, TypeScript |
| **Database** | MongoDB Atlas (cloud) |
| **Deployment** | Vercel (frontend), Railway (backend) |
| **Hosting** | Vercel (frontend), Railway (backend) |

---

## 📋 Configuración

### Variables de Entorno (.env)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/tpg-dev
JWT_SECRET=your-secret-key
WHATSAPP_PHONE=573001234567
GEMINI_API_KEY=optional
```

### Variables Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_WHATSAPP_PHONE=573001234567
```

---

## 🛠️ Comandos Disponibles

```bash
npm run dev              # Desarrollo (frontend + backend)
npm run dev:client       # Frontend solo
npm run dev:server       # Backend solo
npm run build            # Build frontend para producción
npm run build:server     # Compilar backend
npm run lint             # TypeScript checks
npm run preview          # Preview de build
```

---

## 📱 WhatsApp Integration

El flujo de checkout:

1. Usuario agrega productos al carrito
2. Hace clic en "Proceder al Pago en WhatsApp"
3. Completa email y teléfono en modal
4. Se crea orden en backend (estado: pending_confirmation)
5. Se genera mensaje formateado con detalles
6. Redirecciona a WhatsApp Web
7. Usuario confirma detalles con TPG
8. Admin confirma orden desde dashboard (próximamente)

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [DESPLIEGUE_PASO_A_PASO.md](DESPLIEGUE_PASO_A_PASO.md) | **⭐ Guía completa para desplegar en producción** |
| [QUICK_START.md](QUICK_START.md) | Setup rápido (5 minutos) |
| [SETUP.md](SETUP.md) | Setup detallado con todos los pasos |
| [IMPLEMENTATION.md](IMPLEMENTATION.md) | Estado completo del proyecto |
| [STATUS.md](STATUS.md) | Arquitectura y features |

---

## 🚀 Despliegue

### Opción 1: Vercel + Railway (Recomendado)

1. **Frontend a Vercel**: https://vercel.com
2. **Backend a Railway**: https://railway.app
3. **DB a MongoDB Atlas**: https://www.mongodb.com/cloud/atlas

Ver paso a paso: [DESPLIEGUE_PASO_A_PASO.md](DESPLIEGUE_PASO_A_PASO.md)

### URLs después de desplegar

```
Frontend:   https://three-purple-greens-omega.vercel.app
Backend:    https://three-purple-greens.up.railway.app
Database:   MongoDB Atlas (managed)
```

---

## 📊 API Endpoints

```
GET    /api/products           # Listar productos
POST   /api/products           # Crear producto
GET    /api/products/:id       # Obtener producto

POST   /api/orders/create-draft    # Crear orden
GET    /api/orders                 # Listar órdenes
PUT    /api/orders/:id/confirm     # Confirmar orden

POST   /api/analytics/track    # Trackear evento
GET    /api/health             # Health check
```

---

## 🔐 Seguridad

- ✅ CORS habilitado correctamente
- ✅ Variables de entorno para secrets
- ✅ JWT ready (para autenticación futura)
- ✅ Validación de datos en backend
- ⏳ Rate limiting (próximo)
- ⏳ Input sanitization (próximo)

---

## 📝 Licencia

Propietario - Three Purple Greens

---

## 👨‍💻 Desarrollado con ❤️

**Tech Stack**: React 19 + Express + MongoDB  
**Despliegue**: Vercel + Railway + MongoDB Atlas  
**Checkout**: WhatsApp Web Integration

---

## 📞 Soporte

- Documentación local: Ver archivos `.md`
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app
- MongoDB: https://docs.mongodb.com

---

**Última actualización**: Julio 1, 2026  
**Status**: ✅ Ready for Production

