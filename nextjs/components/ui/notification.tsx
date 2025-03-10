'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/store/ui-store';
import { cn } from '@/lib/utils';

export default function Notifications() {
  const { notifications, removeNotification } = useUIStore();
  
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={cn(
            "p-4 rounded-md shadow-md transition-all duration-300 animate-in fade-in slide-in-from-right",
            notification.type === 'success' && "bg-green-50 text-green-800 border border-green-200",
            notification.type === 'error' && "bg-red-50 text-red-800 border border-red-200",
            notification.type === 'info' && "bg-blue-50 text-blue-800 border border-blue-200"
          )}
        >
          <div className="flex justify-between items-start">
            <p>{notification.message}</p>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
