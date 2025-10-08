/**
 * Simple test script to verify the application structure
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Frontend Unified Monorepo Structure...\n');

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'vite.config.js',
  'index.html',
  'src/main.jsx',
  'src/App.jsx',
  'src/index.css',
  'src/components/Layout.jsx',
  'src/components/ClientSwitcher.jsx',
  'src/contexts/ClientContext.jsx',
  'src/services/apiService.js',
  'src/clients/gcpl/config.js',
  'src/clients/samsonite/config.js',
  'src/clients/bowlers/config.js',
  'src/clients/bunge/config.js',
  'src/pages/Dashboard.jsx',
  'src/pages/Campaigns.jsx',
  'src/pages/Keywords.jsx',
  'src/pages/Products.jsx',
  'src/pages/Analytics.jsx',
  '.env.example',
  'README.md'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

console.log('\n📊 Summary:');
console.log(`Total files checked: ${requiredFiles.length}`);
console.log(`Status: ${allFilesExist ? '✅ All files present' : '❌ Some files missing'}`);

// Check client configurations
console.log('\n🏢 Client Configurations:');
const clients = ['gcpl', 'samsonite', 'bowlers', 'bunge'];

clients.forEach(client => {
  try {
    const configPath = path.join(__dirname, `src/clients/${client}/config.js`);
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Check if Flipkart is supported
    const hasFlipkart = configContent.includes("'Flipkart'") || configContent.includes('"Flipkart"');
    const defaultPlatform = configContent.match(/defaultPlatform:\s*['"]([^'"]+)['"]/);
    
    console.log(`  ${client.toUpperCase()}:`);
    console.log(`    Flipkart Support: ${hasFlipkart ? '✅' : '❌'}`);
    console.log(`    Default Platform: ${defaultPlatform ? defaultPlatform[1] : 'Not found'}`);
  } catch (error) {
    console.log(`  ${client.toUpperCase()}: ❌ Error reading config`);
  }
});

console.log('\n🚀 Ready to run:');
console.log('  npm install');
console.log('  npm run dev');
console.log('\n🎯 Application should be accessible at http://localhost:5173');
console.log('📱 All 4 clients should be selectable in the dropdown');
console.log('🔄 All clients should support both Flipkart and Amazon platforms');

