import React from 'react';

interface SimaksiModalProps {
  onClose: () => void;
}

export const SimaksiModal: React.FC<SimaksiModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed text-[24px]">qr_code</span>
            <div>
              <h3 className="text-headline-sm font-bold leading-tight">E-SIMAKSI Digital</h3>
              <p className="text-label-sm text-secondary-fixed">Surat Izin Masuk Kawasan Konservasi</p>
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
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Barcode & Verification Pass */}
          <div className="bg-surface-container-low rounded-xl p-4 flex flex-col items-center gap-2 text-center border border-outline-variant/30">
            <span className="text-label-sm uppercase tracking-widest text-on-surface-variant font-bold">
              KODE VERIFIKASI RESMI TNGR
            </span>
            <div className="p-3 bg-white rounded-lg shadow-inner">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SIMAKSI-TNGR-PRAU-2026-8819-RIAN"
                alt="QR Code Simaksi"
                className="w-36 h-36 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="text-stat-counter font-mono font-bold tracking-widest text-primary">
              TNGR-2026-8819
            </span>
            <span className="text-label-sm px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
              STATUS: AKTIF & VALID
            </span>
          </div>

          {/* Permit Details */}
          <div className="space-y-2 text-body-sm">
            <div className="flex justify-between border-b border-surface-container py-1">
              <span className="text-on-surface-variant">Gunung & Jalur</span>
              <span className="font-bold text-primary">Gunung Prau via Patakbanteng</span>
            </div>
            <div className="flex justify-between border-b border-surface-container py-1">
              <span className="text-on-surface-variant">Tanggal Izin</span>
              <span className="font-bold text-primary">28 - 29 Oktober 2026</span>
            </div>
            <div className="flex justify-between border-b border-surface-container py-1">
              <span className="text-on-surface-variant">Ketua Rombongan</span>
              <span className="font-bold text-primary">Rian Ardiansyah</span>
            </div>
            <div className="flex justify-between border-b border-surface-container py-1">
              <span className="text-on-surface-variant">Guide APGI</span>
              <span className="font-bold text-secondary">Wahyu P. (No. Reg 4402)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-on-surface-variant">Jumlah Peserta</span>
              <span className="font-bold text-primary">8 Orang</span>
            </div>
          </div>

          {/* Mandatory Zero-Waste Equipment Check */}
          <div className="bg-secondary-container/40 p-3 rounded-xl space-y-1.5">
            <div className="flex items-center gap-1.5 text-secondary font-bold text-label-sm">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Ceklis Wajib Logistik Ramah Lingkungan</span>
            </div>
            <ul className="text-body-sm text-on-secondary-container space-y-1 pl-1">
              <li>✓ Trash bag berbarcode terdaftar (2 kantong)</li>
              <li>✓ Nesting & kompor gas aman (bukan kayu bakar)</li>
              <li>✓ Emergency blanket & P3K standar APGI</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-xl text-label-md active:scale-95 transition-all"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
