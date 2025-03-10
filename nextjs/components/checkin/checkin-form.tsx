'use client';
import { useState } from 'react';
import { useCheckinStore } from '@/store/checkin-store';
import { useUIStore } from '@/store/ui-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { toast } from 'sonner';

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
    <Card>
      <CardHeader>
        <CardTitle>Food Truck Check-in</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
              {success}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="truckId" className="text-sm font-medium leading-none">
              Truck ID
            </label>
            <Input
              id="truckId"
              type="text"
              value={truckId}
              onChange={(e) => setTruckId(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium leading-none">
              Status
            </label>
            <Select value={status} onValueChange={(value) => setStatus(value as 'open' | 'closed')}>
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Button
              type="button"
              onClick={handleGetLocation}
              variant="secondary"
              className="w-full"
            >
              Get Current Location
            </Button>
            
            {location && (
              <div className="text-sm text-muted-foreground">
                📍 {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={isSubmitting || !location}
            className="w-full"
            variant="default"
          >
            {isSubmitting ? 'Checking in...' : 'Check In'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
