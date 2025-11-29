# Deploy Frontend + Backend on Same Vercel Project

Your project is already configured to host both frontend and backend on the same Vercel project! Here's how it works:

## How It Works

### Architecture

- **Frontend**: Built with Vite → `dist/public` (static files)
- **Backend**: Express app → `/api/index.ts` (serverless function)
- **Same Domain**: Everything runs on `https://your-project.vercel.app`

### Routing

- `/api/*` → Goes to backend serverless function (`/api/index.ts`)
- `/*` → Goes to frontend (`/index.html`)

## Vercel Configuration

Your `vercel.json` is already set up correctly:

```json
{
  "buildCommand": "npm run build:frontend",
  "installCommand": "npm install",
  "outputDirectory": "dist/public",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Deployment Steps

### 1. Single Vercel Project Setup

1. **Go to Vercel Dashboard**

   - If you have separate projects, delete the backend-only project
   - Use only ONE project for both frontend and backend

2. **Connect Your Repository**
   - Import `AuroraWeb` repository
   - Vercel will auto-detect the configuration

### 2. Environment Variables

Add these in **ONE place** (your single Vercel project):

```
# Backend
MONGODB_URI=your-mongodb-connection-string
SESSION_SECRET=your-random-secret-key
ADMIN_PASSWORD=your-admin-password
NODE_ENV=production

# Frontend (optional - uses defaults if not set)
VITE_API_BASE_URL=/api
VITE_SITE_NAME=Aurora Flowers
VITE_CONTACT_EMAIL=your-email@example.com
VITE_CONTACT_PHONE=+965 51544913
VITE_WHATSAPP_NUMBER=96551544913
VITE_INSTAGRAM_URL=https://www.instagram.com/auroraflowers.kw
VITE_TIKTOK_URL=https://www.tiktok.com/@auroraflowers.kw
VITE_CURRENCY_CODE=KWD
VITE_CURRENCY_SYMBOL=K.D.
```

**Important**: Set `VITE_API_BASE_URL=/api` (relative path, not full URL)

### 3. Build Settings

Vercel should auto-detect, but verify:

- **Framework Preset**: Vite
- **Root Directory**: `./` (root)
- **Build Command**: `npm run build:frontend`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### 4. Deploy

1. **Push to GitHub:**

   ```bash
   git add .
   git commit -m "Configure for single domain deployment"
   git push
   ```

2. **Vercel Auto-Deploys:**
   - Frontend builds to `dist/public`
   - Backend serverless function at `/api/index.ts` is automatically detected
   - Everything deploys to one domain

## How It Works

### Request Flow

1. **Frontend Request**: `https://your-project.vercel.app/`

   - Serves `dist/public/index.html`
   - React app loads

2. **API Request**: `https://your-project.vercel.app/api/products`

   - Vercel routes to `/api/index.ts` serverless function
   - Express app handles the request
   - Returns JSON response

3. **Same Domain = No CORS Issues!**
   - Frontend and backend on same domain
   - Cookies work automatically
   - No CORS configuration needed

## Benefits

✅ **Single Domain**: Everything on one URL  
✅ **No CORS Issues**: Same origin = no CORS needed  
✅ **Simpler Setup**: One project, one set of env vars  
✅ **Automatic Scaling**: Serverless functions scale automatically  
✅ **Cost Effective**: One project instead of two

## Testing

After deployment:

1. **Frontend**: `https://your-project.vercel.app`
2. **API**: `https://your-project.vercel.app/api/products`
3. **Admin**: `https://your-project.vercel.app/admin` (after login)

## Troubleshooting

### API returns 404

- Check that `/api/index.ts` exists
- Verify `vercel.json` has the rewrite rule
- Check Vercel function logs

### CORS errors

- Should NOT happen on same domain
- If you see CORS errors, check `VITE_API_BASE_URL` is `/api` (not full URL)

### Build fails

- Check build logs in Vercel
- Verify `npm run build:frontend` works locally
- Check Node.js version (should be 18+)

## File Structure

```
AuroraWeb/
├── api/
│   └── index.ts          # Backend serverless function
├── client/               # Frontend source
├── server/               # Backend source (used by api/index.ts)
├── vercel.json           # Vercel configuration
└── package.json
```

## Next Steps

1. ✅ Delete separate backend project (if exists)
2. ✅ Use one Vercel project for everything
3. ✅ Set `VITE_API_BASE_URL=/api` in environment variables
4. ✅ Push and deploy!

That's it! Your frontend and backend will be on the same domain automatically.
