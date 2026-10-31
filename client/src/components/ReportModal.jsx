// client/src/components/ReportModal.jsx
import React from 'react';
import {
  Printer,
  X,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Calendar,
  DollarSign,
  ShieldAlert
} from 'lucide-react';

export default function ReportModal({ dashboard, onClose }) {
  if (!dashboard) return null;

  const { project, evm, schedule, kpis, openCriticalDefects, delayedActivities, pendingChangeRequests } = dashboard;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Toolbar (hidden when printing) */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 no-print">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-teal-600" />
            <h3 className="font-bold text-slate-900 text-sm">Formal Project Status & Monitoring Report</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 bg-teal-600 hover:bg-teal-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="space-y-6 text-slate-800">
          {/* Report Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-widest">{project.id}</span>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{project.title}</h1>
                <p className="text-xs text-slate-600 mt-1 font-medium">{project.client}</p>
              </div>
              <div className="text-right text-xs space-y-0.5">
                <p className="text-slate-500">Report Date: <strong>{new Date().toISOString().split('T')[0]}</strong></p>
                <p className="text-slate-500">Reporting Period: <strong>Week {project.currentWeek}</strong></p>
                <p className="text-slate-500">Project Manager: <strong>{project.projectManager}</strong></p>
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              1. Executive Summary & Health Assessment
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              The Smart Healthcare Project Management System is in <strong>Week {project.currentWeek}</strong>. The project was commissioned with a baseline budget of <strong>PKR {project.baselineBudgerPKR.toLocaleString()}</strong> and a <strong>{project.baselineDeadlineWeeks}-week</strong> duration. Hospital management has requested scope expansions (AI Preliminary Diagnosis and Cross-Platform Mobile App) requiring formal budget adjustment to <strong>PKR {project.currentApprovedBudgetPKR.toLocaleString()}</strong> and timeline extension to <strong>{project.currentDeadlineWeeks} weeks</strong>. System testing has uncovered two critical defects in appointment concurrency and multi-hospital database synchronization currently undergoing remediation.
            </p>
          </div>

          {/* Section 2: EVM Financial & Schedule Indicators */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              2. Earned Value Management (EVM) Performance Indicators
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border border-slate-200">
                <thead className="bg-slate-100 font-bold text-slate-700">
                  <tr>
                    <th className="p-2 border">Indicator</th>
                    <th className="p-2 border">Metric Acronym</th>
                    <th className="p-2 border text-right">Value (PKR / Index)</th>
                    <th className="p-2 border">Status / Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 border font-medium">Planned Value</td>
                    <td className="p-2 border font-mono">PV (BCWS)</td>
                    <td className="p-2 border text-right font-mono">PKR {evm.PV.toLocaleString()}</td>
                    <td className="p-2 border text-slate-600">Scheduled work volume to current date</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Earned Value</td>
                    <td className="p-2 border font-mono text-indigo-700">EV (BCWP)</td>
                    <td className="p-2 border text-right font-mono font-bold text-indigo-700">PKR {evm.EV.toLocaleString()}</td>
                    <td className="p-2 border text-slate-600">Physical work completed ({evm.overallPercentComplete}%)</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Actual Cost</td>
                    <td className="p-2 border font-mono">AC (ACWP)</td>
                    <td className="p-2 border text-right font-mono font-bold">PKR {evm.AC.toLocaleString()}</td>
                    <td className="p-2 border text-slate-600">Actual expenditure to date</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Cost Performance Index</td>
                    <td className="p-2 border font-mono">CPI (EV / AC)</td>
                    <td className={`p-2 border text-right font-mono font-bold ${evm.CPI < 1 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {evm.CPI}
                    </td>
                    <td className="p-2 border text-slate-600">
                      {evm.CPI < 1 ? 'Cost Overrun (Spending > Earned)' : 'Cost Efficient'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Schedule Performance Index</td>
                    <td className="p-2 border font-mono">SPI (EV / PV)</td>
                    <td className={`p-2 border text-right font-mono font-bold ${evm.SPI < 1 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {evm.SPI}
                    </td>
                    <td className="p-2 border text-slate-600">
                      {evm.SPI < 1 ? `Schedule Delay (${(evm.SPI * 100).toFixed(1)}% of planned pace)` : 'On Schedule'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Forecasted Cost at Completion</td>
                    <td className="p-2 border font-mono">EAC (BAC / CPI)</td>
                    <td className="p-2 border text-right font-mono font-bold">PKR {evm.EAC.toLocaleString()}</td>
                    <td className="p-2 border text-slate-600">Projected budget outcome</td>
                  </tr>
                  <tr>
                    <td className="p-2 border font-medium">Variance at Completion</td>
                    <td className="p-2 border font-mono">VAC (BAC - EAC)</td>
                    <td className={`p-2 border text-right font-mono font-bold ${evm.VAC < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {evm.VAC < 0 ? '-' : '+'}PKR {Math.abs(evm.VAC).toLocaleString()}
                    </td>
                    <td className="p-2 border text-slate-600">
                      {evm.VAC < 0 ? 'Projected Overspend' : 'Projected Savings'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Scope Changes */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              3. Scope Baseline & Change Control Board (CCB)
            </h2>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800">CR-001: AI Preliminary Diagnosis Module</span>
                <p className="text-slate-600">Cost Impact: +PKR 500,000 | Schedule: +2 Weeks</p>
                <p className="text-slate-500">Triage emergency patient conditions before OPD appointment booking.</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800">CR-002: Cross-Platform Mobile Application</span>
                <p className="text-slate-600">Cost Impact: +PKR 300,000 | Schedule: +1 Week</p>
                <p className="text-slate-500">iOS and Android native client for patient booking and lab alerts.</p>
              </div>
            </div>
          </div>

          {/* Section 4: Critical Defects & Delayed Activities */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
              4. Critical Quality Defects & Schedule Delays
            </h2>
            <div className="space-y-2 text-xs">
              {openCriticalDefects.map((def) => (
                <div key={def.id} className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="font-mono font-bold text-rose-800 mr-2">{def.id}</span>
                    <strong className="text-slate-900">{def.title}</strong>
                    <span className="text-slate-500 ml-2">({def.module})</span>
                  </div>
                  <span className="font-bold text-rose-700 uppercase text-[10px]">Assigned: {def.assignedTo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stakeholder Sign-Off Block */}
          <div className="pt-6 border-t border-slate-300 grid grid-cols-3 gap-6 text-xs text-center">
            <div className="border-t border-slate-400 pt-2">
              <p className="font-bold text-slate-800">Ahmed Khan (PMP)</p>
              <p className="text-slate-500">Project Manager</p>
            </div>
            <div className="border-t border-slate-400 pt-2">
              <p className="font-bold text-slate-800">Dr. Tariq Mansoor</p>
              <p className="text-slate-500">Hospital Consortium Sponsor</p>
            </div>
            <div className="border-t border-slate-400 pt-2">
              <p className="font-bold text-slate-800">Usman Farooq</p>
              <p className="text-slate-500">Lead QA Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

