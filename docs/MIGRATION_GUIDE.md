# Migration Guide - Frontend Unified Monorepo

This guide helps you migrate from separate frontend repositories to the unified monorepo approach.

## 🎯 **Migration Overview**

### **Before: Separate Repositories**
```
frontend-GCPL/          # GCPL-specific frontend
frontend-samsonite/     # Samsonite-specific frontend  
frontend-bowlers/       # Bowlers-specific frontend
FrontendBunge/          # Bunge-specific frontend
```

### **After: Unified Monorepo**
```
frontend-unified/       # Single repo serving all clients
├── src/clients/gcpl/   # GCPL configuration
├── src/clients/samsonite/  # Samsonite configuration
├── src/clients/bowlers/    # Bowlers configuration
└── src/clients/bunge/      # Bunge configuration
```

## 📋 **Migration Checklist**

### **Phase 1: Repository Setup**
- [ ] Create new `frontend-unified` repository
- [ ] Set up monorepo structure
- [ ] Configure build and deployment pipeline
- [ ] Set up development environment

### **Phase 2: Core Migration**
- [ ] Migrate API service and client context
- [ ] Migrate shared components and utilities
- [ ] Set up client-specific configurations
- [ ] Implement client switching functionality

### **Phase 3: Client-Specific Migration**
- [ ] Migrate GCPL-specific code and assets
- [ ] Migrate Samsonite-specific code and assets
- [ ] Migrate Bowlers-specific code and assets
- [ ] Migrate Bunge-specific code and assets

### **Phase 4: Testing and Validation**
- [ ] Test client switching functionality
- [ ] Validate API endpoints for all clients
- [ ] Test client-specific features
- [ ] Performance testing and optimization

### **Phase 5: Deployment and Cutover**
- [ ] Deploy to staging environment
- [ ] User acceptance testing
- [ ] Production deployment
- [ ] DNS/routing updates
- [ ] Decommission old repositories

## 🔧 **Step-by-Step Migration**

### **Step 1: Create New Repository**

1. **Create Repository**
   ```bash
   # Create new repository on GitHub
   # Repository name: frontend-unified
   # Description: Unified frontend monorepo for multi-client support
   ```

2. **Clone and Setup**
   ```bash
   git clone https://github.com/Anirudh140392/frontend-unified.git
   cd frontend-unified
   
   # Copy the prepared monorepo structure
   # (Files from /tmp/frontend-unified-setup/)
   ```

3. **Install Dependencies**
   ```bash
   npm install
   npm run dev  # Test development server
   ```

### **Step 2: Migrate Core Services**

1. **API Service Migration**
   ```bash
   # Copy existing apiService.js enhancements
   # Update endpoint configurations
   # Add client-specific URL building
   ```

2. **Client Context Setup**
   ```bash
   # Implement ClientContext for state management
   # Add client switching functionality
   # Set up event-driven updates
   ```

### **Step 3: Migrate Components**

1. **Shared Components**
   ```bash
   # Identify common components across repositories
   # Extract to src/shared/components/
   # Update imports and dependencies
   ```

2. **Client-Specific Components**
   ```bash
   # Move client-specific overrides to src/clients/{client}/
   # Update component imports
   # Test component functionality
   ```

### **Step 4: Configuration Migration**

1. **Environment Variables**
   ```bash
   # Consolidate .env files
   # Add client-specific variables
   # Update build scripts
   ```

2. **Build Configuration**
   ```bash
   # Update package.json scripts
   # Configure Vite for multi-client builds
   # Set up deployment scripts
   ```

### **Step 5: Asset Migration**

1. **Static Assets**
   ```bash
   # Migrate images, fonts, icons
   # Organize by client in assets folder
   # Update asset references
   ```

2. **Styling**
   ```bash
   # Consolidate CSS/LESS files
   # Set up client-specific theming
   # Update style imports
   ```

## 📊 **Data Migration**

### **API Endpoints**
```javascript
// Before (separate repos)
const GCPL_API = 'https://react-api-script.onrender.com/gcpl/';
const SAMSONITE_API = 'https://react-api-script.onrender.com/samsonite/';

// After (unified)
const getApiUrl = (endpoint, client) => {
  const selectedClient = client || getCurrentClient();
  return `https://react-api-script.onrender.com/${selectedClient}/${endpoint}`;
};
```

### **Local Storage**
```javascript
// Migration of existing localStorage data
const migrateLocalStorage = () => {
  // Preserve user preferences
  const existingData = {
    accessToken: localStorage.getItem('accessToken'),
    userPreferences: localStorage.getItem('userPreferences'),
    // ... other data
  };
  
  // Add client selection
  if (!localStorage.getItem('selectedClient')) {
    localStorage.setItem('selectedClient', 'gcpl'); // Default
  }
  
  return existingData;
};
```

## 🔄 **Component Migration Examples**

### **Header Component Migration**

**Before (frontend-GCPL):**
```jsx
// Header.jsx - GCPL specific
const Header = () => {
  return (
    <AppBar>
      <Toolbar>
        <img src="/gcpl-logo.png" alt="GCPL" />
        <Typography>GCPL Analytics</Typography>
      </Toolbar>
    </AppBar>
  );
};
```

**After (Unified):**
```jsx
// Header.jsx - Multi-client
import { useClient } from '../contexts/ClientContext';
import ClientSwitcher from './ClientSwitcher';

const Header = () => {
  const { clientConfig } = useClient();
  
  return (
    <AppBar>
      <Toolbar>
        <img src={clientConfig.logo} alt={clientConfig.name} />
        <Typography>{clientConfig.displayName}</Typography>
        <ClientSwitcher />
      </Toolbar>
    </AppBar>
  );
};
```

### **API Call Migration**

**Before (frontend-GCPL):**
```javascript
// Campaigns component - GCPL specific
const fetchCampaigns = async () => {
  const url = 'https://react-api-script.onrender.com/gcpl/campaign';
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.json();
};
```

**After (Unified):**
```javascript
// Campaigns component - Multi-client
import { apiCall, API_ENDPOINTS } from '../services/apiService';

const fetchCampaigns = async () => {
  const response = await apiCall(API_ENDPOINTS.CAMPAIGNS, {
    method: 'GET'
  });
  return response.json();
};
```

## 🧪 **Testing Migration**

### **Test Structure**
```
tests/
├── unit/
│   ├── services/
│   │   ├── apiService.test.js
│   │   └── clientContext.test.js
│   └── components/
│       ├── ClientSwitcher.test.jsx
│       └── Header.test.jsx
├── integration/
│   ├── client-switching.test.js
│   └── api-integration.test.js
└── e2e/
    ├── gcpl-workflow.spec.js
    ├── samsonite-workflow.spec.js
    ├── bowlers-workflow.spec.js
    └── bunge-workflow.spec.js
```

### **Migration Testing Checklist**
- [ ] Unit tests for API service
- [ ] Unit tests for client context
- [ ] Integration tests for client switching
- [ ] E2E tests for each client workflow
- [ ] Performance tests
- [ ] Cross-browser testing

## 🚀 **Deployment Migration**

### **Deployment Strategies**

#### **Option 1: Single Deployment**
```bash
# Build once, serve all clients
npm run build
# Deploy to single domain with client detection
```

#### **Option 2: Multi-Deployment**
```bash
# Build separately for each client
npm run build:gcpl
npm run build:samsonite
npm run build:bowlers
npm run build:bunge
# Deploy to separate domains/paths
```

### **DNS and Routing Updates**
```
# Before
gcpl.analytics.com → frontend-GCPL
samsonite.analytics.com → frontend-samsonite
bowlers.analytics.com → frontend-bowlers
bunge.analytics.com → FrontendBunge

# After (Option 1)
analytics.com → frontend-unified (with client detection)

# After (Option 2)
gcpl.analytics.com → frontend-unified/gcpl
samsonite.analytics.com → frontend-unified/samsonite
bowlers.analytics.com → frontend-unified/bowlers
bunge.analytics.com → frontend-unified/bunge
```

## 📈 **Performance Considerations**

### **Bundle Size Optimization**
```javascript
// Code splitting by client
const GCPLDashboard = lazy(() => import('./clients/gcpl/Dashboard'));
const SamsoniteDashboard = lazy(() => import('./clients/samsonite/Dashboard'));

// Dynamic imports based on client
const loadClientDashboard = (client) => {
  switch(client) {
    case 'gcpl': return import('./clients/gcpl/Dashboard');
    case 'samsonite': return import('./clients/samsonite/Dashboard');
    // ... other clients
  }
};
```

### **Caching Strategy**
```javascript
// Client-specific caching
const getCacheKey = (endpoint, params, client) => {
  return `${client}:${endpoint}:${JSON.stringify(params)}`;
};

// Cache invalidation on client switch
const handleClientChange = (newClient) => {
  // Clear cache for previous client
  clearClientCache(previousClient);
  // Load fresh data for new client
  loadClientData(newClient);
};
```

## 🔍 **Monitoring and Rollback**

### **Migration Monitoring**
- [ ] Set up error tracking for new monorepo
- [ ] Monitor performance metrics
- [ ] Track user adoption of client switching
- [ ] Monitor API response times per client

### **Rollback Plan**
```bash
# Emergency rollback procedure
1. Revert DNS changes
2. Restore old repository deployments
3. Notify users of temporary service restoration
4. Investigate and fix issues
5. Plan re-migration
```

## 📚 **Post-Migration Tasks**

### **Documentation Updates**
- [ ] Update README files
- [ ] Update API documentation
- [ ] Update deployment guides
- [ ] Update developer onboarding

### **Team Training**
- [ ] Train developers on monorepo structure
- [ ] Document new development workflow
- [ ] Update code review guidelines
- [ ] Share client configuration best practices

### **Repository Cleanup**
- [ ] Archive old repositories
- [ ] Update repository links
- [ ] Clean up old CI/CD pipelines
- [ ] Update dependency management

## ⚠️ **Common Migration Issues**

### **Import Path Issues**
```javascript
// Problem: Broken imports after migration
import Component from '../../components/Component';

// Solution: Use path aliases
import Component from '@components/Component';
```

### **Environment Variable Conflicts**
```javascript
// Problem: Client-specific env vars
REACT_APP_GCPL_API_URL=...
REACT_APP_SAMSONITE_API_URL=...

// Solution: Dynamic configuration
VITE_API_BASE_URL=https://react-api-script.onrender.com
// Client detection handles the rest
```

### **Asset Loading Issues**
```javascript
// Problem: Hardcoded asset paths
<img src="/gcpl-logo.png" />

// Solution: Dynamic asset loading
<img src={clientConfig.logo} />
```

## 🎉 **Migration Success Criteria**

- [ ] All clients load correctly
- [ ] Client switching works seamlessly
- [ ] API calls use correct endpoints
- [ ] Performance is maintained or improved
- [ ] All tests pass
- [ ] No critical bugs in production
- [ ] User experience is maintained
- [ ] Development workflow is improved

---

This migration guide provides a comprehensive roadmap for transitioning to the unified monorepo approach while maintaining functionality and improving maintainability.

