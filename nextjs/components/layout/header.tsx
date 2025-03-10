'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
            Sign In
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            Sign Up
          </button>
        </div>
        
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden fixed inset-0 z-50 bg-background pt-20 px-4",
        mobileMenuOpen ? "block" : "hidden"
      )}>
        <nav className="flex flex-col gap-4">
          <Link 
            href="/" 
            className="text-lg py-2 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/browse" 
            className="text-lg py-2 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Browse Trucks
          </Link>
          <Link 
            href="/about" 
            className="text-lg py-2 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className="text-lg py-2 border-b border-gray-100"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </Link>
          
          <div className="flex flex-col gap-2 mt-4">
            <button className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Sign In
            </button>
            <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Sign Up
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
