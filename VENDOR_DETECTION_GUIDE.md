# Vendor-Agnostic Log Format Detection Guide

## Overview

Folonite DMS now includes an intelligent **Vendor-Agnostic Log Format Detection** system that automatically identifies and normalizes log files from any EV charger manufacturer in India. No manual configuration required!

## Supported Vendors

The system automatically detects logs from:

1. **Delta Electronics** - Delta chargers and OCPP implementations
2. **ABB** - ABB Terra series and related products
3. **Exicom** - Exicom Power Solutions chargers
4. **Servotech** - Servotech EV charging stations
5. **Fortum** - Fortum Charge & Drive systems
6. **Statiq** - Statiq charging network logs
7. **Tata Power** - Tata Power EZ Charge stations
8. **Charge+Zone** - Charge+Zone network logs
9. **OCPP 1.6J** - Standard OCPP protocol logs
10. **Custom OEM** - Generic manufacturer logs

## Supported File Formats

- **CSV** - Comma-separated values with headers
- **JSON** - Single object or array of log entries
- **TXT** - Plain text console logs
- **OCPP** - OCPP protocol message logs
- **Mixed** - Combination of formats

## How It Works

### 1. Automatic Detection

When you upload a log file, the system:

1. **Analyzes Content**: Scans the first 5000 characters for vendor signatures
2. **Pattern Matching**: Looks for unique identifiers like:
   - `DELTA:OCPP`, `ABB_ERR_`, `EXICOM-CP`
   - `STQ_EVT`, `TATA_POWER`, `CHARGEZONE LOG BLOCK`
3. **Format Detection**: Identifies file structure (CSV, JSON, TXT)
4. **Confidence Scoring**: Calculates match confidence (0-100%)

### 2. Field Normalization

The system maps vendor-specific field names to Folonite DMS's standard schema:

| Standard Field | Vendor Examples |
|----------------|-----------------|
| `timestamp` | time, datetime, event_time, log_time, ts |
| `errorCode` | error_code, err_code, fault_code, alarm_code |
| `connectorId` | connector_id, evse_id, EVSE_ID, port, outlet |
| `voltage` | volt, v, volt_r, Volt_R, voltageL1 |
| `current` | amp, a, current_r, Current_R, currentL1 |
| `temperature` | temp, temp_c, Temp_C, temperatureC |
| `meterValue` | meter_value, energy, kwh, energy_delivered |

### 3. Data Validation & Auto-Fix

The system automatically:

- **Fixes Timestamps**: Converts various formats to ISO 8601
- **Normalizes Connector IDs**: Extracts numeric IDs from strings
- **Maps Error Codes**: Translates vendor codes to Folonite DMS fault types
- **Validates Ranges**: Checks voltage (0-1000V), current (0-500A), temperature (-50-150°C)
- **Removes Corrupted Lines**: Filters out empty or malformed entries

## UI Components

### Vendor Detection Banner

After processing, you'll see a banner showing:

- **Detected Vendor**: e.g., "ABB (CSV Format)"
- **Confidence Level**: High (80%+), Medium (50-80%), Low (<50%)
- **Entries Processed**: Total number of log entries
- **Auto-Fixed Count**: Number of entries corrected
- **Validation Warnings**: Any issues detected

### Example Banner

```
⚡ Vendor Detected: Delta (OCPP 1.6J Standard)
   High Confidence • 1,247 entries processed

   ✓ 1,247 entries    ⚠ 32 auto-fixed    ● 95% match

   Note: 32 invalid entries were fixed automatically.
```

## Field Mapping Examples

### Delta Charger CSV

**Original:**
```csv
event_time,delta_error,EVSE_ID,Volt_R,Temp_C
2024-12-09 10:30:00,DELTA_ERR_001,1,230,45
```

**Normalized:**
```json
{
  "timestamp": "2024-12-09T10:30:00.000Z",
  "errorCode": "OVERCURRENT",
  "connectorId": "1",
  "voltage": 230,
  "temperature": 45
}
```

### ABB Terra JSON

**Original:**
```json
{
  "log_time": "2024-12-09T10:30:00Z",
  "abbErrorCode": "ABB_ERR_OVERVOLT",
  "terra_connector": "2",
  "voltageL1": 245
}
```

**Normalized:**
```json
{
  "timestamp": "2024-12-09T10:30:00.000Z",
  "errorCode": "OVERVOLTAGE",
  "connectorId": "2",
  "voltage": 245
}
```

### OCPP 1.6J Log

**Original:**
```
[2024-12-09 10:30:00] StatusNotification: connector 1, ERROR: OverCurrent
```

**Normalized:**
```json
{
  "timestamp": "2024-12-09T10:30:00.000Z",
  "errorCode": "OVERCURRENT",
  "connectorId": "1",
  "status": "ERROR"
}
```

## Error Code Mapping

The system automatically maps vendor error codes to Folonite DMS fault types:

| Vendor Pattern | Folonite DMS Fault |
|----------------|------------------|
| OVERCURRENT, OC, OVER_CURRENT | OVERCURRENT |
| OVERVOLTAGE, OV, OVER_VOLT | OVERVOLTAGE |
| UNDERVOLTAGE, UV, LOW_VOLTAGE | LOW_VOLTAGE |
| OVERHEAT, TEMP, TEMPERATURE | OVERHEATING |
| BMS, COMMUNICATION | BMS_MISMATCH |
| OCPP, NETWORK, DISCONNECT | OCPP_DISCONNECT |
| POWER, MODULE, PM_FAIL | POWER_MODULE |
| EMERGENCY, ESTOP | EMERGENCY_STOP |
| CONTACTOR, RELAY | CONTACTOR_STUCK |
| RESTART, REBOOT | SOFT_RESTART |
| VEHICLE, EV_ABORT | VEHICLE_ABORT |

## Validation Warnings

Common warnings you might see:

- **Missing timestamp** - Set to current time
- **Invalid timestamp format** - Fixed to ISO 8601
- **Missing connector ID** - Set to 0
- **Invalid voltage value** - Out of range (0-1000V)
- **Invalid current value** - Out of range (0-500A)
- **Invalid temperature** - Out of range (-50-150°C)
- **Corrupted JSON** - Line skipped
- **Empty lines** - Removed

## Integration with Modules

The vendor detection system integrates seamlessly with all Folonite DMS modules:

### Fault Diagnosis
- Normalized logs feed directly into fault classifier
- Vendor-specific error codes mapped to standard faults
- All 11 fault types supported

### Predictive Failure
- Standardized data enables accurate health scoring
- Consistent field names across vendors
- Reliable trend analysis

### Cost Analysis
- Normalized timestamps for accurate downtime calculation
- Consistent connector IDs for per-charger analysis
- Reliable revenue loss estimates

### Performance Analytics
- Standardized metrics across all vendors
- Accurate site and charger comparisons
- Unified reporting

## Technical Details

### Detection Algorithm

1. **Content Sampling**: Read first 5KB of file
2. **Signature Matching**: Check for vendor patterns
3. **Header Analysis**: Parse CSV headers or JSON keys
4. **Confidence Calculation**: Score based on matches
5. **Format Identification**: Determine file structure

### Confidence Scoring

```
Confidence = (Matched Patterns / Total Patterns) × 100%

High:   80-100% - Strong vendor match
Medium: 50-79%  - Probable vendor match
Low:    0-49%   - Generic/unknown vendor
```

### Performance

- **Small Files (<5MB)**: Instant detection and processing
- **Large Files (5-50MB)**: Chunked processing with progress
- **Very Large Files (50-300MB)**: Optimized streaming with Smart Optimizer
- **Client-Side**: All processing in browser, no server upload

## Adding New Vendors

To add support for a new vendor, update `src/utils/vendorSignatures.ts`:

```typescript
{
  vendor: 'NewVendor',
  patterns: [
    'NEWVENDOR_LOG',
    'NV_CP',
    'NewVendor Charger',
  ],
  headerPatterns: ['nv_error', 'newvendor_event'],
  jsonKeyPatterns: ['newVendorError', 'nvConnectorId'],
  confidence: 0.90,
}
```

Then add field mappings in `FIELD_MAPPINGS`:

```typescript
errorCode: {
  standardField: 'errorCode',
  vendorFields: [
    // ... existing fields
    'nvErrorCode',
    'newvendor_error',
  ],
}
```

## Troubleshooting

### Low Confidence Detection

If you see low confidence (<50%):

1. Check if file contains actual log data
2. Verify file format is CSV, JSON, or TXT
3. Ensure headers/keys are present
4. File might be from unsupported vendor (will use generic mapping)

### Missing Fields

If some fields are not mapped:

1. Check vendor field names in original file
2. Add custom mappings if needed
3. System will use default values for missing fields

### Validation Errors

If you see many validation warnings:

1. Check timestamp format in original file
2. Verify numeric fields contain valid numbers
3. Ensure connector IDs are present
4. Review original log quality

## Best Practices

1. **Use Original Logs**: Don't pre-process or modify logs
2. **Include Headers**: CSV files should have header row
3. **Complete Data**: Ensure logs contain timestamp and error info
4. **File Size**: Use Smart Optimizer for files >5MB
5. **Multiple Vendors**: Process each vendor separately for best results

## API Reference

### Main Functions

```typescript
// Detect vendor and format
detectVendorAndFormat(content: string, filename: string): DetectionResult

// Normalize log file
normalizeLogFile(content: string, filename: string): Promise<NormalizationResult>

// Validate entries
validateLogBatch(entries: Partial<NormalizedLogEntry>[]): ValidationResult

// Map fields
mapFieldsToStandard(rawEntry: Record<string, unknown>): Partial<NormalizedLogEntry>
```

### Type Definitions

See `src/types/vendor.types.ts` for complete type definitions.

## Support

For issues or questions about vendor detection:

1. Check this guide first
2. Review validation warnings in the banner
3. Verify your log file format
4. Check if vendor is in supported list

## Future Enhancements

Planned improvements:

- [ ] Machine learning-based vendor detection
- [ ] Support for more regional vendors
- [ ] Custom vendor profile creation
- [ ] Advanced field mapping rules
- [ ] Multi-vendor log merging
- [ ] Vendor-specific fault patterns
