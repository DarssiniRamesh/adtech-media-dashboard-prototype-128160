import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title);

/**
 * PUBLIC_INTERFACE
 * PredictedActualClusterChart
 * Scatter chart comparing predicted vs actual metrics grouped by clusters.
 * Props:
 * - points: Array<{ cluster: string, actual: number, predicted: number }>
 * - colors?: Record<string, string>
 * - title?: string
 */
function PredictedActualClusterChart({ points = [], colors = {}, title = 'Predicted vs Actual (Clusters)' }) {
  // PUBLIC_INTERFACE
  /** Group by cluster and create a dataset per cluster. */
  const grouped = useMemo(() => {
    const byCluster = points.reduce((acc, p) => {
      acc[p.cluster] = acc[p.cluster] || [];
      acc[p.cluster].push({ x: p.actual, y: p.predicted });
      return acc;
    }, {});
    const palette = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9aa0a6'];
    const datasets = Object.keys(byCluster).map((cluster, i) => ({
      label: cluster,
      data: byCluster[cluster],
      backgroundColor: (colors[cluster] || palette[i % palette.length]) + 'BB',
      borderColor: colors[cluster] || palette[i % palette.length],
      pointRadius: 4,
      pointHoverRadius: 6,
    }));
    return { datasets };
  }, [points, colors]);

  // PUBLIC_INTERFACE
  /** Options with diagonal reference line via plugin (y=x). */
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { usePointStyle: true, padding: 16, font: { size: 12 } } },
      title: { display: false, text: title },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        titleColor: '#fff',
        bodyColor: '#fff',
        callbacks: {
          label: (ctx) => `Actual: ${ctx.parsed.x.toLocaleString()} • Pred: ${ctx.parsed.y.toLocaleString()}`,
        }
      },
    },
    scales: {
      x: {
        title: { display: true, text: 'Actual', color: '#64748b' },
        grid: { color: '#f1f5f9' },
        ticks: { color: '#64748b', font: { size: 11 } },
      },
      y: {
        title: { display: true, text: 'Predicted', color: '#64748b' },
        grid: { color: '#f1f5f9' },
        ticks: { color: '#64748b', font: { size: 11 } },
      },
    },
  }), [title]);

  return (
    <div className="chart-container">
      <Scatter data={grouped} options={options} />
    </div>
  );
}

export default PredictedActualClusterChart;
