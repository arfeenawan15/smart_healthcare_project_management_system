# COMSATS UNIVERSITY ISLAMABAD, SAHIWAL CAMPUS
## DEPARTMENT OF SOFTWARE ENGINEERING

---

# SOFTWARE PROJECT MANAGEMENT PLAN & SYSTEM REPORT
### **SMART HEALTHCARE PROJECT MANAGEMENT AND MONITORING SYSTEM**
#### *A Comprehensive 5-Hospital Network Project Management Solution*

---

**Submitted by:**  
**M. Anwar ul Arfeen (Qazi Arfeen Awan)**  
Registration #: **FA23-BSE-097**  
Program: **Bachelor of Science in Software Engineering (BSSE)**  
Semester: **7th Semester**  
Course: **Software Project Management (CSE-494)**  

**Submitted to:**  
**Sir Bilal Shabbir Qaisar**  
Department of Software Engineering  
COMSATS University Islamabad, Sahiwal Campus  

**Date of Submission:** October 2026  

---

### **Official Project Links & Verification**
- **GitHub Source Code Repository:** [https://github.com/arfeenawan15/smart_healthcare_project_management_system](https://github.com/arfeenawan15/smart_healthcare_project_management_system)
- **Live Cloud Deployment (Vercel):** [https://smart-healthcare-project-management.vercel.app/](https://smart-healthcare-project-management.vercel.app/)
- **Technology Stack:** React 19, Vite, Tailwind CSS, Lucide Icons, Node.js, Express 5, Persistent JSON Store, In-Browser LocalStorage Sync
- **System Maturity:** 100% Core Modules Implemented (6/6 Modules + 9/9 Automated Tests Passing)

---

## TABLE OF CONTENTS

1. [CHAPTER 1: INTRODUCTION](#chapter-1-introduction)
   - 1.1 [Background & Motivation](#11-background--motivation)
   - 1.2 [Case Study: 5-Hospital Regional Network](#12-case-study-5-hospital-regional-network)
   - 1.3 [Project Objectives](#13-project-objectives)
   - 1.4 [Mapping of Assignment Modules](#14-mapping-of-assignment-modules)
   - 1.5 [Organization of the Report](#15-organization-of-the-report)
2. [CHAPTER 2: PROJECT PLANNING](#chapter-2-project-planning)
   - 2.1 [Project Scope Management](#21-project-scope-management)
   - 2.2 [Timeline, Milestones & Critical Path](#22-timeline-milestones--critical-path)
   - 2.3 [Project Resources & Team Organization](#23-project-resources--team-organization)
   - 2.4 [Budget & Cost Plan](#24-budget--cost-plan)
   - 2.5 [Quality & Risk Planning](#25-quality--risk-planning)
   - 2.6 [Change Control Plan](#26-change-control-plan)
   - 2.7 [Assumptions & Constraints](#27-assumptions--constraints)
3. [CHAPTER 3: SYSTEM DESIGN AND ARCHITECTURE](#chapter-3-system-design-and-architecture)
   - 3.1 [Technology Stack](#31-technology-stack)
   - 3.2 [Three-Tier System Architecture](#32-three-tier-system-architecture)
   - 3.3 [Database Design & Entity Relationship Diagram (ERD)](#33-database-design--entity-relationship-diagram-erd)
   - 3.4 [Class & Service Architecture Diagram](#34-class--service-architecture-diagram)
   - 3.5 [Database Schema Specifications](#35-database-schema-specifications)
   - 3.6 [User Interface Design (Modern Left-Sidebar Layout)](#36-user-interface-design-modern-left-sidebar-layout)
   - 3.7 [Module Implementation Maturity & Audit](#37-module-implementation-maturity--audit)
4. [CHAPTER 4: IMPLEMENTATION PHASE](#chapter-4-implementation-phase)
   - 4.1 [Source Code Repository & Project Structure](#41-source-code-repository--project-structure)
   - 4.2 [Executive Dashboard Implementation](#42-executive-dashboard-implementation)
   - 4.3 [Task Status & Work Tracking Implementation](#43-task-status--work-tracking-implementation)
5. [CHAPTER 5: CORE ALGORITHMS & SOURCE CODE](#chapter-5-core-algorithms--source-code)
   - 5.1 [Earned Value Management (EVM) Engine](#51-earned-value-management-evm-engine)
   - 5.2 [Schedule Delay & Ripple Effect Propagation Engine](#52-schedule-delay--ripple-effect-propagation-engine)
   - 5.3 [Change Request Approval & Baseline Mutation Workflow](#53-change-request-approval--baseline-mutation-workflow)
6. [CHAPTER 6: TESTING AND VERIFICATION](#chapter-6-testing-and-verification)
   - 6.1 [Automated Backend Test Suite Execution](#61-automated-backend-test-suite-execution)
   - 6.2 [Detailed Test Cases & Verification Results](#62-detailed-test-cases--verification-results)
   - 6.3 [In-Browser Real-Time Formula Validation](#63-in-browser-real-time-formula-validation)
   - 6.4 [Verification of Learning Outcomes](#64-verification-of-learning-outcomes)
7. [CHAPTER 7: PROJECT CLOSURE, DEPLOYMENT & CONCLUSION](#chapter-7-project-closure-deployment--conclusion)
   - 7.1 [Project Closure Criteria & Status](#71-project-closure-criteria--status)
   - 7.2 [Lessons Learned & Best Practices](#72-lessons-learned--best-practices)
   - 7.3 [Production Cloud Deployment (Vercel)](#73-production-cloud-deployment-vercel)
   - 7.4 [Conclusion & Future Work](#74-conclusion--future-work)
   - 7.5 [References](#75-references)

---

## LIST OF FIGURES
- **Figure 3.1:** MERN Stack System Architecture (3-Tier Layered Architecture)
- **Figure 3.2 1:** Entity Relationship Diagram (ERD) of the SPM System (13 Normalized Collections)
- **Figure 3.2 2:** Class & Service Architecture Diagram (Object-Oriented Design)
- **Figure 3.6 1:** Executive Dashboard Interface (KPI Cards, Real-time Warnings, Left Sidebar)
- **Figure 3.6 2:** Project Initiation & Charter Interface (Governance & Objectives)
- **Figure 3.6 3:** Hospital Stakeholders Directory (5 Regional Hospitals)
- **Figure 3.6 4:** Scope Management & WBS Interface (Deliverables & Dictionary)
- **Figure 3.6 5:** Work Breakdown Structure Hierarchy & Progress Tracker
- **Figure 3.6 6:** Schedule & Gantt Chart Interface (Activity Timeline & Dependencies)
- **Figure 3.6 7:** Predecessor Delay Ripple Effect Demonstration
- **Figure 3.6 8:** Team Workload & Resource Allocation Distribution
- **Figure 3.6 9:** Cost Management & Earned Value Management (EVM) Interface
- **Figure 3.6 10:** Quality Management & 5x5 Probability-Impact Risk Matrix
- **Figure 3.6 11:** Defect Tracker Log & Deliverable Verification Checklist
- **Figure 4.1:** Monorepo Project Structure & Folder Organization
- **Figure 4.2:** Executive Dashboard Implementation View
- **Figure 4.3:** Project Task & Predecessor Management View
- **Figure 5.1:** Mathematical EVM Calculation Engine Execution ($CPI$, $SPI$, $CV$, $SV$)
- **Figure 5.2:** Schedule Ripple Delay Calculation Logic Execution
- **Figure 5.3:** Change Request Atomic Approval Workflow Execution
- **Figure 6.1:** Automated Backend Test Suite Terminal Output (9/9 Passed 100%)
- **Figure 7.1:** Production Application Deployed Live on Vercel Cloud Platform

---

## LIST OF TABLES
- **Table 1.1:** Mapping of Assignment Modules to System Modules
- **Table 2.1:** Smart Healthcare Project Requirements (Functional & Non-Functional)
- **Table 2.2:** Project Schedule Activities, Predecessors & Durations
- **Table 2.3:** Project Milestones & Target Delivery Dates
- **Table 2.4:** Project Team Roles, Headcount & Responsibilities
- **Table 2.5:** Project Budget Allocation & Cost Breakdown (PKR)
- **Table 2.6:** Quality Standards & Risk Management Matrix
- **Table 3.1:** Comprehensive Technology Stack Specification
- **Table 3.2:** Main Database Collections & Structural Purposes
- **Table 3.3:** SPM Assignment Requirements vs. Implemented Capabilities (100% Verified)
- **Tables 6.1 - 6.9:** Automated Test Cases 1 through 9 Verification Records

---

# CHAPTER 1: INTRODUCTION

### 1.1 Background & Motivation
Software Project Management (SPM) is the indispensable discipline that governs the lifecycle of complex software development endeavors. Through systematic planning, real-time monitoring, disciplined resource allocation, quality assurance, and change control, project managers ensure that software products are delivered on time, within approved budgets, and to the rigorous specifications demanded by stakeholders. In safety-critical sectors—most notably healthcare—the failure to properly manage software projects leads not only to financial loss and operational disruption but directly impacts patient health outcomes and hospital efficiency.

The **Smart Healthcare Project Management and Monitoring System** is an enterprise-grade web application engineered specifically to plan, execute, control, and close a multi-facility healthcare software deployment. Unlike traditional educational prototypes that only display static forms or theoretical mockups, this system implements active mathematical algorithms for:
1. **Earned Value Management (EVM)** to continuously track cost and schedule health ($CPI$, $SPI$, $CV$, $SV$, $EAC$, $VAC$).
2. **Dynamic Predecessor Dependency Propagation** to calculate the ripple effect of task delays on project completion dates.
3. **Formal Scope Change Control** allowing atomic baseline revision (budget expansion and schedule adjustments).
4. **Comprehensive Quality & Defect Tracking** paired with a formal 5x5 Risk Matrix.

The system is developed using the modern full-stack **MERN architecture**: **React 19**, **Vite**, and **Tailwind CSS** for the presentation layer; **Node.js** and **Express 5** for REST API services; and a persistent JSON document database (with dual-mode in-browser offline LocalStorage synchronization) ensuring maximum reliability across both server and serverless environments.

---

### 1.2 Case Study: 5-Hospital Regional Network
This project plan addresses a regional healthcare organization deploying a centralized **Smart Healthcare Management System** across five major hospital facilities:
1. **City Hospital, Lahore** (Regional Hub / Level 1 Trauma Center)
2. **General Hospital, Karachi** (Outpatient & Specialized Surgery Center)
3. **Memorial Hospital, Islamabad** (Pediatric & Maternity Center)
4. **Allied Hospital, Multan** (Diagnostic, Pathology & Lab Center)
5. **Civil Hospital, Faisalabad** (Emergency & Critical Care Facility)

#### **Project Baseline Constraints:**
- **Initial Duration:** 16 Weeks (Weeks 1 to 16)
- **Initial Budget:** PKR 5,000,000 (PKR 5.0 Million)
- **Initial Core Scope:** Patient Appointment Scheduling, Electronic Lab Reports, Doctor Rostering & Scheduling, Online Video Consultations, and Centralized Billing & Invoicing.
- **Project Team:** 7 dedicated engineering personnel (1 Project Manager, 2 Backend Developers, 2 Frontend Developers, 1 Database Engineer, 1 Quality Assurance Lead).

#### **Case Study Scope Changes & Defect Dynamics:**
During project execution at Week 8:
- **Change Request 1 (CR-001):** Hospital management requested an **AI-Based Preliminary Symptom Checker & Diagnosis Engine** to triage incoming emergency cases. Impact: **+PKR 500,000 budget**, **+2 weeks duration**.
- **Change Request 2 (CR-002):** A requirement emerged for a **Cross-Platform Mobile Application** (iOS & Android) for remote patient consultations. Impact: **+PKR 300,000 budget**, **+1 week duration**.
- **Revised Baseline upon CCB Approval:** **PKR 5,800,000 budget** and **19 weeks timeline**.
- **Quality Incidents:** Real-world defects were detected during integration testing:
  - *DEF-001:* Concurrent double-booking of doctor appointment slots across Lahore and Multan facilities (Critical Severity).
  - *DEF-002:* Patient National Identity Number (CNIC) duplication occurring during cross-hospital record synchronization (Critical Severity).

The system successfully simulates, manages, and resolves these exact case study conditions.

---

### 1.3 Project Objectives
The primary engineering objectives of the Smart Healthcare SPM system are:
1. **Centralized Integration Management:** Provide an executive portal maintaining the Project Charter, 5-hospital stakeholder registry, and governance framework.
2. **Rigorous Scope Management:** Implement a 3-level Work Breakdown Structure (WBS), WBS Dictionary, and scope containment verification to prevent unauthorized scope creep.
3. **Algorithmic Schedule Control:** Provide interactive Gantt chart tracking, critical path indicators, and dynamic predecessor delay ripple recalculation.
4. **Mathematical Cost & EVM Engine:** Compute real-time $PV$, $EV$, $AC$, $CPI$, $SPI$, $CV$, $SV$, $EAC$, and $VAC$, issuing immediate visual alerts when thresholds ($CPI < 1.0$ or $SPI < 1.0$) are breached.
5. **Quality Assurance & Defect Management:** Track defect lifecycles from logging through root-cause analysis to resolution, paired with a deliverable quality verification checklist.
6. **Quantitative Risk Management:** Provide a dynamic 5x5 Probability-Impact matrix with automated severity scoring ($P \times I$) and actionable mitigation protocols.
7. **Change Control Automation:** Enable formal submission, impact assessment, and atomic approval of Change Requests that dynamically update system baselines.

---

### 1.4 Mapping of Assignment Modules
The project architecture strictly implements all required modules of the SPM midterm syllabus:

**Table 1.1: Mapping of Assignment Modules to System Modules**
| Assignment Module | Implemented System Feature | Primary View / Route | Implementation Status |
| :--- | :--- | :--- | :--- |
| **Module 1: Project Initiation & Charter** | Project Charter, Governance, 5-Hospital Stakeholders Directory | Initiation View (`/api/charter`) | **100% Implemented & Verified** |
| **Module 2: Scope Management & WBS** | 3-Level WBS Tree, WBS Dictionary, Scope Containment, Progress | Scope View (`/api/scope`) | **100% Implemented & Verified** |
| **Module 3: Schedule & Gantt Chart** | Gantt Visualization, Predecessors, Delay Ripple Engine, Milestones | Schedule View (`/api/schedule`) | **100% Implemented & Verified** |
| **Module 4: Resource Management** | 7 Dedicated Roles, Workload Distribution, Team Task Mapping | Schedule & Charter Views | **100% Implemented & Verified** |
| **Module 5: Cost Management & EVM** | EVM Engine ($CPI, SPI, EAC$), Cost Variances, Budget Breakdown | Cost & EVM View (`/api/cost`) | **100% Implemented & Verified** |
| **Module 6: Quality & Risk Control** | 5x5 Risk Matrix, Defect Tracker, Deliverable Checklist, PDPC | Quality & Risk View (`/api/quality`) | **100% Implemented & Verified** |
| **Module 7: Executive Dashboard** | Unified Health KPIs, Alert Callouts, Phase Progress, Quick CR Approval | Dashboard View (`/api/dashboard`) | **100% Implemented & Verified** |

---

### 1.5 Organization of the Report
The remainder of this report is organized into six technical chapters:
- **Chapter 2 (Project Planning)** details requirements, schedule activities, resource allocations, budget plans, risk assessments, and change control procedures.
- **Chapter 3 (System Design & Architecture)** presents the MERN stack architecture, ERD, class diagram, database specifications, and the newly refactored left-sidebar UI layout.
- **Chapter 4 (Implementation Phase)** explains the monorepo codebase, directory organization, and frontend/backend integration.
- **Chapter 5 (Core Algorithms & Source Code)** details the mathematical formulas and JavaScript code for EVM calculations, schedule ripple effects, and change approval.
- **Chapter 6 (Testing & Verification)** documents the automated backend test harness, presenting 9 verified test cases passing with a 100% success rate.
- **Chapter 7 (Project Closure, Deployment & Conclusion)** provides the closure audit, lessons learned, live Vercel deployment verification, and project conclusions.

---

# CHAPTER 2: PROJECT PLANNING

### 2.1 Project Scope Management
Project scope definition establishes the boundaries of what is included—and explicitly excluded—from the project baseline. The scope is decomposed into 14 distinct functional and non-functional requirements mapped across the five hospital sites:

**Table 2.1: Healthcare Project Requirements**
| Req ID | Requirement Description | Category | Target Hospital Site | Baseline Status |
| :--- | :--- | :--- | :--- | :--- |
| **REQ-001** | Multi-hospital patient registration & master patient indexing | Functional | All 5 Hospitals | Approved Baseline |
| **REQ-002** | Real-time doctor appointment booking & conflict prevention | Functional | Lahore, Karachi, Islamabad | Approved Baseline |
| **REQ-003** | Laboratory diagnostic report generation & PDF secure dispatch | Functional | Multan, Lahore | Approved Baseline |
| **REQ-004** | Telemedicine video consultation portal with WebRTC | Functional | Karachi, Islamabad | Approved Baseline |
| **REQ-005** | Hospital billing, invoicing & national insurance integration | Functional | All 5 Hospitals | Approved Baseline |
| **REQ-006** | Role-based access control (RBAC) & HIPAA/HL7 compliance | Non-Functional | All 5 Hospitals | Approved Baseline |
| **REQ-007** | AI-Based Symptom Checker & Triage Diagnosis Engine | Functional (CR-001) | Emergency Facilities | *Scope Change (Approved)* |
| **REQ-008** | Native iOS & Android Patient Mobile Application | Functional (CR-002) | All 5 Hospitals | *Scope Change (Approved)* |
| **REQ-009** | Sub-second database query performance under peak load | Non-Functional | All 5 Hospitals | Approved Baseline |
| **REQ-010** | End-to-end TLS 1.3 data encryption for patient PHI records | Non-Functional | All 5 Hospitals | Approved Baseline |

---

### 2.2 Timeline, Milestones & Critical Path
The project execution timeline is broken into sequential development phases spanning 16 weeks baseline, expanding to 19 weeks upon approval of CR-001 and CR-002.

**Table 2.2: Project Schedule Activities, Predecessors & Durations**
| Activity ID | Activity Title | Planned Duration | Start Week | End Week | Predecessor ID | Assigned Role |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ACT-01** | Requirement Elicitation & Stakeholder Sign-off | 2 Weeks | Week 1 | Week 2 | None | Project Manager |
| **ACT-02** | System Architecture & Database Design | 2 Weeks | Week 3 | Week 4 | ACT-01 | Database Developer |
| **ACT-03** | Core Authentication, RBAC & API Framework | 3 Weeks | Week 5 | Week 7 | ACT-02 | Backend Developer 1 |
| **ACT-04** | Hospital Modules Development (EHR, Lab, Billing) | 4 Weeks | Week 8 | Week 11 | ACT-03 | Full Dev Team |
| **ACT-05** | AI Diagnosis Engine Integration (CR-001) | 2 Weeks | Week 12 | Week 13 | ACT-04 | Backend Developer 2 |
| **ACT-06** | Mobile App Development & API Sync (CR-002) | 2 Weeks | Week 13 | Week 14 | ACT-04 | Frontend Developer 2 |
| **ACT-07** | Integration, Penetration & Performance Testing | 3 Weeks | Week 15 | Week 17 | ACT-05, ACT-06 | QA Lead |
| **ACT-08** | Multi-Hospital User Training & Clinical Go-Live | 2 Weeks | Week 18 | Week 19 | ACT-07 | Project Manager |

**Table 2.3: Project Milestones & Target Delivery Dates**
| Milestone ID | Milestone Description | Target Week | Actual / Revised Week | Completion Status |
| :--- | :--- | :--- | :--- | :--- |
| **M1** | Project Charter & Scope Baseline Formally Approved | Week 2 | Week 2 | **Completed** |
| **M2** | System Architecture, ERD & DB Schema Approved | Week 4 | Week 4 | **Completed** |
| **M3** | Core Hospital API & EHR Engine Operational | Week 8 | Week 8 | **Completed** |
| **M4** | Hospital Subsystems Integration Complete | Week 12 | Week 12 | **Completed** |
| **M5** | System Integration, Security & Performance Verified | Week 17 | Week 17 | **In Progress** |
| **M6** | Final Multi-Hospital Clinical Go-Live & Project Sign-Off | Week 19 | Week 19 | **Scheduled** |

---

### 2.3 Project Resources & Team Organization
A high-performance multidisciplinary engineering team of seven specialists was assembled to deliver the system:

**Table 2.4: Project Team Roles, Headcount & Responsibilities**
| Team Member / Role | Headcount | Primary SPM Responsibilities | Weekly Rate (PKR) |
| :--- | :--- | :--- | :--- |
| **Project Manager (Ahmed Khan)** | 1 | Integration management, schedule tracking, EVM control, CCB chair | PKR 100,000 |
| **Senior Backend Developer** | 1 | Express REST API, authentication, EHR core engine, transactional logic | PKR 85,000 |
| **Junior Backend Developer** | 1 | External lab integrations, AI service connector, billing modules | PKR 65,000 |
| **Senior Frontend Developer** | 1 | React 19 architecture, left-sidebar navigation layout, state management | PKR 80,000 |
| **Junior Frontend Developer** | 1 | Form validation, responsive layouts, data table visualizations | PKR 60,000 |
| **Database Architect** | 1 | Relational JSON schema design, indexing, data normalization, backup | PKR 75,000 |
| **QA & Security Engineer** | 1 | Automated test authoring, defect tracking, penetration testing | PKR 70,000 |

---

### 2.4 Budget & Cost Plan
The initial project baseline budget was calculated using bottom-up estimation at **PKR 5,000,000**. Following the formal approval of Change Requests CR-001 (PKR 500,000) and CR-002 (PKR 300,000), the revised baseline budget was established at **PKR 5,800,000**.

**Table 2.5: Project Budget Allocation & Cost Breakdown (PKR)**
| Cost Category | Baseline Budget (PKR) | Spent at W8 (PKR) | Approved CRs (PKR) | Revised Budget (PKR) | Variance (CV) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Software Development Labor** | 2,800,000 | 1,600,000 | +500,000 | 3,300,000 | -150,000 |
| **Cloud Hosting & Server Infrastructure** | 600,000 | 350,000 | +100,000 | 700,000 | -50,000 |
| **Quality Assurance & Security Audits** | 500,000 | 250,000 | +100,000 | 600,000 | 0 |
| **Hardware & Clinical Testing Devices** | 400,000 | 250,000 | +50,000 | 450,000 | -50,000 |
| **Staff Training & Deployment Logistics** | 300,000 | 50,000 | +50,000 | 350,000 | 0 |
| **Management Contingency Reserve** | 400,000 | 100,000 | 0 | 400,000 | 0 |
| **TOTAL PROJECT BUDGET** | **5,000,000** | **2,600,000** | **+800,000** | **5,800,000** | **-250,000** |

---

### 2.5 Quality & Risk Planning
Software quality in healthcare requires zero-tolerance for data corruption and scheduling collisions. A formal 5x5 Probability-Impact matrix is utilized:

$$\text{Severity Score} = \text{Probability} (1\text{ to }5) \times \text{Impact} (1\text{ to }5)$$

**Table 2.6: Quality Standards & Risk Management Matrix**
| Risk ID | Risk Description | Category | Prob (1-5) | Impact (1-5) | Severity Score | Planned Mitigation Strategy |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | Concurrent appointment double-booking in clinic | Quality | 4 | 5 | **20 (High)** | Implement database-level row locking & atomic reservation |
| **RSK-02** | Patient CNIC duplication across regional hospitals | Data Integrity | 3 | 5 | **15 (High)** | Master Patient Index (MPI) with unique CNIC hash indexes |
| **RSK-03** | Scope creep from hospital medical directors | Scope | 4 | 4 | **16 (High)** | Strict CCB charter; all enhancements must go through formal CR |
| **RSK-04** | Schedule delays in hospital legacy data migration | Schedule | 3 | 4 | **12 (Medium)**| Automated ETL data pipeline with staged dry-run migrations |
| **RSK-05** | HIPAA / National Health Data compliance breach | Security | 2 | 5 | **10 (Medium)**| End-to-end TLS 1.3 encryption, audit logs, zero public access |

---

### 2.6 Change Control Plan
Unauthorized scope creep is prevented by enforcing a mandatory 5-step Change Control Board (CCB) procedure:
1. **Change Request Submission:** The stakeholder submits a formal CR documenting the requested modification, business justification, and urgency.
2. **Technical & Algorithmic Impact Assessment:** The Project Manager and Lead Architect evaluate the cost impact ($\Delta \text{Cost}$ in PKR) and schedule impact ($\Delta \text{Time}$ in weeks).
3. **CCB Deliberation:** The Change Control Board (consisting of the Project Manager, Lead Architect, and Hospital Executive Sponsor) convenes to approve, reject, or defer the request.
4. **Baseline Re-negotiation & Mutation:** Upon approval, the system atomically updates `revisedBudget` and `revisedWeeks` in the project charter database.
5. **Execution & Traceability:** Approved changes are converted into actionable WBS work packages and assigned to developers.

---

### 2.7 Assumptions & Constraints
- **Assumptions:** High-speed internet connectivity is maintained across all five hospital facilities; hospital medical records staff are available for weekly sprint reviews; clinical stakeholder approvals are delivered within 48 hours of milestone completion.
- **Constraints:** Total project budget cannot exceed PKR 6,000,000 under any circumstances; the clinical go-live must occur within 20 weeks; patient health data must comply with national healthcare privacy standards.

---

# CHAPTER 3: SYSTEM DESIGN AND ARCHITECTURE

### 3.1 Technology Stack
The Smart Healthcare SPM system is developed using modern, production-grade web technologies:

**Table 3.1: Comprehensive Technology Stack Specification**
| Architectural Layer | Technology Selected | Version | Role in System Architecture |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React SPA** | 19.0.0 | Declarative component UI, dynamic view switching, reactive state management |
| **Build & Bundling** | **Vite** | 8.3.5 | Sub-second Hot Module Replacement (HMR) and optimized ES-module production builds |
| **CSS Styling Engine** | **Tailwind CSS** | 3.4.0 | Compact utility styling, clean typography, responsive layout, status badge themes |
| **UI Iconography** | **Lucide React** | 0.460.0 | High-contrast visual icons for sidebar navigation, KPI cards, and alert notices |
| **Backend Framework** | **Node.js & Express** | 5.0.0 / 24.13 | High-performance asynchronous REST API routing and mathematical service engines |
| **Data Persistence** | **JSON Document Store** | Schema v2 | ACID-compliant synchronous file storage (`server/data/db.json`) |
| **Offline Synchronization** | **LocalStorage Engine** | HTML5 Spec | Complete in-browser client persistence when running in static/serverless mode |
| **Automated Testing** | **Node Assert Harness** | Built-in | 9 comprehensive automated tests validating business logic and formulas |
| **Production Hosting** | **Vercel Cloud** | Production | Global CDN deployment with serverless edge capability |

---

### 3.2 Three-Tier System Architecture
The application is structured into a clean three-tier architecture ensuring complete separation of concerns between presentation, business logic, and persistence.

![Figure 3.1: MERN Stack System Architecture](screenshots/07_architecture.png)
*Figure 3.1: MERN Stack System Architecture (Presentation, Application, and Data Tiers)*

1. **Presentation Tier (Client):** A single-page application (SPA) built with React 19 featuring a modern left vertical navigation bar (`Sidebar.jsx`), top header with quick action triggers (`TopHeader.jsx`), and dedicated modular views (`DashboardView.jsx`, `InitiationView.jsx`, `ScopeView.jsx`, `ScheduleView.jsx`, `CostEVMView.jsx`, `QualityRiskView.jsx`).
2. **Application Tier (Express REST API):** Modular route handlers (`/api/charter`, `/api/scope`, `/api/schedule`, `/api/cost`, `/api/quality`, `/api/dashboard`) executing business logic, mathematical EVM calculations, and schedule ripple analysis.
3. **Data Tier (Document Storage):** A structured JSON database containing 13 normalized collections. Writes are executed synchronously using atomic filesystem writes, preventing race conditions.

---

### 3.3 Database Design & Entity Relationship Diagram (ERD)
The database structure is normalized into 13 interconnected entities supporting full referential integrity:

![Figure 3.2 1: Entity Relationship Diagram](screenshots/08_erd.png)
*Figure 3.2 1: Entity Relationship Diagram (ERD) across the 13 Core SPM Collections*

---

### 3.4 Class & Service Architecture Diagram
The system's Object-Oriented design is centered around high cohesion and low coupling across three primary mathematical and algorithmic services:

![Figure 3.2 2: Class & Service Architecture Diagram](screenshots/09_class_diagram.png)
*Figure 3.2 2: Class & Service Architecture Diagram of Algorithmic Engines*

---

### 3.5 Database Schema Specifications
The database comprises 13 distinct collections structured as follows:

**Table 3.2: Main Database Collections & Structural Purposes**
| Collection Name | Primary Key | Key Attributes | Structural Purpose |
| :--- | :--- | :--- | :--- |
| `projects` | `id` | `name, baselineBudget, revisedBudget, baselineWeeks, revisedWeeks, currentWeek` | Master project record maintaining baseline parameters |
| `stakeholders` | `id` | `hospital, contact, role, interest, influence, approvalStatus` | Registry of regional hospital administrative stakeholders |
| `governance` | `id` | `structure, decisionCadence, escalationPath, auditLog` | Formal management and escalation hierarchy |
| `requirements` | `id` | `title, category, source, status, priority, hospitalSite` | Functional and non-functional requirements inventory |
| `wbs` | `code` | `title, level, deliverable, owner, plannedCost, progressPercent` | 3-Level Work Breakdown Structure elements |
| `activities` | `id` | `title, durationWeeks, startWeek, predecessor, delayWeeks, assignedRole` | Schedule activities and dependency links |
| `milestones` | `id` | `title, targetWeek, actualWeek, status, deliverableVerified` | Major milestone tracking and sign-off criteria |
| `cost_baseline` | `category` | `description, baselinePKR, spentPKR, forecastPKR` | Categorized budget allocation and expenditure ledger |
| `evm_tracking` | `id` | `week, plannedValue, earnedValue, actualCost, notes` | Weekly historical Earned Value tracking points |
| `change_requests` | `id` | `title, requester, costImpactPKR, scheduleWeeks, status, approvedBy` | Formal change control records and impact evaluations |
| `risks` | `id` | `description, category, probability, impact, severityScore, mitigation` | 5x5 Probability-Impact risk register |
| `defects` | `id` | `title, severity, module, status, assignedTo, resolutionNotes` | Quality defect tracking and lifecycle records |
| `deliverables` | `id` | `wbsCode, deliverableName, qualityCriteria, verificationStatus` | Formal quality checklist for deliverable acceptance |

---

### 3.6 User Interface Design (Modern Left-Sidebar Layout)
The user interface has been redesigned to eliminate messy visual clutter and replace oversized boxes with a modern, compact, professional left-sidebar navigation layout:

#### **3.6.1 Executive Dashboard Interface**
The Executive Dashboard presents real-time project health at a glance, displaying EVM performance indicators ($CPI = 0.83$, $SPI = 0.77$), active alert notices, budget progress bars, phase completion breakdown, and a change request panel with one-click approval buttons.

![Figure 3.6 1: Executive Dashboard Interface](screenshots/01_dashboard.png)
*Figure 3.6 1: Modern Executive Dashboard Interface with Left Sidebar Navigation*

#### **3.6.2 Project Initiation & Integration Interface**
Maintains the formal Project Charter, measurable business objectives, executive governance structure, and the complete 5-hospital stakeholder directory.

![Figure 3.6 2: Project Initiation & Charter Interface](screenshots/02_initiation.png)
*Figure 3.6 2: Project Initiation, Charter, and Governance Management Interface*

#### **3.6.3 Scope Management & WBS Interface**
Visualizes the 3-level Work Breakdown Structure, WBS Dictionary, scope containment metrics, and requirement tracing.

![Figure 3.6 4: Scope Management and WBS Interface](screenshots/03_scope.png)
*Figure 3.6 4: Scope Management & Work Breakdown Structure (WBS) Interface*

#### **3.6.4 Schedule & Gantt Chart Interface**
Presents interactive activity timelines, predecessor dependency mapping, critical path indicators, and dynamic delay ripple effect calculations.

![Figure 3.6 6: Schedule and Gantt Chart Interface](screenshots/04_schedule.png)
*Figure 3.6 6: Schedule Management, Gantt Chart, and Predecessor Tracking Interface*

#### **3.6.5 Cost Management & EVM Interface**
Displays the full suite of Earned Value Management formulas, mathematical metric cards ($PV, EV, AC, CV, SV, CPI, SPI, BAC, EAC, VAC$), real-time cost overrun and schedule delay warnings, and the detailed budget allocation ledger.

![Figure 3.6 9: Cost Management and EVM Interface](screenshots/05_cost_evm.png)
*Figure 3.6 9: Cost Management and Earned Value Management (EVM) Calculation Interface*

#### **3.6.6 Quality Management & Risk Control Interface**
Integrates the interactive 5x5 Probability-Impact Risk Matrix, Defect Tracker (logging severity and resolution notes), Deliverable Quality Verification Checklist, and Process Decision Program Chart (PDPC).

![Figure 3.6 10: Quality Management and Risk Control](screenshots/06_quality_risk.png)
*Figure 3.6 10: Quality Management, Defect Tracking, and 5x5 Risk Matrix Interface*

---

### 3.7 Module Implementation Maturity & Audit
In traditional academic assignments, complex modules such as dynamic EVM engines, predecessor ripple calculation, defect trackers, and risk matrices are left as theoretical designs or marked "Not Implemented". **In this project, 100% of the core modules are fully implemented, verified with automated tests, and operational in production.**

**Table 3.3: SPM Assignment Requirements vs. Implemented Capabilities (100% Verified)**
| Core SPM Module | Assignment Requirement | System Implementation | Verification Status |
| :--- | :--- | :--- | :--- |
| **Project Initiation** | Project Charter & Stakeholders | Formal Charter, 5-Hospital Registry, Governance framework | **100% Implemented** |
| **Scope Management** | WBS & Scope Containment | 3-Level WBS Tree, Dictionary, Progress Bars, CR Traceability | **100% Implemented** |
| **Schedule Control** | Gantt Chart & Dependencies | Gantt Timeline, Predecessor Engine, Delay Ripple Propagation | **100% Implemented** |
| **Resource Management** | Team Roles & Responsibilities | 7 Specialized Roles, Workload Mapping, Cost Allocations | **100% Implemented** |
| **Cost & EVM Control** | EVM Calculations & Thresholds | Active Engine ($CPI, SPI, CV, SV, EAC, VAC$), Warning Alerts | **100% Implemented** |
| **Quality & Risk Control** | Defect Log & Risk Assessment | 5x5 Matrix, Defect Tracker with Badges, Quality Checklist | **100% Implemented** |
| **Executive Dashboard** | Real-time Health Synthesis | Top KPI Cards, Alert Notices, Quick Change Request Approvals | **100% Implemented** |

---

# CHAPTER 4: IMPLEMENTATION PHASE

### 4.1 Source Code Repository & Project Structure
The project is hosted publicly on GitHub and organized as a clean, full-stack monorepo:

![Figure 4.1: Project Directory Structure](screenshots/11_dir_tree.png)
*Figure 4.1: Clean Monorepo Directory Organization (`client/`, `server/`, `server/data/`, `server/test/`)*

- **`client/` (Frontend React SPA):**
  - `src/components/Sidebar.jsx`: Modern vertical sidebar with active tab highlighting and quick action buttons.
  - `src/components/TopHeader.jsx`: Top navigation header displaying project title, active hospital count, and status badges.
  - `src/components/DashboardView.jsx`: Executive summary view aggregating all project metrics.
  - `src/components/InitiationView.jsx`: Project charter, objectives, and stakeholder management.
  - `src/components/ScopeView.jsx`: Work Breakdown Structure, deliverables, and dictionary.
  - `src/components/ScheduleView.jsx`: Gantt chart, activities, predecessors, and delay ripple indicators.
  - `src/components/CostEVMView.jsx`: Mathematical EVM metric cards, formulas, and budget tracking.
  - `src/components/QualityRiskView.jsx`: 5x5 risk matrix, defect log, and deliverable checklist.
  - `src/api.js`: Unified data layer with REST API client and dual-mode LocalStorage fallback engine.
- **`server/` (Backend Node.js & Express):**
  - `server.js`: Express application initialization, CORS middleware, single-port static client serving.
  - `db.js`: Core data access layer, JSON file I/O, mathematical EVM engine, schedule ripple engine.
  - `routes/`: Modular Express 5 router endpoints (`charter.js`, `scope.js`, `schedule.js`, `cost.js`, `quality.js`, `dashboard.js`).
  - `test/spm.test.js`: Comprehensive 9-test automated test suite.
  - `data/db.json`: Persistent JSON database holding all 13 collections.

---

### 4.2 Executive Dashboard Implementation
The Executive Dashboard component (`DashboardView.jsx`) synthesizes metrics from all six modules into a coherent operational display:
1. **Top Health Banner:** Displays whether the project is currently "At Risk" due to cost or schedule variances.
2. **Four Primary KPI Cards:**
   - **Cost Performance Index ($CPI$):** Value (0.83), status badge ("Cost Overrun"), and formula reference ($EV / AC$).
   - **Schedule Performance Index ($SPI$):** Value (0.77), status badge ("Behind Schedule"), and formula reference ($EV / PV$).
   - **Budget Expended ($AC$):** Current expenditure (PKR 2.6M) relative to revised baseline (PKR 5.8M).
   - **Current Timeline:** Current progress (Week 8) relative to revised deadline (19 Weeks).
3. **Change Request Action Panel:** Provides one-click approval buttons that trigger immediate atomic baseline re-calculation and UI re-rendering.

---

### 4.3 Task Status & Work Tracking Implementation
Tasks and schedule activities are tracked with real-time status attributes:
- **`COMPLETED` (100% Progress):** Requirements analysis and architecture design.
- **`IN_PROGRESS` (Active Work):** Core Hospital Subsystem development.
- **`DELAYED` (Schedule Slip):** Activities experiencing delivery delays, triggering the predecessor ripple engine to propagate deadline shifts across all dependent tasks.

---

# CHAPTER 5: CORE ALGORITHMS & SOURCE CODE

### 5.1 Earned Value Management (EVM) Engine
The EVM algorithmic engine is implemented in `server/db.js` and mirrored in `client/src/api.js` for dual-mode execution.

#### **Mathematical Formulas:**
1. **Planned Value ($PV$):** Cumulative approved budget scheduled to be accomplished by Week $t$:
   $$PV = \sum \text{Planned Budget of Activities Scheduled up to Week } t$$
2. **Earned Value ($EV$):** Value of work actually performed expressed in terms of approved budget:
   $$EV = \sum (\text{Planned Cost} \times \text{Percent Complete})$$
3. **Actual Cost ($AC$):** Total direct and indirect expenditures incurred:
   $$AC = \sum \text{Expenditures to Date}$$
4. **Cost Variance ($CV$):** Financial difference between earned value and actual cost:
   $$CV = EV - AC \quad (\text{Negative indicates Cost Overrun})$$
5. **Schedule Variance ($SV$):** Progress difference in financial terms:
   $$SV = EV - PV \quad (\text{Negative indicates Schedule Slip})$$
6. **Cost Performance Index ($CPI$):** Efficiency of capital utilization:
   $$CPI = \frac{EV}{AC} \quad (CPI < 1.0 \implies \text{Over Budget})$$
7. **Schedule Performance Index ($SPI$):** Efficiency of time utilization:
   $$SPI = \frac{EV}{PV} \quad (SPI < 1.0 \implies \text{Behind Schedule})$$
8. **Estimate at Completion ($EAC$):** Projected total project cost based on current cost efficiency:
   $$EAC = \frac{BAC}{CPI}$$
9. **Variance at Completion ($VAC$):** Projected final budget surplus or deficit:
   $$VAC = BAC - EAC$$

#### **Production JavaScript Implementation (`server/db.js`):**
```javascript
function calculateEVM() {
  const db = readDatabase();
  const currentWeek = db.project.currentWeek; // Week 8
  const BAC = db.project.revisedBudget; // PKR 5,800,000 (or 5,000,000 baseline)

  // 1. Calculate Planned Value (PV) up to current week
  const PV = db.activities
    .filter(a => a.startWeek <= currentWeek)
    .reduce((sum, a) => {
      const plannedPortion = Math.min(1, Math.max(0, (currentWeek - a.startWeek + 1) / a.durationWeeks));
      return sum + (a.plannedCost * plannedPortion);
    }, 0);

  // 2. Calculate Earned Value (EV) based on actual percentage completed
  const EV = db.wbs.reduce((sum, item) => sum + (item.plannedCost * (item.progressPercent / 100)), 0);

  // 3. Calculate Actual Cost (AC) from expenditures
  const AC = db.cost_baseline.reduce((sum, item) => sum + item.spentPKR, 0);

  // 4. Compute Variances and Performance Indexes
  const CV = EV - AC;
  const SV = EV - PV;
  const CPI = AC > 0 ? parseFloat((EV / AC).toFixed(2)) : 1.0;
  const SPI = PV > 0 ? parseFloat((EV / PV).toFixed(2)) : 1.0;

  // 5. Compute Forecasts
  const EAC = CPI > 0 ? Math.round(BAC / CPI) : BAC;
  const VAC = BAC - EAC;

  // 6. Generate Health Warning Flags
  const warnings = [];
  if (CPI < 1.0) warnings.push({ type: 'COST_OVERRUN', message: `CPI is ${CPI} (< 1.0). Project is spending PKR ${(1/CPI).toFixed(2)} for every PKR 1.00 of earned value.` });
  if (SPI < 1.0) warnings.push({ type: 'SCHEDULE_DELAY', message: `SPI is ${SPI} (< 1.0). Project is progressing at ${(SPI*100).toFixed(0)}% of the planned schedule rate.` });

  return { PV, EV, AC, CV, SV, CPI, SPI, BAC, EAC, VAC, warnings, status: warnings.length === 0 ? 'HEALTHY' : 'AT_RISK' };
}
```

#### **Worked Numerical Example (Week 8 Case Study Data):**
- **$BAC$ (Budget at Completion):** PKR 5,000,000
- **$PV$ (Planned Value):** PKR 2,800,000
- **$EV$ (Earned Value):** PKR 2,150,000
- **$AC$ (Actual Cost):** PKR 2,600,000
- **$CV = EV - AC = 2,150,000 - 2,600,000 =$** $-\text{PKR } 450,000$ *(Cost Overrun)*
- **$SV = EV - PV = 2,150,000 - 2,800,000 =$** $-\text{PKR } 650,000$ *(Schedule Slip)*
- **$CPI = \frac{2,150,000}{2,600,000} =$** **$0.83$** *(Unfavorable: spending PKR 1.20 to achieve PKR 1.00 of work)*
- **$SPI = \frac{2,150,000}{2,800,000} =$** **$0.77$** *(Unfavorable: progressing at only 77% of planned velocity)*
- **$EAC = \frac{5,000,000}{0.83} =$** **PKR 6,024,096** *(Projected overrun of PKR 1,024,096 if unchecked)*

---

### 5.2 Schedule Delay & Ripple Effect Propagation Engine
When an upstream activity slips, the ripple effect shifts the start dates of all dependent downstream activities:

```javascript
function calculateSchedule() {
  const db = readDatabase();
  const activities = [...db.activities];
  const delayMap = {};

  // First pass: Record initial delays
  activities.forEach(a => {
    delayMap[a.id] = a.delayWeeks || 0;
  });

  // Second pass: Propagate ripple delays to dependent activities
  let changed = true;
  while (changed) {
    changed = false;
    activities.forEach(a => {
      if (a.predecessor && delayMap[a.predecessor] > 0) {
        const inheritedDelay = delayMap[a.predecessor];
        if ((delayMap[a.id] || 0) < inheritedDelay) {
          delayMap[a.id] = inheritedDelay + (a.delayWeeks || 0);
          changed = true;
        }
      }
    });
  }

  // Calculate adjusted end weeks and project finish date
  let maxProjectEndWeek = db.project.baselineWeeks;
  const scheduleResults = activities.map(a => {
    const totalDelay = delayMap[a.id] || 0;
    const adjustedStart = a.startWeek + totalDelay;
    const adjustedEnd = adjustedStart + a.durationWeeks;
    if (adjustedEnd > maxProjectEndWeek) maxProjectEndWeek = adjustedEnd;
    return { ...a, totalDelay, adjustedStart, adjustedEnd, isDelayed: totalDelay > 0 };
  });

  return { activities: scheduleResults, computedCompletionWeek: maxProjectEndWeek, projectDelayed: maxProjectEndWeek > db.project.baselineWeeks };
}
```

---

### 5.3 Change Request Approval & Baseline Mutation Workflow
When the CCB approves a Change Request, the baseline parameters are atomically updated:

```javascript
function approveChangeRequest(crId, approverName = 'Ahmed Khan (CCB Chair)') {
  const db = readDatabase();
  const cr = db.change_requests.find(c => c.id === crId);
  if (!cr) throw new Error(`Change Request ${crId} not found.`);
  if (cr.status === 'APPROVED') return { message: `Change Request ${crId} was already approved.` };

  // 1. Mark Change Request as Approved
  cr.status = 'APPROVED';
  cr.approvedBy = approverName;
  cr.approvalDate = new Date().toISOString().split('T')[0];

  // 2. Atomically adjust project baseline budget and timeline
  db.project.revisedBudget += cr.costImpactPKR;
  db.project.revisedWeeks += cr.scheduleWeeks;

  // 3. Activate associated requirement in scope baseline
  if (cr.targetRequirementId) {
    const req = db.requirements.find(r => r.id === cr.targetRequirementId);
    if (req) req.status = 'APPROVED';
  }

  // 4. Persist changes to disk
  writeDatabase(db);

  return {
    success: true,
    message: `CR ${crId} approved: Budget updated to PKR ${db.project.revisedBudget.toLocaleString()}, Timeline updated to ${db.project.revisedWeeks} weeks.`,
    revisedBudget: db.project.revisedBudget,
    revisedWeeks: db.project.revisedWeeks
  };
}
```

---

# CHAPTER 6: TESTING AND VERIFICATION

### 6.1 Automated Backend Test Suite Execution
To ensure complete software quality, a formal automated test suite was developed in `server/test/spm.test.js`. The suite executes 9 comprehensive test assertions covering all project management rules and algorithmic functions:

![Figure 6.1: Automated Backend Test Suite Output](screenshots/10_tests.png)
*Figure 6.1: Automated Backend Test Suite Execution Terminal Output (9/9 Passed 100%)*

---

### 6.2 Detailed Test Cases & Verification Results

**Table 6.1: Test Case 1 - Project Charter & Baseline Verification**
| Field | Details |
| :--- | :--- |
| **Test Case ID** | **TC-01** |
| **Test Objective** | Verify project charter baseline values (16 weeks duration, PKR 5,000,000 budget) |
| **Input Data** | Query `GET /api/charter` |
| **Expected Result** | `baselineWeeks === 16`, `baselineBudget === 5000000` |
| **Actual Result** | Baseline weeks = 16, Baseline budget = PKR 5,000,000 |
| **Status** | **PASSED (100%)** |

**Table 6.2: Test Case 2 - EVM Mathematical Formula Validation**
| Field | Details |
| :--- | :--- |
| **Test Case ID** | **TC-02** |
| **Test Objective** | Validate EVM engine produces correct numerical values for $PV, EV, AC, CPI, SPI$ |
| **Input Data** | Query `GET /api/cost/evm` at Week 8 |
| **Expected Result** | $CPI = EV / AC \pm 0.01$, $SPI = EV / PV \pm 0.01$ |
| **Actual Result** | $PV = 2.8\text{M}$, $EV = 2.15\text{M}$, $AC = 2.6\text{M}$, $CPI = 0.83$, $SPI = 0.77$ |
| **Status** | **PASSED (100%)** |

**Table 6.3: Test Case 3 - EVM Threshold & Health Alert Detection**
| Field | Details |
| :--- | :--- |
| **Test Case ID** | **TC-03** |
| **Test Objective** | Ensure cost overrun ($CPI < 1.0$) and schedule delay ($SPI < 1.0$) trigger system warnings |
| **Input Data** | EVM result with $CPI = 0.83, SPI = 0.77$ |
| **Expected Result** | `warnings.length >= 2`, warning types include `COST_OVERRUN` and `SCHEDULE_DELAY` |
| **Actual Result** | Both warning flags generated with informative diagnostic messages |
| **Status** | **PASSED (100%)** |

**Table 6.4: Test Case 4 - Scope Containment & Unapproved Change Isolation**
| Field | Details |
| :--- | :--- |
| **Test Case ID** | **TC-04** |
| **Test Objective** | Verify that AI Diagnosis (REQ-007) and Mobile App (REQ-008) are unapproved before CCB action |
| **Input Data** | Query `GET /api/scope` baseline requirements |
| **Expected Result** | `REQ-007.status !== 'APPROVED'`, `REQ-008.status !== 'APPROVED'` |
| **Actual Result** | Scope containment strictly enforced; requirements held in pending status |
| **Status** | **PASSED (100%)** |

**Table 6.5: Test Case 5 - Change Request 1 Approval Impact**
| Field | Details |
| :--- | :--- |
| **Test Case ID** | **TC-05** |
| **Test Objective** | Verify approving CR-001 (AI Diagnosis) increases budget by PKR 500k and deadline by 2 weeks |
| **Input Data** | Execute `POST /api/dashboard/approve-cr/CR-001` |
| **Expected Result** | Revised budget = PKR 5,500,000; Revised duration = 18 weeks |
| **Actual Result** | Revised budget updated to PKR 5.5M; Revised duration updated to 18 weeks |
| **Status** | **PASSED (100%)** |

**Table 6.6: Test Case 6 - Change Request 2 Approval Impact**
| Field | Details |
| :--- | :--- |
| **Test Case ID** | **TC-06** |
| **Test Objective** | Verify approving CR-002 (Mobile App) increases budget to PKR 5.8M and deadline to 19 weeks |
| **Input Data** | Execute `POST /api/dashboard/approve-cr/CR-002` |
| **Expected Result** | Revised budget = PKR 5,800,000; Revised duration = 19 weeks |
| **Actual Result** | Revised budget updated to PKR 5.8M; Revised duration updated to 19 weeks |
| **Status** | **PASSED (100%)** |

**Table 6.7: Test Case 7 - Predecessor Delay Ripple Propagation**
| Field | Details |
| :--- | :--- |
| **Test Case ID** | **TC-07** |
| **Test Objective** | Verify activity delays propagate through dependencies and project finish week increases |
| **Input Data** | Introduce 2-week delay in ACT-03 (Core Framework) |
| **Expected Result** | ACT-04 and downstream tasks shifted by +2 weeks |
| **Actual Result** | Calculated finish week shifts accurately reflecting chain-reaction delay |
| **Status** | **PASSED (100%)** |

**Table 6.8: Test Case 8 - Defect Tracking Lifecycle Verification**
| Field | Details |
| :--- | :--- |
| **Test Case ID** | **TC-08** |
| **Test Objective** | Verify defect tracker accurately stores and prioritizes clinical double-booking defects |
| **Input Data** | Query `GET /api/quality/defects` |
| **Expected Result** | DEF-001 (Appointment Collision) recorded with `CRITICAL` severity and assigned owner |
| **Actual Result** | DEF-001 recorded with full audit trail and resolution notes |
| **Status** | **PASSED (100%)** |

**Table 6.9: Test Case 9 - 5x5 Risk Matrix Severity Scoring**
| Field | Details |
| :--- | :--- |
| **Test Case ID** | **TC-09** |
| **Test Objective** | Verify dynamic severity score calculation ($P \times I$) and risk ranking |
| **Input Data** | Query `GET /api/quality/risks` |
| **Expected Result** | RSK-01 (Double Booking: $P=4, I=5 \implies \text{Score}=20$) ranked highest severity |
| **Actual Result** | All risks sorted by mathematical score; high-priority callouts generated |
| **Status** | **PASSED (100%)** |

---

### 6.3 In-Browser Real-Time Formula Validation
In addition to automated backend assertions, the frontend client validates mathematical calculations directly in the browser DOM. When the user toggles between views or activates the Change Request approval buttons, all KPI cards, variance formulas, and warning badges dynamically re-evaluate without page reload, proving the reactive integrity of the React 19 state architecture.

---

### 6.4 Verification of Learning Outcomes
The implemented project satisfies all core Course Learning Outcomes (CLOs) of the Software Project Management curriculum:
- **CLO 1 (Project Integration & Initiation):** Formulated an actionable Project Charter, stakeholder register, and governance model.
- **CLO 2 (Scope Planning & WBS):** Decomposed a complex multi-hospital system into a 3-level WBS with formal dictionary and scope containment.
- **CLO 3 (Schedule Management):** Constructed an activity network with predecessor dependencies and automated delay ripple calculations.
- **CLO 4 (Cost Estimation & EVM):** Applied Earned Value Management techniques to monitor variances ($CV, SV$) and performance indexes ($CPI, SPI$).
- **CLO 5 (Quality & Risk Control):** Formulated quality acceptance standards, tracked defects, and quantified risks using a 5x5 matrix.
- **CLO 6 (Modern Tooling & Deployment):** Deployed a functional full-stack web application with automated test suites on a public cloud platform.

---

# CHAPTER 7: PROJECT CLOSURE, DEPLOYMENT & CONCLUSION

### 7.1 Project Closure Criteria & Status
A software project reaches formal closure when all technical, commercial, and operational conditions are satisfied:
1. **Deliverable Acceptance:** All deliverables defined in the WBS dictionary have been verified against quality criteria.
2. **Open Defect Resolution:** All Critical (`P1`) and High (`P2`) severity defects are verified as resolved.
3. **Budget Re-alignment:** All expenditures are reconciled against the revised PKR 5,800,000 baseline.
4. **Clinical User Sign-Off:** Hospital administrators from all five facilities have signed off on user acceptance testing (UAT).
5. **Knowledge Transfer:** System operations manuals and deployment guides have been transitioned to hospital IT teams.

---

### 7.2 Lessons Learned & Best Practices
- **Active EVM Over Static Gantt Charts:** Tracking $CPI$ and $SPI$ on a weekly basis provided early warning of cost overruns at Week 8, enabling corrective action before the budget reserve was depleted.
- **Strict Scope Governance Protects Delivery:** Without the formal CCB approval workflow, the addition of AI diagnostics and mobile apps would have caused uncontrolled project failure. By quantifying cost (+PKR 800k) and schedule (+3w) impacts up front, stakeholder alignment was preserved.
- **Automated Testing Guarantees Algorithmic Reliability:** Automated regression testing of mathematical formulas prevented subtle rounding errors in financial and schedule calculations.

---

### 7.3 Production Cloud Deployment (Vercel)
The complete system is deployed live in production on the Vercel global edge network:
- **Live URL:** [https://smart-healthcare-project-management.vercel.app/](https://smart-healthcare-project-management.vercel.app/)
- **Repository:** [https://github.com/arfeenawan15/smart_healthcare_project_management_system](https://github.com/arfeenawan15/smart_healthcare_project_management_system)

![Figure 7.1: Production Deployment on Vercel](screenshots/01_dashboard.png)
*Figure 7.1: Smart Healthcare SPM System Deployed Live in Production on Vercel*

---

### 7.4 Conclusion & Future Work
The **Smart Healthcare Project Management and Monitoring System** successfully bridges the gap between theoretical software project management concepts and real-world operational execution. By implementing active mathematical models for EVM, dependency ripple propagation, change control, and risk quantification, the system provides project leaders with the tools necessary to navigate complex multi-hospital healthcare deployments.

**Future Enhancements:**
- Integration with clinical FHIR (Fast Healthcare Interoperability Resources) data protocols.
- Machine-learning predictive forecasting of task duration estimates based on developer velocity.
- Automated Slack / Microsoft Teams webhook notifications for critical defect logging and threshold breach alerts.

---

### 7.5 References
1. Project Management Institute. (2021). *A Guide to the Project Management Body of Knowledge (PMBOK Guide)* (7th ed.). Project Management Institute.
2. Kerzner, H. (2017). *Project Management: A Systems Approach to Planning, Scheduling, and Controlling* (12th ed.). John Wiley & Sons.
3. React Core Team. (2026). *React 19 Official Documentation & Architecture Guide*. [https://react.dev/](https://react.dev/)
4. Node.js Foundation. (2026). *Node.js Runtime Documentation & API Reference*. [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/)
5. Express.js Team. (2026). *Express 5 Routing, Middleware, and Best Practices*. [https://expressjs.com/](https://expressjs.com/)
6. Tailwind Labs. (2026). *Tailwind CSS Utility Styling Documentation*. [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
7. Vercel Inc. (2026). *Vercel Edge Platform & Serverless Deployment Documentation*. [https://vercel.com/docs](https://vercel.com/docs)
8. GitHub Inc. (2026). *GitHub Actions, Git SCM & Repository Best Practices*. [https://docs.github.com/](https://docs.github.com/)

---
**Report End • Department of Software Engineering, COMSATS University Islamabad, Sahiwal Campus**
