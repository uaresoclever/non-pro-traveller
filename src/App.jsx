import React, { useState } from 'react'
import { LanguageProvider } from './hooks/useLanguage'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrailGuide from './components/TrailGuide'
import JourneyList from './components/JourneyList'
import Footer from './components/Footer'
import './styles/App.css'

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'journeys', 'journey-detail'
  const [selectedJourney, setSelectedJourney] = useState(null)

  const handleJourneySelect = (journey) => {
    setSelectedJourney(journey)
    setCurrentView('journey-detail')
  }

  const handleBackToHome = () => {
    setCurrentView('home')
    setSelectedJourney(null)
  }

  const handleViewAllJourneys = () => {
    setCurrentView('journeys')
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
              <TrailGuide onViewAllClick={handleViewAllJourneys} />
            </>
          )}
          
          {currentView === 'journeys' && (
            <JourneyList onJourneySelect={handleJourneySelect} />
          )}
          
          {currentView === 'journey-detail' && selectedJourney && (
            <TrailGuide 
              journey={selectedJourney} 
              onBackClick={() => setCurrentView('journeys')}
            />
          )}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App