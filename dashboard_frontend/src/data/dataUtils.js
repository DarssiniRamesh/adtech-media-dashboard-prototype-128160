// Data Utilities for Dashboard
// Helper functions for data formatting, calculations, and transformations

export const formatCurrency = (value, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

export const formatNumber = (value, decimals = 0) => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(decimals) + 'B';
  } else if (value >= 1000000) {
    return (value / 1000000).toFixed(decimals) + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(decimals) + 'K';
  }
  return value.toLocaleString();
};

export const formatPercentage = (value, decimals = 2) => {
  return (value * 100).toFixed(decimals) + '%';
};

export const calculateCTR = (clicks, impressions) => {
  return impressions > 0 ? (clicks / impressions) * 100 : 0;
};

export const calculateCPC = (spend, clicks) => {
  return clicks > 0 ? spend / clicks : 0;
};

export const calculateCPM = (spend, impressions) => {
  return impressions > 0 ? (spend / impressions) * 1000 : 0;
};

export const calculateConversionRate = (conversions, clicks) => {
  return clicks > 0 ? (conversions / clicks) * 100 : 0;
};

export const calculateROAS = (revenue, spend) => {
  return spend > 0 ? revenue / spend : 0;
};

export const calculateCPA = (spend, conversions) => {
  return conversions > 0 ? spend / conversions : 0;
};

export const getDateRange = (days = 30) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

export const generateDateSeries = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);
  const end = new Date(endDate);
  
  while (currentDate <= end) {
    dates.push(new Date(currentDate).toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
};

export const aggregateMetrics = (data, groupByField) => {
  const grouped = {};
  
  data.forEach(item => {
    const key = item[groupByField];
    if (!grouped[key]) {
      grouped[key] = {
        spend: 0,
        impressions: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0
      };
    }
    
    grouped[key].spend += item.spend || 0;
    grouped[key].impressions += item.impressions || 0;
    grouped[key].clicks += item.clicks || 0;
    grouped[key].conversions += item.conversions || 0;
    grouped[key].revenue += item.revenue || 0;
  });
  
  // Calculate derived metrics
  Object.keys(grouped).forEach(key => {
    const metrics = grouped[key];
    metrics.ctr = calculateCTR(metrics.clicks, metrics.impressions);
    metrics.cpc = calculateCPC(metrics.spend, metrics.clicks);
    metrics.cpm = calculateCPM(metrics.spend, metrics.impressions);
    metrics.conversionRate = calculateConversionRate(metrics.conversions, metrics.clicks);
    metrics.roas = calculateROAS(metrics.revenue, metrics.spend);
    metrics.cpa = calculateCPA(metrics.spend, metrics.conversions);
  });
  
  return grouped;
};

export const getPerformanceStatus = (metric, value, thresholds) => {
  if (value >= thresholds.excellent) return 'excellent';
  if (value >= thresholds.good) return 'good';
  if (value >= thresholds.average) return 'average';
  return 'poor';
};

export const getMetricTrend = (currentValue, previousValue) => {
  if (currentValue > previousValue) return 'up';
  if (currentValue < previousValue) return 'down';
  return 'flat';
};

export const calculateGrowthRate = (currentValue, previousValue) => {
  if (previousValue === 0) return 0;
  return ((currentValue - previousValue) / previousValue) * 100;
};

export const sortData = (data, field, direction = 'desc') => {
  return [...data].sort((a, b) => {
    const aValue = a[field];
    const bValue = b[field];
    
    if (direction === 'desc') {
      return bValue - aValue;
    }
    return aValue - bValue;
  });
};

export const filterData = (data, filters) => {
  return data.filter(item => {
    return Object.keys(filters).every(key => {
      const filterValue = filters[key];
      const itemValue = item[key];
      
      if (Array.isArray(filterValue)) {
        return filterValue.includes(itemValue);
      }
      
      if (typeof filterValue === 'object' && filterValue.min !== undefined) {
        return itemValue >= filterValue.min && itemValue <= filterValue.max;
      }
      
      return itemValue === filterValue;
    });
  });
};

// Performance thresholds for different metrics
export const performanceThresholds = {
  ctr: {
    excellent: 3.0,
    good: 2.0,
    average: 1.0
  },
  conversionRate: {
    excellent: 5.0,
    good: 3.0,
    average: 1.5
  },
  roas: {
    excellent: 4.0,
    good: 2.5,
    average: 1.5
  },
  cpm: {
    excellent: 15.0,
    good: 25.0,
    average: 40.0
  }
};

// Chart color palettes
export const chartColors = {
  primary: ['#1a73e8', '#34a853', '#fbbc04', '#ea4335', '#9aa0a6'],
  secondary: ['#5f6368', '#80868b', '#bdc1c6', '#dadce0', '#f1f3f4'],
  status: {
    excellent: '#34a853',
    good: '#fbbc04',
    average: '#ff6d01',
    poor: '#ea4335'
  }
};

const dataUtils = {
  formatCurrency,
  formatNumber,
  formatPercentage,
  calculateCTR,
  calculateCPC,
  calculateCPM,
  calculateConversionRate,
  calculateROAS,
  calculateCPA,
  getDateRange,
  generateDateSeries,
  aggregateMetrics,
  getPerformanceStatus,
  getMetricTrend,
  calculateGrowthRate,
  sortData,
  filterData,
  performanceThresholds,
  chartColors
};

export default dataUtils;
