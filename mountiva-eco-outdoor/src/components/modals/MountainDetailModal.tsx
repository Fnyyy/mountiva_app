import React from 'react';
import { MountainData } from '../../types';

interface MountainDetailModalProps {
  mountain: MountainData | null;
  onClose: () => void;
  onBookPermit: (mountain: MountainData) => void;
}

export const MountainDetailModal: React.FC<MountainDetailModalProps> = ({
  mountain,
  onClose,
  onBookPermit,
}) => {
  if (!mountain) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[92vh]">
        {/* Cover Photo */}
        <div className="relative h-44 w-full bg-primary shrink-0">
          <img src={mountain.image} alt={mountain.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-black/30" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
          >
            ✕
          </button>
          <div className="absolute bottom-3 left-4 right-4 text-on-primary">
            <span className="text-label-sm bg-secondary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block mb-1">
              {mountain.category}
            </span>
            <h3 className="text-headline-md font-bold leading-tight">{mountain.name}</h3>
            <p className="text-body-sm text-secondary-fixed">{mountain.location}</p>
          </div>
        </div>

        {/* Content Specs */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-body-sm">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 bg-surface-container rounded-xl">
              <span className="text-label-sm text-on-surface-variant block">Elevasi</span>
              <span className="text-headline-sm font-bold text-primary">
                {mountain.elevation}
              </span>
              <span className="text-label-sm text-outline block">mdpl</span>
            </div>
            <div className="p-2.5 bg-surface-container rounded-xl">
              <span className="text-label-sm text-on-surface-variant block">Status</span>
              <span className="text-headline-sm font-bold text-secondary">Buka</span>
              <span className="text-label-sm text-outline block">Resmi</span>
            </div>
            <div className="p-2.5 bg-surface-container rounded-xl">
              <span className="text-label-sm text-on-surface-variant block">Kesulitan</span>
              <span className="text-label-md font-bold text-primary block mt-1">
                {mountain.difficulty}
              </span>
            </div>
          </div>

          {/* Jalur Resmi */}
          <div className="p-3 bg-surface-container-low rounded-xl space-y-1">
            <span className="text-label-sm font-bold uppercase text-secondary block">
              Jalur & Akses Basecamp
            </span>
            <p className="text-body-sm text-on-surface font-semibold">{mountain.routes}</p>
            <p className="text-body-sm text-on-surface-variant">
              Tersedia shelter resmi, sumber mata air terjaga di Pos 2 & Pos 3, dan registrasi simaksi
              digital MounTiva.
            </p>
          </div>

          {/* SOP Sampah Wajib */}
          <div className="p-3 bg-tertiary-fixed/40 rounded-xl space-y-1.5 border border-tertiary-fixed-dim/30">
            <div className="flex items-center gap-1.5 text-on-tertiary-fixed font-bold text-label-sm">
              <span className="material-symbols-outlined text-[18px]">recycling</span>
              <span>SOP Konservasi Zero Waste</span>
            </div>
            <p className="text-body-sm text-on-surface-variant leading-snug">
              {mountain.zeroWastePolicy}
            </p>
            <div className="text-label-sm text-primary font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
              Setiap sampah tertimbang bernilai reward Eco-Points!
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container flex gap-2">
          <button
            type="button"
            onClick={() => {
              onBookPermit(mountain);
              onClose();
            }}
            className="flex-1 py-3 bg-primary hover:bg-primary-container text-on-primary font-bold text-label-lg rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">confirmation_number</span>
            <span>Booking Kuota & E-Simaksi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
