# Render Build Troubleshooting

## Problem: `dist/index.cjs` not found

The error shows the build isn't creating the file. Here's how to fix it:

## Step 1: Check Build Command in Render

Go to Render Dashboard → Your Service → Settings → Build & Deploy

**Build Command MUST be:**

```
npm install && npm run build:backend
```

**NOT:**

- ❌ `npm run build:backend` (missing npm install)
- ❌ `npm install` (missing build step)
- ❌ `npm run build` (builds frontend too)

## Step 2: Check Build Logs

1. Go to Render Dashboard → Your Service → Logs
2. Look for the **Build** section (not Runtime)
3. You should see:
   ```
   ==> Building...
   Building backend server...
   Current working directory: /opt/render/project/src
   Starting esbuild...
   Backend build complete!
   ✅ dist/index.cjs exists!
   ```

**If you DON'T see these messages:**

- The build command isn't running
- Check that Build Command is set correctly
- Make sure you saved the settings

## Step 3: Verify File Structure

The build expects this structure:

```
project-root/
├── server/
│   └── index.ts
├── script/
│   └── build-backend.ts
├── package.json
└── dist/          (created by build)
    └── index.cjs  (created by build)
```

## Step 4: Check Root Directory

In Render Settings → Build & Deploy:

- **Root Directory**: `./` or leave empty
- **NOT**: `/server` or any subdirectory

## Step 5: Alternative - Use Full Build Command

If the above doesn't work, try this build command:

```bash
npm ci --production=false && npm run build:backend
```

This ensures:

- All dependencies are installed (including devDependencies)
- Build runs after install

## Step 6: Manual Verification

After deployment, check the logs for:

1. ✅ "Building backend server..." message
2. ✅ "Backend build complete!" message
3. ✅ "✅ dist/index.cjs exists!" message
4. ❌ Any error messages

## Common Issues

### Issue 1: Build Command Not Set

**Symptom**: No build output in logs
**Fix**: Set Build Command to `npm install && npm run build:backend`

### Issue 2: Build Fails Silently

**Symptom**: Build runs but no file created
**Fix**: Check build logs for errors, ensure `tsx` and `esbuild` are installed

### Issue 3: Wrong Directory

**Symptom**: "Cannot find module" errors
**Fix**: Set Root Directory to `./` or empty

### Issue 4: Missing Dependencies

**Symptom**: Build fails with module errors
**Fix**: Ensure `tsx` and `esbuild` are in `dependencies` (they are now)

## Quick Fix Checklist

- [ ] Build Command: `npm install && npm run build:backend`
- [ ] Root Directory: `./` or empty
- [ ] Start Command: `npm run start`
- [ ] Check build logs for "Building backend server..."
- [ ] Verify "✅ dist/index.cjs exists!" in logs
- [ ] Push latest code with updated build script

## Still Not Working?

1. **Check Render Build Logs** - Look for any error messages
2. **Try Manual Build Locally** - Run `npm run build:backend` locally
3. **Verify Dependencies** - Ensure `tsx` and `esbuild` are in package.json
4. **Contact Support** - Share build logs with Render support
