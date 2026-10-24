export type TabType = 'beranda' | 'checkpoint' | 'pasar-alat' | 'gunung-trip';

export interface UserProfile {
  name: string;
  avatar: string;
  badge: string;
  level: string;
  points: number;
  totalWasteKg: number;
  targetWasteKg: number;
  co2eAvoidedKg: number;
  caloriesBurnedKcal: number;
}

export interface CheckpointHistoryItem {
  id: string;
  location: string;
  details: string;
  points: number;
  date: string;
}

export interface MountainData {
  id: string;
  name: string;
  elevation: number;
  location: string;
  status: 'Jalur Buka' | 'Waspada' | 'Tutup Musiman';
  category: 'Taman Nasional' | 'Booking Online' | 'Gunung Wisata';
  difficulty: string;
  difficultyDots: number; // out of 5
  routes: string;
  zeroWastePolicy: string;
  co2Estimate: string;
  quotaPerDay: string;
  image: string;
  alt: string;
}

export interface CleanUpTrip {
  id: string;
  title: string;
  organizer: string;
  organizerRole: string;
  remainingSlots: number;
  dates: string;
  duration: string;
  facilities: string[];
  pointsReward: number;
  image: string;
  alt: string;
}
