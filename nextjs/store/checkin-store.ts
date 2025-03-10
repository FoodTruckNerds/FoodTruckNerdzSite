import { create } from 'zustand';

interface CheckinLocation {
  latitude: number;
  longitude: number;
}

interface CheckinData {
  truckId: string;
  status: 'open' | 'closed';
  location: CheckinLocation;
}

interface CheckinState {
  truckId: string;
  status: 'open' | 'closed';
  location: CheckinLocation | null;
  isSubmitting: boolean;
  error: string | null;
  success: string | null;
  setTruckId: (id: string) => void;
  setStatus: (status: 'open' | 'closed') => void;
  setLocation: (location: CheckinLocation) => void;
  resetForm: () => void;
  submitCheckin: () => Promise<boolean>;
}

export const useCheckinStore = create<CheckinState>((set, get) => ({
  truckId: '',
  status: 'open',
  location: null,
  isSubmitting: false,
  error: null,
  success: null,
  
  setTruckId: (id) => set({ truckId: id }),
  
  setStatus: (status) => set({ status }),
  
  setLocation: (location) => set({ location }),
  
  resetForm: () => set({
    truckId: '',
    status: 'open',
    location: null,
    error: null,
    success: null
  }),
  
  submitCheckin: async () => {
    const { truckId, status, location } = get();
    
    // Validate form
    if (!truckId.trim()) {
      set({ error: 'Truck ID is required', success: null });
      return false;
    }
    
    if (!location) {
      set({ error: 'Location is required', success: null });
      return false;
    }
    
    const data: CheckinData = {
      truckId,
      status,
      location
    };
    
    set({ isSubmitting: true, error: null, success: null });
    
    try {
      const response = await fetch('https://food-truck-api-main-4443f2d.d2.zuplo.dev/api/checkin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        const result = await response.json();
        set({ 
          isSubmitting: false, 
          success: result.message || 'Check-in successful',
          truckId: '',
          status: 'open'
        });
        return true;
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Check-in failed');
      }
    } catch (error) {
      set({ 
        isSubmitting: false, 
        error: error instanceof Error ? error.message : 'Failed to check in. Please try again.'
      });
      return false;
    }
  }
}));
