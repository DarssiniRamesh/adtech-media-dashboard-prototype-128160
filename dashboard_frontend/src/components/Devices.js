import React, { useState } from 'react';
import { Smartphone, Monitor, Tablet, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import mockData from '../data/mockData';
import { formatCurrency, formatNumber, formatPercentage } from '../data/dataUtils';
import DeviceChart from './charts/DeviceChart';

// PUBLIC_INTERFACE
function Devices() {
  const [selectedMetric, setSelectedMetric] = useState('spend');
  const { deviceBreakdown } = mockData;

  // PUBLIC_INTERFACE
  const getDeviceIcon = (device) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return <Smartphone size={24} />;
      case 'desktop':
        return <Monitor size={24} />;
      case 'tablet':
        return <Tablet size={24} />;
      default:
        return <Monitor size={24} />;
    }
  };

  // PUBLIC_INTERFACE
  const getDeviceColor = (device) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return 'bg-blue-500';
      case 'desktop':
        return 'bg-green-500';
      case 'tablet':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  // PUBLIC_INTERFACE
  const getPerformanceTrend = (device) => {
    // Mock trend data
    const trends = {
      mobile: { direction: 'up', value: '+12.3%' },
      desktop: { direction: 'down', value: '-5.7%' },
      tablet: { direction: 'up', value: '+3.2%' }
    };
    return trends[device] || { direction: 'up', value: '+0.0%' };
  };

  const totalSpend = deviceBreakdown.reduce((sum, device) => sum + device.spend, 0);
  const totalImpressions = deviceBreakdown.reduce((sum, device) => sum + device.impressions, 0);
  const avgCTR = deviceBreakdown.reduce((sum, device) => sum + device.ctr, 0) / deviceBreakdown.length;

  return (
    <div className="space-y-6">
      {/* Device Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="metric-label">Total Devices</div>
          <div className="metric-value">{deviceBreakdown.length}</div>
          <div className="metric-change positive">
            <Zap size={16} />
            <span>Device types</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Spend</div>
          <div className="metric-value">{formatCurrency(totalSpend)}</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+8.9% vs last period</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Impressions</div>
          <div className="metric-value">{formatNumber(totalImpressions)}</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+15.4% vs last period</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Avg CTR</div>
          <div className="metric-value">{formatPercentage(avgCTR / 100)}</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+4.2% vs last period</span>
          </div>
        </div>
      </div>

      {/* Device Performance Chart */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Device Performance Distribution</h3>
            <p className="card-subtitle">Spend distribution across device types</p>
          </div>
          <div className="flex gap-2">
            {['spend', 'impressions', 'clicks'].map(metric => (
              <button
                key={metric}
                onClick={() => setSelectedMetric(metric)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors capitalize ${
                  selectedMetric === metric
                    ? 'bg-primary-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {metric}
              </button>
            ))}
          </div>
        </div>
        <div className="card-content">
          <DeviceChart data={deviceBreakdown} />
        </div>
      </div>

      {/* Device Performance Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {deviceBreakdown.map((device, index) => {
          const trend = getPerformanceTrend(device.device);
          return (
            <div key={index} className="card">
              <div className="card-header">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg text-white ${getDeviceColor(device.device)}`}>
                    {getDeviceIcon(device.device)}
                  </div>
                  <div>
                    <h3 className="card-title capitalize">{device.device}</h3>
                    <p className="card-subtitle">{device.percentage}% of total traffic</p>
                  </div>
                </div>
              </div>
              <div className="card-content">
                {/* Performance Metrics */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Spend</div>
                      <div className="font-mono font-semibold text-lg">
                        {formatCurrency(device.spend)}
                      </div>
                      <div className={`text-xs flex items-center gap-1 ${
                        trend.direction === 'up' ? 'text-success' : 'text-error'
                      }`}>
                        {trend.direction === 'up' ? 
                          <TrendingUp size={12} /> : 
                          <TrendingDown size={12} />
                        }
                        {trend.value}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Impressions</div>
                      <div className="font-mono font-semibold text-lg">
                        {formatNumber(device.impressions)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {device.percentage}% share
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">CTR</div>
                      <div className="font-mono font-semibold">
                        {formatPercentage(device.ctr / 100)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">CPC</div>
                      <div className="font-mono font-semibold">
                        {formatCurrency(device.cpc)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Conv Rate</div>
                      <div className="font-mono font-semibold">
                        {formatPercentage(device.conversionRate / 100)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Conversions</div>
                      <div className="font-mono font-semibold">
                        {formatNumber(device.conversions)}
                      </div>
                    </div>
                  </div>

                  {/* Performance Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Performance Score</span>
                      <span>{((device.ctr / 3) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getDeviceColor(device.device)}`}
                        style={{ width: `${Math.min((device.ctr / 3) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Device Insights & Recommendations */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Device Optimization Insights</h3>
            <p className="card-subtitle">Recommendations for device-specific improvements</p>
          </div>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="text-blue-600" size={20} />
                <h4 className="font-semibold text-blue-800">Mobile Dominance</h4>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Mobile accounts for 62.8% of traffic with strong performance
              </p>
              <div className="text-xs text-blue-600">
                <strong>Action:</strong> Increase mobile-specific creative investment
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="text-green-600" size={20} />
                <h4 className="font-semibold text-green-800">Desktop Quality</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Desktop has highest conversion rate at 2.89% despite lower volume
              </p>
              <div className="text-xs text-green-600">
                <strong>Action:</strong> Optimize desktop campaigns for higher spend
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Tablet className="text-purple-600" size={20} />
                <h4 className="font-semibold text-purple-800">Tablet Opportunity</h4>
              </div>
              <p className="text-sm text-purple-700 mb-3">
                Tablet shows potential but needs creative optimization
              </p>
              <div className="text-xs text-purple-600">
                <strong>Action:</strong> Develop tablet-specific ad formats
              </div>
            </div>
          </div>

          {/* Device Comparison Table */}
          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-4">Device Performance Comparison</h4>
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Device</th>
                    <th className="text-right">Traffic Share</th>
                    <th className="text-right">Spend Share</th>
                    <th className="text-right">CTR</th>
                    <th className="text-right">CPC</th>
                    <th className="text-right">Conv Rate</th>
                    <th className="text-center">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceBreakdown.map((device, index) => (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(device.device)}
                          <span className="font-medium capitalize">{device.device}</span>
                        </div>
                      </td>
                      <td className="text-right">{device.percentage}%</td>
                      <td className="text-right">
                        {((device.spend / totalSpend) * 100).toFixed(1)}%
                      </td>
                      <td className="text-right font-mono">
                        {formatPercentage(device.ctr / 100)}
                      </td>
                      <td className="text-right font-mono">
                        {formatCurrency(device.cpc)}
                      </td>
                      <td className="text-right font-mono">
                        {formatPercentage(device.conversionRate / 100)}
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center">
                          <div className={`w-3 h-3 rounded-full ${
                            device.conversionRate >= 2.5 ? 'bg-success' : 
                            device.conversionRate >= 2.0 ? 'bg-warning' : 'bg-error'
                          }`}></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Devices;
