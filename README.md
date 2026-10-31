# Smart Healthcare Project Management and Monitoring System
**Course:** Software Project Management (SPM)  
**Architecture:** MERN Stack (Node.js Express Backend + React Modern UI + Persistent Database)  
**Case Study:** Network of Five Hospitals (Central, City General, St. Jude Medical, Apex Health, Metro Clinic)

---

## 🌟 Executive Summary & Case Study Context

A software development company has contracted to build a multi-tenant hospital management system across **five network hospitals**. The system automates:
1. Patient appointment scheduling & slot conflict management
2. Clinical laboratory reports diagnostics & automated PDF distribution
3. Doctor rosters and OPD shift availability
4. Encrypted WebRTC online video teleconsultations
5. Unified hospital billing, insurance co-pay, and invoicing

### Baseline Constraints vs Scope Changes
| Metric | Baseline (Initial) | Scope Change Impact | Approved Current State |
| :--- | :--- | :--- | :--- |
| **Duration / Deadline** | 16 Weeks | +3 Weeks (2w AI + 1w Mobile) | **19 Weeks** |
| **Approved Budget** | PKR 5,000,000 | +PKR 800,000 (500k AI + 300k Mobile) | **PKR 5,800,000** |
| **Development Team** | 7 Members | Unchanged (Capacity constrained) | **7 Members** |
| **Scope Status** | Core 5 Modules | CR-001 (AI Diagnosis) & CR-002 (Mobile App) | **Integrated WBS 6.0 & 7.0** |
| **Quality Status** | Staged Testing | 2 Critical Defects (DEF-001 & DEF-002) | **Rework & Delay Ripple Tracked** |

### 7-Member Cross-Functional Development Team
1. **Ahmed Khan** — Project Manager (PMP)
2. **Ali Raza** — Backend Developer (Lead / Architecture)
3. **Bilal Tariq** — Backend Developer (APIs & Billing)
4. **Sara Ahmed** — Frontend Developer (Lead / Web Portals)
5. **Zainab Fatima** — Frontend Developer (UI/UX & Telehealth)
6. **Hamza Siddiqui** — Database Developer (Distributed Replication)
7. **Usman Farooq** — Quality Assurance Engineer (Test Automation & Inspections)

---

## 🚀 Quick Start Guide (How to Run)

The application is built to be simple, self-contained, and zero-headache.

### Prerequisites
- Node.js (v18+ or v20+)
- npm (v9+)

### Single-Command Launch (Backend & UI on a Single Port)
```bash
# From project root directory:
npm start
```
*Or double click:* **`run.bat`** (on Windows)

Open your browser at:
👉 **`http://localhost:5000/`** (Single-Port UI & REST API)

### Developer Mode (Separate Client & Server)
```bash
# Terminal 1 - Backend Server (Port 5000)
npm run server

# Terminal 2 - Frontend Dev Server (Port 5173 with proxy)
npm run client
```

### Run Verification Test Suite
```bash
npm test
```
Executes `server/test/spm.test.js`, running **9 comprehensive automated test cases** verifying EVM calculations, threshold breaches, Change Request budget and deadline propagation, scope containment, and schedule ripple effects.

---

## 📋 Comprehensive Module Breakdown (25 Marks)

### Module 1: Project Initiation and Integration Management (4 Marks)
- **Project Charter**: Formal charter containing Project Code (`SHP-2026`), sponsor (*Dr. Tariq Mansoor*), project manager (*Ahmed Khan*), 6 core clinical objectives, approved budget (PKR 5.0M -> 5.8M), and deadline (16w -> 19w).
- **Scope Boundaries**: Explicit enumeration of **In-Scope Deliverables** (5 core modules, multi-hospital DB sync) vs **Out-of-Scope Deliverables** (physical biometric hardware, pharmacy physical stock, external accreditation).
- **Project Management Plan**: Formal sub-plans covering Scope, Schedule, Cost, and Quality management protocols.
- **RACI Matrix**: 5-role Responsibility Assignment Matrix (Accountable, Responsible, Consulted, Informed) across all project deliverables.
- **Milestones**: Tracking milestones M1 through M5 with status, target weeks, and actual completion records.
- **Project Closure Records**: Formal closure plan covering deliverables acceptance sign-off, financial audit reconciliation, and concurrency lessons learned.

### Module 2: Scope Management and Work Breakdown Structure (WBS) (4 Marks)
- **Requirements Management**: Requirements traceability register categorized by module, priority (High/Medium/Low), estimated costs, and durations.
- **Scope Containment Rule**: Enforces that **unapproved requirements cannot enter the approved project scope** (`inApprovedScope: false`). Newly added requirements remain isolated in `Pending` status.
- **Hierarchical WBS**: Multi-level decomposition of deliverables (Level 1) into work packages (Level 2) with assigned budgets, WBS codes (1.0 to 5.0), and progress percentages.
- **Change Request (CR) Mechanism**:
  - **CR-001**: AI-Based Preliminary Diagnosis Module (+PKR 500,000, +2 weeks).
  - **CR-002**: Cross-Platform Mobile Application (+PKR 300,000, +1 week).
- **Dynamic Scope Impact Demonstration**: When a Change Request is approved:
  1. The project budget increases dynamically (PKR 5,000,000 -> PKR 5,800,000).
  2. The project deadline extends dynamically (16 weeks -> 19 weeks).
  3. The requirement transitions from `Pending` to `Approved` (`inApprovedScope: true`).
  4. New WBS Deliverables (`WBS-6.0` AI Diagnosis and `WBS-7.0` Mobile App) and child work packages are automatically generated and linked.
  5. Schedule activities (`ACT-11` and `ACT-12`) are dynamically added to the Gantt timeline.

### Module 3: Schedule and Resource Management (5 Marks)
- **Activity Sequencing & Durations**: Detailed activity definitions with assigned personnel, duration in weeks, scheduled start and end weeks, and planned costs.
- **Dependency Network**: Precedence relationships specifying prerequisite predecessor tasks (e.g., ACT-04 depends on ACT-02 and ACT-03).
- **Delay Identification & Ripple Effect**:
  - Automatically identifies delayed activities (e.g., **ACT-09 System Testing & Defect Remediation** is delayed by +2 weeks due to critical defects).
  - Calculates the **dependency ripple effect**: successor **ACT-10 (5-Hospital Network Deployment)** is pushed from Week 14 to Week 16, resulting in a forecasted project completion of **Week 18**.
- **Interactive Gantt Timeline**: Visual timeline rendering across weeks 1 to 19 with color-coded task states (Completed, In Progress, Delayed, Change Request), duration bars, percentage fills, and a vertical indicator for the current project week (**Week 12**).
- **Resource Workload Matrix**: Workload and capacity tracking for all 7 team members to identify resource bottlenecks.

### Module 4: Cost Management and Earned Value Analysis (EVM) (5 Marks)
- **Activity Cost Estimates**: Planned cost allocated for every WBS work package and activity.
- **Actual Cost Ledger**: Real-time tracking of actual expenditures incurred to date, with editable fields to demonstrate live recalculations.
- **Programmatic EVM Indicators**:
  - **Planned Value (PV)**: Budgeted cost of work scheduled up to Week 12.
  - **Earned Value (EV)**: Budgeted cost of work physically completed to date ($EV = \% \text{Progress} \times \text{BAC}$).
  - **Actual Cost (AC)**: Total expenditures incurred.
  - **Cost Performance Index (CPI)**: $CPI = \frac{EV}{AC}$.
  - **Schedule Performance Index (SPI)**: $SPI = \frac{EV}{PV}$.
  - **Cost Variance (CV)**: $CV = EV - AC$.
  - **Schedule Variance (SV)**: $SV = EV - PV$.
  - **Estimate at Completion (EAC)**: $EAC = \frac{BAC}{CPI}$.
  - **Variance at Completion (VAC)**: $VAC = BAC - EAC$.
- **Automated Threshold Warnings**:
  - **Cost Overrun Alert**: Automatically triggers when $CPI < 1.0$, displaying forecasted overspend and variance.
  - **Schedule Delay Alert**: Automatically triggers when $SPI < 1.0$, displaying velocity and schedule slippage.
  - **Budget Exceeded Alert**: Automatically triggers if $AC > BAC$.

### Module 5: Quality Management and Risk Control (4 Marks)
- **Defect Tracking Module**: Records defects with unique IDs, module, severity (*Critical*, *Major*, *Minor*, *Cosmetic*), assigned personnel, reproduction steps, and resolution notes:
  - **DEF-001**: Concurrent Booking Race Condition in Appointment Scheduling (Critical — Open).
  - **DEF-002**: Patient EMR Sync Failure Across Remote Hospital Nodes (Critical — In Progress).
  - **DEF-003**: Laboratory PDF Report Formatting Misalignment (Minor — Resolved).
  - **DEF-004**: Co-Pay Calculation Rounding Error (Major — In Progress).
- **Deliverables Quality Checklist**: Formal inspection register with criteria, QA inspector, test dates, linked defect IDs, and clickable Pass/Fail/Pending status badges.
- **5x5 Risk Prioritization Matrix**:
  - Evaluates Likelihood ($1-5$) $\times$ Impact ($1-5$) to compute Risk Score ($1-25$).
  - Color-coded zones: **Red** (High: 15-25), **Yellow** (Medium: 8-14), **Green** (Low: 1-7).
  - Prioritizes top risks: Appointment double-booking ($5 \times 5 = 25$), Distributed sync drop ($4 \times 5 = 20$), Scope creep ($5 \times 4 = 20$).
- **Process Decision Program Chart (PDPC)**: Structured Quality Tree mapping:
  $$\text{Process Goal} \longrightarrow \text{Potential Problem} \longrightarrow \text{Preventive Action} \longrightarrow \text{Contingency Plan} \longrightarrow \text{Feasibility}$$

### Module 6: System Integration, Validation, and Reporting (3 Marks)
- **Single-Page Reactive Dashboard**: High-level executive dashboard synthesizing KPIs, active threshold warnings, critical defects, delayed tasks, and milestone progression.
- **Persistent Database Engine**: All modifications, additions, and status changes persist on disk in `./server/data/db.json` across server restarts.
- **One-Click Case Study Demo**: "Apply Scope Change" button instantly demonstrates the approval of CR-001 & CR-002 and displays how the budget, schedule, WBS, and EVM react dynamically.
- **Reset to Baseline**: "Reset" button restores the initial 16-week, PKR 5,000,000 starting state for fresh demonstrations.
- **Printable Executive Status Report**: Formal printable layout (`window.print()`) with stakeholder sign-off blocks.

---

## 🧪 Test Cases (Automated Verification)

Run the test suite:
```bash
node server/test/spm.test.js
```

### Verified Test Cases:
| Test ID | Test Description | Expected Result | Result |
| :--- | :--- | :--- | :--- |
| **TC-01** | Project Charter baseline initialization | Budget = 5,000,000 PKR, Deadline = 16 weeks | **PASS** |
| **TC-02** | Programmatic EVM calculation | PV, EV, AC, CPI, SPI calculated mathematically | **PASS** |
| **TC-03** | Automated EVM threshold warning detection | Triggers Cost Overrun (CPI < 1.0) and Schedule Delay (SPI < 1.0) | **PASS** |
| **TC-04** | Scope Containment verification | REQ-007 (AI) and REQ-008 (Mobile) initial status = Pending, inApprovedScope = false | **PASS** |
| **TC-05** | CR-001 Approval workflow | Budget increases to 5.5M PKR, Deadline to 18 weeks, WBS 6.0 generated | **PASS** |
| **TC-06** | CR-002 Approval workflow | Budget increases to 5.8M PKR, Deadline to 19 weeks, WBS 7.0 generated | **PASS** |
| **TC-07** | Schedule delay ripple effect | ACT-09 delay (+2w) shifts successor ACT-10 forward | **PASS** |
| **TC-08** | Critical defect tracking verification | DEF-001 (Appointments) and DEF-002 (DB Sync) properly recorded with Critical severity | **PASS** |
| **TC-09** | Quality checklist and 5x5 Risk Matrix | Deliverables inspection passes/fails tracked, high risks correctly classified | **PASS** |

---

## 📂 Project Architecture

```
SPM MID LAB/
├── server/
│   ├── data/
│   │   ├── initialData.js      # Seed data matching the Case Study specifications
│   │   └── db.json             # Persistent database storage on disk
│   ├── routes/
│   │   ├── charter.js          # Module 1: Project Charter & Integration
│   │   ├── scope.js            # Module 2: Requirements, WBS & Change Requests
│   │   ├── schedule.js         # Module 3: Activities, Gantt & Dependencies
│   │   ├── cost.js             # Module 4: EVM Indicators & Cost Breakdown
│   │   ├── quality.js          # Module 5: Defects, Checklist, Risk Matrix & PDPC
│   │   └── dashboard.js        # Module 6: Executive Synthesis & Reset
│   ├── test/
│   │   └── spm.test.js         # 9 Automated verification test cases
│   ├── db.js                   # EVM mathematical engine & persistent storage
│   ├── server.js               # Express API and static app server
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Header, consortium badge, quick action pills
│   │   │   ├── DashboardView.jsx   # Module 6: Executive KPIs & live alerts
│   │   │   ├── InitiationView.jsx  # Module 1: Charter, Management Plan, RACI
│   │   │   ├── ScopeView.jsx       # Module 2: Requirements, WBS & Change Requests
│   │   │   ├── ScheduleView.jsx    # Module 3: Gantt timeline & delay ripple effect
│   │   │   ├── CostEVMView.jsx     # Module 4: EVM calculation & threshold warnings
│   │   │   ├── QualityRiskView.jsx # Module 5: Defects, Checklist, 5x5 Matrix, PDPC
│   │   │   └── ReportModal.jsx     # Printable formal executive status report
│   │   ├── api.js                  # Frontend API client
│   │   ├── App.jsx                 # Main application layout & global state
│   │   ├── index.css
│   │   └── main.jsx
│   ├── dist/                   # Production build for single-port deployment
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json                # Root package configuration
├── start.js                    # Node.js launcher
├── run.bat                     # Windows batch launch script
└── README.md                   # Full documentation & grading guide
```

---
*Smart Healthcare Project Management and Monitoring System — Completed for SPM Mid Lab Examination.*

