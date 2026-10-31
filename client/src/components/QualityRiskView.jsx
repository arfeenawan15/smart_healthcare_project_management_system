// client/src/components/QualityRiskView.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchDefects,
  createDefect,
  updateDefect,
  fetchChecklist,
  updateChecklistItem,
  fetchRisks,
  createRisk,
  fetchPDPC
} from '../api';
import {
  ShieldAlert,
  Plus
} from 'lucide-react';

export default function QualityRiskView({ onRefresh }) {
  const [defects, setDefects] = useState([]);
  const [checklist, setChecklist] = useState([]);
  const [risks, setRisks] = useState([]);
  const [pdpc, setPdpc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('defects'); // 'defects', 'checklist', 'matrix', 'pdpc'

  // Modals
  const [showDefectModal, setShowDefectModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [newDefect, setNewDefect] = useState({
    title: '',
    module: 'Patient Appointments',
    severity: 'Critical',
    assignedTo: 'Ali Raza',
    stepsToReproduce: '',
    impact: '',
    resolutionNotes: ''
  });
  const [newRisk, setNewRisk] = useState({
    description: '',
    category: 'Technical',
    likelihood: 4,
    impact: 4,
    mitigationPlan: '',
    owner: 'Ahmed Khan'
  });

  const loadAll = async () => {
    setLoading(true);
    try {
      const [defRes, checkRes, riskRes, pdpcRes] = await Promise.all([
        fetchDefects(),
        fetchChecklist(),
        fetchRisks(),
        fetchPDPC()
      ]);
      if (defRes.success) setDefects(defRes.defects);
      if (checkRes.success) setChecklist(checkRes.checklist);
      if (riskRes.success) setRisks(riskRes.risks);
      if (pdpcRes.success) setPdpc(pdpcRes.pdpc);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleUpdateDefectStatus = async (id, status) => {
    try {
      await updateDefect(id, { status });
      await loadAll();
      if (onRefresh) onRefresh();
    } catch (err) {
      alert("Error updating defect: " + err.message);
    }
  };

  const handleToggleChecklist = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Pass' ? 'Fail' : currentStatus === 'Fail' ? 'Pending' : 'Pass';
    try {
      await updateChecklistItem(id, { inspectionStatus: nextStatus });
      await loadAll();
      if (onRefresh) onRefresh();
    } catch (err) {
      alert("Error updating checklist item: " + err.message);
    }
  };

  const handleCreateDefect = async (e) => {
    e.preventDefault();
    try {
      const res = await createDefect(newDefect);
      if (res.success) {
        setShowDefectModal(false);
        setNewDefect({
          title: '',
          module: 'Patient Appointments',
          severity: 'Critical',
          assignedTo: 'Ali Raza',
          stepsToReproduce: '',
          impact: '',
          resolutionNotes: ''
        });
        await loadAll();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      alert("Error creating defect: " + err.message);
    }
  };

  const handleCreateRisk = async (e) => {
    e.preventDefault();
    try {
      const res = await createRisk(newRisk);
      if (res.success) {
        setShowRiskModal(false);
        setNewRisk({
          description: '',
          category: 'Technical',
          likelihood: 4,
          impact: 4,
          mitigationPlan: '',
          owner: 'Ahmed Khan'
        });
        await loadAll();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      alert("Error logging risk: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Subnav Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex space-x-1 bg-slate-200/80 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('defects')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'defects' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Defect Tracking ({defects.length})
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'checklist' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quality Checklist ({checklist.length})
          </button>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'matrix' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            5x5 Risk Matrix ({risks.length})
          </button>
          <button
            onClick={() => setActiveTab('pdpc')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'pdpc' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            PDPC Chart ({pdpc.length})
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'defects' && (
            <button
              onClick={() => setShowDefectModal(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 rounded text-xs font-semibold shadow-xs flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Defect</span>
            </button>
          )}
          {activeTab === 'matrix' && (
            <button
              onClick={() => setShowRiskModal(true)}
              className="bg-slate-800 hover:bg-slate-900 text-white px-2.5 py-1 rounded text-xs font-semibold shadow-xs flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Risk</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. DEFECT TRACKING TAB (Compact Table) */}
      {activeTab === 'defects' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Defect ID</th>
                <th className="py-2.5 px-3">Defect Summary</th>
                <th className="py-2.5 px-3">Module</th>
                <th className="py-2.5 px-3 text-center">Severity</th>
                <th className="py-2.5 px-3">Assigned To</th>
                <th className="py-2.5 px-3">Resolution Plan</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {defects.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-600">{d.id}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-900">{d.title}</span>
                    <p className="text-[10px] text-slate-500 line-clamp-1">{d.stepsToReproduce}</p>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{d.module}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold uppercase ${
                      d.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                      d.severity === 'Major' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {d.severity}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 font-medium">{d.assignedTo}</td>
                  <td className="py-2.5 px-3 text-slate-600 max-w-xs text-[11px] truncate">
                    {d.resolutionNotes || "Under investigation"}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <select
                      value={d.status}
                      onChange={(e) => handleUpdateDefectStatus(d.id, e.target.value)}
                      className={`text-xs font-semibold px-1.5 py-0.5 rounded border outline-none cursor-pointer ${
                        d.status === 'Resolved' || d.status === 'Closed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : d.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-800 border-blue-300'
                          : 'bg-amber-50 text-amber-800 border-amber-300'
                      }`}
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. QUALITY CHECKLIST TAB (Compact Table) */}
      {activeTab === 'checklist' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs">
          <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-800">
            <span>Deliverables Quality Inspection Checklist</span>
            <span className="text-[11px] font-normal text-slate-500">Click status to cycle Pass / Fail / Pending</span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-600 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2 px-3">Item Code</th>
                <th className="py-2 px-3">Deliverable</th>
                <th className="py-2 px-3">Acceptance Criteria</th>
                <th className="py-2 px-3 text-center">Status</th>
                <th className="py-2 px-3">Linked Defect</th>
                <th className="py-2 px-3">QA Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {checklist.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60">
                  <td className="py-2 px-3 font-mono font-bold text-slate-600">{item.itemCode}</td>
                  <td className="py-2 px-3 font-semibold text-slate-800">{item.deliverable}</td>
                  <td className="py-2 px-3 text-slate-600 text-[11px] max-w-xs">{item.criteria}</td>
                  <td className="py-2 px-3 text-center">
                    <button
                      onClick={() => handleToggleChecklist(item.id, item.inspectionStatus)}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                        item.inspectionStatus === 'Pass'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                          : item.inspectionStatus === 'Fail'
                          ? 'bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-200'
                          : 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
                      }`}
                    >
                      {item.inspectionStatus}
                    </button>
                  </td>
                  <td className="py-2 px-3 font-mono text-[11px]">
                    {item.linkedDefectId ? (
                      <span className="text-rose-600 font-bold bg-rose-50 px-1 py-0.2 rounded border border-rose-200">
                        {item.linkedDefectId}
                      </span>
                    ) : (
                      <span className="text-slate-400">None</span>
                    )}
                  </td>
                  <td className="py-2 px-3 text-slate-500 text-[11px]">{item.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. 5x5 RISK PRIORITIZATION MATRIX (Compact Grid & Table) */}
      {activeTab === 'matrix' && (
        <div className="space-y-3 text-xs">
          {/* Top: Compact 5x5 Grid */}
          <div className="bg-white rounded-lg border border-slate-200 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">5x5 Risk Matrix Layout (Likelihood × Impact)</span>
              <div className="flex items-center space-x-3 text-[10px]">
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded bg-rose-500"></span>
                  <span>High (15-25)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-400"></span>
                  <span>Medium (8-14)</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-400"></span>
                  <span>Low (1-7)</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center pt-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                ▲ Likelihood (1 - 5)
              </div>
              <div className="grid grid-cols-5 gap-1.5 w-full max-w-md">
                {[5, 4, 3, 2, 1].map((L) =>
                  [1, 2, 3, 4, 5].map((I) => {
                    const score = L * I;
                    const cellRisks = risks.filter(r => Number(r.likelihood) === L && Number(r.impact) === I);
                    let cellBg = "bg-emerald-50 border-emerald-200 text-emerald-900";
                    if (score >= 15) cellBg = "bg-rose-100 border-rose-300 text-rose-900 font-bold";
                    else if (score >= 8) cellBg = "bg-amber-100 border-amber-300 text-amber-900 font-bold";

                    return (
                      <div
                        key={`${L}-${I}`}
                        className={`h-10 rounded border p-1 flex flex-col justify-between ${cellBg}`}
                        title={`L:${L}, I:${I} (Score: ${score})`}
                      >
                        <div className="flex justify-between text-[9px] opacity-60">
                          <span>{L}x{I}</span>
                          <span>{score}</span>
                        </div>
                        <div className="flex flex-wrap gap-0.5">
                          {cellRisks.map((r) => (
                            <span
                              key={r.id}
                              className="px-1 py-0.2 rounded text-[9px] font-mono font-bold bg-white shadow-xs border border-slate-300"
                              title={`${r.riskId}: ${r.description}`}
                            >
                              {r.riskId}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Impact (1 - 5) ▶
              </div>
            </div>
          </div>

          {/* Bottom: Compact Risk Table */}
          <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                <tr>
                  <th className="py-2 px-3">Risk ID</th>
                  <th className="py-2 px-3">Description</th>
                  <th className="py-2 px-3 text-center">L</th>
                  <th className="py-2 px-3 text-center">I</th>
                  <th className="py-2 px-3 text-center">Score</th>
                  <th className="py-2 px-3 text-center">Severity</th>
                  <th className="py-2 px-3">Mitigation Action</th>
                  <th className="py-2 px-3">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {risks.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/60">
                    <td className="py-2 px-3 font-mono font-bold text-slate-700">{r.riskId}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{r.description}</td>
                    <td className="py-2 px-3 text-center font-mono">{r.likelihood}</td>
                    <td className="py-2 px-3 text-center font-mono">{r.impact}</td>
                    <td className="py-2 px-3 text-center font-mono font-bold text-slate-900">{r.score}</td>
                    <td className="py-2 px-3 text-center">
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                        r.severity === 'High' ? 'bg-rose-100 text-rose-800' :
                        r.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {r.severity}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-600 text-[11px] max-w-xs">{r.mitigationPlan}</td>
                    <td className="py-2 px-3 text-slate-700 text-[11px]">{r.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. PROCESS DECISION PROGRAM CHART (PDPC Table) */}
      {activeTab === 'pdpc' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs">
          <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
            Process Decision Program Chart (Goals → Obstacles → Preventive Actions → Contingencies)
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-600 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Phase / Goal</th>
                <th className="py-2 px-3 text-rose-800">Potential Obstacle / Failure</th>
                <th className="py-2 px-3 text-teal-800">Preventive Action</th>
                <th className="py-2 px-3 text-amber-800">Contingency Plan</th>
                <th className="py-2 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pdpc.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-600">{item.id}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-900 block">{item.step}</span>
                    <span className="text-[11px] text-slate-500">{item.goal}</span>
                  </td>
                  <td className="py-2.5 px-3 text-rose-900 text-[11px] max-w-xs">{item.potentialProblem}</td>
                  <td className="py-2.5 px-3 text-teal-900 text-[11px] max-w-xs">{item.preventiveAction}</td>
                  <td className="py-2.5 px-3 text-amber-900 text-[11px] max-w-xs">{item.contingencyPlan}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {item.feasibility}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Log Defect */}
      {showDefectModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-4 shadow-lg space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Log Software Defect</h3>
            <form onSubmit={handleCreateDefect} className="space-y-2.5">
              <div>
                <label className="block font-medium text-slate-700 mb-0.5">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Appointment slot deadlock"
                  value={newDefect.title}
                  onChange={(e) => setNewDefect({ ...newDefect, title: e.target.value })}
                  className="w-full border border-slate-300 rounded p-1.5 outline-none focus:border-rose-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-0.5">Module</label>
                  <select
                    value={newDefect.module}
                    onChange={(e) => setNewDefect({ ...newDefect, module: e.target.value })}
                    className="w-full border border-slate-300 rounded p-1.5 outline-none"
                  >
                    <option value="Patient Appointments">Patient Appointments</option>
                    <option value="Patient Records & Sync">Patient Records & Sync</option>
                    <option value="Laboratory Reports">Laboratory Reports</option>
                    <option value="Hospital Billing">Hospital Billing</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-0.5">Severity</label>
                  <select
                    value={newDefect.severity}
                    onChange={(e) => setNewDefect({ ...newDefect, severity: e.target.value })}
                    className="w-full border border-slate-300 rounded p-1.5 outline-none font-bold"
                  >
                    <option value="Critical">Critical</option>
                    <option value="Major">Major</option>
                    <option value="Minor">Minor</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-0.5">Assigned To</label>
                <input
                  type="text"
                  required
                  value={newDefect.assignedTo}
                  onChange={(e) => setNewDefect({ ...newDefect, assignedTo: e.target.value })}
                  className="w-full border border-slate-300 rounded p-1.5 outline-none"
                />
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-0.5">Steps to Reproduce</label>
                <textarea
                  rows="2"
                  value={newDefect.stepsToReproduce}
                  onChange={(e) => setNewDefect({ ...newDefect, stepsToReproduce: e.target.value })}
                  className="w-full border border-slate-300 rounded p-1.5 outline-none"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDefectModal(false)}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-3 py-1 rounded font-semibold"
                >
                  Save Defect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Log Risk */}
      {showRiskModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-4 shadow-lg space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Log Project Risk</h3>
            <form onSubmit={handleCreateRisk} className="space-y-2.5">
              <div>
                <label className="block font-medium text-slate-700 mb-0.5">Description</label>
                <textarea
                  rows="2"
                  required
                  value={newRisk.description}
                  onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                  className="w-full border border-slate-300 rounded p-1.5 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-0.5">Likelihood (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    required
                    value={newRisk.likelihood}
                    onChange={(e) => setNewRisk({ ...newRisk, likelihood: e.target.value })}
                    className="w-full border border-slate-300 rounded p-1.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-0.5">Impact (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    required
                    value={newRisk.impact}
                    onChange={(e) => setNewRisk({ ...newRisk, impact: e.target.value })}
                    className="w-full border border-slate-300 rounded p-1.5 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-0.5">Mitigation Action</label>
                <textarea
                  rows="2"
                  value={newRisk.mitigationPlan}
                  onChange={(e) => setNewRisk({ ...newRisk, mitigationPlan: e.target.value })}
                  className="w-full border border-slate-300 rounded p-1.5 outline-none"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRiskModal(false)}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1 rounded font-semibold"
                >
                  Save Risk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
