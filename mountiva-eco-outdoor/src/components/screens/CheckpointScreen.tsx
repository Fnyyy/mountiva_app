import React, { useState, useEffect } from 'react';
import { calculateTotalWeight, WasteBatch } from '../../utils/ecoTracker';
import { CheckpointHistoryItem } from '../../types';

interface CheckpointScreenProps {
  onAwardPoints: (points: number, weightKg: number) => void;
  historyList: CheckpointHistoryItem[];
}

export const CheckpointScreen: React.FC<CheckpointScreenProps> = ({
  onAwardPoints,
  historyList,
}) => {
  const [waste, setWaste] = useState<WasteBatch>({
    petPlasticKg: 1.8,
    canMetalKg: 0.6,
    residualKg: 0.9,
  });

  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isScanning, setIsScanning] = useState(true);
  const [validationState, setValidationState] = useState<'idle' | 'validating' | 'success'>('idle');
  const [laserPos, setLaserPos] = useState(16);
  const [manualCodeModal, setManualCodeModal] = useState(false);
  const [manualInput, setManualInput] = useState('RNJ-03-SEM');
  const [qrScannedAlert, setQrScannedAlert] = useState<string | null>(null);

  // Animated laser scan movement
  useEffect(() => {
    if (!isScanning) return;
    let direction = 1;
    let pos = 20;
    const interval = setInterval(() => {
      pos += 2.5 * direction;
      if (pos > 220) direction = -1;
      if (pos < 20) direction = 1;
      setLaserPos(pos);
    }, 30);
    return () => clearInterval(interval);
  }, [isScanning]);

  const totalWeight = calculateTotalWeight(waste);

  const handleValidate = () => {
    if (validationState === 'validating') return;
    setValidationState('validating');

    setTimeout(() => {
      setValidationState('success');
      onAwardPoints(330, totalWeight);
    }, 1200);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setManualCodeModal(false);
    setQrScannedAlert(`Pos Valid: ${manualInput.toUpperCase()} berhasil terhubung!`);
    setTimeout(() => setQrScannedAlert(null), 4000);
  };

  return (
    <div className="flex flex-col w-full px-4 pt-2 pb-6 space-y-6">
      {/* Top Active Checkpoint Status Card */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-md flex flex-col gap-2 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-secondary-fixed/30 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between gap-1 flex-wrap">
          <div className="flex items-center gap-1.5 bg-primary-container px-2.5 py-1 rounded-full text-on-primary">
            <span
              className="material-symbols-outlined text-[15px] text-secondary-fixed"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span className="text-label-sm tracking-wide font-semibold">
              Pos Resmi Terverifikasi Balai TN
            </span>
          </div>
          <div className="flex items-center gap-1 text-secondary text-label-sm font-semibold bg-secondary-container/50 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span>Sinyal GPS Aktif</span>
          </div>
        </div>

        <div className="flex items-start gap-3 mt-1">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[24px]">pin_drop</span>
          </div>
          <div className="min-w-0 flex flex-col">
            <h2 className="text-headline-sm text-primary truncate leading-tight font-bold">
              Pos 3 Sembalun
            </h2>
            <p className="text-body-sm text-on-surface-variant truncate">
              Taman Nasional Gunung Rinjani, Lombok
            </p>
          </div>
        </div>
      </div>

      {/* Live Scanner Action Card */}
      <div className="bg-primary rounded-xl p-4 shadow-xl text-on-primary flex flex-col items-center gap-3 relative overflow-hidden">
        <div className="w-full flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">
              qr_code_scanner
            </span>
            <span className="text-label-lg text-primary-fixed font-bold">
              Eco-Scanner Otomatis
            </span>
          </div>
          <span className="text-label-sm bg-primary-container text-secondary-fixed-dim px-2 py-0.5 rounded-full font-semibold">
            {isTorchOn ? 'Flashlight On' : 'Camera Feed Ready'}
          </span>
        </div>

        {/* Viewfinder Target Area */}
        <div className="relative w-64 h-64 rounded-xl bg-surface-container-lowest/5 backdrop-blur-sm flex items-center justify-center overflow-hidden my-1">
          {/* Animated Corner Brackets */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-secondary-fixed rounded-tl-lg" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-secondary-fixed rounded-tr-lg" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-secondary-fixed rounded-bl-lg" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-secondary-fixed rounded-br-lg" />

          {/* Laser Scanner Bar Animation */}
          <div
            className="absolute inset-x-3 h-0.5 bg-gradient-to-r from-transparent via-tertiary-fixed-dim to-transparent shadow-[0_0_12px_#ffb959] transition-all duration-75"
            style={{ top: `${laserPos}px` }}
          />

          {/* Target Grid Silhouette */}
          <div className="w-40 h-40 rounded-lg bg-surface-container-lowest/10 flex flex-col items-center justify-center p-3 gap-2 text-center pointer-events-none">
            <span className="material-symbols-outlined text-primary-fixed text-[36px] opacity-75">
              qr_code_2
            </span>
            <span className="text-label-sm text-on-primary-container leading-tight font-medium">
              Cocokkan QR Papan Pos
            </span>
          </div>
        </div>

        {qrScannedAlert && (
          <div className="w-full bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-lg text-label-sm font-bold text-center animate-fadeIn">
            {qrScannedAlert}
          </div>
        )}

        <p className="text-body-sm text-center text-on-primary-container px-2 max-w-xs leading-relaxed">
          Arahkan kamera ke QR Code di tiang papan pos resmi atau dasbor basecamp.
        </p>

        {/* Scanner Utility Buttons */}
        <div className="w-full grid grid-cols-2 gap-2 z-10 pt-1">
          <button
            type="button"
            onClick={() => setIsTorchOn(!isTorchOn)}
            className={`h-11 px-3 rounded-lg font-label-md flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
              isTorchOn
                ? 'bg-secondary-fixed text-on-secondary-fixed font-bold'
                : 'bg-primary-container text-on-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isTorchOn ? 'flashlight_off' : 'flashlight_on'}
            </span>
            <span>{isTorchOn ? 'Senter Aktif' : 'Nyalakan Senter'}</span>
          </button>

          <button
            type="button"
            onClick={() => setManualCodeModal(true)}
            className="h-11 px-3 rounded-lg bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md flex items-center justify-center gap-1.5 transition-transform active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">keyboard</span>
            <span>Manual (RNJ-03)</span>
          </button>
        </div>
      </div>

      {/* Two-Step Verification Form Container */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between pb-1">
          <div className="flex flex-col">
            <span className="text-label-sm text-secondary uppercase tracking-widest font-bold">
              Alur Verifikasi SOP
            </span>
            <h3 className="text-headline-sm text-primary font-bold">Validasi & Catat Sampah</h3>
          </div>
          <div className="flex items-center gap-1 text-on-tertiary-container bg-tertiary-fixed px-2.5 py-1 rounded-full text-label-sm font-bold">
            <span className="material-symbols-outlined text-[16px]">stars</span>
            <span>+330 Poin</span>
          </div>
        </div>

        {/* Step 1: Telemetry Verification */}
        <div className="bg-surface-container rounded-lg p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-secondary">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="text-label-md font-bold">Langkah 1: Telemetri Valid</span>
            </div>
            <span className="text-label-sm bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded-full font-bold">
              Terkonfirmasi
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="flex items-center gap-2 bg-surface-container-lowest/80 p-2 rounded-lg">
              <span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
              <div className="flex flex-col">
                <span className="text-label-sm text-on-surface-variant">Timestamp</span>
                <span className="text-label-md text-on-surface font-bold">14:32 WIB</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-lowest/80 p-2 rounded-lg">
              <span className="material-symbols-outlined text-secondary text-[20px]">altitude</span>
              <div className="flex flex-col">
                <span className="text-label-sm text-on-surface-variant">Elevasi Pos</span>
                <span className="text-label-md text-on-surface font-bold">2.631 mdpl</span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2: Scale Input Metrics */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[18px]">scale</span>
              <span className="text-label-md font-bold">Langkah 2: Timbangan Fisik Kantong</span>
            </div>
            <span className="text-label-sm text-on-surface-variant font-medium">Standar TNGR</span>
          </div>

          {/* Input Item 1: Plastik */}
          <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">water_bottle</span>
              </div>
              <div className="flex flex-col">
                <span className="text-label-md text-on-surface font-semibold">
                  Botol PET / Plastik
                </span>
                <span className="text-body-sm text-on-surface-variant">Anorganik ringkas</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-2 py-1 rounded-lg shadow-sm border border-outline-variant/40">
              <input
                id="input-pet"
                type="number"
                step="0.1"
                min="0"
                max="50"
                aria-label="Bobot botol PET"
                value={waste.petPlasticKg}
                onChange={(e) =>
                  setWaste({ ...waste, petPlasticKg: parseFloat(e.target.value) || 0 })
                }
                className="w-14 text-center text-headline-sm text-primary bg-transparent focus:outline-none font-bold"
              />
              <span className="text-label-md text-on-surface-variant font-bold">kg</span>
            </div>
          </div>

          {/* Input Item 2: Logam / Kaleng */}
          <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">takeout_dining</span>
              </div>
              <div className="flex flex-col">
                <span className="text-label-md text-on-surface font-semibold">
                  Kaleng & Logam Gas
                </span>
                <span className="text-body-sm text-on-surface-variant">Daur ulang padat</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-2 py-1 rounded-lg shadow-sm border border-outline-variant/40">
              <input
                id="input-can"
                type="number"
                step="0.1"
                min="0"
                max="50"
                aria-label="Bobot kaleng dan logam"
                value={waste.canMetalKg}
                onChange={(e) =>
                  setWaste({ ...waste, canMetalKg: parseFloat(e.target.value) || 0 })
                }
                className="w-14 text-center text-headline-sm text-primary bg-transparent focus:outline-none font-bold"
              />
              <span className="text-label-md text-on-surface-variant font-bold">kg</span>
            </div>
          </div>

          {/* Input Item 3: Residu */}
          <div className="flex items-center justify-between bg-surface-container-low p-2.5 rounded-lg">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
              </div>
              <div className="flex flex-col">
                <span className="text-label-md text-on-surface font-semibold">
                  Residu & Lainnya
                </span>
                <span className="text-body-sm text-on-surface-variant">Kemasan multilayer</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-container-lowest px-2 py-1 rounded-lg shadow-sm border border-outline-variant/40">
              <input
                id="input-res"
                type="number"
                step="0.1"
                min="0"
                max="50"
                aria-label="Bobot sampah residu"
                value={waste.residualKg}
                onChange={(e) =>
                  setWaste({ ...waste, residualKg: parseFloat(e.target.value) || 0 })
                }
                className="w-14 text-center text-headline-sm text-primary bg-transparent focus:outline-none font-bold"
              />
              <span className="text-label-md text-on-surface-variant font-bold">kg</span>
            </div>
          </div>

          {/* Total Indicator Bar */}
          <div className="flex items-center justify-between bg-primary-container text-on-primary px-4 py-2.5 rounded-lg mt-1 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-secondary-fixed">
                inventory_2
              </span>
              <span className="text-label-lg font-semibold">Total Bobot Bersih</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-stat-counter text-secondary-fixed font-bold">
                {totalWeight.toFixed(1)}
              </span>
              <span className="text-label-md text-on-primary-container">kg</span>
            </div>
          </div>
        </div>

        {/* Main Action Validation CTA */}
        <button
          type="button"
          onClick={handleValidate}
          disabled={validationState === 'validating'}
          className={`w-full h-12 rounded-xl text-label-lg font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
            validationState === 'success'
              ? 'bg-primary-container text-secondary-fixed'
              : 'bg-secondary hover:bg-primary text-on-secondary'
          }`}
        >
          {validationState === 'validating' ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
              <span>Validasi Petugas Terhubung...</span>
            </>
          ) : validationState === 'success' ? (
            <>
              <span
                className="material-symbols-outlined text-[20px] text-secondary-fixed"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span>Sampah Diverifikasi! (+330 Pts)</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
              <span>Konfirmasi & Validasi Petugas</span>
            </>
          )}
        </button>
      </div>

      {/* Checkpoint Ranger Verification Visual Banner */}
      <div className="rounded-xl overflow-hidden shadow-md relative h-36 bg-surface-container-high flex flex-col justify-end p-4">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="Ranger Wahyu Pratama Sembalun"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_h_muWwOsBMbg5TiHj9P3M5vkewT9NkOdX8bAsIfnRnQtSkznkDouRqi6lmdk8QBs3FTa--yBIruafU7dXtBAzlz4UiD5jArLnbvCV7m3gV2n5uE_NLoMeE_VBfhZjg8VQ2qqazZnDG_cyhWIx8Z_5L793VfIXbwjOdXh5YeYTYCALW2J-4WXRXJvX_Zdha_9sRmV5rAJqdNN5HoRLuuftyGM-3GUXOvy-qjf5RdKgTzf3hhjtLBYOQ"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="relative z-10 flex items-center justify-between text-on-primary">
          <div className="flex flex-col">
            <span className="text-label-sm text-secondary-fixed font-semibold">
              Petugas Jaga Aktif
            </span>
            <span className="text-headline-sm font-bold">Ranger Wahyu Pratama</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-lowest/20 backdrop-blur-md flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined text-[22px]">badge</span>
          </div>
        </div>
      </div>

      {/* Recent History List Card */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-md flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-headline-sm text-primary font-bold">Riwayat Checkpoint Terakhir</h4>
          <span className="text-label-sm text-on-surface-variant font-medium">Bulan Ini</span>
        </div>
        <div className="flex flex-col gap-2 mt-1">
          {historyList.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 rounded-lg bg-surface-container-low"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-secondary-container/60 flex items-center justify-center text-secondary shrink-0">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-label-md text-on-surface font-bold truncate">
                    {item.location}
                  </span>
                  <span className="text-body-sm text-on-surface-variant truncate">
                    {item.details} • {item.date}
                  </span>
                </div>
              </div>
              <span className="text-label-md text-secondary font-bold shrink-0 ml-2">
                +{item.points} Pts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Regulatory Advisory Notice */}
      <div className="bg-error-container/40 rounded-xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-error shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[18px]">policy</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-label-md text-on-error-container font-bold">
            Peringatan: Go Rinjani Zero Waste
          </span>
          <p className="text-body-sm text-on-surface leading-snug">
            Semua kantong logistik yang dibawa naik wajib diverifikasi kembali saat turun. Pendaki
            yang meninggalkan sampah dikenakan sanksi blacklist nasional selama 2 tahun.
          </p>
        </div>
      </div>

      {/* Manual Code Entry Modal */}
      {manualCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-surface-container-high space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[22px]">keyboard</span>
                <h3 className="text-headline-sm text-primary font-bold">Input Kode Manual Pos</h3>
              </div>
              <button
                type="button"
                onClick={() => setManualCodeModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary"
              >
                ✕
              </button>
            </div>

            <p className="text-body-sm text-on-surface-variant">
              Masukkan 6-10 digit alfanumerik yang tertera pada plat fisik tiang pos pendakian resmi.
            </p>

            <form onSubmit={handleManualSubmit} className="space-y-3">
              <input
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value.toUpperCase())}
                placeholder="Contoh: RNJ-03-SEM"
                className="w-full h-12 px-3 text-center text-headline-sm uppercase tracking-widest font-bold bg-surface-container-low border border-outline-variant rounded-xl focus:border-secondary focus:outline-none"
              />
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-secondary text-on-secondary font-bold text-label-lg shadow-md active:scale-95 transition-transform"
              >
                Verifikasi Kode Pos
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
