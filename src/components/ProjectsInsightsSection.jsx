import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis
} from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from './ui/chart';

const seoCompareData = [
  { metric: 'Organinis srautas', beSpecialisto: 10, suProfesionalais: 95 },
  { metric: 'Raktažodžių augimas', beSpecialisto: 10, suProfesionalais: 52 },
  { metric: 'Konversija', beSpecialisto: 2, suProfesionalais: 5 }
];

const seoLineData = [
  { month: '1 mėn.', beSpecialisto: 100, suProfesionalais: 110 },
  { month: '2 mėn.', beSpecialisto: 102, suProfesionalais: 123 },
  { month: '3 mėn.', beSpecialisto: 104, suProfesionalais: 137 },
  { month: '4 mėn.', beSpecialisto: 106, suProfesionalais: 154 },
  { month: '5 mėn.', beSpecialisto: 109, suProfesionalais: 172 },
  { month: '6 mėn.', beSpecialisto: 112, suProfesionalais: 195 }
];

const uiBounceData = [
  { state: 'Be profesionalaus UI', bounce: 68 },
  { state: 'Su profesionaliu UI', bounce: 38 }
];

const securityRiskData = [
  { name: 'Pažeidžiamumo rizika', beSpecialisto: 80, suArchitektura: 20 },
  { name: 'Duomenų nutekėjimo tikimybė', beSpecialisto: 45, suArchitektura: 8 }
];

const carbonData = [
  { name: 'CO2 / peržiūra', average: 1.75, optimized: 0.4 },
  { name: 'Puslapio svoris (MB)', average: 2.5, optimized: 0.8 }
];

const performanceData = [
  { name: 'Įkrovimo laikas (sek.)', average: 4.5, optimized: 1.3 },
  { name: 'Core Web Vitals', average: 60, optimized: 92 },
  { name: 'Bounce rate (%)', average: 60, optimized: 35 }
];

function useCountUp(active, target, { duration = 1100, decimals = 0 } = {}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return undefined;
    }

    if (typeof window === 'undefined' || typeof window.requestAnimationFrame !== 'function') {
      setValue(target);
      return undefined;
    }

    let frameId = 0;
    const nowSource = typeof window.performance !== 'undefined' ? window.performance : Date;
    const start = nowSource.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const raw = target * eased;
      const next = decimals > 0 ? Number(raw.toFixed(decimals)) : Math.round(raw);
      setValue(next);
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [active, target, duration, decimals]);

  return value;
}

export default function ProjectsInsightsSection() {
  const sectionRef = useRef(null);
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasEnteredViewport) return undefined;
    if (typeof window === 'undefined') return undefined;
    if (typeof window.IntersectionObserver === 'undefined') {
      setHasEnteredViewport(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasEnteredViewport]);

  const seoGrowth = useCountUp(hasEnteredViewport, 95);
  const rankingGrowth = useCountUp(hasEnteredViewport, 52);
  const conversionGrowth = useCountUp(hasEnteredViewport, 5);
  const trustScore = useCountUp(hasEnteredViewport, 85);
  const trustLift = useCountUp(hasEnteredViewport, 50);
  const riskDrop = useCountUp(hasEnteredViewport, 78);
  const energyDrop = useCountUp(hasEnteredViewport, 72);
  const co2Drop = useCountUp(hasEnteredViewport, 80);
  const loadTime = useCountUp(hasEnteredViewport, 1.3, { decimals: 1 });

  const trustRadialAnimated = useMemo(
    () => [{ name: 'Pasitikėjimas', value: trustScore, fill: '#C9A882' }],
    [trustScore]
  );

  const energyRadialAnimated = useMemo(
    () => [{ name: 'Energijos sumažinimas', value: energyDrop, fill: '#E8D5C4' }],
    [energyDrop]
  );

  return (
    <section ref={sectionRef} className="projects-insights" aria-label="Profesionalių sprendimų vertė">
      <h2>Kodėl verta rinktis profesionalius web sprendimus?</h2>
      <p className="projects-insights-lead">
        Žemiau pateikiami rinkos vidurkių ir profesionalios optimizacijos palyginimai. Vizualiai
        matosi, kaip techniniai sprendimai tiesiogiai veikia verslo rezultatą.
      </p>
      <div className="insight-kpis" aria-label="Pagrindiniai pagerėjimai">
        <div className="insight-kpi">
          <span className="kpi-value">+{seoGrowth}%</span>
          <span className="kpi-label">SEO srauto augimas</span>
        </div>
        <div className="insight-kpi">
          <span className="kpi-value">+{rankingGrowth}%</span>
          <span className="kpi-label">Raktažodžių pozicijos</span>
        </div>
        <div className="insight-kpi">
          <span className="kpi-value">+{conversionGrowth}%</span>
          <span className="kpi-label">Konversijos augimas</span>
        </div>
        <div className="insight-kpi">
          <span className="kpi-value">{loadTime}s</span>
          <span className="kpi-label">Tipinis įkrovimas po optimizacijos</span>
        </div>
      </div>

      <div className="projects-insights-grid">
        <article className="insight-card">
          <h3>SEO efektyvumas</h3>
          <p>
            Didesnis matomumas = daugiau kvalifikuotų lankytojų ir mažesnė konversijos kaina.
          </p>
          <ChartContainer>
            <BarChart data={seoCompareData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid stroke="rgba(201,168,130,0.16)" vertical={false} />
              <XAxis dataKey="metric" tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent valueSuffix="%" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="beSpecialisto" name="Pasaulinis vidurkis" fill="#7E6A53" radius={[6, 6, 0, 0]} />
              <Bar dataKey="suProfesionalais" name="Su profesionaliu SEO" fill="#C9A882" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>

          <ChartContainer className="chart-short">
            <LineChart data={seoLineData} margin={{ top: 10, right: 12, left: 4, bottom: 8 }}>
              <CartesianGrid stroke="rgba(201,168,130,0.16)" />
              <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="beSpecialisto" name="Be specialisto" stroke="#8a755d" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="suProfesionalais" name="Su profesionaliu SEO" stroke="#E8D5C4" strokeWidth={2.8} dot={false} />
            </LineChart>
          </ChartContainer>
        </article>

        <article className="insight-card">
          <h3>UI optimizacija</h3>
          <p>
            Geras UI mažina kognityvinę apkrovą, išlaiko dėmesį ir didina veiksmų tikimybę.
          </p>
          <div className="insight-split">
            <ChartContainer className="chart-medium">
              <BarChart data={uiBounceData} margin={{ top: 10, right: 10, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="rgba(201,168,130,0.16)" vertical={false} />
                <XAxis dataKey="state" tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent valueSuffix="%" />} />
                <Bar dataKey="bounce" name="Bounce rate" fill="#C9A882" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>

            <div className="radial-wrap">
              <ChartContainer className="chart-medium">
                <RadialBarChart
                  data={trustRadialAnimated}
                  innerRadius="65%"
                  outerRadius="95%"
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <ChartTooltip content={<ChartTooltipContent valueSuffix="%" />} />
                  <RadialBar background dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ChartContainer>
              <div className="radial-caption">Vizualinis pasitikėjimo indeksas: <strong>+{trustLift}%</strong></div>
            </div>
          </div>
        </article>

        <article className="insight-card">
          <h3>Saugumas</h3>
          <p>
            HTTPS, CSP, validacija ir autentifikacija sumažina riziką iki ~70-85% ir stabilizuoja
            klientų pasitikėjimą.
          </p>
          <ChartContainer className="chart-medium">
            <BarChart data={securityRiskData} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
              <CartesianGrid stroke="rgba(201,168,130,0.16)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent valueSuffix="%" />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="beSpecialisto" name="Be specialisto" fill="#7E6A53" radius={[6, 6, 0, 0]} />
              <Bar dataKey="suArchitektura" name="Su saugumo architektūra" fill="#C9A882" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
          <div className="insight-progress">
            <span>Klientų pasitikėjimas</span>
            <div className="insight-progress-track">
              <div className="insight-progress-fill" style={{ width: `${trustScore}%` }} />
            </div>
            <strong>Rizika sumažinta ~{riskDrop}%</strong>
          </div>
        </article>

        <article className="insight-card">
          <h3>Tvarumas ir našumas</h3>
          <p>
            Optimizuota svetainė mažina CO2, spartina įkrovimą ir tiesiogiai kelia konversijas.
          </p>
          <div className="insight-split">
            <ChartContainer className="chart-medium">
              <BarChart data={carbonData} margin={{ top: 10, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="rgba(201,168,130,0.16)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 12 }} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="average" name="Vidutinė svetainė" fill="#7E6A53" radius={[6, 6, 0, 0]} />
                <Bar dataKey="optimized" name="Optimizuota svetainė" fill="#C9A882" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>

            <div className="radial-wrap">
              <ChartContainer className="chart-medium">
                <RadialBarChart
                  data={energyRadialAnimated}
                  innerRadius="65%"
                  outerRadius="95%"
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                  <ChartTooltip content={<ChartTooltipContent valueSuffix="%" />} />
                  <RadialBar background dataKey="value" cornerRadius={10} />
                </RadialBarChart>
              </ChartContainer>
              <div className="radial-caption">Energijos suvartojimas: <strong>-{energyDrop}%</strong></div>
            </div>
          </div>

          <ChartContainer className="chart-short">
            <BarChart data={performanceData} margin={{ top: 10, right: 12, left: 0, bottom: 10 }}>
              <CartesianGrid stroke="rgba(201,168,130,0.16)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.75)', fontSize: 12 }} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="average" name="Vidutinė svetainė" fill="#7E6A53" radius={[6, 6, 0, 0]} />
              <Bar dataKey="optimized" name="Mūsų optimizuota" fill="#C9A882" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
          <div className="insight-footnote">CO2 pėdsako sumažinimas iki <strong>{co2Drop}%</strong> metiniu pjūviu.</div>
        </article>
      </div>
    </section>
  );
}
