# Image Storage Fix - Cloudinary Implementation

## Problem

Images were disappearing after each deployment because:

- Images were stored in the `/uploads` folder on the server
- Render's file system is **ephemeral** - files are deleted on restart/redeploy
- Each git commit triggers a new deployment, which clears the uploads folder

## Solution: Cloudinary Cloud Storage ✅

I've implemented Cloudinary support! Images will now persist permanently.

### Setup Instructions:

1. **Sign up for Cloudinary** (Free tier available):

   - Go to https://cloudinary.com/users/register/free
   - Create a free account (25GB storage, 25GB bandwidth/month)

2. **Get your credentials**:

   - After signing up, go to Dashboard
   - Copy your:
     - Cloud Name
     - API Key
     - API Secret

3. **Add environment variables to Render**:

   - Go to your Render backend service
   - Navigate to Environment
   - Add **ONE** of these options:

   **Option A: Single URL (Easier)**:

   ```
   CLOUDINARY_URL=cloudinary://q4Qf-Y32H9yVJYm-G-m1ufJ15Ns:YOUR_API_SECRET@dyxzbgiic
   ```

   (Replace `YOUR_API_SECRET` with your actual API secret from Cloudinary dashboard)

   **Option B: Individual Variables**:

   ```
   CLOUDINARY_CLOUD_NAME=dyxzbgiic
   CLOUDINARY_API_KEY=q4Qf-Y32H9yVJYm-G-m1ufJ15Ns
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Redeploy**:
   - Render will automatically redeploy
   - Images will now be stored in Cloudinary permanently!

### How it works:

- **With Cloudinary**: Images are uploaded to Cloudinary and stored permanently
- **Without Cloudinary**: Falls back to local storage (images will still be lost on restart)

### Benefits:

✅ Images persist across deployments
✅ Automatic image optimization
✅ CDN delivery (faster loading)
✅ Free tier: 25GB storage + 25GB bandwidth/month
✅ No code changes needed - just add environment variables!

### Testing:

After adding the environment variables:

1. Upload a new image through the admin panel
2. Check the image URL - it should be a Cloudinary URL (e.g., `https://res.cloudinary.com/...`)
3. Images will now persist even after deployments!
