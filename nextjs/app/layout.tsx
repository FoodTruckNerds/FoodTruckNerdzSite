import type { Metadata } from 'next';
import './globals.css';
import Notifications from '@/components/ui/notification';

export const metadata: Metadata = {
  title: 'Food Truck Nerdz',
  description: 'Find and track food trucks near you',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sriracha&display=swap" rel="stylesheet" />
        <link href="https://js.radar.com/v4.4.10/radar.css" rel="stylesheet" />
        <script src="https://js.radar.com/v4.4.10/radar.min.js" async></script>
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <Notifications />
        {children}
      </body>
    </html>
  );
}
