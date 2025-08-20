import React from 'react';

// PUBLIC_INTERFACE
function Help() {
  /** Help & Support view providing basic guidance and placeholders. */
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Help & Support</div>
            <div className="card-subtitle">Get tips on how to use the dashboard and where to find common actions</div>
          </div>
        </div>
        <div className="card-content">
          <div className="space-y-4">
            <p className="text-base text-secondary">
              This demo dashboard helps visualize media buying performance. Use the sidebar to switch between Overview,
              Analytics, Campaigns, and other sections. The header controls allow you to change time ranges, refresh data,
              and export views.
            </p>
            <ul className="space-y-2">
              <li>• Use the Overview to quickly scan key KPIs and trends.</li>
              <li>• Analytics includes charts for channels, platforms, and model fit.</li>
              <li>• Campaigns shows a sortable table with current performance.</li>
              <li>• Reports provides access to summarized outputs.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <div className="card-title">Usage Tips</div>
          </div>
          <div className="card-content">
            <ul className="space-y-2">
              <li>• Collapse sidebar sections to focus on what you need.</li>
              <li>• Hover over chart elements to see precise values.</li>
              <li>• Use the time range selector in the header to filter data.</li>
              <li>• The sidebar is scrollable if it overflows, even if the scrollbar is hidden.</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Keyboard Shortcuts</div>
          </div>
          <div className="card-content">
            <ul className="space-y-2">
              <li>• Esc: Close the sidebar on mobile.</li>
              <li>• Use Tab/Shift+Tab to navigate interactive elements.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">Contact Support</div>
        </div>
        <div className="card-content">
          <p className="text-base text-secondary">
            For product questions or demo feedback, contact your AdTech representative or send an email to
            support@example.com.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Help;
