import React from 'react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenPointsModal: () => void;
  onOpenShare: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onOpenNotifications,
  onOpenProfile,
  onOpenPointsModal,
  onOpenShare,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(27,67,50,0.06)] pt-safe">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 cursor-pointer select-none">
          <img
            alt="MounTiva Logo"
            className="h-9 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105"
            src="/logo.png"
            onError={(e) => {
              // Graceful fallback if needed
              const target = e.currentTarget;
              target.src = '/logo-full.png';
            }}
          />
          <div className="flex flex-col">
            <span className="text-headline-sm text-primary tracking-tight leading-none font-bold">
              MounTiva
            </span>
            <span className="text-label-sm text-secondary font-bold tracking-wider uppercase">
              Eco-Outdoor
            </span>
          </div>
        </div>

        {/* Right Action Icons & Badges */}
        <div className="flex items-center gap-2">
          {/* Points Pill */}
          <button
            type="button"
            onClick={onOpenPointsModal}
            className="flex items-center gap-1.5 bg-secondary-container/60 hover:bg-secondary-container px-2.5 py-1 rounded-full shadow-[0_2px_6px_rgba(27,67,50,0.06)] active:scale-95 transition-all"
            aria-label={`Eco-Points balance: ${user.points.toLocaleString('id-ID')} Pts`}
          >
            <span className="material-symbols-outlined text-secondary text-[17px]">eco</span>
            <span className="text-label-md text-on-secondary-container font-bold">
              {user.points.toLocaleString('id-ID')} Pts
            </span>
          </button>

          {/* Share Portfolio Button */}
          <button
            type="button"
            onClick={onOpenShare}
            aria-label="Bagikan Portofolio"
            title="Bagikan Portofolio"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-secondary-container/50 hover:bg-secondary-container text-secondary transition-colors active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>

          {/* Notification Bell */}
          <button
            type="button"
            onClick={onOpenNotifications}
            aria-label="Notifikasi"
            className="relative flex items-center justify-center w-9 h-9 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-tertiary-fixed-dim rounded-full ring-2 ring-surface animate-pulse" />
          </button>

          {/* Profile Avatar */}
          <button
            type="button"
            onClick={onOpenProfile}
            aria-label="Profil Petualang"
            className="flex items-center justify-center active:scale-95 transition-transform"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-secondary/40 shadow-sm"
              src={user.avatar}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
