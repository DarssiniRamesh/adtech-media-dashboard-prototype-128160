import React, { useState } from 'react';
import { formatCurrency, formatNumber, formatPercentage } from '../data/dataUtils';
import { ChevronUp, ChevronDown } from 'lucide-react';

// PUBLIC_INTERFACE
function CampaignTable({ campaigns }) {
  const [sortField, setSortField] = useState('spend');
  const [sortDirection, setSortDirection] = useState('desc');

  // PUBLIC_INTERFACE
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // PUBLIC_INTERFACE
  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  // PUBLIC_INTERFACE
  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'status-active',
      paused: 'status-paused',
      inactive: 'status-inactive'
    };

    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };

  const sortedCampaigns = [...campaigns].sort((a, b) => {
    let aValue = a.metrics[sortField] || a[sortField];
    let bValue = b.metrics[sortField] || b[sortField];

    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return (
    <div className="table-container">
      <div className="table-header">
        <h3 className="table-title">Campaign Performance</h3>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table className="table">
          <thead>
            <tr>
              <th 
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Campaign {getSortIcon('name')}
                </div>
              </th>
              <th>Status</th>
              <th>Platform</th>
              <th 
                className="cursor-pointer hover:bg-gray-100 text-right"
                onClick={() => handleSort('spend')}
              >
                <div className="flex items-center justify-end gap-1">
                  Spend {getSortIcon('spend')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100 text-right"
                onClick={() => handleSort('impressions')}
              >
                <div className="flex items-center justify-end gap-1">
                  Impressions {getSortIcon('impressions')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100 text-right"
                onClick={() => handleSort('clicks')}
              >
                <div className="flex items-center justify-end gap-1">
                  Clicks {getSortIcon('clicks')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100 text-right"
                onClick={() => handleSort('ctr')}
              >
                <div className="flex items-center justify-end gap-1">
                  CTR {getSortIcon('ctr')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100 text-right"
                onClick={() => handleSort('conversions')}
              >
                <div className="flex items-center justify-end gap-1">
                  Conversions {getSortIcon('conversions')}
                </div>
              </th>
              <th 
                className="cursor-pointer hover:bg-gray-100 text-right"
                onClick={() => handleSort('roas')}
              >
                <div className="flex items-center justify-end gap-1">
                  ROAS {getSortIcon('roas')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCampaigns.map((campaign) => (
              <tr key={campaign.id}>
                <td>
                  <div>
                    <div className="font-medium text-gray-900">{campaign.name}</div>
                    <div className="text-sm text-gray-500">{campaign.advertiser}</div>
                  </div>
                </td>
                <td>{getStatusBadge(campaign.status)}</td>
                <td>
                  <div className="flex gap-1">
                    {campaign.platforms.map((platform, index) => (
                      <span 
                        key={platform}
                        className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded capitalize"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="text-right font-mono">
                  {formatCurrency(campaign.metrics.spend)}
                </td>
                <td className="text-right font-mono">
                  {formatNumber(campaign.metrics.impressions)}
                </td>
                <td className="text-right font-mono">
                  {formatNumber(campaign.metrics.clicks)}
                </td>
                <td className="text-right font-mono">
                  {formatPercentage(campaign.metrics.ctr / 100)}
                </td>
                <td className="text-right font-mono">
                  {formatNumber(campaign.metrics.conversions)}
                </td>
                <td className="text-right font-mono font-semibold">
                  {campaign.metrics.roas.toFixed(2)}x
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CampaignTable;
