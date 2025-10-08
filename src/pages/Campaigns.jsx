/**
 * Campaigns Page - Frontend Unified Monorepo
 */

import React from 'react';
import { Typography, Box } from '@mui/material';
import { useClient } from '../contexts/ClientContext';

const Campaigns = () => {
  const { clientDisplayName } = useClient();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Campaigns - {clientDisplayName}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Campaign management functionality will be implemented here.
      </Typography>
    </Box>
  );
};

export default Campaigns;

