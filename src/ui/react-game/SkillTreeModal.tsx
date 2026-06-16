'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import { BASE_SKILLS, BONUS_STAT_NAMES, getTierName, canBreakthrough, MAX_PROFICIENCY, TIER_BONUSES, formatProficiency } from '@/game/data/skillData';

type Props = { open?: boolean; onClose: () => void };

export default function SkillTreeModal({ open = true, onClose }: Props) {
  const { player } = useGameStore();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-8" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <div
        className="flex flex-col overflow-hidden rounded-lg w-full max-w-xl"
        style={{ maxHeight: '80vh', background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
      >
        <div className="flex shrink-0 items-center justify-between px-5 py-3" style={{ borderBottom: '1px solid var(--panel-border)' }}>
          <span className="text-sm tracking-[3px]" style={{ color: 'var(--accent)' }}>武学</span>
          <span className="game-menu-item text-lg" onClick={onClose}>✕</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
          {BASE_SKILLS.map((sk) => {
            const state = player.skills[sk.id];
            if (!state) return null;
            const tierName = getTierName(state.tier);
            const pct = Math.min(100, Math.round((state.proficiency / MAX_PROFICIENCY) * 100));
            const ready = canBreakthrough(state);
            return (
              <div key={sk.id} className="p-3 md:p-4 rounded" style={{ border: '1px solid var(--panel-border)' }}>
                <div className="flex justify-between items-center">
                  <span style={{ color: 'var(--foreground)' }}>{sk.name}</span>
                  <span className="text-xs" style={{ color: ready ? '#c8a55a' : 'var(--muted)' }}>
                    {tierName} {formatProficiency(state.proficiency)}/{formatProficiency(MAX_PROFICIENCY)}
                  </span>
                </div>
                <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: '#2a2a2a' }}>
                  <div className="h-full rounded-full" style={{ width: `${pct}%`, background: ready ? '#c8a55a' : '#5a7a5a', transition: 'width 0.3s' }} />
                </div>
                <div className="mt-1 text-[10px]" style={{ color: '#555' }}>
                  突破加成：
                  <span style={{ color: 'var(--accent)' }}> +{BONUS_STAT_NAMES[TIER_BONUSES[sk.id]?.[0]?.stat ?? 'strength']}</span>
                  {' '}<span style={{ color: 'var(--accent)' }}>+</span>{TIER_BONUSES[sk.id]?.map((b, idx) => (
                    <span key={idx}>
                      {idx > 0 && <span style={{ color: '#444' }}>/</span>}
                      <span style={{ color: idx < state.tier ? '#c8a55a' : '#444', fontWeight: idx < state.tier ? 'bold' : 'normal' }}>
                        {b.value}
                      </span>
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>{sk.description}</span>
                  {ready && (
                    <button
                      className="text-xs px-2 py-1 rounded shrink-0 ml-2 animate-pulse"
                      style={{ background: '#2a2218', border: '1px solid var(--accent)', color: 'var(--accent)', cursor: 'pointer' }}
                      onClick={() => {
                        onClose();
                        setTimeout(() => useGameStore.getState().startBreakthroughEvent(sk.id), 300);
                      }}
                    >
                      突破
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
