import React, { useEffect, useMemo, useState } from 'react';
import { RefreshCw, Download, FileText, Sliders, Activity } from 'lucide-react';
import mockData from '../data/mockData';
import { formatCurrency, formatNumber, formatPercentage } from '../data/dataUtils';

/**
 * PUBLIC_INTERFACE
 * ScenarioPlanner
 * Interactive scenario planning tool that updates constraints and outcomes by scenario.
 * Features:
 * - Selectable scenario cards
 * - Channel allocation sliders
 * - Real-time mocked simulation
 * - Export CSV and Generate Report actions
 */
function ScenarioPlanner() {
  const initialScenarios = useMemo(() => ([
    {
      id: 'balanced',
      name: 'Balanced Growth',
      description: 'Even allocation with moderate risk',
      allocations: { Search: 35, Social: 30, Video: 15, Display: 15, Affiliate: 5 },
      efficiency: { Search: 1.0, Social: 0.9, Video: 0.85, Display: 0.7, Affiliate: 0.6 }, // conversions/$
    },
    {
      id: 'aggressive',
      name: 'Aggressive Growth',
      description: 'Maximize growth with higher spend on top channels',
      allocations: { Search: 45, Social: 30, Video: 15, Display: 8, Affiliate: 2 },
      efficiency: { Search: 0.95, Social: 0.92, Video: 0.9, Display: 0.72, Affiliate: 0.55 },
    },
    {
      id: 'cost_saver',
      name: 'Cost Saver',
      description: 'Efficiency-first spend with lower risk',
      allocations: { Search: 40, Social: 20, Video: 10, Display: 15, Affiliate: 15 },
      efficiency: { Search: 1.05, Social: 0.85, Video: 0.8, Display: 0.75, Affiliate: 0.7 },
    },
  ]), []);

  const [selectedScenario, setSelectedScenario] = useState(initialScenarios[0]);
  const [allocations, setAllocations] = useState({ ...initialScenarios[0].allocations });
  const [live, setLive] = useState(true);
  const [noiseTick, setNoiseTick] = useState(0);

  // PUBLIC_INTERFACE
  /** Derived totals */
  const totalBudget = useMemo(() => mockData.dashboardSummary.totalSpend / 30, []); // daily approx
  const channels = useMemo(() => Object.keys(allocations), [allocations]);

  // PUBLIC_INTERFACE
  /** Update allocations when scenario changes. */
  useEffect(() => {
    setAllocations({ ...selectedScenario.allocations });
  }, [selectedScenario]);

  // PUBLIC_INTERFACE
  /** Mocked live updates: add small noise over time if live is enabled. */
  useEffect(() => {
    if (!live) return;
    const t = setInterval(() => setNoiseTick((n) => n + 1), 2500);
    return () => clearInterval(t);
  }, [live]);

  // PUBLIC_INTERFACE
  /** Normalize sliders to sum 100%. */
  const normalize = (obj) => {
    const sum = Object.values(obj).reduce((a, b) => a + b, 0) || 1;
    const out = {};
    Object.keys(obj).forEach((k) => { out[k] = Math.max(0, Math.round((obj[k] / sum) * 100)); });
    // Fix rounding drift
    const diff = 100 - Object.values(out).reduce((a, b) => a + b, 0);
    if (diff !== 0) {
      const firstKey = Object.keys(out)[0];
      out[firstKey] = Math.max(0, out[firstKey] + diff);
    }
    return out;
  };

  // PUBLIC_INTERFACE
  /** Handle slider change and re-normalize. */
  const updateAllocation = (channel, value) => {
    const next = { ...allocations, [channel]: Number(value) };
    setAllocations(normalize(next));
  };

  // PUBLIC_INTERFACE
  /** Compute outcomes using simple efficiency factors + noise. */
  const outcomes = useMemo(() => {
    const eff = selectedScenario.efficiency;
    let conversions = 0;
    let revenue = 0;
    let spend = 0;
    const rows = channels.map((ch, idx) => {
      const pct = allocations[ch] / 100;
      const chSpend = totalBudget * pct;
      const n = Math.sin((noiseTick + idx) * 0.7) * 0.02; // ±2% noise
      const chConv = chSpend * (eff[ch] ?? 0.8) * (1 + n);
      const chRev = chConv * 75 * (1 + n * 0.5); // avg order value ~ $75
      conversions += chConv;
      revenue += chRev;
      spend += chSpend;
      return {
        channel: ch,
        pct: allocations[ch],
        spend: chSpend,
        conversions: chConv,
        revenue: chRev,
      };
    });
    const roas = spend > 0 ? revenue / spend : 0;
    return {
      rows,
      totals: {
        spend, conversions, revenue, roas
      }
    };
  }, [allocations, channels, selectedScenario, totalBudget, noiseTick]);

  // PUBLIC_INTERFACE
  /** Export CSV for current scenario outcomes. */
  const exportCSV = () => {
    const headers = ['Channel', 'Allocation %', 'Spend', 'Conversions', 'Revenue'];
    const lines = outcomes.rows.map(r =>
      [r.channel, r.pct, Math.round(r.spend), Math.round(r.conversions), Math.round(r.revenue)].join(',')
    );
    const csv = [headers.join(','), ...lines, '', `Totals,,${Math.round(outcomes.totals.spend)},${Math.round(outcomes.totals.conversions)},${Math.round(outcomes.totals.revenue)}`].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${selectedScenario.name.replace(/\s+/g, '_')}_scenario.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // PUBLIC_INTERFACE
  /** Simulated report generation. */
  const generateReport = () => {
    alert(`Generating report for scenario: ${selectedScenario.name}`);
  };

  // PUBLIC_INTERFACE
  /** Refresh allocations back to scenario defaults. */
  const refreshData = () => {
    setAllocations({ ...selectedScenario.allocations });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initialScenarios.map((sc) => (
          <button
            key={sc.id}
            className={`p-4 border-2 rounded-lg text-left transition-all ${selectedScenario.id === sc.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => setSelectedScenario(sc)}
            aria-pressed={selectedScenario.id === sc.id}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sliders className="text-blue-600" size={18} />
              <h4 className="font-semibold">{sc.name}</h4>
            </div>
            <p className="text-sm text-gray-600">{sc.description}</p>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div>
            <h3 className="card-title">Scenario Constraints</h3>
            <p className="card-subtitle">Adjust channel allocations; values automatically normalize to 100%</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="button button-secondary" onClick={refreshData} title="Refresh">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="button button-secondary" onClick={exportCSV} title="Export CSV">
              <Download size={16} />
              Export
            </button>
            <button className="button button-primary" onClick={generateReport} title="Generate Report">
              <FileText size={16} />
              Generate Report
            </button>
          </div>
        </div>

        <div className="card-content">
          <div className="flex items-center gap-2 mb-4">
            <label className="text-sm text-gray-600 flex items-center gap-2">
              <input type="checkbox" checked={live} onChange={(e) => setLive(e.target.checked)} />
              Real-time simulation
            </label>
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Activity size={14} className={live ? 'text-blue-600' : 'text-gray-400'} /> {live ? 'Live updating' : 'Paused'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sliders */}
            <div className="space-y-4">
              {channels.map((ch) => (
                <div key={ch} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">{ch}</div>
                    <div className="font-mono">{allocations[ch]}%</div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={allocations[ch]}
                    onChange={(e) => updateAllocation(ch, e.target.value)}
                    className="w-full"
                    aria-label={`${ch} allocation`}
                  />
                </div>
              ))}
              <div className="text-sm text-gray-600">
                Total: <span className="font-mono font-semibold">{Object.values(allocations).reduce((a, b) => a + b, 0)}%</span>
              </div>
            </div>

            {/* Outcomes */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="metric-card">
                  <div className="metric-label">Projected Spend (Daily)</div>
                  <div className="metric-value">{formatCurrency(outcomes.totals.spend)}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Projected Revenue</div>
                  <div className="metric-value">{formatCurrency(outcomes.totals.revenue)}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Projected Conversions</div>
                  <div className="metric-value">{formatNumber(Math.round(outcomes.totals.conversions))}</div>
                </div>
                <div className="metric-card">
                  <div className="metric-label">Projected ROAS</div>
                  <div className="metric-value">{outcomes.totals.roas.toFixed(2)}x</div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Channel</th>
                      <th className="text-right">Allocation</th>
                      <th className="text-right">Spend</th>
                      <th className="text-right">Conversions</th>
                      <th className="text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outcomes.rows.map((r) => (
                      <tr key={r.channel}>
                        <td>{r.channel}</td>
                        <td className="text-right font-mono">{r.pct}%</td>
                        <td className="text-right font-mono">{formatCurrency(r.spend)}</td>
                        <td className="text-right font-mono">{formatNumber(Math.round(r.conversions))}</td>
                        <td className="text-right font-mono">{formatCurrency(r.revenue)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-xs text-gray-500">
                Note: Outcomes are simulated based on historical efficiency and live noise for demo purposes.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScenarioPlanner;
