# Google Analytics Setup Guide

This guide will help you set up Google Analytics 4 (GA4) for your travel website.

## Step 1: Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Create an account name (e.g., "Non Pro Traveller")
5. Choose what you want to measure: "Web"
6. Set up your property:
   - Property name: "Non Pro Traveller Website"
   - Reporting time zone: Choose your timezone
   - Currency: Choose your preferred currency

## Step 2: Get Your Measurement ID

1. After creating the property, you'll get a **Measurement ID** that looks like: `G-XXXXXXXXXX`
2. Copy this ID - you'll need it in the next step

## Step 3: Update Your Website Code

Replace `GA_MEASUREMENT_ID` in the following files with your actual Measurement ID:

### File 1: `index.html`
Find this line:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```
And this line:
```javascript
gtag('config', 'GA_MEASUREMENT_ID', {
```

Replace both instances of `GA_MEASUREMENT_ID` with your actual ID.

### File 2: `src/utils/analytics.js`
Find this line:
```javascript
export const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'
```
Replace `GA_MEASUREMENT_ID` with your actual ID.

## Step 4: Deploy Your Changes

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add Google Analytics tracking"
   git push origin main
   ```

2. Netlify will automatically deploy your updated website

## Step 5: Verify Tracking

1. Visit your website: https://nonprotraveller.netlify.app
2. In Google Analytics, go to Reports > Realtime
3. You should see your visit appear in real-time data
4. Navigate around your site and check different pages

## What Gets Tracked

Your website now tracks:

### Automatic Tracking:
- **Page Views**: Every page visit
- **Language Switches**: When users change language
- **Journey Views**: When users view journey details
- **Tag Clicks**: When users click on tags
- **Search Usage**: When users search for journeys
- **Filter Usage**: When users apply filters
- **Journey Card Clicks**: When users click on journey cards

### Custom Events:
- `view_journey`: When a journey detail page is viewed
- `click_tag`: When a tag is clicked
- `language_switch`: When language is changed
- `search`: When search is used
- `filter`: When filters are applied
- `click_journey_card`: When journey cards are clicked

## Viewing Your Data

In Google Analytics, you can view:

1. **Realtime Reports**: See current visitors
2. **Audience Reports**: Demographics and interests
3. **Acquisition Reports**: How users find your site
4. **Behavior Reports**: What users do on your site
5. **Events**: Custom tracking events

## Privacy Considerations

- The tracking respects user privacy
- No personal information is collected
- Users can opt out using browser settings
- Consider adding a privacy policy to your website

## Troubleshooting

If tracking isn't working:

1. Check browser console for errors
2. Verify your Measurement ID is correct
3. Make sure the website is deployed with the changes
4. Check that ad blockers aren't blocking the tracking
5. Wait 24-48 hours for data to appear in reports

## Advanced Features

You can extend tracking by:

1. Adding more custom events in `src/utils/analytics.js`
2. Setting up conversion goals in Google Analytics
3. Creating custom audiences
4. Setting up Google Ads integration
5. Adding enhanced ecommerce tracking (if you add booking features)

## Support

For more help:
- [Google Analytics Help Center](https://support.google.com/analytics/)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)