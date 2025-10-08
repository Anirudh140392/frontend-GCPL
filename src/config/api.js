/**
 * API Configuration
 * Centralized configuration for all API endpoints
 */

// Get the base URL from environment variables
const getApiBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  
  if (!baseUrl) {
    console.error('VITE_API_BASE_URL is not defined in environment variables');
    // Fallback to the original URL for backward compatibility
    return 'https://react-api-script.onrender.com';
  }
  
  return baseUrl;
};

// Export the base URL
export const API_BASE_URL = getApiBaseUrl();

// Export common API endpoint builders
export const buildApiUrl = (endpoint) => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Export specific endpoint builders for different modules
export const buildGcplUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/gcpl/${cleanEndpoint}`;
};

export const buildAppUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/app/${cleanEndpoint}`;
};

export const buildBowlersUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/bowlers/${cleanEndpoint}`;
};

export const buildSamsoniteUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/samsonite/${cleanEndpoint}`;
};

  // Export a default configuration object
export default {
  baseUrl: API_BASE_URL,
  buildUrl: buildApiUrl,
  gcpl: buildGcplUrl,
  app: buildAppUrl,
  bowlers: buildBowlersUrl,
  samsonite: buildSamsoniteUrl
};
