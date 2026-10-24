import React, { useState, useRef } from 'react';
import { MountainData } from '../../types';

interface GunungTripScreenProps {
  onSelectMountain: (mountain: MountainData) => void;
  onOpenTripRegistration: () => void;
  onOpenCommunityFinder: () => void;
}

const MOUNTAINS: MountainData[] = [
  {
    id: 'rinjani',
    name: 'Gunung Rinjani',
    elevation: 3726,
    location: 'Lombok, Nusa Tenggara Barat',
    status: 'Jalur Buka',
    category: 'Taman Nasional',
    difficulty: 'Sedang - Berat',
    difficultyDots: 4,
    routes: 'Sembalun, Senaru, Torean',
    zeroWastePolicy:
      'Wajib ceklis barcode logistik & deposit sampah Rp100.000 di shelter registrasi.',
    co2Estimate: 'Est. 4,2 kg CO2e/pax',
    quotaPerDay: 'Kuota: 120/hari',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBw-BFTsE9Ybob6h147ukUUrrL0Z5j2fHFm3A9c12cNCYSTx8zYi9qxHWP4o74OxLS9E7ec9ZfnrR9TALyc0A2lquwHwYZa6YXhV-iV-tPaPfPREmEtbn_llD8gzg97cIJl7pxWsXqUlaNJdKfy8FYYg-pXGDf8mTH_PLoTsllLMZUvNFfHaO5utz9AverwJTSymN7sO2TeTi_90FRSTQqnlBesI3TUyiURCctrK6BHvb8cr4L_JkjW_w',
    alt: 'Majestic volcanic caldera of Mount Rinjani in Lombok',
  },
  {
    id: 'prau',
    name: 'Gunung Prau',
    elevation: 2565,
    location: 'Dieng Plateau, Jawa Tengah',
    status: 'Jalur Buka',
    category: 'Booking Online',
    difficulty: 'Ramah Pemula',
    difficultyDots: 2,
    routes: 'Patakbanteng & Kalilembu',
    zeroWastePolicy: 'Verifikasi kantong logistik e-simaksi wajib saat check-out pos.',
    co2Estimate: 'Est. 1,8 kg CO2e/pax',
    quotaPerDay: 'Kuota 400/hari',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIxA7-jODqJ6nDcHTTXEZ7BpnC9cSWrZfuMrS8Popf1XGG0QydMFCp6tkDrIQJ5x6bwlnygepDeSS_bcaFopuPhspbcOZd1E_d99AgBlcCs3NXxDnGi3pmRDXxokYd31z_nXBDzlpkF5i0LBu7dB2GQTscTFnWrG49mSPiQGPUm3c5MeupNNaJhooKzbd4m4r-OLssXN-xkTlEoQDEBAN3dzu-DBE8alnxT-B1bVVPnYbkEFlQxAAqeQ',
    alt: 'Panoramic sunrise view from peak of Mount Prau in Dieng',
  },
];

export const GunungTripScreen: React.FC<GunungTripScreenProps> = ({
  onSelectMountain,
  onOpenTripRegistration,
  onOpenCommunityFinder,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'encyclopedia' | 'trips'>('encyclopedia');
  const [searchQuery, setSearchQuery] = useState('');
  const tripsRef = useRef<HTMLDivElement>(null);
  const encRef = useRef<HTMLDivElement>(null);

  const handleTabSwitch = (tab: 'encyclopedia' | 'trips') => {
    setActiveSubTab(tab);
    if (tab === 'trips' && tripsRef.current) {
      tripsRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'encyclopedia' && encRef.current) {
      encRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredMountains = MOUNTAINS.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.routes.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Interactive View Switcher & Header Context */}
      <div className="px-4 pt-1 pb-2 flex flex-col gap-2.5">
        {/* Screen View Tabs */}
        <div className="flex p-1 bg-surface-container rounded-xl">
          <button
            type="button"
            id="tab-encyclopedia"
            onClick={() => handleTabSwitch('encyclopedia')}
            className={`flex-1 py-2 rounded-lg text-label-md flex items-center justify-center gap-1.5 transition-all ${
              activeSubTab === 'encyclopedia'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-on-surface-variant font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>Ensiklopedia</span>
          </button>
          <button
            type="button"
            id="tab-trips"
            onClick={() => handleTabSwitch('trips')}
            className={`flex-1 py-2 rounded-lg text-label-md flex items-center justify-center gap-1.5 transition-all ${
              activeSubTab === 'trips'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-on-surface-variant font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
            <span>Clean-Up & Trip</span>
          </button>
        </div>

        {/* Mountain Search Input */}
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari gunung atau jalur pendakian..."
            className="w-full bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/60 text-body-md pl-11 pr-10 py-3 rounded-xl shadow-[0_2px_8px_rgba(27,67,50,0.04)] outline-none focus:ring-2 focus:ring-secondary/40 transition-all"
          />
          <button
            type="button"
            aria-label="Filter"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-on-surface-variant rounded-lg hover:bg-surface-container"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>
      </div>

      {/* Real-time Quota & Trail Alert Ticker */}
      <div className="px-4 py-1">
        <div className="bg-secondary-container/40 p-3 rounded-xl flex items-start gap-2.5 shadow-sm">
          <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <span className="material-symbols-outlined text-[16px]">campaign</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-label-sm uppercase tracking-wider text-secondary font-bold">
                Info Kuota & SOP Terkini
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping" />
            </div>
            <p className="text-body-sm text-on-secondary-container leading-relaxed mt-0.5">
              <strong className="font-semibold text-primary">Gunung Gede:</strong> Sisa 84 kuota
              hari ini.{' '}
              <strong className="font-semibold text-primary">Rinjani:</strong> Jalur Sembalun buka
              normal, Segara Anak wajib trash-bag berlabel RFID.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 1: Mountain Encyclopedia Spotlight */}
      <section ref={encRef} className="flex flex-col gap-4 px-4 py-3" id="encyclopedia-view">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-label-sm uppercase tracking-wider text-secondary font-bold">
              Database Pendakian Lestari
            </span>
            <h2 className="text-headline-sm text-primary font-bold">Katalog Gunung Populer</h2>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-secondary text-label-md font-bold"
          >
            <span>Filter Status</span>
            <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>

        {/* Mountain Cards List */}
        {filteredMountains.map((mountain) => (
          <article
            key={mountain.id}
            className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_16px_rgba(27,67,50,0.06)] flex flex-col"
          >
            {/* Mountain Cover & Badges */}
            <div className="relative h-44 w-full">
              <img
                src={mountain.image}
                alt={mountain.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-transparent to-black/20" />

              {/* Top Status Pill */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-surface-container-lowest/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="text-label-sm text-primary font-bold">{mountain.status}</span>
              </div>
              <div className="absolute top-3 right-3 bg-primary-container/85 backdrop-blur-md text-on-primary-fixed px-2.5 py-1 rounded-full flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">
                  verified
                </span>
                <span className="text-label-sm font-semibold">{mountain.category}</span>
              </div>

              {/* Mountain Elevation & Location Overlay */}
              <div className="absolute bottom-3 inset-x-3 text-on-primary flex justify-between items-end">
                <div>
                  <h3 className="text-headline-md font-bold leading-tight">{mountain.name}</h3>
                  <p className="text-body-sm text-surface-container-low/90 flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {mountain.location}
                  </p>
                </div>
                <div className="bg-surface-container-lowest/20 backdrop-blur-md px-2.5 py-1 rounded-lg text-right">
                  <span className="text-stat-counter font-bold leading-none block">
                    {mountain.elevation.toLocaleString('id-ID')}
                  </span>
                  <span className="text-label-sm text-surface-container-low/80 uppercase">
                    mdpl
                  </span>
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 flex flex-col gap-3">
              {/* Trail Specs Grid */}
              <div className="grid grid-cols-2 gap-2 bg-surface-container-low/60 p-2.5 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-label-sm text-on-surface-variant font-medium">
                    Tingkat Kesulitan
                  </span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-label-md font-bold text-primary">
                      {mountain.difficulty}
                    </span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((dot) => (
                        <span
                          key={dot}
                          className={`w-2 h-2 rounded-full ${
                            dot <= mountain.difficultyDots
                              ? 'bg-secondary'
                              : 'bg-outline-variant'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-label-sm text-on-surface-variant font-medium">
                    Jalur Resmi
                  </span>
                  <span className="text-label-md font-semibold text-on-surface mt-1 truncate">
                    {mountain.routes}
                  </span>
                </div>
              </div>

              {/* Eco Stewardship SOP Tag */}
              {mountain.zeroWastePolicy && (
                <div className="flex items-start gap-2 bg-tertiary-fixed/40 p-2.5 rounded-lg">
                  <span className="material-symbols-outlined text-[18px] text-on-tertiary-fixed-variant shrink-0 mt-0.5">
                    recycling
                  </span>
                  <div className="flex flex-col">
                    <span className="text-label-sm font-bold text-on-tertiary-fixed">
                      Kebijakan Zero Waste Wajib
                    </span>
                    <p className="text-body-sm text-on-surface-variant leading-snug">
                      {mountain.zeroWastePolicy}
                    </p>
                  </div>
                </div>
              )}

              {/* Metrics Row */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary">co2</span>
                  <span className="text-label-sm">{mountain.co2Estimate}</span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-on-tertiary-container">
                    event_seat
                  </span>
                  <span className="text-label-sm font-semibold text-primary">
                    {mountain.quotaPerDay}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectMountain(mountain)}
                className="w-full mt-1 bg-primary text-on-primary py-3 rounded-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.99] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">mountain_flag</span>
                <span>Lihat Jalur & SOP Sampah</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* SECTION 2: Upcoming Clean-Up & Open Trip */}
      <section ref={tripsRef} className="flex flex-col gap-4 px-4 py-3" id="trips-section">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-label-sm uppercase tracking-wider text-secondary font-bold">
              Aksi Nyata & Komunitas
            </span>
            <h2 className="text-headline-sm text-primary font-bold">Upcoming Clean-Up Hike</h2>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-bold">
            1 Trip Terbuka
          </span>
        </div>

        {/* Featured Trip Card */}
        <article className="bg-surface-container-lowest rounded-xl p-4 shadow-[0_4px_16px_rgba(27,67,50,0.06)] flex flex-col gap-3 relative overflow-hidden">
          {/* Decorative Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary via-secondary-fixed-dim to-tertiary-fixed-dim" />

          {/* Organizer & Status */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">shield_person</span>
              </div>
              <div className="flex flex-col">
                <span className="text-label-md font-bold text-primary">
                  MounTiva Ranger x TNGR
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  Penyelenggara Resmi Balai TN
                </span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-error-container text-on-error-container text-label-sm font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">timer</span>
              Sisa 4 Slot
            </span>
          </div>

          {/* Trip Title & Image Preview */}
          <div className="relative h-36 rounded-lg overflow-hidden my-0.5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcOP1WIhnNLyM3NhnxtvjZH0si3xVs7IuS1sxZqJFNC4-zpODtJZ8N-h70MLbTtoJNuScsZ8cu-LTKu-lJ98_UJOAMx5sHMB-EHBJFpsaSuyOO7VGxw0tBBvvOLcGpMcXvNFJh0IWnDfsyoTR2gtQj6yW4kKAUJjleale9AnYWdz-ON6tTm48IvrwVXlmmO9jtBsoIDsValfFp0UW5FWsLzPNwKxmxBPP11FLhJWAoU_AOFehdWD_qfg"
              alt="Clean-Up Expedition Segara Anak 2026"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-3 right-3 text-on-primary">
              <span className="px-2 py-0.5 bg-tertiary-fixed-dim text-on-tertiary-container rounded text-label-sm font-bold uppercase tracking-wider inline-block mb-1">
                Konservasi & Solidaritas
              </span>
              <h3 className="text-headline-sm font-bold leading-tight">
                Clean-Up Expedition Segara Anak 2026
              </h3>
            </div>
          </div>

          {/* Schedule & Timeline */}
          <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg text-primary">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">
                calendar_month
              </span>
              <div className="flex flex-col">
                <span className="text-label-sm text-on-surface-variant font-medium">
                  Jadwal Ekspedisi
                </span>
                <span className="text-label-md font-bold">14 - 17 November 2026</span>
              </div>
            </div>
            <div className="text-right flex flex-col">
              <span className="text-label-sm text-on-surface-variant font-medium">Durasi</span>
              <span className="text-label-md font-bold">4 Hari 3 Malam</span>
            </div>
          </div>

          {/* Included Facilities List */}
          <div className="flex flex-col gap-1.5">
            <span className="text-label-sm text-on-surface-variant uppercase font-semibold">
              Fasilitas Termasuk:
            </span>
            <div className="grid grid-cols-2 gap-2 text-on-surface">
              <div className="flex items-center gap-1.5 text-body-sm">
                <span className="material-symbols-outlined text-secondary text-[16px]">
                  check_circle
                </span>
                <span>Tenda Dome & Matras</span>
              </div>
              <div className="flex items-center gap-1.5 text-body-sm">
                <span className="material-symbols-outlined text-secondary text-[16px]">
                  check_circle
                </span>
                <span>Porter Sampah Khusus</span>
              </div>
              <div className="flex items-center gap-1.5 text-body-sm">
                <span className="material-symbols-outlined text-secondary text-[16px]">
                  check_circle
                </span>
                <span>Guide APGI Bersertifikat</span>
              </div>
              <div className="flex items-center gap-1.5 text-body-sm">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-[16px]">
                  stars
                </span>
                <span className="font-bold text-primary">+1.000 Eco-Points</span>
              </div>
            </div>
          </div>

          {/* Registration CTA Button */}
          <button
            type="button"
            onClick={onOpenTripRegistration}
            className="w-full mt-1 bg-secondary hover:bg-primary text-on-secondary py-3.5 rounded-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
            <span>Daftar Trip Bersih-Bersih</span>
          </button>
        </article>
      </section>

      {/* SECTION 3: Community Forum Quick Link */}
      <section className="px-4 pt-1 pb-4">
        <div
          onClick={onOpenCommunityFinder}
          className="bg-surface-container-high/80 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm hover:bg-surface-container-high cursor-pointer transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">group_add</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-label-lg font-bold text-primary truncate">
                Cari Teman Se-Frekuensi
              </h3>
              <p className="text-body-sm text-on-surface-variant leading-snug">
                Share cost logistik & temukan partner mendaki beretika ramah lingkungan.
              </p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </div>
        </div>
      </section>
    </div>
  );
};
