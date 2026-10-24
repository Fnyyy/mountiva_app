import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { id: 'beranda' as TabType, label: 'Beranda', icon: 'forest' },
    { id: 'checkpoint' as TabType, label: 'Checkpoint', icon: 'qr_code_scanner' },
    { id: 'pasar-alat' as TabType, label: 'Pasar Alat', icon: 'swap_driving_apps_wheel' },
    { id: 'gunung-trip' as TabType, label: 'Gunung & Trip', icon: 'landscape' },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(27,67,50,0.08)] border-t border-surface-container-high/60"
      aria-label="Navigasi Utama"
    >
      <div className="flex justify-around items-center h-16 px-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChangeTab(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 min-w-[68px] h-14 rounded-xl transition-all ${
                isActive
                  ? 'text-secondary font-bold scale-105'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span
                className="material-symbols-outlined text-[24px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : {}}
              >
                {tab.icon}
              </span>
              <span className="text-label-sm tracking-tight">{tab.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-secondary -mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
