import React, { useState } from 'react';
import { TabType, UserProfile } from '../../types';

interface BerandaScreenProps {
  user: UserProfile;
  onChangeTab: (tab: TabType) => void;
  onOpenSimaksi: () => void;
  onOpenArticle: () => void;
  onOpenQuestDetail: () => void;
  onOpenTukarPoin: () => void;
}

export const BerandaScreen: React.FC<BerandaScreenProps> = ({
  user,
  onChangeTab,
  onOpenSimaksi,
  onOpenArticle,
  onOpenQuestDetail,
  onOpenTukarPoin,
}) => {
  const [showToast, setShowToast] = useState(false);

  const handleQuickTukar = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4500);
  };

  const remainingKg = Math.max(0, Number((user.targetWasteKg - user.totalWasteKg).toFixed(1)));
  const progressPercent = Math.min(100, Math.round((user.totalWasteKg / user.targetWasteKg) * 100));

  return (
    <div className="flex flex-col w-full px-4 space-y-6 pb-6">
      {/* 1. GREETING & RANGER IDENTITY */}
      <section className="flex items-center justify-between pt-1">
        <div className="flex flex-col min-w-0 pr-2">
          <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-secondary-container/70 mb-1.5 shadow-sm">
            <span
              className="material-symbols-outlined text-secondary text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="text-label-md text-on-secondary-container font-semibold">
              {user.badge} • {user.level}
            </span>
          </div>
          <h1 className="text-headline-md text-primary tracking-tight font-bold">
            Halo, {user.name}!
          </h1>
          <p className="text-body-md text-on-surface-variant truncate">
            Siap mendaki bertanggung jawab?
          </p>
        </div>
        <div className="relative flex-shrink-0">
          <div className="w-14 h-14 rounded-2xl bg-secondary-container/50 flex items-center justify-center p-1 shadow-sm">
            <img
              className="w-full h-full object-cover rounded-xl"
              alt="Avatar Rian"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfGvvqsF-K9nCxQhiUOr52A3CGRT6kbk-twk4L8sNft0795J6jIXHy0qK5dMeUz2OgpIqAtwBu1unhr60TMbqHW1dY3g5gxflFdP2VzzdTK8eI8EUFZgO7kE99XA8dH5CxMg3SH9Q4jq7cj5fZzoiT1TiyRMC28pDW9K-JiybDIsQfb0oqFxFDDzye2RnLkOYh30_PblwPIzuedCU6-22uwKdSuOItkmXFTL9NUg9voU_PotYmU6oIRQ"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-tertiary-fixed-dim flex items-center justify-center text-on-tertiary-fixed shadow-sm">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              award_star
            </span>
          </div>
        </div>
      </section>

      {/* 2. GAMIFIED ECO-TRACKER HERO BANNER */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary p-4 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-secondary-fixed/10 blur-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col space-y-4">
          {/* Header row of tracker */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-surface/10 backdrop-blur-md flex items-center justify-center text-secondary-fixed">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  delete_sweep
                </span>
              </div>
              <div>
                <span className="text-label-sm text-on-primary-container uppercase tracking-wider block font-semibold">
                  Total Sampah Diturunkan
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-stat-counter text-on-primary">
                    {user.totalWasteKg.toFixed(1)}
                  </span>
                  <span className="text-label-md text-secondary-fixed-dim">
                    / {user.targetWasteKg.toFixed(1)} kg
                  </span>
                </div>
              </div>
            </div>
            <span className="text-label-sm px-2.5 py-1 rounded-full bg-surface/15 backdrop-blur-md text-secondary-fixed font-bold tracking-wide">
              {progressPercent}% Target
            </span>
          </div>

          {/* Segmented Tactile Progress Bar */}
          <div className="w-full space-y-1.5">
            <div className="h-3 w-full bg-black/25 rounded-full overflow-hidden p-0.5 backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-secondary-fixed-dim to-secondary-fixed rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-on-primary-container text-body-sm">
              <span>Target Pekan Ini: {user.targetWasteKg} kg</span>
              <span className="text-label-sm font-semibold text-secondary-fixed">
                {remainingKg > 0 ? `Sisa ${remainingKg} kg lagi!` : 'Target Tercapai! 🎉'}
              </span>
            </div>
          </div>

          {/* Metrics Dual Grid */}
          <div className="pt-1 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-surface/10 backdrop-blur-md p-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-secondary/30 flex items-center justify-center text-secondary-fixed flex-shrink-0">
                <span className="material-symbols-outlined text-[17px]">eco</span>
              </div>
              <div className="min-w-0">
                <p className="text-label-sm text-on-primary-container truncate font-medium">
                  CO2e Dicegah
                </p>
                <p className="text-label-lg text-on-primary font-bold">
                  {user.co2eAvoidedKg} kg
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-surface/10 backdrop-blur-md p-2.5 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-tertiary-fixed-dim/30 flex items-center justify-center text-tertiary-fixed flex-shrink-0">
                <span className="material-symbols-outlined text-[17px]">local_fire_department</span>
              </div>
              <div className="min-w-0">
                <p className="text-label-sm text-on-primary-container truncate font-medium">
                  Kalori Terbakar
                </p>
                <p className="text-label-lg text-on-primary font-bold">
                  {user.caloriesBurnedKcal.toLocaleString('id-ID')} kkal
                </p>
              </div>
            </div>
          </div>

          {/* Redeem Quick Action Footer */}
          <div className="pt-1 flex items-center justify-between gap-2 bg-surface-container-lowest/10 backdrop-blur-md p-2.5 rounded-xl">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center font-bold flex-shrink-0">
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  stars
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-label-md text-on-primary font-semibold truncate">
                  {user.points.toLocaleString('id-ID')} Poin Siap Digunakan
                </p>
                <p className="text-body-sm text-on-primary-container truncate">
                  Bisa ditukar voucher sewa tenda
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                handleQuickTukar();
                onOpenTukarPoin();
              }}
              className="flex-shrink-0 px-3.5 py-2 rounded-lg bg-tertiary-fixed-dim text-on-tertiary-fixed text-label-md font-bold shadow-md active:scale-95 transition-transform flex items-center gap-1 hover:brightness-105"
            >
              <span>Tukar</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. ACTIVE QUEST / MISI KONSERVASI */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="material-symbols-outlined text-secondary text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              flag
            </span>
            <h2 className="text-headline-sm text-primary font-bold">Misi Konservasi</h2>
          </div>
          <button
            type="button"
            onClick={onOpenQuestDetail}
            className="text-label-md text-secondary hover:underline flex items-center font-semibold"
          >
            Lihat Semua
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Active Quest Card */}
        <div className="rounded-2xl bg-surface-container-lowest p-4 shadow-[0_4px_16px_rgba(27,67,50,0.06)] relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
              <img
                className="w-full h-full object-cover"
                alt="Mount Rinjani Segara Anak"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxonRlbmZaHIvTE6LnNFHQP91IcPE_T1AUoAZxnjW6U1xUhxgcyCDffoQJs6Ms9PWwHvJxNLiwWY4_hG6YQOGVVk4M2WZuZ4oUR-A4ZGCFoGT-gMGsts-wCtYeZulrk_iYuLo7cYg6AY9jmGxyFVyHjNbptIVWlGbsTWUJGFJ0TDX7a4nQet8Z-L6x2Hg8obRNMhjkF2ik0jcdcFlUTpmQ0RCGBZvLi-vMVa1z9RMQUjLZsSGh44ThbQ"
              />
              <div className="absolute inset-0 bg-primary/20" />
              <span className="absolute bottom-1 right-1 material-symbols-outlined text-on-primary text-[14px]">
                landscape
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                  Tantangan Aktif
                </span>
                <span className="text-body-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">schedule</span> 4 Hari lagi
                </span>
              </div>
              <h3 className="text-headline-sm text-on-surface leading-snug truncate font-bold">
                Misi Clean-Up Rinjani 2025
              </h3>
              <p className="text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">
                Bawa turun minimal 3 kg sampah anorganik ke pos resmi Sembalun/Senaru.
              </p>
            </div>
          </div>

          {/* Quest Progress & Reward Strip */}
          <div className="mt-3.5 bg-surface-container-low rounded-xl p-3 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-on-surface">
              <span className="text-label-md flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-secondary text-[16px]">scale</span>
                Progres: 1.8 / 3.0 kg
              </span>
              <span className="text-label-sm text-secondary font-bold">60%</span>
            </div>
            <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full transition-all duration-500" style={{ width: '60%' }} />
            </div>
            <div className="flex items-center justify-between pt-1 text-on-surface-variant">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-label-sm text-tertiary-container font-bold flex items-center gap-1">
                  <span
                    className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    stars
                  </span>{' '}
                  +500 Pts
                </span>
                <span className="text-outline-variant">•</span>
                <span className="text-label-sm text-primary truncate flex items-center gap-1 font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-secondary">shield</span>{' '}
                  Badge Segara Anak
                </span>
              </div>
              <button
                type="button"
                onClick={onOpenQuestDetail}
                className="text-label-sm text-secondary font-bold hover:text-primary transition-colors flex-shrink-0"
              >
                Detail
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. QUICK ACTION SHORTCUTS (4 Grid) */}
      <section className="space-y-2">
        <h2 className="text-headline-sm text-primary font-bold">Aksi Cepat Trail</h2>
        <div className="grid grid-cols-4 gap-2.5">
          {/* Shortcut 1: Scan Pos QR */}
          <button
            type="button"
            onClick={() => onChangeTab('checkpoint')}
            className="group flex flex-col items-center text-center p-2.5 rounded-2xl bg-surface-container-lowest shadow-[0_3px_12px_rgba(27,67,50,0.04)] active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-secondary group-hover:text-on-secondary transition-colors mb-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
            </div>
            <span className="text-label-md text-on-surface font-semibold leading-tight line-clamp-2">
              Scan Pos QR
            </span>
          </button>

          {/* Shortcut 2: Sewa Tenda */}
          <button
            type="button"
            onClick={() => onChangeTab('pasar-alat')}
            className="group flex flex-col items-center text-center p-2.5 rounded-2xl bg-surface-container-lowest shadow-[0_3px_12px_rgba(27,67,50,0.04)] active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors mb-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">camping</span>
            </div>
            <span className="text-label-md text-on-surface font-semibold leading-tight line-clamp-2">
              Sewa Tenda
            </span>
          </button>

          {/* Shortcut 3: Cek Kuota */}
          <button
            type="button"
            onClick={() => onChangeTab('gunung-trip')}
            className="group flex flex-col items-center text-center p-2.5 rounded-2xl bg-surface-container-lowest shadow-[0_3px_12px_rgba(27,67,50,0.04)] active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed/60 flex items-center justify-center text-tertiary-container group-hover:bg-tertiary-fixed-dim transition-colors mb-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">confirmation_number</span>
            </div>
            <span className="text-label-md text-on-surface font-semibold leading-tight line-clamp-2">
              Cek Kuota
            </span>
          </button>

          {/* Shortcut 4: Open Trip */}
          <button
            type="button"
            onClick={() => onChangeTab('gunung-trip')}
            className="group flex flex-col items-center text-center p-2.5 rounded-2xl bg-surface-container-lowest shadow-[0_3px_12px_rgba(27,67,50,0.04)] active:scale-95 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-on-secondary-fixed-variant group-hover:bg-secondary-fixed transition-colors mb-1.5 shadow-sm">
              <span className="material-symbols-outlined text-[24px]">group_add</span>
            </div>
            <span className="text-label-md text-on-surface font-semibold leading-tight line-clamp-2">
              Open Trip
            </span>
          </button>
        </div>
      </section>

      {/* 5. UPCOMING HIKING / REGISTERED OPEN TRIP */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">hiking</span>
            <h2 className="text-headline-sm text-primary font-bold">Pendakian Terdaftar</h2>
          </div>
          <span className="text-label-sm px-2 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-bold">
            1 Tiket Aktif
          </span>
        </div>

        {/* Hiking Trip Card */}
        <div className="rounded-2xl bg-surface-container-lowest overflow-hidden shadow-[0_4px_20px_rgba(27,67,50,0.07)] flex flex-col">
          <div className="relative h-36 w-full">
            <img
              className="w-full h-full object-cover"
              alt="Clean-Up Hike Mt. Prau"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKb0W81QeGv5oUyW_Rpp9gFyqNZZxJU2WfZirIP0OUT-jzMyvJ-af0_oGpINueQegKn1YSC2Z-kAcRHCdqrWR5kKdzU-tcvu50dEb7M9skIHQChEYN9BtMwUgiNZnD8KIn6a5otaLWEhE6MBUQIlvz8uEL1WxqHbiS4oBgOZBJthcLGRyQQULniCb39ajsOWx98Y6uUMfn6K-KXzVjL8zWxnkbRUADXpEOv3OQReLFIkJ8V_xgu2zkCQ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-full bg-secondary text-on-secondary text-label-sm font-semibold flex items-center gap-1 shadow-sm">
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  eco
                </span>{' '}
                Eco-Trip Resmi
              </span>
            </div>
            <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-primary text-label-sm font-bold flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-secondary text-[14px]">event</span> 28 - 29 Okt
            </div>
            <div className="absolute bottom-2.5 left-3 right-3">
              <h3 className="text-headline-sm text-on-primary drop-shadow truncate font-bold">
                Clean-Up Hike Mt. Prau
              </h3>
              <p className="text-body-sm text-secondary-fixed flex items-center gap-1 drop-shadow">
                <span className="material-symbols-outlined text-[14px]">location_on</span> via
                Patakbanteng, Dieng (2.565 mdpl)
              </p>
            </div>
          </div>

          {/* Card Content Detail */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between text-on-surface-variant text-body-sm">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[18px] text-secondary">verified_user</span>
                <span>Guide APGI Tersertifikasi</span>
              </div>
              <div className="flex items-center gap-1 text-label-md text-on-surface font-semibold">
                <span className="material-symbols-outlined text-[16px] text-primary">groups</span>
                <span>8 / 10 Peserta</span>
              </div>
            </div>

            {/* Participants Avatar Stack & Action */}
            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center -space-x-2 overflow-hidden py-1">
                <img
                  className="inline-block h-7 w-7 rounded-full object-cover ring-2 ring-surface-container-lowest"
                  alt="Peserta 1"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHKE80IOY8wnlADTGg5dslJyZvgcobgxJmEMhKaDSs2nrwPgKoi-nzDwDXWmCmJIHLp9Ci74oMThHJ-tVFkQWzGWuf9c-ZCv7XWT9Id0pz_U1PajsKxZm-q32Iq_8M1Ajk9ldXgxBhNOXQX8rP-GcJFdhLv00-fDVF0WkXrhrb8oGNTMujCGXaCiosXFOZyHcikC-eZfTvEKxdLHPwyn8NTFKhzcUZBS2Z57atqI92Mo5hZjx2d1ZYDw"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full object-cover ring-2 ring-surface-container-lowest"
                  alt="Peserta 2"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN_c86ad3iniuS7SXYhEg5vk_eTNdPP9fYMZF4FcMcijoKdGAfZDjJuqpWHO5p0ccR3B2hgmLcUFeD3RIN904mbY_fvLV70nqFesm2NM-m11hilDa_l19JvHPcS-vptF8VBmN6apGxdOP92t-lZt5wNORVkXmjgoubTeWaR9DtEmTy7ETQ7vaKFOswN6xKthgXzB5_0siYDQ1_JPXJhpmS20B5RC8fz-FL_aZ25T-TpeM41E6v_Hz45A"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full object-cover ring-2 ring-surface-container-lowest"
                  alt="Peserta 3"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTSxTKuYh9-amdONwpzYy0BsbwDtJmteLG8KwP2Fjet1zGuy4GljOmRt8RVBfDiccOggvys0lH5jUSE5-PMVel1yCFdyxyVc8OAgiZXrYdCmizE4FBEOUxUw8TkyAHHmeNyIrHkLJmZz7FkcjJtcvCmAYXu0JDO6-Jc8JJQR5GZrWzJ1w4GGaxOP7HqMLLTotn7P2VQ5Hn4aqSQh2TmGA_FkkowqHrl4NIZ3MyvklapoOEDRN7Mhq9lQ"
                />
                <div className="h-7 w-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center text-label-sm font-bold ring-2 ring-surface-container-lowest">
                  +5
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenSimaksi}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-label-md font-semibold hover:bg-primary-container transition-colors shadow-sm flex items-center gap-1 active:scale-95"
              >
                <span>Buka E-Simaksi</span>
                <span className="material-symbols-outlined text-[16px]">qr_code</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TIPS & EDUKASI SINGKAT (Leave No Trace) */}
      <section className="space-y-2 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[20px]">school</span>
            <h2 className="text-headline-sm text-primary font-bold">Edukasi Rimba</h2>
          </div>
          <button
            type="button"
            onClick={onOpenArticle}
            className="text-label-md text-secondary hover:underline font-semibold"
          >
            Semua Tips
          </button>
        </div>

        {/* Educational Card */}
        <div
          onClick={onOpenArticle}
          className="rounded-2xl bg-surface-container-low p-4 shadow-[0_2px_12px_rgba(27,67,50,0.04)] flex items-center gap-4 relative overflow-hidden cursor-pointer hover:bg-surface-container transition-all active:scale-[0.99]"
        >
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed text-label-sm font-bold mb-1.5">
              <span className="material-symbols-outlined text-[12px]">lightbulb</span> Wajib Paham
            </div>
            <h3 className="text-headline-sm text-primary leading-tight font-bold">
              Etika Leave No Trace: 7 Prinsip Wajib Pendaki Gen-Z
            </h3>
            <p className="text-body-sm text-on-surface-variant mt-1 line-clamp-2">
              Jangan tinggalkan apapun selain jejak kaki, jangan ambil apapun selain foto estetik.
            </p>
            <div className="mt-2.5 flex items-center gap-2">
              <span className="text-label-sm text-secondary font-bold flex items-center gap-0.5">
                Baca 3 Menit <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </span>
            </div>
          </div>
          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container shadow-sm">
            <img
              className="w-full h-full object-cover"
              alt="Leave No Trace Illustration"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD61Tw30c4_-FHf_ij4ztt0FD-PKnSaK_WEUmj8eyiMsxzqWVdLArnVaYJw-ElTeWVzuQp1oiXvQtZpPUSiqMbCezeZ2K80d8cUM4-YjWZNFkqN7X-wKyOUG8T-tJSww7g1iVbVpWnRGbJh1vHPBbAPJEH68HyzEhWhZxAF-jSfKKo6oKqLUd7cwq-EzW6D0PXVyBrENunNbTcv52a2q5ma299PtevCNAcjnAFZgU6IWaueaYgEptxQOA"
            />
          </div>
        </div>
      </section>

      {/* REWARD TOAST MICRO-INTERACTION */}
      {showToast && (
        <div className="fixed bottom-24 inset-x-4 max-w-sm mx-auto bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 animate-bounce z-50">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              card_giftcard
            </span>
            <div className="min-w-0">
              <p className="text-label-md font-bold truncate">Voucher Sewa Siap Diklaim!</p>
              <p className="text-body-sm text-outline-variant truncate">
                Potongan Rp50.000 untuk carrier & tenda
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowToast(false);
              onChangeTab('pasar-alat');
            }}
            className="px-2.5 py-1 rounded-lg bg-secondary text-on-secondary text-label-sm font-semibold flex-shrink-0 hover:bg-secondary/90"
          >
            Gunakan
          </button>
        </div>
      )}
    </div>
  );
};
