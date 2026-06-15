'use client';

import React from 'react';
import GameShell from '../ui/react-game/GameShell';

export default function Home() {
  return (
    <main className="game-container block relative w-full h-screen overflow-hidden select-none">
      <GameShell />
    </main>
  );
}
