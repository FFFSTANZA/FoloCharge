# FoloCharge Requirements Document\n
## 1. Application Overview

### 1.1 Application Name\nFoloCharge – Fault Diagnoser & Site Revenue Analyzer

### 1.2 Application Description
A comprehensive web-based diagnostic and analytics platform designed for Indian EV charging station owners. The tool provides three core modules:
- **Phase 1**: Fault Diagnoser – Analyzes charger failures through log file uploads, providing fault categorization, root cause analysis, and revenue loss calculations in INR
- **Phase 2**: Multi-Site Revenue & Utilization Analyzer – Analyzes monthly revenue output (MRO) and site performance using CSV upload
- **Phase 3**: Predictive Failure Indicator – Rule-based pattern detection engine that warns about soon-to-fail chargers

### 1.3 Target Users
EV charging station owners and operators in the Indian market

---

## 2. Phase 1: Fault Diagnoser Module

### 2.1 Log Upload & Parsing
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

### 3.1 CSV Upload
- Single CSV file upload containing fields:
  - siteId
  - chargerId
  - connectorId
  - energy_kWh
  - sessionDurationMin
  - tariffINR
  - revenueINR
  - startTime
  - stopTime

### 3.2 Data Grouping & Processing
Automatically group data by:
- Site level
- Charger level
- Connector level

### 3.3 Site-Level Metrics
For each site, calculate and display:
- Total revenue (INR)
- Total energy delivered (kWh)
- Average session revenue (INR)
- Average session duration (minutes)
- Utilization percentage (minutes used / minutes in month)
- Sessions per day
- Peak hour identification\n
### 3.4 Charger-Level Performance Analysis
For each charger, identify and categorize:
- **Good Performer**: High utilization and revenue generation
- **Low Performer**: Below-average metrics
- **Dead Chargers**: 0–1 sessions per day
- **Underutilized Chargers**: Less than 10% usage

### 3.5 Insights & Recommendations
Generate rule-based business suggestions:
- 'Increase tariff by ₹5 to match local demand'
- 'Move charger — extremely low footfall'
- 'Add another charger — consistently high peak usage'\n- 'Low energy output — possible grid under-voltage issue'

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

## 4. Phase 3: Predictive Failure Indicator Module

### 4.1 Module Purpose
Rule-based pattern detection engine that analyzes historical log data to identify chargers at risk of imminent failure, enabling proactive maintenance and revenue protection.

### 4.2 Pattern Detection Rules
Trigger 'Likely Failure Soon' alert if any of the following patterns are detected:
- Overheating events: 3+ occurrences within 7 days
- OCPP disconnect: More than 6 times in 24 hours
- Voltage fluctuation: More than 10% deviation repeatedly
- Repeated charger restarts: More than 4 per day
- Vehicle-aborted sessions: 5+ occurrences
- Power module current imbalance: Detected in logs

### 4.3 Risk Badge Classification
Three risk levels based on pattern severity and frequency:
- ⚠️ **Medium Failure Risk**: Single pattern detected, moderate frequency
- 🔥 **High Failure Risk**: Multiple patterns detected or high frequency of single pattern
- 🚨 **Critical — Failure Imminent**: Severe patterns with very high frequency or combination of multiple high-risk indicators

### 4.4 Failure Explanations
For each detected risk, provide:
- Pattern description (what was detected)
- Likely root cause (e.g., 'Connector 2 has 5 overheating events this week. Likely cooling fan failure.')
- Recommended action (e.g., 'Get it serviced soon', 'Replace power module', 'Check grid connection')
- Urgency level (Immediate / Within 3 days / Within 1 week)\n
### 4.5 Charger Health Score
Calculate health score (0-100) for each charger based on:
- Frequency of detected patterns
- Severity of issues
- Time since last incident
- Overall uptime percentage

Score ranges:
- 80-100: Healthy
- 60-79: Monitor Closely
- 40-59: Service Recommended
- 0-39: Critical — Service Immediately

### 4.6 Revenue Impact Estimation
For each at-risk charger, calculate estimated revenue loss if failure occurs:
- Formula: avg_sessions_per_day × avg_ticket_size_in_INR × estimated_downtime_days
- Default estimated downtime: 3 days for Medium Risk, 5 days for High Risk, 7 days for Critical
- Display as'Potential Revenue Loss:₹X if not fixed'

### 4.7 Risk Summary Panel
Display in Phase 1 dashboard:\n- Total chargers at risk count
- Breakdown by risk level (Medium / High / Critical)
- Top 3 highest-risk chargers with health scores
- Total potential revenue at risk (INR)
\n### 4.8 Detailed Risk Table
For each at-risk charger, show:
- Charger ID / Connector ID
- Risk badge (⚠️ / 🔥 / 🚨)
- Health score
- Detected patterns list
- Explanation and recommended action
- Estimated revenue loss (INR)
- Days until predicted failure

### 4.9 Integration with Phase 1
- Add 'Predictive Alerts' section below Fault Summary Panel
- Highlight at-risk chargers in Detailed Fault Table with risk badges
- Include predictive metrics in Cost Analysis Section
- Export predictive analysis in PDF/CSV reports

---

## 5. Technical Architecture

### 5.1 Data Processing\n- Client-side or ephemeral session processing
- No backend database storage
- No user authentication system
- All processing runs in memory

### 5.2 Session Management
- Temporary session-based data handling
- Data cleared after session ends
\n### 5.3 Runtime Error Fix
- Issue: 'Cannot read properties of null (reading useRef)' in BrowserRouter
- Solution: Ensure React context is properly initialized before BrowserRouter renders. Verify React and React-DOM versions are compatible (both 18.3.1). Wrap BrowserRouter in a proper React root element and ensure no null references in parent components.
- Implementation: Check that ReactDOM.createRoot is used correctly and BrowserRouter is not rendered before React context initialization.

---

## 6. User Interface Design

### 6.1 Phase 1 Dashboard Layout
Five main sections:
1. **Fault Summary Panel**: Overview of detected issues\n2. **Predictive Alerts Section**: Risk summary panel with at-risk chargers overview (NEW)
3. **Detailed Fault Table**: Comprehensive fault listing with all analysis details and risk badges
4. **Cost Analysis Section**: INR-based revenue loss visualization including predictive revenue at risk
5. **Export Controls**: PDF/CSV download options\n
### 6.2 Phase 1 Upload Area
- Drag-and-drop file upload zone
- 'Load Indian Sample Data' button positioned prominently next to upload area
- Button styled with secondary color scheme to distinguish from primary actions

### 6.3 Phase 2 Interface Structure
- Tab-based navigation for Upload CSV, Site Analytics, Charger Analytics, and Recommendations
- CSV upload area with drag-and-drop support
- Data tables with sorting and filtering capabilities
- Visual charts for site comparison and revenue ranking
- Alert badges for dead and underutilized chargers

### 6.4 Phase 3 Risk Visualization
- Color-coded risk badges: Yellow (⚠️ Medium), Orange (🔥 High), Red (🚨 Critical)
- Health score displayed as circular progress indicator with color gradient
- Collapsible risk detail cards with pattern timeline visualization
- Sticky risk summary bar at top of dashboard when at-risk chargers detected

### 6.5 Design Style
- Color Scheme: Professional blue (#2563EB) as primary color, paired with neutral grays (#F3F4F6 background, #1F2937 text), alert red (#DC2626) for high-severity warnings, and risk-level colors (Yellow #F59E0B for Medium, Orange #F97316 for High, Red #DC2626 for Critical)
- Visual Elements: Card-based layout with subtle shadows (01px 3px rgba(0,0,0,0.1)),8px rounded corners, clear visual hierarchy with bold headings and color-coded severity badges, circular health score indicators with gradient fills
- Layout Structure: Single-page dashboard with vertical scrolling, left-aligned content blocks, responsive grid for fault cards, sticky header for navigation, collapsible predictive alerts section
- Interactive Components: Drag-and-drop file upload zone with hover state, editable input fields for cost parameters with inline validation, collapsible fault detail rows, hover tooltips for technical terms, expandable risk pattern timelines

---

## 7. Key Features Summary

### Phase 1 Features
- Multi-format log file support (CSV/JSON/TXT)
- Indian sample data import for instant testing
- Automated fault detection and categorization
- Business-friendly explanations in plain language
- INR-based financial impact analysis
- Actionable resolution guidance
- Data export capabilities
- Predictive failure alerts integration (NEW)

### Phase 2 Features
- Single CSV upload for multi-site data
- Automated site, charger, and connector-level grouping
- Comprehensive revenue and utilization metrics
- Performance categorization (good/low/dead/underutilized)
- Rule-based business recommendations
- Visual reports and rankings
- Dead charger alerts
\n### Phase 3 Features (NEW)
- Rule-based pattern detection (no AI required)
- Three-tier risk classification (Medium / High / Critical)
- Charger health scoring (0-100 scale)
- Predictive failure explanations with root cause analysis
- Estimated revenue loss calculations for at-risk chargers
- Proactive maintenance recommendations
- Risk summary dashboard integration
- In-memory processing with no data storage

### Common Features
- No-login, instant-use tool
- In-memory processing with no data storage
- Clean, business-friendly interface