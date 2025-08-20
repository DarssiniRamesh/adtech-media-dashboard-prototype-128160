import React, { useState } from 'react';
import './App.css';

// Import components (we'll create these)
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import Analytics from './components/Analytics';
import Campaigns from './components/Campaigns';
import Reports from './components/Reports';
import Audiences from './components/Audiences';
import Geography from './components/Geography';
import Devices from './components/Devices';
import Creatives from './components/Creatives';

// PUBLIC_INTERFACE
function App() {
  const [currentView, setCurrentView] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // PUBLIC_INTERFACE
  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardOverview />;
      case 'analytics':
        return <Analytics />;
      case 'campaigns':
        return <Campaigns />;
      case 'reports':
        return <Reports />;
      case 'audiences':
        return <Audiences />;
      case 'geography':
        return <Geography />;
      case 'devices':
        return <Devices />;
      case 'creatives':
        return <Creatives />;
      default:
        return <DashboardOverview />;
    }
  };

  // PUBLIC_INTERFACE
  const getViewTitle = () => {
    switch (currentView) {
      case 'overview':
        return 'Dashboard Overview';
      case 'analytics':
        return 'Analytics';
      case 'campaigns':
        return 'Campaigns';
      case 'reports':
        return 'Reports';
      case 'audiences':
        return 'Audience Insights';
      case 'geography':
        return 'Geographic Performance';
      case 'devices':
        return 'Device Analytics';
      case 'creatives':
        return 'Creative Performance';
      default:
        return 'Dashboard Overview';
    }
  };

  // PUBLIC_INTERFACE
  const getViewSubtitle = () => {
    switch (currentView) {
      case 'overview':
        return 'Media performance insights and key metrics at a glance';
      case 'analytics':
        return 'Detailed performance analytics and trends';
      case 'campaigns':
        return 'Campaign management and optimization';
      case 'reports':
        return 'Generate and view detailed reports';
      case 'audiences':
        return 'Audience segmentation and demographic analysis';
      case 'geography':
        return 'Geographic performance breakdown and insights';
      case 'devices':
        return 'Device-specific performance metrics and trends';
      case 'creatives':
        return 'Creative asset performance and optimization';
      default:
        return 'Media performance insights and key metrics at a glance';
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="main-content">
        <Header 
          title={getViewTitle()}
          subtitle={getViewSubtitle()}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="dashboard-content">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
}

export default App;
