# Aurora Flowers - Hosting Guide

This guide explains how to host the Aurora Flowers e-commerce website on various platforms.

---

## Quick Start

### Prerequisites
- Node.js 18+ installed
- MongoDB database (MongoDB Atlas recommended)
- npm or yarn package manager

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit `.env` and fill in your values:
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
ADMIN_PASSWORD=your-secure-admin-password
SESSION_SECRET=your-random-secret-key
```

---

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
This starts both the frontend and backend on port 5000 with hot reload.

---

## Production Build

### Build the Application
```bash
npm run build
```
This creates:
- `dist/public/` - Frontend static files
- `dist/index.cjs` - Backend server bundle

### Run Production Server
```bash
npm run start
```
Or directly:
```bash
node dist/index.cjs
```

---

## Hosting Options

### Option 1: Replit (Easiest)

1. Fork this Repl or import from GitHub
2. Add secrets in the Secrets tab:
   - `MONGODB_URI`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
3. Click "Run" to start
4. Click "Deploy" to publish

### Option 2: Railway

1. Connect your GitHub repository
2. Add environment variables in Railway dashboard
3. Set start command: `npm run start`
4. Set build command: `npm run build`
5. Deploy automatically on push

### Option 3: Render

1. Create a new Web Service
2. Connect your repository
3. Configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
4. Add environment variables in dashboard
5. Deploy

### Option 4: DigitalOcean App Platform

1. Create a new app from GitHub
2. Select the repository
3. Configure:
   - Build Command: `npm run build`
   - Run Command: `npm run start`
4. Add environment variables
5. Deploy

### Option 5: VPS (Ubuntu/Debian)

1. Install Node.js:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

2. Clone and setup:
```bash
git clone your-repo-url
cd aurora-flowers
npm install
cp .env.example .env
nano .env  # Edit your environment variables
```

3. Build:
```bash
npm run build
```

4. Install PM2 for process management:
```bash
npm install -g pm2
```

5. Start with PM2:
```bash
pm2 start dist/index.cjs --name aurora-flowers
pm2 save
pm2 startup
```

6. Setup Nginx reverse proxy:
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. Enable HTTPS with Certbot:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Option 6: Docker

Create a `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "run", "start"]
```

Build and run:
```bash
docker build -t aurora-flowers .
docker run -p 5000:5000 --env-file .env aurora-flowers
```

---

## MongoDB Setup

### MongoDB Atlas (Recommended)

1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create database user with password
4. Whitelist IP addresses:
   - For development: Your IP
   - For production: `0.0.0.0/0` (allow all) or your server IP
5. Get connection string and add to `.env`

---

## File Uploads

Product images are stored in the `/uploads` directory. Make sure this directory:
- Exists on your server
- Has write permissions
- Is included in your deployment (or use cloud storage)

For cloud hosting, consider using:
- AWS S3
- Cloudinary
- DigitalOcean Spaces

---

## Admin Access

Access the admin dashboard by:
1. Click the logo 5 times on any page
2. Enter the admin password from your `.env` file

Admin dashboard URL: `/admin`

---

## Troubleshooting

### Common Issues

**MongoDB connection fails:**
- Check your connection string is correct
- Ensure IP is whitelisted in MongoDB Atlas
- Verify username/password

**Session not persisting:**
- Check `SESSION_SECRET` is set
- Ensure cookies are enabled
- For production, set `NODE_ENV=production`

**Images not loading:**
- Check `/uploads` directory exists
- Verify file permissions
- Check disk space

### Health Check

Test if the server is running:
```bash
curl http://localhost:5000/api/products
```

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push database schema |

---

## Support

For issues, check:
1. Server logs: `pm2 logs aurora-flowers`
2. MongoDB Atlas logs
3. Browser console for frontend errors

---

## Security Checklist

Before going live:
- [ ] Change default admin password
- [ ] Set strong SESSION_SECRET
- [ ] Enable HTTPS
- [ ] Restrict MongoDB IP access
- [ ] Set `NODE_ENV=production`
- [ ] Review CORS settings if needed
