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

  const COOKIE_COUNT = 18;

  return (
    <div className="cookie-consent" role="dialog" aria-label="Slapukų sutikimas">
      {/* Decorative cookie icons background */}
      <div className="cookie-icons-bg" aria-hidden="true">
        {Array.from({ length: COOKIE_COUNT }).map((_, i) => (
          <svg
            key={i}
            className="cookie-icon-deco"
            style={{ '--ci': i }}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="8.5" cy="9.5" r="1.2" fill="currentColor" />
            <circle cx="14" cy="8" r="0.9" fill="currentColor" />
            <circle cx="11" cy="14.5" r="1.1" fill="currentColor" />
            <circle cx="15.5" cy="13.5" r="1.3" fill="currentColor" />
            <circle cx="9" cy="16" r="0.8" fill="currentColor" />
            <path d="M7 12 Q9 10.5 11 12" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" fill="none" />
          </svg>
        ))}
      </div>
      <div className="cookie-consent-inner">
        <p className="cookie-consent-text">
          Ši internetinė svetainė naudoja tik būtinus ir funkcinius slapukus. Daugiau informacijos –{' '}
          <Link to="/privacy" className="cookie-consent-link">Privatumo politikoje</Link>.
        </p>
        <div className="cookie-consent-actions">
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
