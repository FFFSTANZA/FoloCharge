# Folonite DMS Revenue Analyzer - User Guide

## Overview

The Revenue Analyzer is a powerful tool for Indian EV charging station operators to analyze multi-site performance, identify revenue opportunities, and get actionable business recommendations.

## Features

### 1. Session Data Upload
- **Supported Formats**: CSV, JSON
- **Required Fields**:
  - `siteId` - Unique identifier for the charging site
  - `chargerId` - Unique identifier for the charger
  - `connectorId` - Connector number
  - `energy_kWh` - Energy delivered in kilowatt-hours
  - `sessionDurationMin` - Session duration in minutes
  - `tariffINR` - Tariff rate in Indian Rupees
  - `revenueINR` - Revenue generated in Indian Rupees
  - `startTime` - Session start timestamp
  - `stopTime` - Session end timestamp

### 2. Try Sample Data
Click the "Try Sample Data" button to instantly load realistic Indian charging station data:
- 64 charging sessions
- 6 different sites (Mumbai, Delhi, Bangalore, Pune, Chennai, Hyderabad)
- 13 chargers with varying performance levels
- 3-day data range
- Mix of good performers, underutilized, and dead chargers

## Analytics Dashboard

### Overview Cards
The dashboard displays 6 key metrics:

1. **Total Sites** - Number of unique charging locations
2. **Total Chargers** - Total number of charging units
3. **Total Revenue** - Cumulative revenue in INR
4. **Total Energy** - Total energy delivered in kWh
5. **Avg Utilization** - Average utilization percentage across all chargers
6. **Issues** - Count of dead and underutilized chargers

### Site Analytics Tab

View comprehensive performance metrics for each site:

- **Revenue**: Total revenue generated with trend indicator
- **Energy**: Total energy delivered in kWh
- **Sessions**: Total number of charging sessions
- **Sessions/Day**: Average sessions per day
- **Avg Revenue**: Average revenue per session
- **Utilization**: Percentage of time chargers are in use
  - 🟢 High (≥60%)
  - 🟡 Medium (30-59%)
  - 🔴 Low (<30%)
- **Peak Hour**: Hour of day with most sessions
- **Chargers**: Number of chargers at the site

### Charger Analytics Tab

Detailed performance analysis for individual chargers:

- **Performance Classification**:
  - 🟢 **Good**: ≥5 sessions/day and ≥30% utilization
  - 🟡 **Low**: Between good and underutilized thresholds
  - 🟠 **Underutilized**: <10% utilization
  - 🔴 **Dead**: ≤1 session/day

- **Metrics Displayed**:
  - Revenue, Energy, Sessions
  - Sessions per day
  - Average revenue per session
  - Utilization percentage

### Recommendations Tab

AI-powered business recommendations based on your data:

#### Recommendation Types

1. **Increase Tariff** (Medium Priority)
   - **When**: Low average revenue but high utilization
   - **Action**: Increase pricing to match demand
   - **Impact**: Potential revenue increase calculation

2. **Relocate Charger** (Medium Priority)
   - **When**: Very low footfall and utilization
   - **Action**: Move to higher-traffic area
   - **Impact**: Opportunity cost of current location

3. **Add Charger** (High Priority)
   - **When**: Utilization >80%
   - **Action**: Install additional charging points
   - **Impact**: Estimated revenue from unmet demand

4. **Check Grid** (High Priority)
   - **When**: Low energy output per session
   - **Action**: Inspect power supply and voltage
   - **Impact**: Customer satisfaction and session completion

5. **Maintenance Needed** (High Priority)
   - **When**: Dead charger detected
   - **Action**: Check hardware, connectivity, app listing
   - **Impact**: Revenue loss from non-functional charger

6. **Optimize Pricing** (Medium Priority)
   - **When**: Underutilized charger
   - **Action**: Review pricing, improve visibility
   - **Impact**: Potential revenue increase

## How to Use

### Step 1: Upload Data
1. Navigate to the Revenue Analyzer page
2. Click "Select File" or drag and drop your CSV/JSON file
3. Or click "Try Sample Data" to explore with demo data

### Step 2: Review Overview
- Check the summary cards for high-level insights
- Identify total revenue, energy, and utilization
- Note any issues (dead or underutilized chargers)

### Step 3: Analyze Sites
- Switch to "Site Analytics" tab
- Sort sites by revenue or utilization
- Identify top performers and underperformers
- Note peak hours for each site

### Step 4: Analyze Chargers
- Switch to "Charger Analytics" tab
- Review performance classification
- Identify dead or underutilized chargers
- Compare chargers within the same site

### Step 5: Review Recommendations
- Switch to "Recommendations" tab
- Read each recommendation carefully
- Note the priority level (High/Medium/Low)
- Review the impact and suggested action
- Implement recommendations based on priority

## Business Insights

### Revenue Optimization
- **High Utilization Sites**: Consider adding more chargers
- **Low Revenue Sites**: Review pricing strategy
- **Peak Hours**: Optimize staffing and maintenance schedules

### Operational Efficiency
- **Dead Chargers**: Immediate maintenance required
- **Underutilized Chargers**: Review location and pricing
- **Low Energy Output**: Check grid voltage and power supply

### Growth Opportunities
- **Consistent High Demand**: Expand capacity
- **Low Footfall**: Consider relocation or marketing
- **Pricing Gaps**: Adjust tariffs to match market

## Sample Data Details

The included sample data represents:

### Sites
1. **Mumbai-Central**: 3 chargers, mixed performance
2. **Delhi-South**: 2 chargers, good performance
3. **Bangalore-Tech**: 2 chargers, good performance
4. **Pune-Highway**: 2 chargers, excellent performance
5. **Chennai-Port**: 2 chargers, one dead, one underutilized
6. **Hyderabad-IT**: 2 chargers, good performance

### Scenarios Demonstrated
- ✅ High-performing highway location (Pune)
- ✅ Good urban locations (Delhi, Bangalore, Hyderabad)
- ⚠️ Mixed performance site (Mumbai - includes dead charger)
- 🔴 Problematic location (Chennai - low footfall)

## Tips for Best Results

1. **Data Quality**: Ensure all required fields are present
2. **Date Range**: Include at least 7 days of data for accurate trends
3. **Consistency**: Use consistent naming for sites and chargers
4. **Completeness**: Include all sessions, even failed ones
5. **Regular Analysis**: Upload data weekly or monthly to track improvements

## Technical Notes

- All processing happens in your browser (no data uploaded to servers)
- Data is cleared when you close the page
- No login or account required
- Works offline after initial page load
- Supports large datasets (tested with 10,000+ sessions)

## Troubleshooting

### "No valid session data found"
- Check that your CSV has the correct headers
- Ensure all required fields are present
- Verify data types (numbers for energy, revenue, etc.)

### "Failed to process file"
- Check file format (CSV or JSON only)
- Ensure file is not corrupted
- Try the sample data to verify the tool is working

### Incorrect calculations
- Verify timestamp formats (ISO 8601 recommended)
- Check that revenue and energy values are numeric
- Ensure session durations are in minutes

## Support

For issues or questions:
1. Try the sample data first to verify functionality
2. Check that your data format matches the sample
3. Review the troubleshooting section above

---

**Version**: 1.0.0  
**Last Updated**: December 9, 2025  
**Compatible With**: Folonite DMS Phase 2
