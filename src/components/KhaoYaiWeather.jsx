import React from 'react'

const KhaoYaiWeather = () => {
  // Show custom widget immediately for testing
  return (
    <div className="weather-widget-container">
      <div className="custom-weather-widget">
        <div className="weather-header">
          <h4>🌤️ Khao Yai Weather</h4>
          <span className="weather-temp">29°C</span>
        </div>
        <div className="weather-details">
          <div className="weather-item">
            <span className="weather-icon">☁️</span>
            <span className="weather-desc">Partly Cloudy</span>
          </div>
          <div className="weather-item">
            <span className="weather-icon">💧</span>
            <span className="weather-desc">Humidity: 75%</span>
          </div>
          <div className="weather-item">
            <span className="weather-icon">🌬️</span>
            <span className="weather-desc">Wind: 12 km/h</span>
          </div>
        </div>
        <div className="weather-footer">
          <a 
            href="https://forecast7.com/en/12d7799d91/khao-yai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="weather-link"
          >
            View Full Forecast →
          </a>
        </div>
      </div>
    </div>
  )
}

export default KhaoYaiWeather