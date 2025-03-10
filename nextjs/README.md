# Food Truck Nerdz - Next.js Implementation

A modern implementation of the Food Truck Nerdz application using Next.js, Tailwind CSS, shadcn/ui, and Zustand.

## Technologies Used

- **Next.js 15.2.1**: React framework for server-side rendering and static site generation
- **React 19.0.0**: JavaScript library for building user interfaces
- **Tailwind CSS 4.0.12**: Utility-first CSS framework
- **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS
- **Zustand 5.0.3**: State management library
- **Radar SDK**: For maps and location services

## Features

- Search for food trucks by name
- View food trucks on a map
- Get current location
- Check in food trucks with location data
- Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd nextjs
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `app/`: Next.js App Router
- `components/`: Reusable React components
  - `ui/`: shadcn/ui components
  - `layout/`: Layout components
  - `food-trucks/`: Food truck related components
  - `map/`: Map related components
  - `checkin/`: Check-in related components
- `lib/`: Utility functions and helpers
- `public/`: Static assets
- `store/`: Zustand stores
  - `food-trucks-store.ts`: Food truck data and search functionality
  - `location-store.ts`: Location services
  - `checkin-store.ts`: Check-in functionality
  - `ui-store.ts`: UI state management

## API Endpoints

The application uses the following API endpoints:

- `https://food-truck-api-main-4443f2d.d2.zuplo.dev/api/google-search`: Get food trucks from Google Places
- `https://food-truck-api-main-4443f2d.d2.zuplo.dev/api/trucks`: Get registered food trucks
- `https://food-truck-api-main-4443f2d.d2.zuplo.dev/api/checkin`: Check in a food truck
