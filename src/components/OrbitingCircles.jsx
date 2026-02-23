import './OrbitingCircles.css';

const OrbitingCircles = ({
  className = '',
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true
}) => {
  const classes = `orbiting-circles ${reverse ? 'is-reverse' : ''} ${className}`.trim();

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="orbiting-path"
          aria-hidden="true"
        >
          <circle cx="50%" cy="50%" r={radius} fill="none" />
        </svg>
      )}

      <div
        style={{
          '--duration': duration,
          '--radius': radius,
          '--delay': -delay
        }}
        className={classes}
      >
        {children}
      </div>
    </>
  );
};

export default OrbitingCircles;
