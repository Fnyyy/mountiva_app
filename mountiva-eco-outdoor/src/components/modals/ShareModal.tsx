import React, { useState } from 'react';

interface ShareModalProps {
  shareUrl: string;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ shareUrl, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'MounTiva Eco-Outdoor Portfolio App',
          text: 'Lihat aplikasi MounTiva Eco-Outdoor: Aplikasi pendakian lestari, validasi checkpoint sampah SOP Taman Nasional, dan pasar sirkular.',
          url: shareUrl,
        });
      } catch {
        // User cancelled or share not permitted
      }
    } else {
      handleCopy();
    }
  };

  const shareText = encodeURIComponent(
    `Hai! Cek aplikasi portfolio "MounTiva Eco-Outdoor" yang saya buat untuk pendakian lestari dan validasi sampah TNGR:\n${shareUrl}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  // QR Code URL via public QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    shareUrl
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed text-[24px]">share</span>
            <div>
              <h3 className="text-headline-sm font-bold leading-tight">Bagikan Portofolio</h3>
              <p className="text-label-sm text-secondary-fixed">Tautan Publik Siap Dibagikan</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Dialog Bagikan"
            className="w-8 h-8 rounded-full bg-surface/10 hover:bg-surface/20 flex items-center justify-center text-on-primary"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-body-sm">
          {/* QR Code Container */}
          <div className="bg-surface-container-low p-4 rounded-xl flex flex-col items-center gap-2 text-center border border-outline-variant/30">
            <span className="text-label-sm uppercase tracking-wider text-secondary font-bold">
              Scan Kamera HP Teman
            </span>
            <div className="p-2.5 bg-white rounded-xl shadow-inner border border-outline-variant/40">
              <img
                src={qrCodeUrl}
                alt="QR Code Tautan Portofolio"
                className="w-36 h-36 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <p className="text-body-sm text-on-surface-variant leading-snug max-w-[240px]">
              Arahkan kamera smartphone ke QR Code ini untuk membuka aplikasi secara instan.
            </p>
          </div>

          {/* Copy Link Input Bar */}
          <div className="space-y-1.5">
            <label className="text-label-sm font-bold uppercase text-primary block">
              Tautan Langsung (Direct Link)
            </label>
            <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/40">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent text-body-sm text-on-surface px-2 outline-none truncate font-mono text-[11px]"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`px-3 py-2 rounded-lg text-label-sm font-bold transition-all flex items-center gap-1 shrink-0 ${
                  copied
                    ? 'bg-secondary-fixed text-on-secondary-fixed shadow-sm'
                    : 'bg-primary hover:bg-primary-container text-on-primary shadow-sm'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Tersalin!' : 'Salin Link'}</span>
              </button>
            </div>
          </div>

          {/* Share Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Kirim WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleNativeShare}
              className="py-2.5 px-3 rounded-xl bg-secondary hover:bg-primary text-on-secondary font-bold text-label-md flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">ios_share</span>
              <span>Bagikan Lainnya</span>
            </button>
          </div>

          {/* Portofolio Note */}
          <div className="bg-secondary-container/30 p-3 rounded-xl text-body-sm text-on-secondary-container leading-snug">
            💡 <strong>Tips Portofolio:</strong> Siapapun yang memiliki link ini dapat mencoba semua
            fitur secara interaktif (menimbang sampah di Checkpoint, membuka E-Simaksi, sewa alat
            sirkular, dsb) tanpa perlu login.
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-bold text-label-md transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
