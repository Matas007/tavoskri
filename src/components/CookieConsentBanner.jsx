import { Link } from 'react-router-dom';
import './CookieConsentBanner.css';

const CONSENT_COOKIE = 'ts_cookie_consent';
const CONSENT_MAX_AGE_DAYS = 180;
const MUSIC_PREF_COOKIE = 'ts_bg_music';

export function getConsent() {
  if (typeof document === 'undefined') return null;

  const cookieString = `; ${document.cookie}`;
  const parts = cookieString.split(`; ${CONSENT_COOKIE}=`);
  if (parts.length === 2) {
    const value = parts.pop().split(';').shift() || '';
    return value === 'accepted' || value === 'rejected' ? value : null;
  }

  return null;
}

export function setConsent(value) {
  if (typeof document === 'undefined') return;
  if (value !== 'accepted' && value !== 'rejected') return;

  const maxAgeSeconds = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${maxAgeSeconds}; path=/; samesite=lax`;
}

/** Atšaukia sutikimą: ištrina išsaugotą sutikimą ir techninį slapuką */
export function revokeConsent() {
  if (typeof document === 'undefined') return;
  document.cookie = `${CONSENT_COOKIE}=; max-age=0; path=/; samesite=lax`;
  document.cookie = `${MUSIC_PREF_COOKIE}=; max-age=0; path=/; samesite=lax`;
}

export default function CookieConsentBanner({ onAccept }) {
  const handleAccept = () => {
    setConsent('accepted');
    onAccept?.('accepted');
  };

  const handleReject = () => {
    setConsent('rejected');
    onAccept?.('rejected');
  };

  return (
    <div className="cookie-consent" role="dialog" aria-label="Slapukų sutikimas">
      <div className="cookie-consent-inner">
        <p className="cookie-consent-text">
          Nenaudojame analitinių ar rinkodaros slapukų. Naudojame būtiną slapuką jūsų pasirinkimui
          įsiminti, o sutikus – ir funkcinį slapuką muzikos jungikliui (ON/OFF) prisiminti.
          Daugiau informacijos –{' '}
          <Link to="/privacy" className="cookie-consent-link">Privatumo politikoje</Link>.
        </p>
        <div className="cookie-consent-actions">
          <Link to="/privacy" className="cookie-consent-btn cookie-consent-btn-secondary">
            Politika
          </Link>
          <button
            type="button"
            className="cookie-consent-btn cookie-consent-btn-secondary"
            onClick={handleReject}
            aria-label="Atmesti nebūtinus slapukus"
          >
            Atmesti
          </button>
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
