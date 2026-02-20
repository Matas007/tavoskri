import { useEffect, useMemo, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
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
  const srcRef = useRef(src);
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
  const [needsUnlock, setNeedsUnlock] = useState(initialEnabled);

  useEffect(() => {
    srcRef.current = src;
  }, [src]);

  const clearMediaSession = () => {
    if (typeof navigator === 'undefined' || !('mediaSession' in navigator)) return;
    try {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = 'none';
      navigator.mediaSession.setActionHandler('play', null);
      navigator.mediaSession.setActionHandler('pause', null);
      navigator.mediaSession.setActionHandler('stop', null);
      navigator.mediaSession.setActionHandler('seekbackward', null);
      navigator.mediaSession.setActionHandler('seekforward', null);
      navigator.mediaSession.setActionHandler('seekto', null);
      navigator.mediaSession.setActionHandler('previoustrack', null);
      navigator.mediaSession.setActionHandler('nexttrack', null);
    } catch (_) {
      // Kai kuriose naršyklėse dalis handler'ių gali būti nepalaikomi.
    }
  };

  const ensureAudioSource = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src || audio.getAttribute('src') !== srcRef.current) {
      audio.src = srcRef.current;
      audio.load();
    }
  };

  const playNow = () => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve(false);
    ensureAudioSource();
    audio.volume = 0.22;
    // Svarbu: mobile naršyklėse play() turi būti iškviestas per user gesture.
    return audio
      .play()
      .then(() => true)
      .catch(() => false);
  };

  const pauseNow = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  };

  const hardStop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.removeAttribute('src');
    audio.load();
    clearMediaSession();
  };

  // Sustabdom muziką, kai vartotojas palieka puslapį/tab'ą (kad neliktų groti fone).
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return undefined;

    const stop = () => hardStop();

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
      setNeedsUnlock(false);
      hardStop();
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
      hardStop();
      return;
    }
  }, [enabled, consent]);

  // "Unlock" per tikrą user gesture (patikimiausia tiek desktop, tiek mobile).
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (!enabled) return undefined;
    if (!needsUnlock) return undefined;

    let cancelled = false;

    const tryFromGesture = async () => {
      if (cancelled) return;
      const ok = await playNow();
      if (!cancelled && ok) {
        setNeedsUnlock(false);
      }
    };

    // Naudojam tik „user activation“ event'us; mousemove/scroll dažnai netinka autoplay leidimams.
    window.addEventListener('pointerdown', tryFromGesture, { capture: true, once: true });
    window.addEventListener('touchstart', tryFromGesture, { capture: true, once: true });
    window.addEventListener('keydown', tryFromGesture, { capture: true, once: true });

    return () => {
      cancelled = true;
      window.removeEventListener('pointerdown', tryFromGesture, true);
      window.removeEventListener('touchstart', tryFromGesture, true);
      window.removeEventListener('keydown', tryFromGesture, true);
    };
  }, [enabled, needsUnlock]);

  return (
    <div
      className={`bg-music-toggle ${consentBannerVisible ? 'has-consent-banner' : ''}`}
      aria-label="Foninės muzikos valdymas"
    >
      <audio ref={audioRef} src={src} preload="none" loop />
      <div className="bg-music-pill" role="group" aria-label="Muzikos jungiklis">
        <span className={`bg-music-speaker ${enabled ? 'is-on' : 'is-off'}`} aria-hidden="true">
          {enabled ? <FaVolumeUp /> : <FaVolumeMute />}
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
                setNeedsUnlock(true);
                // bandome iškart (nes tai user gesture)
                playNow().then((ok) => ok && setNeedsUnlock(false));
              } else {
                hardStop();
                setNeedsUnlock(false);
              }
            }}
          />
          <span className="bg-music-switch-track" aria-hidden="true">
            <span className="bg-music-switch-thumb" aria-hidden="true" />
          </span>
        </label>
      </div>

      <button
        type="button"
        className={`bg-music-mobile-btn ${enabled ? 'is-on' : 'is-off'}`}
        onClick={() => {
          const next = !enabled;
          setEnabled(next);
          if (next) {
            setNeedsUnlock(true);
            playNow().then((ok) => ok && setNeedsUnlock(false));
          } else {
            hardStop();
            setNeedsUnlock(false);
          }
        }}
        aria-label={enabled ? 'Išjungti muziką' : 'Įjungti muziką'}
        aria-pressed={enabled}
      >
        {enabled ? <FaVolumeUp aria-hidden="true" /> : <FaVolumeMute aria-hidden="true" />}
      </button>
    </div>
  );
}

