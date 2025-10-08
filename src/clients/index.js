/**
 * Client Configurations Index
 * Centralized export of all client configurations
 */

import { gcplConfig } from './gcpl/config';
import { samsoniteConfig } from './samsonite/config';
import { bowlersConfig } from './bowlers/config';
import { bungeConfig } from './bunge/config';

/**
 * All client configurations
 */
export const CLIENT_CONFIGS = {
  gcpl: gcplConfig,
  samsonite: samsoniteConfig,
  bowlers: bowlersConfig,
  bunge: bungeConfig
};

/**
 * Get configuration for a specific client
 * @param {string} clientName - The client name (gcpl, samsonite, bowlers, bunge)
 * @returns {Object} Client configuration
 */
export const getClientConfiguration = (clientName) => {
  const normalizedName = clientName?.toLowerCase();
  return CLIENT_CONFIGS[normalizedName] || CLIENT_CONFIGS.gcpl;
};

/**
 * Get all available client names
 * @returns {Array} Array of client names
 */
export const getAvailableClients = () => {
  return Object.keys(CLIENT_CONFIGS);
};

/**
 * Get client options for dropdowns/selectors
 * @returns {Array} Array of client options with value and label
 */
export const getClientOptions = () => {
  return Object.entries(CLIENT_CONFIGS).map(([key, config]) => ({
    value: config.name,
    label: config.displayName,
    key: key,
    config: config
  }));
};

/**
 * Check if a client exists
 * @param {string} clientName - The client name to check
 * @returns {boolean} Whether the client exists
 */
export const isValidClient = (clientName) => {
  const normalizedName = clientName?.toLowerCase();
  return normalizedName && CLIENT_CONFIGS.hasOwnProperty(normalizedName);
};

/**
 * Get client branding information
 * @param {string} clientName - The client name
 * @returns {Object} Branding information (colors, logo, etc.)
 */
export const getClientBranding = (clientName) => {
  const config = getClientConfiguration(clientName);
  return {
    name: config.name,
    displayName: config.displayName,
    logo: config.logo,
    favicon: config.favicon,
    primaryColor: config.primaryColor,
    secondaryColor: config.secondaryColor,
    accentColor: config.accentColor
  };
};

/**
 * Get client feature flags
 * @param {string} clientName - The client name
 * @returns {Object} Feature flags
 */
export const getClientFeatures = (clientName) => {
  const config = getClientConfiguration(clientName);
  return config.features || {};
};

/**
 * Check if a feature is enabled for a client
 * @param {string} clientName - The client name
 * @param {string} featureName - The feature name
 * @returns {boolean} Whether the feature is enabled
 */
export const isFeatureEnabledForClient = (clientName, featureName) => {
  const features = getClientFeatures(clientName);
  return features[featureName] || false;
};

/**
 * Get client business rules
 * @param {string} clientName - The client name
 * @returns {Object} Business rules
 */
export const getClientBusinessRules = (clientName) => {
  const config = getClientConfiguration(clientName);
  return config.businessRules || {};
};

/**
 * Get client UI configuration
 * @param {string} clientName - The client name
 * @returns {Object} UI configuration
 */
export const getClientUIConfig = (clientName) => {
  const config = getClientConfiguration(clientName);
  return config.ui || {};
};

// Export individual configurations for direct import
export { gcplConfig, samsoniteConfig, bowlersConfig, bungeConfig };

// Default export
export default {
  CLIENT_CONFIGS,
  getClientConfiguration,
  getAvailableClients,
  getClientOptions,
  isValidClient,
  getClientBranding,
  getClientFeatures,
  isFeatureEnabledForClient,
  getClientBusinessRules,
  getClientUIConfig
};

