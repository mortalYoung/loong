// ── 技能系统：5 档位，每档 100 熟练度 ──

export type SkillTier = 0 | 1 | 2 | 3 | 4;
export type BaseSkillId = 'sword' | 'agility' | 'body' | 'mind' | 'insight';

export const TIER_NAMES: string[] = ['入门', '熟练', '精通', '大成', '宗师'];
export const MAX_TIER: SkillTier = 4;
export const MAX_PROFICIENCY = 100;
export const PROFICIENCY_DECIMALS = 1;

export function roundProficiency(value: number): number {
  const factor = 10 ** PROFICIENCY_DECIMALS;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

export function formatProficiency(value: number): string {
  return roundProficiency(value).toFixed(PROFICIENCY_DECIMALS);
}

export interface SkillState {
  tier: SkillTier;
  proficiency: number;
}

export interface BaseSkillDef {
  id: BaseSkillId;
  name: string;
  description: string;
  growthDesc: string;
}

export const BASE_SKILLS: BaseSkillDef[] = [
  { id: 'sword', name: '基础剑法', description: '剑术攻防根基，影响攻击伤害。', growthDesc: '每次攻击、暴击、战胜敌人' },
  { id: 'agility', name: '基础身法', description: '身形步法根基，影响闪避能力。', growthDesc: '每次闪避、每场战斗' },
  { id: 'body', name: '基础体魄', description: '体质筋骨根基，影响生命防御。', growthDesc: '每次受伤、每场战斗胜利' },
  { id: 'mind', name: '基础心法', description: '内息运转根基，影响内力恢复。', growthDesc: '战斗胜利、经过回合' },
  { id: 'insight', name: '基础战悟', description: '战场感悟根基，影响暴击和判断。', growthDesc: '暴击、闪避、战斗胜利' },
];

export const BASE_SKILL_NAMES: Record<BaseSkillId, string> = {
  sword: '基础剑法',
  agility: '基础身法',
  body: '基础体魄',
  mind: '基础心法',
  insight: '基础战悟',
};

export const BONUS_STAT_NAMES: Record<string, string> = {
  strength: '力量',
  agility: '敏捷',
  physique: '体魄',
  willpower: '意志',
  perception: '洞察',
};

export function getTierName(tier: SkillTier): string {
  return TIER_NAMES[tier] ?? '入门';
}

export function canBreakthrough(skill: SkillState): boolean {
  return skill.proficiency >= MAX_PROFICIENCY && skill.tier < MAX_TIER;
}

export function doBreakthrough(skill: SkillState): SkillState {
  if (!canBreakthrough(skill)) return skill;
  return { tier: (skill.tier + 1) as SkillTier, proficiency: roundProficiency(skill.proficiency - MAX_PROFICIENCY) };
}

export function meetsRequirement(skill: SkillState, requiredTier: SkillTier): boolean {
  return skill.tier >= requiredTier;
}

// ── 突破时获得的属性加成 ──
// 每次突破到新境界时，永久增加基础属性
export interface TierBonus {
  stat: string; // keyof BaseStats
  value: number;
}

export const TIER_BONUSES: Record<BaseSkillId, TierBonus[]> = {
  // 基础剑法：每突破加力量
  sword: [
    { stat: 'strength', value: 3 },  // 入门→熟练: +3力量
    { stat: 'strength', value: 4 },  // 熟练→精通: +4力量
    { stat: 'strength', value: 5 },  // 精通→大成: +5力量
    { stat: 'strength', value: 6 },  // 大成→宗师: +6力量
  ],
  // 基础身法：每突破加敏捷
  agility: [
    { stat: 'agility', value: 3 },
    { stat: 'agility', value: 4 },
    { stat: 'agility', value: 5 },
    { stat: 'agility', value: 6 },
  ],
  // 基础体魄：每突破加体魄
  body: [
    { stat: 'physique', value: 3 },
    { stat: 'physique', value: 4 },
    { stat: 'physique', value: 5 },
    { stat: 'physique', value: 6 },
  ],
  // 基础心法：每突破加意志
  mind: [
    { stat: 'willpower', value: 3 },
    { stat: 'willpower', value: 4 },
    { stat: 'willpower', value: 5 },
    { stat: 'willpower', value: 6 },
  ],
  // 基础战悟：每突破加洞察
  insight: [
    { stat: 'perception', value: 3 },
    { stat: 'perception', value: 4 },
    { stat: 'perception', value: 5 },
    { stat: 'perception', value: 6 },
  ],
};

export function getCumulativeTierBonus(skillId: BaseSkillId, tier: number): TierBonus | null {
  const bonuses = TIER_BONUSES[skillId];
  if (!bonuses?.length || tier <= 0) return null;
  const applied = bonuses.slice(0, Math.min(tier, bonuses.length));
  return {
    stat: applied[0].stat,
    value: applied.reduce((sum, bonus) => sum + bonus.value, 0),
  };
}

// ── 战斗中技能成长规则 ──
// 每场战斗胜利后统一调用，根据战斗数据分配熟练度
export interface CombatSkillGrowth {
  sword: number;
  agility: number;
  body: number;
  mind: number;
  insight: number;
}

export function calcCombatGrowth(stats: {
  attackCount: number;
  critCount: number;
  dodgeCount: number;
  hitsTaken: number;
  roundCount: number;
  won: boolean;
  isBoss: boolean;
}): CombatSkillGrowth {
  const { attackCount, critCount, dodgeCount, hitsTaken, roundCount, won, isBoss } = stats;
  // Target: ~100 proficiency per chapter (120 combats), so ~0.8/combat average
  return {
    // 剑法：战胜+1（偶尔暴击额外+1）
    sword: (won ? 1 : 0) + (critCount > 0 ? 1 : 0),
    // 身法：闪避过则+1，否则 0
    agility: dodgeCount > 0 ? 1 : 0,
    // 体魄：受过伤则+1
    body: hitsTaken > 0 ? 1 : 0,
    // 心法：按回合数线性增长，5 回合=1 点，保留 1 位小数，Boss 战额外+2
    mind: roundProficiency(roundCount / 5 + (isBoss ? 2 : 0)),
    // 战悟：有暴击或闪避则+1
    insight: (critCount > 0 || dodgeCount > 0) ? 1 : 0,
  };
}
