'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocationStore } from '@/store/location-store';
import { useFoodTrucksStore } from '@/store/food-trucks-store';
import { useUIStore } from '@/store/ui-store';
import { FoodTruck } from '@/store/food-trucks-store';

// Define a type for the Radar SDK
declare global {
  interface Window {
    Radar: any;
  }
}

export default function MapContainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  const { mapCenter, userLocation } = useLocationStore();
  const { trucks, fetchTrucks } = useFoodTrucksStore();
  const { addNotification } = useUIStore();
  
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isRadarLoaded, setIsRadarLoaded] = useState(false);
  
  // Load Radar SDK
  useEffect(() => {
    if (typeof window === 'undefined' || isRadarLoaded) return;
    
    const checkRadarLoaded = setInterval(() => {
      if (window.Radar) {
        clearInterval(checkRadarLoaded);
        setIsRadarLoaded(true);
      }
    }, 100);
    
    return () => clearInterval(checkRadarLoaded);
  }, [isRadarLoaded]);
  
  // Initialize map when Radar is loaded
  useEffect(() => {
    if (!isRadarLoaded || !mapRef.current || mapInstanceRef.current) return;
    
    try {
      // Initialize Radar SDK
      window.Radar.initialize('prj_test_pk_c39bd54cbe50eff6dac53383f2d4f21ab7d65a1c');
      
      // Initialize map
      const map = window.Radar.ui.map({
        container: mapRef.current,
        style: 'radar-default-v1',
        center: [mapCenter.lng, mapCenter.lat],
        zoom: 12,
        minZoom: 10,
        maxZoom: 18,
        attributionControl: true,
        gestureHandling: 'greedy',
        trackUserLocation: true
      });
      
      mapInstanceRef.current = map;
      
      // Set up event listeners
      map.on('load', () => {
        setIsMapLoaded(true);
        
        // Try to get user's location automatically on start
        if (!navigator.geolocation) {
          addNotification({
            message: "Using default location because location services are unavailable.",
            type: "info"
          });
        }
        
        // Initial fetch of food trucks
        if (map.getBounds()) {
          fetchTrucks(mapCenter.lat, mapCenter.lng, map.getBounds());
        }
      });
      
      // Listen for user location updates from Radar's tracking control
      map.on('geolocate', (e: any) => {
        const { lng, lat } = e.coords;
        if (map.getBounds()) {
          fetchTrucks(lat, lng, map.getBounds());
        }
      });
      
      // Add listener for map movement
      map.on('moveend', () => {
        if (map.getBounds()) {
          const center = map.getCenter();
          fetchTrucks(center.lat, center.lng, map.getBounds());
        }
      });
      
    } catch (error) {
      console.error('Error initializing map:', error);
      addNotification({
        message: "Failed to initialize map. Please try again later.",
        type: "error"
      });
    }
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isRadarLoaded, mapCenter, fetchTrucks, addNotification]);
  
  // Update markers when trucks change
  useEffect(() => {
    if (!isMapLoaded || !mapInstanceRef.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];
    
    // Add new markers
    trucks.forEach((truck: FoodTruck) => {
      if (!truck.coordinates?.latitude || !truck.coordinates?.longitude) return;
      
      try {
        const marker = window.Radar.ui.marker({
          color: truck.isRegistered ? (truck.open ? '#4CAF50' : '#FF6B6B') : '#888888',
          size: 'small'
        })
        .setLngLat([truck.coordinates.longitude, truck.coordinates.latitude])
        .setPopup(
          window.Radar.ui.popup({
            element: (() => {
              const div = document.createElement('div');
              div.innerHTML = `
                <div class="p-2">
                  <h3 class="font-bold">${truck.name}</h3>
                  <p class="text-sm">${truck.rating ? `Rating: ${truck.rating}★` : 'No rating'}</p>
                  <p class="text-sm">${truck.open ? '🟢 Open' : truck.open === false ? '🔴 Closed' : '⚫ Unknown'} ${truck.isRegistered ? '✓ Registered' : ''}</p>
                  <p class="text-xs mt-2">${truck.address || 'No address provided'}</p>
                  ${truck.lastUpdated ? `<p class="text-xs">Last updated: ${new Date(truck.lastUpdated).toLocaleString()}</p>` : ''}
                </div>
              `;
              return div;
            })()
          })
        )
        .addTo(mapInstanceRef.current);
        
        markersRef.current.push(marker);
      } catch (error) {
        console.error('Error adding marker:', error);
      }
    });
  }, [trucks, isMapLoaded]);
  
  // Function to fly to a truck location
  const flyToTruck = (lng: number, lat: number) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo({
        center: [lng, lat],
        zoom: 16
      });
    }
  };
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Food Truck Map</h2>
      </div>
      <div className="h-[500px] w-full">
        <div ref={mapRef} className="h-full w-full" />
      </div>
    </div>
  );
}
