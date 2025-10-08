/**
 * Client Context for Multi-Client Frontend Monorepo
 * Manages client state, configuration, and switching across the application
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getCurrentClient, 
  getClientConfig, 
  getAllClients,
  switchClientWithBranding,
  isFeatureEnabled 
} from '../services/apiService';

const ClientContext = createContext();

/**
 * Hook to use client context
 * @returns {Object} Client context value
 */
export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

/**
 * Client Provider Component
 * Wraps the application and provides client state management
 */
export const ClientProvider = ({ children }) => {
  const [currentClient, setCurrentClient] = useState(getCurrentClient());
  const [clientConfig, setClientConfig] = useState(getClientConfig());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Handle client change events from localStorage or custom events
   */
  const handleClientChange = useCallback((event) => {
    const newClient = event.detail?.client || getCurrentClient();
    const newConfig = event.detail?.config || getClientConfig(newClient);
    
    setCurrentClient(newClient.toLowerCase());
    setClientConfig(newConfig);
    setError(null);
    
    console.log(`🔄 Client context updated to: ${newClient} (${newConfig.displayName})`);
  }, []);

  /**
   * Handle localStorage changes (from other tabs)
   */
  const handleStorageChange = useCallback((event) => {
    if (event.key === 'selectedClient') {
      const newClient = event.newValue || 'gcpl';
      const newConfig = getClientConfig(newClient);
      
      setCurrentClient(newClient.toLowerCase());
      setClientConfig(newConfig);
      setError(null);
      
      console.log(`📱 Client context updated from storage: ${newClient} (${newConfig.displayName})`);
    }
  }, []);

  /**
   * Set up event listeners and initial sync
   */
  useEffect(() => {
    // Listen for custom client change events
    window.addEventListener('clientChanged', handleClientChange);
    
    // Listen for localStorage changes (from other tabs)
    window.addEventListener('storage', handleStorageChange);

    // Initial sync with localStorage
    const savedClient = getCurrentClient();
    if (savedClient !== currentClient) {
      setCurrentClient(savedClient);
      setClientConfig(getClientConfig(savedClient));
    }

    return () => {
      window.removeEventListener('clientChanged', handleClientChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [currentClient, handleClientChange, handleStorageChange]);

  /**
   * Switch to a new client with loading state and error handling
   * @param {string} newClient - The new client to switch to
   * @param {boolean} forceReload - Whether to force a page reload
   */
  const switchClient = useCallback(async (newClient, forceReload = true) => {
    if (newClient.toLowerCase() === currentClient) {
      console.log(`ℹ️ Already on client: ${newClient}`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Use the enhanced switching function with branding
      switchClientWithBranding(newClient);
      
      // Update local state
      const newConfig = getClientConfig(newClient);
      setCurrentClient(newClient.toLowerCase());
      setClientConfig(newConfig);
      
      console.log(`✅ Successfully switched to client: ${newClient} (${newConfig.displayName})`);
      
      // Force reload to refresh all data if requested
      if (forceReload) {
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }
    } catch (error) {
      console.error(`❌ Error switching to client ${newClient}:`, error);
      setError(`Failed to switch to ${newClient}: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [currentClient]);

  /**
   * Refresh current client configuration
   */
  const refreshClient = useCallback(() => {
    const savedClient = getCurrentClient();
    const newConfig = getClientConfig(savedClient);
    
    setCurrentClient(savedClient);
    setClientConfig(newConfig);
    
    console.log(`🔄 Refreshed client: ${savedClient} (${newConfig.displayName})`);
  }, []);

  /**
   * Check if a feature is enabled for the current client
   * @param {string} feature - Feature name to check
   * @returns {boolean} Whether the feature is enabled
   */
  const hasFeature = useCallback((feature) => {
    return isFeatureEnabled(feature, currentClient);
  }, [currentClient]);

  /**
   * Get all available clients for dropdown/selection
   * @returns {Array} Array of client options
   */
  const getAvailableClients = useCallback(() => {
    return getAllClients();
  }, []);

  /**
   * Clear any errors
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Context value
  const value = {
    // Current state
    currentClient,
    clientConfig,
    isLoading,
    error,
    
    // Client information
    clientName: clientConfig.name,
    clientDisplayName: clientConfig.displayName,
    defaultBrand: clientConfig.defaultBrand,
    supportedPlatforms: clientConfig.supportedPlatforms,
    primaryColor: clientConfig.primaryColor,
    secondaryColor: clientConfig.secondaryColor,
    logo: clientConfig.logo,
    
    // Client type checks (for convenience)
    isGCPL: currentClient === 'gcpl',
    isSamsonite: currentClient === 'samsonite',
    isBowlers: currentClient === 'bowlers',
    isBunge: currentClient === 'bunge',
    
    // Actions
    switchClient,
    refreshClient,
    hasFeature,
    getAvailableClients,
    clearError
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

/**
 * HOC to inject client context as props
 * @param {React.Component} Component - Component to wrap
 * @returns {React.Component} Wrapped component with client props
 */
export const withClient = (Component) => {
  return function ClientWrappedComponent(props) {
    const clientContext = useClient();
    return <Component {...props} client={clientContext} />;
  };
};

export default ClientContext;

