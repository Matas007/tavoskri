import { useEffect, useMemo, useRef, useState } from 'react';
import { FaMusic, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import './BgMusicToggle.css';

const PREF_COOKIE = 'ts_bg_music';
const PREF_MAX_AGE_DAYS = 180;

const getCookieValue = (name) => {
  if (typeof document === 'undefined') return '';

  const cookieString = `; ${document.cookie}`;
  const parts = cookieString.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift() || '';
  }

  return '';
};

const setCookieValue = (name, value, maxAgeDays) => {
  if (typeof document === 'undefined') return;
  const maxAgeSeconds = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${name}=${value}; max-age=${maxAgeSeconds}; path=/; samesite=lax`;
};

const deleteCookie = (name) => {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; max-age=0; path=/; samesite=lax`;
};

export default function BgMusicToggle({ src, consent, consentBannerVisible = false }) {
  const audioRef = useRef(null);
  const initialEnabled = useMemo(() => {
    // Jei vartotojas atmetė – muzika pagal nutylėjimą neįjungta.
    if (consent === 'rejected') return false;

    // Jei sutikta – bandom atkurti iš funkcinio slapuko.
    if (consent === 'accepted') {
      const v = getCookieValue(PREF_COOKIE);
      if (v === '1') return true;
      if (v === '0') return false;
    }

    // Pirmas apsilankymas / dar nepasirinko: pagal nutylėjimą paliekame OFF.
    return false;
  }, [consent]);

  const [enabled, setEnabled] = useState(initialEnabled);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Jei vartotojas atmetė – išjungiame muziką ir ištriname pref'ą.
  useEffect(() => {
    if (consent === 'rejected') {
      deleteCookie(PREF_COOKIE);
      setEnabled(false);
    }
  }, [consent]);

  // First interaction: nuo pirmo vartotojo veiksmo leidžiame bandyti play().
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (hasInteracted) return undefined;

    const mark = () => setHasInteracted(true);
    window.addEventListener('pointerdown', mark, { capture: true, once: true });
    window.addEventListener('touchstart', mark, { capture: true, once: true });
    window.addEventListener('keydown', mark, { capture: true, once: true });
    window.addEventListener('mousemove', mark, { capture: true, once: true });
    window.addEventListener('scroll', mark, { capture: true, once: true, passive: true });
    window.addEventListener('touchmove', mark, { capture: true, once: true, passive: true });

    return () => {
      window.removeEventListener('pointerdown', mark, true);
      window.removeEventListener('touchstart', mark, true);
      window.removeEventListener('keydown', mark, true);
      window.removeEventListener('mousemove', mark, true);
      window.removeEventListener('scroll', mark, true);
      window.removeEventListener('touchmove', mark, true);
    };
  }, [hasInteracted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Išsaugom pasirinkimą funkcinėje atmintyje tik jei vartotojas sutiko.
    if (consent === 'accepted') {
      setCookieValue(PREF_COOKIE, enabled ? '1' : '0', PREF_MAX_AGE_DAYS);
    }

    if (!enabled) {
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    audio.volume = 0.22;
    if (!hasInteracted) return;

    audio.play().catch(() => {
      // Jei vis tiek nepavyko (labai reta) – tyliai ignoruojam.
    });
  }, [enabled, consent, hasInteracted]);

  return (
    <div
      className={`bg-music-toggle ${consentBannerVisible ? 'has-consent-banner' : ''}`}
      aria-label="Foninės muzikos valdymas"
    >
      <audio ref={audioRef} src={src} preload="none" loop />
      <div className="bg-music-pill" role="group" aria-label="Muzikos jungiklis">
        <span className={`bg-music-icon ${enabled ? 'is-on' : 'is-off'}`} aria-hidden="true">
          <FaMusic />
        </span>

        <label className="bg-music-switch" aria-label={enabled ? 'Išjungti muziką' : 'Įjungti muziką'}>
          <input
            type="checkbox"
            className="bg-music-switch-input"
            checked={enabled}
            onChange={() => {
              setEnabled((v) => !v);
            }}
          />
          <span className="bg-music-switch-track" aria-hidden="true">
            <span className="bg-music-switch-thumb" aria-hidden="true" />
          </span>
        </label>

        <span className={`bg-music-state ${enabled ? 'is-on' : 'is-off'}`} aria-hidden="true">
          {enabled ? <FaVolumeUp /> : <FaVolumeMute />}
        </span>
      </div>

      <button
        type="button"
        className={`bg-music-mobile-btn ${enabled ? 'is-on' : 'is-off'}`}
        onClick={() => setEnabled((v) => !v)}
        aria-label={enabled ? 'Išjungti muziką' : 'Įjungti muziką'}
        aria-pressed={enabled}
      >
        <FaMusic aria-hidden="true" />
      </button>
    </div>
  );
}

