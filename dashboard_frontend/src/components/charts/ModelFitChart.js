import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Title);

/**
 * PUBLIC_INTERFACE
 * ModelFitChart
 * Line chart of Actual vs Predicted over time with inline model fit (R²).
 * Props:
 * - labels: string[]
 * - actual: number[]
 * - predicted: number[]
 * - title?: string
 */
function ModelFitChart({ labels = [], actual = [], predicted = [], title = 'Model Fit (R²)' }) {
  // PUBLIC_INTERFACE
  /** Compute R² for display. */
  const r2 = useMemo(() => {
    if (actual.length !== predicted.length || actual.length === 0) return 0;
    const mean = actual.reduce((a, b) => a + b, 0) / actual.length;
    let ssRes = 0, ssTot = 0;
    for (let i = 0; i < actual.length; i++) {
      ssRes += Math.pow(actual[i] - predicted[i], 2);
      ssTot += Math.pow(actual[i] - mean, 2);
    }
    const value = ssTot === 0 ? 0 : 1 - ssRes / ssTot;
    return Math.max(0, Math.min(1, value));
  }, [actual, predicted]);

  // PUBLIC_INTERFACE
  /** Prepare chart data. */
  const data = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Actual',
        data: actual,
        borderColor: '#10b981',
        backgroundColor: '#10b98120',
        fill: false,
        tension: 0.4,
        pointRadius: 2,
      },
      {
        label: 'Predicted',
        data: predicted,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f620',
        fill: false,
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  }), [labels, actual, predicted]);

  // PUBLIC_INTERFACE
  /** Chart options. */
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'top', labels: { usePointStyle: true, padding: 16, font: { size: 12 } } },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 4,
      },
      title: { display: false, text: title },
    },
    scales: {
      x: { grid: { color: '#f1f5f9' }, ticks: { color: '#64748b', font: { size: 11 } } },
      y: { grid: { color: '#f1f5f9' }, ticks: { color: '#64748b', font: { size: 11 } } },
    },
  }), [title]);

  return (
    <div className="relative chart-container">
      <div
        className="absolute top-2 right-2 bg-white border border-gray-200 rounded px-2 py-1 text-xs"
        aria-label="Model Fit R-squared"
      >
        <span className="text-gray-600 mr-1">R²</span>
        <span className="font-mono font-semibold">{r2.toFixed(3)}</span>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default ModelFitChart;
