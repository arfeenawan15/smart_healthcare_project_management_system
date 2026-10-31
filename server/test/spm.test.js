// server/test/spm.test.js
// Automated verification test suite for Smart Healthcare Project Management System
const assert = require('assert');
const {
  loadDatabase,
  resetDatabase,
  calculateEVM,
  calculateSchedule,
  approveChangeRequest
} = require('../db');

console.log("======================================================================");
console.log("STARTING TEST SUITE: Smart Healthcare Project Management System");
console.log("======================================================================");

let testsPassed = 0;
let testsTotal = 0;

function runTest(testName, fn) {
  testsTotal++;
  try {
    fn();
    console.log(`[PASS] Test ${testsTotal}: ${testName}`);
    testsPassed++;
  } catch (err) {
    console.error(`[FAIL] Test ${testsTotal}: ${testName}`);
    console.error(`       Error: ${err.message}`);
  }
}

// Ensure clean starting state
resetDatabase();
const db = loadDatabase();

// TEST 1: Project Charter Initial Baseline
runTest("Project Charter has baseline 16 weeks and PKR 5,000,000 budget", () => {
  assert.strictEqual(db.projectCharter.baselineDeadlineWeeks, 16);
  assert.strictEqual(db.projectCharter.currentDeadlineWeeks, 16);
  assert.strictEqual(db.projectCharter.baselineBudgerPKR, 5000000);
  assert.strictEqual(db.projectCharter.currentApprovedBudgetPKR, 5000000);
});

// TEST 2: EVM Programmatic Calculations
runTest("EVM Calculation produces valid PV, EV, AC, CPI, and SPI", () => {
  const evm = calculateEVM(db);
  assert(evm.PV > 0, "PV should be > 0");
  assert(evm.EV > 0, "EV should be > 0");
  assert(evm.AC > 0, "AC should be > 0");
  assert(evm.CPI > 0, "CPI should be calculated");
  assert(evm.SPI > 0, "SPI should be calculated");
  assert.strictEqual(evm.CV, evm.EV - evm.AC, "Cost Variance CV = EV - AC");
  assert.strictEqual(evm.SV, evm.EV - evm.PV, "Schedule Variance SV = EV - PV");
});

// TEST 3: EVM Threshold Warning Detection
runTest("EVM threshold detection flags Cost Overrun (CPI < 1.0) and Schedule Delay (SPI < 1.0)", () => {
  const evm = calculateEVM(db);
  // In the case study, testing defects caused delays and rework costs, CPI < 1.0 and SPI < 1.0
  const costWarning = evm.warnings.find(w => w.type === "COST_OVERRUN");
  const schedWarning = evm.warnings.find(w => w.type === "SCHEDULE_DELAY");

  assert(costWarning, "Cost overrun warning must be triggered when CPI < 1.0");
  assert(schedWarning, "Schedule delay warning must be triggered when SPI < 1.0");
  assert.strictEqual(costWarning.severity, "CRITICAL");
});

// TEST 4: Scope Containment (Unapproved Requirements not in Approved Scope)
runTest("Scope Containment: AI Diagnosis (REQ-007) and Mobile App (REQ-008) are unapproved initially", () => {
  const reqAI = db.requirements.find(r => r.id === "REQ-007");
  const reqMobile = db.requirements.find(r => r.id === "REQ-008");

  assert.strictEqual(reqAI.status, "Pending", "AI Diagnosis should be Pending");
  assert.strictEqual(reqAI.inApprovedScope, false, "AI Diagnosis must NOT be in approved scope initially");
  assert.strictEqual(reqMobile.status, "Pending", "Mobile App should be Pending");
  assert.strictEqual(reqMobile.inApprovedScope, false, "Mobile App must NOT be in approved scope initially");
});

// TEST 5: Change Request CR-001 Approval Workflow
runTest("Change Request CR-001 Approval increases budget by 500k and deadline by 2 weeks", () => {
  const result = approveChangeRequest("CR-001");
  assert.strictEqual(result.success, true);

  const updatedDb = loadDatabase();
  assert.strictEqual(updatedDb.projectCharter.currentApprovedBudgetPKR, 5500000, "Budget must increase to 5.5M PKR");
  assert.strictEqual(updatedDb.projectCharter.currentDeadlineWeeks, 18, "Deadline must increase to 18 weeks");

  const reqAI = updatedDb.requirements.find(r => r.id === "REQ-007");
  assert.strictEqual(reqAI.status, "Approved");
  assert.strictEqual(reqAI.inApprovedScope, true, "AI Diagnosis is now part of approved scope");

  const wbs6 = updatedDb.wbs.find(w => w.code === "6.0");
  assert(wbs6, "WBS Deliverable 6.0 must be generated for AI Diagnosis");
});

// TEST 6: Change Request CR-002 Approval Workflow
runTest("Change Request CR-002 Approval increases budget to 5.8M and deadline to 19 weeks", () => {
  const result = approveChangeRequest("CR-002");
  assert.strictEqual(result.success, true);

  const updatedDb = loadDatabase();
  assert.strictEqual(updatedDb.projectCharter.currentApprovedBudgetPKR, 5800000, "Budget must reach PKR 5,800,000 as per case study");
  assert.strictEqual(updatedDb.projectCharter.currentDeadlineWeeks, 19, "Deadline must reach 19 weeks (16 + 3 weeks) as per case study");

  const reqMobile = updatedDb.requirements.find(r => r.id === "REQ-008");
  assert.strictEqual(reqMobile.status, "Approved");
  assert.strictEqual(reqMobile.inApprovedScope, true);

  const wbs7 = updatedDb.wbs.find(w => w.code === "7.0");
  assert(wbs7, "WBS Deliverable 7.0 must be generated for Mobile App");
});

// TEST 7: Schedule Delay and Ripple Effect Calculation
runTest("Schedule calculation identifies delayed activities and computes project completion week", () => {
  const updatedDb = loadDatabase();
  const schedule = calculateSchedule(updatedDb);

  assert(schedule.delayedActivitiesCount > 0, "Must detect delayed activities from testing defects");
  const delayedAct = schedule.activities.find(a => a.id === "ACT-09");
  assert.strictEqual(delayedAct.isDelayed, true);
  assert.strictEqual(delayedAct.delayWeeks, 2);

  // Successor ACT-10 must be shifted forward due to dependency on ACT-09
  const successor = schedule.activities.find(a => a.id === "ACT-10");
  assert(successor.calculatedStartWeek > successor.startWeek, "Successor start week must be pushed forward by dependency delay");
});

// TEST 8: Critical Defect Tracking
runTest("Defect tracking has recorded critical appointment and record sync defects", () => {
  const updatedDb = loadDatabase();
  const def1 = updatedDb.defects.find(d => d.id === "DEF-001");
  const def2 = updatedDb.defects.find(d => d.id === "DEF-002");

  assert(def1, "DEF-001 must exist");
  assert.strictEqual(def1.severity, "Critical");
  assert.strictEqual(def1.module, "Patient Appointments");

  assert(def2, "DEF-002 must exist");
  assert.strictEqual(def2.severity, "Critical");
  assert.strictEqual(def2.module, "Patient Records & Database Sync");
});

// TEST 9: Quality Checklist and Risk Matrix
runTest("Quality checklist and Risk matrix rank items with calculated severity", () => {
  const updatedDb = loadDatabase();
  assert(updatedDb.qualityChecklist.length >= 5, "Quality checklist must contain deliverables inspections");

  const highRisks = updatedDb.risks.filter(r => (r.likelihood * r.impact) >= 15);
  assert(highRisks.length >= 2, "High risks must be identified from score >= 15");

  assert(updatedDb.pdpc.length >= 4, "PDPC must provide structured risk and contingency countermeasures");
});

// Reset database back to original Case Study state for clean user interaction
resetDatabase();

console.log("======================================================================");
console.log(`TEST RESULTS: ${testsPassed} / ${testsTotal} PASSED (${Math.round((testsPassed / testsTotal) * 100)}%)`);
console.log("======================================================================");

if (testsPassed !== testsTotal) {
  process.exit(1);
}

