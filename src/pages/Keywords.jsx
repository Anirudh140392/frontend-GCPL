/**
 * Keywords Page - Frontend Unified Monorepo
 */

import React from 'react';
import { Typography, Box } from '@mui/material';
import { useClient } from '../contexts/ClientContext';

const Keywords = () => {
  const { clientDisplayName } = useClient();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Keywords - {clientDisplayName}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Keywords management functionality will be implemented here.
      </Typography>
    </Box>
  );
};

export default Keywords;

