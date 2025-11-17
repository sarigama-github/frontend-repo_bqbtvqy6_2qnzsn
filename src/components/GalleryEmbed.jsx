import React, { useMemo } from 'react'

// Helper to get query params with defaults
const useQuery = () => {
  const params = new URLSearchParams(window.location.search)
  return {
    // Comma-separated image URLs
    images: params.get('images')
      ? params
          .get('images')
          .split(',')
          .map((s) => decodeURIComponent(s.trim()))
      : [
          'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop',
        ],
    height: params.get('h') || '300', // height in px
    radius: params.get('radius') || '16', // border radius in px
    gap: params.get('gap') || '16', // gap between slides in px
    speed: params.get('speed') || '30', // seconds per full loop
    pause: params.get('pause') === '1', // pause on hover
    dir: params.get('dir') === 'right' ? 'right' : 'left',
    bg: params.get('bg') || 'transparent',
    shadow: params.get('shadow') === '0' ? false : true,
  }
}

const GalleryEmbed = () => {
  const { images, height, radius, gap, speed, pause, dir, bg, shadow } = useQuery()

  const trackStyle = useMemo(() => {
    const duration = Math.max(5, Number(speed)) + 's'
    const gapPx = Number(gap) + 'px'
    return {
      ['--duration']: duration,
      ['--gap']: gapPx,
    }
  }, [speed, gap])

  const slideStyle = {
    height: `${Number(height)}px`,
    borderRadius: `${Number(radius)}px`,
    boxShadow: shadow ? '0 10px 25px rgba(0,0,0,0.12)' : 'none',
  }

  // Duplicate images for seamless loop
  const slides = [...images, ...images]

  return (
    <div
      className="w-full min-h-0"
      style={{ background: bg }}
    >
      <style>{`
        .marquee-container { overflow: hidden; }
        .marquee-track { display: flex; align-items: center; gap: var(--gap); }
        .marquee-anim-left { animation: scroll-left var(--duration) linear infinite; }
        .marquee-anim-right { animation: scroll-right var(--duration) linear infinite; }
        .marquee-container:hover .pause-on-hover { animation-play-state: paused; }
        @keyframes scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>

      <div className={`marquee-container ${pause ? '' : ''}`}>
        <div
          className={`marquee-track ${dir === 'right' ? 'marquee-anim-right' : 'marquee-anim-left'} ${pause ? 'pause-on-hover' : ''}`}
          style={trackStyle}
        >
          {slides.map((src, idx) => (
            <div key={idx} className="shrink-0 overflow-hidden" style={slideStyle}>
              <img
                src={src}
                alt="gallery"
                className="h-full w-auto object-cover block"
                loading={idx > images.length ? 'lazy' : 'eager'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GalleryEmbed
