import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  FileText, 
  Settings, 
  Users, 
  Globe,
  Smartphone,
  DollarSign,
  Eye
} from 'lucide-react';

// PUBLIC_INTERFACE
function Sidebar({ currentView, setCurrentView, isOpen, onClose }) {
  const navigationItems = [
    {
      section: 'Main',
      items: [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'campaigns', label: 'Campaigns', icon: Target },
        { id: 'reports', label: 'Reports', icon: FileText }
      ]
    },
    {
      section: 'Insights',
      items: [
        { id: 'audiences', label: 'Audiences', icon: Users },
        { id: 'geography', label: 'Geography', icon: Globe },
        { id: 'devices', label: 'Devices', icon: Smartphone },
        { id: 'creatives', label: 'Creatives', icon: Eye }
      ]
    }
  ];

  // PUBLIC_INTERFACE
  const handleItemClick = (itemId) => {
    setCurrentView(itemId);
    if (window.innerWidth <= 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <DollarSign size={24} />
            <span>AdTech Analytics</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigationItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="nav-section">
              <div className="nav-section-title">{section.section}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    <Icon className="nav-item-icon" size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer" style={{ 
          position: 'absolute', 
          bottom: '20px', 
          left: '16px', 
          right: '16px' 
        }}>
          <button className="nav-item" style={{ width: '100%' }}>
            <Settings className="nav-item-icon" size={16} />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
