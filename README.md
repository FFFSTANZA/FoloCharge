# FoloCharge - EV Charging Station Management Suite

## Overview

FoloCharge is a comprehensive web-based diagnostic and analytics platform designed for Indian EV charging station owners and operators. The suite includes two powerful modules:

1. **Fault Diagnoser** - Analyze charger failures and calculate revenue impact
2. **Revenue Analyzer** - Multi-site performance analysis and business recommendations

## Features

### Module 1: Fault Diagnoser
- Upload charger logs (CSV, JSON, TXT)
- Automatic fault detection and classification (11 fault types)
- Root cause analysis with plain-language explanations
- INR-based revenue loss calculations
- Severity classification (High/Medium/Low)
- Resolution guidance for each fault
- PDF and CSV export capabilities
- Sample data for instant demo

### Module 2: Revenue Analyzer
- Upload session data (CSV, JSON)
- Multi-site performance metrics
- Charger performance classification
- Utilization analysis
- Peak hour detection
- Business recommendations with impact calculations
- Dead and underutilized charger alerts
- Sample data for instant demo

## Quick Start

### Try the Application
1. Open the application in your browser
2. Use the navigation bar to switch between modules
3. Click "Try Sample Data" in either module to explore features
4. Upload your own data files for real analysis

### Sample Data
- **Fault Diagnoser**: 30 fault entries from Indian EV charging stations
- **Revenue Analyzer**: 64 sessions across 6 sites in India

## Documentation

- **USAGE_GUIDE.md** - Fault Diagnoser user guide
- **ANALYZER_GUIDE.md** - Revenue Analyzer user guide
- **FEATURES.md** - Complete feature list
- **IMPLEMENTATION_SUMMARY.md** - Phase 1 technical details
- **PHASE2_SUMMARY.md** - Phase 2 technical details

## Project Directory

```
├── README.md # Documentation
├── components.json # Component library configuration
├── eslint.config.js # ESLint configuration
├── index.html # Entry file
├── package.json # Package management
├── postcss.config.js # PostCSS configuration
├── public # Static resources directory
│   ├── favicon.png # Icon
│   ├── sample-logs.csv # Sample fault data
│   └── sample-sessions.csv # Sample session data
├── src # Source code directory
│   ├── App.tsx # Entry file with navigation
│   ├── components # Components directory
│   │   ├── analytics # Revenue analyzer components
│   │   ├── fault # Fault diagnoser components
│   │   └── ui # shadcn/ui components
│   ├── hooks # Common hooks directory
│   ├── index.css # Global styles
│   ├── lib # Utility library directory
│   ├── main.tsx # Entry file
│   ├── routes.tsx # Routing configuration
│   ├── pages # Pages directory
│   │   ├── Dashboard.tsx # Fault diagnoser page
│   │   └── Analyzer.tsx # Revenue analyzer page
│   ├── types # Type definitions directory
│   │   ├── fault.ts # Fault diagnoser types
│   │   └── analytics.ts # Revenue analyzer types
│   └── utils # Utility functions
│       ├── logParser.ts # Log file parser
│       ├── faultClassifier.ts # Fault classification
│       ├── costCalculator.ts # Cost calculations
│       ├── exportUtils.ts # Export functionality
│       ├── sessionParser.ts # Session data parser
│       ├── analyticsEngine.ts # Analytics calculations
│       └── recommendationEngine.ts # Business recommendations
├── tsconfig.app.json # TypeScript frontend configuration file
├── tsconfig.json # TypeScript configuration file
├── tsconfig.node.json # TypeScript Node.js configuration file
└── vite.config.ts # Vite configuration file
```

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Framework**: shadcn/ui + Tailwind CSS
- **Routing**: React Router
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **No Backend**: All processing happens in the browser

## Development Guidelines

### Environment Requirements

```
# Node.js ≥ 20
# npm ≥ 10
Example:
# node -v   # v20.18.3
# npm -v    # 10.8.2
```

### Installing Node.js on Windows

```
# Step 1: Visit the Node.js official website: https://nodejs.org/, click download. The website will automatically suggest a suitable version (32-bit or 64-bit) for your system.
# Step 2: Run the installer: Double-click the downloaded installer to run it.
# Step 3: Complete the installation: Follow the installation wizard to complete the process.
# Step 4: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### Installing Node.js on macOS

```
# Step 1: Using Homebrew (Recommended method): Open Terminal. Type the command `brew install node` and press Enter. If Homebrew is not installed, you need to install it first by running the following command in Terminal:
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
Alternatively, use the official installer: Visit the Node.js official website. Download the macOS .pkg installer. Open the downloaded .pkg file and follow the prompts to complete the installation.
# Step 2: Verify installation: Open Command Prompt (cmd) or your IDE terminal, and type `node -v` and `npm -v` to check if Node.js and npm are installed correctly.
```

### Development Setup

```bash
# Step 1: Download the code package
# Step 2: Extract the code package
# Step 3: Open the code package with your IDE and navigate into the code directory
# Step 4: In the IDE terminal, run the command to install dependencies
npm i

# Step 5: In the IDE terminal, run the command to start the development server
npm run dev -- --host 127.0.0.1

# Step 6: if step 5 failed, try this command to start the development server
npx vite --host 127.0.0.1
```

### Code Quality

```bash
# Run linting
npm run lint

# Build for production
npm run build
```

## Key Features

### No Backend Required
- All data processing happens in the browser
- No data uploaded to servers
- Works offline after initial load
- Privacy-focused design

### Indian Market Focus
- Currency in INR (₹)
- References to Indian EV models (Tata Nexon EV, MG ZS EV)
- Realistic Indian scenarios (grid issues, high temperatures)
- Business-friendly language

### Professional Design
- Clean, modern interface
- Professional blue color scheme
- Responsive design for all devices
- Intuitive navigation
- Color-coded status indicators

### Comprehensive Analytics
- 11 fault types detection
- 6 recommendation types
- Multi-level metrics (site/charger/connector)
- Revenue impact calculations
- Utilization analysis

## Use Cases

### For Charging Station Operators
1. **Diagnose Technical Issues**
   - Upload charger logs
   - Identify fault patterns
   - Get resolution guidance
   - Calculate downtime costs

2. **Optimize Business Performance**
   - Analyze multi-site revenue
   - Identify underperforming chargers
   - Get pricing recommendations
   - Plan capacity expansion

3. **Make Data-Driven Decisions**
   - Track utilization trends
   - Compare site performance
   - Prioritize maintenance
   - Maximize ROI

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Learn More

You can also check the help documentation: Download and Building the app（ [https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en](https://intl.cloud.baidu.com/en/doc/MIAODA/s/download-and-building-the-app-en)）to learn more detailed content.

## Version

**Current Version**: 1.0.0  
**Last Updated**: December 9, 2025  
**Status**: Production Ready

## License

Copyright 2025 FoloCharge
