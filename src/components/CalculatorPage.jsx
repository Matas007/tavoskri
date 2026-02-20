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
    hint: 'Meta, puslapio kokybė, GEO, struktūra, serveris, backlinkai ir kt.',
    base: { min: 350, max: 1200, weeks: [1, 3] }
  },
  {
    id: 'audit',
    label: 'Svetainės auditas',
    hint: 'Pasirink, ką tiksliai ištestuoti (SEO, saugumas, greitis, UX ir kt.).',
    base: { min: 180, max: 600, weeks: [1, 2] }
  },
  {
    id: 'maintenance',
    label: 'Administravimas / priežiūra',
    hint: 'Mėnesinis planas 50–300€; metinis – 5% pigiau.',
    base: { min: 0, max: 0, weeks: [0, 0] }
  }
];

const SERVICE_OPTIONS = {
  website: {
    groups: [
      {
        title: 'Struktūra',
        options: [
          {
            id: 'pages_extra',
            type: 'number',
            label: 'Papildomi puslapiai',
            min: 0,
            max: 30,
            unitLabel: 'psl.',
            perUnit: { min: 70, max: 220 },
            defaultValue: 0
          },
          { id: 'blog', type: 'checkbox', label: 'Straipsniai / blogas', add: { min: 180, max: 600 }, weeks: [0, 1] },
          { id: 'booking', type: 'checkbox', label: 'Registracija / rezervacija', add: { min: 220, max: 700 }, weeks: [0, 1] }
        ]
      },
      {
        title: 'Turinys ir dizainas',
        options: [
          { id: 'design_custom', type: 'checkbox', label: 'Individualus dizainas (ne šablonas)', add: { min: 250, max: 800 }, weeks: [0, 1] },
          { id: 'copywriting', type: 'checkbox', label: 'Tekstų paruošimas / korekcijos', add: { min: 120, max: 450 }, weeks: [0, 1] },
          { id: 'multilang', type: 'checkbox', label: '2 kalbos (LT/EN)', add: { min: 120, max: 350 }, weeks: [0, 1] },
          { id: 'animations', type: 'checkbox', label: 'Interaktyvumas / animacijos', add: { min: 120, max: 500 }, weeks: [0, 1] }
        ]
      },
      {
        title: 'Technika',
        options: [
          { id: 'cms_light', type: 'checkbox', label: 'Lengvas turinio valdymas (admin)', add: { min: 280, max: 900 }, weeks: [0, 2] },
          {
            id: 'analytics_basic',
            type: 'checkbox',
            label: 'Bazinis veikimo matavimas (be rinkodaros slapukų)',
            note: 'Renkami tik techniniai / funkciniai įvykiai (pvz., formos pateikimas), be sekimo tarp svetainių.',
            add: { min: 60, max: 160 },
            weeks: [0, 0]
          }
        ]
      }
    ]
  },
  webapp: {
    groups: [
      {
        title: 'Pagrindas',
        options: [
          { id: 'db', type: 'checkbox', label: 'Duomenų bazė (schemos + CRUD)', add: { min: 300, max: 1400 }, weeks: [1, 2] },
          { id: 'auth', type: 'checkbox', label: 'Vartotojai + prisijungimas + rolės', add: { min: 350, max: 1200 }, weeks: [1, 2] },
          { id: 'admin', type: 'checkbox', label: 'Administravimo panelė', add: { min: 350, max: 1400 }, weeks: [1, 2] }
        ]
      },
      {
        title: 'Integracijos ir automatizacijos',
        options: [
          { id: 'integrations', type: 'checkbox', label: 'Integracijos (el. paštas / API / kt.)', add: { min: 200, max: 1200 }, weeks: [0, 2] },
          { id: 'chatbot', type: 'checkbox', label: 'Pokalbių robotas', add: { min: 200, max: 1200 }, weeks: [0, 2] }
        ]
      },
      {
        title: 'UX ir turinys',
        options: [
          { id: 'design_custom', type: 'checkbox', label: 'Individualus dizainas (ne šablonas)', add: { min: 300, max: 1200 }, weeks: [0, 2] },
          { id: 'multilang', type: 'checkbox', label: '2 kalbos (LT/EN)', add: { min: 180, max: 650 }, weeks: [0, 1] }
        ]
      }
    ]
  },
  ecommerce: {
    groups: [
      {
        title: 'Pardavimai',
        options: [
          { id: 'products', type: 'checkbox', label: 'Produktų katalogas + filtrai', add: { min: 400, max: 1600 }, weeks: [1, 2] },
          { id: 'cart', type: 'checkbox', label: 'Krepšelis + checkout', add: { min: 350, max: 1400 }, weeks: [1, 2] },
          { id: 'payments', type: 'checkbox', label: 'Apmokėjimai (Paysera/Stripe/kt.)', add: { min: 300, max: 1200 }, weeks: [1, 2] }
        ]
      },
      {
        title: 'Logistika ir dokumentai',
        options: [
          { id: 'shipping', type: 'checkbox', label: 'Pristatymas (kainos, būdai)', add: { min: 150, max: 600 }, weeks: [0, 1] },
          { id: 'invoices', type: 'checkbox', label: 'Sąskaitos / PDF', add: { min: 150, max: 800 }, weeks: [0, 2] }
        ]
      },
      {
        title: 'Dizainas ir turinys',
        options: [
          { id: 'design_custom', type: 'checkbox', label: 'Individualus dizainas (ne šablonas)', add: { min: 300, max: 1200 }, weeks: [0, 2] },
          { id: 'copywriting', type: 'checkbox', label: 'Tekstų paruošimas / korekcijos', add: { min: 150, max: 650 }, weeks: [0, 1] },
          { id: 'multilang', type: 'checkbox', label: '2 kalbos (LT/EN)', add: { min: 180, max: 650 }, weeks: [0, 1] }
        ]
      }
    ]
  },
  seo: {
    groups: [
      {
        title: 'Meta ir struktūra',
        options: [
          { id: 'seo_meta', type: 'checkbox', label: 'Meta informacija (title/description, OG)', add: { min: 120, max: 450 }, weeks: [0, 1] },
          { id: 'seo_links', type: 'checkbox', label: 'Nuorodų struktūra (vidinės nuorodos, architektūra)', add: { min: 150, max: 600 }, weeks: [0, 1] },
          { id: 'seo_schema', type: 'checkbox', label: 'Struktūriniai duomenys (Schema.org)', add: { min: 120, max: 500 }, weeks: [0, 1] }
        ]
      },
      {
        title: 'Kokybė ir GEO',
        options: [
          { id: 'seo_quality', type: 'checkbox', label: 'Puslapio kokybė (turinys, struktūra, cannibalization, thin content)', add: { min: 180, max: 800 }, weeks: [0, 1] },
          { id: 'seo_geo', type: 'checkbox', label: 'GEO (lokalūs signalai, vietovės puslapiai, NAP)', add: { min: 150, max: 700 }, weeks: [0, 1] },
          { id: 'seo_content_plan', type: 'checkbox', label: 'Raktažodžių analizė + turinio planas', add: { min: 200, max: 900 }, weeks: [0, 1] }
        ]
      },
      {
        title: 'Serveris ir išorinės nuorodos',
        options: [
          { id: 'seo_server', type: 'checkbox', label: 'Serveris (caching, headers, CDN, redirect’ai)', add: { min: 150, max: 900 }, weeks: [0, 2] },
          { id: 'seo_backlinks', type: 'checkbox', label: 'Išorinės nuorodos (backlinkų strategija + rekomendacijos)', add: { min: 200, max: 1200 }, weeks: [0, 2] },
          { id: 'seo_fix', type: 'checkbox', label: 'Įgyvendinti rekomendacijas (darbo paketas)', add: { min: 200, max: 1400 }, weeks: [0, 2] }
        ]
      }
    ]
  },
  audit: {
    groups: [
      {
        title: 'Ką ištestuoti?',
        options: [
          { id: 'audit_security', type: 'checkbox', label: 'Saugumą (headers, konfigūracija, OWASP pagrindai)', add: { min: 120, max: 700 }, weeks: [0, 1] },
          { id: 'audit_seo', type: 'checkbox', label: 'SEO (techninis + on-page)', add: { min: 120, max: 650 }, weeks: [0, 1] },
          { id: 'audit_ui', type: 'checkbox', label: 'UI klaidas (vizualiniai nesklandumai, komponentai)', add: { min: 80, max: 450 }, weeks: [0, 1] },
          { id: 'audit_ux', type: 'checkbox', label: 'UX klaidas (kelionės, konversijos, frikcija)', add: { min: 120, max: 750 }, weeks: [0, 1] },
          { id: 'audit_co2', type: 'checkbox', label: 'Anglies dioksido pėdsaką (CO₂) + rekomendacijos', add: { min: 80, max: 350 }, weeks: [0, 1] },
          { id: 'audit_speed', type: 'checkbox', label: 'Greičio testą (CWV) + rekomendacijos', add: { min: 100, max: 550 }, weeks: [0, 1] },
          { id: 'audit_access_control', type: 'checkbox', label: 'Prieigos kontrolę (rolės, teisės, pavojai)', add: { min: 120, max: 700 }, weeks: [0, 1] },
          { id: 'audit_logs', type: 'checkbox', label: 'Žurnalus (logai, klaidų stebėsena, alertai)', add: { min: 80, max: 500 }, weeks: [0, 1] }
        ]
      },
      {
        title: 'Rezultatas',
        options: [
          { id: 'audit_report', type: 'checkbox', label: 'Detali ataskaita + prioritetai', add: { min: 80, max: 250 }, weeks: [0, 0] },
          { id: 'audit_fix', type: 'checkbox', label: 'Įgyvendinti rekomendacijas (darbo paketas)', add: { min: 200, max: 1200 }, weeks: [0, 2] }
        ]
      }
    ]
  },
  maintenance: {
    groups: [
      {
        title: 'Priežiūra (mėnesinis planas)',
        options: [
          {
            id: 'maint_monthly',
            type: 'number',
            label: 'Mėnesinė priežiūros suma',
            hint: '€/mėn.',
            min: 50,
            max: 300,
            defaultValue: 120,
            fixed: true
          },
          { id: 'maint_annual', type: 'checkbox', label: 'Metinis planas (−5%)', add: { min: 0, max: 0 }, weeks: [0, 0] }
        ]
      }
    ]
  }
};

function getOptionsForService(serviceId) {
  return SERVICE_OPTIONS[serviceId]?.groups ?? [];
}

function clampNumber(value, min, max) {
  if (value === '') return '';
  const n = Number(value);
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function eur(n) {
  return new Intl.NumberFormat('lt-LT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

function buildDefaultQuantities(serviceId) {
  const groups = getOptionsForService(serviceId);
  const q = {};
  for (const g of groups) {
    for (const opt of g.options) {
      if (opt.type === 'number' && typeof opt.defaultValue !== 'undefined') {
        q[opt.id] = opt.defaultValue;
      }
    }
  }
  return q;
}

export default function CalculatorPage({ embedded = false }) {
  const [serviceId, setServiceId] = useState('website');
  const [selected, setSelected] = useState(() => new Set());
  const [quantities, setQuantities] = useState(() => buildDefaultQuantities('website'));
  const [step, setStep] = useState(0);

  const service = useMemo(() => SERVICES.find(s => s.id === serviceId) || SERVICES[0], [serviceId]);
  const optionGroups = useMemo(() => getOptionsForService(serviceId), [serviceId]);
  const flatOptions = useMemo(() => optionGroups.flatMap(g => g.options), [optionGroups]);

  const breakdown = useMemo(() => {
    const items = [];
    let min = service.base.min;
    let max = service.base.max;
    let weeksMin = service.base.weeks[0];
    let weeksMax = service.base.weeks[1];

    items.push({ label: `${service.label} (bazė)`, min: service.base.min, max: service.base.max });

    // Maintenance: skaičiuojam iš pasirinktos mėnesinės sumos
    if (serviceId === 'maintenance') {
      const monthly = clampNumber(quantities.maint_monthly ?? 120, 50, 300);
      const isAnnual = selected.has('maint_annual');
      const annual = Math.round(monthly * 12 * 0.95);
      const monthlyTotal = monthly * 12;
      const savings = Math.max(0, monthlyTotal - annual);
      min = isAnnual ? annual : monthly;
      max = isAnnual ? annual : monthly;
      items.length = 0;
      items.push({ label: 'Mėnesinis planas', min: monthly, max: monthly });
      items.push({ label: 'Metinis planas (−5%)', min: annual, max: annual });
      items.push({ label: 'Sutaupymas per metus', min: savings, max: savings });

      return {
        min,
        max,
        weeksMin: 0,
        weeksMax: 0,
        items,
        monthly,
        annual,
        monthlyTotal,
        savings,
        isAnnual
      };
    }

    for (const opt of flatOptions) {
      if (opt.type === 'number') {
        const qty = clampNumber(quantities[opt.id] ?? 0, opt.min ?? 0, opt.max ?? 999);
        if (opt.fixed) {
          if (qty > 0) {
            min += qty;
            max += qty;
            items.push({ label: opt.label, min: qty, max: qty });
          }
          continue;
        }
        if (qty > 0 && opt.perUnit) {
          const addMin = opt.perUnit.min * qty;
          const addMax = opt.perUnit.max * qty;
          min += addMin;
          max += addMax;
          items.push({
            label: `${opt.label}: +${qty} ${opt.unitLabel ?? ''}`.trim(),
            min: addMin,
            max: addMax
          });
        }
        continue;
      }

      if (opt.type === 'checkbox' && selected.has(opt.id) && opt.add) {
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
  }, [service, flatOptions, selected, quantities]);

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
    setQuantities(buildDefaultQuantities(serviceId));
    setStep(0);
  };

  const stepCount = optionGroups.length + 2; // 0: paslauga, 1..n: grupės, last: suvestinė
  const isServiceStep = step === 0;
  const isSummaryStep = step === stepCount - 1;
  const currentGroup = !isServiceStep && !isSummaryStep ? optionGroups[step - 1] : null;
  const progress = ((step + 1) / stepCount) * 100;

  const nextStep = () => setStep(s => Math.min(s + 1, stepCount - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const handleNumberChange = (opt, rawValue) => {
    // Leidžiam vartotojui laikinai palikti tuščią lauką, kad įvedimas "nešokinėtų".
    if (rawValue === '') {
      setQuantities(prev => ({ ...prev, [opt.id]: '' }));
      return;
    }
    const onlyDigits = rawValue.replace(/[^\d]/g, '');
    setQuantities(prev => ({ ...prev, [opt.id]: onlyDigits === '' ? '' : Number(onlyDigits) }));
  };

  const handleNumberBlur = (opt) => {
    setQuantities(prev => {
      const current = prev[opt.id];
      const fallback = typeof opt.defaultValue !== 'undefined' ? opt.defaultValue : (opt.min ?? 0);
      const normalized = current === '' ? fallback : current;
      const clamped = clampNumber(normalized, opt.min ?? 0, opt.max ?? 999);
      return { ...prev, [opt.id]: clamped };
    });
  };

  const renderOption = (opt) => {
    if (opt.type === 'number') {
      const value = quantities[opt.id] ?? 0;
      return (
        <div key={opt.id} className="calc-number">
          <div className="calc-number-label">{opt.label}</div>
          <div className="calc-inline">
            <input
              type="number"
              className="calc-input"
              min={opt.min ?? 0}
              max={opt.max ?? 999}
              value={value}
              onChange={(e) => handleNumberChange(opt, e.target.value)}
              onBlur={() => handleNumberBlur(opt)}
            />
            <span className="calc-inline-suffix">
              {opt.hint || opt.unitLabel || ''}
            </span>
          </div>
          {opt.note && <div className="calc-hint">{opt.note}</div>}
        </div>
      );
    }

    return (
      <label key={opt.id} className="calc-check">
        <input
          type="checkbox"
          checked={selected.has(opt.id)}
          onChange={() => toggle(opt.id)}
        />
        <span>
          {opt.label}
          {opt.note && <small className="calc-check-note">{opt.note}</small>}
        </span>
      </label>
    );
  };

  const calculatorContent = (
    <div className={`calc-card uiverse-card ${embedded ? 'calc-card-embedded' : ''}`}>
      <div className="card__border" aria-hidden="true" />

      <header className="calc-header">
        <h1 className="calc-title">Paslaugų skaičiuotuvas</h1>
        <div className="calc-step-meta">Žingsnis {step + 1} iš {stepCount}</div>
        <div className="calc-progress">
          <span className="calc-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <section className="calc-step-card">
        {isServiceStep && (
          <>
            <div className="calc-section-title">1. Kokios paslaugos reikia?</div>
            <div className="calc-field">
              <label className="calc-label" htmlFor="service">Paslauga</label>
              <select
                id="service"
                className="calc-select"
                value={serviceId}
                onChange={(e) => {
                  const nextId = e.target.value;
                  setServiceId(nextId);
                  setSelected(new Set());
                  setQuantities(buildDefaultQuantities(nextId));
                }}
              >
                {SERVICES.map(s => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
              <div className="calc-hint">{service.hint}</div>
            </div>
          </>
        )}

        {currentGroup && (
          <>
            <div className="calc-section-title">{currentGroup.title}</div>
            <div className="calc-options-group calc-options-group-single">
              {currentGroup.options.map(renderOption)}
            </div>
          </>
        )}

        {isSummaryStep && (
          <div className="calc-summary">
            <div className="calc-summary-card">
              <div className="calc-summary-kicker">Preliminariai</div>
              <div className="calc-summary-price">
                {eur(breakdown.min)} – {eur(breakdown.max)}
              </div>
              <div className="calc-summary-time">
                {serviceId === 'maintenance'
                  ? `Mėn.: ~${eur(breakdown.monthly)} / mėn. • Metinis: ~${eur(breakdown.annual)} / metus (−5%)`
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

            <div className="calc-actions">
              <button type="button" className="calc-btn calc-btn-secondary" onClick={reset}>
                Pradėti iš naujo
              </button>
              <Link to="/booking" className="calc-btn calc-btn-primary">
                Susiskambinam
              </Link>
            </div>
          </div>
        )}
      </section>

      <div className="calc-nav">
        <button
          type="button"
          className="calc-btn calc-btn-secondary"
          onClick={prevStep}
          disabled={step === 0}
        >
          Atgal
        </button>

        {!isSummaryStep && (
          <button type="button" className="calc-btn calc-btn-primary" onClick={nextStep}>
            {step === stepCount - 2 ? 'Peržiūrėti suvestinę' : 'Toliau'}
          </button>
        )}
      </div>

      {!embedded && (
        <div className="calc-back">
          <Link to="/" className="calc-back-link">← Grįžti į pradžią</Link>
        </div>
      )}
    </div>
  );

  if (embedded) {
    return <section className="calc-embedded">{calculatorContent}</section>;
  }

  return (
    <>
      <SEO
        title="Skaičiuotuvas - Tavo Skriptas"
        description="Paslaugų skaičiuotuvas: pasirinkite paslaugą ir funkcijas, gaukite preliminarų kainos įvertį."
        keywords="skaičiuotuvas, paslaugų kaina, internetinių svetainių kūrimas, web aplikacija, SEO, auditas, Tavo Skriptas"
      />
      <main className="calc-page">
        {calculatorContent}
      </main>
    </>
  );
}

