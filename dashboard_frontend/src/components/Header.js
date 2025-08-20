import React from 'react';
import { Menu, Bell, User, Download, RefreshCw } from 'lucide-react';

// PUBLIC_INTERFACE
function Header({ title, subtitle, onMenuClick }) {
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
            <p className="header-subtitle">{subtitle}</p>
          </div>
        </div>

        <div className="header-actions">
          <div className="time-selector">
            <button className="time-option">7D</button>
            <button className="time-option active">30D</button>
            <button className="time-option">90D</button>
            <button className="time-option">1Y</button>
          </div>

          <button className="button button-secondary">
            <RefreshCw size={16} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button className="button button-secondary">
            <Download size={16} />
            <span className="hidden sm:inline">Export</span>
          </button>

          <button className="button button-secondary">
            <Bell size={16} />
          </button>

          <button className="button button-secondary">
            <User size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
