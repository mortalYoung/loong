import { create } from 'zustand';
import type { ChapterId } from '@/game/data/gameData';

// ── Types ──────────────────────────────────────────────────────────────────

export type GameStatus = 'START' | 'TITLE' | 'WORLDMAP' | 'COMBAT' | 'EVENT' | 'SKILL_TREE' | 'GAMEOVER' | 'VICTORY';

// Keep AreaId as alias for backward compat with CombatEnemy.areaId
export type AreaId = ChapterId;

// ── Derived stat calculator ──
export function getDerived(player: PlayerStats): DerivedStats {
  const { physique, strength, agility, intellect, perception, willpower } = player.base;
  return {
    maxHp: physique * 10,
    maxMp: willpower * 8,
    attack: strength * 2 + player.equipAttack,
    defense: physique + player.equipDefense,
    accuracy: agility + perception,
    evasion: agility * 2,
    critRate: Math.floor(perception / 2),
    actionPower: 8, // fixed daily max
    carry: strength * 5,
  };
}

// ── Fame display name ──
export function getFameTitle(fame: number): string {
  if (fame >= 90) return '名震天下';
  if (fame >= 70) return '江湖闻名';
  if (fame >= 50) return '声名鹊起';
  if (fame >= 30) return '崭露头角';
  if (fame >= 20) return '小有名气';
  if (fame >= 10) return '略有耳闻';
  return '默默无闻';
}

export interface Item {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'potion' | 'relic' | 'key';
  effect?: {
    stat: 'attack' | 'defense' | 'hp' | 'maxHp' | 'speed';
    value: number;
  };
  rarity: 'common' | 'rare' | 'legendary';
}

// ── 基础属性 ──
export interface BaseStats {
  physique: number;   // 体魄 (初始8)
  strength: number;   // 力量 (初始7)
  agility: number;    // 敏捷 (初始8)
  intellect: number;  // 智谋 (初始7)
  perception: number; // 洞察 (初始8)
  willpower: number;  // 意志 (初始7)
}

// ── 其他属性 ──
export interface OtherStats {
  luck: number;       // 幸运 0-100 (初始20)
  reputation: number; // 声望 0-100 (初始10)
  fame: number;       // 名望 0-100 (初始0)
}

// ── 衍生属性（由基础属性计算）──
export interface DerivedStats {
  maxHp: number;      // 体魄×10
  maxMp: number;      // 意志×8
  attack: number;     // 力量×2 + equipBonus
  defense: number;    // 体魄 + equipBonus
  accuracy: number;   // 敏捷 + 洞察
  evasion: number;    // 敏捷×2
  critRate: number;   // 洞察÷2 (%)
  actionPower: number;// 敏捷 + 意志 (每日行动力上限)
  carry: number;      // 力量×5
}

// ── 基础技能（5档位 × 100熟练度）──
import { roundProficiency } from '@/game/data/skillData';
import type { SkillState, BaseSkillId } from '@/game/data/skillData';
export type { BaseSkillId };

export interface SkillProficiency {
  sword: SkillState;     // 基础剑法
  agility: SkillState;   // 基础身法
  body: SkillState;      // 基础体魄
  mind: SkillState;      // 基础心法
  insight: SkillState;   // 基础战悟
}

export interface PlayerStats {
  // 基础属性
  base: BaseStats;
  // 其他属性
  other: OtherStats;
  // 装备加成（影响衍生属性）
  equipAttack: number;
  equipDefense: number;
  // 当前状态
  hp: number;
  mp: number;
  stamina: number;       // 当前行动力
  gold: number;
  // 技能系统
  skills: SkillProficiency;       // 6项基础技能熟练度
  unlockedPassives: string[];     // 已解锁的被动技能ID
}

export interface CombatEnemy {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  description: string;
  isBoss: boolean;
  areaId: ChapterId;
  reward: { exp: number; gold: number; itemChance: number; itemId?: string };
  requiresEvent?: string; // only appears in pool after this event ID is completed
}

export interface CombatState {
  enemy: CombatEnemy | null;
  playerTurn: boolean;
  log: string[];
  combatPhase: 'IDLE' | 'PLAYER_TURN' | 'ENEMY_TURN' | 'WIN' | 'LOSE';
  selectedAction: number;
  isAnimating: boolean;
  // Combat stats for skill growth
  attackCount: number;
  critCount: number;
  dodgeCount: number;
  hitsTaken: number;
  roundCount: number;
}

export type EventCategory = 'unique' | 'repeatable' | 'rare' | 'chain';

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  areaId: ChapterId;
  category: EventCategory;
  chainNext?: string;        // chain event: next event ID in sequence
  chainRequires?: string;    // chain event: previous event ID that must be completed
  requiresItems?: string[];  // only appears if ALL these items are in inventory
  minExploration?: number;   // only appears if chapter exploration >= this value
  requiresWeather?: string;  // only appears if current weather matches (e.g. '微雨', '晴')
  weight?: number;           // selection weight (default 1; rare events use lower values)
  options: EventOption[];
}

export interface EventOption {
  id: string;
  text: string;
  successRate: number; // base % (0-100)
  dynamicRate?: 'exploration'; // if set, successRate is overridden by exploration % of current chapter
  skillBonus: { skill: string; bonus: number }[]; // learned skill → extra %
  success: EventOutcome;
  failure: EventOutcome;
}

export interface EventOutcome {
  text: string;
  effect?: 'heal' | 'damage' | 'gold' | 'item' | 'discover' | 'combat' | 'stat_up' | 'skill_up' | 'rumor' | 'gossip' | 'breakthrough' | 'nothing';
  value?: number;
  itemId?: string;
  discoverId?: string; // chapter ID to discover when effect='discover'
  enemyId?: string;    // enemy ID to start combat when effect='combat'
  skillId?: string;    // base skill ID for skill_up effect (e.g. 'swordplay')
  goldChange?: number; // additional gold change alongside main effect (e.g. -8 for buying)
}

export interface WorldState {
  // Journey system: chapters the player has discovered/completed
  discoveredChapters: ChapterId[];   // chapters player knows about (can enter)
  currentChapter: ChapterId | null;  // chapter player is currently in
  completedChapters: ChapterId[];    // chapters with 100% exploration
  explorationMap: Partial<Record<ChapterId, number>>; // 0-100 per chapter
  // Event tracking
  completedEventIds: string[];       // unique/chain events already triggered (won't repeat)
  heardRumors: string[];             // rumors already heard (for exploration bonus)
  // Time
  day: number;                       // 当前天数（从1开始）
  // Inventory
  collectedItems: string[]; // item IDs ever obtained
  inventory: Item[];
  // Log
  eventLog: string[];
}

interface GameStoreState {
  // Core
  gameState: GameStatus;
  player: PlayerStats;
  world: WorldState;
  combat: CombatState;
  currentEvent: GameEvent | null;
  pendingAreaUnlock: ChapterId | null;

  // Actions
  setGameState: (state: GameStatus) => void;
  startNewGame: () => void;
  reset: () => void;
  saveGame: () => void;
  loadGame: () => boolean; // returns false if no save exists

  // 技能
  addProficiency: (skill: BaseSkillId, amount: number) => void;
  unlockPassive: (passiveId: string) => void;
  breakthroughSkill: (skill: BaseSkillId) => boolean;
  startBreakthroughEvent: (skill: BaseSkillId) => void;

  // World / Journey
  setCurrentChapter: (chapter: ChapterId) => void;
  discoverChapter: (chapter: ChapterId) => void;
  addExploration: (chapter: ChapterId, amount: number) => void;

  // Inventory
  addItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  useItem: (itemId: string) => void;
  addGold: (amount: number) => void;

  // Combat
  startCombat: (enemy: CombatEnemy) => void;
  playerAttack: () => void;
  playerDefend: () => void;
  playerFlee: () => boolean;
  playerUseItem: (itemId: string) => void;
  enemyTurn: () => void;
  endCombat: (won: boolean) => void;

  appendCombatLog: (line: string) => void;
  setCombatPhase: (phase: CombatState['combatPhase']) => void;
  setIsAnimating: (v: boolean) => void;

  // Stamina & Day
  consumeStamina: (amount?: number) => void;
  advanceDay: () => void;
  restAtInn: () => void;
  restOnStreet: () => void;

  // Events
  startEvent: (event: GameEvent) => void;
  resolveEvent: (choiceIndex: number) => void;
  addEventLog: (line: string) => void;

  // HUD
  clearCombatLog: () => void;
}

// ── Initial values ─────────────────────────────────────────────────────────

const INITIAL_PLAYER: PlayerStats = {
  base: { physique: 8, strength: 7, agility: 8, intellect: 7, perception: 8, willpower: 7 },
  other: { luck: 20, reputation: 10, fame: 0 },
  equipAttack: 0,
  equipDefense: 0,
  hp: 80,       // physique(8) × 10
  mp: 56,       // willpower(7) × 8
  stamina: 8,   // fixed daily max: 8
  gold: 20,
  skills: {
    sword: { tier: 0, proficiency: 0 },
    agility: { tier: 0, proficiency: 0 },
    body: { tier: 0, proficiency: 0 },
    mind: { tier: 0, proficiency: 0 },
    insight: { tier: 0, proficiency: 0 },
  },
  unlockedPassives: [],
};

const INITIAL_WORLD: WorldState = {
  discoveredChapters: ['qingshi'],
  currentChapter: 'qingshi',
  completedChapters: [],
  explorationMap: {},
  completedEventIds: [],
  heardRumors: [],
  day: 1,
  collectedItems: [],
  inventory: [],
  eventLog: ['建文元年二月初六 — 你的冒险就此开始...'],
};

const INITIAL_COMBAT: CombatState = {
  enemy: null,
  playerTurn: true,
  log: [],
  combatPhase: 'IDLE',
  selectedAction: 0,
  isAnimating: false,
  attackCount: 0,
  critCount: 0,
  dodgeCount: 0,
  hitsTaken: 0,
  roundCount: 0,
};

// ── Store ──────────────────────────────────────────────────────────────────

export const useGameStore = create<GameStoreState>((set, get) => ({
  gameState: 'TITLE',
  player: { ...INITIAL_PLAYER },
  world: { ...INITIAL_WORLD },
  combat: { ...INITIAL_COMBAT },
  currentEvent: null,
  pendingAreaUnlock: null,

  setGameState: (state) => set({ gameState: state }),

  startNewGame: () =>
    set({
      gameState: 'WORLDMAP',
      player: { ...INITIAL_PLAYER },
      world: { ...INITIAL_WORLD, eventLog: ['建文元年二月初六 — 师父已离开数月，是时候去寻找答案了。'] },
      combat: { ...INITIAL_COMBAT },
      currentEvent: null,
      pendingAreaUnlock: null,
    }),

  reset: () => {
    localStorage.removeItem('longyinSave');
    set({
      gameState: 'TITLE',
      player: { ...INITIAL_PLAYER },
      world: { ...INITIAL_WORLD },
      combat: { ...INITIAL_COMBAT },
      currentEvent: null,
    });
  },

  saveGame: () => {
    const { player, world } = get();
    const saveData = { player, world, version: 1 };
    try { localStorage.setItem('longyinSave', JSON.stringify(saveData)); } catch {}
  },

  loadGame: () => {
    try {
      const raw = localStorage.getItem('longyinSave');
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (!data.player || !data.world) return false;
      set({
        gameState: 'WORLDMAP',
        player: data.player,
        world: data.world,
        combat: { ...INITIAL_COMBAT },
        currentEvent: null,
      });
      return true;
    } catch { return false; }
  },

  // ── World / Journey ──────────────────────────────────────────────────────

  setCurrentChapter: (chapter) =>
    set((s) => ({ world: { ...s.world, currentChapter: chapter } })),

  discoverChapter: (chapter) =>
    set((s) => ({
      world: {
        ...s.world,
        discoveredChapters: s.world.discoveredChapters.includes(chapter)
          ? s.world.discoveredChapters
          : [...s.world.discoveredChapters, chapter],
        eventLog: [...s.world.eventLog, `※ 发现了新的章节：${chapter}`].slice(-30),
      },
    })),

  addExploration: (chapter, amount) =>
    set((s) => {
      const prev = s.world.explorationMap[chapter] ?? 0;
      const next = Math.min(100, Math.round((prev + amount) * 10) / 10);
      const justCompleted = prev < 100 && next >= 100;
      const newCompleted = justCompleted && !s.world.completedChapters.includes(chapter)
        ? [...s.world.completedChapters, chapter]
        : s.world.completedChapters;
      return {
        world: {
          ...s.world,
          explorationMap: { ...s.world.explorationMap, [chapter]: next },
          completedChapters: newCompleted,
        },
      };
    }),

  // ── Inventory ────────────────────────────────────────────────────────────

  addItem: (item) =>
    set((s) => ({
      world: {
        ...s.world,
        inventory: [...s.world.inventory, item],
        collectedItems: [...s.world.collectedItems, item.id],
        eventLog: [...s.world.eventLog, `获得道具：[${item.rarity}] ${item.name}`].slice(-30),
      },
    })),

  removeItem: (itemId) =>
    set((s) => ({
      world: {
        ...s.world,
        inventory: s.world.inventory.filter((i) => i.id !== itemId),
      },
    })),

  useItem: (itemId) => {
    const state = get();
    const item = state.world.inventory.find((i) => i.id === itemId);
    if (!item || !item.effect) return;
    const p = { ...state.player, base: { ...state.player.base } };
    const derived = getDerived(p);
    if (item.effect.stat === 'hp') {
      p.hp = Math.min(derived.maxHp, p.hp + item.effect.value);
    } else if (item.effect.stat === 'maxHp') {
      p.base.physique += Math.ceil(item.effect.value / 10); // +maxHp via physique
      p.hp = Math.min(getDerived(p).maxHp, p.hp + item.effect.value);
    } else if (item.effect.stat === 'attack') {
      p.equipAttack += item.effect.value;
    } else if (item.effect.stat === 'defense') {
      p.equipDefense += item.effect.value;
    } else if (item.effect.stat === 'speed') {
      p.base.agility += Math.ceil(item.effect.value / 2);
    }
    const newInventory = state.world.inventory.filter((i) => i.id !== itemId);
    set({
      player: p,
      world: {
        ...state.world,
        inventory: newInventory,
        eventLog: [...state.world.eventLog, `使用了 ${item.name}。`].slice(-30),
      },
    });
  },

  addGold: (amount) =>
    set((s) => ({ player: { ...s.player, gold: s.player.gold + amount } })),

  // ── Combat ───────────────────────────────────────────────────────────────

  startCombat: (enemy) => {
    set((s) => ({
      player: { ...s.player, stamina: Math.max(0, s.player.stamina - 1) },
      combat: {
        ...INITIAL_COMBAT,
        enemy: { ...enemy },
        combatPhase: 'PLAYER_TURN',
        log: [`「刃」${enemy.name} 出现了！`, ...(enemy.isBoss ? ['※ BOSS 战斗！'] : [])],
      },
      gameState: 'COMBAT',
    }));
  },

  playerAttack: () => {
    const { player, combat } = get();
    if (!combat.enemy || combat.combatPhase !== 'PLAYER_TURN') return;
    const derived = getDerived(player);
    // Attack roll
    const atkRoll = derived.attack * normalRand(1.0, 0.12, 0.7, 1.3);
    const defRoll = combat.enemy.defense * normalRand(0.9, 0.08, 0.7, 1.0);
    let dmg = Math.max(1, Math.round(atkRoll - defRoll));
    // Crit: critRate is percentage (e.g. 4 means 4%)
    const isCrit = Math.random() * 100 < derived.critRate;
    if (isCrit) dmg = dmg * 2;
    const newHp = Math.max(0, combat.enemy.hp - dmg);
    const won = newHp <= 0;
    set((s) => ({
      combat: {
        ...s.combat,
        enemy: s.combat.enemy ? { ...s.combat.enemy, hp: newHp } : null,
        combatPhase: won ? 'WIN' : 'ENEMY_TURN',
        attackCount: s.combat.attackCount + 1,
        critCount: s.combat.critCount + (isCrit ? 1 : 0),
        log: [...s.combat.log, isCrit
          ? `「刃」暴击！你造成了 ${dmg} 点伤害！`
          : `「刃」你造成了 ${dmg} 点伤害！`].slice(-8),
      },
    }));
  },

  playerDefend: () => {
    set((s) => ({
      combat: {
        ...s.combat,
        combatPhase: 'ENEMY_TURN',
        log: [...s.combat.log, '「盾」你摆出防御姿态！本回合防御 +4。'].slice(-8),
      },
    }));
  },

  playerFlee: () => {
    const { player, combat } = get();
    if (!combat.enemy) return false;
    const derived = getDerived(player);
    const chance = derived.evasion > combat.enemy.speed * 2 ? 0.75 : 0.4;
    const success = Math.random() < chance;
    if (success) {
      set((s) => ({
        combat: { ...s.combat, combatPhase: 'IDLE', log: [] },
        gameState: 'WORLDMAP',
        world: {
          ...s.world,
          eventLog: [...s.world.eventLog, `成功从 ${s.combat.enemy?.name ?? '敌人'} 处逃脱。`].slice(-30),
        },
      }));
    } else {
      set((s) => ({
        combat: {
          ...s.combat,
          combatPhase: 'ENEMY_TURN',
          log: [...s.combat.log, '「避」逃跑失败！'].slice(-8),
        },
      }));
    }
    return success;
  },

  playerUseItem: (itemId) => {
    const { world, combat } = get();
    const item = world.inventory.find((i) => i.id === itemId);
    if (!item) return;
    get().useItem(itemId);
    set((s) => ({
      combat: {
        ...s.combat,
        combatPhase: 'ENEMY_TURN',
        log: [...s.combat.log, `「用」使用了 ${item.name}。`].slice(-8),
      },
    }));
  },

  enemyTurn: () => {
    const { player, combat } = get();
    if (!combat.enemy || combat.combatPhase !== 'ENEMY_TURN') return;
    const derived = getDerived(player);
    // Evasion: evasion / (evasion + enemy_accuracy), capped 5-40%
    const enemyAcc = combat.enemy.speed + 10; // simple enemy accuracy
    const evadeChance = Math.min(0.4, Math.max(0.05, derived.evasion / (derived.evasion + enemyAcc)));
    if (Math.random() < evadeChance) {
      set((s) => ({
        combat: {
          ...s.combat,
          combatPhase: 'PLAYER_TURN',
          dodgeCount: s.combat.dodgeCount + 1,
          roundCount: s.combat.roundCount + 1,
          log: [...s.combat.log, `「避」你闪避了 ${s.combat.enemy!.name} 的攻击！`].slice(-8),
        },
      }));
      return;
    }
    const defending = combat.log.some((l) => l.includes('防御姿态'));
    const effectiveDef = derived.defense + (defending ? 4 : 0);
    const atkRoll = combat.enemy.attack * normalRand(1.0, 0.10, 0.75, 1.25);
    const defRoll = effectiveDef * normalRand(0.9, 0.08, 0.7, 1.0);
    const dmg = Math.max(1, Math.round(atkRoll - defRoll));
    const newHp = Math.max(0, player.hp - dmg);
    const lost = newHp <= 0;

    set((s) => ({
      player: { ...s.player, hp: newHp },
      combat: {
        ...s.combat,
        combatPhase: lost ? 'LOSE' : 'PLAYER_TURN',
        hitsTaken: s.combat.hitsTaken + 1,
        roundCount: s.combat.roundCount + 1,
        log: [
          ...s.combat.log,
          `「伤」${s.combat.enemy!.name} 对你造成 ${dmg} 点伤害！`,
        ].slice(-8),
      },
    }));
  },

  endCombat: (won) => {
    const { combat, world } = get();
    const enemy = combat.enemy;
    if (!enemy) return;
    if (won) {
      const { player: p2 } = get();
      // EXP/Gold: normal distribution with luck bonus
      const luckBonus = p2.other.luck * 0.002;
      const actualGold = Math.max(1, Math.round(enemy.reward.gold * normalRand(1.0, 0.06, 0.85 + luckBonus, 1.15 + luckBonus)));
      get().addGold(actualGold);
      // Item drop
      if (enemy.reward.itemId && Math.random() < enemy.reward.itemChance) {
        const { getItem } = require('@/game/data/gameData');
        const dropItem = getItem(enemy.reward.itemId);
        if (dropItem && !get().world.inventory.some((i) => i.id === enemy.reward.itemId)) {
          set((s) => ({ world: { ...s.world, inventory: [...s.world.inventory, dropItem] } }));
        }
      }
      // Skill growth based on combat stats
      const { calcCombatGrowth } = require('@/game/data/skillData');
      const growth = calcCombatGrowth({
        attackCount: combat.attackCount,
        critCount: combat.critCount,
        dodgeCount: combat.dodgeCount,
        hitsTaken: combat.hitsTaken,
        roundCount: combat.roundCount,
        won: true,
        isBoss: enemy.isBoss,
      });
      if (growth.sword > 0) get().addProficiency('sword', growth.sword);
      if (growth.agility > 0) get().addProficiency('agility', growth.agility);
      if (growth.body > 0) get().addProficiency('body', growth.body);
      if (growth.mind > 0) get().addProficiency('mind', growth.mind);
      if (growth.insight > 0) get().addProficiency('insight', growth.insight);
      // Exploration gain: 0-1% per combat (boss and normal same)
      const exploGain = Math.round(normalRand(0.5, 0.2, 0, 1) * 10) / 10;
      if (exploGain > 0) get().addExploration(enemy.areaId, exploGain);
      // Breakthrough combat: defeating the elder → phase 3 narrative (no WORLDMAP flash)
      if (enemy.id === 'sword_elder') {
        get().breakthroughSkill('sword');
        const { BREAKTHROUGH_EVENTS } = require('@/game/data/breakthroughEvents');
        set((s) => ({ combat: { ...INITIAL_COMBAT } }));
        if (BREAKTHROUGH_EVENTS['sword_3']) {
          setTimeout(() => set({ currentEvent: BREAKTHROUGH_EVENTS['sword_3'], gameState: 'EVENT' }), 600);
          return;
        }
      }
      // Defeating a boss unlocks the next chapter
      if (enemy.isBoss) {
        const { getNextChapter } = require('@/game/data/gameData');
        const next = getNextChapter(enemy.areaId);
        if (next && !get().world.discoveredChapters.includes(next)) {
          setTimeout(() => get().discoverChapter(next), 500);
        }
      }
      // Decide if a random event triggers (40% chance, skip after boss)
      let nextEvent: GameEvent | null = null;
      if (!enemy.isBoss && Math.random() < 0.40) {
        const { pickRandomEvent, getWeatherForDay } = require('@/game/data/gameData');
        const completedIds = get().world.completedEventIds;
        const inventoryIds = get().world.inventory.map((i) => i.id);
        const explo = get().world.explorationMap[enemy.areaId] ?? 0;
        const weather = getWeatherForDay(get().world.day);
        nextEvent = pickRandomEvent(enemy.areaId, completedIds, inventoryIds, explo, weather);
      }

      set((s) => ({
        world: {
          ...s.world,
          eventLog: [
            ...s.world.eventLog,
            `击败了 ${enemy.name}！+${actualGold} 金币。`,
          ].slice(-30),
        },
        combat: { ...INITIAL_COMBAT },
        // Go directly to EVENT if one triggered, skip WORLDMAP flash
        gameState: nextEvent ? 'EVENT' : 'WORLDMAP',
        currentEvent: nextEvent,
      }));


    } else {
      set({
        gameState: 'GAMEOVER',
        combat: { ...INITIAL_COMBAT },
      });
    }
    void world;
  },



  appendCombatLog: (line) =>
    set((s) => ({
      combat: { ...s.combat, log: [...s.combat.log, line].slice(-8) },
    })),

  setCombatPhase: (phase) =>
    set((s) => ({ combat: { ...s.combat, combatPhase: phase } })),

  setIsAnimating: (v) =>
    set((s) => ({ combat: { ...s.combat, isAnimating: v } })),

  // ── Stamina & Day ───────────────────────────────────────────────────────

  consumeStamina: (amount = 1) => {
    const { player } = get();
    const newStamina = Math.max(0, player.stamina - amount);
    set((s) => ({ player: { ...s.player, stamina: newStamina } }));
  },

  advanceDay: () => {
    const { player, world } = get();
    const derived = getDerived(player);
    const newDay = world.day + 1;
    set((s) => ({
      player: {
        ...s.player,
        hp: derived.maxHp,
        mp: derived.maxMp,
        stamina: derived.actionPower,
      },
      world: {
        ...s.world,
        day: newDay,
        eventLog: [...s.world.eventLog, `── 第 ${newDay} 天 ── 你休息了一晚，恢复了全部体力。`].slice(-30),
      },
    }));
  },

  restAtInn: () => {
    const { player, world } = get();
    if (player.gold < 10) return;
    const derived = getDerived(player);
    const newDay = world.day + 1;
    set((s) => ({
      player: {
        ...s.player,
        hp: derived.maxHp,
        mp: derived.maxMp,
        stamina: derived.actionPower,
        gold: s.player.gold - 10,
      },
      world: {
        ...s.world,
        day: newDay,
        eventLog: [...s.world.eventLog, `── 第 ${newDay} 天 ── 你在客栈美美睡了一觉，精神焕发。(-10金)`].slice(-30),
      },
    }));
  },

  restOnStreet: () => {
    const { player, world } = get();
    const derived = getDerived(player);
    const newDay = world.day + 1;
    const recoveredHp = Math.min(derived.maxHp, Math.round(derived.maxHp * 0.5));
    const recoveredStamina = Math.round(derived.actionPower * 0.7);
    set((s) => ({
      player: {
        ...s.player,
        hp: Math.min(derived.maxHp, s.player.hp + recoveredHp),
        mp: Math.min(derived.maxMp, s.player.mp + Math.round(derived.maxMp * 0.5)),
        stamina: recoveredStamina,
      },
      world: {
        ...s.world,
        day: newDay,
        eventLog: [...s.world.eventLog, `── 第 ${newDay} 天 ── 你在街头角落勉强睡了一夜，身体酸痛。`].slice(-30),
      },
    }));
  },

  // ── Events ───────────────────────────────────────────────────────────────

  startEvent: (event) => set({ currentEvent: event, gameState: 'EVENT' }),

  resolveEvent: (choiceIndex) => {
    const { currentEvent, player, world } = get();
    if (!currentEvent) return;
    const option = currentEvent.options[choiceIndex];
    if (!option) return;

    // Calculate effective success rate = base + skill bonuses
    let rate = option.successRate;
    // Dynamic rate: override with exploration % of current chapter
    if (option.dynamicRate === 'exploration' && currentEvent.areaId) {
      rate = world.explorationMap[currentEvent.areaId] ?? 0.5;
    }
    for (const sb of option.skillBonus) {
      // skillBonus checks base skill tier: if tier >= 1 (熟练), apply bonus
      const skillState = player.skills[sb.skill as BaseSkillId];
      if (skillState && skillState.tier >= 1) rate += sb.bonus;
    }
    rate = Math.min(100, Math.max(0, rate));

    // Roll
    const roll = Math.random() * 100;
    const succeeded = roll < rate;
    const outcome = succeeded ? option.success : option.failure;

    // Apply effect
    let newPlayer = { ...player };
    let newGold = player.gold;
    let logEntry = `${succeeded ? '「得」' : '「失」'} ${outcome.text}`;

    if (outcome.effect === 'heal') {
      newPlayer.hp = Math.min(getDerived(newPlayer).maxHp, newPlayer.hp + (outcome.value ?? 20));
    } else if (outcome.effect === 'damage') {
      newPlayer.hp = Math.max(0, newPlayer.hp - (outcome.value ?? 10));
    } else if (outcome.effect === 'gold') {
      newGold += outcome.value ?? 10;
    } else if (outcome.effect === 'item' && outcome.itemId) {
      // Add item to inventory if not already present
      const { getItem } = require('@/game/data/gameData');
      const itemDef = getItem(outcome.itemId);
      if (itemDef && !world.inventory.some((i) => i.id === outcome.itemId)) {
        setTimeout(() => {
          const s = get();
          set({ world: { ...s.world, inventory: [...s.world.inventory, itemDef] } });
        }, 100);
      }
    } else if (outcome.effect === 'discover' && outcome.discoverId) {
      // Discover a new chapter
      const chId = outcome.discoverId as ChapterId;
      if (!world.discoveredChapters.includes(chId)) {
        setTimeout(() => get().discoverChapter(chId), 300);
      }
    } else if (outcome.effect === 'combat' && outcome.enemyId) {
      // Trigger a combat from event
      const { ALL_ENEMIES } = require('@/game/data/gameData');
      const enemy = ALL_ENEMIES.find((e: CombatEnemy) => e.id === outcome.enemyId);
      if (enemy) {
        setTimeout(() => get().startCombat(enemy), 500);
      }
    } else if (outcome.effect === 'stat_up') {
      // Random base stat +1
      const stats: (keyof BaseStats)[] = ['physique', 'strength', 'agility', 'intellect', 'perception', 'willpower'];
      const stat = stats[Math.floor(Math.random() * stats.length)];
      newPlayer = { ...newPlayer, base: { ...newPlayer.base, [stat]: newPlayer.base[stat] + 1 } };
    } else if (outcome.effect === 'skill_up' && outcome.skillId) {
      // Add proficiency to a specific base skill
      const skillKey = outcome.skillId as BaseSkillId;
      const gain = outcome.value ?? 3;
      setTimeout(() => get().addProficiency(skillKey, gain), 100);
    } else if (outcome.effect === 'breakthrough' && outcome.skillId) {
      // Complete a skill breakthrough (pure narrative)
      const skillKey = outcome.skillId as BaseSkillId;
      setTimeout(() => {
        get().breakthroughSkill(skillKey);
        const s = get();
        const SKILL_NAMES: Record<string, string> = { sword: '剑法', agility: '身法', body: '体魄', mind: '心法', insight: '战悟' };
        set({ world: { ...s.world, eventLog: [...s.world.eventLog, `※ 基础${SKILL_NAMES[skillKey] ?? skillKey}突破！`].slice(-30) } });
      }, 100);
    } else if (outcome.effect === 'rumor') {
      // Get random rumor; new rumor gives +0.5 exploration
      const { getRandomRumor } = require('@/game/data/gameData');
      const rumor = getRandomRumor();
      const isNew = !world.heardRumors.includes(rumor);
      logEntry = `「闻」${rumor}`;
      if (isNew && currentEvent.areaId) {
        setTimeout(() => {
          const s = get();
          set({ world: { ...s.world, heardRumors: [...s.world.heardRumors, rumor] } });
          get().addExploration(currentEvent.areaId, 0.5);
        }, 100);
      }
    } else if (outcome.effect === 'gossip') {
      // Get random gossip; always +0.1 exploration
      const { getRandomGossip } = require('@/game/data/gameData');
      const gossip = getRandomGossip();
      logEntry = `「话」${gossip}`;
      if (currentEvent.areaId) {
        setTimeout(() => get().addExploration(currentEvent.areaId, 0.1), 100);
      }
    }

    // Apply goldChange if present (e.g. buying items costs gold alongside main effect)
    if (outcome.goldChange) {
      newGold += outcome.goldChange;
    }

    const lost = newPlayer.hp <= 0;

    // Mark unique/chain events as completed so they don't repeat
    const shouldTrack = currentEvent.category === 'unique' || currentEvent.category === 'chain';
    const updatedCompletedEvents = shouldTrack && !world.completedEventIds.includes(currentEvent.id)
      ? [...world.completedEventIds, currentEvent.id]
      : world.completedEventIds;

    set((s) => ({
      player: { ...newPlayer, gold: newGold },
      world: {
        ...s.world,
        completedEventIds: updatedCompletedEvents,
        eventLog: [...s.world.eventLog, logEntry].slice(-30),
      },
      currentEvent: null,
      gameState: lost ? 'GAMEOVER' : 'WORLDMAP',
    }));

    // Breakthrough event chaining: skip log, skip WORLDMAP flash, go directly to next phase
    if (currentEvent.id.startsWith('bt_') && option.id !== 'leave' && option.id !== 'continue') {
      const { BREAKTHROUGH_EVENTS, BT_CHAIN_MAP } = require('@/game/data/breakthroughEvents');
      const key = `${currentEvent.id}:${option.id}`;
      const nextPhaseKey = BT_CHAIN_MAP[key];
      if (nextPhaseKey && BREAKTHROUGH_EVENTS[nextPhaseKey]) {
        set({ currentEvent: BREAKTHROUGH_EVENTS[nextPhaseKey], gameState: 'EVENT' });
        return;
      }
    }

    // Events also grant exploration progress (0-1%)
    if (!lost && currentEvent.areaId) {
      const exploGain = Math.round(normalRand(0.5, 0.2, 0, 1) * 10) / 10;
      if (exploGain > 0) get().addExploration(currentEvent.areaId, exploGain);
    }
  },

  addEventLog: (line) =>
    set((s) => ({
      world: {
        ...s.world,
        eventLog: [...s.world.eventLog, line].slice(-30),
      },
    })),

  // ── HUD ──────────────────────────────────────────────────────────────────

  clearCombatLog: () =>
    set((s) => ({ combat: { ...s.combat, log: [] } })),

  // ── 技能 ──────────────────────────────────────────────────────────────────

  addProficiency: (skill, amount) => {
    set((s) => {
      const current = s.player.skills[skill];
      if (!current) return s;
      // Allow overflow beyond 100 (resolved on breakthrough)
      const newProficiency = roundProficiency(current.proficiency + amount);
      const newSkills = { ...s.player.skills, [skill]: { ...current, proficiency: newProficiency } };
      return { player: { ...s.player, skills: newSkills } };
    });
  },

  unlockPassive: (passiveId) => {
    set((s) => {
      if (s.player.unlockedPassives.includes(passiveId)) return s;
      return { player: { ...s.player, unlockedPassives: [...s.player.unlockedPassives, passiveId] } } as any;
    });
  },

  breakthroughSkill: (skill) => {
    const { player } = get();
    const { canBreakthrough, doBreakthrough, TIER_BONUSES } = require('@/game/data/skillData');
    const current = player.skills[skill];
    if (!current || !canBreakthrough(current)) return false;
    const oldTier = current.tier;
    const newState = doBreakthrough(current);
    // Apply stat bonus for reaching new tier
    const bonuses = TIER_BONUSES[skill];
    const bonus = bonuses?.[oldTier]; // index 0 = first breakthrough (tier 0→1)
    let newBase = { ...player.base };
    if (bonus) {
      newBase = { ...newBase, [bonus.stat]: (newBase as any)[bonus.stat] + bonus.value };
    }
    set((s) => ({
      player: { ...s.player, skills: { ...s.player.skills, [skill]: newState }, base: newBase },
    }));
    return true;
  },

  startBreakthroughEvent: (skill) => {
    // Trigger the breakthrough event for a skill (does not consume stamina)
    const { BREAKTHROUGH_EVENTS } = require('@/game/data/breakthroughEvents');
    const event = BREAKTHROUGH_EVENTS[skill];
    if (!event) return;
    set({ currentEvent: event, gameState: 'EVENT' });
  },
}));

// Box-Muller normal distribution: mean=0, stddev=1
function boxMuller(): number {
  const u = 1 - Math.random();
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

// Normal random clamped to [min, max]
function normalRand(mean: number, stddev: number, min: number, max: number): number {
  const v = mean + boxMuller() * stddev;
  return Math.max(min, Math.min(max, v));
}

// Integer uniform (kept for discrete picks)
function Phaser_rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
