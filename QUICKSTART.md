# Quick Start Guide

Get the Cyberbullying Awareness System running in **under 5 minutes**.

## Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** or **pnpm** (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## Installation

### 1. Install Dependencies

```bash
npm install
```

**What's being installed:**
- React 18.3.1
- TypeScript
- Vite (build tool)
- React Router v7
- Lucide React (icons)
- Zustand (state management)
- Tailwind CSS v4
- Motion (animations)
- React Hook Form + Zod
- TanStack Query
- IndexedDB wrapper (idb)

**Installation time:** ~2 minutes (depending on internet speed)

### 2. Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v6.3.5  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 3. Open in Browser

Navigate to: **http://localhost:5173**

You should see the landing page with:
- Hero section with animated Shield icon
- Live statistics counters
- SHIELD framework cards
- Billy chatbot preview

---

## First Exploration

### Recommended Flow for Testing

1. **Home Page (`/`)**
   - Watch stats animate
   - Click "Talk to Billy Now"

2. **Billy Chatbot (`/billy`)**
   - See auto-greeting
   - Try quick starters like "I'm experiencing harassment online"
   - Observe typing indicator
   - Check suggested actions

3. **Anonymous Report (`/report`)**
   - Fill multi-step form
   - See progress indicator
   - Submit and get report ID
   - Download JSON report

4. **SHIELD Dashboard (`/shield`)**
   - Click "Start Assessment"
   - Adjust sliders for 6 dimensions
   - Submit and see score
   - Check badges unlocked

5. **Awareness Hub (`/awareness`)**
   - Click "Start Module" on any card
   - See completion badge
   - Check progress counter

6. **Resources (`/resources`)**
   - Use search: "legal"
   - Filter by category
   - Bookmark resources (star icon)
   - Check saved count

7. **Research (`/research`)**
   - View theoretical frameworks
   - Read key studies
   - See advisory board

8. **404 Page**
   - Visit `/nonexistent`
   - See Billy's compassionate message
   - Test quick links

---

## Key Features to Test

### ✅ Data Persistence
1. Submit a report
2. Refresh page
3. Report should still be in IndexedDB
4. Check browser DevTools → Application → IndexedDB → `cyberbullying-awareness`

### ✅ State Management
1. Complete a module in Awareness Hub
2. Go to SHIELD Dashboard
3. Module count should update
4. Refresh page - progress persists (localStorage)

### ✅ Responsive Design
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Test mobile (375px), tablet (768px), desktop (1440px)
4. Check mobile menu (hamburger icon)

### ✅ Accessibility
1. Press `Tab` key repeatedly
2. All interactive elements should be focusable
3. Focus indicators should be visible
4. Try navigating with keyboard only (Enter to click)

### ✅ Animations
1. Watch page transitions (smooth fade)
2. Hover over cards (lift effect)
3. Billy's typing indicator (animated dots)
4. Progress bars (smooth fill)

---

## Common Development Tasks

### View Database Contents

**Chrome/Edge DevTools:**
1. Press `F12`
2. Go to **Application** tab
3. Expand **IndexedDB** → `cyberbullying-awareness`
4. Click on `reports`, `chatHistory`, or `shieldAssessments`

### Clear All Local Data

**Option 1: In-app**
- Billy page: Click trash icon (clears chat)
- SHIELD page: Reset button (if added)

**Option 2: DevTools**
1. F12 → Application
2. Click "Clear storage" (left sidebar)
3. Check "IndexedDB" and "Local storage"
4. Click "Clear site data"

**Option 3: Hard refresh**
```
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### Test Form Validation

**Report form:**
1. Leave fields empty
2. Try submitting
3. See real-time error messages (Zod validation)

**Min description length:**
- Type less than 20 characters
- See error: "Please provide at least 20 characters"

### Check Console for Errors

1. Open DevTools (F12)
2. Go to **Console** tab
3. Should see **zero errors** in production build
4. Warnings about dev mode are OK

---

## Building for Production

### Build Command
```bash
npm run build
```

**Output location:** `/dist` folder

**What's optimized:**
- Minified JavaScript
- CSS purged (unused classes removed)
- Code splitting (separate chunks per route)
- Tree shaking (dead code elimination)
- Asset hashing (cache busting)

### Preview Production Build
```bash
# Install serve globally (one-time)
npm install -g serve

# Serve production build
serve -s dist
```

Open: **http://localhost:3000**

### Expected Bundle Sizes
```
dist/assets/index-[hash].js       ~120 KB (main bundle)
dist/assets/Landing-[hash].js     ~15 KB
dist/assets/Billy-[hash].js       ~18 KB
dist/assets/Report-[hash].js      ~22 KB
dist/assets/SHIELD-[hash].js      ~16 KB
dist/assets/Awareness-[hash].js   ~14 KB
dist/assets/Resources-[hash].js   ~13 KB
dist/assets/Research-[hash].js    ~12 KB
```

---

## Troubleshooting

### Port Already in Use
```
Error: Port 5173 is already in use
```

**Solution:**
```bash
# Kill process on port 5173 (Linux/Mac)
lsof -ti:5173 | xargs kill

# Or use a different port
npm run dev -- --port 3000
```

### Module Not Found
```
Error: Cannot find module 'lucide-react'
```

**Solution:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```
TS2307: Cannot find module './types'
```

**Solution:**
1. Ensure all files are saved
2. Restart VS Code TypeScript server:
   - Ctrl+Shift+P → "TypeScript: Restart TS Server"

### Build Fails
```
✘ [ERROR] Build failed
```

**Solution:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run build
```

### Icons Not Showing
**Symptoms:** Square boxes instead of icons

**Solution:**
1. Check import: `import { Shield } from 'lucide-react'`
2. Verify icon name at https://lucide.dev
3. Clear browser cache (Ctrl+Shift+Delete)

---

## IDE Setup (Recommended)

### VS Code Extensions
1. **ESLint** - Code quality
2. **Prettier** - Code formatting
3. **Tailwind CSS IntelliSense** - Class autocomplete
4. **TypeScript Vue Plugin (Volar)** - Better TS support

### Settings
```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## Project Structure Overview

```
/
├── src/
│   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── Layout.tsx   # App shell
│   │   │   └── StatsCounter.tsx
│   │   ├── pages/           # Route components
│   │   │   ├── Landing.tsx
│   │   │   ├── Billy.tsx
│   │   │   ├── Report.tsx
│   │   │   ├── SHIELD.tsx
│   │   │   ├── Awareness.tsx
│   │   │   ├── Resources.tsx
│   │   │   ├── Research.tsx
│   │   │   └── NotFound.tsx
│   │   ├── services/        # Business logic
│   │   │   ├── db.ts        # IndexedDB
│   │   │   └── billyAI.ts   # Chatbot logic
│   │   ├── store/           # Zustand state
│   │   │   └── useStore.ts
│   │   ├── types/           # TypeScript definitions
│   │   │   └── index.ts
│   │   ├── App.tsx          # Main component
│   │   └── routes.tsx       # Route config
│   └── styles/              # Global styles
│       ├── fonts.css
│       ├── index.css
│       ├── tailwind.css
│       └── theme.css
├── README.md                # Project overview
├── DEPLOYMENT.md            # Deploy instructions
├── FEATURES.md              # Complete feature list
├── ICON_MANIFEST.md         # All Lucide icons used
├── QUICKSTART.md            # This file
├── package.json
└── vite.config.ts
```

---

## Next Steps

1. **Customize Content**
   - Update crisis hotline numbers (if outdated)
   - Modify Billy's responses in `/src/app/services/billyAI.ts`
   - Add real research citations in Research page

2. **Add Backend (Optional)**
   - Set up Supabase for cloud sync
   - Add user authentication
   - Implement encrypted backups

3. **Deploy**
   - Follow `/DEPLOYMENT.md`
   - Push to GitHub
   - Connect to Vercel/Netlify

4. **Test Thoroughly**
   - Run Lighthouse audit
   - Test with screen reader
   - Check on real mobile devices

---

## Getting Help

### Documentation
- Main README: `/README.md`
- Deployment guide: `/DEPLOYMENT.md`
- All features: `/FEATURES.md`
- Icon reference: `/ICON_MANIFEST.md`

### External Resources
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **React Router**: https://reactrouter.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Lucide Icons**: https://lucide.dev/

### Check Console First
Most issues show clear error messages in browser console (F12).

---

## Success Checklist

- [ ] `npm install` completed without errors
- [ ] `npm run dev` starts server
- [ ] Landing page loads at http://localhost:5173
- [ ] All 8 routes accessible
- [ ] Billy chatbot responds
- [ ] Report form submits successfully
- [ ] SHIELD assessment calculates score
- [ ] Icons display correctly (all from Lucide)
- [ ] Mobile menu works
- [ ] No console errors

**If all checked ✅ - You're ready to develop!**

---

**Estimated Setup Time:** 5 minutes  
**Skill Level Required:** Beginner-friendly  
**Support:** See documentation or open an issue on GitHub
