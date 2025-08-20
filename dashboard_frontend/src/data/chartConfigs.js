// Chart Configurations for Dashboard Visualizations
// Predefined chart settings, colors, and layout configurations

export const chartConfigs = {
  // Color palettes
  colors: {
    primary: ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9aa0a6'],
    secondary: ['#5f6368', '#80868b', '#bdc1c6', '#dadce0', '#f1f3f4'],
    platforms: {
      facebook: '#1877f2',
      google: '#4285f4',
      instagram: '#e4405f',
      linkedin: '#0077b5',
      tiktok: '#000000',
      pinterest: '#bd081c',
      amazon: '#ff9900',
      unity: '#000000'
    },
    metrics: {
      spend: '#ea4335',
      revenue: '#34a853',
      impressions: '#1a73e8',
      clicks: '#fbbc04',
      conversions: '#9c27b0'
    },
    status: {
      excellent: '#34a853',
      good: '#8bc34a',
      average: '#ffeb3b',
      poor: '#f44336',
      critical: '#d32f2f'
    }
  },

  // Common chart options
  commonOptions: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        cornerRadius: 4,
        titleFont: {
          size: 13,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: '#f5f5f5',
          borderColor: '#e0e0e0'
        },
        ticks: {
          color: '#666666',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: '#f5f5f5',
          borderColor: '#e0e0e0'
        },
        ticks: {
          color: '#666666',
          font: {
            size: 11
          }
        }
      }
    }
  },

  // Time series chart configuration
  timeSeriesConfig: {
    type: 'line',
    options: {
      ...this?.commonOptions,
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      scales: {
        x: {
          type: 'time',
          time: {
            tooltipFormat: 'MMM DD, YYYY',
            displayFormats: {
              day: 'MMM DD',
              week: 'MMM DD',
              month: 'MMM YYYY'
            }
          },
          grid: {
            color: '#f5f5f5'
          },
          ticks: {
            color: '#666666',
            maxTicksLimit: 10
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#f5f5f5'
          },
          ticks: {
            color: '#666666',
            callback: function(value) {
              if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
              if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
              return value.toLocaleString();
            }
          }
        }
      },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 2
        },
        point: {
          radius: 3,
          hoverRadius: 6,
          borderWidth: 2,
          backgroundColor: '#ffffff'
        }
      }
    }
  },

  // Bar chart configuration
  barChartConfig: {
    type: 'bar',
    options: {
      indexAxis: 'y',
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
          callbacks: {
            label: function(context) {
              const value = context.parsed.x;
              if (value >= 1000000) return (value / 1000000).toFixed(2) + 'M';
              if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
              return value.toLocaleString();
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: '#f5f5f5'
          },
          ticks: {
            color: '#666666',
            callback: function(value) {
              if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
              if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
              return value;
            }
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: '#666666',
            font: {
              size: 12
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
    }
  },

  // Pie/Doughnut chart configuration
  pieChartConfig: {
    type: 'doughnut',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '60%',
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            padding: 15,
            generateLabels: function(chart) {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map((label, i) => {
                  const value = data.datasets[0].data[i];
                  const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
                  const percentage = ((value / total) * 100).toFixed(1);
                  return {
                    text: `${label} (${percentage}%)`,
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
          callbacks: {
            label: function(context) {
              const value = context.parsed;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
            }
          }
        }
      }
    }
  },

  // Funnel chart configuration
  funnelChartConfig: {
    type: 'bar',
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.parsed.x;
              const percentage = context.dataset.percentages[context.dataIndex];
              return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: {
            color: '#f5f5f5'
          },
          ticks: {
            color: '#666666',
            callback: function(value) {
              if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
              if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
              return value;
            }
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: '#666666'
          }
        }
      },
      elements: {
        bar: {
          borderRadius: {
            topRight: 8,
            bottomRight: 8
          }
        }
      }
    }
  },

  // Heatmap configuration
  heatmapConfig: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          title: function(context) {
            return `${context[0].dataset.yLabels[context[0].dataIndex]} - ${context[0].dataset.xLabels[context[0].parsed.x]}`;
          },
          label: function(context) {
            return `Value: ${context.parsed.v}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: 0,
        max: 23,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return value + ':00';
          }
        }
      },
      y: {
        type: 'linear',
        min: 0,
        max: 6,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            return days[value];
          }
        }
      }
    }
  },

  // Gauge chart configuration
  gaugeConfig: {
    type: 'doughnut',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      rotation: -90,
      circumference: 180,
      cutout: '80%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          enabled: false
        }
      }
    }
  },

  // Area chart configuration
  areaChartConfig: {
    type: 'line',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      fill: true,
      interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
      },
      scales: {
        x: {
          type: 'time',
          time: {
            tooltipFormat: 'MMM DD, YYYY',
            displayFormats: {
              day: 'MMM DD'
            }
          },
          grid: {
            color: '#f5f5f5'
          }
        },
        y: {
          beginAtZero: true,
          stacked: true,
          grid: {
            color: '#f5f5f5'
          },
          ticks: {
            callback: function(value) {
              if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
              if (value >= 1000) return (value / 1000).toFixed(1) + 'K';
              return value;
            }
          }
        }
      },
      elements: {
        line: {
          tension: 0.4,
          borderWidth: 2
        },
        point: {
          radius: 0,
          hoverRadius: 4
        }
      }
    }
  }
};

// Chart data transformation utilities
export const chartDataTransformers = {
  // Transform time series data for line charts
  transformTimeSeriesData: (data, metrics = ['spend', 'revenue']) => {
    const datasets = metrics.map((metric, index) => ({
      label: metric.charAt(0).toUpperCase() + metric.slice(1),
      data: data.map(item => ({
        x: item.date,
        y: item[metric]
      })),
      borderColor: chartConfigs.colors.primary[index],
      backgroundColor: chartConfigs.colors.primary[index] + '20',
      tension: 0.4
    }));

    return { datasets };
  },

  // Transform platform data for pie chart
  transformPlatformData: (platformData) => {
    const labels = platformData.map(item => item.platform);
    const data = platformData.map(item => item.spend);
    const backgroundColor = labels.map(platform => 
      chartConfigs.colors.platforms[platform] || chartConfigs.colors.primary[0]
    );

    return {
      labels,
      datasets: [{
        data,
        backgroundColor,
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    };
  },

  // Transform funnel data
  transformFunnelData: (funnelData) => {
    const labels = funnelData.map(item => item.stage);
    const data = funnelData.map(item => item.value);
    const percentages = funnelData.map(item => item.percentage);

    return {
      labels,
      datasets: [{
        data,
        percentages,
        backgroundColor: chartConfigs.colors.primary[0],
        borderRadius: 4
      }]
    };
  },

  // Transform geographic data for heatmap
  transformGeoData: (geoData) => {
    return geoData.map(item => ({
      x: item.lng,
      y: item.lat,
      v: item.value
    }));
  }
};

export default chartConfigs;
