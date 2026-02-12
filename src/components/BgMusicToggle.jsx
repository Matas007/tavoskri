import { useEffect, useMemo, useRef, useState } from 'react';
import './BgMusicToggle.css';

const STORAGE_KEY = 'bg_music_enabled';

export default function BgMusicToggle({ src }) {
  const audioRef = useRef(null);
  const initialEnabled = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage?.getItem(STORAGE_KEY) === '1';
  }, []);

  const [enabled, setEnabled] = useState(initialEnabled);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // išsaugom pasirinkimą (ne slapukas)
    try {
      window.localStorage?.setItem(STORAGE_KEY, enabled ? '1' : '0');
    } catch {
      // ignore
    }

    if (!enabled) {
      audio.pause();
      audio.currentTime = 0;
      setBlocked(false);
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
  }, [enabled]);

  const label = enabled ? 'Muzika: ON' : 'Muzika: OFF';

  return (
    <div className="bg-music-toggle" aria-label="Foninės muzikos valdymas">
      <audio ref={audioRef} src={src} preload="none" loop />
      <button
        type="button"
        className={`bg-music-btn ${enabled ? 'is-on' : 'is-off'}`}
        onClick={() => setEnabled((v) => !v)}
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

