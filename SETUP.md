# Three Purple Greens (TPG) - Setup & Deployment Guide

## Prerequisites

- Node.js 18+ (download from https://nodejs.org/)
- npm or yarn package manager
- MongoDB Atlas account (for production database)
- WhatsApp Business Account (for order notifications)
- Git (for version control)

---

## Local Development Setup

### 1. Install Dependencies

```bash
cd three-purple-greens
npm install
```

All dependencies are already specified in `package.json`:
- Frontend: React 19, Vite, Tailwind CSS, Motion, Lucide React
- Backend: Express.js, Mongoose, CORS, JWT
- DevTools: TypeScript, tsx, concurrently

### 2. Configure Environment Variables

Create or update `.env` file in the root directory:

```env
# Backend Configuration
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/tpg-dev

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-in-production

# WhatsApp Configuration
WHATSAPP_PHONE=573001234567

# Google Gemini API (optional, for AI features)
GEMINI_API_KEY=your-gemini-api-key
```

For frontend-specific variables, create `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_WHATSAPP_PHONE=573001234567
```

### 3. Start Development Server

```bash
npm run dev
```

This starts both:
- **Frontend**: Vite dev server on http://localhost:3000
- **Backend**: Express server on http://localhost:5000

Individual servers:
```bash
npm run dev:client   # Frontend only
npm run dev:server   # Backend only (requires MongoDB running)
```

### 4. Verify Setup

- Frontend: Open http://localhost:3000 in your browser
- Backend health check: http://localhost:5000/api/health

---

## Database Setup

### Option A: Local MongoDB (Development)

1. Download MongoDB Community: https://www.mongodb.com/try/download/community
2. Install and start the MongoDB service
3. Update `.env`:
```env
DATABASE_URL=mongodb://localhost:27017/tpg-dev
```

### Option B: MongoDB Atlas (Production)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Get connection string from Atlas dashboard
4. Update `.env`:
```env
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/tpg?retryWrites=true&w=majority
```

### Initialize Sample Products

Once MongoDB is running and connected:

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Super Lemon Haze",
    "category": "cepa",
    "price": 250,
    "stock": 50,
    "imageUrl": "https://example.com/image.jpg",
    "thc": 20,
    "cbd": 0.5
  }'
```

Or use the admin panel to add products (when ready).

---

## WhatsApp Configuration

### Update Phone Number

1. Update the WhatsApp number in `.env`:
```env
WHATSAPP_PHONE=52XXXXXXXXXX
```

2. Use the format: `country_code + number` (no + or spaces)
   - Mexico: `52` + phone number
   - Colombia: `57` + phone number

### Test WhatsApp Link

The checkout modal automatically generates a formatted WhatsApp message with:
- Product details (name, quantity, price)
- Subtotal and estimated tax (16%)
- Customer email and phone
- Formatted for easy reading

---

## Building for Production

### Frontend Build

```bash
npm run build
```

Generates optimized files in `dist/` directory:
- HTML, CSS, JavaScript bundles
- Minified and tree-shaken
- Ready for static hosting (Vercel, Netlify, AWS S3)

### Backend Build

```bash
npm run build:server
```

Compiles TypeScript to JavaScript in `dist/` directory:
- Ready for Node.js deployment
- CommonJS modules for production

---

## Deployment

### Frontend - Vercel (Recommended)

1. Create account at https://vercel.com
2. Connect GitHub repository
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Set environment variables:
   ```
   VITE_API_BASE_URL=https://your-backend-url.com
   VITE_WHATSAPP_PHONE=573001234567
   ```
5. Deploy

### Backend - Railway/Heroku

#### Railway (Recommended)

1. Create account at https://railway.app
2. Connect GitHub repository
3. Configure environment variables in dashboard
4. Set deployment command: `npm run build:server && node dist/index.js`

#### Heroku

1. Create account at https://www.heroku.com
2. Create Procfile in root:
```
web: npm run build:server && node dist/index.js
```
3. Push to Heroku git remote
4. Configure environment variables in Heroku dashboard

---

## API Endpoints

### Products

```
GET    /api/products           - List all products
GET    /api/products/:id       - Get product by ID
POST   /api/products           - Create new product (admin)
```

### Orders

```
POST   /api/orders/create-draft  - Create pending order
GET    /api/orders              - List orders (filterable by status)
PUT    /api/orders/:id/confirm  - Confirm order (admin)
```

### Analytics

```
POST   /api/analytics/track    - Track user event
GET    /api/analytics/dashboard/sales - Get sales KPIs
```

### Health

```
GET    /api/health             - Check server status
```

---

## Troubleshooting

### Frontend doesn't connect to backend

**Issue**: CORS error in browser console

**Solution**:
1. Verify backend is running on localhost:5000
2. Check `VITE_API_BASE_URL` in `.env.local`
3. Ensure CORS is enabled in `server/index.ts`

### MongoDB connection fails

**Issue**: `Error: connect ECONNREFUSED 127.0.0.1:27017`

**Solution**:
1. Start local MongoDB service
2. OR update `DATABASE_URL` to MongoDB Atlas connection string
3. Verify network access in Atlas dashboard

### Compilation errors

**Issue**: TypeScript errors during build

**Solution**:
```bash
npm run lint              # Check for TypeScript issues
npm run build             # Full build test
npm run build:server      # Backend-only build test
```

### Port already in use

**Issue**: `Error: listen EADDRINUSE :::5000`

**Solution**:
```bash
# Kill process on port 5000
netstat -ano | findstr :5000    # Windows
lsof -i :5000                    # Mac/Linux
```

---

## Development Workflow

### Available Scripts

```bash
npm run dev              # Start both servers (concurrent)
npm run dev:client       # Frontend dev server
npm run dev:server       # Backend dev server
npm run build            # Build frontend for production
npm run build:server     # Compile backend TypeScript
npm run lint             # TypeScript type checking
npm run preview          # Preview production build locally
npm run clean            # Remove build artifacts
```

### File Structure

```
three-purple-greens/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── types.ts           # TypeScript types
│   ├── data.ts            # Initial product data
│   └── App.tsx            # Main component
├── server/                # Backend source
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── middleware/        # Custom middleware
│   └── index.ts           # Server entry point
├── dist/                  # Built frontend
├── package.json           # Dependencies
├── tsconfig.json          # Frontend TypeScript config
├── tsconfig.server.json   # Backend TypeScript config
└── .env                   # Environment variables
```

### Adding New Dependencies

```bash
# Frontend/Dev dependencies
npm install --save package-name
npm install --save-dev package-name

# To both package.json and lockfile
npm ci                    # Use exact versions from lockfile
```

---

## Database Seeding

### Manual Seeding with cURL

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product Name",
    "category": "cepa",
    "price": 299.99,
    "stock": 100,
    "imageUrl": "https://example.com/image.jpg",
    "terpenes": ["limonene", "myrcene"],
    "effects": ["relaxing", "euphoric"],
    "thc": 18.5,
    "cbd": 1.2
  }'
```

### Admin Panel (Future)

Once admin panel is built, use `/admin/products` to manage inventory.

---

## Next Steps

1. **Set up MongoDB Atlas** - Create free cluster for production
2. **Update WhatsApp phone number** - Replace placeholder with real number
3. **Test checkout flow** - Add products and test WhatsApp integration
4. **Create admin panel** - Build order management dashboard
5. **Implement analytics** - Track user events and KPIs
6. **Deploy to production** - Use Vercel (frontend) + Railway (backend)

---

## Support & Resources

- **Frontend**: React docs (https://react.dev), Vite (https://vitejs.dev)
- **Backend**: Express (https://expressjs.com), Mongoose (https://mongoosejs.com)
- **Database**: MongoDB Docs (https://docs.mongodb.com)
- **Hosting**: Vercel (https://vercel.com/docs), Railway (https://railway.app/docs)

---

## License

This project is proprietary and confidential.

