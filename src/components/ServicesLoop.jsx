import React from 'react';
import './ServicesLoop.css';

export default function ServicesLoop() {
  const servicesRow1 = [
    { 
      name: 'Internetinių svetainių kūrimas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    { 
      name: 'Internetinių svetainių auditas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35"/>
        </svg>
      )
    },
    { 
      name: 'Paieškos sistemų optimizavimas (SEO)',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      )
    },
    { 
      name: 'Duomenų bazės',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3"/>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        </svg>
      )
    },
    { 
      name: 'Vartotojų valdymo sistemos',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      )
    },
    { 
      name: 'Pokalbių robotai',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <circle cx="9" cy="10" r="1" fill="currentColor"/>
          <circle cx="15" cy="10" r="1" fill="currentColor"/>
        </svg>
      )
    },
    { 
      name: 'Internetinių svetainių administravimas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
        </svg>
      )
    },
    { 
      name: 'Individualūs techniniai IT sprendimai',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16 18 22 12 16 6"/>
          <polyline points="8 6 2 12 8 18"/>
        </svg>
      )
    },
  ];

  const servicesRow2 = [
    { 
      name: 'Prekių ženklo vertės kūrimas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      )
    },
    { 
      name: 'Prekių ženklo vertės modeliavimas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10"/>
          <line x1="12" y1="20" x2="12" y2="4"/>
          <line x1="6" y1="20" x2="6" y2="14"/>
        </svg>
      )
    },
    { 
      name: 'Turinio marketingas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10 9 9 9 8 9"/>
        </svg>
      )
    },
    { 
      name: 'Vartotojų elgsena',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="4" fill="currentColor"/>
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
        </svg>
      )
    },
    { 
      name: 'Vartotojų patirties valdymas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
          <path d="M8 7h8"/>
          <path d="M12 3v8"/>
        </svg>
      )
    },
    { 
      name: 'Komunikacijos kampanijos',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
        </svg>
      )
    },
    { 
      name: 'Socialinių tinklų administravimas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
          <polyline points="17 2 12 7 7 2"/>
        </svg>
      )
    },
    { 
      name: 'Socialinių tinklų auditas',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"/>
          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"/>
        </svg>
      )
    },
  ];

  return (
    <div className="services-loop-container">
      {/* Pirma eilutė - slenka iš kairės į dešinę */}
      <div className="services-row">
        <div className="services-track services-track-left">
          {[...servicesRow1, ...servicesRow1, ...servicesRow1].map((service, index) => (
            <div key={index} className="service-item">
              <span className="service-icon">{service.icon}</span>
              <span className="service-name">{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Antra eilutė - slenka iš dešinės į kairę */}
      <div className="services-row">
        <div className="services-track services-track-right">
          {[...servicesRow2, ...servicesRow2, ...servicesRow2].map((service, index) => (
            <div key={index} className="service-item">
              <span className="service-icon">{service.icon}</span>
              <span className="service-name">{service.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
