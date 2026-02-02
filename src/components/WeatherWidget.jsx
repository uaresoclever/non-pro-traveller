import React, { useEffect, useRef } from 'react'

const WeatherWidget = ({ location, coordinates, label1, label2, theme = "weather_one" }) => {
  const widgetRef = useRef(null)

  useEffect(() => {
    // Clear any existing widget content
    if (widgetRef.current) {
      widgetRef.current.innerHTML = ''
    }

    // Create the weather widget link element
    const widgetLink = document.createElement('a')
    widgetLink.className = 'weatherwidget-io'
    widgetLink.href = `https://forecast7.com/en/12d7799d91/khao-yai/`
    widgetLink.setAttribute('data-label_1', label1)
    widgetLink.setAttribute('data-label_2', label2)
    widgetLink.setAttribute('data-theme', theme)
    widgetLink.textContent = `${label1} ${label2}`

    // Add the widget to our container
    if (widgetRef.current) {
      widgetRef.current.appendChild(widgetLink)
    }

    // Load the weather widget script
    const loadWeatherScript = () => {
      if (!document.getElementById('weatherwidget-io-js')) {
        const script = document.createElement('script')
        script.id = 'weatherwidget-io-js'
        script.src = 'https://weatherwidget.io/js/widget.min.js'
        script.async = true
        
        script.onload = () => {
          // Force widget initialization after script loads
          if (window.weatherwidget && window.weatherwidget.init) {
            window.weatherwidget.init()
          }
        }
        
        document.body.appendChild(script)
      } else {
        // Script already exists, try to reinitialize
        setTimeout(() => {
          if (window.weatherwidget && window.weatherwidget.init) {
            window.weatherwidget.init()
          }
        }, 100)
      }
    }

    // Load script after a short delay to ensure DOM is ready
    setTimeout(loadWeatherScript, 100)

    // Cleanup function
    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = ''
      }
    }
  }, [label1, label2, theme])

  return (
    <div className="weather-widget-container">
      <div ref={widgetRef}></div>
    </div>
  )
}

export default WeatherWidget