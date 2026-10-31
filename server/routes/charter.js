// server/routes/charter.js
const express = require('express');
const router = express.Router();
const { loadDatabase, saveDatabase } = require('../db');

// GET full project charter and integration plan
router.get('/', (req, res) => {
  try {
    const db = loadDatabase();
    res.json({
      success: true,
      charter: db.projectCharter,
      team: db.team
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE project charter details
router.put('/', (req, res) => {
  try {
    const db = loadDatabase();
    const { title, sponsor, projectManager, currentWeek, status, scopeBoundaries, managementPlan } = req.body;

    if (title) db.projectCharter.title = title;
    if (sponsor) db.projectCharter.sponsor = sponsor;
    if (projectManager) db.projectCharter.projectManager = projectManager;
    if (currentWeek !== undefined) db.projectCharter.currentWeek = Number(currentWeek);
    if (status) db.projectCharter.status = status;
    if (scopeBoundaries) db.projectCharter.scopeBoundaries = scopeBoundaries;
    if (managementPlan) db.projectCharter.managementPlan = { ...db.projectCharter.managementPlan, ...managementPlan };

    saveDatabase(db);
    res.json({ success: true, message: "Project Charter updated successfully", charter: db.projectCharter });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE milestone
router.put('/milestones/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const milestone = (db.projectCharter.milestones || []).find(m => m.id === req.params.id);
    if (!milestone) return res.status(404).json({ success: false, error: "Milestone not found" });

    const { status, actualWeek, notes } = req.body;
    if (status) milestone.status = status;
    if (actualWeek !== undefined) milestone.actualWeek = actualWeek ? Number(actualWeek) : null;
    if (notes !== undefined) milestone.notes = notes;

    saveDatabase(db);
    res.json({ success: true, message: "Milestone updated", milestone });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE closure records
router.put('/closure', (req, res) => {
  try {
    const db = loadDatabase();
    db.projectCharter.closurePlan = { ...db.projectCharter.closurePlan, ...req.body };
    saveDatabase(db);
    res.json({ success: true, message: "Project Closure plan updated", closurePlan: db.projectCharter.closurePlan });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

