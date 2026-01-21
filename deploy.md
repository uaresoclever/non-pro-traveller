# Deployment Guide

## Quick GitHub Pages Deployment

1. **Initialize Git** (run in your project folder):
```bash
git init
git add .
git commit -m "Initial travel website commit"
```

2. **Create GitHub Repository**:
   - Go to https://github.com/new
   - Repository name: `travel-journey`
   - Make it Public
   - Don't initialize with README

3. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR-USERNAME/travel-journey.git
git branch -M main
git push -u origin main
```

4. **Enable GitHub Pages**:
   - Go to your repo Settings → Pages
   - Source: Deploy from branch "main"
   - Folder: "/ (root)"
   - Save

## Alternative: Netlify Drop Method

1. Go to https://netlify.com
2. Sign up for free
3. Drag your entire project folder to the deploy area
4. Get instant live URL!

## Custom Domain (Optional)

After deployment, you can add your own domain:
- GitHub Pages: Add CNAME file with your domain
- Netlify: Go to Domain settings → Add custom domain
- Vercel: Go to Project settings → Domains

## Update Your Website

After initial deployment:
```bash
# Make changes to your files
git add .
git commit -m "Update travel content"
git push
# Your site updates automatically!
```