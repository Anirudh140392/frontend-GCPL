/**
 * Products Page - Frontend Unified Monorepo
 */

import React from 'react';
import { Typography, Box } from '@mui/material';
import { useClient } from '../contexts/ClientContext';

const Products = () => {
  const { clientDisplayName } = useClient();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Products - {clientDisplayName}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Products management functionality will be implemented here.
      </Typography>
    </Box>
  );
};

export default Products;

