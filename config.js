/**
 * API Configuration
 */

// Set the current environment: 'development', 'zuplo-dev', or 'production'
const ENVIRONMENT = 'working-copy'; // Change this to switch environments

// API endpoint configurations
const API_ENDPOINTS = {
  'local': 'http://localhost:9000/api',
  'working-copy': 'https://food-truck-api-main-4443f2d.d2.zuplo.dev/api',
  'production': 'https://food-truck-api-main-00979bf.zuplo.app/api'
};

// Export the current API endpoint
const API_URL = API_ENDPOINTS[ENVIRONMENT];

// For debugging
console.log(`Using API endpoint: ${API_URL} (${ENVIRONMENT} environment)`);

// CommonJS export
module.exports = {
  API_URL
};
