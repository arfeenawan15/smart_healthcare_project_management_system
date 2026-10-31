// server/routes/quality.js
const express = require('express');
const router = express.Router();
const { loadDatabase, saveDatabase } = require('../db');

// ========================
// 1. DEFECT TRACKING MODULE
// ========================

// GET defects
router.get('/defects', (req, res) => {
  try {
    const db = loadDatabase();
    const { severity, status } = req.query;
    let list = db.defects || [];
    if (severity) list = list.filter(d => d.severity.toLowerCase() === severity.toLowerCase());
    if (status) list = list.filter(d => d.status.toLowerCase() === status.toLowerCase());

    const summary = {
      total: db.defects.length,
      critical: db.defects.filter(d => d.severity === "Critical").length,
      openCritical: db.defects.filter(d => d.severity === "Critical" && (d.status === "Open" || d.status === "In Progress")).length,
      major: db.defects.filter(d => d.severity === "Major").length,
      minor: db.defects.filter(d => d.severity === "Minor").length,
      resolved: db.defects.filter(d => d.status === "Resolved" || d.status === "Closed").length
    };

    res.json({ success: true, defects: list, summary });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADD defect
router.post('/defects', (req, res) => {
  try {
    const { title, module, severity, assignedTo, reportedBy, stepsToReproduce, impact, resolutionNotes } = req.body;
    if (!title || !severity) {
      return res.status(400).json({ success: false, error: "Title and Severity (Critical/Major/Minor/Cosmetic) are required." });
    }

    const validSeverities = ["Critical", "Major", "Minor", "Cosmetic"];
    if (!validSeverities.includes(severity)) {
      return res.status(400).json({ success: false, error: `Invalid severity. Must be one of: ${validSeverities.join(", ")}` });
    }

    const db = loadDatabase();
    const newId = `DEF-00${db.defects.length + 1}`;
    const newDefect = {
      id: newId,
      title,
      module: module || "General",
      severity,
      assignedTo: assignedTo || "Unassigned",
      reportedBy: reportedBy || "QA Engineer",
      status: "Open",
      dateReported: new Date().toISOString().split('T')[0],
      stepsToReproduce: stepsToReproduce || "",
      impact: impact || "",
      resolutionNotes: resolutionNotes || ""
    };

    db.defects.push(newDefect);
    saveDatabase(db);
    res.status(201).json({ success: true, message: "Defect logged successfully", defect: newDefect });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE defect
router.put('/defects/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const defect = db.defects.find(d => d.id === req.params.id);
    if (!defect) return res.status(404).json({ success: false, error: "Defect not found" });

    const { title, module, severity, assignedTo, status, stepsToReproduce, impact, resolutionNotes } = req.body;
    if (title) defect.title = title;
    if (module) defect.module = module;
    if (severity) defect.severity = severity;
    if (assignedTo) defect.assignedTo = assignedTo;
    if (status) defect.status = status;
    if (stepsToReproduce !== undefined) defect.stepsToReproduce = stepsToReproduce;
    if (impact !== undefined) defect.impact = impact;
    if (resolutionNotes !== undefined) defect.resolutionNotes = resolutionNotes;

    saveDatabase(db);
    res.json({ success: true, message: "Defect updated successfully", defect });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE defect
router.delete('/defects/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const index = db.defects.findIndex(d => d.id === req.params.id);
    if (index === -1) return res.status(404).json({ success: false, error: "Defect not found" });

    db.defects.splice(index, 1);
    saveDatabase(db);
    res.json({ success: true, message: "Defect deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ========================
// 2. QUALITY CHECKLIST MODULE
// ========================

// GET quality checklist
router.get('/checklist', (req, res) => {
  try {
    const db = loadDatabase();
    const items = db.qualityChecklist || [];
    const passed = items.filter(i => i.inspectionStatus === "Pass").length;
    const failed = items.filter(i => i.inspectionStatus === "Fail").length;
    const pending = items.filter(i => i.inspectionStatus === "Pending").length;
    const passRate = items.length > 0 ? Math.round((passed / items.length) * 100) : 0;

    res.json({
      success: true,
      checklist: items,
      summary: { total: items.length, passed, failed, pending, passRate }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADD checklist item
router.post('/checklist', (req, res) => {
  try {
    const { itemCode, deliverable, criteria, inspectionStatus, inspector, testDate, linkedDefectId, remarks } = req.body;
    if (!deliverable || !criteria) {
      return res.status(400).json({ success: false, error: "Deliverable and criteria are required." });
    }

    const db = loadDatabase();
    const newId = `QC-${String(db.qualityChecklist.length + 1).padStart(2, '0')}`;
    const newItem = {
      id: newId,
      itemCode: itemCode || `QC-NEW-${newId}`,
      deliverable,
      criteria,
      inspectionStatus: inspectionStatus || "Pending",
      inspector: inspector || "Usman Farooq (QA)",
      testDate: testDate || new Date().toISOString().split('T')[0],
      linkedDefectId: linkedDefectId || null,
      remarks: remarks || ""
    };

    db.qualityChecklist.push(newItem);
    saveDatabase(db);
    res.status(201).json({ success: true, message: "Checklist item added", item: newItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE checklist item
router.put('/checklist/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const item = db.qualityChecklist.find(i => i.id === req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "Checklist item not found" });

    const { inspectionStatus, inspector, testDate, linkedDefectId, remarks } = req.body;
    if (inspectionStatus) item.inspectionStatus = inspectionStatus;
    if (inspector) item.inspector = inspector;
    if (testDate) item.testDate = testDate;
    if (linkedDefectId !== undefined) item.linkedDefectId = linkedDefectId;
    if (remarks !== undefined) item.remarks = remarks;

    saveDatabase(db);
    res.json({ success: true, message: "Checklist inspection updated", item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ========================
// 3. RISK PRIORITIZATION MATRIX
// ========================

// GET risks
router.get('/risks', (req, res) => {
  try {
    const db = loadDatabase();
    const risks = (db.risks || []).map(r => {
      const score = Number(r.likelihood) * Number(r.impact);
      let severity = "Low";
      if (score >= 15) severity = "High";
      else if (score >= 8) severity = "Medium";
      return { ...r, score, severity };
    });

    // Sort by risk score descending
    risks.sort((a, b) => b.score - a.score);

    res.json({ success: true, risks });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADD risk
router.post('/risks', (req, res) => {
  try {
    const { riskId, description, category, likelihood, impact, mitigationPlan, owner } = req.body;
    if (!description || !likelihood || !impact) {
      return res.status(400).json({ success: false, error: "Description, likelihood (1-5), and impact (1-5) are required." });
    }

    const db = loadDatabase();
    const L = Math.max(1, Math.min(5, Number(likelihood)));
    const I = Math.max(1, Math.min(5, Number(impact)));
    const score = L * I;
    let severity = "Low";
    if (score >= 15) severity = "High";
    else if (score >= 8) severity = "Medium";

    const newId = `RSK-00${db.risks.length + 1}`;
    const newRisk = {
      id: newId,
      riskId: riskId || `R-${db.risks.length + 1}`,
      description,
      category: category || "Operational",
      likelihood: L,
      impact: I,
      score,
      severity,
      mitigationPlan: mitigationPlan || "",
      owner: owner || "Ahmed Khan",
      status: "Active"
    };

    db.risks.push(newRisk);
    saveDatabase(db);
    res.status(201).json({ success: true, message: "Risk logged", risk: newRisk });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE risk
router.put('/risks/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const risk = db.risks.find(r => r.id === req.params.id);
    if (!risk) return res.status(404).json({ success: false, error: "Risk not found" });

    const { description, category, likelihood, impact, mitigationPlan, owner, status } = req.body;
    if (description) risk.description = description;
    if (category) risk.category = category;
    if (likelihood !== undefined) risk.likelihood = Math.max(1, Math.min(5, Number(likelihood)));
    if (impact !== undefined) risk.impact = Math.max(1, Math.min(5, Number(impact)));
    risk.score = risk.likelihood * risk.impact;
    if (risk.score >= 15) risk.severity = "High";
    else if (risk.score >= 8) risk.severity = "Medium";
    else risk.severity = "Low";

    if (mitigationPlan !== undefined) risk.mitigationPlan = mitigationPlan;
    if (owner) risk.owner = owner;
    if (status) risk.status = status;

    saveDatabase(db);
    res.json({ success: true, message: "Risk updated", risk });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ========================
// 4. PROCESS DECISION PROGRAM CHART (PDPC)
// ========================

// GET PDPC items
router.get('/pdpc', (req, res) => {
  try {
    const db = loadDatabase();
    res.json({ success: true, pdpc: db.pdpc || [] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ADD PDPC item
router.post('/pdpc', (req, res) => {
  try {
    const { step, goal, potentialProblem, preventiveAction, contingencyPlan, feasibility } = req.body;
    if (!step || !goal || !potentialProblem) {
      return res.status(400).json({ success: false, error: "Step, goal, and potentialProblem are required." });
    }

    const db = loadDatabase();
    const newId = `PDPC-0${db.pdpc.length + 1}`;
    const newItem = {
      id: newId,
      step,
      goal,
      potentialProblem,
      preventiveAction: preventiveAction || "",
      contingencyPlan: contingencyPlan || "",
      feasibility: feasibility || "Approved"
    };

    db.pdpc.push(newItem);
    saveDatabase(db);
    res.status(201).json({ success: true, message: "PDPC item added", item: newItem });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE PDPC item
router.put('/pdpc/:id', (req, res) => {
  try {
    const db = loadDatabase();
    const item = db.pdpc.find(p => p.id === req.params.id);
    if (!item) return res.status(404).json({ success: false, error: "PDPC item not found" });

    const { step, goal, potentialProblem, preventiveAction, contingencyPlan, feasibility } = req.body;
    if (step) item.step = step;
    if (goal) item.goal = goal;
    if (potentialProblem) item.potentialProblem = potentialProblem;
    if (preventiveAction !== undefined) item.preventiveAction = preventiveAction;
    if (contingencyPlan !== undefined) item.contingencyPlan = contingencyPlan;
    if (feasibility) item.feasibility = feasibility;

    saveDatabase(db);
    res.json({ success: true, message: "PDPC item updated", item });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;

