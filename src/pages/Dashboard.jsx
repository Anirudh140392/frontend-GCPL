/**
 * Dashboard Page - Frontend Unified Monorepo
 * Main dashboard showing client-specific information
 */

import React from 'react';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Business as BusinessIcon,
  Store as StoreIcon,
  Settings as SettingsIcon,
  Palette as PaletteIcon,
  Api as ApiIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useClient } from '../contexts/ClientContext';

const Dashboard = () => {
  const { 
    clientConfig, 
    currentClient, 
    clientDisplayName,
    supportedPlatforms,
    hasFeature
  } = useClient();

  const features = [
    { key: 'campaigns', label: 'Campaigns Management' },
    { key: 'keywords', label: 'Keywords Management' },
    { key: 'products', label: 'Products Management' },
    { key: 'adGroups', label: 'Ad Groups Management' },
    { key: 'smartControl', label: 'Smart Control Rules' },
    { key: 'negativeKeywords', label: 'Negative Keywords' },
    { key: 'analytics', label: 'Analytics Dashboard' },
    { key: 'productAnalytics', label: 'Product Analytics' },
    { key: 'searchTermInsights', label: 'Search Term Insights' },
    { key: 'budgetManagement', label: 'Budget Management' },
    { key: 'bidManagement', label: 'Bid Management' },
    { key: 'portfolios', label: 'Portfolios Management' },
    { key: 'goals', label: 'Goals Tracking' },
    { key: 'history', label: 'History & Reports' }
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Welcome to {clientDisplayName}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Multi-client analytics dashboard - Currently viewing {currentClient.toUpperCase()} client
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Client Information Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BusinessIcon sx={{ mr: 1, color: clientConfig.primaryColor }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Client Information
                </Typography>
              </Box>
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <BusinessIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Client Name" 
                    secondary={clientConfig.displayName}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <StoreIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Default Brand" 
                    secondary={clientConfig.defaultBrand}
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <ApiIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Supported Platforms" 
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        {supportedPlatforms.map((platform) => (
                          <Chip 
                            key={platform}
                            label={platform}
                            size="small"
                            sx={{ mr: 1, mb: 0.5 }}
                            color={platform === clientConfig.defaultPlatform ? 'primary' : 'default'}
                          />
                        ))}
                      </Box>
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Branding Information Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaletteIcon sx={{ mr: 1, color: clientConfig.primaryColor }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Branding & Theme
                </Typography>
              </Box>
              
              <List dense>
                <ListItem>
                  <ListItemText 
                    primary="Primary Color" 
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Box 
                          sx={{ 
                            width: 20, 
                            height: 20, 
                            backgroundColor: clientConfig.primaryColor,
                            borderRadius: 1,
                            mr: 1,
                            border: '1px solid #ccc'
                          }} 
                        />
                        {clientConfig.primaryColor}
                      </Box>
                    }
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Secondary Color" 
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Box 
                          sx={{ 
                            width: 20, 
                            height: 20, 
                            backgroundColor: clientConfig.secondaryColor,
                            borderRadius: 1,
                            mr: 1,
                            border: '1px solid #ccc'
                          }} 
                        />
                        {clientConfig.secondaryColor}
                      </Box>
                    }
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Logo Path" 
                    secondary={clientConfig.logo}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Available Features Card */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <SettingsIcon sx={{ mr: 1, color: clientConfig.primaryColor }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Available Features
                </Typography>
              </Box>
              
              <Grid container spacing={1}>
                {features.map((feature) => {
                  const isEnabled = hasFeature(feature.key);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={feature.key}>
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center',
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: isEnabled ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'
                        }}
                      >
                        {isEnabled ? (
                          <CheckCircleIcon sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
                        ) : (
                          <CancelIcon sx={{ color: 'error.main', mr: 1, fontSize: 20 }} />
                        )}
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: isEnabled ? 'success.main' : 'error.main',
                            fontWeight: isEnabled ? 'medium' : 'normal'
                          }}
                        >
                          {feature.label}
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Quick Actions
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label="Switch Client" 
                  clickable 
                  color="primary"
                  onClick={() => {
                    // Focus on the client switcher
                    const switcher = document.querySelector('[aria-labelledby="client-switcher-label"]');
                    if (switcher) switcher.focus();
                  }}
                />
                <Chip 
                  label="View Campaigns" 
                  clickable 
                  variant="outlined"
                  disabled={!hasFeature('campaigns')}
                />
                <Chip 
                  label="Manage Keywords" 
                  clickable 
                  variant="outlined"
                  disabled={!hasFeature('keywords')}
                />
                <Chip 
                  label="Analytics Dashboard" 
                  clickable 
                  variant="outlined"
                  disabled={!hasFeature('analytics')}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

