# FoloCharge Fault Diagnoser Requirements Document
\n## 1. Application Overview\n
### 1.1 Application Name
FoloCharge – Fault Diagnoser

### 1.2 Application Description
A web-based diagnostic tool designed for Indian EV charging station owners to analyze charger failures through log file uploads. The tool provides fault categorization, root cause analysis, and revenue loss calculations in INR.

### 1.3 Target Users
EV charging station owners and operators in the Indian market

## 2. Core Functionality
\n### 2.1 Log Upload & Parsing Module
- Support file formats: CSV, JSON, TXT\n- Auto-extract key fields from charger logs:
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
- Provide a'Load Indian Sample Data' button
- Pre-load representative log data from Indian EV charging scenarios
- Allow users to test all diagnostic features without uploading their own files
- Sample data includes typical fault patterns observed in Indian grid conditions

### 2.3 Fault Classification Engine
Rule-based categorization into 11 fault types:
- Overcurrent
- Overvoltage
- Low grid voltage
- Overheating\n- BMS communication mismatch
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
- Severity level: Low / Medium / High\n- Resolution guidance:
  - Electrician required
  - Vendor support needed
  - Simple local reset

### 2.5 Downtime Cost Calculator (INR)
- Calculate revenue loss using formula: avg_sessions_per_day × avg_ticket_size_in_INR × (downtime_hours/24)
- Default parameters (user-editable):
  - Average Session Value: ₹120\n  - Average Sessions per Day: 14
- Display metrics:\n  - Revenue lost today
  - Revenue lost this month
  - Top 5 costliest faults ranking

### 2.6 Export Functionality
- Export analysis results as PDF
- Export data tables as CSV

## 3. Technical Architecture

### 3.1 Data Processing\n- Client-side or ephemeral session processing
- No backend database storage
- No user authentication system

### 3.2 Session Management
- Temporary session-based data handling\n- Data cleared after session ends\n
## 4. User Interface Design

### 4.1 Dashboard Layout
Four main sections:
1. **Fault Summary Panel**: Overview of detected issues
2. **Detailed Fault Table**: Comprehensive fault listing with all analysis details
3. **Cost Analysis Section**: INR-based revenue loss visualization
4. **Export Controls**: PDF/CSV download options

### 4.2 Upload Area
- Drag-and-drop file upload zone
- 'Load Indian Sample Data' button positioned prominently next to upload area
- Button styled with secondary color scheme to distinguish from primary actions
\n### 4.3 Design Style
- Color Scheme: Professional blue (#2563EB) as primary color, paired with neutral grays (#F3F4F6 background, #1F2937 text) and alert red (#DC2626) for high-severity warnings
- Visual Elements: Card-based layout with subtle shadows (01px 3px rgba(0,0,0,0.1)), 8px rounded corners, clear visual hierarchy with bold headings and color-coded severity badges
- Layout Structure: Single-page dashboard with vertical scrolling, left-aligned content blocks, responsive grid for fault cards, sticky header for navigation
- Interactive Components: Drag-and-drop file upload zone with hover state, editable input fields for cost parameters with inline validation, collapsible fault detail rows, hover tooltips for technical terms
\n## 5. Key Features Summary
- Multi-format log file support (CSV/JSON/TXT)
- Indian sample data import for instant testing
- Automated fault detection and categorization
- Business-friendly explanations in plain language
- INR-based financial impact analysis
- Actionable resolution guidance
- No-login, instant-use tool
- Data export capabilities