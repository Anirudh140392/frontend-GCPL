import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentClient, getClientConfig } from '../services/apiService';

const ClientContext = createContext();

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider');
  }
  return context;
};

export const ClientProvider = ({ children }) => {
  const [currentClient, setCurrentClient] = useState(getCurrentClient());
  const [clientConfig, setClientConfig] = useState(getClientConfig());

  // Listen for client changes from localStorage or custom events
  useEffect(() => {
    const handleClientChange = (event) => {
      const newClient = event.detail?.client || getCurrentClient();
      setCurrentClient(newClient.toLowerCase());
      setClientConfig(getClientConfig(newClient.toLowerCase()));
      console.log(`Client context updated to: ${newClient}`);
    };

    const handleStorageChange = (event) => {
      if (event.key === 'selectedClient') {
        const newClient = event.newValue || 'gcpl';
        setCurrentClient(newClient.toLowerCase());
        setClientConfig(getClientConfig(newClient.toLowerCase()));
        console.log(`Client context updated from storage: ${newClient}`);
      }
    };

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
  }, [currentClient]);

  const switchClient = (newClient) => {
    const clientLower = newClient.toLowerCase();
    localStorage.setItem('selectedClient', newClient);
    setCurrentClient(clientLower);
    setClientConfig(getClientConfig(clientLower));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('clientChanged', { 
      detail: { client: newClient } 
    }));
    
    console.log(`Switched to client: ${newClient}`);
  };

  const value = {
    currentClient,
    clientConfig,
    switchClient,
    isGCPL: currentClient === 'gcpl',
    isSamsonite: currentClient === 'samsonite',
    isBowlers: currentClient === 'bowlers'
  };

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  );
};

export default ClientContext;
