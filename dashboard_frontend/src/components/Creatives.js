import React, { useState } from 'react';
import { Eye, Play, Image, Zap, TrendingUp, Award, AlertCircle } from 'lucide-react';
import mockData from '../data/mockData';
import { formatCurrency, formatNumber, formatPercentage } from '../data/dataUtils';

// PUBLIC_INTERFACE
function Creatives() {
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('ctr');
  const { campaigns } = mockData;

  // Get all creatives from campaigns
  const allCreatives = campaigns.flatMap(campaign => 
    campaign.creatives.map(creative => ({
      ...creative,
      campaignName: campaign.name,
      campaignId: campaign.id,
      spend: creative.spend || (creative.clicks * 2.5) // Estimate spend
    }))
  );

  // PUBLIC_INTERFACE
  const getCreativeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <Play size={20} />;
      case 'image':
      case 'carousel':
        return <Image size={20} />;
      case 'display':
        return <Eye size={20} />;
      case 'playable':
        return <Zap size={20} />;
      default:
        return <Eye size={20} />;
    }
  };

  // PUBLIC_INTERFACE
  const getCreativeTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'video':
        return 'bg-red-500';
      case 'image':
      case 'carousel':
        return 'bg-blue-500';
      case 'display':
        return 'bg-green-500';
      case 'playable':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  // PUBLIC_INTERFACE
  const getPerformanceRating = (ctr) => {
    if (ctr >= 4.0) return { rating: 'Excellent', color: 'text-success', icon: <Award size={16} /> };
    if (ctr >= 3.0) return { rating: 'Good', color: 'text-info', icon: <TrendingUp size={16} /> };
    if (ctr >= 2.0) return { rating: 'Average', color: 'text-warning', icon: <Eye size={16} /> };
    return { rating: 'Poor', color: 'text-error', icon: <AlertCircle size={16} /> };
  };

  // PUBLIC_INTERFACE
  const getFilteredCreatives = () => {
    let filtered = selectedType === 'all' ? allCreatives : allCreatives.filter(c => c.type === selectedType);
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'ctr':
          return b.ctr - a.ctr;
        case 'impressions':
          return b.impressions - a.impressions;
        case 'clicks':
          return b.clicks - a.clicks;
        case 'spend':
          return (b.spend || 0) - (a.spend || 0);
        default:
          return b.ctr - a.ctr;
      }
    });
  };

  const creativeTypes = ['all', ...new Set(allCreatives.map(c => c.type))];
  const filteredCreatives = getFilteredCreatives();
  
  // Calculate summary metrics
  const totalImpressions = allCreatives.reduce((sum, c) => sum + c.impressions, 0);
  const totalSpend = allCreatives.reduce((sum, c) => sum + (c.spend || 0), 0);
  const avgCTR = allCreatives.reduce((sum, c) => sum + c.ctr, 0) / allCreatives.length;

  return (
    <div className="space-y-6">
      {/* Creative Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="metric-label">Total Creatives</div>
          <div className="metric-value">{allCreatives.length}</div>
          <div className="metric-change positive">
            <Eye size={16} />
            <span>Active assets</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Impressions</div>
          <div className="metric-value">{formatNumber(totalImpressions)}</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+18.7% vs last period</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Avg CTR</div>
          <div className="metric-value">{formatPercentage(avgCTR / 100)}</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+9.2% vs last period</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Spend</div>
          <div className="metric-value">{formatCurrency(totalSpend)}</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+14.3% vs last period</span>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Creative Performance Analysis</h3>
            <p className="card-subtitle">Analyze and optimize creative asset performance</p>
          </div>
          <div className="flex gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Creative Type
              </label>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {creativeTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ctr">CTR</option>
                <option value="impressions">Impressions</option>
                <option value="clicks">Clicks</option>
                <option value="spend">Spend</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Performance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCreatives.map((creative, index) => {
          const performance = getPerformanceRating(creative.ctr);
          
          return (
            <div key={`${creative.id}-${index}`} className="card hover:shadow-lg transition-shadow">
              <div className="card-header">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg text-white ${getCreativeTypeColor(creative.type)}`}>
                      {getCreativeIcon(creative.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 truncate">{creative.name}</h4>
                      <p className="text-sm text-gray-500">{creative.campaignName}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 ${performance.color}`}>
                    {performance.icon}
                    <span className="text-xs font-medium">{performance.rating}</span>
                  </div>
                </div>
              </div>

              <div className="card-content">
                <div className="space-y-4">
                  {/* Creative Details */}
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Type:</span>
                        <span className="ml-2 font-medium capitalize">{creative.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Format:</span>
                        <span className="ml-2 font-medium">{creative.format}</span>
                      </div>
                      {creative.size && (
                        <div className="col-span-2">
                          <span className="text-gray-500">Size:</span>
                          <span className="ml-2 font-medium">{creative.size}</span>
                        </div>
                      )}
                      {creative.duration && (
                        <div className="col-span-2">
                          <span className="text-gray-500">Duration:</span>
                          <span className="ml-2 font-medium">{creative.duration}s</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">CTR</div>
                      <div className={`font-mono font-bold text-lg ${performance.color}`}>
                        {formatPercentage(creative.ctr / 100)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Impressions</div>
                      <div className="font-mono font-semibold text-lg">
                        {formatNumber(creative.impressions)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Clicks</div>
                      <div className="font-mono font-semibold">
                        {formatNumber(creative.clicks)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Est. Spend</div>
                      <div className="font-mono font-semibold">
                        {formatCurrency(creative.spend || creative.clicks * 2.5)}
                      </div>
                    </div>
                  </div>

                  {/* Performance Bar */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Performance Score</span>
                      <span>{Math.min((creative.ctr / 5) * 100, 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          creative.ctr >= 4.0 ? 'bg-success' :
                          creative.ctr >= 3.0 ? 'bg-info' :
                          creative.ctr >= 2.0 ? 'bg-warning' : 'bg-error'
                        }`}
                        style={{ width: `${Math.min((creative.ctr / 5) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Creative Type Performance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance by Type */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Performance by Creative Type</h3>
              <p className="card-subtitle">Analyze effectiveness of different creative formats</p>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {creativeTypes.filter(type => type !== 'all').map(type => {
                const typeCreatives = allCreatives.filter(c => c.type === type);
                const avgCTRForType = typeCreatives.reduce((sum, c) => sum + c.ctr, 0) / typeCreatives.length;
                const totalImpressionsForType = typeCreatives.reduce((sum, c) => sum + c.impressions, 0);
                
                return (
                  <div key={type} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg text-white ${getCreativeTypeColor(type)}`}>
                          {getCreativeIcon(type)}
                        </div>
                        <div>
                          <h4 className="font-semibold capitalize">{type}</h4>
                          <p className="text-sm text-gray-500">{typeCreatives.length} creatives</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-lg">
                          {formatPercentage(avgCTRForType / 100)}
                        </div>
                        <div className="text-sm text-gray-500">Avg CTR</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Impressions:</span>
                        <span className="ml-1 font-mono">
                          {formatNumber(totalImpressionsForType)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Share:</span>
                        <span className="ml-1 font-mono">
                          {((totalImpressionsForType / totalImpressions) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Performance:</span>
                        <span className={`ml-1 font-medium ${
                          avgCTRForType >= 3.5 ? 'text-success' :
                          avgCTRForType >= 2.5 ? 'text-info' : 'text-warning'
                        }`}>
                          {avgCTRForType >= 3.5 ? 'High' :
                           avgCTRForType >= 2.5 ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Creative Optimization Insights */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Optimization Insights</h3>
              <p className="card-subtitle">Recommendations for creative performance improvement</p>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="text-green-600" size={20} />
                  <h4 className="font-semibold text-green-800">Top Performers</h4>
                </div>
                <p className="text-sm text-green-700 mb-2">
                  Video and playable creatives show highest engagement rates
                </p>
                <div className="text-xs text-green-600">
                  <strong>Action:</strong> Scale video creative production by 40%
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-orange-600" size={20} />
                  <h4 className="font-semibold text-orange-800">Underperformers</h4>
                </div>
                <p className="text-sm text-orange-700 mb-2">
                  Display ads need creative refresh - CTR below benchmark
                </p>
                <div className="text-xs text-orange-600">
                  <strong>Action:</strong> A/B test new display formats
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="text-blue-600" size={20} />
                  <h4 className="font-semibold text-blue-800">Creative Innovation</h4>
                </div>
                <p className="text-sm text-blue-700 mb-2">
                  Explore interactive and AR creative formats for higher engagement
                </p>
                <div className="text-xs text-blue-600">
                  <strong>Action:</strong> Pilot interactive creative campaigns
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="text-purple-600" size={20} />
                  <h4 className="font-semibold text-purple-800">Creative Testing</h4>
                </div>
                <p className="text-sm text-purple-700 mb-2">
                  Implement systematic creative testing framework
                </p>
                <div className="text-xs text-purple-600">
                  <strong>Action:</strong> Set up automated creative rotation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creative Performance Summary Table */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Creative Performance Summary</h3>
            <p className="card-subtitle">Detailed performance metrics for all creatives</p>
          </div>
        </div>
        <div className="card-content">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Creative</th>
                  <th>Type</th>
                  <th>Campaign</th>
                  <th className="text-right">Impressions</th>
                  <th className="text-right">Clicks</th>
                  <th className="text-right">CTR</th>
                  <th className="text-right">Est. Spend</th>
                  <th className="text-center">Performance</th>
                </tr>
              </thead>
              <tbody>
                {filteredCreatives.slice(0, 10).map((creative, index) => {
                  const performance = getPerformanceRating(creative.ctr);
                  
                  return (
                    <tr key={`${creative.id}-table-${index}`}>
                      <td>
                        <div className="flex items-center gap-2">
                          {getCreativeIcon(creative.type)}
                          <span className="font-medium">{creative.name}</span>
                        </div>
                      </td>
                      <td>
                        <span className={`px-2 py-1 rounded text-xs text-white ${getCreativeTypeColor(creative.type)}`}>
                          {creative.type}
                        </span>
                      </td>
                      <td className="text-sm text-gray-600 max-w-xs truncate">
                        {creative.campaignName}
                      </td>
                      <td className="text-right font-mono">
                        {formatNumber(creative.impressions)}
                      </td>
                      <td className="text-right font-mono">
                        {formatNumber(creative.clicks)}
                      </td>
                      <td className="text-right font-mono">
                        <span className={performance.color}>
                          {formatPercentage(creative.ctr / 100)}
                        </span>
                      </td>
                      <td className="text-right font-mono">
                        {formatCurrency(creative.spend || creative.clicks * 2.5)}
                      </td>
                      <td className="text-center">
                        <div className={`inline-flex items-center gap-1 ${performance.color}`}>
                          {performance.icon}
                          <span className="text-xs">{performance.rating}</span>
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
    </div>
  );
}

export default Creatives;
