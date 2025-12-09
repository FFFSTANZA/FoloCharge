# Troubleshooting Guide

## React Hooks Error: "Cannot read properties of null (reading 'useRef/useState/useContext')"

### Problem
Runtime error showing React is null when hooks are being called:
```
Uncaught TypeError: Cannot read properties of null (reading 'useRef')
Uncaught TypeError: Cannot read properties of null (reading 'useState')
Uncaught TypeError: Cannot read properties of null (reading 'useContext')
```

### Root Cause
This error occurs when Vite's dependency pre-bundling cache becomes stale or corrupted, causing React to not be properly initialized when components try to use hooks.

### Solution Applied
✅ **Cleared Vite cache**: Removed `node_modules/.vite` directory

### Next Steps
The dev server needs to restart to regenerate the optimized dependencies. The error should be resolved automatically on next server start.

### If Error Persists
If the error continues after server restart, try these additional steps:

1. **Full dependency reinstall**:
   ```bash
   rm -rf node_modules
   rm -rf node_modules/.vite
   pnpm install
   ```

2. **Check for multiple React instances**:
   ```bash
   npm ls react
   npm ls react-dom
   ```
   Both should show only one version.

3. **Verify React versions match**:
   Check `package.json` - `react` and `react-dom` should have the same version.

### Technical Details
- **Error Type**: Runtime error (not build/lint error)
- **Affected Components**: All components using React hooks
- **Vite Behavior**: Vite pre-bundles dependencies for faster dev server startup
- **Cache Location**: `node_modules/.vite/deps/`
- **Fix**: Clearing cache forces Vite to regenerate optimized dependencies

### Prevention
This issue typically occurs when:
- Dependencies are updated
- New packages are installed
- Vite configuration changes
- Node modules are modified externally

To prevent:
- Restart dev server after installing new packages
- Clear Vite cache if you see unusual React errors
- Keep React and React-DOM versions in sync
