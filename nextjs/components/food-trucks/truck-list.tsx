'use client';

import { useFoodTrucksStore, FoodTruck } from '@/store/food-trucks-store';

export default function TruckList() {
  const { trucks, loading, error, searchTrucks } = useFoodTrucksStore();
  
  const displayTrucks = searchTrucks();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md">
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
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{truck.name}</h3>
          <div className="text-sm text-muted-foreground">
            {truck.rating ? `Rating: ${truck.rating}★` : 'No rating'}
          </div>
          <div className="text-sm">
            {truck.open ? (
              <span className="text-green-600">🟢 Open</span>
            ) : truck.open === false ? (
              <span className="text-red-600">🔴 Closed</span>
            ) : (
              <span className="text-gray-600">⚫ Unknown</span>
            )}
            
            {truck.isRegistered && (
              <span className="ml-2 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Registered
              </span>
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
        
        <button 
          className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          onClick={() => {
            // In a real implementation, we would fly to the truck on the map
            console.log('View on map:', truck.name);
          }}
        >
          View on Map
        </button>
      </div>
    </div>
  );
}
