'use client';

import { useEffect } from 'react';
import Header from '@/components/layout/header';
import SearchCard from '@/components/food-trucks/search-card';
import LocationCard from '@/components/food-trucks/location-card';
import CheckinForm from '@/components/checkin/checkin-form';
import MapContainer from '@/components/map/map-container';
import Notifications from '@/components/ui/notification';

export default function Home() {
  return (
    <>
      <Notifications />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Find Food Trucks Near You!</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <SearchCard />
            <LocationCard />
          </div>
          
          <div className="space-y-6">
            <CheckinForm />
          </div>
        </div>
        
        <div className="mt-8">
          <MapContainer />
        </div>
      </main>
    </>
  );
}
