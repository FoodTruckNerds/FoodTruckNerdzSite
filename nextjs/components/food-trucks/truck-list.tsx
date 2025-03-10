'use client';
import { useFoodTrucksStore, FoodTruck } from '@/store/food-trucks-store';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

export default function TruckList() {
  const { trucks, loading, error, searchTrucks } = useFoodTrucksStore();
  
  const displayTrucks = searchTrucks();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-red-600" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-md">
        {error}
      </div>
    );
  }
  
  if (!displayTrucks.length) {
    return (
      <div className="text-center p-4 text-muted-foreground">
        No food trucks found.
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Food Trucks</h2>
      <div className="space-y-3">
        {displayTrucks.map((truck: FoodTruck, index: number) => (
          <TruckItem key={truck.id || index} truck={truck} />
        ))}
      </div>
    </div>
  );
}

function TruckItem({ truck }: { truck: FoodTruck }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{truck.name}</h3>
            <div className="text-sm text-muted-foreground">
              {truck.rating ? `Rating: ${truck.rating}★` : 'No rating'}
            </div>
            <div className="text-sm flex items-center gap-2">
              {truck.open ? (
                <span className="text-green-600 flex items-center">
                  <span className="block w-2 h-2 rounded-full bg-green-600 mr-1"></span> Open
                </span>
              ) : truck.open === false ? (
                <span className="text-red-600 flex items-center">
                  <span className="block w-2 h-2 rounded-full bg-red-600 mr-1"></span> Closed
                </span>
              ) : (
                <span className="text-gray-600 flex items-center">
                  <span className="block w-2 h-2 rounded-full bg-gray-600 mr-1"></span> Unknown
                </span>
              )}
              
              {truck.isRegistered && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Registered
                </Badge>
              )}
            </div>
            <div className="text-sm mt-1">
              {truck.address || 'No address provided'}
            </div>
            {truck.lastUpdated && (
              <div className="text-xs text-muted-foreground mt-1">
                Last updated: {new Date(truck.lastUpdated).toLocaleString()}
              </div>
            )}
          </div>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={() => {
              // In a real implementation, we would fly to the truck on the map
              console.log('View on map:', truck.name);
            }}
          >
            View on Map
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
