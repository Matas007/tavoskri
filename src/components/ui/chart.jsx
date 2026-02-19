import { cloneElement, isValidElement } from 'react';
import { Legend, ResponsiveContainer, Tooltip } from 'recharts';
import './chart.css';

export function ChartContainer({ className = '', children }) {
  const hasResizeObserver =
    typeof window !== 'undefined' && typeof window.ResizeObserver !== 'undefined';

  if (!hasResizeObserver) {
    const fallbackChild = isValidElement(children)
      ? cloneElement(children, { width: 720, height: 280 })
      : children;

    return (
      <div className={`ts-chart-container ts-chart-container-fallback ${className}`}>
        {fallbackChild}
      </div>
    );
  }

  return (
    <div className={`ts-chart-container ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export function ChartTooltip(props) {
  return <Tooltip {...props} />;
}

export function ChartTooltipContent({ active, payload, label, valueSuffix = '' }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="ts-chart-tooltip">
      {label !== undefined && label !== null && (
        <div className="ts-chart-tooltip-label">{String(label)}</div>
      )}
      <div className="ts-chart-tooltip-list">
        {payload.map((item) => (
          <div key={item.dataKey} className="ts-chart-tooltip-item">
            <span
              className="ts-chart-dot"
              style={{ backgroundColor: item.color || item.fill || '#C9A882' }}
              aria-hidden="true"
            />
            <span className="ts-chart-item-name">{item.name}</span>
            <span className="ts-chart-item-value">
              {item.value}
              {valueSuffix}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartLegend(props) {
  return <Legend {...props} />;
}

export function ChartLegendContent({ payload = [] }) {
  if (!payload.length) return null;

  return (
    <div className="ts-chart-legend">
      {payload.map((entry) => (
        <div key={entry.value} className="ts-chart-legend-item">
          <span
            className="ts-chart-dot"
            style={{ backgroundColor: entry.color || '#C9A882' }}
            aria-hidden="true"
          />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
}
