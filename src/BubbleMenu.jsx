import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import './BubbleMenu.css';

const DEFAULT_ITEMS = [
  {
    label: 'pradžia',
    href: '/',
    ariaLabel: 'Pradžia',
    rotation: -8,
    hoverStyles: { bgColor: '#C9A882', textColor: '#ffffff' }
  },
  {
    label: 'apie',
    href: '/about',
    ariaLabel: 'Apie',
    rotation: 8,
    hoverStyles: { bgColor: '#E8D5C4', textColor: '#2a1f15' }
  },
  {
    label: 'projektai',
    href: '/projects',
    ariaLabel: 'Projektai',
    rotation: 8,
    hoverStyles: { bgColor: '#9D7852', textColor: '#ffffff' }
  },
  {
    label: 'straipsniai',
    href: '/articles',
    ariaLabel: 'Straipsniai',
    rotation: -8,
    hoverStyles: { bgColor: '#D4A574', textColor: '#ffffff' }
  }
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = 'rgba(232, 213, 196, 0.95)',
  menuContentColor = '#2a1f15',
  useFixedPosition = false,
  items,
  animationEase = 'back.out(1.5)',
  animationDuration = 0.5,
  staggerDelay = 0.12
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef(null);
  const bubblesRef = useRef([]);
  const labelRefs = useRef([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.set(bubbles, { scale: 0, transformOrigin: '50% 50%' });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: 'power3.out'
            },
            `-=${animationDuration * 0.9}`
          );
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: 'power3.in'
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        }
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;

        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen, menuItems]);

  const defaultLogo = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <img src="/logo.svg" alt="TS Logo" style={{ width: '28px', height: '28px' }} />
      <span style={{ fontWeight: 700, fontSize: '1rem', color: menuContentColor, whiteSpace: 'nowrap' }}>
        Tavo Skriptas
      </span>
    </div>
  );

  return (
    <>
      <nav className={containerClassName} style={style} aria-label="Main navigation">
        <button
          type="button"
          className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg }}
        >
          <span className="menu-line" style={{ background: menuContentColor }} />
          <span className="menu-line short" style={{ background: menuContentColor }} />
        </button>
      </nav>
      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`}
          aria-hidden={!isMenuOpen}
        >
          <ul className="pill-list" role="menu" aria-label="Menu links">
            {menuItems.map((item, idx) => (
              <li key={idx} role="none" className="pill-col">
                  {item.href?.startsWith('/') ? (
                    <Link
                      role="menuitem"
                      to={item.href}
                      aria-label={item.ariaLabel || item.label}
                      className="pill-link"
                      style={{
                        '--item-rot': `${item.rotation ?? 0}deg`,
                        '--pill-bg': menuBg,
                        '--pill-color': menuContentColor,
                        '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                        '--hover-color': item.hoverStyles?.textColor || menuContentColor
                      }}
                      ref={el => {
                        if (el) bubblesRef.current[idx] = el;
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span
                        className="pill-label"
                        ref={el => {
                          if (el) labelRefs.current[idx] = el;
                        }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <a
                      role="menuitem"
                      href={item.href}
                      aria-label={item.ariaLabel || item.label}
                      className="pill-link"
                      style={{
                        '--item-rot': `${item.rotation ?? 0}deg`,
                        '--pill-bg': menuBg,
                        '--pill-color': menuContentColor,
                        '--hover-bg': item.hoverStyles?.bgColor || '#f3f4f6',
                        '--hover-color': item.hoverStyles?.textColor || menuContentColor
                      }}
                      ref={el => {
                        if (el) bubblesRef.current[idx] = el;
                      }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span
                        className="pill-label"
                        ref={el => {
                          if (el) labelRefs.current[idx] = el;
                        }}
                      >
                        {item.label}
                      </span>
                    </a>
                  )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

