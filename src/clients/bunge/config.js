/**
 * Bunge Client Configuration
 * Client-specific settings, branding, and business logic
 */

export const bungeConfig = {
  // Basic Information
  name: 'Bunge',
  displayName: 'Bunge Analytics',
  description: 'Bunge - Agricultural Products Analytics Dashboard',
  
  // Branding
  logo: '/assets/logos/bunge-logo.png',
  favicon: '/assets/favicons/bunge-favicon.ico',
  primaryColor: '#f57c00',
  secondaryColor: '#388e3c',
  accentColor: '#9c27b0',
  
  // Business Configuration
  defaultBrand: 'Bunge',
  supportedPlatforms: ['Amazon', 'Flipkart'],
  defaultPlatform: 'Flipkart',
  
  // Available Brands
  brands: [
    'Bunge',
    'Dalda',
    'Nutrela',
    'Fortune'
  ],
  
  // Feature Flags
  features: {
    campaigns: true,
    keywords: true,
    products: true,
    adGroups: true,
    smartControl: true,
    negativeKeywords: true,
    analytics: true,
    productAnalytics: true,
    searchTermInsights: true,
    budgetManagement: true,
    bidManagement: true,
    portfolios: true,
    goals: true,
    history: true
  },
  
  // UI Configuration
  ui: {
    showBrandSelector: true,
    showPlatformSelector: true,
    defaultDateRange: 30, // days
    maxDateRange: 365, // days
    refreshInterval: 300000, // 5 minutes in milliseconds
    enableAutoRefresh: true,
    showWalletBalance: true,
    enableNotifications: true
  },
  
  // API Configuration
  api: {
    timeout: 35000, // 35 seconds
    retryAttempts: 3,
    retryDelay: 2000, // 2 seconds
    enableCaching: true,
    cacheTimeout: 300000 // 5 minutes
  },
  
  // Dashboard Configuration
  dashboard: {
    defaultWidgets: [
      'campaigns',
      'keywords',
      'products',
      'performance',
      'analytics'
    ],
    enableCustomization: true,
    maxWidgets: 10
  },
  
  // Notification Settings
  notifications: {
    enableBudgetAlerts: true,
    enablePerformanceAlerts: true,
    enableSystemAlerts: true,
    budgetThreshold: 75, // percentage
    performanceThreshold: -30 // percentage change
  },
  
  // Export/Import Settings
  export: {
    enableExcel: true,
    enableCSV: true,
    enablePDF: true,
    maxRecords: 15000
  },
  
  // Custom Business Rules
  businessRules: {
    minBidAmount: 0.08,
    maxBidAmount: 75.00,
    minBudgetAmount: 8.00,
    maxBudgetAmount: 8000.00,
    bidIncrementStep: 0.02,
    budgetIncrementStep: 8.00
  }
};

export default bungeConfig;
