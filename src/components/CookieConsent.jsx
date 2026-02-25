/**
 * Cookie Consent Banner Component
 * 
 * Displays a GDPR-compliant cookie consent banner at the bottom of the page.
 * Allows users to accept or decline cookies for analytics and advertising.
 * 
 * @component
 */

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setShowBanner(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    
    // Enable Google Analytics if it was disabled
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
    
    // Disable Google Analytics
    if (window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-banner">
      <div className="cookie-consent-content">
        <div className="cookie-consent-text">
          <p className="cookie-consent-title">🍪 We use cookies</p>
          <p className="cookie-consent-description">
            We use cookies to improve your experience, analyze site traffic, and show personalized ads. 
            By clicking "Accept", you consent to our use of cookies.
          </p>
        </div>
        <div className="cookie-consent-actions">
          <button 
            onClick={handleDecline}
            className="cookie-consent-btn cookie-consent-btn-decline"
          >
            Decline
          </button>
          <button 
            onClick={handleAccept}
            className="cookie-consent-btn cookie-consent-btn-accept"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
