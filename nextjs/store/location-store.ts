import { create } from 'zustand';

interface Coordinates {
  lat: number;
  lng: number;
}

interface LocationState {
  userLocation: Coordinates | null;
  mapCenter: Coordinates;
  address: string;
  getCurrentLocation: () => Promise<Coordinates | null>;
  setUserLocation: (location: Coordinates) => void;
  setMapCenter: (center: Coordinates) => void;
  setAddress: (address: string) => void;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  userLocation: null,
  mapCenter: { lat: 35.1495, lng: -90.0490 }, // Memphis, TN as default
  address: '',
  
  getCurrentLocation: async () => {
    return new Promise<Coordinates | null>((resolve) => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
        resolve(null);
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          set({ userLocation: location });
          set({ mapCenter: location });
          resolve(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          resolve(null);
        }
      );
    });
  },
  
  setUserLocation: (location) => set({ userLocation: location }),
  
  setMapCenter: (center) => set({ mapCenter: center }),
  
  setAddress: (address) => set({ address })
}));
