/**
 * GCPL Client Configuration
 * Client-specific settings, branding, and business logic
 */

export const gcplConfig = {
  // Basic Information
  name: 'GCPL',
  displayName: 'GCPL Analytics',
  description: 'Godrej Consumer Products Limited - Analytics Dashboard',
  
  // Branding
  logo: '/assets/logos/gcpl-logo.png',
  favicon: '/assets/favicons/gcpl-favicon.ico',
  primaryColor: '#1976d2',
  secondaryColor: '#dc004e',
  accentColor: '#ff9800',
  
  // Business Configuration
  defaultBrand: 'Cinthol Grocery',
  supportedPlatforms: ['Flipkart', 'Amazon'],
  defaultPlatform: 'Flipkart',
  
  // Available Brands
  brands: [
    'Cinthol Grocery',
    'Godrej Expert',
    'Good Knight',
    'Hit',
    'Protekt'
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
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
    enableCaching: true,
    cacheTimeout: 300000 // 5 minutes
  },
  
  // Dashboard Configuration
  dashboard: {
    defaultWidgets: [
      'campaigns',
      'keywords',
      'products',
      'performance'
    ],
    enableCustomization: true,
    maxWidgets: 8
  },
  
  // Notification Settings
  notifications: {
    enableBudgetAlerts: true,
    enablePerformanceAlerts: true,
    enableSystemAlerts: true,
    budgetThreshold: 80, // percentage
    performanceThreshold: -20 // percentage change
  },
  
  // Export/Import Settings
  export: {
    enableExcel: true,
    enableCSV: true,
    enablePDF: true,
    maxRecords: 10000
  },
  
  // Custom Business Rules
  businessRules: {
    minBidAmount: 0.10,
    maxBidAmount: 100.00,
    minBudgetAmount: 10.00,
    maxBudgetAmount: 10000.00,
    bidIncrementStep: 0.05,
    budgetIncrementStep: 10.00
  }
};

export default gcplConfig;

