import React, { useState } from 'react';
import { Menu, Bell, User, Download, RefreshCw } from 'lucide-react';

// PUBLIC_INTERFACE
function Header({ title, subtitle, onMenuClick }) {
  const [selectedPeriod, setSelectedPeriod] = useState('30D');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // PUBLIC_INTERFACE
  const handleRefresh = () => {
    setLastUpdated(new Date());
    // In a real app, this would trigger data refresh
    console.log('Refreshing dashboard data...');
  };

  // PUBLIC_INTERFACE
  const handleExport = () => {
    // In a real app, this would trigger export functionality
    console.log('Exporting dashboard data...');
  };

  // PUBLIC_INTERFACE
  const handleTimePeriodChange = (period) => {
    setSelectedPeriod(period);
    // In a real app, this would update the data based on time period
    console.log(`Changing time period to: ${period}`);
  };

  const timePeriods = [
    { id: '7D', label: '7 Days' },
    { id: '30D', label: '30 Days' },
    { id: '90D', label: '90 Days' },
    { id: '1Y', label: '1 Year' }
  ];

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="button button-secondary lg:hidden mr-4"
            onClick={onMenuClick}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          
          <div>
            <h1 className="header-title">{title}</h1>
            <div className="flex items-center gap-4">
              <p className="header-subtitle">{subtitle}</p>
              <div className="text-xs text-gray-500">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <div className="time-selector">
            {timePeriods.map(period => (
              <button 
                key={period.id}
                className={`time-option ${selectedPeriod === period.id ? 'active' : ''}`}
                onClick={() => handleTimePeriodChange(period.id)}
                title={period.label}
              >
                {period.id}
              </button>
            ))}
          </div>

          <button 
            className="button button-secondary"
            onClick={handleRefresh}
            title="Refresh data"
          >
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button 
            className="button button-secondary"
            onClick={handleExport}
            title="Export data"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button 
            className="button button-secondary"
            title="View notifications"
          >
            <Bell size={16} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button 
            className="button button-secondary"
            title="User profile"
          >
            <User size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
