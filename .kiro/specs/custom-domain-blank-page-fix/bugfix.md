# Bugfix Requirements Document

## Introduction

The React-based trail guide app (non-pro-traveller) displays correctly when accessed via the original GitHub Pages URL (uaresoclever.github.io/non-pro-traveller) but shows a blank page when accessed via the custom domain (www.non-pro-traveller.xyz). The DNS configuration has been verified as correct, indicating the issue is related to the application's build configuration rather than DNS settings.

The root cause is a mismatch between the Vite build configuration and the custom domain setup. The app is built with a base path of `/non-pro-traveller/` (configured in vite.config.js), which works for GitHub Pages subdirectory deployment but breaks when using a custom domain where the app should be served from the root path `/`.

## Bug Analysis

### Current Behavior (Defect)

1.1 WHEN the site is accessed via the custom domain www.non-pro-traveller.xyz THEN the system displays a blank page with broken asset paths (assets are requested from /non-pro-traveller/assets/* instead of /assets/*)

1.2 WHEN the browser attempts to load JavaScript and CSS assets via the custom domain THEN the system returns 404 errors because the assets are referenced with the incorrect base path /non-pro-traveller/

1.3 WHEN the custom domain is configured in GitHub Pages settings THEN the system does not have a CNAME file in the build output to persist the custom domain configuration across deployments

### Expected Behavior (Correct)

2.1 WHEN the site is accessed via the custom domain www.non-pro-traveller.xyz THEN the system SHALL display the full application with all assets loading correctly from the root path

2.2 WHEN the browser attempts to load JavaScript and CSS assets via the custom domain THEN the system SHALL serve assets from the correct root-relative paths (/assets/* instead of /non-pro-traveller/assets/*)

2.3 WHEN the application is built and deployed THEN the system SHALL include a CNAME file in the dist output containing "www.non-pro-traveller.xyz" to persist the custom domain configuration

### Unchanged Behavior (Regression Prevention)

3.1 WHEN the site is accessed via the original GitHub Pages URL (uaresoclever.github.io/non-pro-traveller) THEN the system SHALL CONTINUE TO display the application correctly with all assets loading

3.2 WHEN the application is built for development THEN the system SHALL CONTINUE TO use the root base path (/) for local development server

3.3 WHEN the application is deployed via the GitHub Actions workflow THEN the system SHALL CONTINUE TO build successfully and deploy to GitHub Pages
