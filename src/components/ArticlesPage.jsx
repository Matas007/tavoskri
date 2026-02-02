import SEO from './SEO';
import './ArticlesPage.css';

const ArticlesPage = () => {
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
      </div>
    </div>
    </>
  );
};

export default ArticlesPage;

