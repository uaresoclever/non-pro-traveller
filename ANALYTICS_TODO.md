# Google Analytics Setup - Action Required

## 🚨 IMPORTANT: Replace Measurement ID

Before deploying, you need to replace `GA_MEASUREMENT_ID` with your actual Google Analytics measurement ID in these files:

### 1. `index.html` (2 places)
```html
<!-- Line ~60 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ACTUAL_ID"></script>

<!-- Line ~65 -->
gtag('config', 'YOUR_ACTUAL_ID', {
```

### 2. `src/utils/analytics.js` (1 place)
```javascript
// Line 4
export const GA_MEASUREMENT_ID = 'YOUR_ACTUAL_ID'
```

## How to Get Your Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create account → Create property → Get measurement ID
3. It will look like: `G-XXXXXXXXXX`
4. Replace `GA_MEASUREMENT_ID` with this ID

## What's Already Set Up

✅ Google Analytics 4 tracking code in HTML  
✅ Custom event tracking for:
- Page views
- Language switches  
- Journey views
- Tag clicks
- Search usage
- Filter usage
- Journey card clicks

✅ Privacy-friendly tracking
✅ Multi-language support
✅ Real-time analytics ready

## After Setup

Once you add your measurement ID and deploy:
- Visit your site to test tracking
- Check Google Analytics Realtime reports
- All user interactions will be tracked automatically

See `GOOGLE_ANALYTICS_SETUP.md` for detailed instructions.