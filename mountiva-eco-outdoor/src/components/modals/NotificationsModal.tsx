import React from 'react';

interface NotificationsModalProps {
  onClose: () => void;
}

const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Checkpoint Pos 3 Sembalun Terhubung',
    message: 'Koneksi telemetri GPS aktif. Pastikan timbangan kantong sampah anorganik siap dicatat.',
    time: '5 Menit lalu',
    icon: 'pin_drop',
    isNew: true,
  },
  {
    id: 'n2',
    title: 'Update Kuota Simaksi Gunung Gede',
    message: 'Tersisa 84 slot izin pendakian via Cibodas untuk akhir pekan ini.',
    time: '2 Jam lalu',
    icon: 'confirmation_number',
    isNew: false,
  },
  {
    id: 'n3',
    title: 'Poin Reward Diterima (+250 Pts)',
    message: 'Verifikasi sampah 2.5 kg di Basecamp Sembalun berhasil divalidasi oleh Ranger TNGR.',
    time: 'Kemarin',
    icon: 'stars',
    isNew: false,
  },
];

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[85vh]">
        <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary-fixed-dim text-[24px]">
              notifications
            </span>
            <h3 className="text-headline-sm font-bold">Pusat Notifikasi</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface/10 hover:bg-surface/20 flex items-center justify-center text-on-primary"
          >
            ✕
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3">
          {NOTIFICATIONS.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-xl flex items-start gap-3 transition-colors ${
                n.isNew ? 'bg-secondary-container/40 border border-secondary/30' : 'bg-surface-container-low'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-body-md font-bold text-primary truncate">{n.title}</h4>
                  {n.isNew && (
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim shrink-0" />
                  )}
                </div>
                <p className="text-body-sm text-on-surface-variant leading-snug mt-0.5">
                  {n.message}
                </p>
                <span className="text-label-sm text-outline mt-1 block">{n.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
