# 🚀 Deployment Guide

This guide provides step-by-step instructions for deploying NextWatch Entertainment to various platforms.

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- TMDB API key (optional, app works with sample data)

## 🌐 Platform Deployment Options

### 1. Netlify (Recommended)

#### Automatic Deployment from GitHub

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Environment Variables** (Optional)
   - Go to Site settings > Environment variables
   - Add: `REACT_APP_API_URL` (if using backend)
   - Add: `REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500`

#### Manual Deployment

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### 2. Vercel

#### Automatic Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

#### GitHub Integration

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Vercel will automatically detect Vite settings
4. Deploy with one click

### 3. GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/nextwatch-entertainment",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### 4. Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🔧 Build Configuration

### Vite Configuration

The project uses Vite for building. The configuration is in `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // For relative paths in production
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Set to true for debugging
  }
})
```

### Environment Variables

Create a `.env` file for local development:

```env
# Backend API URL (optional)
REACT_APP_API_URL=http://localhost:8000/api

# TMDB Configuration
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500
```

## 🔍 Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Optimize images (if needed)
npm install --save-dev imagemin imagemin-webp
```

### CDN Configuration

For better performance, consider using a CDN for static assets:

1. **Cloudflare** - Automatic optimization
2. **AWS CloudFront** - Global distribution
3. **Netlify CDN** - Built-in with Netlify hosting

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `REACT_APP_`
   - Restart development server after adding variables
   - Check deployment platform environment settings

3. **Routing Issues on Deployment**
   - Configure redirects for SPA routing
   - Add `_redirects` file for Netlify:
     ```
     /*    /index.html   200
     ```

4. **API CORS Issues**
   - Configure CORS on your backend
   - Use proxy in development (vite.config.js)

### Performance Issues

1. **Slow Loading**
   - Enable gzip compression
   - Optimize images
   - Use lazy loading for components

2. **Large Bundle Size**
   - Analyze bundle with tools
   - Implement code splitting
   - Remove unused dependencies

## 📊 Monitoring & Analytics

### Recommended Tools

1. **Google Analytics** - User behavior tracking
2. **Sentry** - Error monitoring
3. **Lighthouse** - Performance auditing
4. **Web Vitals** - Core performance metrics

### Implementation

```javascript
// Add to index.html for Google Analytics
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔒 Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use platform-specific environment settings
   - Rotate API keys regularly

2. **Dependencies**
   ```bash
   # Audit dependencies
   npm audit
   npm audit fix
   ```

3. **HTTPS**
   - Always use HTTPS in production
   - Most platforms provide SSL certificates automatically

## 📈 SEO Optimization

1. **Meta Tags** - Already configured in `index.html`
2. **Open Graph** - Social media sharing
3. **Sitemap** - For search engines
4. **Robots.txt** - Search engine instructions

## 🎯 Deployment Checklist

- [ ] Code is committed to Git
- [ ] Environment variables are configured
- [ ] Build runs successfully locally
- [ ] All tests pass (if applicable)
- [ ] Performance is optimized
- [ ] Security audit completed
- [ ] Analytics configured
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Monitoring setup complete

---

## 🆘 Need Help?

If you encounter issues during deployment:

1. Check the platform-specific documentation
2. Review build logs for errors
3. Test the build locally first
4. Ensure all environment variables are set
5. Contact platform support if needed

**Happy Deploying! 🚀**
