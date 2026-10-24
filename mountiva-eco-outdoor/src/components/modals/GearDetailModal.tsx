import React, { useState } from 'react';
import { GearItem, formatIDR } from '../../utils/ecoTracker';

interface GearDetailModalProps {
  item: GearItem | null;
  onClose: () => void;
  onConfirmOrder: (item: GearItem) => void;
}

export const GearDetailModal: React.FC<GearDetailModalProps> = ({
  item,
  onClose,
  onConfirmOrder,
}) => {
  const [ordered, setOrdered] = useState(false);
  const [rentalDays, setRentalDays] = useState(2);

  if (!item) return null;

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => {
      onConfirmOrder(item);
      onClose();
    }, 1200);
  };

  const totalPrice =
    item.category === 'rental' ? item.price * rentalDays : item.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[92vh]">
        {/* Gear Photo */}
        <div className="relative h-48 w-full bg-surface-container shrink-0">
          <img alt={item.name} src={item.image} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70"
          >
            ✕
          </button>
          <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
            <span
              className={`px-2.5 py-0.5 rounded-md text-label-sm font-bold ${
                item.category === 'rental'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-secondary text-on-secondary'
              }`}
            >
              {item.category === 'rental' ? 'Rental Harian' : 'Beli Pre-Loved'}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-white/90 text-primary font-bold text-label-sm">
              {item.gradeLabel}
            </span>
          </div>
        </div>

        {/* Details Content */}
        <div className="p-4 overflow-y-auto space-y-3.5 text-body-sm">
          <div>
            <div className="flex items-center gap-1 text-on-surface-variant text-label-sm mb-1">
              <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
              <span>Shelter MounTiva {item.location}</span>
            </div>
            <h3 className="text-headline-sm font-bold text-primary leading-snug">{item.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-headline-sm text-secondary font-bold">
                {formatIDR(item.price)}
              </span>
              {item.priceUnit && (
                <span className="text-body-sm text-outline">{item.priceUnit}</span>
              )}
            </div>
          </div>

          <p className="text-body-sm text-on-surface-variant leading-relaxed">
            {item.description || 'Peralatan terawat prima siap menemani ekspedisi alam bebasmu.'}
          </p>

          {/* Rental Duration Counter */}
          {item.category === 'rental' && (
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
              <span className="font-semibold text-primary">Durasi Sewa:</span>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                  className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary"
                >
                  -
                </button>
                <span className="text-label-lg font-bold">{rentalDays} Hari</span>
                <button
                  type="button"
                  onClick={() => setRentalDays(rentalDays + 1)}
                  className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center font-bold text-primary"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Escrow Guarantee Highlight */}
          <div className="p-3 bg-secondary-container/40 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 text-secondary font-bold text-label-sm">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Perlindungan Escrow & QC Higienis</span>
            </div>
            <p className="text-body-sm text-on-secondary-container leading-snug">
              Dana Anda ditahan aman di escrow MounTiva. Anda memiliki waktu 24 jam untuk mengecek
              kondisi fisik alat setelah serah terima sebelum dana diteruskan ke pemilik.
            </p>
          </div>
        </div>

        {/* Footer Order Button */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-label-sm text-on-surface-variant">Total Biaya</span>
            <span className="text-headline-sm font-bold text-primary">{formatIDR(totalPrice)}</span>
          </div>
          <button
            type="button"
            onClick={handleOrder}
            disabled={ordered}
            className="flex-1 py-3 rounded-xl bg-secondary hover:bg-primary text-on-secondary font-bold text-label-lg shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            {ordered ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                <span>Memproses Pesanan...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
                <span>{item.category === 'rental' ? 'Sewa Sekarang' : 'Beli Sekarang'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
