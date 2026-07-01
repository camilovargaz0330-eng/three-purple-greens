# Three Purple Greens - Quick Start

## 5-Minute Setup

### 1. Install & Start
```bash
npm install                    # Install dependencies
npm run dev                    # Start frontend + backend
```

### 2. Open in Browser
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health

### 3. Update Configuration
Edit `.env`:
```env
WHATSAPP_PHONE=573001234567           # Update with real phone
DATABASE_URL=mongodb+srv://...        # Update with MongoDB Atlas
```

---

## Key Files

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main React app |
| `server/index.ts` | Express server |
| `src/components/CartDrawer.tsx` | Shopping cart + WhatsApp checkout |
| `src/components/CheckoutWhatsApp.tsx` | Order form modal |
| `.env` | Backend config |
| `.env.local` | Frontend config |

---

## Features Ready

✅ Age verification gate  
✅ Product catalog with add-to-cart  
✅ Shopping cart with quantity control  
✅ WhatsApp checkout integration  
✅ Backend API with MongoDB support  
✅ Analytics event tracking (basic)

---

## Next Priorities

1. Set up MongoDB Atlas (free cluster)
2. Add products to database
3. Build admin panel for order confirmation
4. Test full checkout flow
5. Deploy to production

---

## Common Tasks

### Add a Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Product","category":"cepa","price":250,"stock":50,"imageUrl":"url"}'
```

### View Orders
```
GET http://localhost:5000/api/orders
```

### Clear Cart (Frontend)
In CartDrawer.tsx: Click "Vaciar Carrito" button

---

## Production Deployment

```bash
npm run build              # Build frontend
npm run build:server       # Compile backend

# Deploy dist/ to Vercel (frontend)
# Deploy dist/ from server build to Railway (backend)
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Can't connect to backend | Check `VITE_API_BASE_URL` in `.env.local` |
| MongoDB error | Start MongoDB locally or use Atlas connection string |
| Port 5000 in use | Change `PORT` in `.env` |
| Build fails | Run `npm run lint` to check TypeScript errors |

See SETUP.md for detailed guide.

