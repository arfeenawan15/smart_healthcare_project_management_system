// server/routes/scope.js
const express = require('express');
const router = express.Router();
const { loadDatabase, saveDatabase, approveChangeRequest, rejectChangeRequest } = require('../db');

// ========================
// 1. REQUIREMENTS MANAGEMENT
// ========================

// GET all requirements
router.get('/requirements', (req, res) => {
  try {
    const db = loadDatabase();
    res.json({ success: true, requirements: db.requirements || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADD requirement
router.post('/requirements', (req, res) => {
  try {
    const { title, category, priority, description, estimatedCostPKR, estimatedWeeks } = req.body;
    if (!title || !category || !priority) {
      return res.status(400).json({ success: false, error: "Title, category, and priority are required." });
    }

    const db = loadDatabase();
    const newId = `REQ-00${(db.requirements.length + 1)}`;
    const newReq = {
      id: newId,
      title,
      category,
      priority,
      status: "Pending", // New requirements require approval before entering approved scope
      inApprovedScope: false,
      description: description || "",
      estimatedCostPKR: Number(estimatedCostPKR) || 0,
      estimatedWeeks: Number(estimatedWeeks) || 1
    };

    db.requirements.push(newReq);
    saveDatabase(db);
    res.status(201).json({ success: true, message: "Requirement created as Pending approval.", requirement: newReq });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE requirement
router.put('/requirements/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const reqItem = db.requirements.find(r => r.id === req.params.id);
    if (!reqItem) return res.status(404).json({ success: false, error: "Requirement not found" });

    const { title, category, priority, status, description, estimatedCostPKR, estimatedWeeks } = req.body;
    if (title) reqItem.title = title;
    if (category) reqItem.category = category;
    if (priority) reqItem.priority = priority;
    if (description !== undefined) reqItem.description = description;
    if (estimatedCostPKR !== undefined) reqItem.estimatedCostPKR = Number(estimatedCostPKR);
    if (estimatedWeeks !== undefined) reqItem.estimatedWeeks = Number(estimatedWeeks);

    if (status) {
      reqItem.status = status;
      reqItem.inApprovedScope = (status === "Approved");
    }

    saveDatabase(db);
    res.json({ success: true, message: "Requirement updated successfully", requirement: reqItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE requirement
router.delete('/requirements/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const index = db.requirements.findIndex(r => r.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: "Requirement not found" });

    db.requirements.splice(index, 1);
    saveDatabase(db);
    res.json({ success: true, message: "Requirement deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ========================
// 2. WORK BREAKDOWN STRUCTURE (WBS)
// ========================

// GET hierarchical WBS items
router.get('/wbs', (req, res) => {
  try {
    const db = loadDatabase();
    res.json({ success: true, wbs: db.wbs || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADD WBS item (with scope boundary check)
router.post('/wbs', (req, res) => {
  try {
    const { code, name, parentCode, type, budgetPKR } = req.body;
    if (!code || !name || !type) {
      return res.status(400).json({ success: false, error: "Code, Name, and Type (Deliverable/Work Package) are required." });
    }

    const db = loadDatabase();
    // Verify uniqueness of WBS code
    if (db.wbs.some(w => w.code === code)) {
      return res.status(400).json({ success: false, error: `WBS Code ${code} already exists.` });
    }

    const newWbs = {
      id: `WBS-${code}`,
      code,
      name,
      parentCode: parentCode || null,
      type: type === "Deliverable" ? "Deliverable" : "Work Package",
      budgetPKR: Number(budgetPKR) || 0,
      progress: 0,
      status: "Not Started"
    };

    db.wbs.push(newWbs);
    saveDatabase(db);
    res.status(201).json({ success: true, message: "WBS item added successfully", wbs: newWbs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE WBS item
router.put('/wbs/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const item = db.wbs.find(w => w.id === req.params.id || w.code === req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "WBS item not found" });

    const { name, budgetPKR, progress, status } = req.body;
    if (name) item.name = name;
    if (budgetPKR !== undefined) item.budgetPKR = Number(budgetPKR);
    if (progress !== undefined) item.progress = Number(progress);
    if (status) item.status = status;

    saveDatabase(db);
    res.json({ success: true, message: "WBS item updated", wbs: item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE WBS item
router.delete('/wbs/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const index = db.wbs.findIndex(w => w.id === req.params.id || w.code === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: "WBS item not found" });

    db.wbs.splice(index, 1);
    saveDatabase(db);
    res.json({ success: true, message: "WBS item deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ========================
// 3. CHANGE REQUEST MANAGEMENT
// ========================

// GET all change requests
router.get('/change-requests', (req, res) => {
  try {
    const db = loadDatabase();
    res.json({ success: true, changeRequests: db.changeRequests || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// SUBMIT new change request
router.post('/change-requests', (req, res) => {
  try {
    const { title, requestedBy, justification, costImpactPKR, scheduleImpactWeeks, scopeDetails } = req.body;
    if (!title || !requestedBy || costImpactPKR === undefined || scheduleImpactWeeks === undefined) {
      return res.status(400).json({ success: false, error: "Title, requestedBy, costImpactPKR, and scheduleImpactWeeks are required." });
    }

    const db = loadDatabase();
    const newId = `CR-00${(db.changeRequests.length + 1)}`;
    const newCR = {
      id: newId,
      title,
      requestedBy,
      dateRequested: new Date().toISOString().split('T')[0],
      justification: justification || "",
      costImpactPKR: Number(costImpactPKR),
      scheduleImpactWeeks: Number(scheduleImpactWeeks),
      status: "Pending",
      scopeDetails: scopeDetails || "",
      reviewedBy: "Change Control Board (CCB)",
      approvalDate: null
    };

    db.changeRequests.push(newCR);
    saveDatabase(db);
    res.status(201).json({ success: true, message: "Change Request logged as Pending CCB review.", changeRequest: newCR });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// APPROVE change request (triggers automatic budget, schedule, and WBS scope update!)
router.post('/change-requests/:id/approve', (req, res) => {
  try {
    const result = approveChangeRequest(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// REJECT change request
router.post('/change-requests/:id/reject', (req, res) => {
  try {
    const { reason } = req.body;
    const result = rejectChangeRequest(req.params.id, reason);
    res.json(result);
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;

