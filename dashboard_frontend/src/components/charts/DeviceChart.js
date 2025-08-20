import React from 'react';
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
import { formatCurrency, formatPercentage } from '../../data/dataUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// PUBLIC_INTERFACE
function DeviceChart({ data }) {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
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
            return `Spend: ${formatCurrency(context.parsed.y)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#f1f5f9'
        },
        ticks: {
          color: '#64748b',
          font: {
            size: 11
          },
          callback: function(value) {
            return formatCurrency(value);
          }
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderSkipped: false
      }
    }
  };

  const chartData = {
    labels: data.map(item => item.device.charAt(0).toUpperCase() + item.device.slice(1)),
    datasets: [
      {
        data: data.map(item => item.spend),
        backgroundColor: ['#3b82f6', '#8b5cf6', '#06b6d4'],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="chart-container chart-small">
      <Bar options={chartOptions} data={chartData} />
    </div>
  );
}

export default DeviceChart;
