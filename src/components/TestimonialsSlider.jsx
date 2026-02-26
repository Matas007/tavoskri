import { useCallback, useEffect, useRef, useState } from 'react';
import './TestimonialsSlider.css';

const testimonials = [
  {
    name: 'Aura S.',
    company: 'UAB "Eletis"',
    text: 'Ačiū tau labai už atliktą internetinių svetainių analizę ir pastebėjimus. Ji tikrai vertinga ir reikalinga. ',
    hoverImage: '/previews/eletis-preview.jpg',
    hoverLabel: 'Eletis svetainė'
  },
  {
    name: 'Giedrius V.',
    company: 'MB "Farmakoekonomikos institutas"',
    text: 'Po atliktų darbų pastebimai pagerėjo svetainės techninė kokybė ir našumas. Įgyvendinus SEO optimizavimo sprendimus, pasiekti apčiuopiami rezultatai – pagrindinis raktinis žodis „vaistų kompensavimas" šiuo metu yra rodomas pirmame „Google" paieškos puslapyje, iškart po Valstybinės ligonių kasų svetainės.',
    hoverImage: '/previews/farmako-preview.jpg',
    hoverLabel: 'Farmakoekonomikos institutas'
  },
  {
    name: 'Mantas L.',
    company: 'MB "Baldu Mantas"',
    text: 'Pagaliau. Viskas patinka sukurtoje internetinėje svetainėje.',
    hoverImage: '/previews/baldu-mantas-preview.jpg',
    hoverLabel: 'Baldų Mantas svetainė'
  },
  {
    name: 'Julija S.',
    company: 'MB "Best Baldai"',
    text: 'Ačiū už bendradarbiavimą.',
    hoverImage: '/previews/best-baldai-preview.jpg',
    hoverLabel: 'Best Baldai svetainė'
  }
];

export default function TestimonialsSlider() {
  const sectionRef = useRef(null);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  // Hover preview state
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const [previewVisible, setPreviewVisible] = useState(false);
  const rafRef = useRef(null);

  const goTo = useCallback((nextIndex) => {
    const total = testimonials.length;
    const normalized = (nextIndex + total) % total;
    setIndex(normalized);
  }, []);

  const handlePrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const handleNext = useCallback(() => goTo(index + 1), [goTo, index]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const handleTouchMove = (event) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
  };

  const handleTouchEnd = () => {
    const delta = touchDeltaX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  const handleMouseMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPreviewPos({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setPreviewVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const current = testimonials[index];

  return (
    <section ref={sectionRef} className="testimonials" aria-label="Atsiliepimai">
      <div
        className="testimonials-slider"
        role="group"
        aria-roledescription="carousel"
        aria-label="Atsiliepimų slideris"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="slider-control prev" onClick={handlePrev} aria-label="Ankstesnis atsiliepimas">‹</button>

        <div
          className="testimonial-card"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
        >
          <div className="testimonial-corner-glow" aria-hidden="true" />
          <img
            className="testimonial-logo"
            src="/Untitled_design__10_-removebg-preview.png"
            alt="Tavo Skriptas"
          />
          <div className="testimonial-quote">"</div>
          <p className="testimonial-text">{current.text}</p>
          <div className="testimonial-author">
            <span className="testimonial-name">{current.name}</span>
            <span className="testimonial-company">{current.company}</span>
          </div>
        </div>

        <button className="slider-control next" onClick={handleNext} aria-label="Kitas atsiliepimas">›</button>
      </div>

      <div className="slider-dots" aria-hidden="true">
        {testimonials.map((item, dotIndex) => (
          <button
            key={item.name}
            className={`slider-dot ${dotIndex === index ? 'is-active' : ''}`}
            onClick={() => goTo(dotIndex)}
            aria-label={`Rodyti atsiliepimą ${dotIndex + 1}`}
          />
        ))}
      </div>

      {/* Hover floating preview — tik desktop */}
      <div
        className={`testimonial-preview ${previewVisible ? 'is-visible' : ''}`}
        style={{
          left: previewPos.x,
          top: previewPos.y
        }}
        aria-hidden="true"
      >
        <img
          src={current.hoverImage}
          alt={current.hoverLabel}
          className="testimonial-preview-img"
          onError={e => { e.currentTarget.style.display = 'none'; }}
        />
        <span className="testimonial-preview-label">{current.hoverLabel}</span>
      </div>
    </section>
  );
}
