'use client';
import { useUIStore } from '@/store/ui-store';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useEffect } from 'react';
import { Notification } from '@/store/ui-store';

export default function Notifications() {
  // We're not using these directly but keeping the component interface consistent
  const { notifications } = useUIStore();
  
  useEffect(() => {
    // Watch for new notifications and display them using sonner
    const unsubscribe = useUIStore.subscribe((state) => {
      const currentNotifications = state.notifications;
      // Find newly added notifications compared to previous state
      const newNotifications = currentNotifications.filter(
        (notification) => !notifications.some((prev) => prev.id === notification.id)
      );
        
        // Show toast for each new notification
        newNotifications.forEach((notification) => {
          switch (notification.type) {
            case 'success':
              toast.success(notification.message);
              break;
            case 'error':
              toast.error(notification.message);
              break;
            case 'info':
              toast.info(notification.message);
              break;
            default:
              toast(notification.message);
          }
        });
      }
    );
    
    return () => unsubscribe();
  }, []);
  
  return <Toaster />;
}
