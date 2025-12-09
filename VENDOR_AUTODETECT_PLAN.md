# Vendor-Agnostic Log Format Detection - Implementation Plan

## Overview
Add automatic log format detection and normalization for all major EV charger vendors in India.

## Phase 1: Core Detection Engine
- [ ] Create vendor signature database
- [ ] Implement format detection logic
- [ ] Build pattern matching system
- [ ] Add OCPP event recognition

## Phase 2: Field Mapping System
- [ ] Create standard field schema
- [ ] Build vendor-specific field mappings
- [ ] Implement auto-normalization
- [ ] Handle multi-vendor formats

## Phase 3: Validation Layer
- [ ] Timestamp validation and fixing
- [ ] Data integrity checks
- [ ] Error detection and correction
- [ ] Warning system

## Phase 4: Integration
- [ ] Integrate with Fault Diagnoser
- [ ] Integrate with Predictive Failure
- [ ] Integrate with Cost Analysis
- [ ] Add detection UI banner

## Phase 5: Testing
- [ ] Test with sample vendor logs
- [ ] Validate normalization accuracy
- [ ] Check edge cases

## Supported Vendors
1. Delta
2. ABB
3. Exicom
4. Servotech
5. Fortum
6. Statiq
7. Tata Power
8. Charge+Zone
9. OCPP 1.6J Standard
10. Custom OEM formats

## File Structure
```
src/
  utils/
    vendorDetection.ts       # Main detection engine
    vendorSignatures.ts      # Vendor patterns database
    fieldMapper.ts           # Field normalization
    logValidator.ts          # Validation layer
    logNormalizer.ts         # Unified output generator
  types/
    vendor.types.ts          # Vendor-related types
```

## Standard Output Schema
```typescript
{
  timestamp: string;
  errorCode: string;
  connectorId: string;
  status: string;
  voltage: number;
  current: number;
  meterValue: number;
  temperature: number;
  vendorErrorString: string;
  restartCount: number;
  detectedVendor: string;
  detectedFormat: string;
}
```
