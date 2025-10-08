/**
 * Client Switcher Component
 * Enhanced dropdown for switching between clients with branding and loading states
 */

import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Avatar,
  Typography,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useClient } from '../contexts/ClientContext';

// Styled components
const StyledFormControl = styled(FormControl)(({ theme, primarycolor }) => ({
  minWidth: 200,
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: primarycolor || theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: primarycolor || theme.palette.primary.main,
  },
}));

const ClientMenuItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1, 2),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ClientAvatar = styled(Avatar)(({ theme, clientcolor }) => ({
  width: 24,
  height: 24,
  backgroundColor: clientcolor || theme.palette.primary.main,
  fontSize: '0.75rem',
  fontWeight: 'bold',
}));

const ClientSwitcher = ({ 
  variant = 'outlined',
  size = 'medium',
  showAvatar = true,
  showDescription = false,
  disabled = false,
  onClientChange = null
}) => {
  const {
    currentClient,
    clientConfig,
    isLoading,
    error,
    switchClient,
    getAvailableClients,
    clearError
  } = useClient();

  const [availableClients, setAvailableClients] = useState([]);
  const [localLoading, setLocalLoading] = useState(false);

  // Load available clients on mount
  useEffect(() => {
    const clients = getAvailableClients();
    setAvailableClients(clients);
  }, [getAvailableClients]);

  // Handle client selection
  const handleClientChange = async (event) => {
    const newClient = event.target.value;
    
    if (newClient === currentClient) {
      return;
    }

    setLocalLoading(true);
    clearError();

    try {
      await switchClient(newClient, true); // Force reload
      
      // Call custom callback if provided
      if (onClientChange) {
        onClientChange(newClient);
      }
    } catch (error) {
      console.error('Error switching client:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Get client initials for avatar
  const getClientInitials = (clientName) => {
    return clientName
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get client color
  const getClientColor = (clientKey) => {
    const clientData = availableClients.find(c => c.key === clientKey);
    return clientData?.config?.primaryColor || '#1976d2';
  };

  return (
    <Box>
      <StyledFormControl 
        variant={variant} 
        size={size} 
        disabled={false}
        primarycolor={clientConfig.primaryColor}
      >
        <InputLabel 
          id="client-switcher-label"
          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
        >
          Client
        </InputLabel>
        <Select
          labelId="client-switcher-label"
          id="client-switcher"
          value={currentClient}
          label="Client"
          onChange={handleClientChange}
          disabled={false}
          sx={{
            minWidth: 200,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.3)',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(255, 255, 255, 0.5)',
            },
            '& .MuiSelect-select': {
              color: 'white',
            },
            '& .MuiSvgIcon-root': {
              color: 'white',
            },
          }}
          startAdornment={
            (isLoading || localLoading) ? (
              <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
            ) : showAvatar ? (
              <ClientAvatar 
                clientcolor={clientConfig.primaryColor}
                sx={{ mr: 1 }}
              >
                {getClientInitials(clientConfig.displayName)}
              </ClientAvatar>
            ) : null
          }
        >
          {availableClients.map((client) => (
            <ClientMenuItem 
              key={client.key} 
              value={client.key}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                  },
                },
              }}
            >
              {showAvatar && (
                <ClientAvatar clientcolor={getClientColor(client.key)}>
                  {getClientInitials(client.label)}
                </ClientAvatar>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="body2" fontWeight="medium" sx={{ color: 'text.primary' }}>
                  {client.label}
                </Typography>
                {showDescription && client.config?.description && (
                  <Typography variant="caption" color="text.secondary">
                    {client.config.description}
                  </Typography>
                )}
              </Box>
              {client.key === currentClient && (
                <Chip 
                  label="Active" 
                  size="small" 
                  color="primary" 
                  sx={{ ml: 'auto' }}
                />
              )}
            </ClientMenuItem>
          ))}
        </Select>
      </StyledFormControl>

      {/* Error Display */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mt: 1, maxWidth: 300 }}
          onClose={clearError}
        >
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {(isLoading || localLoading) && (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <CircularProgress size={16} sx={{ mr: 1 }} />
          <Typography variant="caption" color="text.secondary">
            Switching to {availableClients.find(c => c.key === currentClient)?.label}...
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ClientSwitcher;
