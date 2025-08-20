import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  FileText, 
  Settings, 
  Users, 
  Globe,
  Smartphone,
  Eye,
  ChevronDown,
  ChevronRight,
  Activity,
  HelpCircle,
  LogOut,
  SlidersHorizontal,
  X
} from 'lucide-react';

// PUBLIC_INTERFACE
function Sidebar({ currentView, setCurrentView, isOpen, onClose }) {
  const [expandedSections, setExpandedSections] = useState(['Main', 'Insights', 'Planning']);

  const navigationItems = [
    {
      section: 'Main',
      items: [
        { id: 'overview', label: 'Overview', icon: BarChart3, description: 'Key metrics at a glance' },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp, description: 'Detailed performance analysis' },
        { id: 'campaigns', label: 'Campaigns', icon: Target, description: 'Campaign management' },
        { id: 'reports', label: 'Reports', icon: FileText, description: 'Generate reports' }
      ]
    },
    {
      section: 'Insights',
      items: [
        { id: 'audiences', label: 'Audiences', icon: Users, description: 'Audience segmentation' },
        { id: 'geography', label: 'Geography', icon: Globe, description: 'Geographic performance' },
        { id: 'devices', label: 'Devices', icon: Smartphone, description: 'Device analytics' },
        { id: 'creatives', label: 'Creatives', icon: Eye, description: 'Creative performance' }
      ]
    },
    {
      section: 'Planning',
      items: [
        { id: 'planner', label: 'Scenario Planner', icon: SlidersHorizontal, description: 'Plan and simulate scenarios' }
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

  // PUBLIC_INTERFACE
  const toggleSection = (sectionName) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(s => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  // PUBLIC_INTERFACE
  const getItemCount = (sectionName) => {
    const section = navigationItems.find(nav => nav.section === sectionName);
    return section ? section.items.length : 0;
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="sidebar-overlay lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <aside
        className={`sidebar ${isOpen ? 'open' : ''}`}
        role={isMobile ? 'dialog' : 'complementary'}
        aria-modal={isMobile && isOpen ? 'true' : 'false'}
        aria-label="Primary navigation"
        tabIndex={isMobile && isOpen ? 0 : -1}
      >
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="flex items-center justify-between">
            <div className="sidebar-logo">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-blue rounded-lg">
                <Activity size={24} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">AdTech</div>
                <div className="text-sm text-gray-500">Analytics</div>
              </div>
            </div>
            {/* Mobile close button */}
            <button 
              className="button button-small button-secondary lg:hidden"
              onClick={onClose}
              aria-label="Close menu"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigationItems.map((section, sectionIndex) => {
            const isExpanded = expandedSections.includes(section.section);
            
            return (
              <div key={sectionIndex} className="nav-section">
                <button
                  className="nav-section-header"
                  onClick={() => toggleSection(section.section)}
                >
                  <div className="flex items-center gap-2">
                    <span className="nav-section-title">{section.section}</span>
                    <span className="nav-section-count">
                      {getItemCount(section.section)}
                    </span>
                  </div>
                  {isExpanded ? 
                    <ChevronDown size={14} className="text-gray-400" /> : 
                    <ChevronRight size={14} className="text-gray-400" />
                  }
                </button>
                
                {isExpanded && (
                  <div className="nav-section-items">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = currentView === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          className={`nav-item ${isActive ? 'active' : ''}`}
                          onClick={() => handleItemClick(item.id)}
                          title={item.description}
                        >
                          <div className="nav-item-content">
                            <Icon className="nav-item-icon" size={18} />
                            <div className="nav-item-text">
                              <span className="nav-item-label">{item.label}</span>
                              <span className="nav-item-description">{item.description}</span>
                            </div>
                          </div>
                          {isActive && (
                            <div className="nav-item-indicator"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <button className="nav-item" title="Help & Support">
              <HelpCircle className="nav-item-icon" size={16} />
              <span>Help</span>
            </button>
            
            <button className="nav-item" title="Settings">
              <Settings className="nav-item-icon" size={16} />
              <span>Settings</span>
            </button>

            <div className="sidebar-user">
              <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
                <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">John Doe</div>
                  <div className="text-xs text-gray-500 truncate">john@company.com</div>
                </div>
                <button className="text-gray-400 hover:text-gray-600" title="Sign out">
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
