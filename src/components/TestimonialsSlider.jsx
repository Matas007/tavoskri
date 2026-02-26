import { useEffect, useRef } from 'react';
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
          <article
            key={t.name}
            className="t-card"
            style={{ '--rotate': `${t.rotate}deg`, '--delay': `${i * 0.1}s` }}
          >
            {/* Stars */}
            <Stars count={t.stars} />

            {/* Thumbnail + Quote row */}
            <div className="t-body-row">
              <div className="t-thumb-wrap">
                <img src={t.image} alt={t.company} className="t-thumb" loading="lazy" />
              </div>
              <p className="t-quote">"{t.text}"</p>
            </div>

            {/* Author */}
            <div className="t-author-row">
              <img src={t.logo} alt="logo" className="t-author-avatar" />
              <div className="t-author-info">
                <span className="t-card-name">{t.name}</span>
                <span className="t-card-company">{t.company}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
