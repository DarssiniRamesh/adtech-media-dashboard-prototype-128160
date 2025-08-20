import React, { useState } from 'react';
import { Globe, MapPin, TrendingUp, TrendingDown, Target } from 'lucide-react';
import mockData from '../data/mockData';
import { formatCurrency, formatNumber, formatPercentage } from '../data/dataUtils';
import GeoChart from './charts/GeoChart';

// PUBLIC_INTERFACE
function Geography() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const { geographicBreakdown } = mockData;

  // PUBLIC_INTERFACE
  const getRegionalData = () => {
    if (selectedRegion === 'all') return geographicBreakdown;
    return geographicBreakdown.filter(item => item.region === selectedRegion);
  };

  // PUBLIC_INTERFACE
  const getRegionSummary = () => {
    const data = getRegionalData();
    return {
      totalSpend: data.reduce((sum, item) => sum + item.spend, 0),
      totalImpressions: data.reduce((sum, item) => sum + item.impressions, 0),
      totalClicks: data.reduce((sum, item) => sum + item.clicks, 0),
      totalConversions: data.reduce((sum, item) => sum + item.conversions, 0),
      avgCTR: data.reduce((sum, item) => sum + item.ctr, 0) / data.length,
      avgROAS: data.reduce((sum, item) => sum + item.roas, 0) / data.length
    };
  };

  // PUBLIC_INTERFACE
  const getPerformanceIndicator = (value, benchmark) => {
    const ratio = value / benchmark;
    if (ratio >= 1.1) return { color: 'text-success', icon: <TrendingUp size={14} />, status: 'above' };
    if (ratio <= 0.9) return { color: 'text-error', icon: <TrendingDown size={14} />, status: 'below' };
    return { color: 'text-info', icon: <Target size={14} />, status: 'on-target' };
  };

  const regions = ['all', ...new Set(geographicBreakdown.map(item => item.region))];
  const summary = getRegionSummary();
  const regionalData = getRegionalData();

  return (
    <div className="space-y-6">
      {/* Geographic Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="metric-label">Countries</div>
          <div className="metric-value">{regionalData.length}</div>
          <div className="metric-change positive">
            <Globe size={16} />
            <span>Active markets</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Spend</div>
          <div className="metric-value">{formatCurrency(summary.totalSpend)}</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+15.2% vs last period</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Avg CTR</div>
          <div className="metric-value">{formatPercentage(summary.avgCTR / 100)}</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+3.4% vs last period</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Avg ROAS</div>
          <div className="metric-value">{summary.avgROAS.toFixed(2)}x</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+8.7% vs last period</span>
          </div>
        </div>
      </div>

      {/* Region Filter */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Geographic Performance</h3>
            <p className="card-subtitle">Performance metrics by geographic region</p>
          </div>
          <div className="flex gap-2">
            {regions.map(region => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedRegion === region
                    ? 'bg-primary-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {region === 'all' ? 'All Regions' : region}
              </button>
            ))}
          </div>
        </div>
        <div className="card-content">
          <GeoChart data={regionalData} />
        </div>
      </div>

      {/* Country Performance Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Country Performance Details</h3>
            <p className="card-subtitle">Detailed metrics by country</p>
          </div>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Region</th>
                  <th className="text-right">Spend</th>
                  <th className="text-right">Impressions</th>
                  <th className="text-right">CTR</th>
                  <th className="text-right">CPC</th>
                  <th className="text-right">Conv Rate</th>
                  <th className="text-right">ROAS</th>
                  <th className="text-center">Performance</th>
                </tr>
              </thead>
              <tbody>
                {regionalData.map((country, index) => {
                  const ctrIndicator = getPerformanceIndicator(country.ctr, 2.0);
                  const roasIndicator = getPerformanceIndicator(country.roas, 2.0);
                  
                  return (
                    <tr key={index}>
                      <td>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-gray-400" />
                          <span className="font-medium">{country.country}</span>
                        </div>
                      </td>
                      <td>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                          {country.region}
                        </span>
                      </td>
                      <td className="text-right font-mono">
                        {formatCurrency(country.spend)}
                      </td>
                      <td className="text-right font-mono">
                        {formatNumber(country.impressions)}
                      </td>
                      <td className="text-right font-mono">
                        <div className="flex items-center justify-end gap-1">
                          <span className={ctrIndicator.color}>
                            {formatPercentage(country.ctr / 100)}
                          </span>
                          {ctrIndicator.icon}
                        </div>
                      </td>
                      <td className="text-right font-mono">
                        {formatCurrency(country.cpc)}
                      </td>
                      <td className="text-right font-mono">
                        {formatPercentage(country.conversionRate / 100)}
                      </td>
                      <td className="text-right font-mono">
                        <div className="flex items-center justify-end gap-1">
                          <span className={roasIndicator.color}>
                            {country.roas.toFixed(2)}x
                          </span>
                          {roasIndicator.icon}
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center">
                          <div className={`w-3 h-3 rounded-full ${
                            country.roas >= 2.2 ? 'bg-success' : 
                            country.roas >= 1.8 ? 'bg-warning' : 'bg-error'
                          }`}></div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Geographic Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Top Performing Markets</h3>
              <p className="card-subtitle">Best ROAS by country</p>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              {[...regionalData]
                .sort((a, b) => b.roas - a.roas)
                .slice(0, 3)
                .map((country, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                      <span className="text-green-600 font-bold text-sm">#{index + 1}</span>
                    </div>
                    <div>
                      <div className="font-medium text-green-800">{country.country}</div>
                      <div className="text-sm text-green-600">{formatCurrency(country.spend)} spend</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-green-700">
                      {country.roas.toFixed(2)}x
                    </div>
                    <div className="text-sm text-green-600">ROAS</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Growth Opportunities */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Growth Opportunities</h3>
              <p className="card-subtitle">Markets with potential for expansion</p>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="text-blue-600" size={20} />
                  <h4 className="font-semibold text-blue-800">Market Expansion</h4>
                </div>
                <p className="text-sm text-blue-700 mb-2">
                  Consider expanding to France and Italy - similar demographics to Germany
                </p>
                <div className="text-xs text-blue-600">
                  <strong>Potential:</strong> 30% revenue increase
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-orange-600" size={20} />
                  <h4 className="font-semibold text-orange-800">Budget Reallocation</h4>
                </div>
                <p className="text-sm text-orange-700 mb-2">
                  Shift 20% budget from low-performing to high-ROAS markets
                </p>
                <div className="text-xs text-orange-600">
                  <strong>Impact:</strong> 15% efficiency improvement
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="text-purple-600" size={20} />
                  <h4 className="font-semibold text-purple-800">Regional Strategy</h4>
                </div>
                <p className="text-sm text-purple-700 mb-2">
                  Develop region-specific creative and messaging strategies
                </p>
                <div className="text-xs text-purple-600">
                  <strong>Expected:</strong> 25% CTR improvement
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Geography;
