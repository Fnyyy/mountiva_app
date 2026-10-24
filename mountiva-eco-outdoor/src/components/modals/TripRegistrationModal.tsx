import React, { useState } from 'react';

interface TripRegistrationModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const TripRegistrationModal: React.FC<TripRegistrationModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('Rian Ardiansyah');
  const [emergencyPhone, setEmergencyPhone] = useState('0812-9876-5432');
  const [pledge, setPledge] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledge) {
      alert('Anda wajib menyetujui ikrar pendakian zero-waste.');
      return;
    }
    setSubmitted(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]">
              how_to_reg
            </span>
            <div>
              <h3 className="text-headline-sm font-bold leading-tight">Daftar Ekspedisi Bersih</h3>
              <p className="text-label-sm text-secondary-fixed">Clean-Up Segara Anak 2026</p>
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

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto space-y-3.5 text-body-sm">
          <div className="p-3 bg-secondary-container/40 rounded-xl space-y-1">
            <span className="text-label-sm font-bold text-secondary uppercase block">
              Reward Konservasi
            </span>
            <p className="text-body-sm text-on-secondary-container">
              Peserta yang menyelesaikan trip & mengumpulkan sampah minimal 3 kg berhak atas{' '}
              <strong className="text-primary font-bold">+1.000 Eco-Points</strong> & Badge Fisik
              Rinjani Ranger.
            </p>
          </div>

          <div>
            <label className="text-label-sm font-bold uppercase text-on-surface-variant block mb-1">
              Nama Pendaki
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface font-semibold focus:outline-none focus:border-secondary"
            />
          </div>

          <div>
            <label className="text-label-sm font-bold uppercase text-on-surface-variant block mb-1">
              Kontak Darurat (Keluarga / Kerabat)
            </label>
            <input
              type="text"
              required
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full h-11 px-3 bg-surface-container-low border border-outline-variant rounded-xl text-on-surface font-medium focus:outline-none focus:border-secondary"
            />
          </div>

          {/* Commitment Checkbox */}
          <div className="bg-surface-container-low p-3 rounded-xl flex items-start gap-2.5">
            <input
              type="checkbox"
              id="pledge"
              checked={pledge}
              onChange={(e) => setPledge(e.target.checked)}
              className="mt-1 rounded text-secondary focus:ring-secondary"
            />
            <label htmlFor="pledge" className="text-body-sm text-on-surface-variant leading-snug">
              Saya berkomitmen mengikuti SOP konservasi TNGR, tidak menggunakan sabun/shampoo sintetis
              di Danau Segara Anak, dan membawa turun seluruh sampah grup.
            </label>
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="w-full h-12 rounded-xl bg-secondary hover:bg-primary text-on-secondary font-bold text-label-lg shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {submitted ? (
              <>
                <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                <span>Mendaftarkan Kursi Ekspedisi...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>Konfirmasi Pendaftaran (Slot 4/10)</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
