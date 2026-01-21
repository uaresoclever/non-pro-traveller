// Google Analytics 4 utility functions
// Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics measurement ID

export const GA_MEASUREMENT_ID = 'G-WEJHS1NV3Q' // Your Google Analytics measurement ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title: document.title,
      page_location: window.location.href,
      send_page_view: true
    })
  }
}

// Track page views
export const trackPageView = (page_title, page_location) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_title,
      page_location,
      send_page_view: true
    })
  }
}

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    })
  }
}

// Track journey views
export const trackJourneyView = (journeyId, journeyTitle, country) => {
  trackEvent('view_journey', 'Journey', `${journeyId} - ${journeyTitle}`, 1)
  trackEvent('view_country', 'Country', country, 1)
}

// Track tag clicks
export const trackTagClick = (tag, language) => {
  trackEvent('click_tag', 'Navigation', `${tag} (${language})`, 1)
}

// Track language switches
export const trackLanguageSwitch = (fromLang, toLang) => {
  trackEvent('language_switch', 'Language', `${fromLang} to ${toLang}`, 1)
}

// Track search usage
export const trackSearch = (searchTerm, resultsCount, language) => {
  trackEvent('search', 'Search', `${searchTerm} (${language})`, resultsCount)
}

// Track filter usage
export const trackFilter = (filterType, filterValue, language) => {
  trackEvent('filter', 'Filter', `${filterType}: ${filterValue} (${language})`, 1)
}

// Track journey card clicks
export const trackJourneyCardClick = (journeyId, journeyTitle, source) => {
  trackEvent('click_journey_card', 'Journey', `${journeyId} - ${journeyTitle} from ${source}`, 1)
}

// Track external link clicks (if any)
export const trackExternalLink = (url, linkText) => {
  trackEvent('click_external_link', 'External', `${linkText} - ${url}`, 1)
}

// Track user engagement
export const trackEngagement = (action, details) => {
  trackEvent('engagement', 'User', `${action} - ${details}`, 1)
}