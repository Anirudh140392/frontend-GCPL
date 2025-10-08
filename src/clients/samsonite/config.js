/**
 * Samsonite Client Configuration
 * Client-specific settings, branding, and business logic
 */

export const samsoniteConfig = {
  // Basic Information
  name: 'Samsonite',
  displayName: 'Samsonite Analytics',
  description: 'Samsonite - Premium Luggage Analytics Dashboard',
  
  // Branding
  logo: '/assets/logos/samsonite-logo.png',
  favicon: '/assets/favicons/samsonite-favicon.ico',
  primaryColor: '#d32f2f',
  secondaryColor: '#1976d2',
  accentColor: '#ff5722',
  
  // Business Configuration
  defaultBrand: 'Samsonite',
  supportedPlatforms: ['Amazon', 'Flipkart'],
  defaultPlatform: 'Flipkart',
  
  // Available Brands
  brands: [
    'Samsonite',
    'American Tourister',
    'Delsey',
    'Tumi'
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
    showPlatformSelector: true, // Amazon and Flipkart
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
    budgetThreshold: 85, // percentage
    performanceThreshold: -15 // percentage change
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
    minBidAmount: 0.20,
    maxBidAmount: 50.00,
    minBudgetAmount: 20.00,
    maxBudgetAmount: 5000.00,
    bidIncrementStep: 0.10,
    budgetIncrementStep: 20.00
  }
};

export default samsoniteConfig;
