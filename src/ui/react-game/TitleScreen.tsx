'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';

const QUOTES = [
  '天下棋局已开，你我皆是局中人。',
  '龙脉已动，山河将变。无人能置身事外。',
  '有些真相一旦知晓，便再也无法回头。',
  '权力不过是一把没有鞘的刀，握着的人终会流血。',
  '乱世之中，唯有自己的剑可以信赖。',
  '当所有人都在寻找宝藏，真正的秘密反而无人在意。',
  '师父说过：走得越远，离真相越近，离安宁越远。',
];

type Phase = 'idle' | 'title' | 'subtitle' | 'quote' | 'status' | 'menu' | 'transition';

export default function TitleScreen() {
  const startNewGame = useGameStore((s) => s.startNewGame);
  const loadGame = useGameStore((s) => s.loadGame);
  const [phase, setPhase] = React.useState<Phase>('idle');
  const [transitionText, setTransitionText] = React.useState('');
  const [inkSpread, setInkSpread] = React.useState(false);
  const [quote] = React.useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  const [hasSave, setHasSave] = React.useState(false);

  React.useEffect(() => {
    setHasSave(!!localStorage.getItem('longyinSave'));
  }, []);

  // Sequenced entrance animation
  React.useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('title'), 300),
      setTimeout(() => setPhase('subtitle'), 1800),
      setTimeout(() => setPhase('quote'), 2800),
      setTimeout(() => setPhase('status'), 3800),
      setTimeout(() => setPhase('menu'), 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleStart = () => {
    setPhase('transition');
    setTimeout(() => setTransitionText('龙脉正在苏醒……'), 800);
    setTimeout(() => setInkSpread(true), 2200);
    setTimeout(() => startNewGame(), 3200);
  };

  return (
    <div className="title-screen relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
      {/* Dynamic background layers */}
      <DynamicBackground />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Title: 4 chars appear sequentially */}
        <div className="flex items-center gap-[6px]" style={{ transform: 'scale(1.03)' }}>
          {'龙隐山河'.split('').map((ch, i) => (
            <span
              key={i}
              className="text-5xl md:text-7xl font-light"
              style={{
                color: '#F3E7C6',
                letterSpacing: '6px',
                opacity: phase === 'idle' ? 0 : 1,
                transform: phase === 'idle' ? 'translateY(20px)' : 'translateY(0)',
                transition: `opacity 0.6s ease ${i * 0.25}s, transform 0.6s ease ${i * 0.25}s`,
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <p
          className="mt-5 text-xs tracking-[4px]"
          style={{
            color: '#7c7465',
            opacity: ['subtitle', 'quote', 'status', 'menu'].includes(phase) ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          建文元年 · 天下暗涌
        </p>

        {/* Quote */}
        <p
          className="mt-8 md:mt-14 text-center leading-7 md:leading-8 text-sm md:text-base px-4"
          style={{
            color: '#8d8577',
            fontStyle: 'italic',
            maxWidth: 320,
            opacity: ['quote', 'status', 'menu'].includes(phase) ? 1 : 0,
            transform: ['quote', 'status', 'menu'].includes(phase) ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          「{quote}」
        </p>

        {/* Status divider */}
        <div
          className="mt-12 text-center"
          style={{
            opacity: ['status', 'menu'].includes(phase) ? 1 : 0,
            transform: ['status', 'menu'].includes(phase) ? 'translateY(0) scaleX(1)' : 'translateY(8px) scaleX(0.8)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="text-xs tracking-[3px]" style={{ color: '#4a4540', overflow: 'hidden' }}>
            <span style={{ display: 'inline-block', animation: ['status', 'menu'].includes(phase) ? 'lineReveal 1s ease forwards' : 'none', opacity: ['status', 'menu'].includes(phase) ? 1 : 0 }}>
              ────────────
            </span>
          </div>
          <div className="my-2 text-sm tracking-[4px]" style={{ color: '#7c7465' }}>
            建文元年 · 南京 · 夜
          </div>
          <div className="text-xs tracking-[3px]" style={{ color: '#4a4540' }}>
            ────────────
          </div>
        </div>

        {/* Menu */}
        <nav
          className="mt-12 md:mt-10 space-y-5 md:space-y-7 text-xl md:text-2xl"
          style={{
            opacity: phase === 'menu' ? 1 : 0,
            transform: phase === 'menu' ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {hasSave && (
            <div
              className="title-menu-item"
              onClick={() => { loadGame(); }}
              style={{ transition: 'all 0.3s ease' }}
            >
              继续冒险
            </div>
          )}
          <div
            className="title-menu-item"
            onClick={handleStart}
            style={{ transition: 'all 0.3s ease' }}
          >
            {hasSave ? '重新开始' : '开始冒险'}
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 text-center">
        <div className="text-xs tracking-[2px] text-[#555]">「卷一」边关迷局</div>
        <div className="text-[10px] tracking-[1px] text-[#3a3a3a] mt-1">Version Alpha</div>
      </div>

      {/* Transition overlay */}
      {phase === 'transition' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.95)', transition: 'opacity 0.8s' }}
        >
          {transitionText && !inkSpread && (
            <p className="text-xl tracking-[6px] breathing-text" style={{ color: '#F3E7C6' }}>
              {transitionText}
            </p>
          )}
          {inkSpread && (
            <div className="ink-spread" />
          )}
        </div>
      )}
    </div>
  );
}

/* ── Dynamic Background ── */
function DynamicBackground() {
  return (
    <>
      {/* Black gradient base */}
      <div className="pointer-events-none fixed inset-0" style={{
        background: 'radial-gradient(ellipse at 50% 40%, #1a1510 0%, #0a0a08 50%, #000000 100%)',
      }} />
      {/* Subtle fog layer */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'f\'%3E%3CfeTurbulence baseFrequency=\'0.005\' numOctaves=\'3\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23f)\'/%3E%3C/svg%3E")',
        animation: 'fogDrift 30s linear infinite',
      }} />
      {/* Dust particles — varied sizes */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => {
          const sizeClass = i % 3; // 0=small, 1=medium, 2=large
          const size = sizeClass === 0 ? 1 : sizeClass === 1 ? 2.5 : 4;
          const opacity = sizeClass === 0 ? 0.2 : sizeClass === 1 ? 0.35 : 0.15;
          const speed = sizeClass === 0 ? 14 + i * 1.2 : sizeClass === 1 ? 10 + i * 0.8 : 18 + i * 0.5;
          return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: `rgba(243,231,198,${opacity})`,
              left: `${(i * 17 + 5) % 100}%`,
              top: `${-5 + (i * 3) % 10}%`,
              animation: `dustFall ${speed}s linear infinite`,
              animationDelay: `${(i * 1.7) % 12}s`,
            }}
          />
          );
        })}
      </div>
      {/* Distant firelight flicker */}
      <div className="pointer-events-none fixed" style={{
        width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,160,50,0.08), transparent 70%)',
        left: '15%', top: '60%',
        animation: 'fireFlicker 4s ease-in-out infinite',
      }} />
    </>
  );
}
