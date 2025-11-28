# Vercel Deployment Guide - Full Stack

This guide explains how to deploy both frontend and backend to Vercel.

## Current Setup

- **Frontend**: Deployed at https://auroraflowerskw.vercel.app
- **Backend**: Configured as serverless functions in `/api` directory

## Architecture

- Frontend: Built with Vite, served as static files
- Backend: Express app wrapped as Vercel serverless function
- API Routes: All `/api/*` requests are handled by the serverless function

## Environment Variables

Add these in your Vercel project settings:

### Required

```
MONGODB_URI=your-mongodb-connection-string
SESSION_SECRET=your-random-secret-key
ADMIN_PASSWORD=your-admin-password
NODE_ENV=production
```

### Frontend (Optional)

```
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

**Note**: Since frontend and backend are on the same domain, `VITE_API_BASE_URL` should be `/api` (relative path).

## File Uploads

⚠️ **Important**: Vercel serverless functions have limitations with file storage:

1. **Temporary Storage**: Files uploaded to `/uploads` directory are stored temporarily and may not persist
2. **Recommended Solution**: Use cloud storage services:
   - AWS S3
   - Cloudinary
   - DigitalOcean Spaces
   - MongoDB GridFS

For now, uploads will work but files may be lost when the serverless function restarts.

## Deployment Steps

1. **Push to GitHub**: Ensure all changes are committed and pushed
2. **Vercel Auto-Deploy**: Vercel will automatically deploy on push
3. **Set Environment Variables**: Add all required variables in Vercel dashboard
4. **Redeploy**: Trigger a new deployment after setting environment variables

## Testing

1. Visit https://auroraflowerskw.vercel.app
2. Test API endpoints: `https://auroraflowerskw.vercel.app/api/products`
3. Check browser console for errors
4. Test admin login (click logo 5 times)

## Troubleshooting

### API returns 500 errors

- Check Vercel function logs: Dashboard → Functions → View logs
- Verify MongoDB connection string is correct
- Check environment variables are set

### CORS errors

- Verify frontend URL is in allowed origins in `api/index.ts`
- Check that `VITE_API_BASE_URL` is set to `/api`

### File uploads not working

- Files are stored temporarily in serverless functions
- Consider migrating to cloud storage (S3, Cloudinary, etc.)

### Cold start delays

- First request after inactivity may take longer (serverless cold start)
- This is normal for serverless functions

## Migration to Cloud Storage (Recommended)

To fix file upload persistence, consider updating the upload handler to use cloud storage:

```typescript
// Example with Cloudinary
import { v2 as cloudinary } from "cloudinary";

// In upload handler
const result = await cloudinary.uploader.upload(buffer, {
  folder: "aurora-flowers",
  format: "webp",
});
```

## Support

- Check Vercel logs in dashboard
- Review MongoDB Atlas connection logs
- Test API endpoints directly with curl/Postman
