# FoloCharge Requirements Document

## 1. Application Overview

### 1.1 Application Name\nFoloCharge – Fault Diagnoser & Site Revenue Analyzer

### 1.2 Application Description\nA comprehensive web-based diagnostic and analytics platform designed for Indian EV charging station owners. The tool provides two core modules:\n- **Phase 1**: Fault Diagnoser – Analyzes charger failures through log file uploads, providing fault categorization, root cause analysis, and revenue loss calculations in INR\n- **Phase 2**: Multi-Site Revenue & Utilization Analyzer – Analyzes monthly revenue output (MRO) and site performance using CSV upload\n
### 1.3 Target Users
EV charging station owners and operators in the Indian market

---

## 2. Phase 1: Fault Diagnoser Module

### 2.1 Log Upload & Parsing\n- Support file formats: CSV, JSON, TXT
- Auto-extract key fields from charger logs:
  - errorCode
  - timestamp
  - connectorId
  - meterValue
  - temperature
  - voltage/current
  - OCPP status updates
  - transactionStopReason
  - vendor-specific error strings

### 2.2 Sample Data Import
- Provide a 'Load Indian Sample Data' button\n- Pre-load representative log data from Indian EV charging scenarios
- Allow users to test all diagnostic features without uploading their own files
- Sample data includes typical fault patterns observed in Indian grid conditions

### 2.3 Fault Classification Engine
Rule-based categorization into 11 fault types:\n- Overcurrent
- Overvoltage
- Low grid voltage
- Overheating
- BMS communication mismatch
- OCPP network disconnect
- Power module failure
- Vehicle-side abort
- Emergency stop
- Contactor stuck
- Repeated soft restarts

### 2.4 Fault Analysis & Explanation
For each detected fault, provide:
- Issue description (what happened)
- Root cause analysis (why it happened)
- Impact on charging uptime
- Severity level: Low / Medium / High
- Resolution guidance:\n  - Electrician required\n  - Vendor support needed\n  - Simple local reset

### 2.5 Downtime Cost Calculator (INR)
- Calculate revenue loss using formula: avg_sessions_per_day × avg_ticket_size_in_INR × (downtime_hours/24)
- Default parameters (user-editable):
  - Average Session Value: ₹120
  - Average Sessions per Day: 14
- Display metrics:
  - Revenue lost today
  - Revenue lost this month
  - Top 5 costliest faults ranking\n
### 2.6 Export Functionality
- Export analysis results as PDF
- Export data tables as CSV

---

## 3. Phase 2: Multi-Site Revenue & Utilization Analyzer Module

### 3.1 CSV Upload\n- Single CSV file upload containing fields:
  - siteId
  - chargerId\n  - connectorId
  - energy_kWh\n  - sessionDurationMin\n  - tariffINR\n  - revenueINR
  - startTime
  - stopTime

### 3.2 Data Grouping & Processing
Automatically group data by:
- Site level
- Charger level\n- Connector level
\n### 3.3 Site-Level Metrics
For each site, calculate and display:
- Total revenue (INR)
- Total energy delivered (kWh)
- Average session revenue (INR)
- Average session duration (minutes)
- Utilization percentage (minutes used / minutes in month)\n- Sessions per day
- Peak hour identification

### 3.4 Charger-Level Performance Analysis
For each charger, identify and categorize:
- **Good Performer**: High utilization and revenue generation
- **Low Performer**: Below-average metrics
- **Dead Chargers**: 0–1 sessions per day
- **Underutilized Chargers**: Less than 10% usage
\n### 3.5 Insights & Recommendations
Generate rule-based business suggestions:
- 'Increase tariff by ₹5 to match local demand'\n- 'Move charger — extremely low footfall'
- 'Add another charger — consistently high peak usage'
- 'Low energy output — possible grid under-voltage issue'

### 3.6 Reports & Visualizations
Generate the following reports:
- Site Comparison Chart
- Revenue Ranking (by site)
- Usage Ranking (by site)
- Dead Charger Alerts

### 3.7 UI Tabs Structure
Four main tabs:
1. **Upload CSV**: File upload interface
2. **Site Analytics**: Site-level performance metrics and comparisons
3. **Charger Analytics**: Charger-level performance breakdown
4. **Recommendations**: Actionable business insights

---

## 4. Technical Architecture

### 4.1 Data Processing
- Client-side or ephemeral session processing
- No backend database storage\n- No user authentication system
- All processing runs in memory

### 4.2 Session Management
- Temporary session-based data handling
- Data cleared after session ends

---

## 5. User Interface Design

### 5.1 Phase 1 Dashboard Layout
Four main sections:
1. **Fault Summary Panel**: Overview of detected issues
2. **Detailed Fault Table**: Comprehensive fault listing with all analysis details
3. **Cost Analysis Section**: INR-based revenue loss visualization
4. **Export Controls**: PDF/CSV download options

### 5.2 Phase 1 Upload Area
- Drag-and-drop file upload zone\n- 'Load Indian Sample Data' button positioned prominently next to upload area
- Button styled with secondary color scheme to distinguish from primary actions\n
### 5.3 Phase 2 Interface Structure
- Tab-based navigation for Upload CSV, Site Analytics, Charger Analytics, and Recommendations
- CSV upload area with drag-and-drop support
- Data tables with sorting and filtering capabilities
- Visual charts for site comparison and revenue ranking
- Alert badges for dead and underutilized chargers

### 5.4 Design Style
- Color Scheme: Professional blue (#2563EB) as primary color, paired with neutral grays (#F3F4F6 background, #1F2937 text) and alert red (#DC2626) for high-severity warnings
- Visual Elements: Card-based layout with subtle shadows (01px 3px rgba(0,0,0,0.1)), 8px rounded corners, clear visual hierarchy with bold headings and color-coded severity badges
- Layout Structure: Single-page dashboard with vertical scrolling, left-aligned content blocks, responsive grid for fault cards, sticky header for navigation
- Interactive Components: Drag-and-drop file upload zone with hover state, editable input fields for cost parameters with inline validation, collapsible fault detail rows, hover tooltips for technical terms
\n---

## 6. Key Features Summary

### Phase 1 Features
- Multi-format log file support (CSV/JSON/TXT)
- Indian sample data import for instant testing
- Automated fault detection and categorization
- Business-friendly explanations in plain language
- INR-based financial impact analysis
- Actionable resolution guidance
- Data export capabilities

### Phase 2 Features
- Single CSV upload for multi-site data
- Automated site, charger, and connector-level grouping
- Comprehensive revenue and utilization metrics
- Performance categorization (good/low/dead/underutilized)
- Rule-based business recommendations
- Visual reports and rankings
- Dead charger alerts

### Common Features
- No-login, instant-use tool\n- In-memory processing with no data storage
- Clean, business-friendly interface