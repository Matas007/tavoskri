import { useCallback, useRef, useState } from 'react';
import './TestimonialsSlider.css';

const testimonials = [
  {
    name: 'Aura S.',
    company: 'UAB "Eletis"',
    text: 'Įrašykite atsiliepimą apie svetainės ar reklamos rezultatus. Trumpai, aiškiai ir konkrečiai.'
  },
  {
    name: 'Giedrius V.',
    company: 'MB "Farmakoekonomikos institutas"',
    text: 'Įrašykite atsiliepimą apie techninę kokybę, SEO ar našumą. Pvz.: po optimizacijos pagerėjo rezultatai.'
  },
  {
    name: 'Mantas L.',
    company: 'MB "Baldu Mantas"',
    text: 'Įrašykite trumpą atsiliepimą apie dizainą, patirtį ar bendradarbiavimą.'
  },
  {
    name: 'Julija S.',
    company: 'MB "Best Baldai"',
    text: 'Įrašykite trumpą padėką ar įspūdį apie gautą sprendimą.'
  }
];

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchDeltaX = useRef(0);

  const goTo = useCallback((nextIndex) => {
    const total = testimonials.length;
    const normalized = (nextIndex + total) % total;
    setIndex(normalized);
  }, []);

  const handlePrev = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  const handleNext = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

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
      if (delta < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
  };

  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <div className="testimonials-header">
        <h2 id="testimonials-title">Atsiliepimai</h2>
        <p>Keli klientų atsiliepimai apie mūsų darbus ir rezultatus.</p>
      </div>

      <div
        className="testimonials-slider"
        role="group"
        aria-roledescription="carousel"
        aria-label="Atsiliepimų slideris"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button className="slider-control prev" onClick={handlePrev} aria-label="Ankstesnis atsiliepimas">
          ‹
        </button>

        <div className="testimonial-card">
          <div className="testimonial-corner-glow" aria-hidden="true" />
          <img
            className="testimonial-logo"
            src="/Untitled_design__10_-removebg-preview.png"
            alt="Tavo Skriptas"
          />
          <div className="testimonial-quote">“</div>
          <p className="testimonial-text">{testimonials[index].text}</p>
          <div className="testimonial-author">
            <span className="testimonial-name">{testimonials[index].name}</span>
            <span className="testimonial-company">{testimonials[index].company}</span>
          </div>
        </div>

        <button className="slider-control next" onClick={handleNext} aria-label="Kitas atsiliepimas">
          ›
        </button>
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
    </section>
  );
}
