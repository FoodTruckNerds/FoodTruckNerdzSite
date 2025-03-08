const mapscript = require("./map/script");
// Mock data for food trucks

const MOCK_FOOD_TRUCKS = [
    { id: 1, name: "Taco Truck", lat: 37.7749, lng: -122.4194, type: "Mexican" },
    { id: 2, name: "Burger Wagon", lat: 37.7746, lng: -122.4174, type: "American" },
    { id: 3, name: "Sushi Roll", lat: 37.7739, lng: -122.4214, type: "Japanese" },
  ];
  
  // DOM Elements
  const menuToggle = document.getElementById('menuToggle');
  const searchInput = document.getElementById('foodTruckSearch');
  const searchButton = document.getElementById('searchButton');
  const addressInput = document.getElementById('addressInput');
  const getCurrentLocationBtn = document.getElementById('getCurrentLocation');
  const navigateToMapsBtn = document.getElementById('navigateToMaps');
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      // In a real implementation, you would toggle a mobile menu here
      alert('Mobile menu would open here');
    });
  }
  
  // Search functionality
  if (searchButton) {
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query) {
        // In a real implementation, you would search for food trucks here
        alert(`Searching for: ${query}`);
        
        // Mock search results
        const results = MOCK_FOOD_TRUCKS.filter(truck => 
          truck.name.toLowerCase().includes(query.toLowerCase())
        );
        
        console.log('Search results:', results);
      }
    });
  }
  
  // Get current location
  if (getCurrentLocationBtn) {
    getCurrentLocationBtn.addEventListener('click', () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In a real app, you would use a reverse geocoding service
            // to convert coordinates to an address
            const { latitude, longitude } = position.coords;
            console.log(`Location: ${latitude}, ${longitude}`);
            
            // Mock address for demonstration
            addressInput.value = "123 Main St, San Francisco, CA 94105";
            
            // In a real implementation, you would update the map here
          },
          (error) => {
            console.error("Error getting location:", error);
            alert("Unable to retrieve your location. Please enter it manually.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    });
  }
  
  // Navigate to Google Maps
  if (navigateToMapsBtn) {
    navigateToMapsBtn.addEventListener('click', () => {
      const address = addressInput.value.trim();
      if (address) {
        // Open Google Maps in a new tab with the address
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        window.open(mapsUrl, '_blank');
      } else {
        alert("Please enter an address first.");
      }
    });
  }
  
  // Google Maps initialization function
  // This would be called by the Google Maps API when it loads
  function initMap() {
    // Check if the map element exists
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
  
    // In a real implementation with an API key, you would initialize the map like this:
    /*
    const map = new google.maps.Map(mapElement, {
      center: { lat: 37.7749, lng: -122.4194 }, // San Francisco
      zoom: 14,
    });
  
    // Add markers for food trucks
    MOCK_FOOD_TRUCKS.forEach(truck => {
      new google.maps.Marker({
        position: { lat: truck.lat, lng: truck.lng },
        map,
        title: truck.name,
      });
    });
    */
  
    // For now, we'll just update the placeholder text
    console.log("Map would initialize here with Google Maps API");
  }
  
  // If we had the Google Maps API loaded, this would be called automatically
  // For now, we'll just log that it would be initialized
  console.log("Google Maps would be initialized when API is loaded");

  const RADAR_PUBLISHABLE_KEY = 'prj_test_pk_c39bd54cbe50eff6dac53383f2d4f21ab7d65a1c';
let mapLocation = [-90.0490, 35.1495] // Memphis, TN

// Initialize the app
function initializeApp() {
    // Initialize Radar SDK
    Radar.initialize(RADAR_PUBLISHABLE_KEY);
    
    let currentMarkers = [];
    
    // Initialize map
    const map = Radar.ui.map({
        container: 'map',
        style: 'radar-default-v1',
        center: mapLocation, // Memphis, TN
        zoom: 12,
        minZoom: 10, // Prevent zooming out too far
        maxZoom: 18, // Limit maximum zoom level
        attributionControl: true,
        gestureHandling: 'greedy', // Makes the map easier to use on mobile
        trackUserLocation: true // Enables the built-in user location tracking control
    });
    
    // Make map available globally for marker interactions
    window.map = map;
    
    // Initialize map event listeners
    // Listen for user location updates from Radar's tracking control
    map.on('geolocate', (e) => {
        const { lng, lat } = e.coords;
        mapLocation = [lng, lat];
        fetchFoodTrucks(mapLocation);
    });
    
    // Try to get user's location automatically on start
    map.on('load', () => {
        // If geolocation is available, the geolocate control will trigger automatically
        if (!navigator.geolocation) {
            showNotification("Using default location (Memphis, TN) because location services are unavailable.");
        }
        fetchFoodTrucks(mapLocation);
    });

    // Add listener for map movement
    map.on('moveend', () => {
        fetchFoodTrucks(mapLocation);
    });
    
    // Clear all markers from the map
    function clearMarkers() {
        currentMarkers.forEach(marker => {
            marker.remove();
        });
        currentMarkers = [];
    }
    
    // Fetch food trucks from API
    async function fetchFoodTrucks([lng, lat]) {
        try {
            // Show loading state
            document.getElementById('trucks-container').innerHTML = `
                <div>
                    <div class="loading-spinner"></div>
                </div>
            `;
            
            // Clear existing markers before fetching new ones
            clearMarkers();

            // Get the current map bounds
            const bounds = map.getBounds();
            const ne = bounds.getNorthEast();
            const sw = bounds.getSouthWest();
            
            const response = await fetch(
                `https://food-truck-api-main-4443f2d.d2.zuplo.dev/api/google-search?` + 
                `lat=${lat}&lng=${lng}` +
                `&ne_lat=${ne.lat}&ne_lng=${ne.lng}` +
                `&sw_lat=${sw.lat}&sw_lng=${sw.lng}`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch food truck data');
            }
            
            const data = await response.json();
            displayFoodTrucks(data.locations);
            
        } catch (error) {
            console.error('Error fetching food trucks:', error);
            showError('Failed to load food truck data. Please try again later.');
        }
    }
    
    // Display food trucks on the map and in the list
    function displayFoodTrucks(trucks) {
        if (!trucks || trucks.length === 0) {
            document.getElementById('trucks-container').innerHTML = `
                <div>
                    No food trucks found in this area.
                </div>
            `;
            return;
        }
        
        let listHTML = '';
        
        trucks.forEach((truck) => {
            // Extract data
            const name = truck.name || 'Unknown Food Truck';
            const rating = truck.rating ? `Rating: ${truck.rating}★` : 'No rating';
            const address = truck.address || 'No address provided';
            const openStatus = truck.open ? '🟢 Open' : truck.open === false ? '🔴 Closed' : '⚫ Unknown';
            const lat = truck.coordinates?.latitude;
            const lng = truck.coordinates?.longitude;
            
            // Skip if no valid coordinates
            if (!lat || !lng) return;
            
            // Create a marker
            const marker = Radar.ui.marker({
                color: truck.open ? '#4CAF50' : '#FF6B6B',
                size: 'small'
            })
            .setLngLat([lng, lat])
            .setPopup(
                Radar.ui.popup({
                    element: (() => {
                        const div = document.createElement('div');
                        div.innerHTML = `
                            <div class="p-2">
                                <h3 class="font-bold">${name}</h3>
                                <p class="text-sm">${rating}</p>
                                <p class="text-sm">${openStatus}</p>
                                <p class="text-xs mt-2">${address}</p>
                            </div>
                        `;
                        return div;
                    })()
                })
            )
            .addTo(map);
            
            currentMarkers.push(marker);
            
            // Add to the list view
            listHTML += `
                <div class="truck-item">
                    <h3>${name}</h3>
                    <p>${rating}</p>
                    <p>${openStatus}</p>
                    <p>${address}</p>
                    <button onclick="flyToTruck(${lng}, ${lat})">
                        View on Map
                    </button>
                </div>
            `;
        });
        
        document.getElementById('trucks-container').innerHTML = listHTML;
    }
    
    // Show error message
    function showError(message) {
        document.getElementById('trucks-container').innerHTML = `
            <div class="error-message">
                ${message}
            </div>
        `;
    }
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.5s';
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }
}

// Global function to fly to a truck location
function flyToTruck(lng, lat) {
    if (window.map) {
        window.map.flyTo({
            center: [lng, lat],
            zoom: 16
        });
    }
}

// Initialize app when document is ready
document.addEventListener('DOMContentLoaded', initializeApp);

