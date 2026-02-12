import { useEffect, useMemo, useRef, useState } from 'react';
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

export default function BgMusicToggle({ src, consent }) {
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

    // Pirmas apsilankymas / dar nepasirinko: bandome autoplay (jei naršyklė leis).
    return true;
  }, [consent]);

  const [enabled, setEnabled] = useState(initialEnabled);
  const [blocked, setBlocked] = useState(false);

  // Jei vartotojas atmetė – išjungiame muziką ir ištriname pref'ą.
  useEffect(() => {
    if (consent === 'rejected') {
      deleteCookie(PREF_COOKIE);
      setEnabled(false);
    }
  }, [consent]);

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
    const p = audio.play();
    if (p && typeof p.catch === 'function') {
      p.catch(() => {
        // Autoplay su garsu dažnai blokuojamas, kol vartotojas nepaspaudžia.
        setBlocked(true);
        setEnabled(false);
      });
    }
  }, [enabled, consent]);

  const label = enabled ? 'Muzika: ON' : 'Muzika: OFF';

  return (
    <div className="bg-music-toggle" aria-label="Foninės muzikos valdymas">
      <audio ref={audioRef} src={src} preload="none" loop />
      <button
        type="button"
        className={`bg-music-btn ${enabled ? 'is-on' : 'is-off'}`}
        onClick={() => {
          setBlocked(false);
          setEnabled((v) => !v);
        }}
        aria-pressed={enabled}
      >
        {label}
      </button>
      {blocked && (
        <div className="bg-music-hint">
          Naršyklė užblokavo automatinį grojimą. Paspausk „Muzika: ON“.
        </div>
      )}
    </div>
  );
}

