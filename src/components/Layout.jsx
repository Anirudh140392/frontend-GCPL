/**
 * Layout Component - Frontend Unified Monorepo
 * Main layout wrapper with header, sidebar, and content area
 */

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Paper,
  Avatar,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useClient } from '../contexts/ClientContext';
import ClientSwitcher from './ClientSwitcher';

const StyledAppBar = styled(AppBar)(({ theme, clientcolor }) => ({
  backgroundColor: clientcolor || theme.palette.primary.main,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const ClientAvatar = styled(Avatar)(({ theme, clientcolor }) => ({
  width: 40,
  height: 40,
  backgroundColor: clientcolor || theme.palette.primary.main,
  marginRight: theme.spacing(2),
  fontWeight: 'bold',
}));

const Layout = ({ children }) => {
  const { 
    clientConfig, 
    currentClient, 
    isLoading,
    clientDisplayName 
  } = useClient();

  // Get client initials for avatar
  const getClientInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <StyledAppBar position="static" clientcolor={clientConfig.primaryColor}>
        <Toolbar>
          {/* Client Avatar */}
          <ClientAvatar clientcolor={clientConfig.primaryColor}>
            {getClientInitials(clientDisplayName)}
          </ClientAvatar>

          {/* Client Name and Status */}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {clientDisplayName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Chip 
                label={currentClient.toUpperCase()} 
                size="small" 
                variant="outlined"
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.5)',
                  fontSize: '0.7rem'
                }}
              />
              <Chip 
                label={clientConfig.defaultPlatform} 
                size="small" 
                variant="outlined"
                sx={{ 
                  color: 'white', 
                  borderColor: 'rgba(255,255,255,0.5)',
                  fontSize: '0.7rem'
                }}
              />
            </Box>
          </Box>

          {/* Client Switcher */}
          <Box sx={{ ml: 2 }}>
            <ClientSwitcher 
              variant="outlined"
              size="small"
              showAvatar={false}
            />
          </Box>
        </Toolbar>
      </StyledAppBar>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
        {isLoading ? (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              minHeight: '400px' 
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Loading {clientDisplayName}...
            </Typography>
          </Box>
        ) : (
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              minHeight: '500px',
              borderRadius: 2,
              backgroundColor: 'white'
            }}
          >
            {children}
          </Paper>
        )}
      </Container>
    </Box>
  );
};

export default Layout;

