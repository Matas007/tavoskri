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

    // Pirmas apsilankymas / dar nepasirinko: paliekame ON, bet gros tik po pirmos interakcijos.
    return true;
  }, [consent]);

  const [enabled, setEnabled] = useState(initialEnabled);
  const [hasInteracted, setHasInteracted] = useState(false);

  const playNow = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.22;
    // Svarbu: mobile naršyklėse play() turi būti iškviestas per user gesture.
    audio.play().catch(() => {
      // Ignoruojam – jei nepavyko, vartotojas gali perjungti dar kartą.
    });
  };

  const pauseNow = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  // Sustabdom muziką, kai vartotojas palieka puslapį/tab'ą (kad neliktų groti fone).
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const stop = () => pauseNow();

    const onVisibility = () => {
      if (document.hidden) stop();
    };

    window.addEventListener('pagehide', stop);
    window.addEventListener('beforeunload', stop);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('pagehide', stop);
      window.removeEventListener('beforeunload', stop);
      document.removeEventListener('visibilitychange', onVisibility);
      // jei komponentas būtų nuimamas – irgi stabdom
      stop();
    };
  }, []);

  // Jei vartotojas atmetė – išjungiame muziką ir ištriname pref'ą.
  useEffect(() => {
    if (consent === 'rejected') {
      deleteCookie(PREF_COOKIE);
      setEnabled(false);
      pauseNow();
    }
  }, [consent]);

  // First interaction: nuo pirmo vartotojo veiksmo leidžiame bandyti play().
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (hasInteracted) return undefined;

    const mark = () => {
      setHasInteracted(true);
      // Jei muzika įjungta, bandom paleisti iškart to pačio gesto metu (mobile patikimiau).
      if (enabled) playNow();
    };
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
  }, [hasInteracted, enabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Išsaugom pasirinkimą funkcinėje atmintyje tik jei vartotojas sutiko.
    if (consent === 'accepted') {
      setCookieValue(PREF_COOKIE, enabled ? '1' : '0', PREF_MAX_AGE_DAYS);
    }

    if (!enabled) {
      pauseNow();
      return;
    }

    if (!hasInteracted) return;

    // Fallback: jei jau buvo interakcija, užtikrinam, kad groja.
    playNow();
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
              const next = !enabled;
              setEnabled(next);
              if (next) {
                playNow();
              } else {
                pauseNow();
              }
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
        onClick={() => {
          const next = !enabled;
          setEnabled(next);
          if (next) {
            playNow();
          } else {
            pauseNow();
          }
        }}
        aria-label={enabled ? 'Išjungti muziką' : 'Įjungti muziką'}
        aria-pressed={enabled}
      >
        <FaMusic aria-hidden="true" />
      </button>
    </div>
  );
}

