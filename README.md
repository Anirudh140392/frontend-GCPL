# Frontend Unified - Multi-Client Monorepo

A unified React frontend that serves multiple clients (GCPL, Samsonite, Bowlers, and Bunge) with dynamic client switching and client-specific configurations.

## 🎯 **Overview**

This monorepo consolidates multiple frontend applications into a single, maintainable codebase that can dynamically serve different clients with their specific branding, configurations, and business logic.

### **Supported Clients**
- 🏢 **GCPL** - Godrej Consumer Products Limited (Flipkart + Amazon)
- 🧳 **Samsonite** - Premium Luggage Analytics (Flipkart + Amazon)
- 🏏 **Bowlers** - Sports Equipment Analytics (Flipkart + Amazon)
- 🌾 **Bunge** - Agricultural Products Analytics (Flipkart + Amazon)

## 🏗️ **Architecture**

```
frontend-unified/
├── src/
│   ├── shared/           # Shared components, utilities, services
│   ├── clients/          # Client-specific configurations
│   │   ├── gcpl/         # GCPL-specific config
│   │   ├── samsonite/    # Samsonite-specific config
│   │   ├── bowlers/      # Bowlers-specific config
│   │   └── bunge/        # Bunge-specific config
│   ├── services/         # API service, client context
│   ├── components/       # Shared UI components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Application pages
│   └── assets/           # Shared assets
├── public/               # Static assets
├── docs/                 # Documentation
└── scripts/              # Build and deployment scripts
```

## 🚀 **Key Features**

### **Dynamic Client Switching**
- Dropdown selector for switching between clients
- Persistent client selection in localStorage
- Automatic page reload with new client data
- Client-specific branding and theming

### **Client-Specific API Endpoints**
- Automatic API URL construction: `https://react-api-script.onrender.com/{client}/endpoint`
- Centralized endpoint management
- Client-specific error handling and logging

### **Configurable Features**
- Client-specific feature flags
- Business rule customization per client
- UI configuration per client
- Branding and theming per client

### **Shared Components**
- Reusable UI components across all clients
- Client-specific component overrides
- Consistent design system with client theming

## 🛠️ **Getting Started**

### **Prerequisites**
- Node.js >= 16.0.0
- npm >= 8.0.0

### **Installation**
```bash
# Clone the repository
git clone https://github.com/Anirudh140392/frontend-unified.git
cd frontend-unified

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Development**
```bash
# Start development server
npm run dev

# Run with specific client (optional)
VITE_CLIENT=gcpl npm run dev

# Lint code
npm run lint

# Run tests
npm run test
```

### **Building**
```bash
# Build for all clients
npm run build

# Build for specific client
npm run build:gcpl
npm run build:samsonite
npm run build:bowlers
npm run build:bunge
```

## 🔧 **Configuration**

### **Adding a New Client**

1. **Create client configuration:**
```javascript
// src/clients/newclient/config.js
export const newClientConfig = {
  name: 'NewClient',
  displayName: 'New Client Analytics',
  defaultBrand: 'New Brand',
  supportedPlatforms: ['Amazon'],
  primaryColor: '#1976d2',
  features: {
    campaigns: true,
    keywords: true,
    // ... other features
  }
};
```

2. **Update client index:**
```javascript
// src/clients/index.js
import { newClientConfig } from './newclient/config';

export const CLIENT_CONFIGS = {
  // ... existing clients
  newclient: newClientConfig
};
```

3. **Update API service:**
```javascript
// src/services/apiService.js
export const CLIENT_CONFIG = {
  // ... existing clients
  newclient: {
    name: 'NewClient',
    displayName: 'New Client Analytics',
    // ... configuration
  }
};
```

### **Client Configuration Options**

Each client can be configured with:

- **Basic Information**: name, displayName, description
- **Branding**: logo, favicon, colors
- **Business Logic**: defaultBrand, supportedPlatforms, brands
- **Feature Flags**: enable/disable specific features
- **UI Configuration**: date ranges, refresh intervals, widgets
- **API Settings**: timeouts, retry logic, caching
- **Business Rules**: bid limits, budget constraints

## 📡 **API Integration**

### **Endpoint Structure**
```
Base URL: https://react-api-script.onrender.com

Client-specific: /{client}/endpoint
- /gcpl/campaign
- /samsonite/campaign
- /bowlers/campaign
- /bunge/campaign

App-level: /app/endpoint
- /app/goals-add
- /app/display-goals
```

### **Using the API Service**
```javascript
import { apiCall, API_ENDPOINTS } from '../services/apiService';

// Make a client-specific API call
const response = await apiCall(API_ENDPOINTS.CAMPAIGNS, {
  method: 'GET'
}, {
  start_date: '2024-01-01',
  end_date: '2024-01-31'
});
```

## 🎨 **Theming and Branding**

Each client has its own branding configuration:

```javascript
const clientConfig = {
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  logo: '/assets/logos/client-logo.png',
  favicon: '/assets/favicons/client-favicon.ico'
};
```

The system automatically:
- Updates document title and favicon
- Applies client colors to UI components
- Shows client-specific logos and branding

## 🧪 **Testing**

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 📦 **Deployment**

### **Environment Variables**
```bash
# Optional: Set default client
VITE_CLIENT=gcpl

# API Configuration
VITE_API_BASE_URL=https://react-api-script.onrender.com
VITE_ENABLE_CACHE=true
VITE_CACHE_TIMEOUT=300000
```

### **Build Process**
The build process supports:
- Single build serving all clients
- Client-specific builds for separate deployments
- Environment-specific configurations
- Asset optimization and bundling

## 🔍 **Monitoring and Debugging**

### **Console Logging**
The system provides detailed console logging:
- 🌐 API calls with client context
- ✅ Successful operations
- ❌ Error states with client information
- 🔄 Client switching events

### **Error Handling**
- Client-specific error boundaries
- API error handling with retry logic
- User-friendly error messages
- Automatic error recovery

## 📚 **Documentation**

- [Architecture Guide](docs/ARCHITECTURE.md)
- [Client Configuration](docs/CLIENT_CONFIGURATION.md)
- [Development Workflow](docs/DEVELOPMENT.md)
- [API Reference](docs/API_REFERENCE.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in the `docs/` folder

---

**Built with ❤️ by the Trailytics Team**
