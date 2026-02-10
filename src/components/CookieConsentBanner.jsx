import { Link } from 'react-router-dom';
import './CookieConsentBanner.css';

const CONSENT_KEY = 'cookie_consent';
const RETURNING_COOKIE = 'ts_returning';

export function getConsent() {
  if (typeof window === 'undefined') return false;
  return window.localStorage?.getItem(CONSENT_KEY) === 'accepted';
}

export function setConsent() {
  if (typeof window === 'undefined') return;
  window.localStorage?.setItem(CONSENT_KEY, 'accepted');
}

/** Atšaukia sutikimą: ištrina išsaugotą sutikimą ir techninį slapuką */
export function revokeConsent() {
  if (typeof window === 'undefined') return;
  window.localStorage?.removeItem(CONSENT_KEY);
  document.cookie = `${RETURNING_COOKIE}=; max-age=0; path=/; samesite=lax`;
}

export default function CookieConsentBanner({ onAccept }) {
  const handleAccept = () => {
    setConsent();
    onAccept?.();
  };

  return (
    <div className="cookie-consent" role="dialog" aria-label="Slapukų sutikimas">
      <div className="cookie-consent-inner">
        <p className="cookie-consent-text">
          Naudojame techninį slapuką, kad svetainė antram apsilankymui veiktų greičiau.
          Daugiau informacijos –{' '}
          <Link to="/privacy" className="cookie-consent-link">Privatumo politikoje</Link>.
        </p>
        <div className="cookie-consent-actions">
          <Link to="/privacy" className="cookie-consent-btn cookie-consent-btn-secondary">
            Politika
          </Link>
          <button
            type="button"
            className="cookie-consent-btn cookie-consent-btn-primary"
            onClick={handleAccept}
            aria-label="Sutinku su slapukais"
          >
            Sutinku
          </button>
        </div>
      </div>
    </div>
  );
}
