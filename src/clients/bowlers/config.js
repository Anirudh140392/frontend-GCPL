/**
 * Bowlers Client Configuration
 * Client-specific settings, branding, and business logic
 */

export const bowlersConfig = {
  // Basic Information
  name: 'Bowlers',
  displayName: 'Bowlers Analytics',
  description: 'Bowlers - Sports Equipment Analytics Dashboard',
  
  // Branding
  logo: '/assets/logos/bowlers-logo.png',
  favicon: '/assets/favicons/bowlers-favicon.ico',
  primaryColor: '#388e3c',
  secondaryColor: '#f57c00',
  accentColor: '#2196f3',
  
  // Business Configuration
  defaultBrand: 'Bowlers',
  supportedPlatforms: ['Amazon', 'Flipkart'],
  defaultPlatform: 'Flipkart',
  
  // Available Brands
  brands: [
    'Bowlers',
    'Cricket Pro',
    'Sports Elite'
  ],
  
  // Feature Flags
  features: {
    campaigns: true,
    keywords: true,
    products: true,
    adGroups: true,
    smartControl: true,
    negativeKeywords: false, // Bowlers doesn't use negative keywords
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
    showPlatformSelector: true, // Amazon and Flipkart
    defaultDateRange: 30, // days
    maxDateRange: 180, // days (shorter than others)
    refreshInterval: 600000, // 10 minutes in milliseconds
    enableAutoRefresh: true,
    showWalletBalance: true,
    enableNotifications: true
  },
  
  // API Configuration
  api: {
    timeout: 25000, // 25 seconds
    retryAttempts: 2,
    retryDelay: 1500, // 1.5 seconds
    enableCaching: true,
    cacheTimeout: 600000 // 10 minutes
  },
  
  // Dashboard Configuration
  dashboard: {
    defaultWidgets: [
      'campaigns',
      'keywords',
      'products',
      'performance'
    ],
    enableCustomization: false, // Simplified dashboard
    maxWidgets: 6
  },
  
  // Notification Settings
  notifications: {
    enableBudgetAlerts: true,
    enablePerformanceAlerts: true,
    enableSystemAlerts: false,
    budgetThreshold: 90, // percentage
    performanceThreshold: -25 // percentage change
  },
  
  // Export/Import Settings
  export: {
    enableExcel: true,
    enableCSV: true,
    enablePDF: false,
    maxRecords: 5000
  },
  
  // Custom Business Rules
  businessRules: {
    minBidAmount: 0.15,
    maxBidAmount: 25.00,
    minBudgetAmount: 15.00,
    maxBudgetAmount: 2500.00,
    bidIncrementStep: 0.05,
    budgetIncrementStep: 15.00
  }
};

export default bowlersConfig;
