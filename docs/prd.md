# FoloCharge Requirements Document

## 1. Application Overview

### 1.1 Application Name
FoloCharge – Smarter EV Operations for India

### 1.2 Application Description
A premium, enterprise-level SaaS platform designed for Indian EV charging station owners and operators. FoloCharge integrates four core modules into a unified dashboard:\n- **Fault Diagnoser**: Analyzes charger failures through log file uploads with fault categorization and root cause analysis
- **Auto-Downtime Cost Calculator**: Calculates revenue loss in INR based on downtime\n- **Predictive Failure Indicator**: Rule-based pattern detection for proactive maintenance
- **Multi-Site Revenue Analyzer**: Comprehensive site and charger performance analytics

### 1.3 Tagline
Smarter EV Operations for India — No Setup, Just Upload.

### 1.4 Target Users
EV charging station owners, operators, and decision-makers in the Indian market\n
---

## 2. Navigation Structure

### 2.1 Left Vertical Sidebar
**Primary Menu**
- 🏠 Dashboard Home
- 🛠 Fault Diagnosis
- 💸 Cost Analysis
- ⚡ Predictive Failure
- 📊 Site Analytics
- 🔌 Charger Analytics
\n**Footer Section**
- Help & Documentation
- About FoloCharge
- Version Number (v1.0)
- Built by Folonite
\n### 2.2 Navigation Features
- Collapsible sections for clean interface
- Hover tooltips for menu items
- Active state highlighting for current page
- Smooth transitions between sections

---

## 3. Dashboard Home (Executive Summary)

### 3.1 Top Widgets (Large Cards)
Four primary metric cards displaying:
- **Today's Detected Faults**: Total count with severity breakdown
- **Estimated Downtime Loss**: INR amount for today and current month
- **Highest-Earning Sites**: Top 3 sites with revenue figures
- **Charger Risk Scores**: Count of chargers in High and Critical risk categories
\n### 3.2 Secondary Widgets
- **Usage Trend Graph**: Line chart showing last 7 days activity
- **Fault Category Distribution**: Pie chart with fault type breakdown
- **Sites Needing Immediate Attention**: Alert list with actionable items

### 3.3 Widget Design Requirements
- Color-coded by severity and status
- Bold typography for key numbers
- Subtle animations: fade-in on load, slide-up transitions, hover shadows
- Large readable numbers for quick scanning
- Icon representation for each metric type

---
\n## 4. Fault Diagnosis Module

### 4.1 Log Upload & Parsing
- Support file formats: CSV, JSON, TXT
- Drag-and-drop upload zone with hover state
- 'Load Indian Sample Data' button for instant testing
- Auto-extract key fields: errorCode, timestamp, connectorId, meterValue, temperature, voltage/current, OCPP status, transactionStopReason

### 4.2 Fault Classification Engine
Rule-based categorization into11 fault types:
- Overcurrent\n- Overvoltage\n- Low grid voltage
- Overheating
- BMS communication mismatch
- OCPP network disconnect
- Power module failure
- Vehicle-side abort
- Emergency stop
- Contactor stuck
- Repeated soft restarts
\n### 4.3 Fault Analysis Display
For each detected fault:
- Issue description
- Root cause analysis
- Impact on charging uptime
- Severity badge (Green: Normal, Orange: Warning, Red: Critical, Blue: Info)
- Resolution guidance with action type (Electrician required / Vendor support / Simple reset)
\n### 4.4 Detailed Fault Table
- Sortable and filterable columns
- Collapsible rows for detailed information
- Risk badges integrated for at-risk chargers
- Export functionality for selected faults

---

## 5. Cost Analysis Module

### 5.1 Downtime Cost Calculator (INR)
- Formula: avg_sessions_per_day × avg_ticket_size_in_INR × (downtime_hours/24)
- Default parameters (user-editable with inline validation):
  - Average Session Value: ₹120
  - Average Sessions per Day: 14
\n### 5.2 Display Metrics
- Revenue lost today\n- Revenue lost this month
- Top 5 costliest faults ranking with bar chart
- Total potential revenue at risk from predictive alerts

### 5.3 Visual Representation
- Large number displays with INR symbol
- Trend indicators (up/down arrows)
- Color-coded severity levels
- Interactive charts with hover details

---

## 6. Predictive Failure Module

### 6.1 Pattern Detection Rules
Trigger alerts based on:
- Overheating events:3+ occurrences within 7 days
- OCPP disconnect: More than 6 times in 24 hours
- Voltage fluctuation: More than 10% deviation repeatedly
- Repeated charger restarts: More than 4 per day
- Vehicle-aborted sessions: 5+ occurrences
- Power module current imbalance detected

### 6.2 Risk Classification
- ⚠️ **Medium Failure Risk** (Orange badge): Single pattern, moderate frequency
- 🔥 **High Failure Risk** (Orange badge): Multiple patterns or high frequency
- 🚨 **Critical — Failure Imminent** (Red badge): Severe patterns with very high frequency

### 6.3 Charger Health Score
- 0-100 scale displayed as circular progress indicator with color gradient
- Score ranges:\n  - 80-100: Healthy (Green)
  - 60-79: Monitor Closely (Yellow)
  - 40-59: Service Recommended (Orange)
  - 0-39: Critical — Service Immediately (Red)

### 6.4 Risk Summary Panel
- Total chargers at risk count
- Breakdown by risk level with color-coded badges
- Top 3 highest-risk chargers with health scores
- Total potential revenue at risk (INR)
- Sticky summary bar when at-risk chargers detected

### 6.5 Detailed Risk Table
For each at-risk charger:
- Charger ID / Connector ID\n- Risk badge with color coding
- Health score with circular indicator
- Detected patterns list
- Explanation and recommended action
- Estimated revenue loss (INR)
- Days until predicted failure
- Urgency level (Immediate / Within 3 days / Within 1 week)

### 6.6 Risk Detail Cards
- Collapsible cards for each at-risk charger
- Pattern timeline visualization
- Expandable sections for technical details
- Action buttons for maintenance scheduling
\n---

## 7. Site Analytics Module
\n### 7.1 CSV Upload\n- Single CSV file upload with drag-and-drop support
- Required fields: siteId, chargerId, connectorId, energy_kWh, sessionDurationMin, tariffINR, revenueINR, startTime, stopTime
\n### 7.2 Site-Level Metrics
For each site:
- Total revenue (INR)
- Total energy delivered (kWh)
- Average session revenue (INR)
- Average session duration (minutes)
- Utilization percentage
- Sessions per day
- Peak hour identification

### 7.3 Site Comparison Visualization
- Bar chart comparing revenue across sites
- Usage ranking table with sortable columns
- Color-coded performance indicators
- Interactive hover tooltips with detailed metrics

### 7.4 Insights & Recommendations
Rule-based business suggestions:
- Tariff adjustment recommendations
- Charger relocation alerts for low footfall
- Capacity expansion suggestions for high-demand sites
- Grid issue warnings for low energy output

---
\n## 8. Charger Analytics Module

### 8.1 Charger-Level Performance Analysis
Categorization:\n- **Good Performer** (Green badge): High utilization and revenue
- **Low Performer** (Yellow badge): Below-average metrics
- **Dead Chargers** (Red badge): 0–1 sessions per day
- **Underutilized Chargers** (Orange badge): Less than 10% usage

### 8.2 Charger Performance Table
- Sortable and filterable columns
- Performance badge for each charger
- Drill-down capability for connector-level data
- Alert indicators for dead and underutilized chargers

### 8.3 Visual Reports
- Revenue ranking by charger
- Utilization heatmap
- Dead charger alerts with recommended actions
- Performance trend graphs

---

## 9. Help & Documentation Features

### 9.1 Contextual Tooltips
One-line definitions for Indian EV terms:
- **OCPP**: Open Charge Point Protocol for charger communication
- **BMS**: Battery Management System in electric vehicles
- **Tariff**: Charging rate per kWh in INR
- **kWh**: Kilowatt-hour, unit of energy delivered
- **Session**: Single charging transaction from start to stop

### 9.2 Help Section
- Quick start guide
- Module-specific documentation
- FAQ section
- Sample data download links
- Contact support information

---

## 10. Export Capabilities

### 10.1 Export Formats
- PDF: Formatted reports with charts and tables
- CSV: Raw data tables
- Excel (XLSX): Structured workbooks with multiple sheets
\n### 10.2 Exportable Content
- Fault analysis reports
- Cost analysis summaries
- Predictive failure alerts
- Site performance reports
- Charger analytics data
- Visual charts and graphs

### 10.3 Export Controls
- Export buttons positioned consistently across modules
- Batch export option for multiple reports
- Custom date range selection for exports
- Preview before download functionality

---

## 11. Technical Architecture

### 11.1 Data Processing\n- Client-side processing only
- Session-based temporary data handling
- No backend database storage
- No user authentication system
- All processing runs in memory
- Data cleared after session ends

### 11.2 Workflow
Upload → Process → Show Insights → Export

### 11.3 Runtime Error Fix
- Issue: 'Cannot read properties of null (reading useRef)' in BrowserRouter
- Solution: Ensure React context is properly initialized before BrowserRouter renders. Verify React and React-DOM versions compatibility (both18.3.1). Wrap BrowserRouter in proper React root element with no null references in parent components.
- Implementation: Use ReactDOM.createRoot correctly and ensure BrowserRouter renders after React context initialization.

---

## 12. Branding & Visual Identity

### 12.1 Brand Elements
- **Name**: FoloCharge
- **Logo**: Simple electric bolt + F text combination
- **Footer Credit**: Built by Folonite\n\n### 12.2 Brand Application
Consistent branding across:
- Page headers
- Tooltips\n- Buttons
- Loading screens
- Export documents
- Error messages

---

## 13. Design Style\n
### 13.1 Color Scheme
- **Primary**: Electric Blue (#007BFF) for main actions and highlights
- **Background**: Midnight Black (#0A0A0A) for sidebar and headers
- **Content Background**: Pure White (#FFFFFF) for main content areas
- **Accent**: Neon Cyan (#04D9FF) for interactive elements and hover states
- **Status Colors**:
  - Green (#28A745): Normal, Healthy
  - Yellow (#FFC107): Warning, Monitor\n  - Orange (#F97316): High Risk, Underutilized
  - Red (#DC2626): Critical, Dead Chargers
  - Blue (#007BFF): Info, General alerts

### 13.2 Visual Elements
- **Card Layout**: Spacious cards with subtle shadows (0 2px 8px rgba(0,0,0,0.1)),12px rounded corners\n- **Typography**: High-contrast, bold headings (24-32px), readable body text (14-16px), large numbers for metrics (36-48px)
- **Iconography**: Consistent icon set for all modules and actions,24px standard size
- **Animations**: Fade-in on page load (300ms), slide-up for cards (400ms), hover shadows with smooth transitions (200ms), smooth page transitions between modules
- **Spacing**: Consistent 16px/24px/32px grid system, generous whitespace for readability

### 13.3 Layout Structure
- **Sidebar**: Fixed left vertical navigation (240px width), collapsible on smaller screens
- **Main Content**: Full-width content area with max-width 1400px, centered alignment
- **Dashboard Grid**: Responsive grid layout (4 columns on desktop, 2 on tablet, 1 on mobile)
- **Card Hierarchy**: Large cards for primary metrics, medium cards for secondary widgets, small cards for alerts

### 13.4 Interactive Components
- **Buttons**: Primary (Electric Blue), Secondary (outlined), Danger (Red for critical actions), all with hover and active states
- **Input Fields**: Clean borders, focus states with blue outline, inline validation messages
- **Tables**: Alternating row colors, sortable headers with icons, hover row highlighting
- **Charts**: Interactive with hover tooltips, color-coded by category, smooth animations on load
- **Badges**: Rounded pill shape, color-coded by severity, consistent sizing (24px height)

### 13.5 Responsive Design
- Full desktop experience (1920px+)
- Tablet optimization (768px-1024px)\n- Collapsible sidebar on smaller screens
- Stacked card layout on mobile
- Touch-friendly interactive elements

---

## 14. Key Features Summary

### 14.1 Unified Dashboard
- Single seamless interface combining all four modules
- Executive summary homepage with quick-glance insights
- Left vertical sidebar navigation with collapsible sections
- Consistent branding and visual hierarchy throughout

### 14.2 Premium UI/UX
- Enterprise-level design quality comparable to Datadog, Amplitude, ChargeLab
- Clean, structured layout with spacious cards
- High-contrast typography and bold numbers
- Smooth animations and transitions
- Comprehensive iconography\n- Contextual help tooltips

### 14.3 Comprehensive Analytics
- Fault diagnosis with11 fault types
- INR-based cost analysis
- Predictive failure detection with health scoring
- Multi-site revenue and utilization analysis
- Charger-level performance categorization
- Rule-based business recommendations
\n### 14.4 Export & Reporting
- Multiple export formats (PDF, CSV, Excel)
- Customizable report generation
- Visual charts and graphs included
- Batch export capabilities
\n### 14.5 No-Setup Operation
- No login required\n- No database storage
- Client-side processing only
- Session-based data handling
- Instant-use tool with sample data

---

## 15. Version Information
- **Current Version**: v1.0
- **Built by**: Folonite
- **Platform**: Web-based SaaS
- **Target Market**: Indian EV charging station operators