import { create } from 'zustand';

export interface FoodTruck {
  id?: string;
  name: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  address?: string;
  open?: boolean;
  isRegistered?: boolean;
  lastUpdated?: string;
}

interface FoodTrucksState {
  trucks: FoodTruck[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  fetchTrucks: (lat: number, lng: number, bounds: any) => Promise<void>;
  setSearchQuery: (query: string) => void;
  searchTrucks: () => FoodTruck[];
}

export const useFoodTrucksStore = create<FoodTrucksState>((set, get) => ({
  trucks: [],
  loading: false,
  error: null,
  searchQuery: '',
  
  fetchTrucks: async (lat, lng, bounds) => {
    set({ loading: true, error: null });
    try {
      // Get the bounds for the API call
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
      const registeredTrucks = trucksData.trucks.map((truck: any) => ({
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
        ...(googleData.locations || []).map((loc: any) => ({
          ...loc,
          isRegistered: false
        }))
      ];
      
      set({ trucks: allTrucks, loading: false });
    } catch (error) {
      console.error('Error fetching food trucks:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load food truck data', 
        loading: false 
      });
    }
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  searchTrucks: () => {
    const { trucks, searchQuery } = get();
    if (!searchQuery.trim()) return trucks;
    
    const query = searchQuery.toLowerCase();
    return trucks.filter(truck => 
      truck.name.toLowerCase().includes(query)
    );
  }
}));
