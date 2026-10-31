// client/src/components/ScopeView.jsx
import React, { useState, useEffect } from 'react';
import {
  fetchRequirements,
  createRequirement,
  fetchWBS,
  fetchChangeRequests,
  createChangeRequest,
  approveChangeRequest,
  rejectChangeRequest
} from '../api';
import {
  Layers,
  Plus,
  Check,
  XCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function ScopeView({ onRefresh }) {
  const [requirements, setRequirements] = useState([]);
  const [wbsList, setWbsList] = useState([]);
  const [changeRequests, setChangeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requirements'); // 'requirements', 'wbs', 'changes'

  // Modals
  const [showReqModal, setShowReqModal] = useState(false);
  const [showCRModal, setShowCRModal] = useState(false);
  const [newReq, setNewReq] = useState({ title: '', category: 'Core Clinic', priority: 'High', description: '', estimatedCostPKR: 500000, estimatedWeeks: 2 });
  const [newCR, setNewCR] = useState({ title: '', requestedBy: 'Hospital Management', justification: '', costImpactPKR: 400000, scheduleImpactWeeks: 1, scopeDetails: '' });

  const loadAll = async () => {
    setLoading(true);
    try {
      const [reqRes, wbsRes, crRes] = await Promise.all([
        fetchRequirements(),
        fetchWBS(),
        fetchChangeRequests()
      ]);
      if (reqRes.success) setRequirements(reqRes.requirements);
      if (wbsRes.success) setWbsList(wbsRes.wbs);
      if (crRes.success) setChangeRequests(crRes.changeRequests);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleApproveCR = async (id) => {
    try {
      const res = await approveChangeRequest(id);
      if (res.success) {
        alert(res.message);
        await loadAll();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      alert("Error approving CR: " + err.message);
    }
  };

  const handleRejectCR = async (id) => {
    const reason = prompt("Enter reason for rejecting this Change Request:");
    if (!reason) return;
    try {
      const res = await rejectChangeRequest(id, reason);
      if (res.success) {
        alert(res.message);
        await loadAll();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      alert("Error rejecting CR: " + err.message);
    }
  };

  const handleCreateRequirement = async (e) => {
    e.preventDefault();
    try {
      const res = await createRequirement(newReq);
      if (res.success) {
        setShowReqModal(false);
        setNewReq({ title: '', category: 'Core Clinic', priority: 'High', description: '', estimatedCostPKR: 500000, estimatedWeeks: 2 });
        await loadAll();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      alert("Error adding requirement: " + err.message);
    }
  };

  const handleCreateCR = async (e) => {
    e.preventDefault();
    try {
      const res = await createChangeRequest(newCR);
      if (res.success) {
        setShowCRModal(false);
        setNewCR({ title: '', requestedBy: 'Hospital Management', justification: '', costImpactPKR: 400000, scheduleImpactWeeks: 1, scopeDetails: '' });
        await loadAll();
        if (onRefresh) onRefresh();
      }
    } catch (err) {
      alert("Error logging CR: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const deliverables = wbsList.filter(item => item.type === "Deliverable");

  return (
    <div className="space-y-4">
      {/* Subnav Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2.5">
        <div className="flex space-x-1 bg-slate-200/80 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('requirements')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'requirements' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Requirements Register ({requirements.length})
          </button>
          <button
            onClick={() => setActiveTab('wbs')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'wbs' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            WBS Hierarchy ({wbsList.length})
          </button>
          <button
            onClick={() => setActiveTab('changes')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              activeTab === 'changes' ? 'bg-white text-teal-800 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Change Requests ({changeRequests.length})
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Scope Containment Enforced
        </div>
      </div>

      {/* Scope Containment Notice */}
      <div className="bg-sky-50 border border-sky-200 rounded-lg px-3.5 py-2 text-sky-900 text-xs flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0" />
          <span>
            <strong>Scope Rule:</strong> Unapproved requirements (e.g. AI Diagnosis & Mobile App) are isolated from approved scope until approved by CCB.
          </span>
        </div>
        {activeTab === 'requirements' && (
          <button
            onClick={() => setShowReqModal(true)}
            className="inline-flex items-center space-x-1 bg-teal-600 hover:bg-teal-700 text-white px-2.5 py-1 rounded text-xs font-semibold shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Requirement</span>
          </button>
        )}
        {activeTab === 'changes' && (
          <button
            onClick={() => setShowCRModal(true)}
            className="inline-flex items-center space-x-1 bg-slate-800 hover:bg-slate-900 text-white px-2.5 py-1 rounded text-xs font-semibold shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit CR</span>
          </button>
        )}
      </div>

      {/* 1. REQUIREMENTS TAB (Compact Table) */}
      {activeTab === 'requirements' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Req ID</th>
                <th className="py-2.5 px-3">Requirement Title</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3 text-center">Priority</th>
                <th className="py-2.5 px-3 text-right">Est. Budget</th>
                <th className="py-2.5 px-3 text-center">Est. Duration</th>
                <th className="py-2.5 px-3 text-center">Scope Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requirements.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-600">{req.id}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-900">{req.title}</span>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{req.description}</p>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{req.category}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      req.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {req.priority}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-700">
                    PKR {req.estimatedCostPKR.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-center text-slate-600">
                    {req.estimatedWeeks}w
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      req.inApprovedScope
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.inApprovedScope ? 'Approved Scope' : 'Pending CR Approval'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 2. WBS HIERARCHY TAB (Compact Indented Tree) */}
      {activeTab === 'wbs' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs">
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-800">
            <span>Work Breakdown Structure (Deliverables & Work Packages)</span>
            <span className="text-[11px] font-normal text-slate-500">{wbsList.length} WBS Nodes</span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-600 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2 px-3">WBS Code</th>
                <th className="py-2 px-3">Deliverable / Work Package Name</th>
                <th className="py-2 px-3">Level / Type</th>
                <th className="py-2 px-3 text-right">Allocated Budget</th>
                <th className="py-2 px-3 text-center">Progress</th>
                <th className="py-2 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliverables.map((del) => {
                const children = wbsList.filter(item => item.parentCode === del.code);
                return (
                  <React.Fragment key={del.id}>
                    {/* Level 1 Deliverable Row */}
                    <tr className="bg-slate-50/80 font-bold text-slate-900 border-t border-slate-200">
                      <td className="py-2 px-3 font-mono text-teal-700">{del.code}</td>
                      <td className="py-2 px-3">{del.name}</td>
                      <td className="py-2 px-3 text-[11px] text-slate-500 font-semibold">Deliverable (L1)</td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                        PKR {del.budgetPKR.toLocaleString()}
                      </td>
                      <td className="py-2 px-3 text-center font-mono">{del.progress}%</td>
                      <td className="py-2 px-3 text-center">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-teal-100 text-teal-800">
                          {del.status}
                        </span>
                      </td>
                    </tr>

                    {/* Child Work Packages */}
                    {children.map((pkg) => (
                      <tr key={pkg.id} className="hover:bg-slate-50/60 text-slate-700">
                        <td className="py-1.5 px-3 font-mono text-slate-500 pl-6">↳ {pkg.code}</td>
                        <td className="py-1.5 px-3 pl-6 font-medium text-slate-800">{pkg.name}</td>
                        <td className="py-1.5 px-3 text-[11px] text-slate-400">Work Package (L2)</td>
                        <td className="py-1.5 px-3 text-right font-mono text-slate-600">
                          PKR {pkg.budgetPKR.toLocaleString()}
                        </td>
                        <td className="py-1.5 px-3 text-center">
                          <div className="flex items-center justify-center space-x-1.5">
                            <span className="font-mono text-[10px]">{pkg.progress}%</span>
                            <div className="w-14 bg-slate-200 rounded-full h-1">
                              <div className="bg-teal-600 h-1 rounded-full" style={{ width: `${pkg.progress}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-1.5 px-3 text-center">
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                            pkg.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                            pkg.status === 'Defects Found' || pkg.status === 'Delayed' ? 'bg-rose-100 text-rose-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {pkg.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 3. CHANGE REQUESTS TAB (Compact Table) */}
      {activeTab === 'changes' && (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden text-xs">
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center justify-between font-bold text-slate-800">
            <span>Change Requests (Scope, Cost & Schedule Impact)</span>
            <span className="text-[11px] font-normal text-slate-500">Change Control Board</span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-slate-50/50 text-slate-600 border-b border-slate-200 font-semibold">
              <tr>
                <th className="py-2 px-3">CR ID</th>
                <th className="py-2 px-3">Title & Justification</th>
                <th className="py-2 px-3">Requested By</th>
                <th className="py-2 px-3 text-right">Cost Impact</th>
                <th className="py-2 px-3 text-center">Schedule Impact</th>
                <th className="py-2 px-3 text-center">Status</th>
                <th className="py-2 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {changeRequests.map((cr) => (
                <tr key={cr.id} className="hover:bg-slate-50/60">
                  <td className="py-2.5 px-3 font-mono font-bold text-slate-600">{cr.id}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-semibold text-slate-900">{cr.title}</span>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{cr.justification}</p>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{cr.requestedBy}</td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-700">
                    +PKR {cr.costImpactPKR.toLocaleString()}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-amber-700">
                    +{cr.scheduleImpactWeeks} Weeks
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      cr.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      cr.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {cr.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    {cr.status === 'Pending' ? (
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => handleApproveCR(cr.id)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-2 py-1 rounded text-[11px] font-bold shadow-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectCR(cr.id)}
                          className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-2 py-1 rounded text-[11px] font-semibold"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-400">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal: Add Requirement */}
      {showReqModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-4 shadow-lg space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Add Project Requirement</h3>
            <form onSubmit={handleCreateRequirement} className="space-y-2.5">
              <div>
                <label className="block font-medium text-slate-700 mb-0.5">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bed Management System"
                  value={newReq.title}
                  onChange={(e) => setNewReq({ ...newReq, title: e.target.value })}
                  className="w-full border border-slate-300 rounded p-1.5 outline-none focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-0.5">Category</label>
                  <select
                    value={newReq.category}
                    onChange={(e) => setNewReq({ ...newReq, category: e.target.value })}
                    className="w-full border border-slate-300 rounded p-1.5 outline-none"
                  >
                    <option value="Core Clinic">Core Clinic</option>
                    <option value="Laboratory">Laboratory</option>
                    <option value="Finance">Finance</option>
                    <option value="Telehealth">Telehealth</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-0.5">Priority</label>
                  <select
                    value={newReq.priority}
                    onChange={(e) => setNewReq({ ...newReq, priority: e.target.value })}
                    className="w-full border border-slate-300 rounded p-1.5 outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-0.5">Est. Cost (PKR)</label>
                <input
                  type="number"
                  step="50000"
                  value={newReq.estimatedCostPKR}
                  onChange={(e) => setNewReq({ ...newReq, estimatedCostPKR: e.target.value })}
                  className="w-full border border-slate-300 rounded p-1.5 outline-none"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowReqModal(false)}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Submit Change Request */}
      {showCRModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-4 shadow-lg space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Submit Change Request</h3>
            <form onSubmit={handleCreateCR} className="space-y-2.5">
              <div>
                <label className="block font-medium text-slate-700 mb-0.5">CR Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pharmacy Barcode Scanning"
                  value={newCR.title}
                  onChange={(e) => setNewCR({ ...newCR, title: e.target.value })}
                  className="w-full border border-slate-300 rounded p-1.5 outline-none focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-medium text-slate-700 mb-0.5">Cost Impact (PKR)</label>
                  <input
                    type="number"
                    step="50000"
                    required
                    value={newCR.costImpactPKR}
                    onChange={(e) => setNewCR({ ...newCR, costImpactPKR: e.target.value })}
                    className="w-full border border-slate-300 rounded p-1.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-0.5">Duration (Weeks)</label>
                  <input
                    type="number"
                    step="1"
                    required
                    value={newCR.scheduleImpactWeeks}
                    onChange={(e) => setNewCR({ ...newCR, scheduleImpactWeeks: e.target.value })}
                    className="w-full border border-slate-300 rounded p-1.5 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-slate-700 mb-0.5">Justification</label>
                <textarea
                  rows="2"
                  required
                  value={newCR.justification}
                  onChange={(e) => setNewCR({ ...newCR, justification: e.target.value })}
                  className="w-full border border-slate-300 rounded p-1.5 outline-none"
                />
              </div>
              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCRModal(false)}
                  className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-slate-800 hover:bg-slate-900 text-white px-3 py-1 rounded font-semibold"
                >
                  Submit CR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
