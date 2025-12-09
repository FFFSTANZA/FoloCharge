# Critical Fixes - Data Flow & Module Separation

## Status: In Progress

## Issues to Fix

### 1. Remove Duplication Between Fault Diagnosis & Cost Analysis ⏳
**Current Problem**:
- Both modules show similar tables
- Fault Diagnosis shows faults + cost data
- Cost Analysis shows faults + cost data

**Required Fix**:
- Fault Diagnosis = ONLY fault details (type, severity, timestamp, connector, resolution)
- Cost Analysis = ONLY INR impact (revenue loss calculations, cost metrics, financial summary)
- NO overlapping tables

### 2. Predictive Failure Page Not Working ✅
**Current Problem**:
- Predictive Failure uses Dashboard component (placeholder)
- No dedicated page implementation
- Missing health scores, risk badges, pattern detection

**Required Fix**:
- ✅ Create dedicated PredictiveFailure.tsx page
- ✅ Display health scores (0-100)
- ✅ Show risk badges (Critical/High/Medium/Low)
- ✅ Pattern detection visualization
- ✅ Independent functionality

### 3. Multiple Upload Zones ✅
**Current Problem**:
- Each module has its own upload component
- Data parsed multiple times
- No shared state

**Required Fix**:
- ✅ Single universal upload zone on Dashboard Home
- ✅ Upload once, use everywhere
- ✅ Global state management:
  - `globalParsedLogsData` (charger logs)
  - `globalParsedRevenueData` (revenue CSV)

### 4. No Unified Data Processing ✅
**Current Problem**:
- Each module processes data independently
- No central "Process All Data" button

**Required Fix**:
- ✅ Single "Import All Data" button
- ✅ One-click processing for all modules:
  - Fault Diagnoser
  - Downtime Cost Analysis
  - Predictive Failure
  - Performance Analytics
- ⏳ Sample data import button (loads everything)

## Implementation Plan

### Step 1: Create Global State Management ✅
- [x] Create context for global data state
- [x] Add globalParsedLogsData
- [x] Add globalParsedRevenueData
- [x] Add processing status flags

### Step 2: Centralized Upload on Dashboard Home ✅
- [x] Create UniversalUpload component
- [x] Support multiple file types (logs + revenue)
- [x] Single "Process All Data" button
- [ ] Sample data import button

### Step 3: Separate Fault Diagnosis & Cost Analysis ⏳
- [ ] Fault Diagnosis: Remove cost/revenue tables
- [ ] Fault Diagnosis: Show only fault details
- [ ] Cost Analysis: Remove fault detail tables
- [ ] Cost Analysis: Show only financial metrics

### Step 4: Create Dedicated Predictive Failure Page ✅
- [x] Create PredictiveFailure.tsx
- [x] Implement health score calculation
- [x] Add risk badge display
- [x] Pattern detection visualization
- [x] Independent from other modules

### Step 5: Update All Modules to Use Global State ⏳
- [ ] Dashboard reads from global state
- [ ] Fault Diagnosis reads from global state
- [ ] Cost Analysis reads from global state
- [x] Predictive Failure reads from global state
- [ ] Performance Analytics reads from global state

### Step 6: Remove Local Upload Components ⏳
- [ ] Remove upload from Fault Diagnosis
- [ ] Remove upload from Cost Analysis
- [ ] Remove upload from Performance Analytics
- [x] Keep only central upload on Dashboard Home

### Step 7: Testing ⏳
- [ ] Test single upload flow
- [ ] Test "Process All Data" button
- [ ] Test sample data import
- [ ] Verify no duplication between modules
- [x] Verify Predictive Failure works independently
- [x] Run lint checks (passing)

## Files Created ✅
1. src/context/DataContext.tsx - Global state management
2. src/components/upload/UniversalUpload.tsx - Central upload component
3. src/pages/PredictiveFailure.tsx - Dedicated predictive page
4. src/utils/healthCalculator.ts - Health score calculation

## Files Modified ✅
1. src/App.tsx - Wrapped with DataProvider
2. src/routes.tsx - Added PredictiveFailure route
3. src/pages/DashboardHome.tsx - Added UniversalUpload component

## Files to Modify (Next)
1. src/pages/Dashboard.tsx - Separate Fault/Cost views, use global state
2. src/pages/Analyzer.tsx - Use global state
3. src/utils/sampleDataLoader.ts - Create sample data loader
4. src/context/DataContext.tsx - Implement loadSampleData function

## Success Criteria
- ✅ Single upload zone on Dashboard Home
- ✅ One "Process All Data" button
- ⏳ Fault Diagnosis shows ONLY faults
- ⏳ Cost Analysis shows ONLY INR impact
- ✅ Predictive Failure has dedicated working page
- ⏳ All modules read from global state
- ⏳ No duplicate data parsing
- ⏳ Sample data loads everything at once
