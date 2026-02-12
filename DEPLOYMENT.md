# Deployment Guide

This guide explains how to deploy the FlowBoard Kanban application to various hosting platforms.

## 🚀 Quick Deploy

### Vercel (Recommended)

1. **Install Vercel CLI** (optional):
```bash
npm i -g vercel
```

2. **Deploy via CLI**:
```bash
cd kanban-board
vercel
```

3. **Or deploy via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite configuration
   - Click "Deploy"

4. **Environment**: No environment variables needed for this demo

### Netlify

1. **Install Netlify CLI** (optional):
```bash
npm install netlify-cli -g
```

2. **Deploy via CLI**:
```bash
cd kanban-board
npm run build
netlify deploy --prod --dir=dist
```

3. **Or deploy via Netlify Dashboard**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

4. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

### GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Add deployment scripts to package.json**:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.js** for GitHub Pages:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/kanban-board/', // Replace with your repo name
})
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: Deploy from branch `gh-pages`

## 🔧 Pre-Deployment Checklist

- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Verify all routes work correctly
- [ ] Check browser console for errors
- [ ] Test on different devices and browsers
- [ ] Ensure localStorage works (not in incognito)
- [ ] Update README with correct live demo URL

## 📊 Post-Deployment

After deployment:
1. Test all features in production
2. Verify optimistic UI works correctly
3. Check error handling and rollbacks
4. Test on mobile devices
5. Update README.md with live URL

## 🐛 Common Deployment Issues

**Issue**: 404 on page refresh  
**Solution**: Ensure SPA fallback is configured (already done in vercel.json)

**Issue**: Assets not loading  
**Solution**: Check `base` path in vite.config.js

**Issue**: Build fails  
**Solution**: Ensure Node version is 18+ in deployment settings

## 🔒 Production Considerations

For a real production deployment:
- Add real authentication
- Connect to actual backend API
- Implement rate limiting
- Add error tracking (Sentry, LogRocket)
- Set up analytics
- Add CSP headers
- Enable HTTPS (automatic on Vercel/Netlify)

---

**Current Status**: Demo application ready for immediate deployment ✅
