import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LazyImage from './LazyImage.jsx';

describe('LazyImage Component', () => {
  it('renders img element with loading="lazy" attribute', () => {
    render(<LazyImage src="/test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeDefined();
    expect(img.getAttribute('loading')).toBe('lazy');
  });

  it('applies loading state CSS class initially', () => {
    render(<LazyImage src="/test.jpg" alt="Test image" />);
    const img = screen.getByAltText('Test image');
    expect(img.className).toContain('lazy-image-loading');
    expect(img.getAttribute('src')).toBe('/test.jpg');
  });

  it('displays placeholder during loading state via CSS classes', () => {
    render(
      <LazyImage 
        src="/test.jpg" 
        alt="Test image" 
        placeholder="/placeholder.jpg"
      />
    );
    const img = screen.getByAltText('Test image');
    // The actual image src is used, placeholder shown via CSS based on lazy-image-loading class
    expect(img.getAttribute('src')).toBe('/test.jpg');
    expect(img.className).toContain('lazy-image-loading');
  });

  it('transitions to loaded state and calls onLoad callback', () => {
    const onLoad = vi.fn();
    render(<LazyImage src="/test.jpg" alt="Test image" onLoad={onLoad} />);
    const img = screen.getByAltText('Test image');
    
    fireEvent.load(img);
    
    expect(img.className).toContain('lazy-image-loaded');
    expect(onLoad).toHaveBeenCalledOnce();
  });

  it('transitions to error state and calls onError callback', () => {
    const onError = vi.fn();
    render(<LazyImage src="/test.jpg" alt="Test image" onError={onError} />);
    const img = screen.getByAltText('Test image');
    
    fireEvent.error(img);
    
    expect(img.className).toContain('lazy-image-error');
    expect(onError).toHaveBeenCalledOnce();
  });

  it('shows placeholder on error when provided', () => {
    render(
      <LazyImage 
        src="/test.jpg" 
        alt="Test image" 
        placeholder="/fallback.jpg"
      />
    );
    const img = screen.getByAltText('Test image');
    
    fireEvent.error(img);
    
    expect(img.getAttribute('src')).toBe('/fallback.jpg');
  });

  it('applies custom className along with state class', () => {
    render(
      <LazyImage 
        src="/test.jpg" 
        alt="Test image" 
        className="custom-class"
      />
    );
    const img = screen.getByAltText('Test image');
    expect(img.className).toContain('custom-class');
    expect(img.className).toContain('lazy-image-loading');
  });

  it('passes through additional props to img element', () => {
    render(
      <LazyImage 
        src="/test.jpg" 
        alt="Test image"
        width="100"
        height="100"
        data-testid="custom-img"
      />
    );
    const img = screen.getByAltText('Test image');
    expect(img.getAttribute('width')).toBe('100');
    expect(img.getAttribute('height')).toBe('100');
    expect(img.getAttribute('data-testid')).toBe('custom-img');
  });
});
