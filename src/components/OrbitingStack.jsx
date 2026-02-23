import {
  SiAndroid,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRuby,
  SiSupabase,
  SiSvelte,
  SiTailwindcss,
  SiTypescript,
  SiStreamlit
} from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import OrbitingCircles from './OrbitingCircles';
import './OrbitingStack.css';

const ThreeJsIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="orbiting-custom-icon">
    <path d="M12 3l8 4.5v9L12 21 4 16.5v-9L12 3z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 3v18M4 7.5l8 4.5 8-4.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const WebGlIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="orbiting-custom-icon">
    <rect x="3.2" y="5.2" width="17.6" height="13.6" rx="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M7 15.2V8.8l2 5.3 2-5.3v6.4M14.1 15.2V8.8h3.8" fill="none" stroke="currentColor" strokeWidth="1.7" />
    <path d="M14.1 12h3.2" fill="none" stroke="currentColor" strokeWidth="1.7" />
  </svg>
);

const FRONTEND_LAYER = [
  { id: 'react', label: 'React', Icon: SiReact, color: '#61DAFB' },
  { id: 'next', label: 'Next.js', Icon: SiNextdotjs, color: '#FFFFFF' },
  { id: 'typescript', label: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { id: 'tailwind', label: 'Tailwind', Icon: SiTailwindcss, color: '#38BDF8' },
  { id: 'svelte', label: 'Svelte', Icon: SiSvelte, color: '#FF3E00' },
  { id: 'gsap', label: 'GSAP', text: 'GSAP', color: '#88CE02' },
  { id: 'three', label: 'Three.js', Icon: ThreeJsIcon, color: '#FFFFFF' },
  { id: 'webgl', label: 'WebGL', Icon: WebGlIcon, color: '#67E8F9' },
  { id: 'radix', label: 'Radix UI', text: 'Rx', color: '#FFFFFF' },
  { id: 'android', label: 'Android', Icon: SiAndroid, color: '#3DDC84' }
];

const BACKEND_LAYER = [
  { id: 'node', label: 'Node.js', Icon: SiNodedotjs, color: '#83CD29' },
  { id: 'python', label: 'Python', Icon: SiPython, color: '#3776AB' },
  { id: 'ruby', label: 'Ruby', Icon: SiRuby, color: '#CC342D' },
  { id: 'rest', label: 'REST API', Icon: TbApi, color: '#F4E8DB' },
  { id: 'streamlit', label: 'Streamlit', Icon: SiStreamlit, color: '#FF4B4B' },
  { id: 'hostinger', label: 'Hostinger', text: 'H', color: '#A970FF' }
];

const DATABASE_LAYER = [
  { id: 'postgres', label: 'PostgreSQL', Icon: SiPostgresql, color: '#336791' },
  { id: 'prisma', label: 'Prisma', Icon: SiPrisma, color: '#FFFFFF' },
  { id: 'supabase', label: 'Supabase', Icon: SiSupabase, color: '#3ECF8E' }
];

function OrbitingItem({ item, className }) {
  const Icon = item.Icon;

  return (
    <div
      className={`orbiting-item ${className}`.trim()}
      style={{ '--icon-color': item.color }}
      aria-label={item.label}
      title={item.label}
    >
      {Icon ? <Icon /> : <span className="orbiting-text-icon">{item.text}</span>}
    </div>
  );
}

const OrbitingStack = () => {
  const layers = [
    {
      id: 'frontend',
      className: 'orbiting-item-front',
      radius: 82,
      duration: 24,
      reverse: false,
      items: FRONTEND_LAYER
    },
    {
      id: 'backend',
      className: 'orbiting-item-back',
      radius: 138,
      duration: 34,
      reverse: true,
      items: BACKEND_LAYER
    },
    {
      id: 'database',
      className: 'orbiting-item-db',
      radius: 192,
      duration: 44,
      reverse: false,
      items: DATABASE_LAYER
    }
  ];

  return (
    <section className="orbiting-stack" aria-label="Naudojamas technologijų stack">
      <div className="orbiting-layout">
        <div className="orbiting-copy">
          <h2>Mūsų technologijų stack</h2>
          <p className="orbiting-stack-note">
            Kuriame greitas, patikimas ir lengvai plečiamas svetaines, sistemas bei automatizavimo sprendimus - nuo
            patrauklaus UI/UX dizaino ir SEO optimizacijos iki API kūrimo, duomenų bazių architektūros, administravimo bei
            įvairių integracijų. Klientas gauna pilnai paruoštą, techniškai tvarkingą ir verslo poreikiams pritaikytą
            sprendimą, kuris gali būti greitai paleidžiamas ir toliau vystomas etapais. Naudojamas technologinis sprendimų
            rinkinys užtikrina stabilų veikimą realiomis sąlygomis, saugumą, našumą ir galimybę sistemą auginti kartu su
            verslo plėtra.
          </p>
        </div>

        <div className="orbiting-stage">
          <div className="orbiting-inner-glow" aria-hidden="true" />
          <div className="orbiting-center">
            <span>Tavo</span>
            <strong>Stack</strong>
          </div>

          <div className="orbiting-guide orbiting-guide-front" />
          <div className="orbiting-guide orbiting-guide-back" />
          <div className="orbiting-guide orbiting-guide-db" />

          {layers.map(layer =>
            layer.items.map((item, index) => (
              <OrbitingCircles
                key={`${layer.id}-${item.id}`}
                className="orbiting-layer"
                duration={layer.duration}
                delay={(layer.duration / layer.items.length) * index}
                radius={layer.radius}
                reverse={layer.reverse}
                path={false}
              >
                <OrbitingItem item={item} className={layer.className} />
              </OrbitingCircles>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default OrbitingStack;
