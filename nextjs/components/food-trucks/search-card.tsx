'use client';
import { useState } from 'react';
import { useFoodTrucksStore } from '@/store/food-trucks-store';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function SearchCard() {
  const { searchQuery, setSearchQuery, searchTrucks } = useFoodTrucksStore();
  const [isFocused, setIsFocused] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchTrucks();
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Food Trucks</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search 
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
                isFocused ? "text-foreground" : "text-muted-foreground"
              )}
            />
            <Input
              type="search"
              placeholder="Search by food truck name..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </div>
          <Button 
            type="submit"
            variant="default"
          >
            Search
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
