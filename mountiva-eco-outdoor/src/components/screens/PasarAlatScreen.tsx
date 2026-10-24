import React, { useState } from 'react';
import { GearItem, filterGearItems, formatIDR } from '../../utils/ecoTracker';

interface PasarAlatScreenProps {
  onAwardPoints: (points: number, reason: string) => void;
  onSelectGear: (item: GearItem) => void;
  onOpenPasangIklan: () => void;
}

const INITIAL_GEAR: GearItem[] = [
  {
    id: 'gear-1',
    name: 'Tenda Naturehike Cloud Up 2 Ultralight',
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
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBvxgtNmN6kJ_4995uLaTBwsHePsy9QUj9wDSAu04dd1elNVR7MB3REKldyDxr38gVAlM7JUacPzIWMBMbuC_L9HNZHleg1GELxByRqg5lTJBnNuyBickH-2_gvo_r3LTmoYssnO7_XEaeB1FT7bqb_Qi6gGUhJH08KED64QPxwLdbXHH1rrAOmvyx1OjXNKiRLUp35OjMup5FgBWO9j8X3ojRpTKMu-bIKqh6SCXJDmSP6y1wachDB0A',
    description:
      'Tenda ultralight 2 orang dengan bobot hanya 1.4 kg. Sudah disterilisasi UV & perlakuan waterproofing seam-seal sebelum disewakan.',
  },
  {
    id: 'gear-2',
    name: 'Carrier Deuter Aircontact 60+10L',
    category: 'preloved',
    grade: 'grade-a',
    gradeLabel: 'Grade A-',
    location: 'Jakarta',
    price: 1150000,
    originalPrice: 2800000,
    priceUnit: '',
    rating: 4.8,
    reviewCount: 54,
    isVerified: true,
    usageCount: '3x Pakai',
    tag: 'Garansi Escrow',
    tagIcon: 'shield',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAb6t_3d5eYU4bXqR7wjsh5lv_34x5rXutv3truqRP2b0AzYokjGBB8p-UdB8wERBpIbWzQWTNoYQyEw6nePyz1m-Ac3yZ2TJxJXzpE1F7KrGBuB3GU5E8rSwtQT9n4340ENpAOhOKVOCVImn-bEJN7P9OGMapSRAPp0NpVTBl7b77FFrlfXEuvUfjnBXuxnsPcJU5HnB8mEEPNCl_eqUYdt-K66Qh3InG79aFFKmI8B019CLkx_P5Axw',
    description:
      'Backpack ekspedisi Deuter original. Backsystem Aircontact empuk, buckle utuh tanpa retak. Dana ditahan di escrow hingga barang Anda terima & periksa.',
  },
  {
    id: 'gear-3',
    name: 'Salomon X Ultra 4 GTX (Size 42)',
    category: 'preloved',
    grade: 'grade-b',
    gradeLabel: 'Grade B+',
    location: 'Malang',
    price: 980000,
    priceUnit: '',
    rating: 4.7,
    reviewCount: 39,
    isVerified: true,
    tag: 'Sol 90% Tebal',
    tagIcon: 'straighten',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB830pYT_g448N6C6d63N4zTDdp6WRG_flf77t0S7Ktz7liz6-7VvB_pkasd8377_s1S18t9iWgCRH1WjEVDwMYpFoz8pnuOHNVhzwZlVyd0ImJgzhcUiBIu4CabAyUynKaZxDuRg_AMB6RYGiwj3lxYfnjlvBBlOzRlykMYkUKMU77Wf2Odr3VrVk8eNgqverg61vFOnXEBLgIEyRHbQRHfGl8D6wsvIWNC291RgtUCaqjYhRVePsByw',
    description:
      'Sepatu trail & hiking tangguh dengan membran waterproof GORE-TEX dan outsole Contagrip bergerigi dalam.',
  },
  {
    id: 'gear-4',
    name: 'Kompor Ultralight Kovea Spider',
    category: 'rental',
    grade: 'grade-a',
    gradeLabel: 'Grade A',
    location: 'Bogor',
    price: 15000,
    priceUnit: '/ hari',
    rating: 5.0,
    reviewCount: 89,
    isVerified: true,
    tag: 'Siap Pakai & Test',
    tagIcon: 'local_fire_department',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJmFusxi6-VHiHjZ9npYjhfLrl0Lo4EN4uIYB3kadWxBHko-YyUKOE67z4s3uuBLnyErZM3BAA8eXCZTH5Kqlyp3wiXrLHZ5Zsqumczonb0q81ATbjMLObfCQ0cDGIlMeyiqUB21muzv1RSSYmX6irzltgLtveg7ytkb65D3M8_9TVlvkMBt22Y5sw0jeB0XrJbkf4gLvbCdmsVwpN20okzdO-DgYEUlLo-jS9ROrELUav0xUEqCL6Fw',
    description:
      'Kompor gas outdoor lipat titanium dengan pemantik piezo elektrik. Hemat gas dan stabil pada suhu dingin dataran tinggi.',
  },
];

export const PasarAlatScreen: React.FC<PasarAlatScreenProps> = ({
  onAwardPoints,
  onSelectGear,
  onOpenPasangIklan,
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [claimedDiscount, setClaimedDiscount] = useState(false);

  const filterChips = [
    { id: 'all', label: 'Semua', icon: 'eco' },
    { id: 'rental', label: 'Sewa Alat (Rental)', icon: 'event_repeat' },
    { id: 'preloved', label: 'Beli Pre-Loved', icon: 'shopping_bag' },
    { id: 'grade-a', label: 'Grade A (Like New)', icon: 'verified' },
    { id: 'nearby', label: 'Dekat Saya', icon: 'near_me' },
  ];

  const filteredItems = filterGearItems(INITIAL_GEAR, activeFilter, searchQuery);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleClaimDiscount = () => {
    if (claimedDiscount) return;
    setClaimedDiscount(true);
    onAwardPoints(50, 'Klaim Diskon Sirkular');
  };

  return (
    <div className="flex flex-col w-full px-4 pb-12 gap-5">
      {/* Search & Filter Controls */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[22px] pointer-events-none">
            search
          </span>
          <input
            id="gearSearchInput"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari carrier, tenda ultralight, nesting..."
            className="w-full h-12 pl-11 pr-10 bg-surface-container-lowest text-on-surface text-body-md rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 placeholder:text-outline transition-all"
          />
          <button
            type="button"
            aria-label="Filter Opsi"
            className="absolute right-2.5 w-7 h-7 flex items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        {/* Filter Chips (Horizontal Scrollable) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {filterChips.map((chip) => {
            const isActive = activeFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => setActiveFilter(chip.id)}
                className={`filter-chip flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-label-md whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-sm font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {chip.icon}
                </span>
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Circular Economy Promo Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-container to-secondary p-4 text-on-primary shadow-md">
        <div className="relative z-10 flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">autorenew</span>
            Ekonomi Sirkular
          </div>
          <h3 className="text-headline-sm text-on-primary leading-tight font-bold">
            Hemat & Berkelanjutan!
          </h3>
          <p className="text-body-sm text-primary-fixed leading-relaxed max-w-[85%]">
            Sewa perlengkapan outdoor mulai{' '}
            <span className="font-bold text-on-primary">Rp25rb/hari</span> atau tukar{' '}
            <span className="inline-flex items-center font-bold text-tertiary-fixed-dim">
              500 Eco-Points
            </span>{' '}
            untuk diskon ekstra 30%.
          </p>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleClaimDiscount}
              className={`px-3.5 py-1.5 text-label-md rounded-lg font-bold shadow-sm flex items-center gap-1 active:scale-95 transition-all ${
                claimedDiscount
                  ? 'bg-secondary-fixed text-on-secondary-fixed'
                  : 'bg-tertiary-fixed-dim text-on-tertiary hover:brightness-105'
              }`}
            >
              <span>{claimedDiscount ? 'Diskon Aktif (-30%)' : 'Klaim Diskon'}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
            <span className="text-label-sm text-on-primary-container">Tanpa jejak karbon baru</span>
          </div>
        </div>

        {/* Decorative background leaf motif */}
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-secondary-fixed/10 pointer-events-none flex items-center justify-center">
          <span className="material-symbols-outlined text-secondary-fixed/20 text-[100px]">
            compost
          </span>
        </div>
      </div>

      {/* Escrow & Quality Assurance Trust Badge */}
      <div className="rounded-xl bg-surface-container-low p-2.5 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-secondary text-[18px]">
              verified_user
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-label-sm text-primary uppercase font-bold tracking-wider">
              MounTiva Escrow & QC Assurance
            </span>
            <span className="text-body-sm text-on-surface-variant truncate">
              Inspeksi higienis alat • 100% garansi uang kembali
            </span>
          </div>
        </div>
        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">shield</span>
      </div>

      {/* Product Grid (2 columns) */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-headline-sm text-primary font-bold">Pilihan Terkurasi</span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container/80 text-on-secondary-container text-label-sm font-bold">
              {filteredItems.length} Alat
            </span>
          </div>
          <button
            type="button"
            className="text-label-md text-secondary font-bold flex items-center gap-0.5 hover:underline"
          >
            Lihat Rekomendasi
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3" id="gearProductGrid">
          {filteredItems.map((item) => {
            const isFav = !!favorites[item.id];
            return (
              <div
                key={item.id}
                onClick={() => onSelectGear(item)}
                className="product-card flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="relative w-full aspect-square bg-surface-container overflow-hidden">
                  <img
                    alt={item.name}
                    src={item.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-label-sm font-bold shadow-sm ${
                      item.category === 'rental'
                        ? 'bg-primary-container/90 backdrop-blur-sm text-on-primary'
                        : 'bg-secondary text-on-secondary'
                    }`}
                  >
                    {item.category === 'rental' ? 'Rental' : 'Beli Pre-Loved'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => toggleFavorite(e, item.id)}
                    aria-label={`Favorit ${item.name}`}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface-variant flex items-center justify-center shadow-sm hover:text-error transition-colors"
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        isFav ? 'text-error' : ''
                      }`}
                      style={isFav ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      favorite
                    </span>
                  </button>
                  <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-1 rounded-md shadow-sm">
                    <span className="material-symbols-outlined text-secondary text-[14px]">
                      {item.tagIcon}
                    </span>
                    <span className="text-label-sm text-secondary font-semibold truncate">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col p-2.5 gap-1.5 flex-1 justify-between">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-secondary-fixed/50 text-on-secondary-fixed-variant text-label-sm font-bold">
                        {item.gradeLabel}
                      </span>
                      <span className="text-label-sm text-on-surface-variant truncate">
                        {item.usageCount ? item.usageCount : item.location}
                      </span>
                    </div>
                    <h4 className="text-body-md text-on-surface font-semibold line-clamp-2 leading-snug">
                      {item.name}
                    </h4>
                  </div>

                  <div className="flex flex-col pt-1">
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="text-headline-sm text-primary font-bold">
                        {formatIDR(item.price)}
                      </span>
                      {item.priceUnit && (
                        <span className="text-body-sm text-outline">{item.priceUnit}</span>
                      )}
                    </div>
                    {item.originalPrice && (
                      <span className="text-label-sm text-outline line-through -mt-1">
                        Baru {formatIDR(item.originalPrice)}
                      </span>
                    )}
                    <div className="flex items-center justify-between mt-1 text-on-surface-variant">
                      <div className="flex items-center gap-0.5">
                        <span
                          className="material-symbols-outlined text-tertiary-fixed-dim text-[14px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        <span className="text-label-sm font-bold text-on-surface">
                          {item.rating.toFixed(1)}
                        </span>
                        <span className="text-body-sm text-outline">({item.reviewCount})</span>
                      </div>
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ecological Impact Snippet / Community Trust */}
      <div className="rounded-xl bg-surface-container p-4 flex flex-col gap-1.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-headline-sm text-primary font-bold">Dampak Sirkular Bulan Ini</span>
          <span className="text-stat-counter text-secondary font-bold">3.4 Ton</span>
        </div>
        <p className="text-body-sm text-on-surface-variant">
          Peminjaman dan pembelian pre-loved di MounTiva telah mencegah 3.400 kg sampah perlengkapan
          dan menghemat 14.200 liter air produksi garmen outdoor.
        </p>
        <div className="w-full bg-surface-container-highest rounded-full h-2 mt-1 overflow-hidden">
          <div
            className="bg-gradient-to-r from-secondary to-primary-fixed-dim h-full rounded-full transition-all duration-700"
            style={{ width: '78%' }}
          />
        </div>
        <div className="flex justify-between items-center text-label-sm text-outline mt-0.5">
          <span>Target Komunitas: 4 Ton</span>
          <span className="text-secondary font-bold">78% Tercapai</span>
        </div>
      </div>

      {/* Floating Sticky Action Button (Pasang Iklan / Sewakan Alat) */}
      <div className="sticky bottom-4 z-30 w-full flex justify-center">
        <button
          type="button"
          onClick={onOpenPasangIklan}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary hover:bg-primary-container text-on-primary text-label-lg font-bold shadow-xl active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[20px] text-tertiary-fixed-dim">
            add_circle
          </span>
          <span>Pasang Iklan / Sewakan Alatmu</span>
          <span className="px-1.5 py-0.5 rounded-full bg-secondary text-on-secondary text-label-sm font-bold">
            +100 Pts
          </span>
        </button>
      </div>
    </div>
  );
};
