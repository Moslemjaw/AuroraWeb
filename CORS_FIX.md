# CORS Fix Guide

## Problem

Frontend at `auroraflowerskw.vercel.app` is calling backend at `aurora-web-ashen.vercel.app` but getting CORS errors and missing `/api` prefix.

## Solutions Applied

### 1. CORS Configuration Updated

- ✅ Allows all `*.vercel.app` domains
- ✅ Handles preflight OPTIONS requests
- ✅ Added explicit OPTIONS handler

### 2. API Base URL Fix

- ✅ Automatically adds `/api` prefix if missing
- ✅ Works with both relative and absolute URLs

### 3. Backend URL Handling

- ✅ Backend now handles requests with or without `/api` prefix

## Deployment Steps

### For Frontend Project (`auroraflowerskw.vercel.app`)

1. **Set Environment Variable:**

   ```
   VITE_API_BASE_URL=https://aurora-web-ashen.vercel.app/api
   ```

   OR if using same domain:

   ```
   VITE_API_BASE_URL=/api
   ```

2. **Push and Deploy:**
   ```bash
   git add .
   git commit -m "Fix CORS and API base URL"
   git push
   ```

### For Backend Project (`aurora-web-ashen.vercel.app`)

1. **If it's a separate Vercel project:**

   - Make sure it has the `/api/index.ts` file
   - Use `vercel-backend.json` as `vercel.json` OR
   - Configure Vercel to route all requests to `/api`

2. **Set Environment Variables:**

   ```
   MONGODB_URI=your-mongodb-connection-string
   SESSION_SECRET=your-secret-key
   ADMIN_PASSWORD=your-admin-password
   NODE_ENV=production
   ```

3. **Push and Deploy:**
   ```bash
   git add .
   git commit -m "Fix CORS configuration"
   git push
   ```

## Testing

After deployment, test:

1. `https://auroraflowerskw.vercel.app` - Frontend should load
2. `https://aurora-web-ashen.vercel.app/api/products` - Should return products
3. Check browser console - No CORS errors

## If Still Having Issues

1. **Check Vercel Function Logs:**

   - Go to Vercel Dashboard → Your Project → Functions → View Logs
   - Look for CORS errors or initialization errors

2. **Verify Environment Variables:**

   - Make sure `VITE_API_BASE_URL` includes `/api`
   - Example: `https://aurora-web-ashen.vercel.app/api`

3. **Clear Browser Cache:**

   - Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Or clear cache and reload

4. **Check Network Tab:**
   - Open DevTools → Network
   - Check if requests are going to correct URL with `/api` prefix
   - Check response headers for CORS headers
