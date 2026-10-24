import React, { useState } from 'react';

interface CommunityFinderModalProps {
  onClose: () => void;
}

interface PartnerPost {
  id: string;
  creator: string;
  destination: string;
  date: string;
  slots: string;
  shareCost: string;
  avatar: string;
  notes: string;
}

const PARTNER_POSTS: PartnerPost[] = [
  {
    id: 'p1',
    creator: 'Dimas Wicaksono',
    destination: 'Mt. Sindoro via Kledung',
    date: '8 - 9 Nov 2026',
    slots: '2 Orang Lagi',
    shareCost: 'Rp175.000 / orang',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDN_c86ad3iniuS7SXYhEg5vk_eTNdPP9fYMZF4FcMcijoKdGAfZDjJuqpWHO5p0ccR3B2hgmLcUFeD3RIN904mbY_fvLV70nqFesm2NM-m11hilDa_l19JvHPcS-vptF8VBmN6apGxdOP92t-lZt5wNORVkXmjgoubTeWaR9DtEmTy7ETQ7vaKFOswN6xKthgXzB5_0siYDQ1_JPXJhpmS20B5RC8fz-FL_aZ25T-TpeM41E6v_Hz45A',
    notes: 'Share carter elf dari Stasiun Purwokerto & sewa porter bersama. Wajib bawa trash bag!',
  },
  {
    id: 'p2',
    creator: 'Nadia Putri',
    destination: 'Mt. Merbabu via Selo',
    date: '15 - 16 Nov 2026',
    slots: '1 Orang (Perempuan)',
    shareCost: 'Rp120.000 / orang',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBTSxTKuYh9-amdONwpzYy0BsbwDtJmteLG8KwP2Fjet1zGuy4GljOmRt8RVBfDiccOggvys0lH5jUSE5-PMVel1yCFdyxyVc8OAgiZXrYdCmizE4FBEOUxUw8TkyAHHmeNyIrHkLJmZz7FkcjJtcvCmAYXu0JDO6-Jc8JJQR5GZrWzJ1w4GGaxOP7HqMLLTotn7P2VQ5Hn4aqSQh2TmGA_FkkowqHrl4NIZ3MyvklapoOEDRN7Mhq9lQ',
    notes: 'Tenda dome 3P udah siap, butuh 1 teman cewek buat genapin tim. Santai & ramah pemula.',
  },
];

export const CommunityFinderModal: React.FC<CommunityFinderModalProps> = ({ onClose }) => {
  const [joinedPosts, setJoinedPosts] = useState<Record<string, boolean>>({});

  const handleJoin = (id: string) => {
    setJoinedPosts((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn">
      <div className="bg-surface-container-lowest rounded-2xl max-w-sm w-full overflow-hidden shadow-2xl border border-surface-container-high flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-primary p-4 text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary-fixed text-[24px]">
              group_add
            </span>
            <div>
              <h3 className="text-headline-sm font-bold leading-tight">Cari Teman Se-Frekuensi</h3>
              <p className="text-label-sm text-secondary-fixed">Share Cost & Pendakian Lestari</p>
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
        <div className="p-4 overflow-y-auto space-y-3 text-body-sm">
          {PARTNER_POSTS.map((post) => {
            const isJoined = joinedPosts[post.id];
            return (
              <div
                key={post.id}
                className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-2 border border-outline-variant/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.avatar}
                      alt={post.creator}
                      className="w-8 h-8 rounded-full object-cover ring-1 ring-secondary/50"
                    />
                    <div className="flex flex-col">
                      <span className="text-label-md font-bold text-primary">{post.creator}</span>
                      <span className="text-label-sm text-outline">{post.date}</span>
                    </div>
                  </div>
                  <span className="text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                    {post.slots}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-body-md font-bold text-primary">{post.destination}</span>
                  <span className="text-label-sm text-secondary font-semibold">
                    Estimasi Share-Cost: {post.shareCost}
                  </span>
                </div>

                <p className="text-body-sm text-on-surface-variant bg-surface-container-lowest/80 p-2 rounded-lg">
                  "{post.notes}"
                </p>

                <button
                  type="button"
                  onClick={() => handleJoin(post.id)}
                  disabled={isJoined}
                  className={`w-full py-2 rounded-lg text-label-md font-bold transition-all ${
                    isJoined
                      ? 'bg-primary-container text-secondary-fixed'
                      : 'bg-secondary hover:bg-primary text-on-secondary active:scale-95'
                  }`}
                >
                  {isJoined ? '✓ Terhubung di Chat Tim' : 'Gabung Grup Pendakian'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container-low border-t border-surface-container text-center">
          <p className="text-label-sm text-on-surface-variant">
            Semua pendaki di komunitas MounTiva telah memverifikasi ID & SIMAKSI resmi.
          </p>
        </div>
      </div>
    </div>
  );
};
