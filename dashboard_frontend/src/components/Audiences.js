import React, { useState } from 'react';
import { Users, TrendingUp, Target, UserCheck, UserPlus } from 'lucide-react';
import mockData from '../data/mockData';
import { formatCurrency, formatNumber, formatPercentage } from '../data/dataUtils';

// PUBLIC_INTERFACE
function Audiences() {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const { audienceSegments, ageGroupBreakdown } = mockData;

  // PUBLIC_INTERFACE
  const getSegmentIcon = (segmentName) => {
    if (segmentName.includes('Tech')) return <Target size={20} />;
    if (segmentName.includes('Fashion')) return <UserCheck size={20} />;
    if (segmentName.includes('Business')) return <UserPlus size={20} />;
    return <Users size={20} />;
  };

  // PUBLIC_INTERFACE
  const getPerformanceColor = (value, threshold) => {
    if (value >= threshold * 1.2) return 'text-success';
    if (value >= threshold) return 'text-info';
    return 'text-warning';
  };

  return (
    <div className="space-y-6">
      {/* Audience Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="metric-label">Total Audiences</div>
          <div className="metric-value">{audienceSegments.length}</div>
          <div className="metric-change positive">
            <Users size={16} />
            <span>Active segments</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Reach</div>
          <div className="metric-value">
            {formatNumber(audienceSegments.reduce((sum, seg) => sum + seg.size, 0))}
          </div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+8.3% vs last period</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Avg CTR</div>
          <div className="metric-value">
            {formatPercentage(audienceSegments.reduce((sum, seg) => sum + seg.performance.ctr, 0) / audienceSegments.length / 100)}
          </div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+12.5% vs last period</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Avg Conv Rate</div>
          <div className="metric-value">
            {formatPercentage(audienceSegments.reduce((sum, seg) => sum + seg.performance.conversionRate, 0) / audienceSegments.length / 100)}
          </div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+6.7% vs last period</span>
          </div>
        </div>
      </div>

      {/* Audience Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Segment Performance */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Audience Segments</h3>
              <p className="card-subtitle">Performance by audience segment</p>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {audienceSegments.map((segment, index) => (
                <div 
                  key={segment.id} 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedSegment === segment.id ? 'border-primary-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedSegment(selectedSegment === segment.id ? null : segment.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {getSegmentIcon(segment.name)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{segment.name}</h4>
                        <p className="text-sm text-gray-500">{segment.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-lg">
                        {formatNumber(segment.size)}
                      </div>
                      <div className="text-sm text-gray-500">Users</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">CTR:</span>
                      <span className={`ml-2 font-mono font-medium ${getPerformanceColor(segment.performance.ctr, 2.0)}`}>
                        {formatPercentage(segment.performance.ctr / 100)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Conv Rate:</span>
                      <span className={`ml-2 font-mono font-medium ${getPerformanceColor(segment.performance.conversionRate, 3.0)}`}>
                        {formatPercentage(segment.performance.conversionRate / 100)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">AOV:</span>
                      <span className="ml-2 font-mono font-medium">
                        {formatCurrency(segment.performance.avgOrderValue)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">CPM:</span>
                      <span className="ml-2 font-mono font-medium">
                        {formatCurrency(segment.performance.cpm)}
                      </span>
                    </div>
                  </div>

                  {selectedSegment === segment.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h5 className="font-medium text-gray-900 mb-2">Demographics</h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Age Range:</span>
                          <span className="ml-2 font-medium">{segment.demographics.ageRange}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Gender:</span>
                          <span className="ml-2 font-medium capitalize">{segment.demographics.gender}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Income:</span>
                          <span className="ml-2 font-medium capitalize">{segment.demographics.income}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Age Group Performance */}
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Age Group Analysis</h3>
              <p className="card-subtitle">Performance breakdown by age demographics</p>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-4">
              {ageGroupBreakdown.map((group, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{group.ageGroup}</h4>
                      <p className="text-sm text-gray-500">{group.percentage}% of total audience</p>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-lg">
                        {formatCurrency(group.spend)}
                      </div>
                      <div className="text-sm text-gray-500">Total Spend</div>
                    </div>
                  </div>

                  {/* Performance Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Performance Score</span>
                      <span>{((group.ctr / 3) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-blue h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((group.ctr / 3) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">CTR:</span>
                      <span className="ml-2 font-mono font-medium">
                        {formatPercentage(group.ctr / 100)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">CPC:</span>
                      <span className="ml-2 font-mono font-medium">
                        {formatCurrency(group.cpc)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Conv Rate:</span>
                      <span className="ml-2 font-mono font-medium">
                        {formatPercentage(group.conversionRate / 100)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Impressions:</span>
                      <span className="ml-2 font-mono font-medium">
                        {formatNumber(group.impressions)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audience Insights */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Audience Insights & Recommendations</h3>
            <p className="card-subtitle">Data-driven insights for audience optimization</p>
          </div>
        </div>
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="text-green-600" size={20} />
                <h4 className="font-semibold text-green-800">High Performers</h4>
              </div>
              <p className="text-sm text-green-700 mb-3">
                Business Professionals segment shows highest conversion rate at 4.56%
              </p>
              <div className="text-xs text-green-600">
                <strong>Recommendation:</strong> Increase budget allocation by 25%
              </div>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-orange-600" size={20} />
                <h4 className="font-semibold text-orange-800">Growth Opportunity</h4>
              </div>
              <p className="text-sm text-orange-700 mb-3">
                Fashion Forward segment has high CTR but low conversion rate
              </p>
              <div className="text-xs text-orange-600">
                <strong>Recommendation:</strong> Optimize landing pages for this segment
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="text-blue-600" size={20} />
                <h4 className="font-semibold text-blue-800">Targeting Expansion</h4>
              </div>
              <p className="text-sm text-blue-700 mb-3">
                Consider expanding to similar audiences in 35-44 age group
              </p>
              <div className="text-xs text-blue-600">
                <strong>Recommendation:</strong> Test lookalike audiences
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Audiences;
