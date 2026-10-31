// client/src/api.js
const API_BASE = '/api';

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE}/dashboard`);
  return res.json();
}

export async function resetDatabase() {
  const res = await fetch(`${API_BASE}/dashboard/reset`, { method: 'POST' });
  return res.json();
}

// Module 1: Charter
export async function fetchCharter() {
  const res = await fetch(`${API_BASE}/charter`);
  return res.json();
}

export async function updateCharter(data) {
  const res = await fetch(`${API_BASE}/charter`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateMilestone(id, data) {
  const res = await fetch(`${API_BASE}/charter/milestones/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

// Module 2: Scope & WBS & Change Requests
export async function fetchRequirements() {
  const res = await fetch(`${API_BASE}/scope/requirements`);
  return res.json();
}

export async function createRequirement(data) {
  const res = await fetch(`${API_BASE}/scope/requirements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateRequirement(id, data) {
  const res = await fetch(`${API_BASE}/scope/requirements/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function deleteRequirement(id) {
  const res = await fetch(`${API_BASE}/scope/requirements/${id}`, { method: 'DELETE' });
  return res.json();
}

export async function fetchWBS() {
  const res = await fetch(`${API_BASE}/scope/wbs`);
  return res.json();
}

export async function createWBSItem(data) {
  const res = await fetch(`${API_BASE}/scope/wbs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchChangeRequests() {
  const res = await fetch(`${API_BASE}/scope/change-requests`);
  return res.json();
}

export async function createChangeRequest(data) {
  const res = await fetch(`${API_BASE}/scope/change-requests`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function approveChangeRequest(id) {
  const res = await fetch(`${API_BASE}/scope/change-requests/${id}/approve`, { method: 'POST' });
  return res.json();
}

export async function rejectChangeRequest(id, reason) {
  const res = await fetch(`${API_BASE}/scope/change-requests/${id}/reject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ reason })
  });
  return res.json();
}

// Module 3: Schedule & Resources
export async function fetchActivities() {
  const res = await fetch(`${API_BASE}/schedule/activities`);
  return res.json();
}

export async function createActivity(data) {
  const res = await fetch(`${API_BASE}/schedule/activities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateActivity(id, data) {
  const res = await fetch(`${API_BASE}/schedule/activities/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchTeam() {
  const res = await fetch(`${API_BASE}/schedule/team`);
  return res.json();
}

// Module 4: Cost & EVM
export async function fetchEVM() {
  const res = await fetch(`${API_BASE}/cost/evm`);
  return res.json();
}

export async function fetchCostBreakdown() {
  const res = await fetch(`${API_BASE}/cost/breakdown`);
  return res.json();
}

// Module 5: Quality & Risks
export async function fetchDefects() {
  const res = await fetch(`${API_BASE}/quality/defects`);
  return res.json();
}

export async function createDefect(data) {
  const res = await fetch(`${API_BASE}/quality/defects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function updateDefect(id, data) {
  const res = await fetch(`${API_BASE}/quality/defects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchChecklist() {
  const res = await fetch(`${API_BASE}/quality/checklist`);
  return res.json();
}

export async function updateChecklistItem(id, data) {
  const res = await fetch(`${API_BASE}/quality/checklist/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchRisks() {
  const res = await fetch(`${API_BASE}/quality/risks`);
  return res.json();
}

export async function createRisk(data) {
  const res = await fetch(`${API_BASE}/quality/risks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchPDPC() {
  const res = await fetch(`${API_BASE}/quality/pdpc`);
  return res.json();
}

export async function createPDPC(data) {
  const res = await fetch(`${API_BASE}/quality/pdpc`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

