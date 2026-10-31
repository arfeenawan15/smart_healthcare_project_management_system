// server/routes/schedule.js
const express = require('express');
const router = express.Router();
const { loadDatabase, saveDatabase, calculateSchedule } = require('../db');

// GET all activities with calculated schedule, ripple delay impact, and dependencies
router.get('/activities', (req, res) => {
  try {
    const db = loadDatabase();
    const scheduleAnalysis = calculateSchedule(db);
    res.json({
      success: true,
      activities: scheduleAnalysis.activities,
      projectForecastEndWeek: scheduleAnalysis.projectForecastEndWeek,
      deadlineWeeks: scheduleAnalysis.deadlineWeeks,
      isScheduleOverrun: scheduleAnalysis.isScheduleOverrun,
      projectDelayWeeks: scheduleAnalysis.projectDelayWeeks,
      delayedActivitiesCount: scheduleAnalysis.delayedActivitiesCount
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET team members and workload
router.get('/team', (req, res) => {
  try {
    const db = loadDatabase();
    const team = (db.team || []).map(member => {
      const assignedTasks = (db.activities || []).filter(a => a.assignedTo === member.name);
      const totalPlannedCost = assignedTasks.reduce((sum, a) => sum + (a.plannedCostPKR || 0), 0);
      const activeTasks = assignedTasks.filter(a => a.status === "In Progress" || a.status === "Delayed").length;
      return {
        ...member,
        assignedTasksCount: assignedTasks.length,
        activeTasksCount: activeTasks,
        totalPlannedCostPKR: totalPlannedCost,
        taskNames: assignedTasks.map(a => a.name)
      };
    });
    res.json({ success: true, team });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADD activity
router.post('/activities', (req, res) => {
  try {
    const { name, wbsCode, assignedTo, role, durationWeeks, startWeek, dependencies, plannedCostPKR } = req.body;
    if (!name || !durationWeeks || !startWeek) {
      return res.status(400).json({ success: false, error: "Name, durationWeeks, and startWeek are required." });
    }

    const db = loadDatabase();
    const newId = `ACT-${String(db.activities.length + 1).padStart(2, '0')}`;
    const duration = Number(durationWeeks);
    const start = Number(startWeek);
    const end = start + duration - 1;

    const newActivity = {
      id: newId,
      wbsCode: wbsCode || "3.0",
      name,
      assignedTo: assignedTo || "Unassigned",
      role: role || "Developer",
      durationWeeks: duration,
      startWeek: start,
      endWeek: end,
      dependencies: Array.isArray(dependencies) ? dependencies : [],
      status: "Not Started",
      progress: 0,
      plannedCostPKR: Number(plannedCostPKR) || 0,
      actualCostPKR: 0,
      isDelayed: false,
      delayWeeks: 0
    };

    db.activities.push(newActivity);
    saveDatabase(db);
    res.status(201).json({ success: true, message: "Activity added successfully", activity: newActivity });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE activity (progress, delay, costs)
router.put('/activities/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const act = db.activities.find(a => a.id === req.params.id);
    if (!act) return res.status(404).json({ success: false, error: "Activity not found" });

    const { name, assignedTo, role, durationWeeks, startWeek, dependencies, status, progress, plannedCostPKR, actualCostPKR, isDelayed, delayWeeks, impactNotes } = req.body;

    if (name) act.name = name;
    if (assignedTo) act.assignedTo = assignedTo;
    if (role) act.role = role;
    if (durationWeeks !== undefined) act.durationWeeks = Number(durationWeeks);
    if (startWeek !== undefined) act.startWeek = Number(startWeek);
    if (dependencies !== undefined) act.dependencies = Array.isArray(dependencies) ? dependencies : [];
    if (status) act.status = status;
    if (progress !== undefined) act.progress = Number(progress);
    if (plannedCostPKR !== undefined) act.plannedCostPKR = Number(plannedCostPKR);
    if (actualCostPKR !== undefined) act.actualCostPKR = Number(actualCostPKR);
    if (isDelayed !== undefined) act.isDelayed = Boolean(isDelayed);
    if (delayWeeks !== undefined) act.delayWeeks = Number(delayWeeks);
    if (impactNotes !== undefined) act.impactNotes = impactNotes;

    // Recalculate planned end week
    act.endWeek = act.startWeek + act.durationWeeks - 1;

    saveDatabase(db);
    const scheduleAnalysis = calculateSchedule(db);

    res.json({
      success: true,
      message: "Activity updated successfully",
      activity: act,
      scheduleAnalysis
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE activity
router.delete('/activities/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const index = db.activities.findIndex(a => a.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: "Activity not found" });

    db.activities.splice(index, 1);
    saveDatabase(db);
    res.json({ success: true, message: "Activity deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

