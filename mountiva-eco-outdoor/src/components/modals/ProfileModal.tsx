import React from 'react';
import { UserProfile } from '../../types';

interface ProfileModalProps {
  user: UserProfile;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[90vh]">
        {/* Cover & Avatar */}
        <div className="bg-primary p-5 text-on-primary text-center relative flex flex-col items-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-on-primary"
          >
            ✕
          </button>

          <div className="w-20 h-20 rounded-full p-1 ring-4 ring-secondary-fixed/50 bg-surface-container mb-2 shadow-lg">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          <h3 className="text-headline-sm font-bold">{user.name}</h3>
          <span className="text-label-md px-3 py-0.5 rounded-full bg-secondary text-on-secondary font-bold mt-1">
            {user.badge} • {user.level}
          </span>
          <p className="text-body-sm text-secondary-fixed mt-1">
            ID Anggota: MOUNTIVA-ID-8921 • Terdaftar 2024
          </p>
        </div>

        {/* Stats Grid */}
        <div className="p-4 overflow-y-auto space-y-4 text-body-sm">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-surface-container rounded-xl">
              <span className="text-label-sm text-on-surface-variant block">Total Sampah</span>
              <span className="text-headline-sm font-bold text-primary">
                {user.totalWasteKg.toFixed(1)}
              </span>
              <span className="text-label-sm text-outline block">kg</span>
            </div>
            <div className="p-2.5 bg-surface-container rounded-xl">
              <span className="text-label-sm text-on-surface-variant block">CO2e Hemat</span>
              <span className="text-headline-sm font-bold text-secondary">
                {user.co2eAvoidedKg}
              </span>
              <span className="text-label-sm text-outline block">kg</span>
            </div>
            <div className="p-2.5 bg-surface-container rounded-xl">
              <span className="text-label-sm text-on-surface-variant block">Saldo Poin</span>
              <span className="text-headline-sm font-bold text-tertiary-fixed-dim">
                {user.points}
              </span>
              <span className="text-label-sm text-outline block">Pts</span>
            </div>
          </div>

          {/* Badges Collection */}
          <div className="space-y-2">
            <span className="text-label-sm font-bold uppercase text-primary tracking-wider block">
              Koleksi Badge Konservasi
            </span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 rounded-xl bg-surface-container-low flex flex-col items-center gap-1 border border-secondary/30">
                <span
                  className="material-symbols-outlined text-[28px] text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield
                </span>
                <span className="text-label-sm font-bold text-primary">Ranger Hijau</span>
                <span className="text-[10px] text-outline">Level 4</span>
              </div>
              <div className="p-2 rounded-xl bg-surface-container-low flex flex-col items-center gap-1 border border-tertiary-fixed-dim/40">
                <span
                  className="material-symbols-outlined text-[28px] text-tertiary-fixed-dim"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  military_tech
                </span>
                <span className="text-label-sm font-bold text-primary">Zero Waste</span>
                <span className="text-[10px] text-outline">TNGR 2025</span>
              </div>
              <div className="p-2 rounded-xl bg-surface-container-low flex flex-col items-center gap-1 border border-outline-variant/40">
                <span
                  className="material-symbols-outlined text-[28px] text-outline"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  landscape
                </span>
                <span className="text-label-sm font-bold text-outline">Segara Anak</span>
                <span className="text-[10px] text-outline">In Progress</span>
              </div>
            </div>
          </div>

          {/* Environmental Mission Pledge */}
          <div className="bg-secondary-container/40 p-3 rounded-xl flex items-start gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">
              eco
            </span>
            <div className="flex flex-col">
              <span className="text-label-sm font-bold text-secondary">
                Komitmen Pendaki Lestari
              </span>
              <p className="text-body-sm text-on-secondary-container leading-snug">
                "Saya berjanji menjaga kesucian mata air pegunungan, tidak merusak flora endemik, dan
                selalu membawa turun sampah melebihi apa yang saya bawa."
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-label-md active:scale-95 transition-all"
          >
            Tutup Profil
          </button>
        </div>
      </div>
    </div>
  );
};
