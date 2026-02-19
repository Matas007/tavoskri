import SEO from './SEO';
import './ProjectsPage.css';

const ProjectsPage = () => {
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

        <section className="projects-demo" aria-label="Projektų demonstracija">
          <h2>Demo versija pasibandymui</h2>
          <p className="projects-demo-note">
            Žemiau galite iškart pasibandyti mano kurtos svetainės demonstracinę versiją.
          </p>
          <div className="projects-demo-frame-wrap">
            <iframe
              title="Demo svetainė"
              src="https://seagreen-dove-125684.hostingersite.com"
              className="projects-demo-frame"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="clipboard-write; fullscreen"
            />
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default ProjectsPage;

