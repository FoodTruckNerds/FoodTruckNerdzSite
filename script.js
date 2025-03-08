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
