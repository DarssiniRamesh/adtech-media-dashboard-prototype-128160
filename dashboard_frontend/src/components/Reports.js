import React, { useState } from 'react';
import { Download, FileText, BarChart3, PieChart, TrendingUp } from 'lucide-react';
import mockData from '../data/mockData';
import { formatCurrency } from '../data/dataUtils';

// PUBLIC_INTERFACE
function Reports() {
  const [selectedReport, setSelectedReport] = useState('performance');
  const [dateRange, setDateRange] = useState('30d');
  const { dashboardSummary, campaigns, platformBreakdown } = mockData;

  const reportTypes = [
    {
      id: 'performance',
      name: 'Performance Report',
      description: 'Comprehensive campaign performance analysis',
      icon: BarChart3
    },
    {
      id: 'platform',
      name: 'Platform Analysis',
      description: 'Platform-specific performance breakdown',
      icon: PieChart
    },
    {
      id: 'campaign',
      name: 'Campaign Deep Dive',
      description: 'Detailed individual campaign analysis',
      icon: TrendingUp
    },
    {
      id: 'executive',
      name: 'Executive Summary',
      description: 'High-level overview for stakeholders',
      icon: FileText
    }
  ];

  const dateRanges = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last 90 days' },
    { id: 'custom', label: 'Custom range' }
  ];

  // PUBLIC_INTERFACE
  const generateReport = () => {
    // In a real app, this would trigger report generation
    alert(`Generating ${reportTypes.find(r => r.id === selectedReport)?.name} for ${dateRanges.find(d => d.id === dateRange)?.label}`);
  };

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Generate Report</h3>
            <p className="card-subtitle">Create custom reports for your campaigns</p>
          </div>
        </div>
        
        <div className="card-content">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <div
                  key={report.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedReport === report.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedReport(report.id)}
                >
                  <Icon className="w-8 h-8 text-blue-600 mb-2" />
                  <h4 className="font-semibold text-gray-900">{report.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Range
              </label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dateRanges.map((range) => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <button 
              onClick={generateReport}
              className="button button-primary"
            >
              <Download size={16} />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats for Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Campaign Summary</h3>
              <p className="card-subtitle">Overview of all campaigns</p>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Campaigns:</span>
                <span className="font-semibold">{campaigns.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Campaigns:</span>
                <span className="font-semibold text-green-600">
                  {campaigns.filter(c => c.status === 'active').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Spend:</span>
                <span className="font-semibold font-mono">
                  {formatCurrency(dashboardSummary.totalSpend)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Revenue:</span>
                <span className="font-semibold font-mono text-green-600">
                  {formatCurrency(dashboardSummary.totalRevenue)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Platform Distribution</h3>
              <p className="card-subtitle">Spend by platform</p>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              {platformBreakdown.slice(0, 4).map((platform, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{platform.platform}</span>
                  <div className="text-right">
                    <div className="font-semibold font-mono">
                      {formatCurrency(platform.spend)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {((platform.spend / dashboardSummary.totalSpend) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <h3 className="card-title">Performance Metrics</h3>
              <p className="card-subtitle">Key performance indicators</p>
            </div>
          </div>
          <div className="card-content">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Avg CTR:</span>
                <span className="font-semibold font-mono">
                  {dashboardSummary.avgCTR.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg CPC:</span>
                <span className="font-semibold font-mono">
                  {formatCurrency(dashboardSummary.avgCPC)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Conv. Rate:</span>
                <span className="font-semibold font-mono">
                  {dashboardSummary.conversionRate.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ROAS:</span>
                <span className="font-semibold font-mono text-green-600">
                  {dashboardSummary.ROAS.toFixed(2)}x
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Recent Reports</h3>
            <p className="card-subtitle">Previously generated reports</p>
          </div>
        </div>
        <div className="card-content">
          <div className="space-y-3">
            {[
              { name: 'Monthly Performance Report - January 2024', date: '2024-01-15', size: '2.4 MB' },
              { name: 'Platform Analysis - Q4 2023', date: '2024-01-10', size: '1.8 MB' },
              { name: 'Campaign Deep Dive - Holiday Campaign', date: '2024-01-05', size: '3.1 MB' },
              { name: 'Executive Summary - December 2023', date: '2024-01-01', size: '0.9 MB' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">{report.name}</div>
                    <div className="text-sm text-gray-500">
                      Generated on {new Date(report.date).toLocaleDateString()} • {report.size}
                    </div>
                  </div>
                </div>
                <button className="button button-small button-secondary">
                  <Download size={14} />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
