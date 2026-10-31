// client/src/components/Navbar.jsx
import React from 'react';
import {
  Activity,
  Layers,
  Calendar,
  DollarSign,
  ShieldAlert,
  FileText,
  RotateCcw,
  Sparkles,
  Building2,
  Clock
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, dashboard, onReset, onQuickApproveCR, onOpenReport }) {
  const currentBudget = dashboard?.project?.currentApprovedBudgetPKR || 5000000;
  const deadlineWeeks = dashboard?.project?.currentDeadlineWeeks || 16;
  const currentWeek = dashboard?.project?.currentWeek || 12;
  const pendingCRCount = dashboard?.kpis?.pendingChangeRequestsCount || 0;

  const tabs = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: Activity, badge: null },
    { id: 'initiation', label: '1. Initiation & Charter', icon: Building2, badge: null },
    { id: 'scope', label: '2. Scope & WBS', icon: Layers, badge: pendingCRCount > 0 ? `${pendingCRCount} CR` : null },
    { id: 'schedule', label: '3. Schedule & Gantt', icon: Calendar, badge: dashboard?.kpis?.delayedActivitiesCount > 0 ? `${dashboard.kpis.delayedActivitiesCount} Delayed` : null },
    { id: 'cost', label: '4. Cost & EVM', icon: DollarSign, badge: dashboard?.kpis?.cpi < 1 ? 'CPI < 1' : null },
    { id: 'quality', label: '5. Quality & Risks', icon: ShieldAlert, badge: dashboard?.kpis?.openCriticalDefectsCount > 0 ? `${dashboard.kpis.openCriticalDefectsCount} Critical` : null },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm no-print">
      {/* Top hospital consortium header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-bold text-slate-900 tracking-tight">Smart Healthcare SPM System</h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                  5 Hospitals Network
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Central • City General • St. Jude • Apex Health • Metro Clinic
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-4 bg-slate-50 px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs">
              <div className="flex items-center space-x-1.5 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Week <strong>{currentWeek}</strong> of <strong>{deadlineWeeks}</strong></span>
              </div>
              <div className="h-4 w-px bg-slate-300" />
              <div>
                <span className="text-slate-500">Budget: </span>
                <span className="font-bold text-slate-800">PKR {currentBudget.toLocaleString()}</span>
              </div>
            </div>

            {pendingCRCount > 0 && (
              <button
                onClick={onQuickApproveCR}
                title="Demonstrate Case Study Scope Change: Approves AI Diagnosis (+500k, +2w) and Mobile App (+300k, +1w)"
                className="hidden sm:inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apply Scope Change (+800k)</span>
              </button>
            )}

            <button
              onClick={onOpenReport}
              className="inline-flex items-center space-x-1.5 bg-slate-800 text-white hover:bg-slate-900 px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Project Report</span>
            </button>

            <button
              onClick={onReset}
              title="Reset data back to initial 16-week, PKR 5.0M Case Study state"
              className="inline-flex items-center space-x-1 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>
        </div>

        {/* Tab navigation for the 6 modules */}
        <nav className="flex space-x-1 overflow-x-auto py-2 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : tab.badge.includes('Critical') || tab.badge.includes('CPI')
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

