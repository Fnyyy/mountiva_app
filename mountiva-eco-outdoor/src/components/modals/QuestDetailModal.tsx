import React from 'react';

interface QuestDetailModalProps {
  onClose: () => void;
  onNavigateToCheckpoint: () => void;
}

export const QuestDetailModal: React.FC<QuestDetailModalProps> = ({
  onClose,
  onNavigateToCheckpoint,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[90vh]">
        {/* Banner */}
        <div className="relative h-40 w-full bg-primary shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxonRlbmZaHIvTE6LnNFHQP91IcPE_T1AUoAZxnjW6U1xUhxgcyCDffoQJs6Ms9PWwHvJxNLiwWY4_hG6YQOGVVk4M2WZuZ4oUR-A4ZGCFoGT-gMGsts-wCtYeZulrk_iYuLo7cYg6AY9jmGxyFVyHjNbptIVWlGbsTWUJGFJ0TDX7a4nQet8Z-L6x2Hg8obRNMhjkF2ik0jcdcFlUTpmQ0RCGBZvLi-vMVa1z9RMQUjLZsSGh44ThbQ"
            alt="Misi Clean-Up Rinjani"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
          >
            ✕
          </button>
          <div className="absolute bottom-3 left-4 right-4 text-on-primary">
            <span className="text-label-sm px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-bold uppercase inline-block mb-1">
              Tantangan Aktif
            </span>
            <h3 className="text-headline-sm font-bold leading-tight">
              Misi Clean-Up Rinjani 2025
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-body-sm">
          <div className="flex items-center justify-between p-3 bg-secondary-container/40 rounded-xl">
            <div>
              <span className="text-label-sm text-secondary font-bold uppercase block">
                Total Reward
              </span>
              <span className="text-headline-sm text-primary font-bold">+500 Eco-Points</span>
            </div>
            <div className="text-right">
              <span className="text-label-sm text-on-surface-variant block">Lencana</span>
              <span className="text-label-md font-bold text-secondary">Badge Segara Anak</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h4 className="text-label-sm uppercase font-bold text-primary tracking-wider">
              Syarat & Ketentuan Misi:
            </h4>
            <ul className="space-y-2 text-body-sm text-on-surface-variant">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>
                  Bawa turun minimal <strong>3.0 kg</strong> sampah anorganik (botol plastik, kaleng gas portabel, kemasan multilayer).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>
                  Lakukan timbang resmi di <strong>Pos 3 Sembalun</strong> atau <strong>Shelter Basecamp Senaru</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>
                  Petugas Ranger akan menempelkan label QR verifikasi untuk mengklaim poin reward langsung ke profilmu.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container flex gap-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              onNavigateToCheckpoint();
            }}
            className="flex-1 py-3 bg-primary hover:bg-primary-container text-on-primary font-bold text-label-lg rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
            <span>Buka Scanner Checkpoint</span>
          </button>
        </div>
      </div>
    </div>
  );
};
