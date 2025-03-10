'use client';
import { useState } from 'react';
import { useLocationStore } from '@/store/location-store';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/store/ui-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { MapPin } from 'lucide-react';

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
    <Card>
      <CardHeader>
        <CardTitle>Your Location</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <MapPin
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                isFocused ? "text-foreground" : "text-muted-foreground"
              )}
            />
            <Input
              type="text"
              placeholder="Enter your address..."
              className="pl-9"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="button"
              onClick={handleGetCurrentLocation}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Use Current Location
            </Button>
            <Button
              type="button"
              onClick={handleNavigateToMaps}
              variant="default"
              className="w-full sm:w-auto"
            >
              Navigate in Google Maps
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
