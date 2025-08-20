import React, { useState } from 'react';
import { Play, Pause, Edit, TrendingUp, TrendingDown, Target } from 'lucide-react';
import mockData from '../data/mockData';
import { formatCurrency, formatNumber, formatPercentage } from '../data/dataUtils';
import CampaignTable from './CampaignTable';

// PUBLIC_INTERFACE
function Campaigns() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlatform, setFilterPlatform] = useState('all');
  const { campaigns, platformBreakdown } = mockData;

  // PUBLIC_INTERFACE
  const getFilteredCampaigns = () => {
    return campaigns.filter(campaign => {
      const statusMatch = filterStatus === 'all' || campaign.status === filterStatus;
      const platformMatch = filterPlatform === 'all' || campaign.platforms.includes(filterPlatform);
      return statusMatch && platformMatch;
    });
  };

  // PUBLIC_INTERFACE
  const getCampaignStats = () => {
    const filtered = getFilteredCampaigns();
    return {
      total: filtered.length,
      active: filtered.filter(c => c.status === 'active').length,
      paused: filtered.filter(c => c.status === 'paused').length,
      totalSpend: filtered.reduce((sum, c) => sum + c.metrics.spend, 0),
      totalRevenue: filtered.reduce((sum, c) => sum + c.metrics.revenue, 0)
    };
  };

  const stats = getCampaignStats();
  const filteredCampaigns = getFilteredCampaigns();

  return (
    <div className="space-y-6">
      {/* Campaign Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="metric-card">
          <div className="metric-label">Total Campaigns</div>
          <div className="metric-value">{stats.total}</div>
          <div className="metric-change neutral">
            <Target size={16} />
            <span>All campaigns</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Active Campaigns</div>
          <div className="metric-value">{stats.active}</div>
          <div className="metric-change positive">
            <Play size={16} />
            <span>Currently running</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Spend</div>
          <div className="metric-value">{formatCurrency(stats.totalSpend)}</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+12.5% vs last period</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Revenue</div>
          <div className="metric-value">{formatCurrency(stats.totalRevenue)}</div>
          <div className="metric-change positive">
            <TrendingUp size={16} />
            <span>+18.3% vs last period</span>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Campaign Management</h3>
            <p className="card-subtitle">Manage and optimize your advertising campaigns</p>
          </div>
          <div className="flex gap-3">
            <button className="button button-primary">
              <Target size={16} />
              New Campaign
            </button>
          </div>
        </div>
        
        <div className="card-content">
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform
              </label>
              <select 
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Platforms</option>
                <option value="facebook">Facebook</option>
                <option value="google">Google</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
          </div>

          {/* Campaign Cards for Mobile */}
          <div className="block md:hidden space-y-4">
            {filteredCampaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                    <p className="text-sm text-gray-500">{campaign.advertiser}</p>
                    <div className="flex gap-1 mt-2">
                      {campaign.platforms.map((platform) => (
                        <span 
                          key={platform}
                          className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded capitalize"
                        >
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="button button-small button-secondary">
                      <Edit size={14} />
                    </button>
                    <button className="button button-small button-secondary">
                      {campaign.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Spend:</span>
                    <span className="ml-2 font-mono font-semibold">
                      {formatCurrency(campaign.metrics.spend)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">ROAS:</span>
                    <span className="ml-2 font-mono font-semibold">
                      {campaign.metrics.roas.toFixed(2)}x
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">CTR:</span>
                    <span className="ml-2 font-mono">
                      {formatPercentage(campaign.metrics.ctr / 100)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Conv Rate:</span>
                    <span className="ml-2 font-mono">
                      {formatPercentage(campaign.metrics.conversionRate / 100)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Campaign Table for Desktop */}
          <div className="hidden md:block">
            <CampaignTable campaigns={filteredCampaigns} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Campaigns;
