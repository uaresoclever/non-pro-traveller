import React, { useState, useEffect } from 'react'
import { LanguageProvider } from './hooks/useLanguage'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrailGuide from './components/TrailGuide'
import JourneyList from './components/JourneyList'
import Footer from './components/Footer'
import { trackPageView, trackJourneyView } from './utils/analytics'
import './styles/App.css'

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'journeys', 'journey-detail'
  const [selectedJourney, setSelectedJourney] = useState(null)
  const [initialFilters, setInitialFilters] = useState({})

  const handleJourneySelect = (journey) => {
    setSelectedJourney(journey)
    setCurrentView('journey-detail')
    
    // Track journey view
    trackJourneyView(journey.id, journey.title.en, journey.country.name.en)
    trackPageView(`${journey.title.en} - Journey Details`, window.location.href)
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedJourney(null)
    setInitialFilters({})
    
    // Track page view
    trackPageView('Home - Oh! A Non-Professional Traveller LOL', window.location.href)
  }

  const handleViewAllJourneys = (filters = {}) => {
    setCurrentView('journeys')
    setInitialFilters(filters)
    
    // Track page view
    trackPageView('All Journeys - Oh! A Non-Professional Traveller LOL', window.location.href)
  }

  // Track initial page load
  useEffect(() => {
    trackPageView('Home - Oh! A Non-Professional Traveller LOL', window.location.href)
  }, [])

  const handleTagClick = (tag) => {
    handleViewAllJourneys({ search: tag })
  }

  return (
    <LanguageProvider>
      <div className="App">
        <Navbar 
          onHomeClick={handleBackToHome}
          onJourneysClick={handleViewAllJourneys}
          currentView={currentView}
        />
        <main className="main-content">
          {currentView === 'home' && (
            <>
              <Hero onExploreClick={handleViewAllJourneys} />
              <TrailGuide onViewAllClick={handleViewAllJourneys} onTagClick={handleTagClick} />
            </>
          )}
          
          {currentView === 'journeys' && (
            <JourneyList 
              onJourneySelect={handleJourneySelect} 
              initialFilters={initialFilters}
              onTagClick={handleTagClick}
            />
          )}
          
          {currentView === 'journey-detail' && selectedJourney && (
            <TrailGuide 
              journey={selectedJourney} 
              onBackClick={() => setCurrentView('journeys')}
              onTagClick={handleTagClick}
            />
          )}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App