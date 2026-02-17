import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO';
import './CalculatorPage.css';

const SERVICES = [
  {
    id: 'website',
    label: 'Internetinė svetainė',
    hint: 'Landing / reprezentacinė svetainė / puslapių rinkinys.',
    base: { min: 650, max: 1400, weeks: [1, 3] }
  },
  {
    id: 'webapp',
    label: 'Web aplikacija',
    hint: 'Sistema su duomenų baze, rolėmis, logika, integracijomis.',
    base: { min: 1800, max: 4500, weeks: [3, 8] }
  },
  {
    id: 'ecommerce',
    label: 'El. parduotuvė',
    hint: 'Produktai, krepšelis, apmokėjimai, užsakymai.',
    base: { min: 2200, max: 6000, weeks: [4, 10] }
  },
  {
    id: 'seo',
    label: 'SEO (optimizavimas)',
    hint: 'Techninis SEO + on-page rekomendacijos + įgyvendinimai.',
    base: { min: 350, max: 1200, weeks: [1, 3] }
  },
  {
    id: 'audit',
    label: 'Svetainės auditas',
    hint: 'Greitis, SEO, UX, klaidos, rekomendacijos.',
    base: { min: 180, max: 600, weeks: [1, 2] }
  },
  {
    id: 'maintenance',
    label: 'Administravimas / priežiūra',
    hint: 'Atnaujinimai, smulkūs pakeitimai, stebėsena.',
    base: { min: 49, max: 249, weeks: [0, 0] }
  }
];

const OPTION_LIBRARY = {
  common: [
    { id: 'design_custom', label: 'Individualus dizainas (ne šablonas)', add: { min: 250, max: 800 }, weeks: [0, 1] },
    { id: 'copywriting', label: 'Tekstų paruošimas / korekcijos', add: { min: 120, max: 450 }, weeks: [0, 1] },
    { id: 'multilang', label: '2 kalbos (LT/EN)', add: { min: 120, max: 350 }, weeks: [0, 1] },
    { id: 'animations', label: 'Interaktyvumas / animacijos', add: { min: 120, max: 500 }, weeks: [0, 1] },
    { id: 'analytics_basic', label: 'Bazinis matavimas (be marketing slapukų)', add: { min: 60, max: 160 }, weeks: [0, 0] }
  ],
  website: [
    { id: 'pages', label: 'Papildomi puslapiai (virš 3)', perUnit: { min: 70, max: 220 }, unitLabel: 'psl.' },
    { id: 'blog', label: 'Straipsniai / blogas', add: { min: 180, max: 600 }, weeks: [0, 1] },
    { id: 'booking', label: 'Registracija / rezervacija', add: { min: 220, max: 700 }, weeks: [0, 1] },
    { id: 'cms_light', label: 'Lengvas turinio valdymas (admin)', add: { min: 280, max: 900 }, weeks: [0, 2] }
  ],
  webapp: [
    { id: 'auth', label: 'Vartotojai + prisijungimas + rolės', add: { min: 350, max: 1200 }, weeks: [1, 2] },
    { id: 'db', label: 'Duomenų bazė (schemos + CRUD)', add: { min: 300, max: 1400 }, weeks: [1, 2] },
    { id: 'admin', label: 'Administravimo panelė', add: { min: 350, max: 1400 }, weeks: [1, 2] },
    { id: 'integrations', label: 'Integracijos (el. paštas / API / kt.)', add: { min: 200, max: 1200 }, weeks: [0, 2] },
    { id: 'chatbot', label: 'Pokalbių robotas', add: { min: 200, max: 1200 }, weeks: [0, 2] }
  ],
  ecommerce: [
    { id: 'products', label: 'Produktų katalogas + filtrai', add: { min: 400, max: 1600 }, weeks: [1, 2] },
    { id: 'cart', label: 'Krepšelis + checkout', add: { min: 350, max: 1400 }, weeks: [1, 2] },
    { id: 'payments', label: 'Apmokėjimai (Paysera/Stripe/kt.)', add: { min: 300, max: 1200 }, weeks: [1, 2] },
    { id: 'shipping', label: 'Pristatymas (kainos, būdai)', add: { min: 150, max: 600 }, weeks: [0, 1] },
    { id: 'invoices', label: 'Sąskaitos / PDF', add: { min: 150, max: 800 }, weeks: [0, 2] }
  ],
  seo: [
    { id: 'seo_tech', label: 'Techninis SEO (struktūra, indeksavimas)', add: { min: 120, max: 500 }, weeks: [0, 1] },
    { id: 'seo_onpage', label: 'On-page SEO (meta, antraštės, turinys)', add: { min: 120, max: 450 }, weeks: [0, 1] },
    { id: 'seo_perf', label: 'Greitis (Core Web Vitals)', add: { min: 120, max: 600 }, weeks: [0, 1] }
  ],
  audit: [
    { id: 'audit_report', label: 'Detali ataskaita + prioritetai', add: { min: 80, max: 250 }, weeks: [0, 0] },
    { id: 'audit_fix', label: 'Įgyvendinti rekomendacijas', add: { min: 200, max: 1200 }, weeks: [0, 2] }
  ],
  maintenance: [
    { id: 'maint_priority', label: 'Prioritetinis reagavimas', add: { min: 40, max: 150 }, weeks: [0, 0] },
    { id: 'maint_content', label: 'Turinio atnaujinimai (iki 4/mėn.)', add: { min: 30, max: 120 }, weeks: [0, 0] }
  ]
};

function clampNumber(value, min, max) {
  const n = Number(value);
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function eur(n) {
  return new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

export default function CalculatorPage() {
  const [serviceId, setServiceId] = useState('website');
  const [pagesExtra, setPagesExtra] = useState(0);
  const [selected, setSelected] = useState(() => new Set());

  const service = useMemo(() => SERVICES.find(s => s.id === serviceId) || SERVICES[0], [serviceId]);

  const options = useMemo(() => {
    const base = OPTION_LIBRARY.common;
    const specific = OPTION_LIBRARY[serviceId] ?? [];
    return { common: base, specific };
  }, [serviceId]);

  const breakdown = useMemo(() => {
    const items = [];
    let min = service.base.min;
    let max = service.base.max;
    let weeksMin = service.base.weeks[0];
    let weeksMax = service.base.weeks[1];

    items.push({ label: `${service.label} (bazė)`, min: service.base.min, max: service.base.max });

    // per-unit option: pagesExtra only for website
    if (serviceId === 'website') {
      const pagesOpt = OPTION_LIBRARY.website.find(o => o.id === 'pages');
      const qty = clampNumber(pagesExtra, 0, 30);
      if (pagesOpt && qty > 0) {
        const addMin = pagesOpt.perUnit.min * qty;
        const addMax = pagesOpt.perUnit.max * qty;
        min += addMin;
        max += addMax;
        items.push({ label: `${pagesOpt.label}: +${qty} ${pagesOpt.unitLabel}`, min: addMin, max: addMax });
      }
    }

    const all = [...options.common, ...options.specific].filter(o => o.id !== 'pages');
    for (const opt of all) {
      if (!selected.has(opt.id)) continue;
      if (opt.add) {
        min += opt.add.min;
        max += opt.add.max;
        if (opt.weeks) {
          weeksMin += opt.weeks[0];
          weeksMax += opt.weeks[1];
        }
        items.push({ label: opt.label, min: opt.add.min, max: opt.add.max });
      }
    }

    return {
      min,
      max,
      weeksMin,
      weeksMax,
      items
    };
  }, [service, serviceId, options, selected, pagesExtra]);

  const toggle = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => {
    setSelected(new Set());
    setPagesExtra(0);
  };

  return (
    <>
      <SEO
        title="Skaičiuotuvas - Tavo Skriptas"
        description="Paslaugų skaičiuotuvas: pasirinkite paslaugą ir funkcijas, gaukite preliminarų kainos įvertį."
        keywords="skaičiuotuvas, paslaugų kaina, internetinių svetainių kūrimas, web aplikacija, SEO, auditas, Tavo Skriptas"
      />

      <main className="calc-page">
        <div className="calc-card uiverse-card">
          <div className="card__border" aria-hidden="true" />

          <header className="calc-header">
            <h1 className="calc-title">Paslaugų skaičiuotuvas</h1>
            <p className="calc-subtitle">
              Pasirink paslaugą ir norimas funkcijas – apačioje matysi preliminarų kainos intervalą.
            </p>
          </header>

          <section className="calc-grid">
            <div className="calc-panel">
              <div className="calc-field">
                <label className="calc-label" htmlFor="service">Paslauga</label>
                <select
                  id="service"
                  className="calc-select"
                  value={serviceId}
                  onChange={(e) => {
                    setServiceId(e.target.value);
                    reset();
                  }}
                >
                  {SERVICES.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
                <div className="calc-hint">{service.hint}</div>
              </div>

              {serviceId === 'website' && (
                <div className="calc-field">
                  <label className="calc-label" htmlFor="pagesExtra">Papildomi puslapiai</label>
                  <div className="calc-inline">
                    <input
                      id="pagesExtra"
                      type="number"
                      className="calc-input"
                      min={0}
                      max={30}
                      value={pagesExtra}
                      onChange={(e) => setPagesExtra(clampNumber(e.target.value, 0, 30))}
                    />
                    <span className="calc-inline-suffix">virš 3 psl.</span>
                  </div>
                </div>
              )}

              <div className="calc-section-title">Funkcijos</div>

              <div className="calc-options">
                <div className="calc-options-group">
                  <div className="calc-options-group-title">Dažniausiai</div>
                  {options.common.map(opt => (
                    <label key={opt.id} className="calc-check">
                      <input
                        type="checkbox"
                        checked={selected.has(opt.id)}
                        onChange={() => toggle(opt.id)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>

                <div className="calc-options-group">
                  <div className="calc-options-group-title">Pagal pasirinktą paslaugą</div>
                  {options.specific.filter(o => o.id !== 'pages').map(opt => (
                    <label key={opt.id} className="calc-check">
                      <input
                        type="checkbox"
                        checked={selected.has(opt.id)}
                        onChange={() => toggle(opt.id)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="calc-actions">
                <button type="button" className="calc-btn calc-btn-secondary" onClick={reset}>
                  Išvalyti
                </button>
                <Link to="/booking" className="calc-btn calc-btn-primary">
                  Susiskambinam
                </Link>
              </div>
            </div>

            <aside className="calc-summary">
              <div className="calc-summary-card">
                <div className="calc-summary-kicker">Preliminariai</div>
                <div className="calc-summary-price">
                  {eur(breakdown.min)} – {eur(breakdown.max)}
                </div>
                <div className="calc-summary-time">
                  {serviceId === 'maintenance'
                    ? 'Mėnesinis planas'
                    : `Terminas: ~${breakdown.weeksMin}–${breakdown.weeksMax} sav.`}
                </div>
              </div>

              <div className="calc-breakdown">
                <div className="calc-breakdown-title">Išklotinė</div>
                <ul className="calc-breakdown-list">
                  {breakdown.items.map((it, idx) => (
                    <li key={idx} className="calc-breakdown-item">
                      <span className="calc-breakdown-label">{it.label}</span>
                      <span className="calc-breakdown-val">{eur(it.min)}–{eur(it.max)}</span>
                    </li>
                  ))}
                </ul>
                <div className="calc-note">
                  Tai orientacinis įvertis. Galutinė kaina priklauso nuo apimties, turinio, integracijų
                  sudėtingumo ir terminų.
                </div>
              </div>
            </aside>
          </section>

          <div className="calc-back">
            <Link to="/" className="calc-back-link">← Grįžti į pradžią</Link>
          </div>
        </div>
      </main>
    </>
  );
}

