export interface Bicycle {
  id?: string;
  name: string;
  price: number;
  description: string;
  features: string;
  image_url?: string;
  category?: 'mountain' | 'road' | 'kids' | 'electric' | 'city';
  created_at?: string;
}

export type BikeCategory = 'mountain' | 'road' | 'kids' | 'electric' | 'city';

export const BIKE_CATEGORIES: { id: BikeCategory; name: string; icon: string; color: string }[] = [
  { id: 'mountain', name: 'Mountain Bikes', icon: '⛰️', color: 'from-emerald-500 to-green-600' },
  { id: 'road', name: 'Road Bikes', icon: '🛣️', color: 'from-blue-500 to-indigo-600' },
  { id: 'kids', name: 'Kids Bikes', icon: '👶', color: 'from-pink-500 to-rose-600' },
  { id: 'electric', name: 'Electric Bikes', icon: '⚡', color: 'from-yellow-500 to-orange-600' },
  { id: 'city', name: 'City Bikes', icon: '🏙️', color: 'from-purple-500 to-violet-600' },
];
