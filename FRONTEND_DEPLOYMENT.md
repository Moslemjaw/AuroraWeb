# Frontend Deployment Guide

This guide explains how to deploy the Aurora Flowers frontend separately (e.g., on Vercel, Netlify, etc.).

## Prerequisites

- Backend API must be deployed and accessible
- Backend URL (e.g., `https://your-backend.railway.app` or `https://your-backend.render.com`)

## Quick Deploy to Vercel

### Step 1: Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import your `AuroraWeb` repository

### Step 2: Configure Build Settings

Vercel should auto-detect Vite, but verify these settings:

- **Framework Preset**: Vite
- **Root Directory**: `./` (root of repo)
- **Build Command**: `npm run build:frontend`
- **Output Directory**: `dist/public`
- **Install Command**: `npm install`

### Step 3: Add Environment Variables

In Vercel dashboard, add these environment variables:

```
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_SITE_NAME=Aurora Flowers
VITE_CONTACT_EMAIL=your-email@example.com
VITE_CONTACT_PHONE=+965 51544913
VITE_WHATSAPP_NUMBER=96551544913
VITE_INSTAGRAM_URL=https://www.instagram.com/auroraflowers.kw
VITE_TIKTOK_URL=https://www.tiktok.com/@auroraflowers.kw
VITE_CURRENCY_CODE=KWD
VITE_CURRENCY_SYMBOL=K.D.
```

**Important**: Replace `https://your-backend-url.com/api` with your actual backend URL.

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

---

## Deploy to Netlify

### Step 1: Connect Repository

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your `AuroraWeb` repository

### Step 2: Configure Build Settings

- **Build command**: `npm run build:frontend`
- **Publish directory**: `dist/public`
- **Base directory**: `./` (root)

### Step 3: Add Environment Variables

Go to Site settings → Environment variables and add the same variables as above.

### Step 4: Add Redirect Rules

Create `netlify.toml` in the root:

```toml
[build]
  command = "npm run build:frontend"
  publish = "dist/public"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Step 5: Deploy

Click "Deploy site"

---

## Deploy to Other Platforms

### Cloudflare Pages

1. Connect GitHub repository
2. Build command: `npm run build:frontend`
3. Output directory: `dist/public`
4. Add environment variables in dashboard
5. Add redirect rule: `/* -> /index.html 200`

### GitHub Pages

1. Build locally: `npm run build:frontend`
2. Push `dist/public` to `gh-pages` branch
3. Enable GitHub Pages in repository settings

---

## Testing After Deployment

1. Visit your frontend URL
2. Check browser console for any API errors
3. Verify API calls are going to the correct backend URL
4. Test admin login (click logo 5 times)
5. Test product browsing and cart functionality

---

## Troubleshooting

### API calls failing (CORS errors)

- Ensure your backend has CORS enabled for your frontend domain
- Check that `VITE_API_BASE_URL` is set correctly

### 404 errors on page refresh

- Ensure redirect rules are configured (`/* -> /index.html`)
- This is already configured in `vercel.json`

### Environment variables not working

- Restart/redeploy after adding environment variables
- Variables must start with `VITE_` to be accessible in the frontend

### Build fails

- Check that all dependencies are in `package.json`
- Ensure Node.js version is 18+ in platform settings

---

## Backend CORS Configuration

Make sure your backend allows requests from your frontend domain. In your backend code, add:

```javascript
app.use(
  cors({
    origin: ["https://your-frontend.vercel.app", "http://localhost:5000"],
    credentials: true,
  })
);
```

Replace `https://your-frontend.vercel.app` with your actual frontend URL.
