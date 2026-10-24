import React, { useState } from 'react';

interface PasangIklanModalProps {
  onClose: () => void;
  onSubmit: (title: string) => void;
}

export const PasangIklanModal: React.FC<PasangIklanModalProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'rental' | 'preloved'>('rental');
  const [grade, setGrade] = useState('Grade A');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('Bandung');
  const [isSterileChecked, setIsSterileChecked] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) {
      alert('Mohon isi nama perlengkapan dan tarif.');
      return;
    }
    onSubmit(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]">
              add_circle
            </span>
            <div>
              <h3 className="text-headline-sm font-bold leading-tight">Sewakan / Jual Alatmu</h3>
              <p className="text-label-sm text-secondary-fixed">Dapatkan bonus +100 Eco-Points</p>
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3 text-body-sm">
          <div>
            <label className="text-label-sm uppercase font-bold text-on-surface-variant block mb-1">
              Nama Perlengkapan Outdoor
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Tenda Coleman Sundome 4P"
              className="w-full h-11 px-3 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:border-secondary font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-label-sm uppercase font-bold text-on-surface-variant block mb-1">
                Tipe Transaksi
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as 'rental' | 'preloved')}
                className="w-full h-11 px-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:border-secondary font-medium"
              >
                <option value="rental">Sewa (Rental Harian)</option>
                <option value="preloved">Jual Pre-Loved</option>
              </select>
            </div>

            <div>
              <label className="text-label-sm uppercase font-bold text-on-surface-variant block mb-1">
                Kondisi Fisik
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full h-11 px-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:border-secondary font-medium"
              >
                <option value="Grade A">Grade A (Like New)</option>
                <option value="Grade B+">Grade B+ (Normal)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-label-sm uppercase font-bold text-on-surface-variant block mb-1">
                Tarif (Rp)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="40000"
                className="w-full h-11 px-3 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:border-secondary font-bold"
              />
            </div>

            <div>
              <label className="text-label-sm uppercase font-bold text-on-surface-variant block mb-1">
                Kota Shelter
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full h-11 px-2.5 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface focus:outline-none focus:border-secondary font-medium"
              >
                <option value="Bandung">Bandung</option>
                <option value="Jakarta">Jakarta</option>
                <option value="Bogor">Bogor</option>
                <option value="Malang">Malang</option>
                <option value="Lombok">Lombok</option>
              </select>
            </div>
          </div>

          <div className="bg-secondary-container/40 p-3 rounded-xl flex items-start gap-2">
            <input
              type="checkbox"
              id="qc-check"
              checked={isSterileChecked}
              onChange={(e) => setIsSterileChecked(e.target.checked)}
              className="mt-1 rounded text-secondary focus:ring-secondary"
            />
            <label htmlFor="qc-check" className="text-body-sm text-on-secondary-container">
              Saya menjamin alat dalam keadaan bersih, layak pakai, dan bersedia mengikuti inspeksi QC
              higienis MounTiva Escrow.
            </label>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-label-lg shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[20px]">publish</span>
            <span>Tayangkan Iklan (+100 Pts)</span>
          </button>
        </form>
      </div>
    </div>
  );
};
