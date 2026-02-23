import { useMemo, useState } from 'react';
import SEO from './SEO';
import CalculatorPage from './CalculatorPage';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const demoSites = useMemo(() => [
    {
      id: 'site1',
      label: '1 svetainė',
      url: 'https://seagreen-dove-125684.hostingersite.com'
    },
    {
      id: 'site2',
      label: '2 svetainė',
      url: 'https://green-echidna-111699.hostingersite.com'
    }
  ], []);

  const [activeDemoId, setActiveDemoId] = useState('site1');
  const activeDemo = demoSites.find(s => s.id === activeDemoId) || demoSites[0];

  return (
    <>
      <SEO 
        title="Mūsų Projektai - Tavo Skriptas"
        description="Internetinių svetainių ir mobiliųjų aplikacijų kūrimas, duomenų valdymas"
        keywords="projektų valdymas, informacijos rinkimas, specifikavimas, projektavimas, testavimas, Tavo Skriptas"
      />
      <div className="projects-page">
      <div className="projects-container">
        <h1 className="projects-title">Mūsų Projektai</h1>

        <section className="projects-demo" aria-label="Projektų demonstracija">
          <h2>Demo versija pasibandymui</h2>
          <p className="projects-demo-note">
            Pasirinkite svetainę ir pasibandykite patys - čia ir dabar!
          </p>
          <div className="projects-demo-frame-wrap">
            <div className="projects-demo-topbar" role="group" aria-label="Demo svetainių pasirinkimas">
              <div className="projects-demo-window-dots" aria-hidden="true">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <div className="projects-demo-tabs">
                {demoSites.map(site => (
                  <button
                    key={site.id}
                    type="button"
                    className={`projects-demo-tab ${activeDemoId === site.id ? 'active' : ''}`}
                    onClick={() => setActiveDemoId(site.id)}
                  >
                    {site.label}
                  </button>
                ))}
              </div>
              <div className="projects-demo-live">Transliuoja</div>
            </div>
            <iframe
              title={`Demo svetainė: ${activeDemo.label}`}
              src={activeDemo.url}
              className="projects-demo-frame"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="clipboard-write; fullscreen"
            />
          </div>
        </section>

        <div className="projects-description">
          <h2>Kaip mes dirbame</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-card-header">
                <div className="project-card-logo-ring">
                  <img src="/Untitled_design__10_-removebg-preview.png" alt="Logo" className="project-card-logo" />
                </div>
                <h3>Informacijos rinkimas</h3>
              </div>
              <p>Kruopščiai renkame ir analizuojame visą reikalingą informaciją, kad suprastume jūsų verslo poreikius ir tikslus.</p>
            </div>
            <div className="project-card">
              <div className="project-card-header">
                <div className="project-card-logo-ring">
                  <img src="/Untitled_design__10_-removebg-preview.png" alt="Logo" className="project-card-logo" />
                </div>
                <h3>Specifikavimas</h3>
              </div>
              <p>Detaliai aprašome projekto reikalavimus, funkcionalumą ir techninę architektūrą.</p>
            </div>
            <div className="project-card">
              <div className="project-card-header">
                <div className="project-card-logo-ring">
                  <img src="/Untitled_design__10_-removebg-preview.png" alt="Logo" className="project-card-logo" />
                </div>
                <h3>Projektavimas</h3>
              </div>
              <p>Kuriame modernias, interaktyvias ir lengvai naudojamas sąsajas, atitinkančias jūsų poreikius.</p>
            </div>
            <div className="project-card">
              <div className="project-card-header">
                <div className="project-card-logo-ring">
                  <img src="/Untitled_design__10_-removebg-preview.png" alt="Logo" className="project-card-logo" />
                </div>
                <h3>Testavimas</h3>
              </div>
              <p>Atidžiai testuojame kiekvieną funkcionalumą, užtikrindami aukščiausią kokybę ir patikimumą.</p>
            </div>
          </div>
        </div>

        <CalculatorPage embedded />
      </div>
    </div>
    </>
  );
};

export default ProjectsPage;

