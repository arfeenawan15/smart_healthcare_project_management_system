// client/src/api.js
import initialData from './initialData';

const API_BASE = '/api';

// Helper: localStorage database for static deployments (e.g. GitHub Pages)
const STORAGE_KEY = 'spm_smart_healthcare_db';

function getLocalDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  saveLocalDB(initialData);
  return JSON.parse(JSON.stringify(initialData));
}

function saveLocalDB(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

function calcEVM(data) {
  const currentWeek = data.projectCharter.currentWeek || 12;
  const BAC = data.projectCharter.currentApprovedBudgetPKR;
  const activities = data.activities || [];

  let PV = 0, EV = 0, AC = 0;
  activities.forEach(act => {
    const plannedCost = act.plannedCostPKR || 0;
    const actualCost = act.actualCostPKR || 0;
    const progress = (act.progress || 0) / 100;

    if (act.endWeek <= currentWeek) {
      PV += plannedCost;
    } else if (act.startWeek <= currentWeek) {
      const scheduledDuration = Math.max(1, act.endWeek - act.startWeek + 1);
      const elapsed = currentWeek - act.startWeek + 1;
      const plannedPercent = Math.min(1, Math.max(0, elapsed / scheduledDuration));
      PV += Math.round(plannedCost * plannedPercent);
    }
    EV += Math.round(plannedCost * progress);
    AC += actualCost;
  });

  const CV = EV - AC;
  const SV = EV - PV;
  const CPI = AC > 0 ? parseFloat((EV / AC).toFixed(3)) : 1.0;
  const SPI = PV > 0 ? parseFloat((EV / PV).toFixed(3)) : 1.0;
  const EAC = CPI > 0 ? Math.round(BAC / CPI) : BAC;
  const ETC = Math.max(0, EAC - AC);
  const VAC = BAC - EAC;

  const warnings = [];
  if (CPI < 1.0) {
    warnings.push({
      type: "COST_OVERRUN",
      severity: "CRITICAL",
      title: "Cost Overrun Detected (CPI < 1.0)",
      message: `Project Cost Performance Index is ${CPI} (under 1.0). For every PKR 1.00 spent, only PKR ${CPI.toFixed(2)} worth of value is earned. Forecasted completion cost is PKR ${EAC.toLocaleString()}, exceeding budget by PKR ${Math.abs(VAC).toLocaleString()}.`
    });
  }
  if (SPI < 1.0) {
    warnings.push({
      type: "SCHEDULE_DELAY",
      severity: "WARNING",
      title: "Schedule Delay Detected (SPI < 1.0)",
      message: `Project Schedule Performance Index is ${SPI} (under 1.0). Progress is running at ${(SPI * 100).toFixed(1)}% of planned velocity.`
    });
  }

  return {
    currentWeek,
    BAC,
    PV,
    EV,
    AC,
    CV,
    SV,
    CPI,
    SPI,
    EAC,
    ETC,
    VAC,
    overallPercentComplete: BAC > 0 ? Math.min(100, Math.round((EV / BAC) * 100)) : 0,
    warnings
  };
}

function calcSchedule(data) {
  const activities = JSON.parse(JSON.stringify(data.activities || []));
  const deadlineWeeks = data.projectCharter.currentDeadlineWeeks;
  const actMap = {};
  activities.forEach(a => { actMap[a.id] = a; });

  let maxEndWeek = 0;
  let delayedActivitiesCount = 0;

  activities.forEach(act => {
    let requiredStart = act.startWeek;
    if (act.dependencies && act.dependencies.length > 0) {
      act.dependencies.forEach(depId => {
        const dep = actMap[depId];
        if (dep) {
          const depEnd = dep.endWeek + (dep.delayWeeks || 0);
          if (depEnd >= requiredStart) {
            requiredStart = depEnd + 1;
          }
        }
      });
    }

    const effectiveDelay = act.isDelayed ? (act.delayWeeks || 0) : 0;
    const computedEndWeek = requiredStart + act.durationWeeks - 1 + effectiveDelay;
    act.calculatedStartWeek = requiredStart;
    act.calculatedEndWeek = computedEndWeek;

    if (act.isDelayed || computedEndWeek > act.endWeek) {
      delayedActivitiesCount++;
    }
    if (computedEndWeek > maxEndWeek) {
      maxEndWeek = computedEndWeek;
    }
  });

  return {
    activities,
    deadlineWeeks,
    projectForecastEndWeek: maxEndWeek,
    isScheduleOverrun: maxEndWeek > deadlineWeeks,
    projectDelayWeeks: Math.max(0, maxEndWeek - deadlineWeeks),
    delayedActivitiesCount
  };
}

// ----------------------------------------------------
// API Methods with automatic LocalStorage Fallback
// ----------------------------------------------------

export async function fetchDashboard() {
  try {
    const res = await fetch(`${API_BASE}/dashboard`);
    if (res.ok) return await res.json();
  } catch (e) {}

  // Fallback
  const db = getLocalDB();
  const evm = calcEVM(db);
  const schedule = calcSchedule(db);
  const pendingCRs = (db.changeRequests || []).filter(c => c.status === "Pending");
  const approvedCRs = (db.changeRequests || []).filter(c => c.status === "Approved");
  const openCriticalDefects = (db.defects || []).filter(d => d.severity === "Critical" && d.status !== "Closed" && d.status !== "Resolved");
  const delayedActivities = (db.activities || []).filter(a => a.isDelayed || a.status === "Delayed");
  const passedChecklist = (db.qualityChecklist || []).filter(q => q.inspectionStatus === "Pass").length;
  const totalChecklist = (db.qualityChecklist || []).length;

  return {
    success: true,
    project: db.projectCharter,
    evm,
    schedule,
    kpis: {
      overallProgress: evm.overallPercentComplete,
      cpi: evm.CPI,
      spi: evm.SPI,
      budgetAtCompletion: evm.BAC,
      actualSpent: evm.AC,
      forecastedCostEAC: evm.EAC,
      varianceAtCompletion: evm.VAC,
      deadlineWeeks: schedule.deadlineWeeks,
      forecastCompletionWeeks: schedule.projectForecastEndWeek,
      pendingChangeRequestsCount: pendingCRs.length,
      approvedChangeRequestsCount: approvedCRs.length,
      openCriticalDefectsCount: openCriticalDefects.length,
      delayedActivitiesCount: delayedActivities.length,
      qualityPassRate: totalChecklist > 0 ? Math.round((passedChecklist / totalChecklist) * 100) : 0,
      highRisksCount: (db.risks || []).filter(r => (r.likelihood * r.impact) >= 15).length
    },
    criticalAlerts: evm.warnings,
    pendingChangeRequests: pendingCRs,
    openCriticalDefects,
    delayedActivities,
    milestones: db.projectCharter.milestones || []
  };
}

export async function resetDatabase() {
  try {
    const res = await fetch(`${API_BASE}/dashboard/reset`, { method: 'POST' });
    if (res.ok) return await res.json();
  } catch (e) {}

  saveLocalDB(initialData);
  return {
    success: true,
    message: "Database reset to initial Case Study baseline (16 weeks, PKR 5,000,000 budget)."
  };
}

export async function fetchCharter() {
  try {
    const res = await fetch(`${API_BASE}/charter`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  return { success: true, charter: db.projectCharter, team: db.team };
}

export async function updateMilestone(id, data) {
  try {
    const res = await fetch(`${API_BASE}/charter/milestones/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const m = (db.projectCharter.milestones || []).find(item => item.id === id);
  if (m) Object.assign(m, data);
  saveLocalDB(db);
  return { success: true, milestone: m };
}

export async function fetchRequirements() {
  try {
    const res = await fetch(`${API_BASE}/scope/requirements`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  return { success: true, requirements: db.requirements || [] };
}

export async function createRequirement(data) {
  try {
    const res = await fetch(`${API_BASE}/scope/requirements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const newReq = {
    id: `REQ-00${(db.requirements.length + 1)}`,
    ...data,
    status: "Pending",
    inApprovedScope: false
  };
  db.requirements.push(newReq);
  saveLocalDB(db);
  return { success: true, requirement: newReq };
}

export async function fetchWBS() {
  try {
    const res = await fetch(`${API_BASE}/scope/wbs`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  return { success: true, wbs: db.wbs || [] };
}

export async function fetchChangeRequests() {
  try {
    const res = await fetch(`${API_BASE}/scope/change-requests`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  return { success: true, changeRequests: db.changeRequests || [] };
}

export async function createChangeRequest(data) {
  try {
    const res = await fetch(`${API_BASE}/scope/change-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const newCR = {
    id: `CR-00${(db.changeRequests.length + 1)}`,
    ...data,
    dateRequested: new Date().toISOString().split('T')[0],
    status: "Pending"
  };
  db.changeRequests.push(newCR);
  saveLocalDB(db);
  return { success: true, changeRequest: newCR };
}

export async function approveChangeRequest(id) {
  try {
    const res = await fetch(`${API_BASE}/scope/change-requests/${id}/approve`, { method: 'POST' });
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const cr = (db.changeRequests || []).find(c => c.id === id);
  if (cr && cr.status !== "Approved") {
    cr.status = "Approved";
    cr.approvalDate = new Date().toISOString().split('T')[0];
    db.projectCharter.currentApprovedBudgetPKR += cr.costImpactPKR;
    db.projectCharter.currentDeadlineWeeks += cr.scheduleImpactWeeks;

    if (cr.id === "CR-001") {
      const r = db.requirements.find(req => req.id === "REQ-007");
      if (r) { r.status = "Approved"; r.inApprovedScope = true; }
      if (!db.wbs.some(w => w.code === "6.0")) {
        db.wbs.push({ id: "WBS-6.0", code: "6.0", name: "AI Preliminary Diagnosis Module", parentCode: null, type: "Deliverable", budgetPKR: 500000, progress: 10, status: "In Progress" });
        db.wbs.push({ id: "WBS-6.1", code: "6.1", name: "NLP Symptom Classifier", parentCode: "6.0", type: "Work Package", budgetPKR: 500000, progress: 15, status: "In Progress" });
      }
      if (!db.activities.some(a => a.id === "ACT-11")) {
        db.activities.push({ id: "ACT-11", wbsCode: "6.1", name: "AI Symptom Diagnostic Engine Development", assignedTo: "Ali Raza", role: "Backend Developer", durationWeeks: 2, startWeek: 12, endWeek: 14, dependencies: ["ACT-04"], status: "In Progress", progress: 20, plannedCostPKR: 500000, actualCostPKR: 120000, isDelayed: false, delayWeeks: 0 });
      }
    }
    if (cr.id === "CR-002") {
      const r = db.requirements.find(req => req.id === "REQ-008");
      if (r) { r.status = "Approved"; r.inApprovedScope = true; }
      if (!db.wbs.some(w => w.code === "7.0")) {
        db.wbs.push({ id: "WBS-7.0", code: "7.0", name: "Cross-Platform Mobile App", parentCode: null, type: "Deliverable", budgetPKR: 300000, progress: 10, status: "In Progress" });
      }
      if (!db.activities.some(a => a.id === "ACT-12")) {
        db.activities.push({ id: "ACT-12", wbsCode: "7.0", name: "Mobile App Frontends (iOS/Android)", assignedTo: "Sara Ahmed", role: "Frontend Developer", durationWeeks: 1, startWeek: 13, endWeek: 14, dependencies: ["ACT-06"], status: "In Progress", progress: 15, plannedCostPKR: 300000, actualCostPKR: 80000, isDelayed: false, delayWeeks: 0 });
      }
    }
    saveLocalDB(db);
  }
  return {
    success: true,
    message: `Change Request ${id} approved! Budget increased to PKR ${db.projectCharter.currentApprovedBudgetPKR.toLocaleString()} and deadline extended to ${db.projectCharter.currentDeadlineWeeks} weeks.`
  };
}

export async function rejectChangeRequest(id, reason) {
  try {
    const res = await fetch(`${API_BASE}/scope/change-requests/${id}/reject`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason })
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const cr = (db.changeRequests || []).find(c => c.id === id);
  if (cr) { cr.status = "Rejected"; cr.rejectionReason = reason; }
  saveLocalDB(db);
  return { success: true, message: `Change Request ${id} rejected.` };
}

export async function fetchActivities() {
  try {
    const res = await fetch(`${API_BASE}/schedule/activities`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const sched = calcSchedule(db);
  return { success: true, ...sched };
}

export async function updateActivity(id, data) {
  try {
    const res = await fetch(`${API_BASE}/schedule/activities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const a = (db.activities || []).find(item => item.id === id);
  if (a) Object.assign(a, data);
  saveLocalDB(db);
  return { success: true, activity: a };
}

export async function fetchTeam() {
  try {
    const res = await fetch(`${API_BASE}/schedule/team`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const team = (db.team || []).map(member => {
    const assignedTasks = (db.activities || []).filter(a => a.assignedTo === member.name);
    return {
      ...member,
      assignedTasksCount: assignedTasks.length,
      activeTasksCount: assignedTasks.filter(a => a.status === "In Progress" || a.status === "Delayed").length,
      totalPlannedCostPKR: assignedTasks.reduce((s, a) => s + (a.plannedCostPKR || 0), 0)
    };
  });
  return { success: true, team };
}

export async function fetchEVM() {
  try {
    const res = await fetch(`${API_BASE}/cost/evm`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const evm = calcEVM(db);
  return { success: true, evm };
}

export async function fetchCostBreakdown() {
  try {
    const res = await fetch(`${API_BASE}/cost/breakdown`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const activityCosts = (db.activities || []).map(a => ({
    id: a.id,
    name: a.name,
    assignedTo: a.assignedTo,
    plannedCostPKR: a.plannedCostPKR,
    actualCostPKR: a.actualCostPKR,
    progress: a.progress,
    earnedValuePKR: Math.round((a.plannedCostPKR || 0) * ((a.progress || 0) / 100)),
    cpi: a.actualCostPKR > 0 ? parseFloat((((a.plannedCostPKR || 0) * (a.progress / 100)) / a.actualCostPKR).toFixed(2)) : 1.0
  }));
  return { success: true, activityCosts };
}

export async function fetchDefects() {
  try {
    const res = await fetch(`${API_BASE}/quality/defects`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  return { success: true, defects: db.defects || [] };
}

export async function createDefect(data) {
  try {
    const res = await fetch(`${API_BASE}/quality/defects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const newDef = {
    id: `DEF-00${(db.defects.length + 1)}`,
    ...data,
    status: "Open",
    dateReported: new Date().toISOString().split('T')[0]
  };
  db.defects.push(newDef);
  saveLocalDB(db);
  return { success: true, defect: newDef };
}

export async function updateDefect(id, data) {
  try {
    const res = await fetch(`${API_BASE}/quality/defects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const d = (db.defects || []).find(item => item.id === id);
  if (d) Object.assign(d, data);
  saveLocalDB(db);
  return { success: true, defect: d };
}

export async function fetchChecklist() {
  try {
    const res = await fetch(`${API_BASE}/quality/checklist`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  return { success: true, checklist: db.qualityChecklist || [] };
}

export async function updateChecklistItem(id, data) {
  try {
    const res = await fetch(`${API_BASE}/quality/checklist/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const item = (db.qualityChecklist || []).find(i => i.id === id);
  if (item) Object.assign(item, data);
  saveLocalDB(db);
  return { success: true, item };
}

export async function fetchRisks() {
  try {
    const res = await fetch(`${API_BASE}/quality/risks`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const risks = (db.risks || []).map(r => ({
    ...r,
    score: r.likelihood * r.impact,
    severity: (r.likelihood * r.impact) >= 15 ? 'High' : (r.likelihood * r.impact) >= 8 ? 'Medium' : 'Low'
  }));
  return { success: true, risks };
}

export async function createRisk(data) {
  try {
    const res = await fetch(`${API_BASE}/quality/risks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  const newRisk = {
    id: `RSK-00${(db.risks.length + 1)}`,
    riskId: `R-${(db.risks.length + 1)}`,
    ...data,
    score: data.likelihood * data.impact,
    severity: (data.likelihood * data.impact) >= 15 ? 'High' : 'Medium'
  };
  db.risks.push(newRisk);
  saveLocalDB(db);
  return { success: true, risk: newRisk };
}

export async function fetchPDPC() {
  try {
    const res = await fetch(`${API_BASE}/quality/pdpc`);
    if (res.ok) return await res.json();
  } catch (e) {}

  const db = getLocalDB();
  return { success: true, pdpc: db.pdpc || [] };
}
