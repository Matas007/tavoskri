import TextType from './TextType';
import SEO from './SEO';
import './ProjectsPage.css';

const ProjectsPage = () => {
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

