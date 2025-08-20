import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatCurrency } from '../../data/dataUtils';

ChartJS.register(ArcElement, Tooltip, Legend);

// PUBLIC_INTERFACE
function PlatformChart({ data }) {
  const platformColors = {
    facebook: '#1877f2',
    google: '#4285f4',
    instagram: '#e4405f',
    linkedin: '#0077b5',
    tiktok: '#000000',
    pinterest: '#bd081c',
    amazon: '#ff9900',
    unity: '#000000'
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12
          },
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return {
                  text: `${label.charAt(0).toUpperCase() + label.slice(1)} (${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].backgroundColor[i],
                  pointStyle: 'circle'
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 4,
        callbacks: {
          label: function(context) {
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${formatCurrency(value)} (${percentage}%)`;
          }
        }
      }
    }
  };

  const chartData = {
    labels: data.map(item => item.platform),
    datasets: [
      {
        data: data.map(item => item.spend),
        backgroundColor: data.map(item => platformColors[item.platform] || '#6b7280'),
        borderWidth: 2,
        borderColor: '#ffffff'
      }
    ]
  };

  return (
    <div className="chart-container chart-small">
      <Doughnut options={chartOptions} data={chartData} />
    </div>
  );
}

export default PlatformChart;
