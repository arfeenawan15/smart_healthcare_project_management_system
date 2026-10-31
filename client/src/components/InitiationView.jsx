// client/src/components/InitiationView.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchCharter,
  updateMilestone
} from '../api';
import {
  Building2,
  Users,
  Target,
  CheckCircle2,
  CheckSquare,
  AlertCircle
} from 'lucide-react';

export default function InitiationView({ onRefresh }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('charter'); // 'charter', 'plan', 'raci', 'closure'

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchCharter();
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMilestoneStatus = async (id, newStatus) => {
    try {
      await updateMilestone(id, { status: newStatus });
      await loadData();
      if (onRefresh) onRefresh();
    } catch (err) {
      alert("Error updating milestone: " + err.message);
    }
  };

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const { charter } = data;

  return (
    <div className="space-y-4">
      {/* Subnav Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex space-x-1 bg-slate-200/80 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveSection('charter')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeSection === 'charter' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Project Charter
          </button>
          <button
            onClick={() => setActiveSection('plan')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeSection === 'plan' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Management Plan
          </button>
          <button
            onClick={() => setActiveSection('raci')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeSection === 'raci' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            RACI Matrix
          </button>
          <button
            onClick={() => setActiveSection('closure')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeSection === 'closure' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Project Closure
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          SHP-2026 • 5 Hospitals Consortium
        </div>
      </div>

      {/* 1. PROJECT CHARTER */}
      {activeSection === 'charter' && (
        <div className="space-y-4 text-xs">
          {/* Key Parameters Table */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
              Project Charter Overview
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 p-2">
              <div className="p-2.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Project Code & Title</span>
                <span className="font-bold text-slate-900">{charter.projectId}</span>
                <span className="text-[11px] text-slate-500 block truncate">{charter.title}</span>
              </div>
              <div className="p-2.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Approved Budget</span>
                <span className="font-bold text-teal-700">PKR {charter.currentApprovedBudgetPKR.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block">(Baseline: 5.0M)</span>
              </div>
              <div className="p-2.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Approved Duration</span>
                <span className="font-bold text-slate-900">{charter.currentDeadlineWeeks} Weeks</span>
                <span className="text-[10px] text-slate-400 block">(Baseline: 16 Wks)</span>
              </div>
              <div className="p-2.5">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Sponsor & PM</span>
                <span className="font-bold text-slate-900 truncate block">{charter.projectManager}</span>
                <span className="text-[10px] text-slate-500 truncate block">{charter.sponsor}</span>
              </div>
            </div>
          </div>

          {/* Objectives & Scope Boundaries Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Objectives */}
            <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2">
              <span className="font-bold text-slate-800 block text-xs">Project Objectives</span>
              <ul className="space-y-1.5 text-slate-600">
                {charter.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Scope Boundaries */}
            <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-3">
              <div>
                <span className="font-bold text-emerald-800 block text-[11px] uppercase tracking-wider">
                  In-Scope Deliverables
                </span>
                <ul className="space-y-1 text-slate-600 mt-1">
                  {charter.scopeBoundaries.inScope.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="font-bold text-rose-800 block text-[11px] uppercase tracking-wider">
                  Out-of-Scope Boundaries
                </span>
                <ul className="space-y-1 text-slate-600 mt-1">
                  {charter.scopeBoundaries.outOfScope.map((item, i) => (
                    <li key={i} className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Stakeholders Table */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
              Key Stakeholder Register
            </div>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/50 text-slate-600 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Designation</th>
                  <th className="py-2 px-3 text-center">Interest</th>
                  <th className="py-2 px-3 text-center">Influence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {charter.stakeholders.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-2 px-3 font-semibold text-slate-800">{s.name}</td>
                    <td className="py-2 px-3 text-slate-600">{s.role}</td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {s.interest}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-center">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800">
                        {s.influence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. PROJECT MANAGEMENT PLAN */}
      {activeSection === 'plan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500"></span>
              <span>Scope Management Plan</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">{charter.managementPlan.scopeManagement}</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span>Schedule Management Plan</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">{charter.managementPlan.scheduleManagement}</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span>Cost Management Plan</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">{charter.managementPlan.costManagement}</p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-1.5">
            <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>Quality Management Plan</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">{charter.managementPlan.qualityManagement}</p>
          </div>
        </div>
      )}

      {/* 3. RACI MATRIX */}
      {activeSection === 'raci' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="font-bold text-slate-800">Responsibility Assignment Matrix (RACI)</span>
            <span className="text-[11px] text-slate-500">R: Responsible • A: Accountable • C: Consulted • I: Informed</span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-600 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2 px-3">Project Deliverable</th>
                <th className="py-2 px-3 text-center">PM (Ahmed)</th>
                <th className="py-2 px-3 text-center">Backend (Ali/Bilal)</th>
                <th className="py-2 px-3 text-center">Frontend (Sara/Zainab)</th>
                <th className="py-2 px-3 text-center">Database (Hamza)</th>
                <th className="py-2 px-3 text-center">QA (Usman)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {charter.raciMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-2 px-3 font-semibold text-slate-800">{row.deliverable}</td>
                  {['pm', 'backend', 'frontend', 'db', 'qa'].map((role) => {
                    const val = row[role];
                    const badgeClass =
                      val === 'Accountable' ? 'bg-purple-100 text-purple-800 font-bold' :
                      val === 'Responsible' ? 'bg-teal-100 text-teal-800 font-bold' :
                      val === 'Consulted' ? 'bg-amber-50 text-amber-800' :
                      'bg-slate-100 text-slate-600';
                    return (
                      <td key={role} className="py-2 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${badgeClass}`}>
                          {val}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 4. PROJECT CLOSURE */}
      {activeSection === 'closure' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-1">
            <span className="font-bold text-slate-800 block">Deliverables Acceptance Protocol</span>
            <p className="text-slate-600 leading-relaxed">{charter.closurePlan.deliverablesAcceptance}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-1">
            <span className="font-bold text-slate-800 block">Financial & Budget Audit</span>
            <p className="text-slate-600 leading-relaxed">{charter.closurePlan.financialAudit}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-1">
            <span className="font-bold text-slate-800 block">Lessons Learned Review</span>
            <p className="text-slate-600 leading-relaxed">{charter.closurePlan.lessonsLearned}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-1">
            <span className="font-bold text-slate-800 block">Knowledge Transfer Plan</span>
            <p className="text-slate-600 leading-relaxed">{charter.closurePlan.knowledgeTransfer}</p>
          </div>
        </div>
      )}
    </div>
  );
}
