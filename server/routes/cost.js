// server/routes/cost.js
const express = require('express');
const router = express.Router();
const { loadDatabase, saveDatabase, calculateEVM } = require('../db');

// GET full Earned Value Analysis metrics and threshold warnings
router.get('/evm', (req, res) => {
  try {
    const db = loadDatabase();
    const evm = calculateEVM(db);
    res.json({
      success: true,
      evm,
      budget: {
        baselineBudgetPKR: db.projectCharter.baselineBudgerPKR,
        approvedBudgetPKR: db.projectCharter.currentApprovedBudgetPKR,
        actualSpentPKR: evm.AC,
        remainingBudgetPKR: Math.max(0, db.projectCharter.currentApprovedBudgetPKR - evm.AC)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET detailed cost breakdown by activity and deliverable
router.get('/breakdown', (req, res) => {
  try {
    const db = loadDatabase();
    const activities = db.activities || [];
    const wbs = db.wbs || [];

    const activityCosts = activities.map(a => ({
      id: a.id,
      name: a.name,
      wbsCode: a.wbsCode,
      assignedTo: a.assignedTo,
      plannedCostPKR: a.plannedCostPKR,
      actualCostPKR: a.actualCostPKR,
      progress: a.progress,
      earnedValuePKR: Math.round((a.plannedCostPKR || 0) * ((a.progress || 0) / 100)),
      costVariancePKR: Math.round((a.plannedCostPKR || 0) * ((a.progress || 0) / 100)) - a.actualCostPKR,
      cpi: a.actualCostPKR > 0 ? parseFloat((((a.plannedCostPKR || 0) * (a.progress / 100)) / a.actualCostPKR).toFixed(2)) : 1.0
    }));

    const deliverableCosts = wbs.filter(w => w.type === "Deliverable").map(d => {
      const relatedTasks = activities.filter(a => a.wbsCode && a.wbsCode.startsWith(d.code));
      const plannedSum = relatedTasks.reduce((s, a) => s + (a.plannedCostPKR || 0), 0);
      const actualSum = relatedTasks.reduce((s, a) => s + (a.actualCostPKR || 0), 0);
      return {
        code: d.code,
        name: d.name,
        allocatedBudgetPKR: d.budgetPKR,
        plannedCostPKR: plannedSum,
        actualCostPKR: actualSum,
        status: d.status
      };
    });

    res.json({ success: true, activityCosts, deliverableCosts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE activity costs directly
router.put('/activity/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const act = db.activities.find(a => a.id === req.params.id);
    if (!act) return res.status(404).json({ success: false, error: "Activity not found" });

    const { plannedCostPKR, actualCostPKR, progress } = req.body;
    if (plannedCostPKR !== undefined) act.plannedCostPKR = Number(plannedCostPKR);
    if (actualCostPKR !== undefined) act.actualCostPKR = Number(actualCostPKR);
    if (progress !== undefined) act.progress = Number(progress);

    saveDatabase(db);
    const evm = calculateEVM(db);

    res.json({
      success: true,
      message: "Activity cost updated. EVM metrics recalculated.",
      activity: act,
      evm
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

