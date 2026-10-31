// client/src/components/TopHeader.jsx
import React from 'react';
import {
  Clock,
  DollarSign,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function TopHeader({
  activeTab,
  dashboard,
  onOpenReport,
  onQuickApproveCR
}) {
  const currentBudget = dashboard?.project?.currentApprovedBudgetPKR || 5000000;
  const deadlineWeeks = dashboard?.project?.currentDeadlineWeeks || 16;
  const currentWeek = dashboard?.project?.currentWeek || 12;
  const pendingCRCount = dashboard?.kpis?.pendingChangeRequestsCount || 0;
  const cpi = dashboard?.kpis?.cpi ?? 0.88;
  const spi = dashboard?.kpis?.spi ?? 0.83;

  const titles = {
    dashboard: {
      title: 'Executive Project Dashboard',
      subtitle: 'Real-time performance, EVM indicators, and critical issue alerts'
    },
    initiation: {
      title: 'Module 1: Project Initiation & Integration',
      subtitle: 'Project Charter, Scope Boundaries, Management Plan & RACI Matrix'
    },
    scope: {
      title: 'Module 2: Scope Management & WBS',
      subtitle: 'Requirements Traceability, Work Packages & Change Control Board'
    },
    schedule: {
      title: 'Module 3: Schedule & Resource Management',
      subtitle: 'Activity Precedence, Delay Ripple Effect & Interactive Gantt Timeline'
    },
    cost: {
      title: 'Module 4: Cost Management & Earned Value (EVM)',
      subtitle: 'Programmatic EVM Indicators (PV, EV, AC, CPI, SPI) & Threshold Alerts'
    },
    quality: {
      title: 'Module 5: Quality Management & Risk Control',
      subtitle: 'Defect Tracking, Quality Checklists, 5x5 Risk Matrix & PDPC Strategy'
    }
  };

  const currentInfo = titles[activeTab] || titles.dashboard;

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 shadow-xs no-print">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: Section Title */}
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">{currentInfo.title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{currentInfo.subtitle}</p>
        </div>

        {/* Right: Clean Key Indicators */}
        <div className="flex items-center space-x-2.5 text-xs">
          {/* Week Badge */}
          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Week <strong className="text-slate-900">{currentWeek}</strong> of {deadlineWeeks}</span>
          </div>

          {/* Budget Badge */}
          <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700">
            <DollarSign className="w-3.5 h-3.5 text-slate-400" />
            <span>Budget: <strong className="text-slate-900">PKR {(currentBudget / 1000000).toFixed(1)}M</strong></span>
          </div>

          {/* EVM CPI Badge */}
          <div className={`px-2.5 py-1.5 rounded-lg border font-semibold ${
            cpi < 1 ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            CPI: {cpi}
          </div>

          {/* Print Report Button */}
          <button
            onClick={onOpenReport}
            className="inline-flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-900 text-white px-3 py-1.5 rounded-lg font-medium shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Status Report</span>
          </button>
        </div>
      </div>
    </header>
  );
}

