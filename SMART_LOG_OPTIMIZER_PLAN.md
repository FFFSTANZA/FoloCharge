# Smart Log Optimizer Implementation Plan

## Overview
Implement client-side large file processing (50MB-300MB) with smart optimization engine.

## Core Features

### 1. Large File Handling
- **Streaming**: Process files in 1-2MB chunks
- **Web Workers**: Offload parsing to prevent UI blocking
- **Progress Tracking**: Real-time progress with ETA
- **Memory Management**: Process incrementally, avoid loading entire file

### 2. Smart Optimization Engine
- **Noise Removal**: Filter heartbeats, boot notifications, vendor spam
- **Deduplication**: Remove duplicate OCPP status updates
- **Compression**: Merge repeating fault events
- **Normalization**: Fix timestamps, convert to IST, auto-fill missing fields

### 3. Performance Dashboard
- Total lines processed
- Cleaned lines count
- Duplicates removed
- Fault clusters detected
- Size reduction percentage

## Implementation Steps

### Phase 1: Web Worker Setup
- [ ] Create log processing Web Worker
- [ ] Implement chunk-based file reading
- [ ] Add progress messaging between worker and main thread

### Phase 2: Smart Optimizer Engine
- [ ] Noise filter (heartbeats, boot notifications)
- [ ] Duplicate detector
- [ ] Fault event merger
- [ ] Timestamp normalizer
- [ ] Missing field auto-filler

### Phase 3: UI Components
- [ ] Progress modal with stages
- [ ] Progress bars with ETA
- [ ] Performance dashboard
- [ ] Optimization summary

### Phase 4: Integration
- [ ] Update UniversalUpload to use optimizer
- [ ] Add optimization toggle
- [ ] Update data flow to use optimized data

## Technical Architecture

```
User uploads file
    ↓
Main Thread: Read file in chunks (1-2MB)
    ↓
Web Worker: Process each chunk
    - Parse lines
    - Apply noise filters
    - Detect duplicates
    - Normalize data
    ↓
Main Thread: Receive processed chunks
    ↓
Merge & Classify: Create FaultAnalysis[]
    ↓
Store in Global State
```

## Files to Create
1. `src/workers/logProcessor.worker.ts` - Web Worker for log processing
2. `src/utils/logOptimizer.ts` - Smart optimization engine
3. `src/utils/chunkReader.ts` - Chunk-based file reader
4. `src/components/upload/OptimizationProgress.tsx` - Progress modal
5. `src/components/upload/PerformanceDashboard.tsx` - Optimization stats

## Files to Modify
1. `src/components/upload/UniversalUpload.tsx` - Add optimizer integration
2. `src/utils/logParser.ts` - Support streaming mode
3. `src/context/DataContext.tsx` - Add optimization stats

## Success Criteria
- ✅ Handle 300MB files without freezing
- ✅ Show smooth progress with ETA
- ✅ Remove noise and duplicates
- ✅ Compress repeating events
- ✅ Display optimization statistics
- ✅ All processing client-side (no backend)
