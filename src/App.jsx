import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import LiquidEther from './LiquidEther';
import BubbleMenu from './BubbleMenu';
import Footer from './components/Footer';
import CookieConsentBanner, { getConsent } from './components/CookieConsentBanner';
import BgMusicToggle from './components/BgMusicToggle';
import SEO from './components/SEO';
import TestimonialsSlider from './components/TestimonialsSlider';
import ServicesLoop from './components/ServicesLoop';
import './App.css';

const AboutPage = lazy(() => import('./components/AboutPage'));
const ProjectsPage = lazy(() => import('./components/ProjectsPage'));
const ArticlesPage = lazy(() => import('./components/ArticlesPage'));
const BookingForm = lazy(() => import('./components/BookingForm'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));

function AppContent() {
  const location = useLocation();
  const [consent, setConsent] = useState(() => getConsent());
  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about';
  const isProjects = location.pathname === '/projects';
  const isArticles = location.pathname === '/articles';
  const isPrivacy = location.pathname === '/privacy';
  const showFooter = isHome || isAbout || isProjects || isArticles || isPrivacy;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="app">
      <div className="liquid-background">
        <LiquidEther
          colors={['#C9A882', '#E8D5C4', '#9D7852']}
          mouseForce={15}
          cursorSize={80}
          isViscous={false}
          viscous={20}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.25}
          isBounce={false}
          autoDemo
          autoSpeed={0.6}
          autoIntensity={2.2}
          takeoverDuration={0.2}
          autoResumeDelay={0}
          autoRampDuration={0.8}
        />
      </div>
      
      <Link to="/" className="site-logo">
        <img src="/Untitled_design__10_-removebg-preview.png" alt="Tavo Skriptas Logo" />
      </Link>

      {(isHome || isAbout || isProjects || isArticles || isPrivacy) && (
        <BubbleMenu
          menuBg="rgba(232, 213, 196, 0.95)"
          menuContentColor="#2a1f15"
          useFixedPosition={true}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      )}

      <BgMusicToggle src="/Chain%20of%20Ghosted%20Blocks.mp3" />

      <Suspense fallback={<div className="route-loading">Kraunama...</div>}>
        <Routes>
          <Route path="/" element={
            <>
              <SEO 
                title="Tavo Skriptas - Web aplikacijų kūrimas ir IT sprendimai"
                description="Kuriame modernias web aplikacijas ir interaktyvius IT sprendimus, reaguojančius į vartotojo veiksmus."
                keywords="web aplikacijos, IT sprendimai, programavimas, web development, Lietuva, Tavo Skriptas, aplikacijų kūrimas, React, modernios technologijos"
              />
              <div className="content">
              <h1 className="title">
                Stiprus prekių ženklas – <span className="gradient-text">geriausias pardavėjas</span>
              </h1>
              <p className="subtitle">
                Interaktyvūs sprendimai, reaguojantys į
                <br />
                vartotojo veiksmus
              </p>
              <div className="buttons">
                <Link to="/booking" className="btn star-button" aria-label="Susiskambinam">
                  Susiskambinam
                  <span className="star-1" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      viewBox="0 0 784.11 815.53"
                    >
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </svg>
                  </span>
                  <span className="star-2" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      viewBox="0 0 784.11 815.53"
                    >
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </svg>
                  </span>
                  <span className="star-3" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      viewBox="0 0 784.11 815.53"
                    >
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </svg>
                  </span>
                  <span className="star-4" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      viewBox="0 0 784.11 815.53"
                    >
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </svg>
                  </span>
                  <span className="star-5" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      viewBox="0 0 784.11 815.53"
                    >
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </svg>
                  </span>
                  <span className="star-6" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlSpace="preserve"
                      version="1.1"
                      viewBox="0 0 784.11 815.53"
                    >
                      <path
                        className="fil0"
                        d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
            <ServicesLoop />
            <TestimonialsSlider />
            </>
          } />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </Suspense>

      {showFooter && <Footer />}

      {showFooter && consent === null && (
        <CookieConsentBanner onAccept={(value) => setConsent(value)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

