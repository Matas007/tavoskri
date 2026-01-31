import { FaBullhorn, FaChartLine, FaCheckCircle, FaGlobe, FaHandshake, FaHeart, FaLock, FaMobileAlt, FaSmile, FaUsers, FaWrench } from 'react-icons/fa';
import SEO from './SEO';
import './ArticlesPage.css';

const ArticlesPage = () => {
  const pyramidSections = [
    {
      title: 'Socialinis poveikis',
      items: [
        {
          icon: <FaHandshake />,
          name: 'Reputacija',
          description: 'Nuoseklus dizainas ir kokybiškas turinys stiprina prekės ženklo įvaizdį reklamose ir socialiniuose tinkluose.'
        },
        {
          icon: <FaUsers />,
          name: 'Bendruomenė',
          description: 'Aiškus naratyvas ir CTA augina sekėjų ratą bei skatina dalintis jūsų svetaine ar aplikacija.'
        }
      ]
    },
    {
      title: 'Gyvenimą keičiantis',
      items: [
        {
          icon: <FaChartLine />,
          name: 'Augina pardavimus',
          description: 'Optimizuoti landing puslapiai ir reklamos srautai didina konversijas ir užklausas.'
        },
        {
          icon: <FaBullhorn />,
          name: 'Didina matomumą',
          description: 'SEO ir reklamos suderinimas leidžia pasiekti platesnę auditoriją be bereikalingų išlaidų.'
        },
        {
          icon: <FaGlobe />,
          name: 'Plečia rinkas',
          description: 'Tinkamai lokalizuota svetainė ar aplikacija leidžia veikti tarptautinėje rinkoje.'
        }
      ]
    },
    {
      title: 'Emocinis',
      items: [
        {
          icon: <FaSmile />,
          name: 'Džiaugsmas naudotis',
          description: 'Maloni UI patirtis didina vartotojų pasitikėjimą ir skatina sugrįžti.'
        },
        {
          icon: <FaHeart />,
          name: 'Pasitikėjimas',
          description: 'Aiškūs pasiūlymai, social proof ir sklandus UX mažina abejones prieš pirkimą.'
        },
        {
          icon: <FaCheckCircle />,
          name: 'Aiškumas',
          description: 'Struktūruotas turinys padeda greitai suprasti paslaugą ar produktą.'
        }
      ]
    },
    {
      title: 'Funkcinis',
      items: [
        {
          icon: <FaMobileAlt />,
          name: 'Mobilus patogumas',
          description: 'Greitas ir responsyvus sprendimas užtikrina, kad reklamos srautas konvertuos telefone.'
        },
        {
          icon: <FaWrench />,
          name: 'Integracijos',
          description: 'CRM, mokėjimų ar el. pašto integracijos automatizuoja užklausų valdymą.'
        },
        {
          icon: <FaLock />,
          name: 'Saugumas',
          description: 'SSL, privatumo politika ir saugūs duomenys didina pasitikėjimą ir atitinka reikalavimus.'
        }
      ]
    }
  ];

  return (
    <>
      <SEO 
        title="Straipsniai - Tavo Skriptas"
        description="Ruošiame įdomaus turinio apie web aplikacijų kūrimą, IT sprendimus ir programavimą."
        keywords="straipsniai, IT naujienos, programavimo patarimai, web development, Tavo Skriptas"
      />
      <div className="articles-page">
      <div className="articles-container">
        <h1 className="articles-title">Straipsniai</h1>
        
        <div className="loader-wrapper">
          <span className="loader-letter">J</span>
          <span className="loader-letter">A</span>
          <span className="loader-letter">U</span>
          <span className="loader-letter loader-space"> </span>
          <span className="loader-letter">G</span>
          <span className="loader-letter">R</span>
          <span className="loader-letter">E</span>
          <span className="loader-letter">I</span>
          <span className="loader-letter">T</span>
          <span className="loader-letter">A</span>
          <span className="loader-letter">I</span>

          <div className="loader"></div>

          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>

        <p className="articles-subtitle">Ruošiame įdomaus turinio jums</p>

        <section className="articles-pyramid" aria-labelledby="pyramid-title">
          <h2 id="pyramid-title" className="pyramid-title">Vertės piramidė reklamoms ir web sprendimams</h2>
          <p className="pyramid-intro">
            Trumpas gidas, kaip internetinės svetainės ir aplikacijos kuria vertę: nuo funkcinių pagrindų iki
            socialinio poveikio.
          </p>

          <div className="pyramid-grid">
            {pyramidSections.map(section => (
              <div key={section.title} className="pyramid-section">
                <h3 className="pyramid-section-title">{section.title}</h3>
                <div className="pyramid-cards">
                  {section.items.map(item => (
                    <article key={item.name} className="pyramid-card">
                      <span className="pyramid-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                      <div>
                        <h4 className="pyramid-card-title">{item.name}</h4>
                        <p className="pyramid-card-text">{item.description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default ArticlesPage;

