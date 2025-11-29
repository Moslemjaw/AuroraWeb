# Separate Frontend & Backend Deployment

## Current Setup

- **Frontend**: `https://auroraflowers.vercel.app` (Vercel)
- **Backend**: `https://auroraflowerbe.onrender.com` (Render)

## Configuration

### Frontend (Vercel) - Environment Variables

Set these in your Vercel project dashboard:

```
VITE_API_BASE_URL=https://auroraflowerbe.onrender.com/api
VITE_SITE_NAME=Aurora Flowers
VITE_CONTACT_EMAIL=your-email@example.com
VITE_CONTACT_PHONE=+965 51544913
VITE_WHATSAPP_NUMBER=96551544913
VITE_INSTAGRAM_URL=https://www.instagram.com/auroraflowers.kw
VITE_TIKTOK_URL=https://www.tiktok.com/@auroraflowers.kw
VITE_CURRENCY_CODE=KWD
VITE_CURRENCY_SYMBOL=K.D.
```

**Important**: `VITE_API_BASE_URL` must be the full URL: `https://auroraflowerbe.onrender.com/api`

### Backend (Render) - Environment Variables

Set these in your Render project dashboard:

```
MONGODB_URI=your-mongodb-connection-string
SESSION_SECRET=your-random-secret-key
ADMIN_PASSWORD=your-admin-password
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://auroraflowers.vercel.app
```

**Important**: `FRONTEND_URL` tells the backend which frontend domain to allow for CORS.

## CORS Configuration

The backend (`server/index.ts`) is configured to:

- ✅ Allow `https://auroraflowers.vercel.app`
- ✅ Allow all `*.vercel.app` domains (for preview deployments)
- ✅ Handle preflight OPTIONS requests

## Testing

1. **Frontend**: https://auroraflowers.vercel.app
2. **Backend API**: https://auroraflowerbe.onrender.com/api/products
3. **Check Browser Console**: Should have no CORS errors

## Troubleshooting

### CORS Errors

- Verify `FRONTEND_URL` is set in Render backend
- Check that `VITE_API_BASE_URL` includes `/api` at the end
- Ensure backend CORS allows the frontend domain

### API Not Responding

- Check Render logs for backend errors
- Verify MongoDB connection string is correct
- Check that backend is running (not sleeping)

### Frontend Can't Connect

- Verify `VITE_API_BASE_URL` is set correctly in Vercel
- Check network tab in browser DevTools
- Ensure backend URL is accessible (try in browser)

## Deployment Flow

1. **Backend (Render)**:

   - Push code → Render auto-deploys
   - Backend available at `https://auroraflowerbe.onrender.com`

2. **Frontend (Vercel)**:

   - Push code → Vercel auto-deploys
   - Frontend calls backend at `https://auroraflowerbe.onrender.com/api`

3. **Both work together**:
   - Frontend makes API calls to Render backend
   - CORS allows the requests
   - Everything works! 🎉
