// server/routes/dashboard.js
const express = require('express');
const router = express.Router();
const { loadDatabase, resetDatabase, calculateEVM, calculateSchedule } = require('../db');

// GET consolidated executive dashboard
router.get('/', (req, res) => {
  try {
    const db = loadDatabase();
    const evm = calculateEVM(db);
    const schedule = calculateSchedule(db);

    const pendingCRs = (db.changeRequests || []).filter(c => c.status === "Pending");
    const approvedCRs = (db.changeRequests || []).filter(c => c.status === "Approved");
    const openCriticalDefects = (db.defects || []).filter(d => d.severity === "Critical" && d.status !== "Closed" && d.status !== "Resolved");
    const delayedActivities = (db.activities || []).filter(a => a.isDelayed || a.status === "Delayed");

    const passChecklistCount = (db.qualityChecklist || []).filter(q => q.inspectionStatus === "Pass").length;
    const totalChecklist = (db.qualityChecklist || []).length;
    const qualityPassRate = totalChecklist > 0 ? Math.round((passChecklistCount / totalChecklist) * 100) : 0;

    const highRisksCount = (db.risks || []).filter(r => (r.likelihood * r.impact) >= 15).length;

    res.json({
      success: true,
      project: {
        id: db.projectCharter.projectId,
        title: db.projectCharter.title,
        client: db.projectCharter.client,
        projectManager: db.projectCharter.projectManager,
        currentWeek: db.projectCharter.currentWeek,
        baselineDeadlineWeeks: db.projectCharter.baselineDeadlineWeeks,
        currentDeadlineWeeks: db.projectCharter.currentDeadlineWeeks,
        baselineBudgerPKR: db.projectCharter.baselineBudgerPKR,
        currentApprovedBudgetPKR: db.projectCharter.currentApprovedBudgetPKR,
        status: db.projectCharter.status
      },
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
        pendingCRBudgetImpact: pendingCRs.reduce((s, c) => s + c.costImpactPKR, 0),
        pendingCRScheduleImpactWeeks: pendingCRs.reduce((s, c) => s + c.scheduleImpactWeeks, 0),
        openCriticalDefectsCount: openCriticalDefects.length,
        delayedActivitiesCount: delayedActivities.length,
        qualityPassRate,
        highRisksCount
      },
      criticalAlerts: evm.warnings,
      pendingChangeRequests: pendingCRs,
      openCriticalDefects,
      delayedActivities,
      milestones: db.projectCharter.milestones || []
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST reset to initial case study state
router.post('/reset', (req, res) => {
  try {
    const data = resetDatabase();
    res.json({
      success: true,
      message: "Database successfully reset to initial Case Study baseline (16 weeks, PKR 5,000,000 budget, pending AI & Mobile change requests).",
      data
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

