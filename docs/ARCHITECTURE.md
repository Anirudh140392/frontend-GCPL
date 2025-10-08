# Frontend Unified - Architecture Guide

## 🏗️ **Overview**

The Frontend Unified monorepo is designed as a scalable, maintainable solution that serves multiple clients from a single codebase while maintaining client-specific configurations, branding, and business logic.

## 🎯 **Design Principles**

### **1. Single Source of Truth**
- One codebase serves all clients
- Shared components and utilities
- Centralized configuration management
- Unified development and deployment pipeline

### **2. Client Isolation**
- Client-specific configurations
- Independent feature flags
- Separate branding and theming
- Isolated business rules

### **3. Scalability**
- Easy addition of new clients
- Modular component architecture
- Configurable feature system
- Performance optimization

### **4. Maintainability**
- Clear separation of concerns
- Consistent code patterns
- Comprehensive documentation
- Automated testing

## 📁 **Directory Structure**

```
frontend-unified/
├── src/
│   ├── shared/                 # Shared utilities and components
│   │   ├── components/         # Reusable UI components
│   │   ├── utils/             # Utility functions
│   │   ├── constants/         # Application constants
│   │   └── types/             # TypeScript type definitions
│   │
│   ├── clients/               # Client-specific configurations
│   │   ├── gcpl/
│   │   │   ├── config.js      # GCPL configuration
│   │   │   ├── assets/        # GCPL-specific assets
│   │   │   └── overrides/     # Component overrides
│   │   ├── samsonite/
│   │   ├── bowlers/
│   │   ├── bunge/
│   │   └── index.js           # Client configuration exports
│   │
│   ├── services/              # API and external services
│   │   ├── apiService.js      # Centralized API service
│   │   ├── cacheService.js    # Caching utilities
│   │   ├── authService.js     # Authentication service
│   │   └── storageService.js  # Local storage utilities
│   │
│   ├── contexts/              # React contexts
│   │   ├── ClientContext.jsx  # Client state management
│   │   ├── AuthContext.jsx    # Authentication context
│   │   └── ThemeContext.jsx   # Theme management
│   │
│   ├── components/            # Application components
│   │   ├── layout/            # Layout components
│   │   ├── forms/             # Form components
│   │   ├── charts/            # Chart components
│   │   └── common/            # Common UI components
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useClient.js       # Client management hook
│   │   ├── useApi.js          # API interaction hook
│   │   └── useAuth.js         # Authentication hook
│   │
│   ├── pages/                 # Application pages
│   │   ├── Dashboard/         # Dashboard page
│   │   ├── Campaigns/         # Campaigns page
│   │   ├── Keywords/          # Keywords page
│   │   └── Analytics/         # Analytics page
│   │
│   └── assets/                # Static assets
│       ├── images/            # Images and icons
│       ├── styles/            # Global styles
│       └── fonts/             # Custom fonts
│
├── public/                    # Public static files
├── docs/                      # Documentation
├── scripts/                   # Build and deployment scripts
└── tests/                     # Test files
```

## 🔄 **Data Flow Architecture**

### **1. Client Selection Flow**
```
User Selects Client
       ↓
ClientSwitcher Component
       ↓
ClientContext.switchClient()
       ↓
apiService.switchClientWithBranding()
       ↓
Update localStorage + Document Title/Favicon
       ↓
Dispatch 'clientChanged' Event
       ↓
All Components Re-render with New Client Data
       ↓
Page Reload (Optional)
```

### **2. API Request Flow**
```
Component Makes API Call
       ↓
apiService.apiCall()
       ↓
getCurrentClient() → Get Active Client
       ↓
getApiUrlWithParams() → Build Client-Specific URL
       ↓
Add Authentication Headers
       ↓
Make HTTP Request
       ↓
Handle Response/Error
       ↓
Return Data to Component
```

### **3. Configuration Loading Flow**
```
Application Starts
       ↓
ClientProvider Initializes
       ↓
getCurrentClient() → Read from localStorage
       ↓
getClientConfig() → Load Client Configuration
       ↓
Apply Branding (Colors, Logo, Favicon)
       ↓
Set Feature Flags
       ↓
Initialize UI Components
```

## 🧩 **Component Architecture**

### **1. Component Hierarchy**
```
App
├── ClientProvider
│   ├── AuthProvider
│   │   ├── ThemeProvider
│   │   │   ├── Layout
│   │   │   │   ├── Header (with ClientSwitcher)
│   │   │   │   ├── Sidebar
│   │   │   │   └── Main Content
│   │   │   │       ├── Dashboard
│   │   │   │       ├── Campaigns
│   │   │   │       ├── Keywords
│   │   │   │       └── Analytics
```

### **2. Component Types**

#### **Shared Components**
- Used across all clients
- No client-specific logic
- Configurable through props
- Examples: DataTable, Charts, Forms

#### **Client-Aware Components**
- Use client context for configuration
- Adapt behavior based on client
- Examples: Header, Navigation, Dashboard

#### **Client-Specific Components**
- Located in client folders
- Override shared components
- Implement client-specific business logic

### **3. Component Communication**

#### **Props Down, Events Up**
- Parent components pass data via props
- Child components communicate via callbacks
- Minimal prop drilling through context

#### **Context for Global State**
- Client state (ClientContext)
- Authentication state (AuthContext)
- Theme state (ThemeContext)

#### **Custom Events for Cross-Component Communication**
- Client change events
- Data refresh events
- Error handling events

## 🔧 **Service Architecture**

### **1. API Service**
```javascript
apiService
├── getCurrentClient()          # Get active client
├── getApiUrl()                # Build client-specific URLs
├── apiCall()                  # Make authenticated requests
├── getClientConfig()          # Get client configuration
└── switchClientWithBranding() # Switch client with UI updates
```

### **2. Cache Service**
```javascript
cacheService
├── get()                      # Retrieve cached data
├── set()                      # Store data in cache
├── invalidate()               # Clear specific cache
└── clear()                    # Clear all cache
```

### **3. Storage Service**
```javascript
storageService
├── getItem()                  # Get from localStorage
├── setItem()                  # Set in localStorage
├── removeItem()               # Remove from localStorage
└── clear()                    # Clear localStorage
```

## 🎨 **Theming Architecture**

### **1. Theme Structure**
```javascript
theme = {
  client: 'gcpl',
  colors: {
    primary: '#1976d2',
    secondary: '#dc004e',
    accent: '#ff9800'
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 14
  },
  spacing: 8,
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  }
}
```

### **2. Theme Application**
- Material-UI ThemeProvider
- CSS custom properties
- Styled components
- Dynamic favicon and title updates

## 🔐 **Security Architecture**

### **1. Authentication Flow**
```
User Login
    ↓
Validate Credentials
    ↓
Receive JWT Token
    ↓
Store in localStorage
    ↓
Add to API Headers
    ↓
Auto-refresh on Expiry
```

### **2. Authorization**
- Role-based access control
- Feature-level permissions
- Client-specific access rules
- API endpoint protection

### **3. Data Protection**
- Input validation and sanitization
- XSS protection
- CSRF protection
- Secure token storage

## 📊 **Performance Architecture**

### **1. Code Splitting**
- Route-based splitting
- Component lazy loading
- Vendor chunk separation
- Client-specific bundles

### **2. Caching Strategy**
- API response caching
- Browser caching
- Service worker caching
- CDN caching

### **3. Optimization Techniques**
- Bundle size optimization
- Image optimization
- Tree shaking
- Minification and compression

## 🧪 **Testing Architecture**

### **1. Testing Pyramid**
```
E2E Tests (Cypress)
    ↑
Integration Tests (React Testing Library)
    ↑
Unit Tests (Jest)
```

### **2. Test Categories**
- **Unit Tests**: Individual functions and components
- **Integration Tests**: Component interactions
- **E2E Tests**: Complete user workflows
- **Visual Tests**: UI consistency across clients

### **3. Test Organization**
```
tests/
├── unit/
│   ├── components/
│   ├── services/
│   └── utils/
├── integration/
│   ├── api/
│   └── workflows/
└── e2e/
    ├── client-switching/
    ├── authentication/
    └── core-features/
```

## 🚀 **Deployment Architecture**

### **1. Build Process**
```
Source Code
    ↓
Environment Configuration
    ↓
Client-Specific Builds
    ↓
Asset Optimization
    ↓
Bundle Generation
    ↓
Deployment Artifacts
```

### **2. Deployment Strategies**

#### **Single Deployment**
- One build serves all clients
- Runtime client detection
- Shared infrastructure

#### **Multi-Deployment**
- Separate builds per client
- Client-specific domains
- Independent scaling

### **3. CI/CD Pipeline**
```
Code Commit
    ↓
Automated Tests
    ↓
Build Generation
    ↓
Quality Checks
    ↓
Deployment
    ↓
Health Checks
```

## 🔍 **Monitoring Architecture**

### **1. Application Monitoring**
- Performance metrics
- Error tracking
- User analytics
- API monitoring

### **2. Client-Specific Monitoring**
- Client usage patterns
- Feature adoption
- Performance by client
- Error rates by client

### **3. Alerting System**
- Performance degradation
- Error rate spikes
- API failures
- Security incidents

## 🔄 **Scalability Considerations**

### **1. Horizontal Scaling**
- Stateless application design
- Load balancer compatibility
- CDN integration
- Database connection pooling

### **2. Vertical Scaling**
- Efficient memory usage
- CPU optimization
- Bundle size management
- Lazy loading implementation

### **3. Future Extensibility**
- Plugin architecture
- Micro-frontend compatibility
- API versioning
- Feature flag system

## 📈 **Metrics and KPIs**

### **1. Performance Metrics**
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)
- Bundle size per client

### **2. Business Metrics**
- Client adoption rates
- Feature usage statistics
- User engagement metrics
- Conversion rates

### **3. Technical Metrics**
- Build time
- Test coverage
- Code quality scores
- Dependency vulnerabilities

---

This architecture provides a solid foundation for the multi-client frontend monorepo while maintaining flexibility for future enhancements and scaling requirements.

