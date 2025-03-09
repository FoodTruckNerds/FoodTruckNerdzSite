/**
 * API Configuration
 *
 * This file defines global API configuration that can be used across all scripts.
 */

// Set the current environment: 'local', 'working-copy', or 'production'
const ENVIRONMENT = 'working-copy'; // Change this to switch environments

// API endpoint configurations
const API_ENDPOINTS = {
  'local': 'http://localhost:9000/api',
  'working-copy': 'https://food-truck-api-main-4443f2d.d2.zuplo.dev/api',
  'production': 'https://food-truck-api-main-00979bf.zuplo.app/api'
};

// Define global API_URL variable that can be accessed by other scripts
window.API_URL = API_ENDPOINTS[ENVIRONMENT];

// For debugging
console.log(`Using API endpoint: ${window.API_URL} (${ENVIRONMENT} environment)`);
