/**
 * Main App Component - Frontend Unified Monorepo
 * Entry point for the multi-client application
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { ClientProvider } from './contexts/ClientContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import Keywords from './pages/Keywords';
import Products from './pages/Products';
import Analytics from './pages/Analytics';

// Create a default theme (will be overridden by client-specific themes)
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ClientProvider>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/keywords" element={<Keywords />} />
                <Route path="/products" element={<Products />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </Layout>
          </Box>
        </Router>
      </ThemeProvider>
    </ClientProvider>
  );
}

export default App;

