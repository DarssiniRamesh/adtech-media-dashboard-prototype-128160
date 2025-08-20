import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import mockData from '../data/mockData';
import { formatCurrency, formatNumber, formatPercentage } from '../data/dataUtils';
import PerformanceChart from './charts/PerformanceChart';
import PlatformChart from './charts/PlatformChart';
import CampaignTable from './CampaignTable';

// PUBLIC_INTERFACE
function DashboardOverview() {
  const { dashboardSummary, timeSeriesData, platformBreakdown, campaigns } = mockData;

  // PUBLIC_INTERFACE
  const formatMetricChange = (current, previous, isPercentage = false) => {
    if (!previous) return { value: 0, trend: 'neutral' };
    
    const change = ((current - previous) / previous) * 100;
    const trend = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
    
    return {
      value: isPercentage ? change.toFixed(1) + '%' : change.toFixed(1) + '%',
      trend
    };
  };

  // PUBLIC_INTERFACE
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'positive':
        return <TrendingUp size={16} />;
      case 'negative':
        return <TrendingDown size={16} />;
      default:
        return <Minus size={16} />;
    }
  };

  const metricCards = [
    {
      label: 'Total Spend',
      value: formatCurrency(dashboardSummary.totalSpend),
      change: formatMetricChange(dashboardSummary.totalSpend, 2650000),
      description: 'Media spend this period'
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(dashboardSummary.totalRevenue),
      change: formatMetricChange(dashboardSummary.totalRevenue, 5200000),
      description: 'Revenue generated'
    },
    {
      label: 'ROAS',
      value: dashboardSummary.ROAS.toFixed(2) + 'x',
      change: formatMetricChange(dashboardSummary.ROAS, 1.8),
      description: 'Return on ad spend'
    },
    {
      label: 'Impressions',
      value: formatNumber(dashboardSummary.totalImpressions),
      change: formatMetricChange(dashboardSummary.totalImpressions, 42000000),
      description: 'Total impressions served'
    },
    {
      label: 'CTR',
      value: formatPercentage(dashboardSummary.avgCTR / 100),
      change: formatMetricChange(dashboardSummary.avgCTR, 1.8),
      description: 'Click-through rate'
    },
    {
      label: 'Conversions',
      value: formatNumber(dashboardSummary.totalConversions),
      change: formatMetricChange(dashboardSummary.totalConversions, 22000),
      description: 'Total conversions'
    },
    {
      label: 'CPC',
      value: formatCurrency(dashboardSummary.avgCPC),
      change: formatMetricChange(dashboardSummary.avgCPC, 3.45),
      description: 'Cost per click'
    },
    {
      label: 'Conv. Rate',
      value: formatPercentage(dashboardSummary.conversionRate / 100),
      change: formatMetricChange(dashboardSummary.conversionRate, 2.4),
      description: 'Conversion rate'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-label">{metric.label}</div>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-change ${metric.change.trend}`}>
              {getTrendIcon(metric.change.trend)}
              <span>{metric.change.value}</span>
              <span className="text-muted">vs last period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="card col-span-full lg:col-span-2">
          <div className="card-header">
            <div>
              <h3 className="card-title">Performance Trends</h3>
              <p className="card-subtitle">Daily spend and revenue over time</p>
            </div>
          </div>
          <div className="card-content">
            <PerformanceChart data={timeSeriesData} />
          </div>
        </div>

        {/* Platform Performance */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Platform Performance</h3>
              <p className="card-subtitle">Spend distribution by platform</p>
            </div>
          </div>
          <div className="card-content">
            <PlatformChart data={platformBreakdown} />
          </div>
        </div>

        {/* Top Campaigns */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Campaign Performance</h3>
              <p className="card-subtitle">Top performing campaigns by ROAS</p>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              {campaigns.slice(0, 5).map((campaign, index) => (
                <div key={campaign.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {campaign.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {campaign.advertiser}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-semibold text-sm">
                      {campaign.metrics.roas.toFixed(2)}x
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatCurrency(campaign.metrics.spend)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">All Campaigns</h3>
            <p className="card-subtitle">Complete campaign performance overview</p>
          </div>
        </div>
        <div className="card-content">
          <CampaignTable campaigns={campaigns} />
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
