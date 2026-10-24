/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, UserProfile, CheckpointHistoryItem, MountainData } from './types';
import { GearItem } from './utils/ecoTracker';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { BerandaScreen } from './components/screens/BerandaScreen';
import { CheckpointScreen } from './components/screens/CheckpointScreen';
import { PasarAlatScreen } from './components/screens/PasarAlatScreen';
import { GunungTripScreen } from './components/screens/GunungTripScreen';

// Modals
import { SimaksiModal } from './components/modals/SimaksiModal';
import { TukarPoinModal } from './components/modals/TukarPoinModal';
import { ArticleModal } from './components/modals/ArticleModal';
import { PasangIklanModal } from './components/modals/PasangIklanModal';
import { GearDetailModal } from './components/modals/GearDetailModal';
import { MountainDetailModal } from './components/modals/MountainDetailModal';
import { TripRegistrationModal } from './components/modals/TripRegistrationModal';
import { CommunityFinderModal } from './components/modals/CommunityFinderModal';
import { NotificationsModal } from './components/modals/NotificationsModal';
import { ProfileModal } from './components/modals/ProfileModal';
import { QuestDetailModal } from './components/modals/QuestDetailModal';
import { ShareModal } from './components/modals/ShareModal';
import { ShowcaseBanner } from './components/ShowcaseBanner';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('beranda');

  // User State
  const [user, setUser] = useState<UserProfile>({
    name: 'Rian',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfzVrCHDxErXU2ed2sCiavdJ1XDJu9xDS1QrvBZYrxVwrOOL9sa-owGMvoLBKq3Ps0ijgrTrLcU_ZDWAbBdRDaGGOxJsNe8AZci9zWTdvZBYRpN6JOdZKebdqEJktUhNmR-M8gWSIRDqzRv16-_bdnyBR68CJGYz1z8_r1KM1WALQcY-bVR0XeD506S1JIVhdZk3sC_Kcj1tvgCAFiqyVnEqScGzNv_DZZ084pwWN3HdxZhlgdIOn5iw',
    badge: 'Ranger Hijau',
    level: 'Lv. 4',
    points: 2450,
    totalWasteKg: 14.8,
    targetWasteKg: 20.0,
    co2eAvoidedKg: 32.4,
    caloriesBurnedKcal: 4820,
  });

  // Checkpoint History
  const [historyList, setHistoryList] = useState<CheckpointHistoryItem[]>([
    {
      id: 'h1',
      location: 'Basecamp Sembalun',
      details: '2.5 kg diverifikasi TNGR',
      points: 250,
      date: '12 Okt 2026',
    },
    {
      id: 'h2',
      location: 'Pos 2 Kandang Badak',
      details: '1.2 kg terverifikasi Gede Pangrango',
      points: 120,
      date: '28 Sep 2026',
    },
  ]);

  // Modals state
  const [isSimaksiOpen, setIsSimaksiOpen] = useState(false);
  const [isTukarPoinOpen, setIsTukarPoinOpen] = useState(false);
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  const [isPasangIklanOpen, setIsPasangIklanOpen] = useState(false);
  const [selectedGear, setSelectedGear] = useState<GearItem | null>(null);
  const [selectedMountain, setSelectedMountain] = useState<MountainData | null>(null);
  const [isTripRegOpen, setIsTripRegOpen] = useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQuestDetailOpen, setIsQuestDetailOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [deviceFrameMode, setDeviceFrameMode] = useState(false);

  // Direct Public Shareable Link for Portfolio
  const publicShareUrl =
    typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
      ? window.location.origin
      : 'https://ais-pre-re5sz3plwi6jlsgxhrpow7-168550712487.asia-southeast1.run.app';

  // Global Points Toast
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => {
      setToastNotification(null);
    }, 4000);
  };

  // Handlers
  const handleAwardCheckpointPoints = (points: number, weightKg: number) => {
    setUser((prev) => ({
      ...prev,
      points: prev.points + points,
      totalWasteKg: Number((prev.totalWasteKg + weightKg).toFixed(1)),
      co2eAvoidedKg: Number((prev.co2eAvoidedKg + weightKg * 2.2).toFixed(1)),
      caloriesBurnedKcal: prev.caloriesBurnedKcal + 350,
    }));

    const newHistoryItem: CheckpointHistoryItem = {
      id: `h-${Date.now()}`,
      location: 'Pos 3 Sembalun',
      details: `${weightKg.toFixed(1)} kg diverifikasi TNGR`,
      points: points,
      date: 'Hari Ini',
    };
    setHistoryList((prev) => [newHistoryItem, ...prev]);

    showNotification(`Selamat! +${points} Eco-Points & ${weightKg} kg sampah tercatat.`);
  };

  const handleAwardBonusPoints = (points: number, reason: string) => {
    setUser((prev) => ({
      ...prev,
      points: prev.points + points,
    }));
    showNotification(`+${points} Eco-Points: ${reason}!`);
  };

  const handleRedeemPoints = (pointsCost: number, itemTitle: string): boolean => {
    if (user.points < pointsCost) return false;
    setUser((prev) => ({
      ...prev,
      points: prev.points - pointsCost,
    }));
    showNotification(`Penukaran berhasil: "${itemTitle}" (-${pointsCost} Pts)`);
    return true;
  };

  const handleConfirmGearOrder = (item: GearItem) => {
    showNotification(
      `Pesanan ${item.name} berhasil diajukan dengan proteksi Escrow MounTiva!`
    );
  };

  const handleConfirmTripRegistration = () => {
    setUser((prev) => ({
      ...prev,
      points: prev.points + 100, // booking bonus
    }));
    showNotification(
      'Pendaftaran Clean-Up Segara Anak berhasil! Tiket E-Simaksi otomatis diterbitkan.'
    );
  };

  return (
    <div className="bg-surface font-body-md text-on-surface flex flex-col min-h-screen">
      {/* Desktop Showcase Bar (Only on large screens) */}
      <div className="hidden md:flex items-center justify-between px-6 py-2 bg-primary text-on-primary text-xs border-b border-secondary/30 z-50">
        <div className="flex items-center gap-2">
          <span className="font-bold text-secondary-fixed flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">eco</span>
            MounTiva Eco-Outdoor
          </span>
          <span className="text-secondary-fixed/50">•</span>
          <span className="text-on-primary-container">Portofolio Showcase</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDeviceFrameMode(!deviceFrameMode)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 font-semibold transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">
              {deviceFrameMode ? 'fullscreen' : 'smartphone'}
            </span>
            <span>{deviceFrameMode ? 'Tampilan Responsif' : 'Mode Mockup HP'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold hover:bg-secondary-fixed-dim transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[15px]">share</span>
            <span>Bagikan Link Portofolio</span>
          </button>
        </div>
      </div>

      {/* Main Responsive Shell / Optional Mockup Frame */}
      <div
        className={`flex-1 flex flex-col transition-all relative ${
          deviceFrameMode
            ? 'md:max-w-[420px] md:mx-auto md:my-6 md:rounded-[44px] md:shadow-2xl md:border-[10px] md:border-slate-900 md:overflow-hidden md:ring-1 md:ring-slate-800 bg-surface'
            : 'w-full'
        }`}
      >
        {/* Fixed Top Header */}
        <Header
          user={user}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenPointsModal={() => setIsTukarPoinOpen(true)}
          onOpenShare={() => setIsShareModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen max-w-md mx-auto">
          {/* Showcase Banner for Portofolio Reviewers */}
          <ShowcaseBanner
            onNavigateTab={(t) => setActiveTab(t)}
            onOpenShare={() => setIsShareModalOpen(true)}
          />

          {activeTab === 'beranda' && (
            <BerandaScreen
              user={user}
              onChangeTab={(t) => setActiveTab(t)}
              onOpenSimaksi={() => setIsSimaksiOpen(true)}
              onOpenArticle={() => setIsArticleOpen(true)}
              onOpenQuestDetail={() => setIsQuestDetailOpen(true)}
              onOpenTukarPoin={() => setIsTukarPoinOpen(true)}
            />
          )}

          {activeTab === 'checkpoint' && (
            <CheckpointScreen
              onAwardPoints={handleAwardCheckpointPoints}
              historyList={historyList}
            />
          )}

          {activeTab === 'pasar-alat' && (
            <PasarAlatScreen
              onAwardPoints={handleAwardBonusPoints}
              onSelectGear={(item) => setSelectedGear(item)}
              onOpenPasangIklan={() => setIsPasangIklanOpen(true)}
            />
          )}

          {activeTab === 'gunung-trip' && (
            <GunungTripScreen
              onSelectMountain={(mountain) => setSelectedMountain(mountain)}
              onOpenTripRegistration={() => setIsTripRegOpen(true)}
              onOpenCommunityFinder={() => setIsCommunityOpen(true)}
            />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav activeTab={activeTab} onChangeTab={(tab) => setActiveTab(tab)} />
      </div>

      {/* Global Notification Toast */}
      {toastNotification && (
        <div className="fixed top-20 inset-x-4 max-w-sm mx-auto z-50 bg-primary text-on-primary px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-fadeIn border border-secondary/40">
          <span
            className="material-symbols-outlined text-secondary-fixed text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            eco
          </span>
          <p className="text-body-sm font-semibold flex-1 leading-snug">{toastNotification}</p>
          <button
            type="button"
            onClick={() => setToastNotification(null)}
            className="text-on-primary/70 hover:text-on-primary text-label-md"
          >
            ✕
          </button>
        </div>
      )}

      {/* Modals & Dialogs */}
      {isShareModalOpen && (
        <ShareModal shareUrl={publicShareUrl} onClose={() => setIsShareModalOpen(false)} />
      )}

      {isSimaksiOpen && <SimaksiModal onClose={() => setIsSimaksiOpen(false)} />}

      {isTukarPoinOpen && (
        <TukarPoinModal
          userPoints={user.points}
          onRedeem={handleRedeemPoints}
          onClose={() => setIsTukarPoinOpen(false)}
        />
      )}

      {isArticleOpen && <ArticleModal onClose={() => setIsArticleOpen(false)} />}

      {isPasangIklanOpen && (
        <PasangIklanModal
          onClose={() => setIsPasangIklanOpen(false)}
          onSubmit={(title) => {
            handleAwardBonusPoints(100, `Pasang iklan "${title}"`);
          }}
        />
      )}

      {selectedGear && (
        <GearDetailModal
          item={selectedGear}
          onClose={() => setSelectedGear(null)}
          onConfirmOrder={handleConfirmGearOrder}
        />
      )}

      {selectedMountain && (
        <MountainDetailModal
          mountain={selectedMountain}
          onClose={() => setSelectedMountain(null)}
          onBookPermit={(m) => {
            setIsSimaksiOpen(true);
            showNotification(`Izin Simaksi untuk ${m.name} berhasil disiapkan!`);
          }}
        />
      )}

      {isTripRegOpen && (
        <TripRegistrationModal
          onClose={() => setIsTripRegOpen(false)}
          onSuccess={handleConfirmTripRegistration}
        />
      )}

      {isCommunityOpen && <CommunityFinderModal onClose={() => setIsCommunityOpen(false)} />}

      {isNotificationsOpen && (
        <NotificationsModal onClose={() => setIsNotificationsOpen(false)} />
      )}

      {isProfileOpen && <ProfileModal user={user} onClose={() => setIsProfileOpen(false)} />}

      {isQuestDetailOpen && (
        <QuestDetailModal
          onClose={() => setIsQuestDetailOpen(false)}
          onNavigateToCheckpoint={() => {
            setIsQuestDetailOpen(false);
            setActiveTab('checkpoint');
          }}
        />
      )}
    </div>
  );
}
