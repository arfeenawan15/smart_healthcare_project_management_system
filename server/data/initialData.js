// server/data/initialData.js
// Seed data specifically crafted for the Case Study:
// Smart Healthcare Project Management and Monitoring System (5 Hospitals Network)

const initialData = {
  projectCharter: {
    projectId: "SHP-2026",
    title: "Smart Healthcare Project Management and Monitoring System",
    client: "Healthcare Consortium (Network of 5 Hospitals: Central, City General, St. Jude, Apex, Metro)",
    projectManager: "Ahmed Khan (PMP)",
    sponsor: "Dr. Tariq Mansoor (Director of Hospital Network)",
    startDate: "2026-07-01",
    baselineDeadlineWeeks: 16,
    currentDeadlineWeeks: 16,
    baselineBudgerPKR: 5000000,
    currentApprovedBudgetPKR: 5000000,
    status: "In Progress (Monitoring & Control Phase)",
    currentWeek: 12,
    objectives: [
      "Develop a centralized multi-tenant hospital management system across 5 network hospitals.",
      "Automate patient appointment booking, rescheduling, and doctor availability tracking.",
      "Integrate clinical laboratory reports generation, validation, and patient record access.",
      "Provide secure online doctor consultations with prescription generation.",
      "Deliver an automated hospital billing and financial settlement module with insurance support.",
      "Ensure HIPAA/data privacy compliance and 99.9% uptime across all branches."
    ],
    stakeholders: [
      { name: "Dr. Tariq Mansoor", role: "Project Sponsor / Network CEO", interest: "High", influence: "High" },
      { name: "Ahmed Khan", role: "Project Manager", interest: "High", influence: "High" },
      { name: "Medical Superintendents (5 Hospitals)", role: "Clinical End-Users", interest: "High", influence: "Medium" },
      { name: "IT Directors of 5 Hospitals", role: "Infrastructure & Security", interest: "High", influence: "Medium" },
      { name: "Laboratory Directors", role: "Diagnostic Operations", interest: "Medium", influence: "Medium" },
      { name: "Finance & Accounts Heads", role: "Billing & Audit", interest: "High", influence: "Medium" },
      { name: "Patient Advisory Group", role: "Public Portal Users", interest: "Medium", influence: "Low" }
    ],
    scopeBoundaries: {
      inScope: [
        "Patient Appointments & Rescheduling Module",
        "Laboratory Diagnostics & Report Management",
        "Doctor Rosters & Schedules",
        "Online Video Consultations & E-Prescriptions",
        "Hospital Billing, Invoice Generation, & Co-pay calculation",
        "Multi-hospital Central Data Synchronization",
        "Role-based Access Control (Admin, Doctor, Lab Tech, Cashier, Patient)"
      ],
      outOfScope: [
        "Procurement of physical hospital servers and biometric hardware",
        "In-house hospital pharmacy physical inventory management",
        "External government health insurance gateway accreditation",
        "Ambulance GPS fleet hardware dispatch"
      ]
    },
    managementPlan: {
      scopeManagement: "Requirements baseline established via user stories. Any new functionality requires a formal Change Request (CR) vetted by the Change Control Board (CCB).",
      scheduleManagement: "16-week waterfall-agile hybrid delivery tracked weekly via Earned Value Management (EVM) and Gantt milestones.",
      costManagement: "Approved budget of PKR 5,000,000 tracked against Actual Costs (AC) with CPI threshold alert at CPI < 1.0.",
      qualityManagement: "Zero critical defects policy before go-live. 95% pass rate on automated regression tests."
    },
    raciMatrix: [
      { deliverable: "Project Charter & Governance", pm: "Accountable", backend: "Consulted", frontend: "Informed", db: "Consulted", qa: "Informed" },
      { deliverable: "Patient Appointments API", pm: "Accountable", backend: "Responsible", frontend: "Consulted", db: "Responsible", qa: "Consulted" },
      { deliverable: "Laboratory Reports Engine", pm: "Accountable", backend: "Responsible", frontend: "Consulted", db: "Responsible", qa: "Consulted" },
      { deliverable: "Doctor Scheduling Portal", pm: "Accountable", backend: "Consulted", frontend: "Responsible", db: "Consulted", qa: "Consulted" },
      { deliverable: "Online Consultation Room", pm: "Accountable", backend: "Responsible", frontend: "Responsible", db: "Consulted", qa: "Consulted" },
      { deliverable: "Hospital Billing Module", pm: "Accountable", backend: "Responsible", frontend: "Consulted", db: "Responsible", qa: "Consulted" },
      { deliverable: "System Testing & Security Audit", pm: "Accountable", backend: "Consulted", frontend: "Consulted", db: "Consulted", qa: "Responsible" },
      { deliverable: "Deployment & Commissioning", pm: "Accountable", backend: "Responsible", frontend: "Responsible", db: "Responsible", qa: "Consulted" }
    ],
    milestones: [
      { id: "M1", name: "Project Initiation & Charter Signoff", targetWeek: 2, status: "Completed", actualWeek: 2 },
      { id: "M2", name: "Architecture & Multi-Hospital DB Design", targetWeek: 4, status: "Completed", actualWeek: 4 },
      { id: "M3", name: "Core Hospital Modules MVP Development", targetWeek: 11, status: "Completed", actualWeek: 11 },
      { id: "M4", name: "End-to-End Integration & Quality Acceptance", targetWeek: 14, status: "Delayed", actualWeek: null, notes: "Delayed due to critical defects in appointment concurrency and record sync." },
      { id: "M5", name: "5-Hospital Network Deployment & Go-Live", targetWeek: 16, status: "At Risk", actualWeek: null }
    ],
    closurePlan: {
      deliverablesAcceptance: "Formal sign-off required from all 5 Medical Superintendents.",
      financialAudit: "Reconciliation of all purchase orders, licensing, and team billings against approved PKR 5.0M / 5.8M budget.",
      lessonsLearned: "Post-mortem analysis on hospital concurrency race conditions and distributed sync latency.",
      knowledgeTransfer: "2-week admin training for hospital IT personnel and comprehensive system runbooks.",
      archiveStatus: "Pending Go-Live"
    }
  },

  team: [
    { id: "TM-1", name: "Ahmed Khan", role: "Project Manager", capacityHoursPerWeek: 40, costPerWeekPKR: 65000 },
    { id: "TM-2", name: "Ali Raza", role: "Backend Developer (Lead)", capacityHoursPerWeek: 40, costPerWeekPKR: 55000 },
    { id: "TM-3", name: "Bilal Tariq", role: "Backend Developer (Services)", capacityHoursPerWeek: 40, costPerWeekPKR: 50000 },
    { id: "TM-4", name: "Sara Ahmed", role: "Frontend Developer (Lead)", capacityHoursPerWeek: 40, costPerWeekPKR: 52000 },
    { id: "TM-5", name: "Zainab Fatima", role: "Frontend Developer (UI/UX)", capacityHoursPerWeek: 40, costPerWeekPKR: 48000 },
    { id: "TM-6", name: "Hamza Siddiqui", role: "Database Developer", capacityHoursPerWeek: 40, costPerWeekPKR: 54000 },
    { id: "TM-7", name: "Usman Farooq", role: "Quality Assurance Engineer", capacityHoursPerWeek: 40, costPerWeekPKR: 46000 }
  ],

  requirements: [
    {
      id: "REQ-001",
      title: "Patient Appointment Scheduling & Rescheduling",
      category: "Core Clinic",
      priority: "High",
      status: "Approved",
      inApprovedScope: true,
      description: "Allow patients and hospital receptionists to book, reschedule, and cancel doctor visits with real-time slot conflict prevention across 5 hospitals.",
      estimatedCostPKR: 850000,
      estimatedWeeks: 3
    },
    {
      id: "REQ-002",
      title: "Clinical Laboratory Reports & Diagnostics",
      category: "Laboratory",
      priority: "High",
      status: "Approved",
      inApprovedScope: true,
      description: "Enable pathology labs to upload test findings, auto-flag abnormal biomarker ranges, and let patients securely download PDF reports.",
      estimatedCostPKR: 750000,
      estimatedWeeks: 2.5
    },
    {
      id: "REQ-003",
      title: "Doctor Roster & Availability Schedules",
      category: "Staff Management",
      priority: "Medium",
      status: "Approved",
      inApprovedScope: true,
      description: "Manage physician shift rotations, OPD consultation windows, on-call schedules, and emergency leave reallocations.",
      estimatedCostPKR: 600000,
      estimatedWeeks: 2
    },
    {
      id: "REQ-004",
      title: "Encrypted Online Video Teleconsultations",
      category: "Telehealth",
      priority: "High",
      status: "Approved",
      inApprovedScope: true,
      description: "Secure WebRTC-based virtual consultation rooms with digital e-prescription signing and chat history.",
      estimatedCostPKR: 900000,
      estimatedWeeks: 3
    },
    {
      id: "REQ-005",
      title: "Hospital Billing, Invoicing & Insurance Co-Pay",
      category: "Finance",
      priority: "High",
      status: "Approved",
      inApprovedScope: true,
      description: "Unified cash, credit card, and corporate health insurance billing system with automated invoice generation for all 5 hospitals.",
      estimatedCostPKR: 800000,
      estimatedWeeks: 2.5
    },
    {
      id: "REQ-006",
      title: "Centralized Multi-Hospital Data Synchronization",
      category: "Infrastructure",
      priority: "High",
      status: "Approved",
      inApprovedScope: true,
      description: "Ensure electronic medical records (EMR) sync reliably across Central Hospital and 4 remote branch hospitals.",
      estimatedCostPKR: 1100000,
      estimatedWeeks: 3
    },
    {
      id: "REQ-007",
      title: "AI-Based Preliminary Symptom Diagnosis Module",
      category: "AI & Innovation",
      priority: "Medium",
      status: "Pending", // Introduced via Change Request CR-001
      inApprovedScope: false,
      description: "Natural language symptom checker providing triage severity ranking and recommending specialist doctors before appointment confirmation.",
      estimatedCostPKR: 500000,
      estimatedWeeks: 2,
      changeRequestId: "CR-001"
    },
    {
      id: "REQ-008",
      title: "Patient & Doctor Cross-Platform Mobile Application",
      category: "Mobile",
      priority: "Medium",
      status: "Pending", // Introduced via Change Request CR-002
      inApprovedScope: false,
      description: "Native iOS and Android mobile app for fast booking, push notifications for lab results, and remote video consultation access.",
      estimatedCostPKR: 300000,
      estimatedWeeks: 1,
      changeRequestId: "CR-002"
    }
  ],

  wbs: [
    { id: "WBS-1.0", code: "1.0", name: "Project Management & Initiation", parentCode: null, type: "Deliverable", budgetPKR: 450000, progress: 100, status: "Completed" },
    { id: "WBS-1.1", code: "1.1", name: "Project Charter & Stakeholder Alignment", parentCode: "1.0", type: "Work Package", budgetPKR: 200000, progress: 100, status: "Completed" },
    { id: "WBS-1.2", code: "1.2", name: "Resource Allocation & Kick-off Meetings", parentCode: "1.0", type: "Work Package", budgetPKR: 250000, progress: 100, status: "Completed" },

    { id: "WBS-2.0", code: "2.0", name: "System Architecture & Security Design", parentCode: null, type: "Deliverable", budgetPKR: 550000, progress: 100, status: "Completed" },
    { id: "WBS-2.1", code: "2.1", name: "Multi-Hospital Distributed Database Schema", parentCode: "2.0", type: "Work Package", budgetPKR: 300000, progress: 100, status: "Completed" },
    { id: "WBS-2.2", code: "2.2", name: "HIPAA Compliant Authentication & RBAC", parentCode: "2.0", type: "Work Package", budgetPKR: 250000, progress: 100, status: "Completed" },

    { id: "WBS-3.0", code: "3.0", name: "Core Clinical & Operational Modules", parentCode: null, type: "Deliverable", budgetPKR: 2350000, progress: 85, status: "In Progress" },
    { id: "WBS-3.1", code: "3.1", name: "Patient Appointment & Scheduling Engine", parentCode: "3.0", type: "Work Package", budgetPKR: 650000, progress: 90, status: "Defects Found" },
    { id: "WBS-3.2", code: "3.2", name: "Laboratory Diagnostics & Automated PDF Reports", parentCode: "3.0", type: "Work Package", budgetPKR: 550000, progress: 95, status: "In Progress" },
    { id: "WBS-3.3", code: "3.3", name: "Doctor Rosters & Shift Planning Portal", parentCode: "3.0", type: "Work Package", budgetPKR: 450000, progress: 100, status: "Completed" },
    { id: "WBS-3.4", code: "3.4", name: "WebRTC Online Video Teleconsultation", parentCode: "3.0", type: "Work Package", budgetPKR: 700000, progress: 80, status: "In Progress" },

    { id: "WBS-4.0", code: "4.0", name: "Hospital Financial & Billing Engine", parentCode: null, type: "Deliverable", budgetPKR: 650000, progress: 75, status: "In Progress" },
    { id: "WBS-4.1", code: "4.1", name: "Billing Invoices, Tax & Insurance Co-Pay", parentCode: "4.0", type: "Work Package", budgetPKR: 400000, progress: 85, status: "In Progress" },
    { id: "WBS-4.2", code: "4.2", name: "Hospital Revenue Reconciliation Dashboard", parentCode: "4.0", type: "Work Package", budgetPKR: 250000, progress: 60, status: "In Progress" },

    { id: "WBS-5.0", code: "5.0", name: "Quality Assurance & Network Deployment", parentCode: null, type: "Deliverable", budgetPKR: 1000000, progress: 40, status: "Delayed" },
    { id: "WBS-5.1", code: "5.1", name: "System Integration & Concurrency Stress Testing", parentCode: "5.0", type: "Work Package", budgetPKR: 500000, progress: 50, status: "Delayed" },
    { id: "WBS-5.2", code: "5.2", name: "5-Hospital Node Staging & User Training", parentCode: "5.0", type: "Work Package", budgetPKR: 500000, progress: 20, status: "Not Started" }
  ],

  changeRequests: [
    {
      id: "CR-001",
      title: "AI-Based Preliminary Diagnosis Module",
      requestedBy: "Hospital Consortium Medical Board",
      dateRequested: "2026-09-15",
      justification: "To reduce clinical overcrowding in physical OPDs and triage emergency patients before consultation.",
      costImpactPKR: 500000,
      scheduleImpactWeeks: 2,
      status: "Pending", // Allows user to demonstrate approval live!
      scopeDetails: "NLP-driven symptom checker with disease probabilities, integrated into patient appointment flow.",
      reviewedBy: "Ahmed Khan (PM) & CCB",
      approvalDate: null,
      wbsCodeToAdd: "WBS-6.0"
    },
    {
      id: "CR-002",
      title: "Cross-Platform Mobile Application (iOS & Android)",
      requestedBy: "Hospital Network Marketing & Patient Care Committee",
      dateRequested: "2026-09-18",
      justification: "Patients demand instant mobile notifications for lab reports, doctor schedules, and digital prescription access.",
      costImpactPKR: 300000,
      scheduleImpactWeeks: 1,
      status: "Pending", // Allows user to demonstrate approval live!
      scopeDetails: "React Native mobile client with push notifications and secure biometric login.",
      reviewedBy: "Ahmed Khan (PM) & CCB",
      approvalDate: null,
      wbsCodeToAdd: "WBS-7.0"
    }
  ],

  activities: [
    {
      id: "ACT-01",
      wbsCode: "1.1",
      name: "Project Charter, Objectives & Stakeholder Signoff",
      assignedTo: "Ahmed Khan",
      role: "Project Manager",
      durationWeeks: 2,
      startWeek: 1,
      endWeek: 2,
      dependencies: [],
      status: "Completed",
      progress: 100,
      plannedCostPKR: 200000,
      actualCostPKR: 195000,
      isDelayed: false,
      delayWeeks: 0
    },
    {
      id: "ACT-02",
      wbsCode: "2.1",
      name: "Multi-Hospital Distributed Database Schema Architecture",
      assignedTo: "Hamza Siddiqui",
      role: "Database Developer",
      durationWeeks: 2,
      startWeek: 3,
      endWeek: 4,
      dependencies: ["ACT-01"],
      status: "Completed",
      progress: 100,
      plannedCostPKR: 300000,
      actualCostPKR: 310000,
      isDelayed: false,
      delayWeeks: 0
    },
    {
      id: "ACT-03",
      wbsCode: "2.2",
      name: "Security, RBAC & HIPAA Authentication Services",
      assignedTo: "Ali Raza",
      role: "Backend Developer",
      durationWeeks: 2,
      startWeek: 3,
      endWeek: 4,
      dependencies: ["ACT-01"],
      status: "Completed",
      progress: 100,
      plannedCostPKR: 250000,
      actualCostPKR: 260000,
      isDelayed: false,
      delayWeeks: 0
    },
    {
      id: "ACT-04",
      wbsCode: "3.1",
      name: "Patient Appointment Booking & Doctor Roster APIs",
      assignedTo: "Ali Raza",
      role: "Backend Developer",
      durationWeeks: 4,
      startWeek: 5,
      endWeek: 8,
      dependencies: ["ACT-02", "ACT-03"],
      status: "Completed",
      progress: 100,
      plannedCostPKR: 500000,
      actualCostPKR: 520000,
      isDelayed: false,
      delayWeeks: 0
    },
    {
      id: "ACT-05",
      wbsCode: "3.2",
      name: "Laboratory Diagnostics Engine & PDF Generation",
      assignedTo: "Bilal Tariq",
      role: "Backend Developer",
      durationWeeks: 3,
      startWeek: 6,
      endWeek: 8,
      dependencies: ["ACT-02"],
      status: "Completed",
      progress: 100,
      plannedCostPKR: 450000,
      actualCostPKR: 440000,
      isDelayed: false,
      delayWeeks: 0
    },
    {
      id: "ACT-06",
      wbsCode: "3.3",
      name: "Doctor & Patient Web Portal Frontend (UI/UX)",
      assignedTo: "Sara Ahmed",
      role: "Frontend Developer",
      durationWeeks: 5,
      startWeek: 6,
      endWeek: 10,
      dependencies: ["ACT-04", "ACT-05"],
      status: "Completed",
      progress: 100,
      plannedCostPKR: 600000,
      actualCostPKR: 630000,
      isDelayed: false,
      delayWeeks: 0
    },
    {
      id: "ACT-07",
      wbsCode: "3.4",
      name: "WebRTC Video Teleconsultation Infrastructure",
      assignedTo: "Zainab Fatima",
      role: "Frontend Developer",
      durationWeeks: 3,
      startWeek: 8,
      endWeek: 10,
      dependencies: ["ACT-04"],
      status: "Completed",
      progress: 100,
      plannedCostPKR: 450000,
      actualCostPKR: 480000,
      isDelayed: false,
      delayWeeks: 0
    },
    {
      id: "ACT-08",
      wbsCode: "4.1",
      name: "Billing, Invoicing & Insurance Claim Engine",
      assignedTo: "Bilal Tariq",
      role: "Backend Developer",
      durationWeeks: 3,
      startWeek: 9,
      endWeek: 11,
      dependencies: ["ACT-04"],
      status: "In Progress",
      progress: 85,
      plannedCostPKR: 450000,
      actualCostPKR: 400000,
      isDelayed: false,
      delayWeeks: 0
    },
    {
      id: "ACT-09",
      wbsCode: "5.1",
      name: "End-to-End System Testing & Defect Remediation",
      assignedTo: "Usman Farooq",
      role: "QA Engineer",
      durationWeeks: 3,
      startWeek: 11,
      endWeek: 13,
      dependencies: ["ACT-06", "ACT-07", "ACT-08"],
      status: "Delayed", // Testing revealed critical defects in appointment scheduling and patient record sync!
      progress: 45,
      plannedCostPKR: 500000,
      actualCostPKR: 580000, // Defect debugging inflated costs
      isDelayed: true,
      delayWeeks: 2, // 2-week testing delay impacts final milestone
      impactNotes: "Critical defects in appointment race condition and database synchronization require rework by Backend and DB developers."
    },
    {
      id: "ACT-10",
      wbsCode: "5.2",
      name: "Network Staging, User Acceptance Testing & 5-Hospital Deployment",
      assignedTo: "Ahmed Khan",
      role: "Project Manager",
      durationWeeks: 2,
      startWeek: 14,
      endWeek: 16,
      dependencies: ["ACT-09"],
      status: "Delayed",
      progress: 0,
      plannedCostPKR: 500000,
      actualCostPKR: 0,
      isDelayed: true,
      delayWeeks: 2,
      impactNotes: "Delayed because predecessor ACT-09 testing is stalled on critical defects."
    }
  ],

  defects: [
    {
      id: "DEF-001",
      title: "Concurrent Booking Race Condition in Appointment Scheduling",
      module: "Patient Appointments",
      severity: "Critical",
      assignedTo: "Ali Raza",
      reportedBy: "Usman Farooq (QA)",
      status: "Open",
      dateReported: "2026-09-22",
      stepsToReproduce: "1. Two receptionists at Central and Metro hospitals select Dr. Kamran's 10:00 AM slot simultaneously.\n2. Both submit within 500ms.\n3. Both transactions commit successfully, creating a double-booking conflict in the clinic queue.",
      impact: "Clinical disruption, patient wait-time disputes, and physician schedule overflow.",
      resolutionNotes: "Requires distributed mutex or optimistic concurrency lock with version check in PostgreSQL/MongoDB."
    },
    {
      id: "DEF-002",
      title: "Patient Electronic Medical Record Sync Failure Across Remote Hospital Nodes",
      module: "Patient Records & Database Sync",
      severity: "Critical",
      assignedTo: "Hamza Siddiqui",
      reportedBy: "Usman Farooq (QA)",
      status: "In Progress",
      dateReported: "2026-09-24",
      stepsToReproduce: "1. Patient profile updated at St. Jude Medical branch.\n2. Central Hospital replication daemon encounters network timeout.\n3. Patient history appears blank when queried at Apex Health node.",
      impact: "Clinical misdiagnosis risk due to incomplete patient history and allergy warnings.",
      resolutionNotes: "Implementing transactional outbox pattern with Kafka/RabbitMQ retry queues and idempotent replay."
    },
    {
      id: "DEF-003",
      title: "Laboratory PDF Report Formatting Misalignment on Mobile Displays",
      module: "Laboratory Reports",
      severity: "Minor",
      assignedTo: "Sara Ahmed",
      reportedBy: "Usman Farooq (QA)",
      status: "Resolved",
      dateReported: "2026-09-19",
      stepsToReproduce: "Opening CBC blood report PDF in portrait mode cuts off reference range column.",
      impact: "Minor aesthetic annoyance on small screens.",
      resolutionNotes: "Adjusted PDF print stylesheet table width to fit standard A4 responsive grid."
    },
    {
      id: "DEF-004",
      title: "Co-Pay Calculation Rounding Error on Multi-Item Invoices",
      module: "Hospital Billing",
      severity: "Major",
      assignedTo: "Bilal Tariq",
      reportedBy: "Usman Farooq (QA)",
      status: "In Progress",
      dateReported: "2026-09-26",
      stepsToReproduce: "Generating bill with 3 laboratory tests and 1 consultation results in 2 PKR variance due to floating point roundoff.",
      impact: "Daily audit balance mismatch in accounts department.",
      resolutionNotes: "Switching monetary calculations to integer cents/paisa representations."
    }
  ],

  qualityChecklist: [
    {
      id: "QC-01",
      itemCode: "QC-APPT-01",
      deliverable: "Patient Appointments Module",
      criteria: "System prevents duplicate booking for same doctor slot with 100 concurrent requests.",
      inspectionStatus: "Fail",
      inspector: "Usman Farooq (QA)",
      testDate: "2026-09-23",
      linkedDefectId: "DEF-001",
      remarks: "Failed under Apache JMeter load test. DEF-001 logged."
    },
    {
      id: "QC-02",
      itemCode: "QC-SYNC-01",
      deliverable: "Multi-Hospital Data Sync",
      criteria: "Patient records replicate across all 5 hospital nodes within < 2000ms latency.",
      inspectionStatus: "Fail",
      inspector: "Usman Farooq (QA)",
      testDate: "2026-09-24",
      linkedDefectId: "DEF-002",
      remarks: "Node packet drops caused desynchronization. DEF-002 logged."
    },
    {
      id: "QC-03",
      itemCode: "QC-LAB-01",
      deliverable: "Laboratory Reports Module",
      criteria: "Generated lab PDF accurately flags values outside reference range in bold red text.",
      inspectionStatus: "Pass",
      inspector: "Usman Farooq (QA)",
      testDate: "2026-09-20",
      linkedDefectId: null,
      remarks: "Verified with 50 synthetic lipid, CBC, and renal panel tests."
    },
    {
      id: "QC-04",
      itemCode: "QC-BILL-01",
      deliverable: "Hospital Billing Engine",
      criteria: "Invoice generation calculates GST, doctor commission, and insurance co-pay accurately.",
      inspectionStatus: "Pending",
      inspector: "Usman Farooq (QA)",
      testDate: "2026-09-28",
      linkedDefectId: "DEF-004",
      remarks: "Awaiting fix for DEF-004 rounding variance before formal sign-off."
    },
    {
      id: "QC-05",
      itemCode: "QC-TELE-01",
      deliverable: "Online Video Consultations",
      criteria: "End-to-end encrypted video stream maintains 30fps at 720p with < 150ms audio latency.",
      inspectionStatus: "Pass",
      inspector: "Usman Farooq (QA)",
      testDate: "2026-09-21",
      linkedDefectId: null,
      remarks: "Passed WebRTC STUN/TURN test suite across simulated cellular connections."
    },
    {
      id: "QC-06",
      itemCode: "QC-SEC-01",
      deliverable: "HIPAA & Security Compliance",
      criteria: "All patient health information (PHI) encrypted at rest (AES-256) and in transit (TLS 1.3).",
      inspectionStatus: "Pass",
      inspector: "Usman Farooq (QA)",
      testDate: "2026-09-15",
      linkedDefectId: null,
      remarks: "Penetration test passed. OWASP Top 10 vulnerabilities mitigated."
    }
  ],

  risks: [
    {
      id: "RSK-001",
      riskId: "R-1",
      description: "Critical defects in appointment scheduling cause doctor double-booking and clinic operational chaos.",
      category: "Technical / Quality",
      likelihood: 5,
      impact: 5,
      score: 25,
      severity: "High",
      mitigationPlan: "Immediate code freeze on appointments module; assign Senior Backend Lead Ali Raza to implement distributed database locks; enforce automated concurrency regression suite.",
      owner: "Ali Raza",
      status: "Active"
    },
    {
      id: "RSK-002",
      riskId: "R-2",
      description: "Inter-hospital network instability causes patient electronic medical records (EMR) desynchronization.",
      category: "Infrastructure",
      likelihood: 4,
      impact: 5,
      score: 20,
      severity: "High",
      mitigationPlan: "Implement offline-first caching on local hospital nodes with persistent message broker (RabbitMQ) for guaranteed eventual consistency.",
      owner: "Hamza Siddiqui",
      status: "Active"
    },
    {
      id: "RSK-003",
      riskId: "R-3",
      description: "Scope creep from hospital management requests (AI Diagnosis & Mobile App) pushes budget past PKR 5.0M and timeline past 16 weeks.",
      category: "Scope / Schedule",
      likelihood: 5,
      impact: 4,
      score: 20,
      severity: "High",
      mitigationPlan: "Enforce formal Change Control Board approval; baseline budget increased to PKR 5.8M and deadline extended to 19 weeks before committing resources.",
      owner: "Ahmed Khan",
      status: "Under Review"
    },
    {
      id: "RSK-004",
      riskId: "R-4",
      description: "Single point of failure on Database Developer Hamza Siddiqui delaying DB schema updates.",
      category: "Resource",
      likelihood: 3,
      impact: 4,
      score: 12,
      severity: "Medium",
      mitigationPlan: "Cross-train Backend Developer Bilal Tariq on database replication topologies and ORM migrations.",
      owner: "Ahmed Khan",
      status: "Monitored"
    },
    {
      id: "RSK-005",
      riskId: "R-5",
      description: "Hospital staff resistance to new computerized billing system slowing down user acceptance testing.",
      category: "Organizational",
      likelihood: 3,
      impact: 3,
      score: 9,
      severity: "Medium",
      mitigationPlan: "Conduct on-site role-specific training sessions at each of the 5 hospitals with dedicated quick-reference laminated cheat sheets.",
      owner: "Ahmed Khan",
      status: "Planned"
    },
    {
      id: "RSK-006",
      riskId: "R-6",
      description: "Third-party payment gateway downtime causing billing checkout failures during OPD peak hours.",
      category: "External",
      likelihood: 2,
      impact: 3,
      score: 6,
      severity: "Low",
      mitigationPlan: "Provide multi-gateway fallback (1Link, Easypaisa, Card gateway) with automated offline reconciliation.",
      owner: "Bilal Tariq",
      status: "Mitigated"
    }
  ],

  pdpc: [
    {
      id: "PDPC-01",
      step: "Phase 1: Multi-Hospital Patient Scheduling & Booking",
      goal: "Achieve 100% reliable real-time appointment booking across 5 hospital OPDs without double-booking.",
      potentialProblem: "Concurrent requests from 5 hospitals simultaneously booking the same doctor time slot (DEF-001).",
      preventiveAction: "Implement distributed pessimistic row-level locking on appointment slots during checkout initiation.",
      contingencyPlan: "If lock timeout occurs, immediately notify receptionist with next three alternative slots within 15 minutes.",
      feasibility: "Approved"
    },
    {
      id: "PDPC-02",
      step: "Phase 2: Distributed Patient EMR & Lab Data Synchronization",
      goal: "Maintain consistent patient records across all 5 hospitals with sub-second sync latency.",
      potentialProblem: "WAN connection drop between branch hospital and Central Hospital database server (DEF-002).",
      preventiveAction: "Deploy local caching replica at each hospital with automated asynchronous change data capture (CDC).",
      contingencyPlan: "Store pending updates in local encrypted SQLite/JSON spool file and trigger retry queue upon reconnect.",
      feasibility: "Approved"
    },
    {
      id: "PDPC-03",
      step: "Phase 3: Scope Expansion (AI Preliminary Diagnosis & Mobile App)",
      goal: "Deliver new hospital management requirements without compromising existing 16-week baseline deliverables.",
      potentialProblem: "Team capacity exhaustion leading to burnout, lower code quality, and delivery failure.",
      preventiveAction: "Freeze scope baseline; mandate +PKR 800,000 budget supplement and +3 weeks timeline extension via formal Change Requests CR-001 & CR-002.",
      contingencyPlan: "If hospital denies budget increase, de-prioritize AI symptom checker to post-launch Phase 2 release.",
      feasibility: "Approved"
    },
    {
      id: "PDPC-04",
      step: "Phase 4: Hospital Billing & Revenue Reconciliation",
      goal: "Ensure zero PKR variance between hospital cash counters, lab billing, and corporate insurance claims.",
      potentialProblem: "Rounding errors and uncommitted payment webhook failures during high traffic periods.",
      preventiveAction: "Implement 2-phase commit transaction protocol for all payment updates with immutable audit log entries.",
      contingencyPlan: "Generate daily discrepancy reports at midnight for automated accounting reconciliation.",
      feasibility: "Approved"
    },
    {
      id: "PDPC-05",
      step: "Phase 5: User Acceptance & Hospital Staff Adoption",
      goal: "Achieve > 90% staff adoption across doctors, lab techs, and billing clerks in all 5 hospitals.",
      potentialProblem: "Older clinical staff resist digital interface and revert to paper appointment registers.",
      preventiveAction: "Hold interactive hands-on hospital workshops and simplify appointment creation to 2 clicks.",
      contingencyPlan: "Deploy dedicated on-site IT support champions at each hospital reception desk for the first two weeks of go-live.",
      feasibility: "Feasible"
    }
  ]
};

module.exports = initialData;

