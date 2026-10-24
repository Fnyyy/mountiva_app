import React, { useState } from 'react';

interface ArticleModalProps {
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ onClose }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[92vh]">
        {/* Cover Header */}
        <div className="relative h-44 w-full shrink-0">
          <img
            alt="Leave No Trace Flatlay"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD61Tw30c4_-FHf_ij4ztt0FD-PKnSaK_WEUmj8eyiMsxzqWVdLArnVaYJw-ElTeWVzuQp1oiXvQtZpPUSiqMbCezeZ2K80d8cUM4-YjWZNFkqN7X-wKyOUG8T-tJSww7g1iVbVpWnRGbJh1vHPBbAPJEH68HyzEhWhZxAF-jSfKKo6oKqLUd7cwq-EzW6D0PXVyBrENunNbTcv52a2q5ma299PtevCNAcjnAFZgU6IWaueaYgEptxQOA"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-black/40" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Artikel"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            ✕
          </button>
          <div className="absolute bottom-3 left-4 right-4 text-on-primary">
            <span className="text-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-bold px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-1">
              Edukasi Konservasi Rimba
            </span>
            <h2 className="text-headline-sm font-bold leading-tight">
              Etika Leave No Trace: 7 Prinsip Wajib Pendaki Gen-Z
            </h2>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-body-md text-on-surface">
          <div className="flex items-center justify-between text-label-sm text-on-surface-variant border-b border-surface-container pb-2">
            <span>Ditulis oleh Balai TN x MounTiva Ranger</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>3 Menit Baca</span>
            </div>
          </div>

          <p className="text-body-md font-semibold text-primary leading-relaxed">
            "Jangan tinggalkan apapun selain jejak kaki, jangan bunuh apapun selain waktu, jangan
            ambil apapun selain foto estetik."
          </p>

          <div className="space-y-3 text-body-sm text-on-surface-variant leading-relaxed">
            <div className="p-3 bg-surface-container-low rounded-xl space-y-1">
              <h4 className="font-bold text-primary flex items-center gap-1.5">
                <span className="text-secondary font-bold">1.</span> Rencanakan & Siapkan Logistik
              </h4>
              <p>
                Repack makanan dari plastik pembungkus ganda ke dalam wadah reusable (tupperware /
                ziplock) sebelum naik ke gunung untuk mengurangi volume sampah di ransel.
              </p>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl space-y-1">
              <h4 className="font-bold text-primary flex items-center gap-1.5">
                <span className="text-secondary font-bold">2.</span> Berkemah di Area Resmi
              </h4>
              <p>
                Gunakan shelter atau tanah padat yang sudah dialokasikan. Jangan membuka semak baru
                atau merusak flora pegunungan yang lambat beregenerasi.
              </p>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl space-y-1">
              <h4 className="font-bold text-primary flex items-center gap-1.5">
                <span className="text-secondary font-bold">3.</span> Pack It In, Pack It Out!
              </h4>
              <p>
                Semua sampah anorganik (botol, kaleng gas, bungkus mie, tisu basah) WAJIB dibawa
                turun dan ditimbang di checkpoint MounTiva untuk ditukar poin reward.
              </p>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl space-y-1">
              <h4 className="font-bold text-primary flex items-center gap-1.5">
                <span className="text-secondary font-bold">4.</span> Tinggalkan yang Anda Temukan
              </h4>
              <p>
                Bunga Edelweiss (Anaphalis javanica) dilindungi UU No. 5 Tahun 1990. Dilarang keras
                memetik atau membawanya sebagai suvenir!
              </p>
            </div>

            <div className="p-3 bg-surface-container-low rounded-xl space-y-1">
              <h4 className="font-bold text-primary flex items-center gap-1.5">
                <span className="text-secondary font-bold">5.</span> Stop Bikin Api Unggun Liar
              </h4>
              <p>
                Gunakan kompor gas portabel spider atau ultralight burner. Api unggun tanah
                meninggalkan abu steril dan berisiko tinggi memicu kebakaran hutan.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-surface-container-low border-t border-surface-container flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md font-semibold transition-colors"
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                isBookmarked ? 'text-tertiary-fixed-dim' : ''
              }`}
              style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              bookmark
            </span>
            <span>{isBookmarked ? 'Tersimpan' : 'Simpan Tips'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-label-md font-bold shadow-sm transition-all"
          >
            Mengerti, Saya Siap!
          </button>
        </div>
      </div>
    </div>
  );
};
