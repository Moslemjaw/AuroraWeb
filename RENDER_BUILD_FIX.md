# Render Build Fix

## Problem

Render can't find `dist/index.cjs` - the build isn't creating the file.

## Solution

### Option 1: Verify Build Command (Recommended)

In Render dashboard, make sure your **Build Command** is exactly:

```
npm install && npm run build:backend
```

**NOT** just `npm run build:backend` (must include `npm install` first)

### Option 2: Check Build Logs

1. Go to Render dashboard → Your service → Logs
2. Look for the build output
3. You should see:
   - "Building backend server..."
   - "Backend build complete!"
   - "✅ dist/index.cjs exists!"

If you don't see these, the build isn't running.

### Option 3: Alternative Build Command

If the above doesn't work, try this build command:

```
npm ci && npm run build:backend
```

Or with explicit path:

```
npm install && NODE_ENV=production npm run build:backend
```

### Option 4: Check Root Directory

Make sure **Root Directory** in Render is:

- `./` (or leave empty)
- NOT `/server` or any subdirectory

### Verification Steps

1. **Check Build Logs:**

   - Should see "Building backend server..."
   - Should see "Backend build complete!"
   - Should see file size output

2. **Check File Exists:**

   - After build, verify `dist/index.cjs` exists
   - File should be ~1MB in size

3. **Check Start Command:**
   - Should be: `npm run start`
   - Which runs: `node dist/index.cjs`

## Common Issues

### Issue 1: Build Command Not Running

- **Symptom**: No build output in logs
- **Fix**: Ensure build command includes `npm install`

### Issue 2: Wrong Directory

- **Symptom**: "Cannot find module" errors
- **Fix**: Set Root Directory to `./` or empty

### Issue 3: Missing Dependencies

- **Symptom**: Build fails with module errors
- **Fix**: Ensure `tsx` and `esbuild` are in `dependencies` (they are now)

### Issue 4: Build Succeeds But File Missing

- **Symptom**: Build completes but file not found
- **Fix**: Check if build is running in correct directory

## Updated Build Script

The build script now includes:

- ✅ Better logging
- ✅ File existence verification
- ✅ Error handling

Push the updated code and redeploy!
