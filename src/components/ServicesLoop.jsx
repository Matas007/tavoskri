import React from 'react';
import './ServicesLoop.css';

export default function ServicesLoop() {
  const servicesRow1 = [
    { name: 'Internetinių svetainių kūrimas', icon: '🌐' },
    { name: 'Internetinių svetainių auditas', icon: '🔍' },
    { name: 'Paieškos sistemų optimizavimas (SEO)', icon: '📈' },
    { name: 'Duomenų bazės', icon: '💾' },
    { name: 'Vartotojų valdymo sistemos', icon: '👥' },
    { name: 'Pokalbių robotai', icon: '🤖' },
    { name: 'Internetinių svetainių administravimas', icon: '⚙️' },
    { name: 'Individualūs techniniai IT sprendimai', icon: '💡' },
  ];

  const servicesRow2 = [
    { name: 'Prekių ženklo vertės kūrimas', icon: '✨' },
    { name: 'Prekių ženklo vertės modeliavimas', icon: '📊' },
    { name: 'Turinio marketingas', icon: '📝' },
    { name: 'Vartotojų elgsena', icon: '🎯' },
    { name: 'Vartotojų patirties valdymas', icon: '🌟' },
    { name: 'Komunikacijos kampanijos', icon: '📢' },
    { name: 'Socialinių tinklų administravimas', icon: '📱' },
    { name: 'Socialinių tinklų auditas', icon: '🔎' },
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
