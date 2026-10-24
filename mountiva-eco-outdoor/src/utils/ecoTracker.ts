/**
 * Core domain logic for MounTiva Eco-Outdoor
 * Waste calculations, telemetry validation, eco-points, and impact metrics.
 */

export interface WasteBatch {
  petPlasticKg: number;
  canMetalKg: number;
  residualKg: number;
}

export interface ImpactMetrics {
  totalWeightKg: number;
  co2eAvoidedKg: number;
  caloriesBurnedKcal: number;
  pointsEarned: number;
}

/**
 * Calculates sum of all categorized trash weights rounded to 1 decimal place.
 */
export function calculateTotalWeight(waste: WasteBatch): number {
  const pet = Math.max(0, Number(waste.petPlasticKg) || 0);
  const can = Math.max(0, Number(waste.canMetalKg) || 0);
  const res = Math.max(0, Number(waste.residualKg) || 0);
  return Number((pet + can + res).toFixed(1));
}

/**
 * Calculates environmental and fitness impact for a verified waste submission:
 * - 1 kg PET plastic diverted saves ~2.1 kg CO2e
 * - 1 kg Metal/Can diverted saves ~4.2 kg CO2e
 * - 1 kg Residual disposed properly saves ~0.8 kg CO2e
 * - Points: base checkpoint verification (100) + 70 pts/kg
 */
export function calculateImpactMetrics(waste: WasteBatch, elevationGainM: number = 850): ImpactMetrics {
  const total = calculateTotalWeight(waste);
  const pet = Math.max(0, Number(waste.petPlasticKg) || 0);
  const can = Math.max(0, Number(waste.canMetalKg) || 0);
  const res = Math.max(0, Number(waste.residualKg) || 0);

  const co2eAvoided = Number((pet * 2.1 + can * 4.2 + res * 0.8).toFixed(1));
  
  // Base burn on elevation climb + pack resistance
  const caloriesBurned = Math.round(elevationGainM * 3.8 + total * 45);
  
  // Point formula: 100 base + 70 per kg
  const points = 100 + Math.round(total * 70);

  return {
    totalWeightKg: total,
    co2eAvoidedKg: co2eAvoided,
    caloriesBurnedKcal: caloriesBurned,
    pointsEarned: points,
  };
}

/**
 * Formats Indonesian Rupiah currency cleanly
 */
export function formatIDR(amount: number): string {
  return 'Rp' + amount.toLocaleString('id-ID');
}

/**
 * Filters marketplace items by category and search keyword
 */
export interface GearItem {
  id: string;
  name: string;
  category: 'rental' | 'preloved';
  grade: 'grade-a' | 'grade-b';
  gradeLabel: string;
  location: string;
  price: number;
  originalPrice?: number;
  priceUnit: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  tag: string;
  tagIcon: string;
  image: string;
  usageCount?: string;
  description?: string;
}

export function filterGearItems(
  items: GearItem[],
  filter: string,
  searchQuery: string = ''
): GearItem[] {
  const q = searchQuery.toLowerCase().trim();
  
  return items.filter(item => {
    // Search match
    if (q && !item.name.toLowerCase().includes(q) && !item.location.toLowerCase().includes(q)) {
      return false;
    }
    
    // Category match
    if (filter === 'all') return true;
    if (filter === 'rental') return item.category === 'rental';
    if (filter === 'preloved') return item.category === 'preloved';
    if (filter === 'grade-a') return item.grade === 'grade-a';
    if (filter === 'nearby') return ['Bandung', 'Bogor'].includes(item.location);
    return true;
  });
}
