# FoloCharge Fault Diagnoser - Feature Summary

## ✨ Key Features

### 🚀 Quick Start with Sample Data
- **One-Click Demo**: "Try Sample Data" button loads realistic Indian EV charging station logs instantly
- **Comprehensive Examples**: 30+ fault entries covering all 11 fault types
- **Indian Context**: Includes references to popular Indian EVs (Tata Nexon EV, MG ZS EV)
- **Real Scenarios**: Grid voltage issues, high ambient temperatures, BMS compatibility problems

### 📁 Multi-Format Log Support
- **CSV Files**: Comma-separated values with headers
- **JSON Files**: Structured JSON objects or arrays
- **TXT/LOG Files**: Plain text with pattern matching
- **Drag & Drop**: Easy file upload with visual feedback

### 🔍 Intelligent Fault Classification
Automatically detects and classifies 11 fault types:

#### High Severity (Requires Immediate Action)
1. **Overcurrent**: Current exceeded safe operating limits
2. **Overvoltage**: Voltage exceeded maximum threshold
3. **Overheating**: Temperature exceeded safe limits
4. **Power Module Failure**: Internal hardware malfunction
5. **Emergency Stop**: Emergency button activated
6. **Contactor Stuck**: Power relay failure

#### Medium Severity (Monitor & Address Soon)
7. **Low Grid Voltage**: Input voltage below minimum
8. **BMS Communication Mismatch**: Vehicle communication failure
9. **OCPP Network Disconnect**: Lost connection to management system
10. **Repeated Soft Restarts**: Multiple automatic restart cycles

#### Low Severity (Normal Operations)
11. **Vehicle-side Abort**: User or vehicle-initiated stop

### 📊 Comprehensive Fault Analysis
For each detected fault, provides:
- **Description**: What happened in plain language
- **Root Cause**: Technical explanation of why it occurred
- **Impact**: Effect on charging operations and uptime
- **Severity Level**: Color-coded badges (High/Medium/Low)
- **Resolution Guidance**: Actionable steps to fix the issue
  - Electrician required
  - Vendor support needed
  - Simple local reset
- **Technical Details**: Error codes, temperature, voltage, current readings

### 💰 Revenue Impact Calculator (INR)
- **Real-Time Calculations**: Automatic revenue loss computation
- **Editable Parameters**: 
  - Average Session Value (default: ₹120)
  - Average Sessions per Day (default: 14)
- **Financial Metrics**:
  - Revenue lost today
  - Revenue lost this month
  - Top 5 costliest faults ranking
- **Formula**: `(Avg Session Value × Avg Sessions/Day ÷ 24) × Downtime Hours`

### 📈 Visual Dashboard
- **Summary Cards**: Quick overview with color-coded severity counts
- **Expandable Table**: Detailed fault information with collapsible rows
- **Cost Analysis Charts**: Top 5 costliest faults with occurrence counts
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### 📤 Export Capabilities
- **PDF Reports**: Complete analysis with all fault details, formatted for printing
- **CSV Data**: Raw data export for Excel/spreadsheet analysis
- **One-Click Download**: Instant file generation and download

### 🎨 Professional Design
- **Color Scheme**: Professional blue (#2563EB) with semantic colors
- **Card-Based Layout**: Clean, organized interface with subtle shadows
- **Severity Badges**: Color-coded visual indicators
  - Red: High severity
  - Orange: Medium severity
  - Green: Low severity
- **Dark Mode Support**: Automatic theme switching

### 🔒 Privacy & Security
- **Client-Side Processing**: All analysis happens in your browser
- **No Data Storage**: No backend database or data retention
- **No Authentication**: Instant use without login
- **Session-Based**: Data cleared when browser closes

### 🇮🇳 Indian Market Focus
- **INR Currency**: All financial calculations in Indian Rupees (₹)
- **Local Context**: Fault descriptions reference Indian grid conditions
- **Popular EVs**: Sample data includes Tata Nexon EV, MG ZS EV
- **Regional Issues**: Addresses common problems like:
  - Grid voltage fluctuations during peak hours
  - High ambient temperatures affecting cooling
  - Transformer voltage drops
  - BMS compatibility with Indian EV models

## 🛠️ Technical Highlights

### Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and optimized builds
- **PDF Generation**: jsPDF with autoTable plugin
- **Icons**: Lucide React icon library

### Performance
- **Fast Processing**: Client-side parsing and analysis
- **Optimized Rendering**: Efficient React component structure
- **Lazy Loading**: Components load on demand
- **Responsive**: Smooth performance on all devices

### Code Quality
- **TypeScript**: Full type safety throughout the application
- **Linting**: Biome for code quality and consistency
- **Component Structure**: Modular, reusable components
- **Best Practices**: Following React and TypeScript conventions

## 📱 User Experience

### Intuitive Workflow
1. Upload log file or try sample data
2. View instant fault summary
3. Review detailed analysis
4. Adjust cost parameters if needed
5. Export results as PDF or CSV

### Helpful Features
- **Toast Notifications**: Real-time feedback for all actions
- **Loading States**: Visual indicators during processing
- **Error Handling**: Clear error messages with guidance
- **Tooltips**: Contextual help for technical terms
- **Expandable Details**: Click to see more information

### Accessibility
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: Semantic HTML structure
- **Color Contrast**: WCAG compliant color combinations
- **Responsive Text**: Readable on all screen sizes

## 🎯 Use Cases

### For Charging Station Owners
- Daily log analysis to identify recurring issues
- Revenue impact assessment for downtime
- Maintenance planning based on fault patterns
- Vendor communication with detailed reports

### For Operations Teams
- Quick fault diagnosis without technical expertise
- Prioritization of repairs based on severity
- Tracking of fault trends over time
- Documentation for insurance claims

### For Maintenance Technicians
- Detailed technical information for troubleshooting
- Resolution guidance for common issues
- Historical fault data for pattern recognition
- Export capabilities for record keeping

## 🌟 Benefits

### Time Savings
- Instant fault analysis (no manual log review)
- Automated classification (no technical expertise needed)
- Quick export for reporting

### Cost Reduction
- Identify most expensive faults to prioritize fixes
- Calculate accurate revenue loss for budgeting
- Prevent recurring issues through pattern analysis

### Better Decision Making
- Data-driven maintenance scheduling
- Evidence-based vendor discussions
- Clear prioritization of repairs

### Improved Operations
- Faster fault resolution
- Better uptime tracking
- Enhanced customer satisfaction
