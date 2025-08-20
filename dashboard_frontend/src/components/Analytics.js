import React, { useMemo, useState } from 'react';
import mockData from '../data/mockData';
import PerformanceChart from './charts/PerformanceChart';
import PlatformChart from './charts/PlatformChart';
import DeviceChart from './charts/DeviceChart';
import GeoChart from './charts/GeoChart';
import ChannelWaveChart from './charts/ChannelWaveChart';
import ChannelAttributionChart from './charts/ChannelAttributionChart';
import PredictedActualClusterChart from './charts/PredictedActualClusterChart';
import ModelFitChart from './charts/ModelFitChart';
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

  // Build channel waves from platforms for demo
  const channelWaves = useMemo(() => {
    const labels = timeSeriesData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    const sumSpend = platformBreakdown.reduce((s, p) => s + p.spend, 0);
    const getScale = (platforms) => platforms.reduce((s, p) => {
      const entry = platformBreakdown.find(x => x.platform === p);
      return s + (entry ? entry.spend : 0);
    }, 0) / sumSpend;

    // Channels and their platform grouping
    const channels = {
      Search: ['google'],
      Social: ['facebook', 'instagram', 'tiktok'],
      Professional: ['linkedin'],
      Other: platformBreakdown
        .map(p => p.platform)
        .filter(p => !['google', 'facebook', 'instagram', 'tiktok', 'linkedin'].includes(p))
    };

    // Generate wave data per channel using scaled base and smooth oscillation
    const waves = {};
    const baseSeries = timeSeriesData.map(d => d.spend); // use spend as base oscillation reference
    Object.keys(channels).forEach((ch, idx) => {
      const scale = Math.max(0.12, getScale(channels[ch]));
      waves[ch] = baseSeries.map((v, i) => {
        const angle = (i / baseSeries.length) * Math.PI * 2;
        const jitter = Math.sin(angle + idx * 0.8) * 0.12 + Math.cos(angle * 0.5 + idx) * 0.08;
        return Math.max(0, Math.round(v * scale * (0.6 + jitter)));
      });
    });

    return { labels, waves };
  }, [timeSeriesData, platformBreakdown]);

  const tabs = [
    { id: 'performance', label: 'Performance' },
    { id: 'platforms', label: 'Platforms' },
    { id: 'channels', label: 'Channels' },
    { id: 'attribution', label: 'Attribution' },
    { id: 'model', label: 'Model' },
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

      case 'channels':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Channel Waves</h3>
                  <p className="card-subtitle">Smoothed spend intensity across channels over time</p>
                </div>
              </div>
              <div className="card-content">
                <ChannelWaveChart
                  labels={channelWaves.labels}
                  channels={channelWaves.waves}
                />
              </div>
            </div>
          </div>
        );

      case 'attribution':
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Channel Attribution (Simulated)</h3>
                  <p className="card-subtitle">Relative contribution by channel across attribution models</p>
                </div>
              </div>
              <div className="card-content">
                <ChannelAttributionChart
                  models={['First Click', 'Last Click', 'Linear', 'Time Decay', 'Position Based']}
                  channels={['Search', 'Social', 'Video', 'Display', 'Affiliate']}
                  baseTotals={{
                    'First Click': Math.round(mockData.attributionData.firstClick.revenue),
                    'Last Click': Math.round(mockData.attributionData.lastClick.revenue),
                    'Linear': Math.round(mockData.attributionData.linear.revenue),
                    'Time Decay': Math.round(mockData.attributionData.timeDecay.revenue),
                    'Position Based': Math.round(mockData.attributionData.positionBased.revenue),
                  }}
                  mode="revenue"
                />
              </div>
            </div>
          </div>
        );

      case 'model':
        // Build predicted = smoothed function of spend with noise for demo
        const labels = timeSeriesData.map(d => new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        const actual = timeSeriesData.map(d => Math.round(d.revenue));
        const predicted = timeSeriesData.map((d, i) => {
          const base = d.spend * 1.8; // assume 1.8x factor for demo
          const wave = Math.sin((i / timeSeriesData.length) * Math.PI * 2) * 5000;
          return Math.round(base + wave);
        });

        // Cluster points for predicted vs actual
        const clusters = ['High Efficiency', 'Balanced', 'Low Efficiency'];
        const points = timeSeriesData.map((d, i) => {
          const actualV = Math.round(d.conversions || (d.clicks * 0.02));
          const predV = Math.max(0, Math.round(actualV * (0.85 + (i % 5) * 0.04)));
          const cluster = clusters[i % clusters.length];
          return { cluster, actual: actualV, predicted: predV };
        });

        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Predicted vs Actual (Time)</h3>
                  <p className="card-subtitle">Model fit across recent periods</p>
                </div>
              </div>
              <div className="card-content">
                <ModelFitChart labels={labels} actual={actual} predicted={predicted} />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div>
                  <h3 className="card-title">Predicted vs Actual (Clusters)</h3>
                  <p className="card-subtitle">Cluster trend comparison of predicted and actual</p>
                </div>
              </div>
              <div className="card-content">
                <PredictedActualClusterChart points={points} />
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
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="-mb-px flex space-x-6 min-w-max">
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
