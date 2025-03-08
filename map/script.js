// API keys
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
            
            // Fetch from both APIs in parallel
            const [googleResponse, trucksResponse] = await Promise.all([
                fetch(
                    `https://food-truck-api-main-4443f2d.d2.zuplo.dev/api/google-search?` + 
                    `lat=${lat}&lng=${lng}` +
                    `&ne_lat=${ne.lat}&ne_lng=${ne.lng}` +
                    `&sw_lat=${sw.lat}&sw_lng=${sw.lng}`
                ),
                fetch(
                    `https://food-truck-api-main-4443f2d.d2.zuplo.dev/api/trucks?` +
                    `ne_lat=${ne.lat}&ne_lng=${ne.lng}` +
                    `&sw_lat=${sw.lat}&sw_lng=${sw.lng}`
                )
            ]);
            
            if (!googleResponse.ok || !trucksResponse.ok) {
                throw new Error('Failed to fetch food truck data');
            }
            
            const [googleData, trucksData] = await Promise.all([
                googleResponse.json(),
                trucksResponse.json()
            ]);

            // Transform registered trucks to match the display format
            const registeredTrucks = trucksData.trucks.map(truck => ({
                name: truck.name,
                coordinates: truck.location,
                address: 'Registered Food Truck',
                open: truck.status === 'open',
                isRegistered: true,
                lastUpdated: truck.lastUpdated
            }));

            // Merge both sources, marking Google Places results as unregistered
            const allTrucks = [
                ...registeredTrucks,
                ...(googleData.locations || []).map(loc => ({
                    ...loc,
                    isRegistered: false
                }))
            ];

            displayFoodTrucks(allTrucks);
            
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
            const registeredBadge = truck.isRegistered ? '✓ Registered' : '';
            const lastUpdated = truck.lastUpdated ? `Last updated: ${new Date(truck.lastUpdated).toLocaleString()}` : '';
            const lat = truck.coordinates?.latitude;
            const lng = truck.coordinates?.longitude;
            
            // Skip if no valid coordinates
            if (!lat || !lng) return;
            
            // Create a marker
            const marker = Radar.ui.marker({
                color: truck.isRegistered ? (truck.open ? '#4CAF50' : '#FF6B6B') : '#888888',
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
                                <p class="text-sm">${openStatus} ${registeredBadge}</p>
                                <p class="text-xs mt-2">${address}</p>
                                ${lastUpdated ? `<p class="text-xs">${lastUpdated}</p>` : ''}
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
                    <h3>${name} ${registeredBadge ? `<span class="registered-badge">${registeredBadge}</span>` : ''}</h3>
                    <p>${rating}</p>
                    <p>${openStatus}</p>
                    <p>${address}</p>
                    ${lastUpdated ? `<p class="last-updated">${lastUpdated}</p>` : ''}
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
