'use client';

import { useState } from 'react';
import { useCheckinStore } from '@/store/checkin-store';
import { useUIStore } from '@/store/ui-store';

export default function CheckinForm() {
  const { 
    truckId, 
    status, 
    location, 
    isSubmitting, 
    error, 
    success,
    setTruckId, 
    setStatus, 
    setLocation, 
    submitCheckin 
  } = useCheckinStore();
  
  const { addNotification } = useUIStore();
  
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      addNotification({
        message: 'Geolocation is not supported by your browser',
        type: 'error'
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        addNotification({
          message: 'Location detected successfully',
          type: 'success'
        });
      },
      (error) => {
        addNotification({
          message: 'Unable to retrieve your location',
          type: 'error'
        });
      }
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitCheckin();
    
    if (success) {
      addNotification({
        message: 'Check-in successful!',
        type: 'success'
      });
    }
  };
  
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Food Truck Check-in</h2>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
              {success}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="truckId" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Truck ID
            </label>
            <input
              id="truckId"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={truckId}
              onChange={(e) => setTruckId(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Status
            </label>
            <select
              id="status"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'open' | 'closed')}
              required
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleGetLocation}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2 w-full"
            >
              Get Current Location
            </button>
            
            {location && (
              <div className="text-sm text-muted-foreground">
                📍 {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || !location}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-600 text-white hover:bg-red-700 h-10 px-4 py-2 w-full"
          >
            {isSubmitting ? 'Checking in...' : 'Check In'}
          </button>
        </form>
      </div>
    </div>
  );
}
