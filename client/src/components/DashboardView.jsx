// client/src/components/DashboardView.jsx
import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingDown,
  TrendingUp,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Calendar,
  DollarSign
} from 'lucide-react';

export default function DashboardView({ dashboard, onNavigate, onApproveCR }) {
  if (!dashboard) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const {
    project,
    evm,
    schedule,
    kpis,
    pendingChangeRequests,
    openCriticalDefects,
    delayedActivities,
    milestones
  } = dashboard;

  const isScopeApproved = project.currentApprovedBudgetPKR > project.baselineBudgerPKR;

  return (
    <div className="space-y-4">
      {/* 1. COMPACT KPI STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Metric 1 */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>APPROVED BUDGET</span>
            <DollarSign className="w-3.5 h-3.5 text-teal-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            PKR {(project.currentApprovedBudgetPKR / 1000000).toFixed(2)}M
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
            <span>Spent: PKR {(evm.AC / 1000000).toFixed(2)}M</span>
            <span className="font-semibold text-slate-700">
              {Math.round((evm.AC / project.currentApprovedBudgetPKR) * 100)}%
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>TIMELINE & PACE</span>
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">
            Week {project.currentWeek} <span className="text-xs font-normal text-slate-400">/ {project.currentDeadlineWeeks} wks</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
            <span>Finish: Wk {schedule.projectForecastEndWeek}</span>
            <span className={`font-semibold ${schedule.isScheduleOverrun ? 'text-amber-600' : 'text-emerald-600'}`}>
              {schedule.isScheduleOverrun ? `+${schedule.projectDelayWeeks}w Delay` : 'On Track'}
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>COST INDEX (CPI)</span>
            {evm.CPI < 1 ? <TrendingDown className="w-3.5 h-3.5 text-rose-500" /> : <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />}
          </div>
          <div className={`text-xl font-bold mt-1 ${evm.CPI < 1 ? 'text-rose-600' : 'text-emerald-600'}`}>
            {evm.CPI}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 truncate">
            {evm.CPI < 1 ? `Overspend: -PKR ${(Math.abs(evm.CV) / 1000).toFixed(0)}k` : 'Spending efficiently'}
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-3.5 rounded-lg border border-slate-200">
          <div className="flex items-center justify-between text-slate-500 text-[11px] font-semibold">
            <span>QUALITY & DEFECTS</span>
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <div className="text-xl font-bold text-rose-600 mt-1">
            {kpis.openCriticalDefectsCount} Critical
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
            <span>Pass Rate: {kpis.qualityPassRate}%</span>
            <span className="text-amber-600 font-semibold">{kpis.highRisksCount} High Risks</span>
          </div>
        </div>
      </div>

      {/* 2. COMPACT SCOPE CHANGE STRIP (Case Study Requirement 4) */}
      <div className={`px-4 py-2.5 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
        isScopeApproved
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
          : 'bg-amber-50/80 border-amber-300 text-amber-900'
      }`}>
        <div className="flex items-center space-x-2 min-w-0">
          {isScopeApproved ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          ) : (
            <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
          )}
          <span className="truncate">
            {isScopeApproved ? (
              <span><strong>Scope Changes Approved:</strong> Budget increased to PKR 5.8M (+800k) & deadline extended to 19w (+3w).</span>
            ) : (
              <span><strong>Case Study Addition:</strong> Hospital management requested AI Diagnosis (+500k, +2w) & Mobile App (+300k, +1w).</span>
            )}
          </span>
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          {!isScopeApproved && (
            <button
              onClick={() => onApproveCR('CR-001')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded font-semibold text-[11px] transition-colors"
            >
              Approve AI Module
            </button>
          )}
          <button
            onClick={() => onNavigate('scope')}
            className="text-slate-700 hover:text-slate-900 font-semibold underline text-[11px]"
          >
            Review Scope
          </button>
        </div>
      </div>

      {/* 3. PERFORMANCE WARNING NOTIFICATION */}
      {(evm.CPI < 1 || evm.SPI < 1) && (
        <div className="p-3 rounded-lg bg-rose-50/60 border border-rose-200 text-xs text-rose-900 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>
              <strong>Threshold Alert:</strong> Cost Performance Index is <strong>{evm.CPI}</strong> (&lt; 1.0) and Schedule Index is <strong>{evm.SPI}</strong> (&lt; 1.0). Forecasted completion cost is <strong>PKR {evm.EAC.toLocaleString()}</strong>.
            </span>
          </div>
          <button
            onClick={() => onNavigate('cost')}
            className="text-rose-700 hover:text-rose-900 font-bold underline text-[11px] flex-shrink-0 ml-3"
          >
            EVM Details
          </button>
        </div>
      )}

      {/* 4. TWO COMPACT CLEAN TABLES: DEFECTS & DELAYED TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Critical Defects Table */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <h3 className="text-xs font-bold text-slate-800">Critical Testing Defects</h3>
            </div>
            <button
              onClick={() => onNavigate('quality')}
              className="text-[11px] text-teal-600 hover:underline font-medium"
            >
              View All ({openCriticalDefects.length})
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {openCriticalDefects.map((d) => (
              <div key={d.id} className="p-3 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono text-[10px] font-bold text-slate-600">{d.id}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                      {d.severity}
                    </span>
                    <span className="text-[11px] text-slate-500">• {d.module}</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    {d.status}
                  </span>
                </div>
                <div className="font-medium text-slate-800 text-[11px] line-clamp-1">{d.title}</div>
                <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Assigned: <strong>{d.assignedTo}</strong></span>
                  <span>Reported: {d.dateReported}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Delayed Activities & Impact */}
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <div className="px-3.5 py-2.5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <h3 className="text-xs font-bold text-slate-800">Delayed Activities & Ripple Effect</h3>
            </div>
            <button
              onClick={() => onNavigate('schedule')}
              className="text-[11px] text-teal-600 hover:underline font-medium"
            >
              Gantt Chart
            </button>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {delayedActivities.map((act) => (
              <div key={act.id} className="p-3 hover:bg-slate-50/60 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="font-mono text-[10px] font-bold text-slate-600">{act.id}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                      +{act.delayWeeks || 2}w Delay
                    </span>
                    <span className="text-[11px] text-slate-500">• WBS {act.wbsCode}</span>
                  </div>
                  <span className="text-[11px] text-slate-600">{act.assignedTo}</span>
                </div>
                <div className="font-medium text-slate-800 text-[11px]">{act.name}</div>
                {act.impactNotes && (
                  <p className="text-[10px] text-amber-900 bg-amber-50 p-1.5 rounded mt-1.5">
                    <strong>Ripple Impact:</strong> {act.impactNotes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. COMPACT MILESTONE PROGRESSION */}
      <div className="bg-white rounded-lg border border-slate-200 p-3.5">
        <div className="flex items-center justify-between mb-2.5 text-xs">
          <span className="font-bold text-slate-800">Project Milestone Progress</span>
          <span className="text-slate-400 text-[11px]">Week 12 of {project.currentDeadlineWeeks}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`p-2 rounded border text-center ${
                m.status === 'Completed'
                  ? 'bg-emerald-50/40 border-emerald-200 text-emerald-900'
                  : m.status === 'Delayed'
                  ? 'bg-rose-50/40 border-rose-200 text-rose-900'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="font-mono text-[10px] text-slate-500 font-bold">{m.id} • Wk {m.targetWeek}</div>
              <div className="font-semibold text-[11px] truncate mt-0.5" title={m.name}>{m.name}</div>
              <div className={`text-[10px] font-bold mt-1 ${
                m.status === 'Completed' ? 'text-emerald-700' :
                m.status === 'Delayed' ? 'text-rose-600' : 'text-slate-500'
              }`}>
                {m.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
