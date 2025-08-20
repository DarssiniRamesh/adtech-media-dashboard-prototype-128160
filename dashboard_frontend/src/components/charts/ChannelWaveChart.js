import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

/**
 * PUBLIC_INTERFACE
 * ChannelWaveChart
 * Renders a modern wave/area chart for channel trends over time with soft curves and stacked fills.
 * Props:
 * - labels: string[] - x-axis labels (e.g. dates)
 * - channels: Record<string, number[]> - map of channel name to array of values
 * - colors: Record<string, string> - map channel to color
 * - title?: string - optional title for a11y
 */
function ChannelWaveChart({ labels, channels, colors = {}, title = 'Channel Waves' }) {
  // PUBLIC_INTERFACE
  /** Prepare datasets with soft transparency for wave effect. */
  const data = useMemo(() => {
    const datasets = Object.keys(channels).map((ch, i) => {
      const color = colors[ch] || ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9aa0a6'][i % 5];
      return {
        label: ch,
        data: channels[ch],
        fill: true,
        tension: 0.5,
        borderColor: color,
        backgroundColor: color + '26', // 15% alpha
        pointRadius: 0,
        borderWidth: 2,
      };
    });
    return {
      labels,
      datasets,
    };
  }, [labels, channels, colors]);

  // PUBLIC_INTERFACE
  /** Chart options for a clean modern look, stacked waves. */
  const options = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 16,
          font: { size: 12, family: 'Inter, sans-serif' },
        },
      },
      title: {
        display: false,
        text: title,
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 4,
      },
    },
    scales: {
      x: {
        grid: { color: '#f1f5f9' },
        ticks: { color: '#64748b', maxTicksLimit: 8, font: { size: 11 } },
      },
      y: {
        stacked: true,
        grid: { color: '#f1f5f9' },
        ticks: { color: '#64748b', font: { size: 11 } },
      },
    },
    elements: {
      line: { tension: 0.5, borderWidth: 2 },
    },
  }), [title]);

  return (
    <div className="chart-container">
      <Line data={data} options={options} aria-label={title} role="img" />
    </div>
  );
}

export default ChannelWaveChart;
