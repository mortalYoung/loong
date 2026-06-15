'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';
import TitleScreen from './TitleScreen';
import GamePage from './GamePage';
import DevPanel from './DevPanel';

export default function GameShell() {
  const gameState = useGameStore((s) => s.gameState);
  const [displayState, setDisplayState] = React.useState(gameState);
  const [transitioning, setTransitioning] = React.useState(false);

  // Auto-save when returning to WORLDMAP
  React.useEffect(() => {
    if (gameState === 'WORLDMAP') {
      useGameStore.getState().saveGame();
    }
  }, [gameState]);

  React.useEffect(() => {
    if (gameState !== displayState) {
      // Only animate transition when leaving TITLE screen
      if (displayState === 'TITLE') {
        setTransitioning(true);
        const t = setTimeout(() => {
          setDisplayState(gameState);
          setTransitioning(false);
        }, 500);
        return () => clearTimeout(t);
      } else {
        setDisplayState(gameState);
      }
    }
  }, [gameState, displayState]);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <div
        style={{
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.5s ease',
          height: '100%',
        }}
      >
        {displayState === 'TITLE' ? <TitleScreen /> : <GamePage />}
      </div>
      <DevPanel />
    </div>
  );
}
