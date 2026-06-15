'use client';

import React from 'react';
import { formatProficiency } from '@/game/data/skillData';
import { useGameStore, getDerived } from '@/store/useGameStore';

export default function DevPanel() {
  const [open, setOpen] = React.useState(false);
  const { player, world } = useGameStore();

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <>
      <button
        className="fixed bottom-2 right-2 z-[200] text-[10px] px-2 py-1 rounded opacity-40 hover:opacity-100"
        style={{ background: '#333', color: '#aaa', border: '1px solid #555' }}
        onClick={() => setOpen(!open)}
      >
        DEV
      </button>
      {open && <DevPanelContent />}
    </>
  );
}

function DevPanelContent() {
  const store = useGameStore();
  const { player, world } = store;
  const derived = getDerived(player);

  const addGold = (n: number) => store.addGold(n);
  const addStamina = () => useGameStore.setState((s) => ({ player: { ...s.player, stamina: 8 } }));
  const healFull = () => useGameStore.setState((s) => ({ player: { ...s.player, hp: getDerived(s.player).maxHp } }));
  const addSkillProf = (skill: string, amt: number) => store.addProficiency(skill as any, amt);
  const skipToChapter = (ch: string) => {
    useGameStore.setState((s) => ({
      world: { ...s.world, currentChapter: ch as any, discoveredChapters: [...new Set([...s.world.discoveredChapters, ch as any])] }
    }));
  };

  return (
    <div className="fixed bottom-10 right-2 z-[200] w-72 max-h-[60vh] overflow-y-auto rounded p-3 text-[11px]"
      style={{ background: '#1a1a1a', border: '1px solid #444', color: '#ccc' }}>
      <div className="font-bold mb-2 text-xs" style={{ color: '#f0c040' }}>「调」Dev Panel</div>

      <div className="space-y-1 mb-3">
        <div>HP: {player.hp}/{derived.maxHp} | Gold: {player.gold} | Stamina: {player.stamina}/8</div>
        <div>Day: {world.day} | Chapter: {world.currentChapter}</div>
        <div>Exploration: {(world.explorationMap[world.currentChapter as 'qingshi'] ?? 0).toFixed(1)}%</div>
        <div>Skills: 剑{player.skills.sword.tier}/{formatProficiency(player.skills.sword.proficiency)} 身{player.skills.agility.tier}/{formatProficiency(player.skills.agility.proficiency)} 体{player.skills.body.tier}/{formatProficiency(player.skills.body.proficiency)} 心{player.skills.mind.tier}/{formatProficiency(player.skills.mind.proficiency)} 悟{player.skills.insight.tier}/{formatProficiency(player.skills.insight.proficiency)}</div>
        <div>Clues: {world.inventory.length} | Events: {world.completedEventIds.length}</div>
      </div>

      <div className="grid grid-cols-2 gap-1">
        <Btn onClick={() => addGold(100)}>+100 金</Btn>
        <Btn onClick={() => addGold(500)}>+500 金</Btn>
        <Btn onClick={addStamina}>满行动力</Btn>
        <Btn onClick={healFull}>满气血</Btn>
        <Btn onClick={() => addSkillProf('sword', 50)}>剑法+50</Btn>
        <Btn onClick={() => addSkillProf('agility', 50)}>身法+50</Btn>
        <Btn onClick={() => addSkillProf('body', 50)}>体魄+50</Btn>
        <Btn onClick={() => addSkillProf('mind', 50)}>心法+50</Btn>
        <Btn onClick={() => addSkillProf('insight', 50)}>战悟+50</Btn>
        <Btn onClick={() => useGameStore.setState((s) => ({ world: { ...s.world, explorationMap: { ...s.world.explorationMap, [s.world.currentChapter as any]: 25 } } }))}>探索度=25%</Btn>
        <Btn onClick={() => useGameStore.setState((s) => ({ player: { ...s.player, base: { ...s.player.base, strength: s.player.base.strength + 5, physique: s.player.base.physique + 5 } } }))}>属性+5</Btn>
      </div>

      <div className="mt-2 text-[10px]" style={{ color: '#888' }}>快速跳转：</div>
      <div className="grid grid-cols-3 gap-1 mt-1">
        <Btn onClick={() => skipToChapter('qingshi')}>青石镇</Btn>
        <Btn onClick={() => skipToChapter('guifeng')}>鬼风岭</Btn>
        <Btn onClick={() => skipToChapter('yunyin')}>云隐寺</Btn>
        <Btn onClick={() => skipToChapter('heishi')}>黑石矿</Btn>
        <Btn onClick={() => skipToChapter('longyin')}>龙隐宫</Btn>
      </div>
    </div>
  );
}

function Btn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick} className="px-1 py-0.5 rounded text-[10px]"
      style={{ background: '#2a2a2a', border: '1px solid #444', color: '#ccc', cursor: 'pointer' }}>
      {children}
    </button>
  );
}
