'use client';

import React from 'react';
import { useGameStore } from '@/store/useGameStore';

// ── 古代日期生成 ──
const MONTHS = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
const DAYS = ['初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'];
const WEATHER = ['晴', '阴', '多云', '微雨', '大风', '薄雾'];
// 行动力与时辰对应：满(8)=巳时 → 空(0)=子时
const STAMINA_SHICHEN = ['子时', '亥时', '戌时', '酉时', '申时', '未时', '午时', '巳时'];
// index: stamina 0→子时, 1→亥时, ..., 7→巳时 -- 但我们要 8=巳, 7=午, ..., 0=子
// 正确映射: stamina 8→巳(idx5), 7→午(idx6), 6→未(idx7), 5→申(idx8), 4→酉(idx9), 3→戌(idx10), 2→亥(idx11), 1→子(idx0), 0→子(idx0)

function getShichenByStamina(stamina: number): string {
  const map = ['子时', '子时', '亥时', '戌时', '酉时', '申时', '未时', '午时', '巳时'];
  return map[Math.min(stamina, 8)] ?? '子时';
}

function getDateString(day: number, stamina: number): string {
  // Day 1 = 建文元年·二月初六
  const startMonth = 1;
  const startDay = 5;
  const totalDayIndex = startDay + (day - 1);
  const month = MONTHS[startMonth + Math.floor(totalDayIndex / 30)] ?? MONTHS[startMonth];
  const dayStr = DAYS[totalDayIndex % 30] ?? DAYS[0];
  const shichen = getShichenByStamina(stamina);
  const weather = WEATHER[(day * 7 + 2) % WEATHER.length];
  return `建文元年·${month}${dayStr}·${shichen}　天气·${weather}`;
}

// ── 动态叙事：根据已完成事件和已收集线索生成当前描述 ──
function getChapterNarrative(chapterId: string, completedEvents: string[], inventoryIds: string[]): string {
  if (chapterId === 'qingshi') {
    // 根据进度逐步展开叙事
    if (inventoryIds.includes('clue_journal')) {
      return '五条线索已齐。师父的手札、铁匠的证词、衙门的封禁令——一切都指向鬼风岭。有人在掩盖真相，而你已经太接近了。该出发了。';
    }
    if (inventoryIds.includes('clue_smith')) {
      return '铁匠铺的大火、衙门的封禁、客栈的传闻...每一条线索都指向鬼风岭。师父的行踪越来越清晰，但危险也在逼近。还差最后一步。';
    }
    if (inventoryIds.includes('clue_notice')) {
      return '衙门禁止百姓进入鬼风岭。客栈掌柜说最近有人失踪。师父留下的铜印握在手中，沉甸甸的。你需要找到更多线索。';
    }
    if (inventoryIds.includes('clue_inn_note')) {
      return '客栈掌柜的话证实了你的猜测——师父的失踪并非偶然。镇上人心惶惶，但你还需要更多证据。';
    }
    if (inventoryIds.includes('clue_seal')) {
      return '龙纹铜印已在手中。师父为何留下这枚印？它意味着什么？你决定在镇上四处打探消息。';
    }
    if (completedEvents.length > 0) {
      return '青石镇的街道上行人稀少。师父已经离开数月，你决定从他的住所开始调查。';
    }
    return '石板路上马蹄声远去，客栈门前的灯笼在风中摇晃。师父的住所就在镇东，是时候去看看了。';
  }
  if (chapterId === 'guifeng') {
    if (inventoryIds.includes('clue_gf_symbol')) {
      return '五条线索齐聚。驿卒的血书、酒窖密道、日记中的恐惧、云隐寺的警告、飞禽符号——一切指向密室中那个守护钥匙的东西。是时候面对它了。';
    }
    if (inventoryIds.includes('clue_gf_warning')) {
      return '"龙脉已开，切勿前往云隐寺。"遗书的警告仍在耳边回响。密室就在前方，但那里有某种东西在守护着第一把钥匙。';
    }
    if (inventoryIds.includes('clue_gf_diary')) {
      return '驿卒日记揭示了这里的过去——建文二年，调查队全员遇害。日记最后几页写满了恐惧。真相就在更深处。';
    }
    if (inventoryIds.includes('clue_gf_cellar')) {
      return '酒窖暗门后的甬道向着地下延伸。有人在这里维护着什么，空气中有新鲜的脚印。你需要继续深入。';
    }
    if (inventoryIds.includes('clue_gf_letter')) {
      return '驿卒的血书指向地下酒窖的暗门。"切记不可动第三个酒桶"——这是死者留下的最后警告。';
    }
    if (completedEvents.length > 0) {
      return '鬼风岭驿站残破不堪，但处处暗藏玄机。匪徒占据了外围，机关暗藏其中。你需要找到进入深处的方法。';
    }
    return '残破的牌匾在寒风中吱呀作响，马厩里散落着生锈的马具。空气中弥漫着陈年血腥气。这里发生过可怕的事。';
  }
  // 其他章节暂时返回默认描述
  const { getChapter } = require('@/game/data/gameData');
  return getChapter(chapterId)?.flavorText ?? '';
}

// Scaffold — will fill components via edits
export default function GamePage() {
  const { player, world, gameState, combat, currentEvent } = useGameStore();
  const [activeModal, setActiveModal] = React.useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col mx-auto px-3 md:px-0" style={{ width: '100%', maxWidth: '90vw' }}>
      {/* ── Header ── */}
      <header className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 md:mb-3 py-2">
        <div className="tracking-[4px] text-lg md:text-xl">龙隐山河</div>
        <div className="flex items-center gap-3 text-xs md:text-sm mt-1 sm:mt-0" style={{ color: 'var(--muted)' }}>
          <span className="hidden sm:inline">{getDateString(world.day, player.stamina)}</span>
          <span className="sm:hidden">{getDateString(world.day, player.stamina).split('　')[0]}</span>
          <span>行动力 <span style={{ color: player.stamina > 0 ? 'var(--accent)' : '#8b3a3a' }}>{player.stamina}</span>/8</span>
        </div>
      </header>

      {/* ── Center ── */}
      <div className="flex flex-col md:flex-row flex-1 gap-2 md:gap-3 min-h-0">
        {/* left: journey map — hidden on mobile, shown in footer nav instead */}
        <aside className="game-panel hidden md:block w-52 min-w-52 max-w-52 p-4 overflow-hidden shrink-0">
          <JourneyMap />
        </aside>

        {/* center: story — fills remaining space */}
        <main className="game-panel flex-1 min-w-0 p-4 md:p-6 overflow-y-auto">
          <StoryPanel />
        </main>
      </div>

      {/* ── Bottom panels — fixed height, single column on mobile ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 mt-2 md:mt-3 h-32 md:h-44 min-h-32 md:min-h-44 max-h-32 md:max-h-44 shrink-0">
        <div className="game-panel p-3 md:p-4 overflow-y-auto hidden md:block">
          <CharacterInfo player={player} />
        </div>
        <div className="game-panel p-4 overflow-y-auto">
          <CombatLog />
        </div>
      </div>

      {/* ── Footer nav ── */}
      <nav className="flex justify-center gap-4 md:gap-10 mt-2 md:mt-3 text-sm md:text-lg pb-2">
        <NavItem label="山河" className="md:hidden" onClick={() => setActiveModal('map')} />
        <NavItem label="角色" onClick={() => setActiveModal('character')} />
        <NavItem label="技能" onClick={() => setActiveModal('skilltree')} />
        <NavItem label="线索" onClick={() => setActiveModal('inventory')} />
        <NavItem label="日志" onClick={() => setActiveModal('log')} />
        <NavItem label="设置" onClick={() => setActiveModal('settings')} />
      </nav>

      {/* Modals */}
      {activeModal === 'map' && (
        <ModalOverlay onClose={() => setActiveModal(null)} title="山河卷">
          <JourneyMap />
        </ModalOverlay>
      )}
      {activeModal === 'skilltree' && (
        <SkillTreeWrapper onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'character' && (
        <ModalOverlay onClose={() => setActiveModal(null)} title="角色详情">
          <CharacterDetail />
        </ModalOverlay>
      )}
      {activeModal === 'inventory' && (
        <ModalOverlay onClose={() => setActiveModal(null)} title="线索">
          <InventoryPanel />
        </ModalOverlay>
      )}
      {activeModal === 'log' && (
        <ModalOverlay onClose={() => setActiveModal(null)} title="冒险日志">
          <LogPanel />
        </ModalOverlay>
      )}
      {activeModal === 'settings' && (
        <ModalOverlay onClose={() => setActiveModal(null)} title="设置">
          <SettingsPanel />
        </ModalOverlay>
      )}

      {/* Game Over overlay */}
      {gameState === 'GAMEOVER' && <GameOverOverlay />}
    </div>
  );
}

function NavItem({ label, badge, className, onClick }: { label: string; badge?: number; className?: string; onClick: () => void }) {
  return (
    <div className={`game-menu-item relative ${className ?? ''}`} onClick={onClick}>
      {label}
      {badge != null && (
        <span className="absolute -top-2 -right-3 text-[10px] min-w-4 h-4 flex items-center justify-center rounded-full" style={{ background: 'var(--accent)', color: '#111' }}>
          {badge}
        </span>
      )}
    </div>
  );
}

function JourneyMap() {
  const { world } = useGameStore();
  const { CHAPTERS } = require('@/game/data/gameData');
  return (
    <div>
      <div className="mb-4 text-lg tracking-[2px]">山河卷</div>
      <div className="space-y-1">
        {(CHAPTERS as { id: string; name: string }[]).map((ch, i) => {
          const discovered = world.discoveredChapters.includes(ch.id as any);
          const current = world.currentChapter === ch.id;
          const completed = world.completedChapters.includes(ch.id as any);
          const explo = world.explorationMap[ch.id as keyof typeof world.explorationMap] ?? 0;
          // Status symbol: ● completed, ◎ current, ○ discovered, ? unknown
          let symbol = '?';
          let color = '#333';
          if (completed) { symbol = '●'; color = 'var(--accent)'; }
          else if (current) { symbol = '◎'; color = '#f6d37c'; }
          else if (discovered) { symbol = '○'; color = 'var(--foreground)'; }
          return (
            <div key={ch.id}>
              <div
                className="game-menu-item flex items-center gap-2 py-1"
                style={{ color: discovered ? (current ? '#f6d37c' : 'var(--foreground)') : '#444', opacity: discovered ? 1 : 0.4 }}
                onClick={() => discovered && useGameStore.getState().setCurrentChapter(ch.id as any)}
              >
                <span style={{ color }}>{symbol}</span>
                <span>{discovered ? ch.name : '???'}</span>
              </div>
              {discovered && explo > 0 && (
                <div className="ml-6 text-xs" style={{ color: 'var(--muted)' }}>{explo.toFixed(1)}%</div>
              )}
              {i < CHAPTERS.length - 1 && <div className="ml-2 text-xs" style={{ color: '#333' }}>│</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
function StoryPanel() {
  const { gameState, world, currentEvent, combat, player } = useGameStore();
  const { resolveEvent } = useGameStore();
  const { startCombat, startEvent } = useGameStore();
  const { getChapter, getEnemiesForChapter } = require('@/game/data/gameData');
  const chapter = world.currentChapter ? getChapter(world.currentChapter) : null;

  // ── Auto combat: player attacks automatically ──
  React.useEffect(() => {
    if (combat.combatPhase !== 'PLAYER_TURN') return;
    const t = setTimeout(() => useGameStore.getState().playerAttack(), 600);
    return () => clearTimeout(t);
  }, [combat.combatPhase]);

  // ── Auto combat: enemy turn fires automatically ──
  React.useEffect(() => {
    if (combat.combatPhase !== 'ENEMY_TURN') return;
    const t = setTimeout(() => useGameStore.getState().enemyTurn(), 700);
    return () => clearTimeout(t);
  }, [combat.combatPhase]);

  // ── Auto settle: end combat automatically after win/lose ──
  React.useEffect(() => {
    if (combat.combatPhase !== 'WIN' && combat.combatPhase !== 'LOSE') return;
    const t = setTimeout(() => useGameStore.getState().endCombat(combat.combatPhase === 'WIN'), 1200);
    return () => clearTimeout(t);
  }, [combat.combatPhase]);

  // Idle state — show chapter description + explore prompt
  if (gameState === 'WORLDMAP' || gameState === 'TITLE') {
    if (!chapter) {
      return (
        <div className="leading-9">
          <p>你站在旅途的起点。</p>
          <p className="mt-4" style={{ color: 'var(--muted)' }}>← 从左侧山河卷中选择章节开始探索。</p>
        </div>
      );
    }
    const explo = world.explorationMap[world.currentChapter!] ?? 0;
    const isCompleted = explo >= 100;
    const narrative = getChapterNarrative(world.currentChapter!, world.completedEventIds, world.inventory.map((i) => i.id));
    return (
      <div className="leading-9">
        <p className="text-lg">
          <span style={{ color: 'var(--accent)' }}>{chapter.name}</span>
        </p>
        <p className="mt-4">{narrative}</p>
        <p className="mt-4" style={{ color: 'var(--muted)' }}>
          探索度：{explo.toFixed(1)}%{isCompleted ? ' — 已完全探索' : ''}
        </p>
        <div className="mt-8 space-y-4">
          {player.stamina > 0 ? (
            <div className="game-menu-item text-lg" onClick={() => handleExplore(world.currentChapter!)}>
              探索此地 <span className="text-sm" style={{ color: 'var(--muted)' }}>(-1 行动力)</span>
            </div>
          ) : (
            <>
              {player.gold >= 10 ? (
                <div className="game-menu-item text-lg" onClick={() => useGameStore.getState().restAtInn()}>
                  ◇ 住店休息 <span className="text-sm" style={{ color: 'var(--muted)' }}>(-10 金，恢复全部气血与行动力)</span>
                </div>
              ) : (
                <div className="text-lg" style={{ color: '#555', cursor: 'not-allowed' }}>
                  ◇ 住店休息 <span className="text-sm">(金币不足)</span>
                </div>
              )}
              <div className="game-menu-item text-lg" onClick={() => useGameStore.getState().restOnStreet()}>
                ◇ 露宿街头 <span className="text-sm" style={{ color: 'var(--muted)' }}>(免费，恢复 50% 气血与 70% 行动力)</span>
              </div>
            </>
          )}
        </div>
        {isCompleted && (
          <p className="mt-6 text-sm" style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
            你已彻底探索了此地。新的道路已经开启...
          </p>
        )}
      </div>
    );
  }

  // Event
  if (gameState === 'EVENT' && currentEvent) {
    const catLabel: Record<string, string> = { unique: '一次性', repeatable: '', rare: '稀有', chain: '连锁' };
    const catTag = catLabel[(currentEvent as any).category] || '';
    return (
      <div className="leading-9">
        <p style={{ color: 'var(--accent)' }}>
          {currentEvent.title}
          {catTag && <span className="ml-2 text-xs px-1.5 py-0.5" style={{ border: '1px solid var(--panel-border)', color: 'var(--muted)' }}>{catTag}</span>}
        </p>
        <p className="mt-4">{currentEvent.description}</p>
        <div className="mt-8 space-y-4">
          {currentEvent.options.map((opt, i) => {
            const dynRate = (opt as any).dynamicRate === 'exploration'
              ? Math.round(world.explorationMap[world.currentChapter!] ?? 0.5)
              : opt.successRate;
            const hasBonus = opt.skillBonus.some((sb: { skill: string }) => {
              const sk = player.skills[sb.skill as keyof typeof player.skills];
              return sk && sk.tier >= 1;
            });
            const showRate = dynRate < 100;
            return (
              <div key={opt.id} className="game-menu-item text-lg" onClick={() => resolveEvent(i)}>
                {opt.text}
                {showRate && (
                  <span className="ml-2 text-sm" style={{ color: 'var(--muted)' }}>
                    ({dynRate}%{hasBonus ? '+' : ''})
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Combat — auto journal style with enemy stats
  if (gameState === 'COMBAT' && combat.enemy) {
    const enemy = combat.enemy;
    const enemyHpPct = Math.max(0, Math.round((enemy.hp / enemy.maxHp) * 10));
    return (
      <div className="leading-9">
        <p style={{ color: 'var(--accent)' }}>「刃」战斗 — {enemy.name}{enemy.isBoss ? ' [BOSS]' : ''}</p>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{enemy.description}</p>
        <div className="mt-3 text-sm flex gap-6" style={{ color: 'var(--muted)' }}>
          <span>HP {'█'.repeat(enemyHpPct)}{'░'.repeat(10 - enemyHpPct)} {enemy.hp}/{enemy.maxHp}</span>
          <span>攻击 {enemy.attack}</span>
          <span>防御 {enemy.defense}</span>
        </div>
        <div className="mt-4 space-y-1">
          {combat.log.map((line, i) => (
            <p key={i} style={{ color: i === combat.log.length - 1 ? 'var(--foreground)' : 'var(--muted)' }}>{line}</p>
          ))}
        </div>
        {(combat.combatPhase === 'WIN' || combat.combatPhase === 'LOSE') && (
          <p className="mt-6" style={{ color: 'var(--muted)', fontStyle: 'italic' }}>
            {combat.combatPhase === 'WIN' ? '战斗胜利，正在结算...' : '你倒下了...'}
          </p>
        )}
      </div>
    );
  }

  return null;

  function handleExplore(chapterId: string) {
    // Exploration always triggers combat; events are random encounters after combat
    const enemies = getEnemiesForChapter(chapterId, world.completedEventIds);
    if (enemies.length) {
      const e = enemies[Math.floor(Math.random() * enemies.length)];
      startCombat(e);
    }
  }


}
function CharacterInfo({ player }: { player: any }) {
  const { getDerived } = require('@/store/useGameStore');
  const derived = getDerived(player);
  const hpPct = Math.max(0, Math.min(10, Math.round((player.hp / derived.maxHp) * 10)));
  return (
    <div>
      <div className="mb-2" style={{ color: 'var(--accent)' }}>角色</div>
      <div className="text-sm">气血 {'█'.repeat(hpPct)}{'░'.repeat(10 - hpPct)} {player.hp}/{derived.maxHp}</div>
      <div className="mt-2 grid grid-cols-3 gap-x-4 gap-y-1 text-xs" style={{ color: 'var(--muted)' }}>
        <span>体魄 {player.base.physique}</span>
        <span>力量 {player.base.strength}</span>
        <span>敏捷 {player.base.agility}</span>
        <span>智谋 {player.base.intellect}</span>
        <span>洞察 {player.base.perception}</span>
        <span>意志 {player.base.willpower}</span>
      </div>
    </div>
  );
}
function CombatLog() {
  const { world } = useGameStore();
  const lines = world.eventLog.slice(-8);
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines.length]);

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 mb-2" style={{ color: 'var(--accent)', position: 'sticky', top: 0, background: 'var(--panel-bg)', paddingBottom: 4 }}>江湖闻录</div>
      <div className="flex-1 overflow-y-auto space-y-1" style={{ color: 'var(--muted)', fontSize: 13 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ opacity: 0.4 + (i / lines.length) * 0.6 }}>{line}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
function SkillTreeWrapper({ onClose }: { onClose: () => void }) {
  const SkillTreeModal = require('./SkillTreeModal').default;
  return <SkillTreeModal open onClose={onClose} />;
}

/* ── Reusable Modal Overlay ── */
function ModalOverlay({ onClose, title, children }: { onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-0" style={{ background: 'rgba(0,0,0,0.85)' }}>
      <div className="game-panel p-5 md:p-8 w-full max-w-lg max-h-[85vh] overflow-y-auto relative">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <div className="text-lg md:text-xl tracking-[2px]" style={{ color: 'var(--accent)' }}>{title}</div>
          <div className="game-menu-item text-lg" onClick={onClose}>✕</div>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ── Character Detail Modal ── */
function CharacterDetail() {
  const { player } = useGameStore();
  const { getDerived, getFameTitle } = require('@/store/useGameStore');
  const derived = getDerived(player);
  const hpPct = Math.round((player.hp / derived.maxHp) * 100);
  return (
    <div className="space-y-4 leading-8">
      <div className="mt-2">气血 {player.hp}/{derived.maxHp} <span style={{ color: 'var(--muted)' }}>({hpPct}%)</span></div>

      <div style={{ color: 'var(--accent)' }} className="mt-4 text-sm">— 基础属性 —</div>
      <div className="space-y-1 text-xs" style={{ color: 'var(--muted)' }}>
        <div>体魄 <span style={{ color: 'var(--foreground)' }}>{player.base.physique}</span> <span className="ml-2">— 气血上限、防御</span></div>
        <div>力量 <span style={{ color: 'var(--foreground)' }}>{player.base.strength}</span> <span className="ml-2">— 攻击伤害</span></div>
        <div>敏捷 <span style={{ color: 'var(--foreground)' }}>{player.base.agility}</span> <span className="ml-2">— 闪避</span></div>
        <div>智谋 <span style={{ color: 'var(--foreground)' }}>{player.base.intellect}</span> <span className="ml-2">— 事件判断</span></div>
        <div>洞察 <span style={{ color: 'var(--foreground)' }}>{player.base.perception}</span> <span className="ml-2">— 暴击率、命中</span></div>
        <div>意志 <span style={{ color: 'var(--foreground)' }}>{player.base.willpower}</span> <span className="ml-2">— 内力恢复</span></div>
      </div>

      <div style={{ color: 'var(--accent)' }} className="mt-4 text-sm">— 战斗属性 —</div>
      <div className="grid grid-cols-2 gap-1 text-xs" style={{ color: 'var(--muted)' }}>
        <div>攻击 {derived.attack}</div>
        <div>防御 {derived.defense}</div>
        <div>命中 {derived.accuracy}</div>
        <div>闪避 {derived.evasion}</div>
        <div>暴击 {derived.critRate}%</div>
        <div>金币 {player.gold}</div>
      </div>
    </div>
  );
}

/* ── Inventory Modal ── */
function InventoryPanel() {
  const { world, player } = useGameStore();
  const { useItem } = useGameStore();
  const items = world.inventory;

  if (items.length === 0) {
    return <div style={{ color: 'var(--muted)' }}>尚未收集到任何线索。</div>;
  }

  const rarityColor: Record<string, string> = { common: 'var(--muted)', rare: '#6bb3e8', legendary: '#e8a22e' };

  return (
    <div className="space-y-3">
      <div style={{ color: 'var(--muted)' }} className="text-sm mb-4">金币：{player.gold}</div>
      {items.map((item, i) => (
        <div key={`${item.id}-${i}`} className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid var(--panel-border)' }}>
          <div>
            <span style={{ color: rarityColor[item.rarity] ?? 'var(--foreground)' }}>{item.name}</span>
            <span className="ml-2 text-sm" style={{ color: 'var(--muted)' }}>{item.description}</span>
          </div>
          {item.type === 'potion' && (
            <div className="game-menu-item text-sm" onClick={() => useItem(item.id)}>使用</div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ── Log Panel ── */
function LogPanel() {
  const { world } = useGameStore();
  const logs = [...world.eventLog].reverse();

  return (
    <div className="space-y-2">
      {logs.map((line, i) => (
        <div key={i} style={{ color: i === 0 ? 'var(--foreground)' : 'var(--muted)', opacity: Math.max(0.4, 1 - i * 0.05) }}>
          {line}
        </div>
      ))}
    </div>
  );
}

/* ── Settings Panel ── */
function SettingsPanel() {
  const { reset, saveGame } = useGameStore();
  const [saved, setSaved] = React.useState(false);
  return (
    <div className="space-y-6">
      <div style={{ color: 'var(--muted)' }}>龙隐山河 v0.1</div>
      <div className="space-y-3">
        <div className="game-menu-item" onClick={() => { saveGame(); setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
          {saved ? '── 已保存 ──' : '手动保存'}
        </div>
        <div className="game-menu-item" onClick={() => { if (confirm('确定要重新开始吗？所有进度将丢失。')) reset(); }}>
          重新开始
        </div>
      </div>
      <div className="mt-8 text-sm" style={{ color: 'var(--muted)' }}>
        <p>操作说明：</p>
        <p className="mt-2">• 从左侧地图选择区域</p>
        <p>• 点击"探索此地"触发战斗或事件</p>
        <p>• 战斗全自动，无需操作</p>
        <p>• 探索度达到 80% 后可挑战 Boss</p>
        <p>• 击败 Boss 解锁下一区域</p>
        <p>• 10级/30级触发转职</p>
      </div>
    </div>
  );
}

/* ── Game Over Overlay ── */
function GameOverOverlay() {
  const { reset, startNewGame } = useGameStore();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.92)' }}>
      <div className="text-center space-y-8">
        <div className="text-3xl tracking-[6px]" style={{ color: '#8b3a3a' }}>你倒下了</div>
        <div style={{ color: 'var(--muted)' }}>深渊吞噬了一切...</div>
        <div className="mt-8 space-y-4">
          <div className="game-menu-item text-lg" onClick={startNewGame}>↻ 重新冒险</div>
          <div className="game-menu-item text-lg" onClick={reset}>返回标题</div>
        </div>
      </div>
    </div>
  );
}

/* ── Promotion Overlay ── */

