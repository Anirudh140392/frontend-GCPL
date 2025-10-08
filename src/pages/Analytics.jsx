/**
 * Analytics Page - Frontend Unified Monorepo
 */

import React from 'react';
import { Typography, Box } from '@mui/material';
import { useClient } from '../contexts/ClientContext';

const Analytics = () => {
  const { clientDisplayName } = useClient();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics - {clientDisplayName}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Analytics dashboard functionality will be implemented here.
      </Typography>
    </Box>
  );
};

export default Analytics;

