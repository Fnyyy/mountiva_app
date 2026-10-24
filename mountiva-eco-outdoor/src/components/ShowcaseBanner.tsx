import React, { useState } from 'react';
import { TabType } from '../types';

interface ShowcaseBannerProps {
  onNavigateTab: (tab: TabType) => void;
  onOpenShare: () => void;
}

export const ShowcaseBanner: React.FC<ShowcaseBannerProps> = ({
  onNavigateTab,
  onOpenShare,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Panduan Portofolio"
      className="bg-primary text-on-primary border-b border-secondary/30 px-4 py-2.5 shadow-sm text-xs relative z-30 animate-fadeIn"
    >
      <div className="max-w-md mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-secondary-fixed">
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>Mode Showcase Portofolio</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenShare}
              className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px] hover:bg-secondary-fixed-dim transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[12px]">link</span>
              <span>Bagikan Link</span>
            </button>
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              aria-label="Tutup Banner Showcase"
              className="text-on-primary/70 hover:text-on-primary text-sm px-1"
            >
              ✕
            </button>
          </div>
        </div>

        <p className="text-[11px] text-on-primary-container leading-snug">
          Coba fitur interaktif: timbang sampah di pos, sewa perlengkapan, dan cetak izin simaksi digital:
        </p>

        {/* Quick Tour Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => onNavigateTab('checkpoint')}
            className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-on-primary font-medium text-[10px] whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[12px]">qr_code_scanner</span>
            <span>Timbang Sampah</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('pasar-alat')}
            className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-on-primary font-medium text-[10px] whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[12px]">shopping_bag</span>
            <span>Pasar Alat Escrow</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateTab('gunung-trip')}
            className="px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 text-on-primary font-medium text-[10px] whitespace-nowrap transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[12px]">landscape</span>
            <span>Katalog Gunung & Kuota</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
