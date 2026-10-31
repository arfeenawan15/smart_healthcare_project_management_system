// server/db.js
// Persistent database layer for Smart Healthcare Project Management System
const fs = require('fs');
const path = require('path');
const initialData = require('./data/initialData');

const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Ensure database directory and persistent file exist
function initDatabase() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    saveDatabase(initialData);
  }
}

function loadDatabase() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      initDatabase();
    }
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database file, reinitializing with default data:", err);
    saveDatabase(initialData);
    return JSON.parse(JSON.stringify(initialData));
  }
}

function saveDatabase(data) {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error("Error saving database file:", err);
    throw err;
  }
}

function resetDatabase() {
  saveDatabase(initialData);
  return JSON.parse(JSON.stringify(initialData));
}

// EVM calculation engine
function calculateEVM(data) {
  const currentWeek = data.projectCharter.currentWeek || 12;
  const BAC = data.projectCharter.currentApprovedBudgetPKR;
  const activities = data.activities || [];

  // Planned Value (PV): Sum of planned costs for work scheduled to be completed by current week
  // If an activity is planned to finish by or during currentWeek, we prorate or take full plannedCost
  let PV = 0;
  let EV = 0;
  let AC = 0;

  activities.forEach(act => {
    const plannedCost = act.plannedCostPKR || 0;
    const actualCost = act.actualCostPKR || 0;
    const progress = (act.progress || 0) / 100;

    // Planned Value calculation based on schedule
    if (act.endWeek <= currentWeek) {
      PV += plannedCost;
    } else if (act.startWeek <= currentWeek) {
      const scheduledDuration = Math.max(1, act.endWeek - act.startWeek + 1);
      const elapsed = currentWeek - act.startWeek + 1;
      const plannedPercent = Math.min(1, Math.max(0, elapsed / scheduledDuration));
      PV += Math.round(plannedCost * plannedPercent);
    }

    // Earned Value (EV): Budgeted cost of work performed = progress * plannedCost
    EV += Math.round(plannedCost * progress);

    // Actual Cost (AC): Total actual money spent
    AC += actualCost;
  });

  // Protect against zero division
  const CV = EV - AC;
  const SV = EV - PV;
  const CPI = AC > 0 ? parseFloat((EV / AC).toFixed(3)) : 1.0;
  const SPI = PV > 0 ? parseFloat((EV / PV).toFixed(3)) : 1.0;

  // Estimate at Completion (EAC): BAC / CPI (or AC + (BAC - EV))
  const EAC = CPI > 0 ? Math.round(BAC / CPI) : BAC;
  const ETC = Math.max(0, EAC - AC);
  const VAC = BAC - EAC; // Variance at Completion (Negative = overspend)
  const TCPI = (BAC - AC) > 0 ? parseFloat(((BAC - EV) / (BAC - AC)).toFixed(3)) : null;

  // Threshold breach detection
  const warnings = [];
  if (CPI < 1.0) {
    warnings.push({
      type: "COST_OVERRUN",
      severity: "CRITICAL",
      title: "Cost Overrun Detected (CPI < 1.0)",
      message: `Project Cost Performance Index is ${CPI} (under 1.0). For every PKR 1.00 spent, only PKR ${CPI.toFixed(2)} worth of value is earned. Forecasted completion cost is PKR ${EAC.toLocaleString()}, exceeding budget by PKR ${Math.abs(VAC).toLocaleString()}.`
    });
  } else {
    warnings.push({
      type: "COST_HEALTHY",
      severity: "INFO",
      title: "Cost Within Budget",
      message: `CPI is ${CPI} >= 1.0. Project is spending within or below budgeted efficiency.`
    });
  }

  if (SPI < 1.0) {
    warnings.push({
      type: "SCHEDULE_DELAY",
      severity: "WARNING",
      title: "Schedule Delay Detected (SPI < 1.0)",
      message: `Project Schedule Performance Index is ${SPI} (under 1.0). Progress is running at ${(SPI * 100).toFixed(1)}% of planned velocity. Schedule variance is -PKR ${Math.abs(SV).toLocaleString()} in work volume.`
    });
  } else {
    warnings.push({
      type: "SCHEDULE_HEALTHY",
      severity: "INFO",
      title: "Schedule On Track",
      message: `SPI is ${SPI} >= 1.0. Work is progressing at or ahead of schedule.`
    });
  }

  if (AC > BAC) {
    warnings.push({
      type: "BUDGET_EXCEEDED",
      severity: "DANGER",
      title: "Approved Budget Exceeded!",
      message: `Actual expenditures (PKR ${AC.toLocaleString()}) have surpassed total approved budget (PKR ${BAC.toLocaleString()})!`
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
    TCPI,
    overallPercentComplete: BAC > 0 ? Math.min(100, Math.round((EV / BAC) * 100)) : 0,
    warnings
  };
}

// Schedule calculation & ripple effect engine
function calculateSchedule(data) {
  const activities = JSON.parse(JSON.stringify(data.activities || []));
  const deadlineWeeks = data.projectCharter.currentDeadlineWeeks;

  // Map activities by ID
  const actMap = {};
  activities.forEach(a => { actMap[a.id] = a; });

  // Compute calculated start and end weeks with dependency delays
  let maxEndWeek = 0;
  let delayedActivitiesCount = 0;

  activities.forEach(act => {
    // If predecessors are delayed, push start week forward
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

  const isScheduleOverrun = maxEndWeek > deadlineWeeks;
  const projectDelayWeeks = Math.max(0, maxEndWeek - deadlineWeeks);

  return {
    activities,
    deadlineWeeks,
    projectForecastEndWeek: maxEndWeek,
    isScheduleOverrun,
    projectDelayWeeks,
    delayedActivitiesCount
  };
}

// Handle Change Request approval and automatic impact propagation
function approveChangeRequest(crId) {
  const db = loadDatabase();
  const cr = (db.changeRequests || []).find(c => c.id === crId);
  if (!cr) {
    throw new Error(`Change Request ${crId} not found`);
  }
  if (cr.status === "Approved") {
    return { message: "Change Request is already approved", cr };
  }

  // 1. Mark Change Request as Approved
  cr.status = "Approved";
  cr.approvalDate = new Date().toISOString().split('T')[0];

  // 2. Adjust Charter approved budget and deadline
  db.projectCharter.currentApprovedBudgetPKR += cr.costImpactPKR;
  db.projectCharter.currentDeadlineWeeks += cr.scheduleImpactWeeks;

  // 3. Mark corresponding requirement as Approved and include in approved scope
  if (cr.id === "CR-001") {
    // AI Diagnosis module
    const req = db.requirements.find(r => r.id === "REQ-007" || r.changeRequestId === "CR-001");
    if (req) {
      req.status = "Approved";
      req.inApprovedScope = true;
    }

    // Add WBS Deliverable and Work Package
    const existingWbs = db.wbs.find(w => w.code === "6.0");
    if (!existingWbs) {
      db.wbs.push({
        id: "WBS-6.0",
        code: "6.0",
        name: "AI Preliminary Diagnosis Module (Approved Change)",
        parentCode: null,
        type: "Deliverable",
        budgetPKR: 500000,
        progress: 10,
        status: "In Progress"
      });
      db.wbs.push({
        id: "WBS-6.1",
        code: "6.1",
        name: "NLP Clinical Symptom Classifier & Triage Model",
        parentCode: "6.0",
        type: "Work Package",
        budgetPKR: 300000,
        progress: 15,
        status: "In Progress"
      });
      db.wbs.push({
        id: "WBS-6.2",
        code: "6.2",
        name: "Doctor Specialty Recommender & Integration API",
        parentCode: "6.0",
        type: "Work Package",
        budgetPKR: 200000,
        progress: 5,
        status: "In Progress"
      });
    }

    // Add Activity
    const existingAct = db.activities.find(a => a.id === "ACT-11");
    if (!existingAct) {
      db.activities.push({
        id: "ACT-11",
        wbsCode: "6.1",
        name: "AI Symptom Diagnostic Engine Development & Clinical Validation",
        assignedTo: "Ali Raza",
        role: "Backend Developer",
        durationWeeks: 2,
        startWeek: 12,
        endWeek: 14,
        dependencies: ["ACT-04"],
        status: "In Progress",
        progress: 20,
        plannedCostPKR: 500000,
        actualCostPKR: 120000,
        isDelayed: false,
        delayWeeks: 0
      });
    }
  }

  if (cr.id === "CR-002") {
    // Mobile Application
    const req = db.requirements.find(r => r.id === "REQ-008" || r.changeRequestId === "CR-002");
    if (req) {
      req.status = "Approved";
      req.inApprovedScope = true;
    }

    // Add WBS Deliverable and Work Package
    const existingWbs = db.wbs.find(w => w.code === "7.0");
    if (!existingWbs) {
      db.wbs.push({
        id: "WBS-7.0",
        code: "7.0",
        name: "Patient & Doctor Cross-Platform Mobile App (Approved Change)",
        parentCode: null,
        type: "Deliverable",
        budgetPKR: 300000,
        progress: 10,
        status: "In Progress"
      });
      db.wbs.push({
        id: "WBS-7.1",
        code: "7.1",
        name: "React Native Mobile Client & Push Notifications",
        parentCode: "7.0",
        type: "Work Package",
        budgetPKR: 300000,
        progress: 10,
        status: "In Progress"
      });
    }

    // Add Activity
    const existingAct = db.activities.find(a => a.id === "ACT-12");
    if (!existingAct) {
      db.activities.push({
        id: "ACT-12",
        wbsCode: "7.1",
        name: "Mobile App Frontends (iOS/Android) & Push Notification Service",
        assignedTo: "Sara Ahmed",
        role: "Frontend Developer",
        durationWeeks: 1,
        startWeek: 13,
        endWeek: 14,
        dependencies: ["ACT-06"],
        status: "In Progress",
        progress: 15,
        plannedCostPKR: 300000,
        actualCostPKR: 80000,
        isDelayed: false,
        delayWeeks: 0
      });
    }
  }

  saveDatabase(db);
  return {
    success: true,
    message: `Change Request ${cr.id} (${cr.title}) has been approved! Budget increased by PKR ${cr.costImpactPKR.toLocaleString()} to PKR ${db.projectCharter.currentApprovedBudgetPKR.toLocaleString()}. Deadline extended by ${cr.scheduleImpactWeeks} week(s) to ${db.projectCharter.currentDeadlineWeeks} weeks. Scope and WBS updated.`,
    cr,
    updatedCharter: db.projectCharter
  };
}

// Reject Change Request
function rejectChangeRequest(crId, reason) {
  const db = loadDatabase();
  const cr = (db.changeRequests || []).find(c => c.id === crId);
  if (!cr) throw new Error(`Change Request ${crId} not found`);

  cr.status = "Rejected";
  cr.rejectionReason = reason || "Declined due to budget and timeline constraints.";
  cr.approvalDate = null;

  saveDatabase(db);
  return { success: true, message: `Change Request ${cr.id} rejected. Scope and baseline unaffected.`, cr };
}

// Initialize database file on startup
initDatabase();

module.exports = {
  loadDatabase,
  saveDatabase,
  resetDatabase,
  calculateEVM,
  calculateSchedule,
  approveChangeRequest,
  rejectChangeRequest
};

