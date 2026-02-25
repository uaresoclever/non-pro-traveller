/**
 * LazyImage Component
 * 
 * A React component that implements lazy loading for images using the native
 * browser loading="lazy" attribute. Provides loading states, error handling,
 * and fallback support.
 * 
 * @component
 * @example
 * <LazyImage 
 *   src="/images/photo.jpg" 
 *   alt="Travel photo"
 *   placeholder="/images/placeholder.jpg"
 * />
 */

import { useState } from 'react';

/**
 * LazyImage component with loading states and error handling
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL (required)
 * @param {string} props.alt - Alt text for accessibility (required)
 * @param {string} props.className - CSS classes
 * @param {Function} props.onLoad - Callback when image loads
 * @param {Function} props.onError - Callback when image fails
 * @param {string} props.placeholder - Placeholder image URL
 * @returns {JSX.Element} Lazy-loaded image element
 */
export default function LazyImage({
  src,
  alt,
  className = '',
  onLoad,
  onError,
  placeholder,
  ...props
}) {
  const [imageState, setImageState] = useState('loading');

  const handleLoad = (event) => {
    setImageState('loaded');
    if (onLoad) {
      onLoad(event);
    }
  };

  const handleError = (event) => {
    setImageState('error');
    if (onError) {
      onError(event);
    }
  };

  // Build CSS classes based on state
  const stateClass = `lazy-image-${imageState}`;
  const combinedClassName = `${className} ${stateClass}`.trim();

  // Show placeholder on error if provided, otherwise show the original src
  const imageSrc = imageState === 'error' && placeholder 
    ? placeholder 
    : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading="lazy"
      className={combinedClassName}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
}
