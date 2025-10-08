/**
 * Centralized API Service for Client-Specific Endpoints
 * Dynamically constructs API URLs based on selected client
 */

const BASE_URL = 'https://react-api-script.onrender.com';

/**
 * Get the currently selected client from localStorage
 * @returns {string} The selected client (gcpl, samsonite, bowlers)
 */
export const getCurrentClient = () => {
  const client = localStorage.getItem('selectedClient');
  return client ? client.toLowerCase() : 'gcpl'; // Default to gcpl
};

/**
 * Get the base API URL for the current client
 * @param {string} client - Optional client override
 * @returns {string} The client-specific base URL
 */
export const getClientBaseUrl = (client = null) => {
  const selectedClient = client || getCurrentClient();
  return `${BASE_URL}/${selectedClient}`;
};

/**
 * Construct a client-specific API URL
 * @param {string} endpoint - The API endpoint (without leading slash)
 * @param {string} client - Optional client override
 * @returns {string} The complete API URL
 */
export const getApiUrl = (endpoint, client = null) => {
  const baseUrl = getClientBaseUrl(client);
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${baseUrl}/${cleanEndpoint}`;
};

/**
 * API Endpoints Configuration
 * Centralized endpoint definitions for easy maintenance
 */
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: 'login',
  REGISTER: 'register',
  
  // Wallet & Balance
  WALLET_BALANCE: 'wallet_balance',
  
  // Performance Overview
  CAMPAIGNS: 'campaign',
  CAMPAIGN_GRAPH: 'campaign_graph',
  CAMPAIGN_PLAY_PAUSE: 'campaign-play-pause',
  ADGROUPS: 'adgroups',
  TOGGLE_AD_GROUP: 'toggle_ad_group',
  UPDATE_AD_GROUP_NAME: 'update_ad_group_name',
  KEYWORDS: 'keyword',
  KEYWORD_GRAPH: 'keyword_graph',
  TOGGLE_KEYWORD: 'toggle_keyword_or_target_state',
  PRODUCTS: 'product',
  PORTFOLIOS: 'portfolios',
  UPDATE_BID: 'update_bid',
  BUDGET_CHANGE: 'budget-change',
  
  // Smart Control
  DISPLAY_RULES: 'displayrules',
  UPDATE_RULE: 'update-rule',
  PLAY_PAUSE_RULE: 'play-pause-rule',
  DELETE_RULE: 'delete-rule',
  
  // Negative Keywords
  NEGATIVE_KEYWORD: 'negative_keyword',
  ADD_NEGATIVE_KEYWORD: 'add_negative_keyword',
  DELETE_NEGATIVE_KEYWORD: 'delete_negative_keyword',
  
  // Analytics
  PRODUCT_ANALYTICS: 'product-analytics',
  SEARCH_TERM_INSIGHTS: 'keyword-search-term-page',
  
  // History
  HISTORY: 'history',
  
  // Goals (app-level endpoints)
  GOALS_ADD: 'goals-add',
  ACHIEVED_GOALS_COUNT: 'achieved-goals-count',
  DISPLAY_GOALS: 'display-goals',
  AMAZON_PRODUCT_PLAY_PAUSE: 'amazon-product-play-pause'
};

/**
 * Special endpoints that use /app/ instead of client-specific paths
 */
const APP_ENDPOINTS = [
  API_ENDPOINTS.GOALS_ADD,
  API_ENDPOINTS.ACHIEVED_GOALS_COUNT,
  API_ENDPOINTS.DISPLAY_GOALS,
  API_ENDPOINTS.AMAZON_PRODUCT_PLAY_PAUSE
];

/**
 * Get API URL with special handling for app-level endpoints
 * @param {string} endpoint - The API endpoint
 * @param {Object} params - Query parameters
 * @param {string} client - Optional client override
 * @returns {string} The complete API URL
 */
export const getApiUrlWithParams = (endpoint, params = {}, client = null) => {
  let url;
  
  // Handle app-level endpoints
  if (APP_ENDPOINTS.includes(endpoint)) {
    url = `${BASE_URL}/app/${endpoint}`;
  } else {
    url = getApiUrl(endpoint, client);
  }
  
  // Add query parameters
  if (Object.keys(params).length > 0) {
    const queryString = new URLSearchParams(params).toString();
    url += `?${queryString}`;
  }
  
  return url;
};

/**
 * Client-specific configuration
 * Define any client-specific settings or overrides
 */
export const CLIENT_CONFIG = {
  gcpl: {
    name: 'GCPL',
    displayName: 'GCPL Analytics',
    defaultBrand: 'Cinthol Grocery',
    supportedPlatforms: ['Flipkart', 'Amazon']
  },
  samsonite: {
    name: 'Samsonite',
    displayName: 'Samsonite Analytics',
    defaultBrand: 'Samsonite',
    supportedPlatforms: ['Amazon']
  },
  bowlers: {
    name: 'Bowlers',
    displayName: 'Bowlers Analytics', 
    defaultBrand: 'Bowlers',
    supportedPlatforms: ['Amazon']
  }
};

/**
 * Get configuration for the current client
 * @param {string} client - Optional client override
 * @returns {Object} Client configuration
 */
export const getClientConfig = (client = null) => {
  const selectedClient = client || getCurrentClient();
  return CLIENT_CONFIG[selectedClient] || CLIENT_CONFIG.gcpl;
};

/**
 * Utility function to make API calls with automatic client detection
 * @param {string} endpoint - The API endpoint
 * @param {Object} options - Fetch options
 * @param {Object} params - Query parameters
 * @param {string} client - Optional client override
 * @returns {Promise} Fetch promise
 */
export const apiCall = async (endpoint, options = {}, params = {}, client = null) => {
  const url = getApiUrlWithParams(endpoint, params, client);
  
  // Add default headers
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  // Add authorization header if available
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    defaultHeaders.Authorization = `Bearer ${accessToken}`;
  }
  
  const fetchOptions = {
    ...options,
    headers: defaultHeaders
  };
  
  console.log(`API Call [${getCurrentClient().toUpperCase()}]:`, url);
  
  return fetch(url, fetchOptions);
};

export default {
  getCurrentClient,
  getClientBaseUrl,
  getApiUrl,
  getApiUrlWithParams,
  getClientConfig,
  apiCall,
  API_ENDPOINTS,
  CLIENT_CONFIG
};
