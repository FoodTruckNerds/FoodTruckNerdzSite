'use client';

import { useState } from 'react';
import { useLocationStore } from '@/store/location-store';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';

export default function LocationCard() {
  const { address, setAddress, getCurrentLocation } = useLocationStore();
  const { addNotification } = useUIStore();
  const [isFocused, setIsFocused] = useState(false);
  
  const handleGetCurrentLocation = async () => {
    const location = await getCurrentLocation();
    
    if (location) {
      // In a real app, you would use a reverse geocoding service
      // to convert coordinates to an address
      setAddress("Current location detected");
      addNotification({
        message: "Location detected successfully",
        type: "success"
      });
    } else {
      addNotification({
        message: "Unable to retrieve your location. Please enter it manually.",
        type: "error"
      });
    }
  };
  
  const handleNavigateToMaps = () => {
    if (!address.trim()) {
      addNotification({
        message: "Please enter an address first.",
        type: "error"
      });
      return;
    }
    
    // Open Google Maps in a new tab with the address
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
  };
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Your Location</h2>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          <div className="relative">
            <svg 
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                isFocused ? "text-foreground" : "text-muted-foreground"
              )}
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <input
              type="text"
              placeholder="Enter your address..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto"
            >
              Use Current Location
            </button>
            <button
              type="button"
              onClick={handleNavigateToMaps}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2 w-full sm:w-auto"
            >
              Navigate in Google Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
