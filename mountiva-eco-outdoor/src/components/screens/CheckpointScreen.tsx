import React, { useState, useEffect, useRef } from 'react';
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

  // Live Camera states & refs
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [hasTorchSupport, setHasTorchSupport] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  // Play subtle feedback beep
  const playBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // AudioContext unavailable
    }
  };

  // Start Live Camera
  const startCamera = async (requestedFacing?: 'environment' | 'user') => {
    setCameraLoading(true);
    setCameraError(null);

    // Stop existing stream first
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    const mode = requestedFacing || facingMode;

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Peramban tidak mendukung akses kamera langsung.');
      }

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: mode },
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });
      } catch {
        // Fallback for laptops/webcams where facingMode ideal fails
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }

      // Check torch support
      const track = stream.getVideoTracks()[0];
      if (track && typeof track.getCapabilities === 'function') {
        const caps = (track.getCapabilities() as any) || {};
        setHasTorchSupport(Boolean(caps.torch));
      }

      setCameraActive(true);
    } catch (err: any) {
      console.warn('Camera access error:', err);
      const isDenied =
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError';
      const isNotFound =
        err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError';
      setCameraError(
        isDenied
          ? 'Izin kamera ditolak. Klik izinkan pada peramban untuk mengaktifkan video feed.'
          : isNotFound
          ? 'Tidak ada kamera terhubung pada perangkat ini.'
          : 'Kamera tidak dapat diakses saat ini.'
      );
      setCameraActive(false);
    } finally {
      setCameraLoading(false);
    }
  };

  // Stop Live Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setIsTorchOn(false);
  };

  // Flip Camera between Front / Rear
  const toggleFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    startCamera(nextMode);
  };

  // Toggle Torch
  const toggleTorch = async () => {
    const nextTorch = !isTorchOn;
    const track = streamRef.current?.getVideoTracks()[0];
    if (track && typeof (track as any).applyConstraints === 'function') {
      try {
        await (track as any).applyConstraints({
          advanced: [{ torch: nextTorch }],
        });
        setIsTorchOn(nextTorch);
      } catch {
        setIsTorchOn(nextTorch);
      }
    } else {
      setIsTorchOn(nextTorch);
    }
  };

  // Capture Proof Snapshot from camera video feed
  const handleCapturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setCapturedPhoto(dataUrl);
      playBeep();
      if ('vibrate' in navigator) navigator.vibrate(100);
      setQrScannedAlert('📸 Foto bukti timbang sampah pos 3 tersimpan!');
      setTimeout(() => setQrScannedAlert(null), 4000);
    }
  };

  // QR / Barcode Scan Handler
  const handleQrDetected = (code: string) => {
    playBeep();
    if ('vibrate' in navigator) navigator.vibrate([100, 60, 120]);
    setQrScannedAlert(`✅ QR Terverifikasi: ${code} - Pos 3 Sembalun Terhubung!`);
    setIsScanning(false);
    setTimeout(() => setIsScanning(true), 6000);
    setTimeout(() => setQrScannedAlert(null), 5000);
  };

  // Start camera on mount, stop on unmount
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Web BarcodeDetector continuous detection loop
  useEffect(() => {
    if (!cameraActive) return;
    let animId: number;
    let detector: any = null;

    if ('BarcodeDetector' in window) {
      try {
        detector = new (window as any).BarcodeDetector({
          formats: ['qr_code', 'code_128', 'ean_13', 'data_matrix'],
        });
      } catch {
        detector = null;
      }
    }

    const checkBarcode = async () => {
      if (videoRef.current && detector && videoRef.current.readyState >= 2 && isScanning) {
        try {
          const results = await detector.detect(videoRef.current);
          if (results && results.length > 0) {
            const raw = results[0].rawValue || 'RNJ-03-SEM';
            handleQrDetected(raw);
          }
        } catch {
          // ignore detector frame errors
        }
      }
      animId = requestAnimationFrame(checkBarcode);
    };

    animId = requestAnimationFrame(checkBarcode);
    return () => cancelAnimationFrame(animId);
  }, [cameraActive, isScanning]);

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
    handleQrDetected(manualInput.toUpperCase());
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
              Eco-Scanner Kamera
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {cameraActive && (
              <button
                type="button"
                onClick={toggleFacingMode}
                title="Ganti Kamera Depan / Belakang"
                className="w-7 h-7 rounded-full bg-primary-container/80 hover:bg-primary-container text-secondary-fixed flex items-center justify-center transition-transform active:scale-90"
              >
                <span className="material-symbols-outlined text-[16px]">flip_camera_ios</span>
              </button>
            )}
            <span className="text-label-sm bg-primary-container text-secondary-fixed-dim px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  cameraActive ? 'bg-secondary-fixed animate-ping' : 'bg-tertiary-fixed-dim'
                }`}
              />
              <span>
                {cameraLoading
                  ? 'Menghubungkan...'
                  : cameraActive
                  ? isTorchOn
                    ? 'Senter Aktif'
                    : 'Kamera Live'
                  : 'Kamera Standby'}
              </span>
            </span>
          </div>
        </div>

        {/* Viewfinder Target Area */}
        <div className="relative w-64 h-64 rounded-xl bg-black/90 flex items-center justify-center overflow-hidden my-1 shadow-inner border border-secondary/30">
          {/* Live Video Feed */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              cameraActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          />

          {/* Fallback / Inactive State */}
          {!cameraActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-primary-container/60 to-primary/95 z-0">
              <span className="material-symbols-outlined text-secondary-fixed text-[44px] mb-2 opacity-90 animate-bounce">
                photo_camera
              </span>
              <p className="text-label-sm text-on-primary-container px-2 mb-3 leading-snug">
                {cameraError || 'Kamera siap dihubungkan untuk memindai QR pos & mengambil foto sampah.'}
              </p>
              <div className="flex flex-col gap-2 w-full max-w-[190px]">
                <button
                  type="button"
                  onClick={() => startCamera()}
                  className="w-full h-9 rounded-lg bg-secondary text-on-secondary text-label-sm font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">videocam</span>
                  <span>{cameraLoading ? 'Membuka...' : 'Buka Kamera'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQrDetected('RNJ-03-SEM')}
                  className="w-full h-8 rounded-lg bg-white/10 hover:bg-white/20 text-on-primary text-label-sm font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
                  <span>Simulasi Scan QR</span>
                </button>
              </div>
            </div>
          )}

          {/* Animated Corner Brackets */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-secondary-fixed rounded-tl-lg pointer-events-none z-10" />
          <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-secondary-fixed rounded-tr-lg pointer-events-none z-10" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-secondary-fixed rounded-bl-lg pointer-events-none z-10" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-secondary-fixed rounded-br-lg pointer-events-none z-10" />

          {/* Laser Scanner Bar Animation */}
          {isScanning && cameraActive && (
            <div
              className="absolute inset-x-3 h-0.5 bg-gradient-to-r from-transparent via-tertiary-fixed-dim to-transparent shadow-[0_0_12px_#ffb959] transition-all duration-75 pointer-events-none z-10"
              style={{ top: `${laserPos}px` }}
            />
          )}

          {/* Target Reticle Silhouette */}
          {cameraActive && (
            <div className="w-36 h-36 rounded-xl border border-dashed border-white/50 flex flex-col items-center justify-center p-2 text-center pointer-events-none z-10 bg-black/20 backdrop-blur-[1px]">
              <span className="material-symbols-outlined text-white/90 text-[32px] drop-shadow">
                qr_code_2
              </span>
              <span className="text-[11px] text-white/90 leading-tight font-medium drop-shadow mt-1">
                Arahkan ke QR Pos
              </span>
            </div>
          )}
        </div>

        {qrScannedAlert && (
          <div className="w-full bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-lg text-label-sm font-bold text-center animate-fadeIn shadow-sm flex items-center justify-center gap-1.5">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            <span>{qrScannedAlert}</span>
          </div>
        )}

        <p className="text-body-sm text-center text-on-primary-container px-2 max-w-xs leading-relaxed">
          {cameraActive
            ? 'Arahkan kamera ke QR Code di tiang pos atau jepret foto sampah Anda.'
            : 'Aktifkan kamera untuk validasi otomatis atau masukkan kode pos manual.'}
        </p>

        {/* Scanner Utility Buttons */}
        <div className="w-full grid grid-cols-3 gap-2 z-10 pt-1">
          {/* Torch Toggle Button */}
          <button
            type="button"
            onClick={toggleTorch}
            className={`h-11 px-2 rounded-lg font-label-md flex items-center justify-center gap-1 transition-all active:scale-95 text-xs ${
              isTorchOn
                ? 'bg-secondary-fixed text-on-secondary-fixed font-bold'
                : 'bg-primary-container text-on-primary hover:bg-primary-container/80'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isTorchOn ? 'flashlight_off' : 'flashlight_on'}
            </span>
            <span>{isTorchOn ? 'Senter Aktif' : 'Senter'}</span>
          </button>

          {/* Snapshot Button */}
          <button
            type="button"
            onClick={cameraActive ? handleCapturePhoto : () => startCamera()}
            className="h-11 px-2 rounded-lg bg-tertiary-fixed-dim hover:bg-tertiary-fixed text-on-tertiary-fixed font-label-md font-bold flex items-center justify-center gap-1 transition-transform active:scale-95 text-xs shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">photo_camera</span>
            <span>{cameraActive ? 'Jepret Foto' : 'Buka Kamera'}</span>
          </button>

          {/* Manual Entry or Simulate Scan */}
          <button
            type="button"
            onClick={() => setManualCodeModal(true)}
            className="h-11 px-2 rounded-lg bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md flex items-center justify-center gap-1 transition-transform active:scale-95 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">keyboard</span>
            <span>Kode Manual</span>
          </button>
        </div>

        {/* Captured Photo Evidence Preview */}
        {capturedPhoto && (
          <div className="w-full bg-surface-container-lowest/15 border border-white/20 rounded-xl p-3 flex items-center justify-between gap-3 animate-fadeIn mt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={capturedPhoto}
                alt="Bukti Foto Sampah"
                className="w-12 h-12 rounded-lg object-cover border border-secondary shadow-sm shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1 text-secondary-fixed text-label-sm font-bold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  <span>Bukti Foto Terlampir</span>
                </div>
                <span className="text-body-sm text-on-primary-container truncate text-[11px]">
                  Terverifikasi pos lapangan
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCapturedPhoto(null)}
              className="text-on-primary-container hover:text-white text-xs px-2 py-1 rounded bg-white/10 shrink-0"
              title="Hapus foto"
            >
              Hapus
            </button>
          </div>
        )}
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
