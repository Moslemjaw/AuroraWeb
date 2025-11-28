# Render Backend Deployment Guide

## Configuration Settings for Render

### Service Type

- **Web Service** (not Static Site)

### Build & Deploy Settings

1. **Name**: `AuroraWeb-Backend` (or your preferred name)

2. **Environment**: `Node`

3. **Build Command**:

   ```
   npm install && npm run build:backend
   ```

4. **Start Command**:

   ```
   npm run start
   ```

5. **Root Directory**: Leave empty (or `./`)

### Environment Variables

Add these in Render dashboard → Environment:

```
MONGODB_URI=your-mongodb-connection-string
SESSION_SECRET=your-random-secret-key
ADMIN_PASSWORD=your-admin-password
NODE_ENV=production
PORT=10000
```

**Note**: Render automatically sets `PORT`, but we include it as a fallback.

### After Deployment

1. Get your Render backend URL (e.g., `https://auroraweb-backend.onrender.com`)

2. Update Vercel frontend environment variable:
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Update `VITE_API_BASE_URL` to: `https://your-backend-url.onrender.com/api`
   - Redeploy frontend

### Troubleshooting

#### Build fails with "Cannot find module dist/index.cjs"

- Ensure build command is: `npm install && npm run build:backend`
- Check build logs to see if `build:backend` completed successfully
- Verify `dist/index.cjs` is created in build logs

#### Application crashes on start

- Check Render logs for error messages
- Verify all environment variables are set
- Ensure MongoDB connection string is correct
- Check that MongoDB Atlas allows connections from Render's IP (use `0.0.0.0/0` for all IPs)

#### CORS errors

- Update `allowedOrigins` in `server/index.ts` to include your Render backend URL if needed
- Frontend should use full URL: `https://your-backend.onrender.com/api`

### File Uploads

⚠️ **Note**: Render's file system is ephemeral. Files uploaded to `/uploads` will be lost on restart.

**Recommended**: Use cloud storage:

- AWS S3
- Cloudinary
- DigitalOcean Spaces
