'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 relative">
            <Image 
              src="/images/foodtrucknerdz.png" 
              alt="Food Truck Nerdz Logo" 
              width={40} 
              height={40}
              className="rounded-full"
            />
          </div>
          <Link href="/" className="font-sriracha text-xl font-bold">
            Food Truck Nerdz
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            <li>
              <Link 
                href="/" 
                className="text-foreground hover:text-red-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/browse" 
                className="text-foreground hover:text-red-600 transition-colors"
              >
                Browse Trucks
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-foreground hover:text-red-600 transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="text-foreground hover:text-red-600 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="hidden md:flex gap-2">
          <Button variant="outline">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
        
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="font-sriracha">Food Truck Nerdz</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-4">
              <Link 
                href="/" 
                className="text-lg py-2 border-b border-gray-100"
              >
                Home
              </Link>
              <Link 
                href="/browse" 
                className="text-lg py-2 border-b border-gray-100"
              >
                Browse Trucks
              </Link>
              <Link 
                href="/about" 
                className="text-lg py-2 border-b border-gray-100"
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-lg py-2 border-b border-gray-100"
              >
                Contact
              </Link>
              
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="outline" className="w-full">Sign In</Button>
                <Button className="w-full">Sign Up</Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
