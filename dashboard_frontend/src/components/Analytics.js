import React, { useState } from 'react';
import mockData from '../data/mockData';
import PerformanceChart from './charts/PerformanceChart';
import PlatformChart from './charts/PlatformChart';
import DeviceChart from './charts/DeviceChart';
import GeoChart from './charts/GeoChart';
import { formatCurrency, formatPercentage } from '../data/dataUtils';

// PUBLIC_INTERFACE
function Analytics() {
  const [activeTab, setActiveTab] = useState('performance');
  const { 
    timeSeriesData, 
    platformBreakdown, 
    deviceBreakdown, 
    geographicBreakdown,
    ageGroupBreakdown 
  } = mockData;

  const tabs = [
    { id: 'performance', label: 'Performance' },
    { id: 'platforms', label: 'Platforms' },
    { id: 'demographics', label: 'Demographics' },
    { id: 'geography', label: 'Geography' }
  ];

  // PUBLIC_INTERFACE
  const renderTabContent = () => {
    switch (activeTab) {
      case 'performance':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card col-span-full">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Performance Trends</h3>
                  <p className="card-subtitle">Daily performance metrics over time</p>
                </div>
              </div>
              <div className="card-content">
                <PerformanceChart data={timeSeriesData} />
              </div>
            </div>
          </div>
        );
      
      case 'platforms':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Platform Distribution</h3>
                  <p className="card-subtitle">Spend by platform</p>
                </div>
              </div>
              <div className="card-content">
                <PlatformChart data={platformBreakdown} />
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Platform Performance</h3>
                  <p className="card-subtitle">Key metrics by platform</p>
                </div>
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  {platformBreakdown.map((platform, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium capitalize">{platform.platform}</h4>
                        <span className="text-sm text-gray-500">
                          {formatCurrency(platform.spend)}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">CTR:</span>
                          <span className="ml-2 font-mono">{formatPercentage(platform.ctr / 100)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">CPC:</span>
                          <span className="ml-2 font-mono">{formatCurrency(platform.cpc)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Conv Rate:</span>
                          <span className="ml-2 font-mono">{formatPercentage(platform.conversionRate / 100)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">ROAS:</span>
                          <span className="ml-2 font-mono">{platform.roas.toFixed(2)}x</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'demographics':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Device Performance</h3>
                  <p className="card-subtitle">Performance by device type</p>
                </div>
              </div>
              <div className="card-content">
                <DeviceChart data={deviceBreakdown} />
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Age Group Performance</h3>
                  <p className="card-subtitle">Performance by age demographics</p>
                </div>
              </div>
              <div className="card-content">
                <div className="space-y-3">
                  {ageGroupBreakdown.map((group, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{group.ageGroup}</div>
                        <div className="text-sm text-gray-500">{group.percentage}% of traffic</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-semibold">
                          {formatPercentage(group.ctr / 100)}
                        </div>
                        <div className="text-sm text-gray-500">CTR</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'geography':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Geographic Performance</h3>
                  <p className="card-subtitle">Performance by country and region</p>
                </div>
              </div>
              <div className="card-content">
                <GeoChart data={geographicBreakdown} />
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
}

export default Analytics;
