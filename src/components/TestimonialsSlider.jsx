import { useEffect, useRef, useState } from 'react';
import './TestimonialsSlider.css';

const testimonials = [
  {
    name: 'Aura S.',
    company: 'UAB "Eletis"',
    text: 'Ačiū tau labai už atliktą internetinių svetainių analizę ir pastebėjimus. Ji tikrai vertinga ir reikalinga.',
    image: '/previews/eletis-preview.png',
    logo: '/Untitled_design__10_-removebg-preview.png',
    stars: 5,
    rotate: -2
  },
  {
    name: 'Giedrius V.',
    company: 'MB "Farmakoekonomikos institutas"',
    text: 'Pagrindinis raktinis žodis „vaistų kompensavimas" šiuo metu yra pirmame Google paieškos puslapyje.',
    image: '/previews/farmako-preview.png',
    logo: '/Untitled_design__10_-removebg-preview.png',
    stars: 5,
    rotate: 1.5
  },
  {
    name: 'Mantas L.',
    company: 'MB "Baldų Mantas"',
    text: 'Pagaliau. Viskas patinka sukurtoje internetinėje svetainėje.',
    image: '/previews/baldu-mantas-preview.png',
    logo: '/Untitled_design__10_-removebg-preview.png',
    stars: 5,
    rotate: -1
  },
  {
    name: 'Julija S.',
    company: 'MB "Best Baldai"',
    text: 'Ačiū už bendradarbiavimą.',
    image: '/previews/best-baldai-preview.png',
    logo: '/Untitled_design__10_-removebg-preview.png',
    stars: 5,
    rotate: 2
  }
];

function Stars({ count }) {
  return (
    <div className="t-stars" aria-label={`${count} žvaigždutės`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 't-star filled' : 't-star'}>★</span>
      ))}
    </div>
  );
}

function TestimonialCard({ t }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="t-card"
      style={{ '--rotate': `${t.rotate}deg` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Floating image popup */}
      <div className={`t-popup ${hovered ? 'is-visible' : ''}`} aria-hidden="true">
        <div className="t-popup-screen">
          <div className="t-popup-bar">
            <span /><span /><span />
          </div>
          <img src={t.image} alt={t.company} className="t-popup-img" loading="lazy" />
        </div>
      </div>

      {/* Card content */}
      <div className="t-card-body">
        <div className="t-card-top">
          <Stars count={t.stars} />
          <img src={t.logo} alt="Tavo Skriptas" className="t-card-logo" />
        </div>
        <p className="t-card-text">"{t.text}"</p>
        <div className="t-card-author">
          <span className="t-card-name">{t.name}</span>
          <span className="t-card-company">{t.company}</span>
        </div>
      </div>
    </article>
  );
}

export default function TestimonialsSlider() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('is-visible');
      }),
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="testimonials" aria-label="Atsiliepimai">
      <div className="t-grid">
        {testimonials.map((t, i) => (
          <div key={t.name} className="t-card-wrap" style={{ '--delay': `${i * 0.1}s` }}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
    </section>
  );
}
