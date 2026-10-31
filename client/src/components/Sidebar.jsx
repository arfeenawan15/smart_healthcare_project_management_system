// client/src/components/Sidebar.jsx
import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Layers,
  Calendar,
  DollarSign,
  ShieldAlert,
  FileText,
  RotateCcw,
  Sparkles,
  Activity,
  Hospital,
  AlertCircle
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  dashboard,
  onReset,
  onQuickApproveCR,
  onOpenReport
}) {
  const currentBudget = dashboard?.project?.currentApprovedBudgetPKR || 5000000;
  const deadlineWeeks = dashboard?.project?.currentDeadlineWeeks || 16;
  const currentWeek = dashboard?.project?.currentWeek || 12;
  const pendingCRCount = dashboard?.kpis?.pendingChangeRequestsCount || 0;
  const criticalDefects = dashboard?.kpis?.openCriticalDefectsCount || 0;
  const cpi = dashboard?.kpis?.cpi ?? 0.88;
  const isDelayed = dashboard?.kpis?.delayedActivitiesCount > 0;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Executive Dashboard',
      subtitle: 'Overview & Health KPIs',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'initiation',
      label: '1. Project Charter',
      subtitle: 'Objectives, RACI & Plan',
      icon: Building2,
      badge: null
    },
    {
      id: 'scope',
      label: '2. Scope & WBS',
      subtitle: 'Work Packages & Changes',
      icon: Layers,
      badge: pendingCRCount > 0 ? `${pendingCRCount} CR` : null,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'schedule',
      label: '3. Schedule & Gantt',
      subtitle: 'Activities, Timeline & Delay',
      icon: Calendar,
      badge: isDelayed ? 'Delayed' : null,
      badgeColor: 'bg-rose-100 text-rose-700'
    },
    {
      id: 'cost',
      label: '4. Cost & EVM',
      subtitle: 'EVM Indices, CPI & SPI',
      icon: DollarSign,
      badge: cpi < 1 ? `CPI ${cpi}` : null,
      badgeColor: 'bg-rose-100 text-rose-700'
    },
    {
      id: 'quality',
      label: '5. Quality & Risks',
      subtitle: 'Defects, 5x5 Matrix & PDPC',
      icon: ShieldAlert,
      badge: criticalDefects > 0 ? `${criticalDefects} Defect` : null,
      badgeColor: 'bg-rose-100 text-rose-700'
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col flex-shrink-0 min-h-screen border-r border-slate-800 select-none no-print">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
            <Activity className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <h1 className="text-xs font-bold text-white tracking-tight leading-tight">
              Smart Healthcare SPM
            </h1>
            <p className="text-[10px] text-teal-400 font-medium">5 Hospitals Network</p>
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Project Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-all ${
                isActive
                  ? 'bg-teal-600 text-white font-semibold shadow-md shadow-teal-900/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
              }`}
            >
              <div className="flex items-center space-x-3 min-w-0">
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <div className="truncate">
                  <div className="text-xs leading-tight font-medium">{item.label}</div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-teal-100' : 'text-slate-400'}`}>
                    {item.subtitle}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                    isActive ? 'bg-white/20 text-white' : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-2">
          <button
            onClick={onOpenReport}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-left text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all border border-slate-700/60"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-xs font-medium">Print Status Report</div>
              <div className="text-[10px] text-slate-400">Formal Stakeholder PDF</div>
            </div>
          </button>
        </div>
      </nav>

      {/* Case Study Status & Demonstration Box */}
      <div className="p-3 border-t border-slate-800 space-y-2.5 bg-slate-900/80">
        {/* Project Baseline Pills */}
        <div className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between text-slate-400">
            <span>Project Timeline:</span>
            <span className="font-bold text-white">Wk {currentWeek} / {deadlineWeeks} wks</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Approved Budget:</span>
            <span className="font-bold text-teal-400">PKR {currentBudget.toLocaleString()}</span>
          </div>
        </div>

        {/* Demo Scope Change Trigger */}
        {pendingCRCount > 0 ? (
          <button
            onClick={onQuickApproveCR}
            title="Approve Hospital Management's AI Diagnosis & Mobile App Requests (+PKR 800,000, +3 weeks)"
            className="w-full flex items-center justify-center space-x-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-2 px-3 rounded-xl text-xs shadow-md transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Approve Scope Change (+800k)</span>
          </button>
        ) : (
          <div className="bg-teal-950/60 border border-teal-800/60 p-2 rounded-xl text-[11px] text-teal-300 flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span>Scope Change Approved (19w / 5.8M)</span>
          </div>
        )}

        {/* Reset Database Button */}
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center space-x-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 py-1.5 px-3 rounded-lg text-xs transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Baseline (16w, 5.0M)</span>
        </button>
      </div>
    </aside>
  );
}

