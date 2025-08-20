import React, { useState } from 'react';
import './App.css';

// Import components (we'll create these)
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import Analytics from './components/Analytics';
import Campaigns from './components/Campaigns';
import Reports from './components/Reports';

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
