# Deployment Guide

## Quick Deploy (Recommended Platforms)

### Vercel (Recommended)
1. Push code to GitHub/GitLab
2. Import project in Vercel
3. Vercel auto-detects Vite configuration
4. Deploy!

```bash
# Optional: Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Configuration**: None needed - Vercel auto-detects Vite

---

### Netlify
1. Push code to Git provider
2. Create new site in Netlify
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

**netlify.toml** (optional):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Cloudflare Pages
1. Connect Git repository
2. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`

---

## Manual Deployment

### Build Production Bundle
```bash
npm run build
```

This creates optimized files in `/dist`:
- Minified JavaScript
- Optimized CSS
- Tree-shaken dependencies
- Code-split routes

### Test Production Build Locally
```bash
# Install serve
npm i -g serve

# Serve production build
serve -s dist -l 3000
```

Visit `http://localhost:3000`

---

## Performance Checklist

### Pre-Deployment
- [ ] Run `npm run build` without errors
- [ ] Test production build locally
- [ ] Verify all routes load correctly
- [ ] Check console for warnings/errors
- [ ] Test on mobile viewport
- [ ] Verify accessibility with screen reader

### Post-Deployment
- [ ] Run Lighthouse audit (target 95+ all categories)
- [ ] Test on slow 3G connection
- [ ] Verify IndexedDB works in production
- [ ] Check service worker (if implemented)
- [ ] Test error pages (404)
- [ ] Verify crisis hotline links

---

## Environment Configuration

### Production Environment Variables
Currently, this app has **no backend** and requires **no environment variables**.

For future additions (e.g., real AI API):
```bash
# .env.production
VITE_API_ENDPOINT=https://api.example.com
VITE_ENABLE_ANALYTICS=true
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_ENDPOINT;
```

---

## Security Headers

Recommended headers for production:

### Vercel (`vercel.json`)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

### Netlify (`_headers` file in `/public`)
```
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

---

## CDN & Caching

### Static Assets
- **Images**: Cache for 1 year
- **JS/CSS**: Cache with hash-based filenames (auto by Vite)
- **HTML**: No cache (or short cache with revalidation)

### Service Worker (Future Enhancement)
```typescript
// public/sw.js
const CACHE_NAME = 'cyberbullying-v1';
const urlsToCache = [
  '/',
  '/assets/index.css',
  '/assets/index.js'
];
```

---

## Database Considerations

### IndexedDB (Current)
- Works offline automatically
- Data persists across sessions
- No server needed
- **Limitation**: Users must clear data manually

### Future: Supabase Integration
If adding cloud sync:
1. User authentication
2. Encrypted report backup
3. Cross-device sync
4. Professional support network

---

## Monitoring & Analytics

### Privacy-Respecting Analytics
Recommended (GDPR compliant):
- **Plausible Analytics** (no cookies)
- **Simple Analytics**
- **Fathom Analytics**

### Error Tracking
- **Sentry** (frontend error monitoring)
- Configure to exclude PII from reports

```typescript
// Example: Sentry integration
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  beforeSend(event) {
    // Remove PII before sending
    delete event.user;
    return event;
  }
});
```

---

## Performance Budget

### Target Metrics (Lighthouse)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 95+

### Bundle Size Budget
- **Main bundle**: <150KB (gzipped)
- **Route chunks**: <50KB each
- **Total transfer**: <500KB

### Runtime Performance
- **First Contentful Paint (FCP)**: <0.8s
- **Time to Interactive (TTI)**: <1.2s
- **Largest Contentful Paint (LCP)**: <1.5s
- **Cumulative Layout Shift (CLS)**: <0.1
- **Interaction Responsiveness**: <20ms

---

## Rollback Strategy

### Quick Rollback (Vercel/Netlify)
1. Go to deployments dashboard
2. Click "Promote to Production" on previous deployment
3. Instant rollback (no rebuild needed)

### Git-Based Rollback
```bash
# Revert to previous commit
git revert HEAD

# Force deploy
git push origin main
```

---

## Health Checks

### Automated Checks (Recommended)
Set up monitoring for:
- [ ] Site uptime (99.9% target)
- [ ] IndexedDB functionality
- [ ] Crisis hotline links validity
- [ ] SSL certificate expiry
- [ ] DNS resolution

### Manual Quarterly Review
- [ ] Update crisis hotline numbers
- [ ] Review and update research citations
- [ ] Check for Lucide React updates
- [ ] Security dependency updates
- [ ] Accessibility compliance audit

---

## Domain Configuration

### Custom Domain (Example)
```
cyberbullying-support.org.uk
```

### DNS Settings
```
Type: CNAME
Name: www
Value: your-deployment-url.vercel.app
```

### SSL/TLS
- Automatic on Vercel/Netlify/Cloudflare
- Force HTTPS redirect enabled

---

## Compliance & Legal

### GDPR Compliance
- ✅ No cookies without consent
- ✅ Data stored locally (user's device)
- ✅ No tracking without opt-in
- ✅ Privacy policy link in footer

### Accessibility (WCAG 2.1 AA)
- ✅ Keyboard navigation
- ✅ Screen reader tested
- ✅ Color contrast 4.5:1+
- ✅ ARIA labels on interactive elements

### Content Warnings
Recommended notice on landing page:
> "This site discusses cyberbullying and online harassment. If you need immediate crisis support, call 999 or Samaritans: 116 123"

---

## Troubleshooting

### Build Failures

**Error**: `Module not found`
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Error**: `Out of memory`
```bash
# Increase Node memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Runtime Issues

**IndexedDB not working**
- Check browser compatibility
- Verify user hasn't disabled IndexedDB
- Test in incognito mode

**Icons not loading**
- Verify lucide-react is in dependencies
- Check import statements
- Clear build cache and rebuild

---

## Continuous Integration

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test # if tests exist
```

---

## Production Checklist

Before going live:

### Technical
- [ ] All routes tested
- [ ] Forms validated
- [ ] Error handling in place
- [ ] 404 page works
- [ ] Mobile responsive verified
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Lighthouse score >95

### Content
- [ ] Crisis hotlines verified and current
- [ ] Legal disclaimers reviewed
- [ ] Accessibility statement published
- [ ] Privacy policy linked

### Security
- [ ] Dependencies updated (no critical vulnerabilities)
- [ ] Security headers configured
- [ ] HTTPS enforced
- [ ] No sensitive data in client code

### Performance
- [ ] Bundle size within budget
- [ ] Images optimized
- [ ] Code splitting working
- [ ] IndexedDB functional

---

## Support Resources

### Deployment Issues
- **Vercel**: https://vercel.com/support
- **Netlify**: https://answers.netlify.com
- **Vite**: https://vitejs.dev/guide/troubleshooting

### Performance Optimization
- Lighthouse CI: https://github.com/GoogleChrome/lighthouse-ci
- Web Vitals: https://web.dev/vitals/

---

**Deployment Status**: Ready for production ✅  
**Last Updated**: April 3, 2026  
**Estimated Deploy Time**: <5 minutes
