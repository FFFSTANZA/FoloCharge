# Phase 3: Predictive Failure Indicator

## Overview

The Predictive Failure Indicator is a rule-based pattern detection system that analyzes historical fault data to identify chargers at risk of imminent failure. This proactive approach helps operators prevent downtime and revenue loss by scheduling maintenance before failures occur.

## Key Features

### 1. Pattern Detection Engine

The system monitors six critical failure patterns:

#### Overheating Pattern
- **Threshold**: 3+ events in 7 days
- **Indicates**: Cooling fan failure or blocked ventilation
- **Risk**: Charger shutdown to prevent damage

#### OCPP Network Disconnect
- **Threshold**: 6+ disconnections in 24 hours
- **Indicates**: Unstable network connectivity or backend issues
- **Risk**: Session failures and revenue loss

#### Voltage Fluctuation
- **Threshold**: 5+ voltage-related faults in 7 days
- **Indicates**: Grid instability or faulty voltage regulation
- **Risk**: Charging interruptions

#### Repeated Restarts
- **Threshold**: 4+ restarts in 24 hours
- **Indicates**: Firmware issues or hardware instability
- **Risk**: Compromised charger reliability

#### Vehicle Aborts
- **Threshold**: 5+ vehicle-aborted sessions in 7 days
- **Indicates**: BMS communication issues or vehicle incompatibility
- **Risk**: Poor user experience and lost revenue

#### Power Module Issues
- **Threshold**: 3+ power-related faults in 7 days
- **Indicates**: Hardware failure in power delivery system
- **Risk**: Complete charger failure

### 2. Risk Classification

The system assigns risk levels based on pattern severity:

#### ⚠️ Medium Risk
- Single pattern detected with moderate frequency
- Recommended action within 5-7 days
- Estimated downtime: 7-21 days until failure

#### 🔥 High Risk
- Multiple patterns or high-frequency single pattern
- Recommended action within 2-3 days
- Estimated downtime: 3-10 days until failure

#### 🚨 Critical Risk
- Multiple critical patterns or extreme frequency
- **URGENT**: Action required within 24 hours
- Estimated downtime: 1-3 days until failure

### 3. Health Score Calculation

Each charger receives a health score (0-100) based on:

- **Pattern Severity**: Different weights for each pattern type
  - Overheating: -30 points max
  - Power Module Issues: -35 points max
  - OCPP Disconnect: -25 points max
  - Voltage Fluctuation: -20 points max
  - Repeated Restarts: -20 points max
  - Vehicle Aborts: -15 points max

- **Total Fault Count**: -0.5 points per fault (max -20)

**Health Score Interpretation**:
- 80-100: Healthy (Green)
- 60-79: Fair (Yellow)
- 40-59: Poor (Orange)
- 0-39: Critical (Red)

### 4. Revenue Impact Analysis

For each at-risk charger, the system calculates:

#### Estimated Revenue Loss
```
Total Loss = Downtime Loss + Degradation Loss

Downtime Loss = Repair Days × Sessions/Day × Avg Session Value
Degradation Loss = Days Until Failure × Sessions/Day × Avg Session Value × 30%
```

**Default Parameters**:
- Average Session Value: ₹120
- Average Sessions per Day: 14
- Estimated Repair Downtime: 3-7 days

#### Example Calculation
For a charger with 5 days until failure:
- Downtime Loss: 5 days × 14 sessions × ₹120 = ₹8,400
- Degradation Loss: 5 days × 14 sessions × ₹120 × 0.3 = ₹2,520
- **Total Estimated Loss**: ₹10,920

### 5. Actionable Recommendations

Each alert includes specific maintenance recommendations:

#### Overheating
- **Medium**: Schedule maintenance within 7 days. Check cooling fans and clean air vents.
- **High**: Schedule maintenance within 3 days. Inspect cooling system and thermal sensors.
- **Critical**: URGENT: Service within 24 hours. Cooling system failure imminent. Consider taking charger offline.

#### OCPP Disconnect
- **Medium**: Check network connectivity and OCPP backend status within 5 days.
- **High**: Inspect network equipment and backend configuration within 2 days.
- **Critical**: URGENT: Network infrastructure failing. Check immediately to prevent revenue loss.

#### Voltage Fluctuation
- **Medium**: Monitor grid voltage. Contact utility provider if issues persist.
- **High**: Inspect voltage regulation equipment within 3 days. May need grid upgrade.
- **Critical**: URGENT: Severe grid instability. Contact electrician and utility provider immediately.

#### Repeated Restarts
- **Medium**: Check firmware version and update if available. Monitor for 3 days.
- **High**: Inspect hardware components and update firmware within 2 days.
- **Critical**: URGENT: Hardware failure likely. Contact vendor for immediate support.

#### Vehicle Aborts
- **Medium**: Monitor vehicle compatibility. Update firmware if available.
- **High**: Check BMS communication settings. May need protocol updates.
- **Critical**: URGENT: Major compatibility issues. Contact vendor for protocol fix.

#### Power Module Issues
- **Medium**: Schedule power module inspection within 5 days.
- **High**: Inspect power delivery system within 2 days. Check for loose connections.
- **Critical**: URGENT: Power module failure imminent. Take charger offline and service immediately.

## User Interface

### Risk Summary Panel

Displays key metrics at a glance:
- Total Chargers Monitored
- Chargers At Risk
- Critical Alerts Count
- Average Fleet Health Score
- Total Estimated Revenue at Risk

### Predictive Alerts Tab

Shows detailed alerts for each at-risk charger:
- Risk level badge (Medium/High/Critical)
- Health score with color coding
- Detected patterns with counts
- Detailed explanation of issues
- Recommended actions
- Estimated time to failure
- Potential revenue loss

### Charger Health Tab

Displays health scores for all chargers:
- Visual health score bars
- Risk level badges
- Total fault counts
- Last fault date
- Critical pattern counts

## Sample Data

Two sample datasets are provided:

### Standard Sample (`sample-logs.csv`)
- 30 diverse fault entries
- Demonstrates all 11 fault types
- Suitable for general fault analysis

### Predictive Sample (`sample-logs-predictive.csv`)
- 73 fault entries with deliberate patterns
- Includes 6 chargers with different risk profiles:
  - **CHG-MUM-01**: Critical overheating (8 events in 7 days)
  - **CHG-DEL-02**: Critical OCPP disconnect (17 events in 24 hours)
  - **CHG-BLR-03**: High risk repeated restarts (20 events in 5 days)
  - **CHG-PUN-04**: Medium risk vehicle aborts (7 events in 7 days)
  - **CHG-CHN-05**: High risk power module issues (6 events in 6 days)
  - **CHG-HYD-06**: High risk voltage fluctuation (8 events in 7 days)

## Technical Implementation

### Architecture

```
Dashboard.tsx
├── FileUpload (with Predictive Sample button)
├── Tabs
│   ├── Fault Analysis (Phase 1)
│   ├── Predictive Alerts (Phase 3)
│   │   ├── RiskSummaryPanel
│   │   └── PredictiveAlerts
│   └── Charger Health (Phase 3)
│       ├── RiskSummaryPanel
│       └── ChargerHealthScore
```

### Data Flow

1. **Log Upload**: User uploads log file or loads predictive sample
2. **Fault Classification**: Faults are classified using Phase 1 logic
3. **Pattern Detection**: `patternDetector.ts` analyzes fault patterns
4. **Risk Calculation**: Health scores and risk levels computed
5. **UI Update**: React state updates trigger component re-renders
6. **Real-time Updates**: Changes to cost parameters recalculate all metrics

### Key Functions

#### `detectPredictiveAlerts()`
Main function that orchestrates pattern detection:
- Groups faults by charger
- Runs all 6 pattern detectors
- Calculates risk levels and health scores
- Generates explanations and recommendations
- Estimates revenue loss

#### `calculateChargerHealth()`
Computes health metrics for all chargers:
- Health score (0-100)
- Risk level classification
- Critical pattern count
- Total fault count

#### `calculatePredictiveSummary()`
Aggregates fleet-wide metrics:
- Total chargers monitored
- At-risk charger count
- Alert counts by severity
- Average health score
- Total estimated revenue loss

## Usage Guide

### For Operators

1. **Upload Logs**: Use the "Predictive Sample" button to see the system in action
2. **Review Alerts**: Check the "Predictive Alerts" tab for at-risk chargers
3. **Prioritize Actions**: Focus on Critical alerts first, then High, then Medium
4. **Schedule Maintenance**: Use recommended actions to plan maintenance
5. **Monitor Health**: Track charger health scores over time

### For Developers

1. **Customize Thresholds**: Edit pattern detection functions in `patternDetector.ts`
2. **Add New Patterns**: Create new detection functions following existing patterns
3. **Adjust Scoring**: Modify health score calculation weights
4. **Extend UI**: Add new visualizations in the components directory

## Benefits

### Proactive Maintenance
- Prevent unexpected downtime
- Schedule maintenance during off-peak hours
- Reduce emergency repair costs

### Revenue Protection
- Quantify revenue at risk
- Prioritize high-impact repairs
- Minimize lost charging sessions

### Data-Driven Decisions
- Objective risk assessment
- Clear action priorities
- Trackable health metrics

### Improved Reliability
- Identify systemic issues
- Track charger performance trends
- Optimize maintenance schedules

## Future Enhancements

Potential improvements for future versions:

1. **Historical Trending**: Track health scores over time
2. **Maintenance Scheduling**: Integrated calendar for planned maintenance
3. **Alert Notifications**: Email/SMS alerts for critical issues
4. **Pattern Learning**: Adaptive thresholds based on charger history
5. **Vendor Integration**: Automatic ticket creation for repairs
6. **Fleet Comparison**: Benchmark chargers against fleet averages
7. **Predictive Analytics**: Machine learning for more accurate predictions

## Conclusion

The Predictive Failure Indicator transforms reactive maintenance into proactive fleet management. By identifying at-risk chargers before they fail, operators can minimize downtime, protect revenue, and deliver better service to EV drivers.

---

**FoloCharge Phase 3** - Predictive Failure Indicator  
Rule-Based Pattern Detection for EV Charging Infrastructure
