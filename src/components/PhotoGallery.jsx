import React, { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'

const PhotoGallery = ({ photos, title, className = '' }) => {
  const { currentLang, t } = useLanguage()
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!photos || photos.length === 0) {
    return null
  }

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    const nextIndex = (currentIndex + 1) % photos.length
    setCurrentIndex(nextIndex)
    setSelectedPhoto(photos[nextIndex])
  }

  const prevPhoto = () => {
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length
    setCurrentIndex(prevIndex)
    setSelectedPhoto(photos[prevIndex])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowRight') nextPhoto()
    if (e.key === 'ArrowLeft') prevPhoto()
  }

  return (
    <div className={`photo-gallery ${className}`}>
      {title && (
        <h4 className="gallery-title">{title}</h4>
      )}
      
      <div className="photo-grid">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="photo-item"
            onClick={() => openLightbox(photo, index)}
          >
            <img 
              src={photo.thumbnail || photo.url} 
              alt={photo.caption?.[currentLang] || photo.caption?.en || `Photo ${index + 1}`}
              loading="lazy"
            />
            <div className="photo-overlay">
              <div className="photo-info">
                {photo.caption?.[currentLang] && (
                  <span className="photo-caption">{photo.caption[currentLang]}</span>
                )}
                <span className="photo-expand">🔍</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              ✕
            </button>
            
            {photos.length > 1 && (
              <>
                <button className="lightbox-nav lightbox-prev" onClick={prevPhoto}>
                  ‹
                </button>
                <button className="lightbox-nav lightbox-next" onClick={nextPhoto}>
                  ›
                </button>
              </>
            )}
            
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.caption?.[currentLang] || selectedPhoto.caption?.en || 'Photo'}
            />
            
            <div className="lightbox-info">
              {selectedPhoto.caption?.[currentLang] && (
                <p className="lightbox-caption">{selectedPhoto.caption[currentLang]}</p>
              )}
              {selectedPhoto.location?.[currentLang] && (
                <p className="lightbox-location">
                  📍 {selectedPhoto.location[currentLang]}
                </p>
              )}
              {selectedPhoto.date && (
                <p className="lightbox-date">
                  📅 {new Date(selectedPhoto.date).toLocaleDateString(
                    currentLang === 'ja' ? 'ja-JP' : 
                    currentLang === 'zh' ? 'zh-TW' : 'en-US',
                    { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }
                  )}
                </p>
              )}
              <div className="lightbox-counter">
                {currentIndex + 1} / {photos.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PhotoGallery