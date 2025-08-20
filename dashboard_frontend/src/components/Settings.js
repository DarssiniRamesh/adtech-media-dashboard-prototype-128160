import React, { useState } from 'react';

// PUBLIC_INTERFACE
function Settings() {
  /** Settings view with placeholder preferences to demonstrate layout. */
  const [darkMode, setDarkMode] = useState(false);
  const [emailReports, setEmailReports] = useState(true);
  const [compactTables, setCompactTables] = useState(false);

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">Settings</div>
            <div className="card-subtitle">Customize your dashboard experience</div>
          </div>
        </div>
        <div className="card-content">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="text-base font-medium">Dark Mode</div>
                <div className="text-sm text-secondary">Placeholder toggle for theme preference</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                  aria-label="Toggle dark mode"
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="text-base font-medium">Email Weekly Reports</div>
                <div className="text-sm text-secondary">Receive summary reports via email</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={emailReports}
                  onChange={(e) => setEmailReports(e.target.checked)}
                  aria-label="Toggle weekly email reports"
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="text-base font-medium">Compact Table Rows</div>
                <div className="text-sm text-secondary">Reduce row padding in tables</div>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={compactTables}
                  onChange={(e) => setCompactTables(e.target.checked)}
                  aria-label="Toggle compact table rows"
                />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="text-xs text-muted">
              Note: These toggles are placeholders for demonstration. In a real application, they would persist to user
              settings and affect the UI globally.
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Simple toggle switch styles (scoped to this component) */
        .switch {
          position: relative;
          display: inline-block;
          width: 46px;
          height: 24px;
        }
        .switch input { display: none; }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: #e5e7eb;
          transition: .2s;
          border-radius: 9999px;
          border: 1px solid #d1d5db;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 2px;
          background-color: white;
          transition: .2s;
          border-radius: 9999px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        input:checked + .slider {
          background-color: var(--primary-blue);
          border-color: var(--primary-blue);
        }
        input:checked + .slider:before {
          transform: translateX(22px);
        }
      `}</style>
    </div>
  );
}

export default Settings;
