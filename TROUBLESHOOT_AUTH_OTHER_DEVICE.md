# Troubleshooting: Authentication Not Working on Another Device

## Quick Diagnosis Steps

### Step 1: Check Backend Logs

When you try to add a color from another device, check the Render logs. You should see:

1. **CORS logs** - Shows if the origin is allowed
2. **Auth check logs** - Shows session status
3. **Login logs** - Shows if login was successful

Look for these messages:
- `CORS: Allowing origin: ...` or `CORS: Blocked origin: ...`
- `Auth check - Is authenticated: true/false`
- `✅ Login successful - Session ID: ...`

### Step 2: Verify Frontend URL is Allowed

1. **Check what origin the other device is using:**
   - Open browser DevTools → Network tab
   - Make a request to `/api/colors`
   - Check the `Origin` header in the request

2. **Add the frontend URL to Render environment variables:**
   - Go to Render Dashboard → Your Service → Environment
   - Add or update: `FRONTEND_URL=https://your-frontend-url.com`
   - The backend will automatically allow this origin

3. **Or check if it's a Vercel deployment:**
   - If your frontend is on `*.vercel.app`, it should be automatically allowed
   - Check the logs to confirm

### Step 3: Verify Login Process

1. **On the other device, go to:** `https://your-frontend-url.com/admin/login`
2. **Enter admin password**
3. **Check browser DevTools → Application → Cookies:**
   - You should see a cookie named `connect.sid`
   - Check if it has these properties:
     - `HttpOnly: true`
     - `Secure: true` (if HTTPS)
     - `SameSite: None` (for cross-origin)

### Step 4: Check Session Cookie

The session cookie might not be sent with requests. Check:

1. **Browser DevTools → Network tab**
2. **Make a POST request to `/api/colors`**
3. **Check Request Headers:**
   - Look for `Cookie: connect.sid=...`
   - If missing, the cookie isn't being sent

### Step 5: Test Authentication Status

After logging in, test if you're authenticated:

```bash
# Replace with your actual URLs
curl -X GET https://auroraflowerbe.onrender.com/api/admin/check \
  -H "Origin: https://your-frontend-url.com" \
  -H "Cookie: connect.sid=YOUR_SESSION_ID" \
  -v
```

Should return: `{"isAuthenticated": true}`

## Common Issues & Fixes

### Issue 1: CORS Blocking the Request

**Symptoms:**
- Browser console shows CORS error
- Backend logs show: `CORS: Blocked origin: ...`

**Fix:**
1. Add `FRONTEND_URL` environment variable in Render:
   ```
   FRONTEND_URL=https://your-frontend-url.com
   ```
2. Redeploy the backend
3. Or if it's a Vercel deployment (`*.vercel.app`), it should work automatically

### Issue 2: Session Cookie Not Being Sent

**Symptoms:**
- Login succeeds but subsequent requests fail with 401
- Request headers don't include `Cookie: connect.sid=...`

**Possible Causes:**

1. **Cookie blocked by browser:**
   - Check browser settings → Privacy → Cookies
   - Make sure cookies are enabled
   - Try a different browser

2. **SameSite cookie issue:**
   - For cross-origin requests, `SameSite: None` requires `Secure: true`
   - Backend should set `secure: true` in production (it does)
   - Frontend must be HTTPS (not HTTP)

3. **Domain mismatch:**
   - Cookie domain must match the request domain
   - Don't set a specific domain in cookie config (let browser handle it)

**Fix:**
- Ensure frontend is on HTTPS
- Clear browser cookies and try again
- Check browser console for cookie warnings

### Issue 3: Session Not Persisting

**Symptoms:**
- Login works but session is lost on next request
- `isAuthenticated` is always false

**Possible Causes:**

1. **MongoDB connection issue:**
   - Sessions are stored in MongoDB
   - If MongoDB is down, sessions won't persist
   - Check Render logs for MongoDB connection errors

2. **Session secret changed:**
   - If `SESSION_SECRET` changes, old sessions become invalid
   - Make sure `SESSION_SECRET` is consistent

3. **Session store not working:**
   - Check if `connect-mongo` is properly configured
   - Verify MongoDB URI is correct

**Fix:**
- Check MongoDB connection in Render logs
- Verify `MONGODB_URI` environment variable
- Check `SESSION_SECRET` is set and consistent

### Issue 4: Different Device = Different Session

**Important:** Each device/browser needs its own login session. This is normal behavior.

- Device A logs in → Gets Session A
- Device B logs in → Gets Session B
- Sessions are independent

**This is expected!** You need to log in on each device separately.

## Debugging Commands

### Test CORS
```bash
curl -X OPTIONS https://auroraflowerbe.onrender.com/api/colors \
  -H "Origin: https://your-frontend-url.com" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v
```

Should return `204 No Content` with CORS headers.

### Test Login
```bash
curl -X POST https://auroraflowerbe.onrender.com/api/admin/login \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-frontend-url.com" \
  -d '{"password":"your-admin-password"}' \
  -c cookies.txt \
  -v
```

Check the response headers for `Set-Cookie: connect.sid=...`

### Test Authenticated Request
```bash
curl -X POST https://auroraflowerbe.onrender.com/api/colors \
  -H "Content-Type: application/json" \
  -H "Origin: https://your-frontend-url.com" \
  -H "Cookie: connect.sid=YOUR_SESSION_ID" \
  -d '{"name":"Test","hex":"#FF0000","price":0}' \
  -v
```

## Step-by-Step Fix

1. **On the other device:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Clear cookies (Application → Cookies → Clear all)

2. **Log in:**
   - Go to `https://your-frontend-url.com/admin/login`
   - Enter password
   - Check Network tab for `/api/admin/login` request
   - Look for `Set-Cookie` in response headers

3. **Check cookie:**
   - Go to Application → Cookies
   - Find `connect.sid` cookie
   - Verify it exists and has correct properties

4. **Try adding color:**
   - Make POST request to `/api/colors`
   - Check if `Cookie` header is sent in request
   - Check backend logs for auth status

5. **Check backend logs:**
   - Go to Render Dashboard → Logs
   - Look for:
     - CORS messages
     - Auth check messages
     - Session ID logs

## Still Not Working?

1. **Share the backend logs** from Render when you try to add a color
2. **Share browser console errors** from the other device
3. **Check if the frontend URL matches** what's in `FRONTEND_URL` env var
4. **Verify MongoDB is connected** (check Render logs for MongoDB connection messages)

## Expected Behavior

✅ **Working correctly:**
- Login on Device A → Session A created
- Login on Device B → Session B created (different session)
- Each device can add colors independently
- Sessions last 7 days

❌ **Not working:**
- Login succeeds but can't add colors
- 401 Unauthorized on every request
- CORS errors in browser console
- No session cookie in browser

