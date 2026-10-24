import React, { useState } from 'react';
import { formatIDR } from '../../utils/ecoTracker';

interface TukarPoinModalProps {
  userPoints: number;
  onRedeem: (pointsCost: number, itemTitle: string) => boolean;
  onClose: () => void;
}

interface RewardReward {
  id: string;
  title: string;
  pointsCost: number;
  category: string;
  icon: string;
  description: string;
}

const REWARDS: RewardReward[] = [
  {
    id: 'r1',
    title: 'Voucher Sewa Tenda Rp50.000',
    pointsCost: 500,
    category: 'Voucher Rental',
    icon: 'camping',
    description: 'Berlaku untuk rental tenda kapasitas 2-4 orang di pasar alat MounTiva.',
  },
  {
    id: 'r2',
    title: 'Potongan Rp100.000 Pre-Loved',
    pointsCost: 1000,
    category: 'Voucher Belanja',
    icon: 'shopping_bag',
    description: 'Diskon langsung belanja gear pre-loved bergaransi escrow MounTiva.',
  },
  {
    id: 'r3',
    title: 'Pin Enamel Logam Rinjani Zero-Waste',
    pointsCost: 750,
    category: 'Merchandise Resmi',
    icon: 'military_tech',
    description: 'Merchandise eksklusif edisi terbatas dari Balai TN Gunung Rinjani.',
  },
  {
    id: 'r4',
    title: 'Adopsi 1 Bibit Pohon Pinus Konservasi',
    pointsCost: 250,
    category: 'Aksi Lingkungan',
    icon: 'potted_plant',
    description: 'Ditanam atas namamu di lereng hutan konservasi Gunung Prau.',
  },
];

export const TukarPoinModal: React.FC<TukarPoinModalProps> = ({
  userPoints,
  onRedeem,
  onClose,
}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleClaim = (reward: RewardReward) => {
    if (userPoints < reward.pointsCost) {
      alert(`Poin tidak cukup! Butuh ${reward.pointsCost} Pts, kamu punya ${userPoints} Pts.`);
      return;
    }

    const success = onRedeem(reward.pointsCost, reward.title);
    if (success) {
      setSuccessMessage(`Berhasil menukarkan "${reward.title}"! Kode voucher telah disimpan.`);
      setTimeout(() => setSuccessMessage(null), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <div>
              <h3 className="text-headline-sm font-bold leading-tight">Tukar Eco-Points</h3>
              <p className="text-label-sm text-secondary-fixed">
                Saldo: {userPoints.toLocaleString('id-ID')} Pts
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface/10 hover:bg-surface/20 flex items-center justify-center text-on-primary"
          >
            ✕
          </button>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mx-4 mt-3 bg-secondary-container text-on-secondary-container p-2.5 rounded-xl text-label-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Catalog List */}
        <div className="p-4 overflow-y-auto space-y-3">
          {REWARDS.map((reward) => {
            const canAfford = userPoints >= reward.pointsCost;
            return (
              <div
                key={reward.id}
                className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-2 border border-outline-variant/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
                      <span className="material-symbols-outlined text-[20px]">{reward.icon}</span>
                    </div>
                    <div>
                      <span className="text-label-sm uppercase font-bold text-secondary">
                        {reward.category}
                      </span>
                      <h4 className="text-body-md font-bold text-primary leading-tight">
                        {reward.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-label-md font-bold text-tertiary-container bg-tertiary-fixed/60 px-2 py-0.5 rounded-full shrink-0">
                    {reward.pointsCost} Pts
                  </span>
                </div>

                <p className="text-body-sm text-on-surface-variant leading-snug">
                  {reward.description}
                </p>

                <button
                  type="button"
                  onClick={() => handleClaim(reward)}
                  disabled={!canAfford}
                  className={`w-full py-2 rounded-lg text-label-md font-bold shadow-sm transition-all ${
                    canAfford
                      ? 'bg-secondary hover:bg-primary text-on-secondary active:scale-95'
                      : 'bg-surface-container text-outline cursor-not-allowed'
                  }`}
                >
                  {canAfford ? 'Tukar Sekarang' : 'Poin Belum Cukup'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container border-t border-outline-variant/30 text-center">
          <p className="text-label-sm text-on-surface-variant">
            Poin diperoleh otomatis setiap kali kamu menimbang sampah di Checkpoint resmi.
          </p>
        </div>
      </div>
    </div>
  );
};
