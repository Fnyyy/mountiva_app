import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTotalWeight,
  calculateImpactMetrics,
  formatIDR,
  filterGearItems,
  GearItem,
} from './ecoTracker';

test('calculateTotalWeight sums positive weights accurately', () => {
  const result = calculateTotalWeight({
    petPlasticKg: 1.8,
    canMetalKg: 0.6,
    residualKg: 0.9,
  });
  assert.equal(result, 3.3);
});

test('calculateTotalWeight guards against NaN or negative inputs', () => {
  const result = calculateTotalWeight({
    petPlasticKg: -2,
    canMetalKg: 1.5,
    residualKg: 0,
  });
  assert.equal(result, 1.5);
});

test('calculateImpactMetrics calculates accurate CO2e and points', () => {
  const metrics = calculateImpactMetrics({
    petPlasticKg: 1.8,
    canMetalKg: 0.6,
    residualKg: 0.9,
  }, 850);

  assert.equal(metrics.totalWeightKg, 3.3);
  // 1.8*2.1 + 0.6*4.2 + 0.9*0.8 = 3.78 + 2.52 + 0.72 = 7.02 -> 7.0
  assert.equal(metrics.co2eAvoidedKg, 7.0);
  // Base 100 + round(3.3 * 70) = 100 + 231 = 331
  assert.equal(metrics.pointsEarned, 331);
  assert.ok(metrics.caloriesBurnedKcal > 3000);
});

test('formatIDR formats currency numbers to Indonesian rupiah', () => {
  assert.equal(formatIDR(45000), 'Rp45.000');
  assert.equal(formatIDR(1150000), 'Rp1.150.000');
});

test('filterGearItems filters correctly by rental, preloved, and query', () => {
  const sampleItems: GearItem[] = [
    {
      id: '1',
      name: 'Tenda Naturehike Cloud Up 2',
      category: 'rental',
      grade: 'grade-a',
      gradeLabel: 'Grade A',
      location: 'Bandung',
      price: 45000,
      priceUnit: '/ hari',
      rating: 4.9,
      reviewCount: 128,
      isVerified: true,
      tag: 'Steril & QC Pass',
      tagIcon: 'clean_hands',
      image: '',
    },
    {
      id: '2',
      name: 'Carrier Deuter Aircontact 60+10L',
      category: 'preloved',
      grade: 'grade-a',
      gradeLabel: 'Grade A-',
      location: 'Jakarta',
      price: 1150000,
      priceUnit: '',
      rating: 4.8,
      reviewCount: 54,
      isVerified: true,
      tag: 'Garansi Escrow',
      tagIcon: 'shield',
      image: '',
    },
  ];

  const rentals = filterGearItems(sampleItems, 'rental');
  assert.equal(rentals.length, 1);
  assert.equal(rentals[0].name, 'Tenda Naturehike Cloud Up 2');

  const preloved = filterGearItems(sampleItems, 'preloved');
  assert.equal(preloved.length, 1);
  assert.equal(preloved[0].name, 'Carrier Deuter Aircontact 60+10L');

  const searched = filterGearItems(sampleItems, 'all', 'deuter');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].id, '2');

  const emptySearch = filterGearItems(sampleItems, 'all', 'nonexistent');
  assert.equal(emptySearch.length, 0);
});
