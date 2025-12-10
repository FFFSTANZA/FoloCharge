# Folonite DMS Fault Diagnoser - Usage Guide

## Overview
Folonite DMS is a web-based diagnostic tool for EV charging station owners to analyze charger failures, identify root causes, and calculate revenue impact in INR.

## Getting Started

### 1. Upload Log File
You have two options:

#### Option A: Try Sample Data (Recommended for First-Time Users)
- Click the **"Try Sample Data"** button to load pre-configured Indian EV charging station logs
- This demonstrates all features with realistic fault scenarios
- Includes data from popular Indian EVs (Tata Nexon EV, MG ZS EV)
- Shows various fault types across multiple days

#### Option B: Upload Your Own File
- Click "Select File" or drag and drop your log file into the upload area
- Supported formats: CSV, JSON, TXT
- The tool will automatically parse and analyze the file

### 2. View Fault Summary
After upload, you'll see:
- **Total Faults**: Number of issues detected
- **High Severity**: Critical issues requiring immediate attention
- **Medium Severity**: Issues to monitor and address soon
- **Low Severity**: Normal operations or minor issues

### 3. Review Cost Analysis
The revenue impact calculator shows:
- **Revenue Lost Today**: Financial impact from today's faults
- **Revenue Lost This Month**: Cumulative monthly losses
- **Top 5 Costliest Faults**: Ranked by total revenue impact

#### Editing Cost Parameters
Click "Edit Parameters" to customize:
- **Average Session Value**: Typical revenue per charging session (default: ₹120)
- **Average Sessions per Day**: Expected daily charging sessions (default: 14)

The calculator uses the formula:
```
Revenue Loss = (Avg Session Value × Avg Sessions/Day ÷ 24) × Downtime Hours
```

### 4. Detailed Fault Analysis
Click the expand button (▼) on any fault row to view:
- **Description**: What happened
- **Root Cause**: Why it happened
- **Impact**: Effect on operations
- **Resolution**: Recommended actions
- **Technical Details**: Error codes, temperature, voltage, current readings

### 5. Export Results
- **Export as PDF**: Complete analysis report with all details
- **Export as CSV**: Raw data for further processing in Excel/spreadsheet tools

## Fault Types Detected

### High Severity
1. **Overcurrent**: Current exceeded safe limits
2. **Overvoltage**: Voltage exceeded maximum threshold
3. **Overheating**: Temperature exceeded safe operating limits
4. **Power Module Failure**: Internal hardware failure
5. **Emergency Stop**: Emergency button activated
6. **Contactor Stuck**: Power relay malfunction

### Medium Severity
7. **Low Grid Voltage**: Input voltage below minimum
8. **BMS Communication Mismatch**: Vehicle communication failure
9. **OCPP Network Disconnect**: Lost connection to management system
10. **Repeated Soft Restarts**: Multiple automatic restart cycles

### Low Severity
11. **Vehicle-side Abort**: Normal user or vehicle-initiated stop

## Log File Format Examples

### CSV Format
```csv
timestamp,errorCode,connectorId,temperature,voltage,current,ocppStatus,transactionStopReason
2025-12-09 08:15:23,OC_001,Connector-1,45,380,85,Faulted,Overcurrent detected
```

### JSON Format
```json
[
  {
    "timestamp": "2025-12-09 08:15:23",
    "errorCode": "OC_001",
    "connectorId": "Connector-1",
    "temperature": 45,
    "voltage": 380,
    "current": 85,
    "ocppStatus": "Faulted",
    "transactionStopReason": "Overcurrent detected"
  }
]
```

### TXT Format
```
2025-12-09 08:15:23 ERROR: Overcurrent detected on Connector-1, Current: 85A
```

## Sample Data
A comprehensive sample log file is included with 30+ fault entries spanning 6 days, featuring:
- All 11 fault types for complete demonstration
- Realistic Indian EV charging scenarios
- References to popular Indian EV models (Tata Nexon EV, MG ZS EV)
- Common issues like grid voltage fluctuations, high ambient temperatures, and BMS compatibility
- Click **"Try Sample Data"** button to load instantly

## Tips for Best Results

1. **Regular Analysis**: Upload logs daily to track trends
2. **Accurate Parameters**: Update cost parameters to match your actual business metrics
3. **Prioritize High Severity**: Address high-severity faults immediately
4. **Track Patterns**: Use the "Top 5 Costliest Faults" to identify recurring issues
5. **Export Reports**: Keep PDF reports for maintenance records and vendor communication

## Privacy & Security
- All processing happens in your browser
- No data is sent to external servers
- No login or account required
- Data is cleared when you close the browser

## Troubleshooting

### No Faults Detected
- Verify your log file contains error codes or fault indicators
- Check that timestamps are in a recognizable format
- Ensure the file is not empty or corrupted

### Incorrect Fault Classification
- The tool uses pattern matching on error codes and messages
- Vendor-specific error codes may need manual interpretation
- Contact support for custom classification rules

### Export Issues
- Ensure pop-up blockers are disabled for downloads
- Check browser permissions for file downloads
- Try a different browser if issues persist

## Support
For questions or issues, refer to the documentation or contact your system administrator.
