import { useState } from 'react';
import TextType from './TextType';
import SEO from './SEO';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const demoSites = [
    {
      label: 'Baldų Mantas',
      url: 'https://baldumantas.lt/'
    },
    {
      label: 'Vaistų kompensavimas',
      url: 'https://vaistukompensavimas.lt/'
    }
  ];
  const [activeDemo, setActiveDemo] = useState(0);
  const changingTexts = [
    "informacijos rinkimą",
    "specifikavimą",
    "projektavimą",
    "testavimą",
    ", kad Jūsų projektas būtų sklandžiai įgyvendintas"
  ];

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
        
        {/* Temporarily disabled typing section */}
        {/*
        <div className="projects-typing-container">
          <span className="static-text">Atliekame </span>
          <TextType 
            as="span"
            text={changingTexts}
            typingSpeed={75}
            pauseDuration={1500}
            deletingSpeed={50}
            showCursor
            cursorCharacter="_"
            loop={true}
            className="projects-text-type"
          />
        </div>
        */}

        <section className="projects-demo" aria-labelledby="projects-demo-title">
          <div className="projects-demo-header">
            <h2 id="projects-demo-title">Live demo</h2>
            <p>Pasibandykite realius projektus tiesiog čia.</p>
          </div>

          <div className="projects-demo-tabs" role="tablist" aria-label="Demo pasirinkimas">
            {demoSites.map((site, index) => (
              <button
                key={site.url}
                type="button"
                role="tab"
                aria-selected={activeDemo === index}
                className={`projects-demo-tab ${activeDemo === index ? 'is-active' : ''}`}
                onClick={() => setActiveDemo(index)}
              >
                {site.label}
              </button>
            ))}
          </div>

          <div className="projects-demo-frame">
            <iframe
              title={`Demo - ${demoSites[activeDemo].label}`}
              src={demoSites[activeDemo].url}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="projects-demo-actions">
            <a
              href={demoSites[activeDemo].url}
              target="_blank"
              rel="noreferrer"
              className="projects-demo-link"
            >
              Atidaryti naujame lange
            </a>
          </div>
        </section>

        <div className="projects-description">
          <h2>Kaip mes dirbame</h2>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-card-header">
                <img src="/Untitled_design__10_-removebg-preview.png" alt="Logo" className="project-card-logo" />
                <h3>Informacijos rinkimas</h3>
              </div>
              <p>Kruopščiai renkame ir analizuojame visą reikalingą informaciją, kad suprastume jūsų verslo poreikius ir tikslus.</p>
            </div>
            <div className="project-card">
              <div className="project-card-header">
                <img src="/Untitled_design__10_-removebg-preview.png" alt="Logo" className="project-card-logo" />
                <h3>Specifikavimas</h3>
              </div>
              <p>Detaliai aprašome projekto reikalavimus, funkcionalumą ir techninę architektūrą.</p>
            </div>
            <div className="project-card">
              <div className="project-card-header">
                <img src="/Untitled_design__10_-removebg-preview.png" alt="Logo" className="project-card-logo" />
                <h3>Projektavimas</h3>
              </div>
              <p>Kuriame modernias, interaktyvias ir lengvai naudojamas sąsajas, atitinkančias jūsų poreikius.</p>
            </div>
            <div className="project-card">
              <div className="project-card-header">
                <img src="/Untitled_design__10_-removebg-preview.png" alt="Logo" className="project-card-logo" />
                <h3>Testavimas</h3>
              </div>
              <p>Atidžiai testuojame kiekvieną funkcionalumą, užtikrindami aukščiausią kokybę ir patikimumą.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProjectsPage;

