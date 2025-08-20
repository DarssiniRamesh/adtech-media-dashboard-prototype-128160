import React, { useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Simple seeded pseudo-random for consistent demo values
function seededRandom(seed) {
  let s = 0;
  for (let i = 0; i < seed.length; i++) s = (s << 5) - s + seed.charCodeAt(i);
  return function () {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5;
    return ((s < 0 ? ~s + 1 : s) % 1000) / 1000;
  };
}

/**
 * PUBLIC_INTERFACE
 * ChannelAttributionChart
 * Simulates channel contributions across attribution models using a stacked bar chart.
 * Props:
 * - models: string[] (e.g., ['First Click','Last Click','Linear','Time Decay','Position Based'])
 * - channels: string[] (e.g., ['Search','Social','Video','Display','Affiliate'])
 * - baseTotals: Record<model, number> (e.g., total revenue or conversions per model)
 * - mode: 'revenue' | 'conversions'
 */
function ChannelAttributionChart({
  models = ['First Click', 'Last Click', 'Linear', 'Time Decay', 'Position Based'],
  channels = ['Search', 'Social', 'Video', 'Display', 'Affiliate'],
  baseTotals = {},
  mode = 'revenue',
}) {
  const [selectedMode, setSelectedMode] = useState(mode);

  // PUBLIC_INTERFACE
  /** Generate deterministic contributions that sum to the base total for each model. */
  const simulated = useMemo(() => {
    const colors = {
      Search: '#1a73e8',
      Social: '#e4405f',
      Video: '#34a853',
      Display: '#fbbc04',
      Affiliate: '#9aa0a6',
    };
    const datasets = channels.map((ch) => ({
      label: ch,
      backgroundColor: colors[ch] || '#6b7280',
      borderWidth: 0,
      data: [],
    }));

    const labels = models;
    labels.forEach((model) => {
      const total = baseTotals[model] ?? (selectedMode === 'revenue' ? 100000 : 1000);
      const rand = seededRandom(model + selectedMode);
      // Create raw weights
      const weights = channels.map(() => 0.2 + rand() * 0.8);
      const sum = weights.reduce((a, b) => a + b, 0);
      const normalized = weights.map((w) => (w / sum) * total);
      normalized.forEach((value, idx) => {
        datasets[idx].data.push(Math.round(value));
      });
    });

    return { labels, datasets };
  }, [models, channels, baseTotals, selectedMode]);

  // PUBLIC_INTERFACE
  /** Chart options: stacked bars with modern tooltips and custom legend ordering. */
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 16,
            font: { size: 12, family: 'Inter, sans-serif' },
          },
        },
        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.85)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          cornerRadius: 4,
          callbacks: {
            label: function (ctx) {
              const v = ctx.parsed.y;
              if (selectedMode === 'revenue') {
                return `${ctx.dataset.label}: $${v.toLocaleString()}`;
              }
              return `${ctx.dataset.label}: ${v.toLocaleString()}`;
            },
            footer: function (items) {
              const sum = items.reduce((acc, it) => acc + it.parsed.y, 0);
              return selectedMode === 'revenue'
                ? `Total: $${sum.toLocaleString()}`
                : `Total: ${sum.toLocaleString()}`;
            },
          },
          footerFont: { weight: 'bold' },
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { color: '#64748b', font: { size: 11 } },
        },
        y: {
          stacked: true,
          grid: { color: '#f1f5f9' },
          ticks: {
            color: '#64748b',
            font: { size: 11 },
            callback: (val) =>
              selectedMode === 'revenue' ? `$${Number(val).toLocaleString()}` : Number(val).toLocaleString(),
          },
        },
      },
    }),
    [selectedMode]
  );

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <button
          className={`button button-small ${selectedMode === 'revenue' ? 'button-primary' : 'button-secondary'}`}
          onClick={() => setSelectedMode('revenue')}
          aria-pressed={selectedMode === 'revenue'}
        >
          Revenue
        </button>
        <button
          className={`button button-small ${selectedMode === 'conversions' ? 'button-primary' : 'button-secondary'}`}
          onClick={() => setSelectedMode('conversions')}
          aria-pressed={selectedMode === 'conversions'}
        >
          Conversions
        </button>
      </div>
      <div className="chart-container">
        <Bar data={simulated} options={options} />
      </div>
    </div>
  );
}

export default ChannelAttributionChart;
