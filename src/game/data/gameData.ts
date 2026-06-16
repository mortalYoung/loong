import type { Item, CombatEnemy, GameEvent } from '@/store/useGameStore';

// ── Chapter (Journey) System ───────────────────────────────────────────────
// 龙隐山河：5 chapters, linear progression

export type ChapterId = 'qingshi' | 'guifeng' | 'yunyin' | 'heishi' | 'longyin';

export interface Chapter {
  id: ChapterId;
  name: string;
  description: string;
  flavorText: string;
  difficulty: number;
  unlockHint: string;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'qingshi',
    name: '青石镇',
    description: '西南边境的驿镇，连接官道与山区。商旅云集却人心惶惶，数月来不断有人失踪。',
    flavorText: '石板路上马蹄声远去，客栈门前的灯笼在风中摇晃。师父的住所空无一人，只剩桌上那枚龙纹铜印。',
    difficulty: 1,
    unlockHint: '你的冒险从这里开始。',
  },
  {
    id: 'guifeng',
    name: '鬼风岭',
    description: '建文二年后突然废弃的朝廷驿站，据说夜晚还能听见马蹄声。当年调查龙隐秘藏的队伍在此失踪。',
    flavorText: '残破的牌匾在寒风中吱呀作响，马厩里散落着生锈的马具。空气中弥漫着陈年血腥气。',
    difficulty: 2,
    unlockHint: '残缺地图指向此处——师父最后的踪迹。',
  },
  {
    id: 'yunyin',
    name: '云隐寺',
    description: '三百年古刹，僧人极少却始终有人暗中守护。地下藏着前朝修建的密室。',
    flavorText: '梵钟声回荡在山间，古松掩映的石阶尽头是紧闭的寺门。老僧扫地的节奏似乎暗藏玄机。',
    difficulty: 3,
    unlockHint: '驿卒遗书警告"切勿前往"——越是禁忌之地，越藏着真相。',
  },
  {
    id: 'heishi',
    name: '黑石矿洞',
    description: '洪武年间皇家矿场，突然封矿后地下被改造成巨大机关城。锦衣卫、燕王旧部、江湖势力三方汇聚。',
    flavorText: '矿洞入口处的封条早已破损，火把照亮了无数岔路。远处传来金属碰撞声——你不是唯一的来客。',
    difficulty: 4,
    unlockHint: '老僧言五钥分藏五处，第三、四把便在这地下迷城之中。',
  },
  {
    id: 'longyin',
    name: '龙隐地宫',
    description: '五钥齐聚方可开启的地下宫殿，融合机关、密道与阵法。龙隐秘藏的最终所在。',
    flavorText: '五把钥匙嵌入石门，大地微微震颤。门后的黑暗中，仿佛有什么沉睡了数十年的东西正在苏醒。',
    difficulty: 5,
    unlockHint: '所有谜团的终点——龙隐秘藏就在前方。',
  },
];
export const ALL_ITEMS: Item[] = [
  // ── 第一章线索 ──
  { id: 'clue_seal', name: '龙纹铜印', description: '师父桌上留下的铜印，刻有精细的龙纹。似乎是某种凭证。', type: 'key', rarity: 'legendary' },
  { id: 'clue_inn_note', name: '客栈留言', description: '客栈老板的口信：近期数月不断有人失踪，人心惶惶。外地人少来。', type: 'key', rarity: 'common' },
  { id: 'clue_notice', name: '衙门公告', description: '近期禁止百姓进入鬼风岭。违者以通匪论处。', type: 'key', rarity: 'common' },
  { id: 'clue_smith', name: '铁匠证词', description: '铁匠为某人打造大量武器，此人消失在鬼风岭。不日，铁匠铺烧起不知来由的大火。', type: 'key', rarity: 'rare' },
  { id: 'clue_journal', name: '师父手札', description: '若有人追来，切勿相信县衙。', type: 'key', rarity: 'rare' },
  // ── 第二章线索 ──
  { id: 'clue_gf_letter', name: '驿卒血书', description: '马厩白骨手中攥着的染血信件，提到酒窖暗门。', type: 'key', rarity: 'rare' },
  { id: 'clue_gf_cellar', name: '酒窖密道图', description: '暗门后甬道的布局，标注了机关位置。', type: 'key', rarity: 'rare' },
  { id: 'clue_gf_diary', name: '驿卒日记', description: '记录驿站废弃前后经过，最后写满恐惧。', type: 'key', rarity: 'rare' },
  { id: 'clue_gf_warning', name: '遗书警告', description: '"龙脉已开，切勿前往云隐寺。第一把钥匙在密室。"', type: 'key', rarity: 'legendary' },
  { id: 'clue_gf_symbol', name: '飞禽符号拓片', description: '密室墙壁上的飞禽符号拓片，与黑衣人身上的图案一致。', type: 'key', rarity: 'rare' },
  // ── 通用药品 ──
  { id: 'herb_potion', name: '草药包', description: '恢复 25 点气血。', type: 'potion', rarity: 'common', effect: { stat: 'hp', value: 25 } },
  { id: 'gold_wound', name: '金创药', description: '恢复 60 点气血。', type: 'potion', rarity: 'common', effect: { stat: 'hp', value: 60 } },
  // ── 第三章线索 ──
  { id: 'clue_yy_monk', name: '老僧指引', description: '老僧识出铜印后的指引："藏经阁密室中有你要的答案。"', type: 'key', rarity: 'rare' },
  { id: 'clue_yy_truth', name: '秘藏真相', description: '龙隐秘藏非金银，而是山川布防图、军事密道和皇室遗诏。', type: 'key', rarity: 'legendary' },
  { id: 'clue_yy_five_keys', name: '五钥机制', description: '五把钥匙分藏五处，集齐方可开启龙隐地宫。', type: 'key', rarity: 'rare' },
  { id: 'clue_yy_entrance', name: '地宫入口', description: '后山塔林中龙纹石塔下的地宫入口位置。', type: 'key', rarity: 'rare' },
  { id: 'clue_yy_formation', name: '步法口诀', description: '通过地宫门前棋盘地砖的正确步法。', type: 'key', rarity: 'rare' },
  // ── 第四章线索 ──
  { id: 'clue_hs_three_forces', name: '三方情报', description: '锦衣卫、燕王旧部、血狼寨三方势力在矿洞中的布局。', type: 'key', rarity: 'rare' },
  { id: 'clue_hs_jinyi_deal', name: '锦衣卫密约', description: '与锦衣卫百户达成的临时合作协议和令牌。', type: 'key', rarity: 'rare' },
  { id: 'clue_hs_yan_intel', name: '燕王暗卫情报', description: '寨主弱点：嗜酒、子时必醉。以及幕后挑拨的真相。', type: 'key', rarity: 'rare' },
  { id: 'clue_hs_conspiracy', name: '幕后密信', description: '故意散播藏宝传言让各方互斗的密信，落款飞禽符号。', type: 'key', rarity: 'legendary' },
  { id: 'clue_hs_camp_layout', name: '寨主营地图', description: '血狼寨营地布局和巡逻规律，标注了突入路线。', type: 'key', rarity: 'rare' },
  // ── 第五章线索 ──
  { id: 'clue_ly_corridor', name: '龙纹指引', description: '龙纹长廊中金色龙纹的指引方向和规律。', type: 'key', rarity: 'rare' },
  { id: 'clue_ly_puzzle', name: '九宫解法', description: '六十甲子顺序踏过九宫格的正确路径。', type: 'key', rarity: 'rare' },
  { id: 'clue_ly_edict', name: '遗诏内容', description: '太祖对皇位传承另有安排的绢帛遗诏。', type: 'key', rarity: 'legendary' },
  { id: 'clue_ly_guardian', name: '守护者身份', description: '洪武年间秘密培养的守护者后人，三十年等待一战。', type: 'key', rarity: 'rare' },
  { id: 'clue_ly_master', name: '师父的踪迹', description: '地宫壁画中发现师父曾到此一游的痕迹。', type: 'key', rarity: 'legendary' },
  // ── Boss 掉落（下一章第一条线索）──
  { id: 'torn_map_1', name: '残缺地图', description: '从黑衣人身上搜出的半张旧图，标注了鬼风岭的方位。通往第二章的钥匙。', type: 'key', rarity: 'rare' },
  { id: 'copper_tiger', name: '铜虎符', description: '驿站密室中取得的第一把秘钥。虎符背面刻有"云隐"二字。', type: 'key', rarity: 'legendary' },
  { id: 'secret_scroll', name: '秘藏卷轴', description: '机关铜人守护的卷轴，记载着黑石矿洞的入口位置和三方势力动向。', type: 'key', rarity: 'legendary' },
  { id: 'twin_keys', name: '双龙钥匙', description: '从血狼寨寨主手中夺得的第三、四把秘钥，龙头相对，合二为一方能使用。', type: 'key', rarity: 'legendary' },
];

// ── 传闻池 & 八卦池 ──────────────────────────────────────────────────────

export const RUMOR_POOL: string[] = [
  '听说鬼风岭最近夜里有火光，官兵都不敢去查。',
  '县衙最近进出频繁，似乎有京城来的大人物。',
  '有人在山道上看见穿飞鱼服的人，莫非是锦衣卫？',
  '镇北的猎户说林子里多了许多陌生脚印。',
  '老铁匠死前似乎在赶制一批奇怪的铁器。',
  '据说朝廷派来调查失踪案的队伍也失踪了。',
  '有商队从鬼风岭方向回来后再也不肯走那条路了。',
  '驿站废弃多年，但有人看到里面亮着灯。',
  '隔壁镇也开始有人失踪了，都是在月圆夜。',
  '有人说师父走之前在河边跟一个戴斗笠的人密谈过。',
];

export const GOSSIP_POOL: string[] = [
  '张屠户家的狗又把隔壁的鸡叼走了。',
  '镇上的媒婆最近生意不好，怪天气太热。',
  '客栈掌柜偷偷涨了酒价，被人骂了一通。',
  '南边来的戏班子唱得不错，明天还有一场。',
  '王二麻子赌钱输了裤子，他娘追着打了三条街。',
  '听说李秀才又没考上，在家闭门不出了。',
  '码头上来了一船瓷器，价格公道。',
  '赵家的女儿要嫁人了，嫁妆摆了三大车。',
];

export function getRandomRumor(): string {
  return RUMOR_POOL[Math.floor(Math.random() * RUMOR_POOL.length)];
}

export function getRandomGossip(): string {
  return GOSSIP_POOL[Math.floor(Math.random() * GOSSIP_POOL.length)];
}

export const ALL_ENEMIES: CombatEnemy[] = [
  // ── 第一章：青石镇 ──
  { id: 'thug', name: '街头混混', hp: 20, maxHp: 20, attack: 6, defense: 1, speed: 8, description: '游手好闲的地痞。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 5, itemChance: 0.15, itemId: 'herb_potion' } },
  { id: 'bandit_scout', name: '匪寇斥候', hp: 28, maxHp: 28, attack: 8, defense: 2, speed: 10, description: '打探镇中情报的山贼。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 8, itemChance: 0.2 } },
  { id: 'wild_dog', name: '野犬', hp: 18, maxHp: 18, attack: 7, defense: 1, speed: 12, description: '被遗弃后变得凶狠的恶犬。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 3, itemChance: 0.1 } },
  { id: 'black_agent', name: '黑衣追兵', hp: 120, maxHp: 120, attack: 14, defense: 6, speed: 11, description: '身手矫健的神秘黑衣人，奉命追杀持有龙纹铜印之人。', isBoss: true, areaId: 'qingshi', reward: { exp: 0, gold: 50, itemChance: 1.0, itemId: 'torn_map_1' } },
  // 突破事件专用敌人（requiresEvent 设为不可能满足的值，防止出现在探索池中）
  { id: 'sword_elder', name: '灰衣老人', hp: 60, maxHp: 60, attack: 12, defense: 4, speed: 15, description: '动作虽慢，却让你莫名觉得危险的神秘老人。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  { id: 'snow_elder_dodge', name: '踏雪老人', hp: 80, maxHp: 80, attack: 10, defense: 4, speed: 28, description: '踏雪无痕的老人，身法飘逸，闪避极高。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  { id: 'snow_elder_attack', name: '踏雪老人', hp: 80, maxHp: 80, attack: 26, defense: 4, speed: 14, description: '踏雪无痕的老人，借风势发力，攻击凌厉。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  { id: 'snow_elder_defense', name: '踏雪老人', hp: 80, maxHp: 80, attack: 10, defense: 22, speed: 14, description: '踏雪无痕的老人，借冰面滑行，防御坚实。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  { id: 'branch_elder', name: '折枝老人', hp: 999, maxHp: 999, attack: 60, defense: 50, speed: 30, description: '衣着朴素的砍柴老人，手持一根树枝，每一剑都被他轻描淡写地化解。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  { id: 'wooden_dummy_hard', name: '木人·无影', hp: 80, maxHp: 80, attack: 18, defense: 0, speed: 30, description: '武馆深处的机关木人，攻击凌厉，闪避极高，几乎无懈可击。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  { id: 'wooden_dummy_weak', name: '木人·无影', hp: 30, maxHp: 30, attack: 6, defense: 0, speed: 6, description: '发现破绽后的木人·无影，右肩的细微预动暴露了一切。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  { id: 'wooden_dummy_armored', name: '木人·无影', hp: 100, maxHp: 100, attack: 18, defense: 20, speed: 8, description: '换上厚重护甲的木人·无影，攻击易于命中，但每击都像打在铁壁上。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  { id: 'wooden_dummy_cracked', name: '木人·无影', hp: 100, maxHp: 100, attack: 18, defense: 4, speed: 8, description: '找到护甲缝隙的木人·无影，防御已不再是障碍。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  // 精通→大成：高血量（看破持久战破绽）
  { id: 'wooden_dummy_endurance', name: '木人·无影', hp: 300, maxHp: 300, attack: 14, defense: 6, speed: 10, description: '换上加厚木料的木人·无影，血量极高，消耗战几乎没有尽头。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  { id: 'wooden_dummy_exhausted', name: '木人·无影', hp: 300, maxHp: 300, attack: 6, defense: 6, speed: 10, description: '找到运转破绽的木人·无影，机关驱动力大幅衰减。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  // 大成→宗师：高攻击（看破蓄力破绽）
  { id: 'wooden_dummy_berserker', name: '木人·无影', hp: 120, maxHp: 120, attack: 45, defense: 8, speed: 12, description: '换上重锤臂的木人·无影，每一击都足以重创对手。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  { id: 'wooden_dummy_telegraphed', name: '木人·无影', hp: 120, maxHp: 120, attack: 16, defense: 8, speed: 12, description: '看穿蓄力前摇的木人·无影，重锤已失去奇效。', isBoss: false, areaId: 'qingshi', reward: { exp: 0, gold: 0, itemChance: 0 }, requiresEvent: '__breakthrough_only__' },
  // ── 第二章：鬼风岭 ──
  { id: 'bandit', name: '落草山匪', hp: 55, maxHp: 55, attack: 12, defense: 6, speed: 9, description: '占据废驿的匪徒，装备比镇上混混好得多。', isBoss: false, areaId: 'guifeng', reward: { exp: 0, gold: 10, itemChance: 0.2, itemId: 'herb_potion' } },
  { id: 'ghost_soldier', name: '驿站幽兵', hp: 40, maxHp: 40, attack: 13, defense: 3, speed: 14, description: '殉职驿卒的怨灵，攻击凌厉但形体虚弱。', isBoss: false, areaId: 'guifeng', reward: { exp: 0, gold: 12, itemChance: 0.2 } },
  { id: 'trap_puppet', name: '机关木偶', hp: 65, maxHp: 65, attack: 11, defense: 10, speed: 5, description: '驿站中残存的防卫机关，防御力惊人。', isBoss: false, areaId: 'guifeng', reward: { exp: 0, gold: 8, itemChance: 0.15, itemId: 'gold_wound' } },
  { id: 'station_wraith', name: '驿站守卫亡魂', hp: 200, maxHp: 200, attack: 22, defense: 11, speed: 10, description: '驿站最后的守护者，高防且能召唤幻影。', isBoss: true, areaId: 'guifeng', reward: { exp: 0, gold: 100, itemChance: 1.0, itemId: 'copper_tiger' } },
  // ── 第三章：云隐寺 ──
  { id: 'rogue_monk', name: '破戒僧', hp: 75, maxHp: 75, attack: 18, defense: 7, speed: 10, description: '堕入魔道的武僧。', isBoss: false, areaId: 'yunyin', reward: { exp: 55, gold: 18, itemChance: 0.2 } },
  { id: 'stone_guardian', name: '石像守卫', hp: 90, maxHp: 90, attack: 15, defense: 14, speed: 4, description: '寺门前沉默的石像，被机关驱动。', isBoss: false, areaId: 'yunyin', reward: { exp: 60, gold: 20, itemChance: 0.2, itemId: 'gold_wound' } },
  { id: 'shadow_assassin', name: '暗杀者', hp: 65, maxHp: 65, attack: 22, defense: 5, speed: 16, description: '潜伏在暗处的刺客。', isBoss: false, areaId: 'yunyin', reward: { exp: 58, gold: 22, itemChance: 0.25, itemId: 'shadow_dagger' } },
  { id: 'bronze_golem', name: '机关铜人', hp: 350, maxHp: 350, attack: 24, defense: 16, speed: 8, description: '两阶段战斗的守护机关，半血后攻击方式改变。', isBoss: true, areaId: 'yunyin', reward: { exp: 0, gold: 120, itemChance: 1.0, itemId: 'secret_scroll' } },
  // ── 第四章：黑石矿洞 ──
  { id: 'jinyi_guard', name: '锦衣卫校尉', hp: 100, maxHp: 100, attack: 24, defense: 10, speed: 12, description: '朝廷密探，训练有素。', isBoss: false, areaId: 'heishi', reward: { exp: 80, gold: 30, itemChance: 0.2 } },
  { id: 'yan_soldier', name: '燕王暗卫', hp: 95, maxHp: 95, attack: 26, defense: 8, speed: 14, description: '燕王麾下精锐暗卫。', isBoss: false, areaId: 'heishi', reward: { exp: 85, gold: 35, itemChance: 0.25, itemId: 'fine_blade' } },
  { id: 'mine_beast', name: '矿洞异兽', hp: 110, maxHp: 110, attack: 28, defense: 12, speed: 9, description: '深居矿洞的变异生物。', isBoss: false, areaId: 'heishi', reward: { exp: 90, gold: 28, itemChance: 0.2, itemId: 'gold_wound' } },
  { id: 'wolf_chief', name: '血狼寨寨主', hp: 500, maxHp: 500, attack: 35, defense: 18, speed: 14, description: '高爆发的江湖匪首，擅长召唤山贼协同作战。', isBoss: true, areaId: 'heishi', reward: { exp: 0, gold: 180, itemChance: 1.0, itemId: 'twin_keys' } },
  // ── 第五章：龙隐地宫 ──
  { id: 'palace_guard', name: '地宫守卫', hp: 130, maxHp: 130, attack: 32, defense: 15, speed: 11, description: '世代守护地宫的武士后裔。', isBoss: false, areaId: 'longyin', reward: { exp: 120, gold: 45, itemChance: 0.2, itemId: 'spirit_pill' } },
  { id: 'trap_array', name: '九宫机关阵', hp: 100, maxHp: 100, attack: 38, defense: 8, speed: 20, description: '连环触发的机关陷阱群。', isBoss: false, areaId: 'longyin', reward: { exp: 130, gold: 50, itemChance: 0.25 } },
  { id: 'dragon_phantom', name: '龙纹幻影', hp: 150, maxHp: 150, attack: 35, defense: 12, speed: 16, description: '由龙纹阵法召唤的虚幻守卫。', isBoss: false, areaId: 'longyin', reward: { exp: 140, gold: 55, itemChance: 0.3, itemId: 'gold_wound' } },
  { id: 'final_guardian', name: '龙隐守护者', hp: 800, maxHp: 800, attack: 45, defense: 25, speed: 16, description: '洪武年间秘密培养的守护者后人，三阶段战斗：剑术→机关→龙纹全面激活。', isBoss: true, areaId: 'longyin', reward: { exp: 9999, gold: 500, itemChance: 1.0, itemId: 'dragon_blade' } },
];
export const ALL_EVENTS: GameEvent[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // ── 第一章：青石镇 ──
  // ══════════════════════════════════════════════════════════════════════════

  // ── Repeatable（7个：HP回复/探索度/剑法/身法/体魄/心法/战悟）──
  {
    id: 'ev_qs_rest', title: '王记面摊', areaId: 'qingshi', category: 'repeatable',
    description: '镇口王大娘的面摊热气腾腾，一碗阳春面的香味飘出老远。几个赶路人正埋头呼噜着面条。',
    options: [
      { id: 'tea', text: '要碗清汤', successRate: 80, skillBonus: [],
        success: { text: '清汤暖胃，疲惫消散了不少。', effect: 'heal', value: 20 },
        failure: { text: '汤放久了凉透了，没什么效果。', effect: 'nothing' } },
      { id: 'meal', text: '来碗大肉面（-8金）', successRate: 100, skillBonus: [],
        success: { text: '满满一碗宽面浇上红烧肉，吃得浑身冒汗。', effect: 'heal', value: 35, goldChange: -8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '赶路要紧', successRate: 100, skillBonus: [],
        success: { text: '你咽了咽口水继续走。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_rumor', title: '酒馆打听', areaId: 'qingshi', category: 'repeatable',
    description: '午后的酒馆人不多，但角落里几个镖师正在喝酒聊天。他们走南闯北，消息灵通。',
    options: [
      { id: 'listen', text: '装作不经意地靠近', successRate: 55, skillBonus: [],
        success: { text: '镖师提到了鬼风岭的异动，你竖起耳朵记下。', effect: 'rumor' },
        failure: { text: '他们在争论哪家酒楼的菜好吃。', effect: 'gossip' } },
      { id: 'buy_drink', text: '给他们添壶酒（-5金）', successRate: 100, skillBonus: [],
        success: { text: '镖师拍着你肩膀："有意思的小兄弟！"随后压低嗓子说起见闻。', effect: 'rumor', goldChange: -5 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '自己喝自己的', successRate: 100, skillBonus: [],
        success: { text: '你端着茶碗默默坐着。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_sword_practice', title: '镖局校场', areaId: 'qingshi', category: 'repeatable',
    description: '镇上镖局的校场偶尔对外开放。几个镖师正在对练，有人见你带剑便招呼道："来两手？"',
    options: [
      { id: 'practice', text: '认真练习', successRate: 65, skillBonus: [],
        success: { text: '反复挥剑让你对基础招式更加熟练。（剑法+5）', effect: 'skill_up', skillId: 'sword', value: 5 },
        failure: { text: '今天状态不佳，没什么进步。', effect: 'nothing' } },
      { id: 'spar', text: '找人切磋（-5气血）', successRate: 100, skillBonus: [],
        success: { text: '实战让你收获更大。（剑法+8）', effect: 'skill_up', skillId: 'sword', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '今天不练了', successRate: 100, skillBonus: [],
        success: { text: '你收剑离开。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_rooftop', title: '瓦上飞花', areaId: 'qingshi', category: 'repeatable',
    description: '黄昏时分，你爬上客栈屋顶远眺。一阵风起，几片落叶飘过。你忽然想用脚尖去接住它们。',
    options: [
      { id: 'chase', text: '用脚尖接落叶', successRate: 55, skillBonus: [],
        success: { text: '你踮起脚尖在瓦面上轻点移步，接住了三片。脚步轻盈了几分。（身法+5）', effect: 'skill_up', skillId: 'agility', value: 5 },
        failure: { text: '踩滑了一块瓦，差点摔下去。', effect: 'damage', value: 3 } },
      { id: 'hard_route', text: '跳跃屋脊追落叶（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '你在几间屋顶间腾挪飞跃，落叶全部接住。虽然膝盖磕青了，但身法大进。（身法+8）', effect: 'skill_up', skillId: 'agility', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '只是看看风景', successRate: 100, skillBonus: [],
        success: { text: '你靠在烟囱旁望了会儿夕阳。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_body_train', title: '码头扛货', areaId: 'qingshi', category: 'repeatable',
    description: '镇上小码头有商船靠岸。搬货的苦力喊着号子，有人问你要不要帮忙——按件给钱。',
    options: [
      { id: 'lift', text: '搬几袋米', successRate: 60, skillBonus: [],
        success: { text: '来回扛了十几趟，浑身酸痛但筋骨更结实了。（体魄+5）', effect: 'skill_up', skillId: 'body', value: 5 },
        failure: { text: '搬了两袋就腰酸背痛，不行了。', effect: 'nothing' } },
      { id: 'heavy', text: '扛最重的铁料（-10气血）', successRate: 100, skillBonus: [],
        success: { text: '你咬着牙将铁料从船上扛到岸。肌肉在极限中撕裂重组。（体魄+8）', effect: 'skill_up', skillId: 'body', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不干苦力活', successRate: 100, skillBonus: [],
        success: { text: '你摆摆手继续走。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_meditate', title: '土地庙晨课', areaId: 'qingshi', category: 'repeatable',
    description: '镇外土地庙虽小，清晨却格外安静。庙前的老槐树下有人留了一块蒲团，正适合打坐。',
    options: [
      { id: 'sit', text: '在蒲团上调息', successRate: 55, skillBonus: [],
        success: { text: '清晨的凉意让头脑分外清醒，气息在经脉中缓缓运转。（心法+5）', effect: 'skill_up', skillId: 'mind', value: 5 },
        failure: { text: '远处传来公鸡打鸣，你没能入定。', effect: 'nothing' } },
      { id: 'deep', text: '强行冲击周天（-10气血）', successRate: 100, skillBonus: [],
        success: { text: '你强行引导内息走了一个小周天，经脉胀痛但更通畅了。（心法+8）', effect: 'skill_up', skillId: 'mind', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '只是路过', successRate: 100, skillBonus: [],
        success: { text: '你拜了拜土地爷便走了。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_chess', title: '赵秀才讲古', areaId: 'qingshi', category: 'repeatable',
    description: '镇上的赵秀才又在茶楼讲古。今天讲的是前朝名将用兵如神的故事，听者颇多。',
    options: [
      { id: 'listen', text: '坐下细听', successRate: 50, skillBonus: [],
        success: { text: '故事中暗藏兵法玄机：虚实相生、以退为进。你若有所悟。（战悟+5）', effect: 'skill_up', skillId: 'insight', value: 5 },
        failure: { text: '秀才今天状态不好，讲得云里雾里。', effect: 'nothing' } },
      { id: 'ask', text: '散场后请教（-6金）', successRate: 100, skillBonus: [],
        success: { text: '你请秀才喝茶详谈。他就"知己知彼"之道深入解析，让你大开眼界。（战悟+8）', effect: 'skill_up', skillId: 'insight', value: 8, goldChange: -6 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '没空听书', successRate: 100, skillBonus: [],
        success: { text: '你路过没有停留。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },

  // ── Rare（6个：对应6项基础属性增长）──
  {
    id: 'ev_qs_rare_physique', title: '寒潭沐浴', areaId: 'qingshi', category: 'rare', weight: 0.25,
    description: '镇外深山中有一处寒潭，传说浸泡可强筋健骨。今日你偶然寻到此处。',
    options: [
      { id: 'soak', text: '咬牙浸入寒潭', successRate: 55, skillBonus: [],
        success: { text: '刺骨的寒意过后是通体的暖流。你的体魄更加强健了。（体魄+1）', effect: 'stat_up' },
        failure: { text: '太冷了，你只泡了片刻便上岸。', effect: 'nothing' } },
      { id: 'force', text: '强忍寒意坚持一炷香（-15气血）', successRate: 100, skillBonus: [],
        success: { text: '你从潭中起身时，浑身筋骨都在嘎嘎作响。蜕变了。（体魄+2）', effect: 'stat_up' },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '太危险，算了', successRate: 100, skillBonus: [],
        success: { text: '你看了看便离去。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_rare_strength', title: '落石危机', areaId: 'qingshi', category: 'rare', weight: 0.25,
    description: '山道上方突然滚落一块巨石，一位老妇在下方躲避不及。',
    options: [
      { id: 'push', text: '全力推开巨石', successRate: 50, skillBonus: [],
        success: { text: '你双手撑住巨石，肌肉绷到极限。巨石终于偏移了方向。在极限中你变强了。（力量+1）', effect: 'stat_up' },
        failure: { text: '石头太重，你只拉开了老妇，自己被擦伤。', effect: 'damage', value: 10 } },
      { id: 'pull', text: '拉走老妇（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '你拼尽全力将人拉到安全处。虽然受了伤，但力气又增长了。（力量+1）', effect: 'stat_up' },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '来不及了', successRate: 100, skillBonus: [],
        success: { text: '你只能眼睁睁看着...所幸巨石偏了方向。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_rare_agility', title: '雨中追兔', areaId: 'qingshi', category: 'rare', weight: 0.25,
    description: '大雨中一只灵巧的白兔从你脚边窜过。它的速度极快，但泥地上留有脚印。',
    options: [
      { id: 'chase', text: '追上去', successRate: 50, skillBonus: [],
        success: { text: '你在雨中穿梭闪转，最终抓住了兔子又放开了它。你的身法因此更加灵敏。（敏捷+1）', effect: 'stat_up' },
        failure: { text: '兔子太快了，你追了几步便不见踪影。', effect: 'nothing' } },
      { id: 'sprint', text: '全力冲刺（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '你不顾一切地全速追赶，虽然筋疲力尽但脚步轻盈了许多。（敏捷+1）', effect: 'stat_up' },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '何必追兔', successRate: 100, skillBonus: [],
        success: { text: '你看着白兔消失在雨幕中。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_rare_intellect', title: '残局妙手', areaId: 'qingshi', category: 'rare', weight: 0.25,
    description: '棋摊上摆着一局无人能破的残棋。悬赏已贴了三日。',
    options: [
      { id: 'solve', text: '尝试破解', successRate: 45, skillBonus: [],
        success: { text: '你冥思苦想，忽然灵光一闪——落子！老者惊呼妙手。你的智谋大进。（智谋+1）', effect: 'stat_up' },
        failure: { text: '想了半天没有头绪。', effect: 'nothing' } },
      { id: 'buy_hint', text: '花钱买提示（-10金）', successRate: 100, skillBonus: [],
        success: { text: '老者给了你一个暗示，你顿悟破局之道。（智谋+1）', effect: 'stat_up', goldChange: -10 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不凑这热闹', successRate: 100, skillBonus: [],
        success: { text: '你摇摇头走开。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_rare_perception', title: '暗夜飞针', areaId: 'qingshi', category: 'rare', weight: 0.25,
    description: '深夜，你感到一丝不对——空气中有极细微的破风声。有人在暗处射暗器！',
    options: [
      { id: 'dodge', text: '凭直觉闪避', successRate: 50, skillBonus: [],
        success: { text: '你侧身避过飞针，在黑暗中捕捉到了那一丝杀意的方向。你的洞察力更上一层。（洞察+1）', effect: 'stat_up' },
        failure: { text: '飞针擦过手臂。你记住了这种感觉。', effect: 'damage', value: 8 } },
      { id: 'counter', text: '拔剑反击（-10气血）', successRate: 100, skillBonus: [],
        success: { text: '你循着杀意反手一剑，暗处传来一声闷哼。对方遁去。你的感知更加敏锐了。（洞察+1）', effect: 'stat_up' },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '赶紧躲开', successRate: 100, skillBonus: [],
        success: { text: '你快步离开了暗巷。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_rare_willpower', title: '噩梦惊醒', areaId: 'qingshi', category: 'rare', weight: 0.25,
    description: '半夜你从噩梦中惊醒，梦中师父被黑影吞噬。恐惧如潮水涌来。',
    options: [
      { id: 'face', text: '直面恐惧，重新入眠', successRate: 50, skillBonus: [],
        success: { text: '你平复呼吸，强迫自己再次入睡。黎明时分醒来，感到意志坚定了许多。（意志+1）', effect: 'stat_up' },
        failure: { text: '辗转反侧一夜未眠。', effect: 'nothing' } },
      { id: 'meditate', text: '起身打坐压制心魔（-10气血）', successRate: 100, skillBonus: [],
        success: { text: '你盘膝调息至天明，心中恐惧逐渐消散。意志更加坚韧。（意志+1）', effect: 'stat_up' },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不想面对', successRate: 100, skillBonus: [],
        success: { text: '你翻了个身，试着不去想。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },

  // ── Chain（支线）: 失踪的小铁匠（5段）──
  {
    id: 'ev_qs_smith_1', title: '铁匠老刘的恳求', areaId: 'qingshi', category: 'chain', chainNext: 'ev_qs_smith_2', minExploration: 3,
    description: '铁匠铺废墟旁，一个满脸愁容的中年汉子拉住你的衣袖。"少侠，求你帮帮忙...我儿子阿川三天前突然不见了，大伙都说是山贼掳的，但我觉得不对劲。"',
    options: [
      { id: 'ask', text: '"怎么个不对劲？"', successRate: 70, skillBonus: [],
        success: { text: '"阿川的锻造手艺是我教的，比我还强。失踪那天，铺子里的龙纹模具也不见了——那模具是有人专门定做的。"他递来一块阿川常戴的布巾，上面有暗记。你的洞察力又敏锐了几分。', effect: 'stat_up' },
        failure: { text: '老刘说不出更多细节，只是反复念叨"龙纹模具"不见了。你将这个信息记下，警觉性有所提高。', effect: 'stat_up' } },
    ],
  },
  {
    id: 'ev_qs_smith_2', title: '阿川的暗记', areaId: 'qingshi', category: 'chain', chainRequires: 'ev_qs_smith_1', chainNext: 'ev_qs_smith_3',
    description: '你按老刘的提示来到阿川常去的后山小溪边。溪旁的石头上刻着几道不起眼的划痕——如果不知道是暗记，根本看不出来。',
    options: [
      { id: 'trace', text: '顺着划痕方向追踪', successRate: 60, skillBonus: [],
        success: { text: '划痕指向北面的密林。你在灌木丛中发现了被折断的树枝和布条——有人故意留下标记。追踪能力有所长进。', effect: 'stat_up' },
        failure: { text: '划痕太浅了，你只能辨认出大致的方向是北面。这次经历磨练了你的耐心。', effect: 'stat_up' } },
    ],
  },
  {
    id: 'ev_qs_smith_3', title: '黑衣人的营地', areaId: 'qingshi', category: 'chain', chainRequires: 'ev_qs_smith_2', chainNext: 'ev_qs_smith_4',
    description: '你潜入密林深处，远远看到一处隐蔽的营地。十余人身着黑衣，装备统一。营地中央支着锻造炉，一个年轻人正被迫敲打着什么。火光中，你看到那些成品——刻有龙纹的精钢兵刃，数量远超普通山贼所需。',
    options: [
      { id: 'observe', text: '继续观察，记住布局', successRate: 65, skillBonus: [],
        success: { text: '你数清了人数、哨位和巡逻路线。这些人行动严密，绝非普通匪徒。他们打造的武器少说有四五十把——这是在备战。（洞察+1）', effect: 'stat_up' },
        failure: { text: '你差点被巡逻的哨兵发现，不得不退后。但已确认阿川就在里面。', effect: 'nothing' } },
      { id: 'sneak_closer', text: '冒险靠近阿川', successRate: 40, skillBonus: [],
        success: { text: '趁换岗间隙你溜到阿川身边。他惊讶但没出声，用口型说："木桩...底下...信。"潜行让你的身手更加灵活。', effect: 'stat_up' },
        failure: { text: '哨兵警觉，你只能远远撤退。但你确认了阿川还活着。', effect: 'damage', value: 5 } },
    ],
  },
  {
    id: 'ev_qs_smith_4', title: '阿川的密信', areaId: 'qingshi', category: 'chain', chainRequires: 'ev_qs_smith_3', chainNext: 'ev_qs_smith_5',
    description: '你找到营地外围的一根木桩，底下果然藏着一封阿川偷偷写的信："这些人自称奉上面的命令，但我听到他们私下提过燕王和靖难。他们要的不只是刀剑——还有能破城门的攻城器械图纸。我把图纸藏在炉膛夹层里，没给他们。救我。"',
    options: [
      { id: 'plan', text: '制定营救计划', successRate: 70, skillBonus: [],
        success: { text: '你记住了巡逻规律和薄弱点。子时换岗有三十息的空档——那就是机会。（智谋+1）', effect: 'stat_up' },
        failure: { text: '计划有些仓促，但时间不等人。你决定今夜动手。', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_qs_smith_5', title: '夜救阿川', areaId: 'qingshi', category: 'chain', chainRequires: 'ev_qs_smith_4',
    description: '子时，月隐星稀。你摸进营地，趁换岗空档割开帐篷。阿川早已准备好，背着一卷图纸跟你翻出围栏。就在你们快要脱离时——"站住。"一个低沉的声音从暗处响起。一名黑衣头领提刀走出，身后跟着两名护卫。"以为夜色能掩护一切？"',
    options: [
      { id: 'fight', text: '让阿川先跑，你断后', successRate: 55, skillBonus: [],
        success: { text: '你一剑逼退头领，阿川趁机消失在林中。对方见势不妙不敢恋战，几息后也退回营地。你带着胜利和伤口回到镇上。阿川已在铁匠铺等你。（力量+1）', effect: 'stat_up' },
        failure: { text: '头领武艺不弱，你被逼得步步后退。所幸阿川已经跑远。你且战且退，身上多了几道伤口。但人救出来了。', effect: 'damage', value: 15 } },
    ],
  },

  // ── Chain: 主线（收集5条线索 → Boss: 黑衣追兵）──
  {
    id: 'ev_qs_c1_home', title: '师父住所调查', areaId: 'qingshi', category: 'chain', chainNext: 'ev_qs_c2_inn', minExploration: 5,
    description: '你推开师父住所的门，屋内落满灰尘。桌上散落着书信，一枚刻有龙纹的铜印静静躺在纸堆中。',
    options: [
      { id: 'search', text: '仔细搜索屋内', successRate: 75, skillBonus: [],
        success: { text: '你将铜印收入怀中。信件提到"客栈""鬼风岭"和"不可信任官府"。这枚铜印似乎是师父留给你的关键。', effect: 'item', itemId: 'clue_seal' },
        failure: { text: '屋内线索有限，但铜印被你收好了。或许该去镇上打听消息。', effect: 'item', itemId: 'clue_seal' } },
    ],
  },
  {
    id: 'ev_qs_c2_inn', title: '客栈问询', areaId: 'qingshi', category: 'chain', chainRequires: 'ev_qs_c1_home', chainNext: 'ev_qs_c3_yamen',
    description: '客栈掌柜见你出示铜印，压低声音将你拉到角落："你师父的事...最近镇上人心惶惶，好几个人莫名其妙失踪了。"',
    options: [
      { id: 'ask', text: '追问详情', successRate: 70, skillBonus: [],
        success: { text: '"都是夜里消失的，官府只说是进山迷了路。但大家都不信。你师父走之前也问过同样的问题..."他递来一张纸条。', effect: 'item', itemId: 'clue_inn_note' },
        failure: { text: '掌柜神色紧张，只匆匆说了句"最近别乱走"便转身离去。但他桌上的纸条你瞥见了内容。', effect: 'item', itemId: 'clue_inn_note' } },
    ],
  },
  {
    id: 'ev_qs_c3_yamen', title: '调查衙门', areaId: 'qingshi', category: 'chain', chainRequires: 'ev_qs_c2_inn', chainNext: 'ev_qs_c4_smith',
    description: '衙门口贴着一张新的告示，墨迹未干。上面盖着鲜红的官印。',
    options: [
      { id: 'read', text: '阅读告示', successRate: 80, skillBonus: [],
        success: { text: '告示写道："即日起禁止百姓进入鬼风岭，违者以通匪论处。"你将内容默记于心。为何官府如此紧张？', effect: 'item', itemId: 'clue_notice' },
        failure: { text: '告示内容你只看了一半便被衙役驱赶，但关键信息已记下：鬼风岭被封了。', effect: 'item', itemId: 'clue_notice' } },
    ],
  },
  {
    id: 'ev_qs_c4_smith', title: '铁匠铺大火', areaId: 'qingshi', category: 'chain', chainRequires: 'ev_qs_c3_yamen', chainNext: 'ev_qs_c5_rain',
    description: '镇东的铁匠铺已成废墟，黑焦的木梁还冒着余烟。几个邻居在低声议论。一位老妇拉住你："你是来调查的吧？"',
    options: [
      { id: 'listen', text: '听她说', successRate: 70, skillBonus: [],
        success: { text: '"老铁匠前阵子接了一笔大单，给一个陌生人打了好多兵器。那人走后没几天，铁匠铺就莫名其妙着了火。老铁匠...没跑出来。"她颤抖着说出那人消失的方向——鬼风岭。', effect: 'item', itemId: 'clue_smith' },
        failure: { text: '老妇被旁人拉走，只来得及说一句"那人去了鬼风岭"。你在废墟中找到半块铸剑的模具。', effect: 'item', itemId: 'clue_smith' } },
    ],
  },
  {
    id: 'ev_qs_c5_rain', title: '雨天冲刷', areaId: 'qingshi', category: 'chain', chainRequires: 'ev_qs_c4_smith', chainNext: 'ev_qs_c6_boss',
    description: '一场大雨后，你路过师父住所后巷，发现墙根处被雨水冲出了一个浅坑。泥中露出一角油布包裹。',
    options: [
      { id: 'dig', text: '挖出包裹', successRate: 80, skillBonus: [],
        success: { text: '油布内是师父的手札，字迹潦草但清晰："若有人追来，切勿相信县衙。"——师父早已预料到了什么。五条线索已齐，该是动身的时候了。', effect: 'item', itemId: 'clue_journal' },
        failure: { text: '包裹被泥水浸透，但手札关键内容仍可辨认。师父的警告跃然纸上。', effect: 'item', itemId: 'clue_journal' } },
    ],
  },
  {
    id: 'ev_qs_c6_boss', title: '镇外截杀', areaId: 'qingshi', category: 'chain', chainRequires: 'ev_qs_c5_rain',
    requiresItems: ['clue_seal', 'clue_inn_note', 'clue_notice', 'clue_smith', 'clue_journal'],
    description: '当你收拾行囊准备前往鬼风岭时，一个黑衣人从大树上跃下挡住去路。他比镇上那些混混强壮许多，腰间别着精钢短刀。"铜印，交出来。否则你走不出这条路。"',
    options: [
      { id: 'fight', text: '握紧长剑，迎上前去', successRate: 100, skillBonus: [],
        success: { text: '黑衣人冷哼一声，拔刀冲来——', effect: 'combat', enemyId: 'black_agent' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ── 第二章：鬼风岭 ── 荒废驿站的秘密
  // ══════════════════════════════════════════════════════════════════════════

  // ── Repeatable（7个）──
  {
    id: 'ev_gf_rest', title: '马厩避风', areaId: 'guifeng', category: 'repeatable',
    description: '半坍塌的马厩里还算挡风。你在角落里升起一堆小火，烤干被雾气浸湿的衣物。',
    options: [
      { id: 'rest', text: '烤火休息', successRate: 75, skillBonus: [],
        success: { text: '火光驱散了寒意，你恢复了些许体力。', effect: 'heal', value: 20 },
        failure: { text: '柴火太潮，没烧多久就灭了。', effect: 'nothing' } },
      { id: 'cook', text: '煮些干粮（-5金）', successRate: 100, skillBonus: [],
        success: { text: '热食入腹，暖到心里。', effect: 'heal', value: 35, goldChange: -5 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不歇了', successRate: 100, skillBonus: [],
        success: { text: '你起身继续探索。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_gf_clue_search', title: '翻检旧物', areaId: 'guifeng', category: 'repeatable',
    description: '驿站仓房堆满了蒙尘的箱笼。有些盖子没关紧，里面或许还有当年驿卒留下的东西。',
    options: [
      { id: 'search', text: '翻找碎纸残骸', successRate: 55, skillBonus: [],
        success: { text: '你拼出了一些有用的信息。', effect: 'rumor' },
        failure: { text: '这片区域已经被翻过了。', effect: 'gossip' } },
      { id: 'bribe', text: '贿赂附近的匪徒套话（-8金）', successRate: 100, skillBonus: [],
        success: { text: '匪徒收了钱，透露了一些驿站的旧事。', effect: 'rumor', goldChange: -8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不浪费时间', successRate: 100, skillBonus: [],
        success: { text: '你继续深入。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_gf_sword', title: '枯井练剑', areaId: 'guifeng', category: 'repeatable',
    description: '驿站后院有口枯井，井壁上刻满了剑痕——不知哪位前人在此苦练。你跳入井中效仿。',
    options: [
      { id: 'practice', text: '反复揣摩', successRate: 60, skillBonus: [],
        success: { text: '招式愈发流畅。（剑法+5）', effect: 'skill_up', skillId: 'sword', value: 5 },
        failure: { text: '剑路太复杂，今天领悟不了。', effect: 'nothing' } },
      { id: 'exhaust', text: '练到力竭（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '手臂酸痛但出剑更加利落。（剑法+8）', effect: 'skill_up', skillId: 'sword', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '看看就好', successRate: 100, skillBonus: [],
        success: { text: '你记下了图案继续赶路。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_gf_agility', title: '横梁走索', areaId: 'guifeng', category: 'repeatable',
    description: '二楼地板已经腐朽，只剩几根横梁连接两端。要过去，只能踩着梁走。脚下是三丈深的碎石堆。',
    options: [
      { id: 'squeeze', text: '侧身穿过', successRate: 55, skillBonus: [],
        success: { text: '你灵巧地穿过缝隙，身法更加灵活。（身法+5）', effect: 'skill_up', skillId: 'agility', value: 5 },
        failure: { text: '被碎石卡住，费了些力气才出来。', effect: 'nothing' } },
      { id: 'fast', text: '快速冲过（-6气血）', successRate: 100, skillBonus: [],
        success: { text: '你不顾擦伤全速通过。（身法+8）', effect: 'skill_up', skillId: 'agility', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '绕路走', successRate: 100, skillBonus: [],
        success: { text: '你找了条宽敞的路。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_gf_body', title: '破门而入', areaId: 'guifeng', category: 'repeatable',
    description: '一扇铁皮包裹的厚重木门挡住去路，门栓锈死了。只能靠蛮力撞开。',
    options: [
      { id: 'push', text: '肩膀撞门', successRate: 60, skillBonus: [],
        success: { text: '三下五除二撞开了门。肩膀火辣辣地疼，但体魄又强了几分。（体魄+5）', effect: 'skill_up', skillId: 'body', value: 5 },
        failure: { text: '门纹丝不动，肩膀倒是青了一片。', effect: 'nothing' } },
      { id: 'brute', text: '后退助跑猛撞（-10气血）', successRate: 100, skillBonus: [],
        success: { text: '门框炸裂飞出！你揉着肩膀走进去，浑身骨头都在嘎嘎响。（体魄+8）', effect: 'skill_up', skillId: 'body', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '绕道', successRate: 100, skillBonus: [],
        success: { text: '你找了另一条路。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_gf_mind', title: '幽灯打坐', areaId: 'guifeng', category: 'repeatable',
    description: '一间密室中尚有一盏长明灯未灭。幽绿色的光让人心悸，却也让这里格外安静——适合练功。',
    options: [
      { id: 'recite', text: '在灯下打坐', successRate: 55, skillBonus: [],
        success: { text: '幽光反而让你心如止水，内息运转比往常更顺畅。（心法+5）', effect: 'skill_up', skillId: 'mind', value: 5 },
        failure: { text: '那绿光让你心神不宁，无法入定。', effect: 'nothing' } },
      { id: 'deep_read', text: '在阴气中强行运功（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '阴寒侵体，但你以内息抵抗，心法在逆境中精进了。（心法+8）', effect: 'skill_up', skillId: 'mind', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '这地方太邪门', successRate: 100, skillBonus: [],
        success: { text: '你快步离开了密室。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_gf_insight', title: '死人留言', areaId: 'guifeng', category: 'repeatable',
    description: '走廊墙壁上有人用血写了几行字，记录着某种规律："第三块砖...转角处...左二右三..."似乎是对陷阱的总结。',
    options: [
      { id: 'study', text: '仔细辨认记住', successRate: 55, skillBonus: [],
        success: { text: '你将规律默记于心。对这种地方的机关，你已能预判七八分。（战悟+5）', effect: 'skill_up', skillId: 'insight', value: 5 },
        failure: { text: '血迹太模糊，关键几个字看不清。', effect: 'nothing' } },
      { id: 'test', text: '按规律实地验证（-6气血）', successRate: 100, skillBonus: [],
        success: { text: '你沿着提示走了一遍，虽然被擦伤但完全摸清了规律。（战悟+8）', effect: 'skill_up', skillId: 'insight', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不信死人的话', successRate: 100, skillBonus: [],
        success: { text: '你绕开了这面墙。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },

  // ── Chain: 主线（收集5条线索 + 2段准备 → Boss: 驿站守卫亡魂）──
  {
    id: 'ev_gf_c1_stable', title: '倒塌马厩', areaId: 'guifeng', category: 'chain', chainNext: 'ev_gf_c2_cellar', minExploration: 5,
    description: '驿站入口处的马厩坍塌大半。断木间你看到一具白骨，身上的驿卒服已腐烂，手中紧攥着一封染血的信。',
    options: [
      { id: 'read_letter', text: '取出信件阅读', successRate: 75, skillBonus: [],
        success: { text: '"地下酒窖有暗门...密室在最里面...切记不可动第三个酒桶..."', effect: 'item', itemId: 'clue_gf_letter' },
        failure: { text: '信件大部分被血浸透，但"酒窖"和"暗门"你看清了。', effect: 'item', itemId: 'clue_gf_letter' } },
    ],
  },
  {
    id: 'ev_gf_c2_cellar', title: '地下酒窖', areaId: 'guifeng', category: 'chain', chainRequires: 'ev_gf_c1_stable', chainNext: 'ev_gf_c3_quarters', minExploration: 8,
    description: '你找到驿站地下酒窖。按照信中提示避开第三个桶，在最内侧找到一扇暗门。',
    options: [
      { id: 'open_door', text: '推开暗门', successRate: 65, skillBonus: [],
        success: { text: '门后是狭窄甬道，你记下了布局。', effect: 'item', itemId: 'clue_gf_cellar' },
        failure: { text: '暗门机关卡住，你用力推开，飞针擦过手臂。但暗门开了。', effect: 'item', itemId: 'clue_gf_cellar' } },
    ],
  },
  {
    id: 'ev_gf_c3_quarters', title: '驿卒宿舍', areaId: 'guifeng', category: 'chain', chainRequires: 'ev_gf_c2_cellar', chainNext: 'ev_gf_c4_diary', minExploration: 12,
    description: '甬道尽头是一间保存完好的房间。床铺整齐，桌上有一盏油灯。枕头下藏着一本日记。',
    options: [
      { id: 'search_room', text: '阅读日记', successRate: 70, skillBonus: [],
        success: { text: '日记记录了驿站废弃前后的事，让你对这里的过去有了清晰了解。', effect: 'item', itemId: 'clue_gf_diary' },
        failure: { text: '日记部分页面粘连，但关键信息你看到了。', effect: 'item', itemId: 'clue_gf_diary' } },
    ],
  },
  {
    id: 'ev_gf_c4_diary', title: '遗书警告', areaId: 'guifeng', category: 'chain', chainRequires: 'ev_gf_c3_quarters', chainNext: 'ev_gf_c5_symbol', minExploration: 16,
    description: '日记最后一页："调查队全员遇害。龙脉已开，切勿前往云隐寺。第一把钥匙在密室——但那个东西在守着它。"',
    options: [
      { id: 'proceed', text: '记下警告，继续深入', successRate: 75, skillBonus: [],
        success: { text: '你将这份警告牢记于心。前方的密室必有危险，但也有答案。', effect: 'item', itemId: 'clue_gf_warning' },
        failure: { text: '路上触发陷阱受了轻伤，但警告内容你已记住。', effect: 'item', itemId: 'clue_gf_warning' } },
    ],
  },
  {
    id: 'ev_gf_c5_symbol', title: '飞禽符号', areaId: 'guifeng', category: 'chain', chainRequires: 'ev_gf_c4_diary', chainNext: 'ev_gf_c6_prepare', minExploration: 20,
    description: '密室前的走廊墙壁上刻着一个巨大的飞禽符号——与你在青石镇从黑衣人身上见过的图案一模一样。',
    options: [
      { id: 'rub', text: '拓印符号', successRate: 70, skillBonus: [],
        success: { text: '你用纸墨拓下图案。这个线索将所有事串联起来了。', effect: 'item', itemId: 'clue_gf_symbol' },
        failure: { text: '拓印不太清晰，但轮廓你记住了。', effect: 'item', itemId: 'clue_gf_symbol' } },
    ],
  },
  {
    id: 'ev_gf_c6_prepare', title: '密室前的寒意', areaId: 'guifeng', category: 'chain', chainRequires: 'ev_gf_c5_symbol', chainNext: 'ev_gf_c7_ritual',
    description: '越靠近密室，空气越冷。你的呼吸化为白雾，剑柄上凝结了一层薄霜。这不是普通的寒冷——是怨气。',
    options: [
      { id: 'meditate', text: '调息运气，稳定心神', successRate: 60, skillBonus: [],
        success: { text: '你盘膝静坐片刻，内力涌动驱散了部分寒意。意志更加坚定了。', effect: 'stat_up' },
        failure: { text: '寒气侵入经脉，你打了个寒颤。但意志反而因此磨砺。', effect: 'stat_up' } },
    ],
  },
  {
    id: 'ev_gf_c7_ritual', title: '破阵准备', areaId: 'guifeng', category: 'chain', chainRequires: 'ev_gf_c6_prepare', chainNext: 'ev_gf_c8_boss',
    description: '密室门前地面刻着一圈符文，幽绿色的光从缝隙中渗出。你需要做最后的准备。',
    options: [
      { id: 'study_rune', text: '研究符文找破绽', successRate: 55, skillBonus: [],
        success: { text: '你发现符文的运转有规律——每隔七息会出现一瞬间的空隙。这就是突破口。', effect: 'stat_up' },
        failure: { text: '符文太过复杂。但你决定强行闯入，用实力说话。', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_gf_c8_boss', title: '密室守卫', areaId: 'guifeng', category: 'chain', chainRequires: 'ev_gf_c7_ritual',
    requiresItems: ['clue_gf_letter', 'clue_gf_cellar', 'clue_gf_diary', 'clue_gf_warning', 'clue_gf_symbol'],
    description: '密室中央悬浮着一团幽绿色的光。光芒凝聚成一个身着驿卒甲胄的虚影，举起生锈长枪。"...无人...可以...带走...钥匙..."',
    options: [
      { id: 'fight', text: '举剑迎战亡魂', successRate: 100, skillBonus: [],
        success: { text: '亡魂发出无声的嘶吼，战斗开始——', effect: 'combat', enemyId: 'station_wraith' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ── 第三章：云隐寺 ── 佛门藏秘
  // ══════════════════════════════════════════════════════════════════════════

  // ── Repeatable（7个，禅寺主题）──
  {
    id: 'ev_yy_rest', title: '禅房小憩', areaId: 'yunyin', category: 'repeatable',
    description: '空置的禅房中有干净的床铺和淡淡的檀香。老僧说这里可以歇息。',
    options: [
      { id: 'nap', text: '躺下小睡', successRate: 80, skillBonus: [],
        success: { text: '檀香助眠，你醒来时精神焕发。', effect: 'heal', value: 25 },
        failure: { text: '外面木鱼声太响，没睡好。', effect: 'nothing' } },
      { id: 'incense', text: '焚香静养（-6金）', successRate: 100, skillBonus: [],
        success: { text: '名贵的安神香让你沉睡了一个时辰，醒来神清气爽。', effect: 'heal', value: 40, goldChange: -6 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不歇了', successRate: 100, skillBonus: [],
        success: { text: '你合掌向禅房致意便离开。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_yy_rumor', title: '僧侣问答', areaId: 'yunyin', category: 'repeatable',
    description: '一位云游僧路过此寺挂单。他见多识广，或许知道些外面的消息。',
    options: [
      { id: 'ask', text: '请教见闻', successRate: 55, skillBonus: [],
        success: { text: '云游僧讲起沿途所见，其中不乏有用信息。', effect: 'rumor' },
        failure: { text: '他只念了句"阿弥陀佛"便闭目不语。', effect: 'gossip' } },
      { id: 'offer', text: '供奉香油钱请教（-6金）', successRate: 100, skillBonus: [],
        success: { text: '你添了香油钱，僧人微笑着说起途中见闻。', effect: 'rumor', goldChange: -6 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不打扰修行', successRate: 100, skillBonus: [],
        success: { text: '你双手合十退去。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_yy_sword', title: '落叶剑法', areaId: 'yunyin', category: 'repeatable',
    description: '古松下落叶纷飞。你拔剑在林间挥舞，试着在每片叶子落地前将其斩断。',
    options: [
      { id: 'cut', text: '斩落叶', successRate: 60, skillBonus: [],
        success: { text: '十片叶子斩了七片。剑势越来越准。（剑法+5）', effect: 'skill_up', skillId: 'sword', value: 5 },
        failure: { text: '风向多变，叶子飘忽不定。', effect: 'nothing' } },
      { id: 'blindfold', text: '闭眼听风斩叶（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '你闭上眼用耳朵追踪落叶。被树枝打了几下，但剑感大进。（剑法+8）', effect: 'skill_up', skillId: 'sword', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '只是赏景', successRate: 100, skillBonus: [],
        success: { text: '你负手看了会儿落叶便走了。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_yy_agility', title: '塔林穿行', areaId: 'yunyin', category: 'repeatable',
    description: '后山塔林石塔密集，间距仅容一人侧身。在塔间快速穿行是极好的身法练习。',
    options: [
      { id: 'run', text: '在塔间穿梭', successRate: 55, skillBonus: [],
        success: { text: '你在石塔间如鱼穿林，脚步越来越轻盈。（身法+5）', effect: 'skill_up', skillId: 'agility', value: 5 },
        failure: { text: '肩膀撞到了石塔，疼了一下。', effect: 'nothing' } },
      { id: 'sprint', text: '全速冲刺（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '你像一阵风掠过塔林。虽然磕碰了几处，但身法飞跃。（身法+8）', effect: 'skill_up', skillId: 'agility', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '慢慢走过', successRate: 100, skillBonus: [],
        success: { text: '你小心翼翼走过塔林。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_yy_body', title: '挑水上山', areaId: 'yunyin', category: 'repeatable',
    description: '寺中用水需要从山下泉眼挑上来。老僧看了你一眼："施主可愿帮忙？"',
    options: [
      { id: 'carry', text: '挑一担上山', successRate: 60, skillBonus: [],
        success: { text: '百余级石阶挑水而上，到顶时大汗淋漓但浑身舒畅。（体魄+5）', effect: 'skill_up', skillId: 'body', value: 5 },
        failure: { text: '石阶太陡，挑到一半洒了大半桶。', effect: 'nothing' } },
      { id: 'double', text: '挑两担（-10气血）', successRate: 100, skillBonus: [],
        success: { text: '你一趟挑了两桶！老僧赞道"善哉"。肩膀酸但体魄更强。（体魄+8）', effect: 'skill_up', skillId: 'body', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '婉拒', successRate: 100, skillBonus: [],
        success: { text: '你合十婉拒。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_yy_mind', title: '梵钟诵经', areaId: 'yunyin', category: 'repeatable',
    description: '晨钟暮鼓之间，大殿中僧人正在诵经。梵音阵阵，令人心绪渐平。',
    options: [
      { id: 'join', text: '跟着默诵', successRate: 55, skillBonus: [],
        success: { text: '经文的节奏暗合呼吸吐纳之道，你的内息更加绵长。（心法+5）', effect: 'skill_up', skillId: 'mind', value: 5 },
        failure: { text: '你听不懂经文，脑中一片空白。', effect: 'nothing' } },
      { id: 'deep', text: '入定一炷香（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '你盘膝入定，梵音如洗。一炷香后浑身经脉通畅如泉。（心法+8）', effect: 'skill_up', skillId: 'mind', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '在门口听了听便走', successRate: 100, skillBonus: [],
        success: { text: '你双手合十便退去。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_yy_insight', title: '棋枰残局', areaId: 'yunyin', category: 'repeatable',
    description: '后院石桌上摆着一局围棋残局。黑白子交错，胜负只在一手之间。旁边刻着"悟"字。',
    options: [
      { id: 'think', text: '凝神推演', successRate: 50, skillBonus: [],
        success: { text: '你闭目将棋局在脑中推演数十步，忽然领悟了"先手"的真谛。（战悟+5）', effect: 'skill_up', skillId: 'insight', value: 5 },
        failure: { text: '局面太复杂，你想了半天也没头绪。', effect: 'nothing' } },
      { id: 'all_in', text: '废寝忘食研究（-6金买茶提神）', successRate: 100, skillBonus: [],
        success: { text: '你买了壶浓茶，对着棋局想了整整两个时辰。终于明白了"弃子取势"。（战悟+8）', effect: 'skill_up', skillId: 'insight', value: 8, goldChange: -6 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '看不懂棋', successRate: 100, skillBonus: [],
        success: { text: '你耸耸肩走了。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },

  // ── Chain: 主线（收集5条线索 → Boss: 机关铜人）──
  {
    id: 'ev_yy_c1_gate', title: '老僧指引', areaId: 'yunyin', category: 'chain', chainNext: 'ev_yy_c2_library', minExploration: 5,
    description: '云隐寺侧门虚掩。你推门而入，一位扫地老僧抬头看了你一眼，目光落在你怀中铜印的位置："施主带着龙纹之物...请随我来。"',
    options: [
      { id: 'follow', text: '跟随老僧', successRate: 80, skillBonus: [],
        success: { text: '老僧领你穿过回廊，来到藏经阁前。"你要找的答案，在里面。"', effect: 'item', itemId: 'clue_yy_monk' },
        failure: { text: '老僧走得极快，你勉强跟上。最终来到藏经阁。', effect: 'item', itemId: 'clue_yy_monk' } },
    ],
  },
  {
    id: 'ev_yy_c2_library', title: '秘藏真相', areaId: 'yunyin', category: 'chain', chainRequires: 'ev_yy_c1_gate', chainNext: 'ev_yy_c3_five_keys', minExploration: 8,
    description: '藏经阁暗门后是一间密室，墙壁上画满山川地图。老僧说："龙隐秘藏并非金银，而是山川布防图、军事密道和一份皇室遗诏。"',
    options: [
      { id: 'ask', text: '"这意味着什么？"', successRate: 75, skillBonus: [],
        success: { text: '"谁掌握了这些，就能左右天下大势。太祖将其封存，正是怕后人争夺。"', effect: 'item', itemId: 'clue_yy_truth' },
        failure: { text: '老僧叹息不语，但墙上的地图你已看清。', effect: 'item', itemId: 'clue_yy_truth' } },
    ],
  },
  {
    id: 'ev_yy_c3_five_keys', title: '五钥之秘', areaId: 'yunyin', category: 'chain', chainRequires: 'ev_yy_c2_library', chainNext: 'ev_yy_c4_pagoda', minExploration: 12,
    description: '"五把钥匙分藏五处，集齐方可开启龙隐地宫。你手中的铜虎符是第一把。第二把就在本寺地宫之中。"老僧目光深邃。',
    options: [
      { id: 'ask_location', text: '"地宫在何处？"', successRate: 70, skillBonus: [],
        success: { text: '"后山塔林，龙纹石塔之下。但...那里有洪武年间留下的守护机关，至今仍在运转。"', effect: 'item', itemId: 'clue_yy_five_keys' },
        failure: { text: '老僧只说了"塔林"二字便闭目入定。但你已知道方向。', effect: 'item', itemId: 'clue_yy_five_keys' } },
    ],
  },
  {
    id: 'ev_yy_c4_pagoda', title: '塔林入口', areaId: 'yunyin', category: 'chain', chainRequires: 'ev_yy_c3_five_keys', chainNext: 'ev_yy_c5_formation', minExploration: 16,
    description: '后山石塔群中，一座塔的基座刻有与铜印相同的龙纹。你将铜印按入凹槽——石塔缓缓移开，露出向下的石阶。',
    options: [
      { id: 'descend', text: '沿石阶下行', successRate: 70, skillBonus: [],
        success: { text: '石阶两侧油灯自动点燃。你记下了入口位置和下行路线。', effect: 'item', itemId: 'clue_yy_entrance' },
        failure: { text: '第三阶触发暗箭，你闪过但仍被擦伤。入口位置已确认。', effect: 'item', itemId: 'clue_yy_entrance' } },
    ],
  },
  {
    id: 'ev_yy_c5_formation', title: '棋盘步法', areaId: 'yunyin', category: 'chain', chainRequires: 'ev_yy_c4_pagoda', chainNext: 'ev_yy_c6_prepare', minExploration: 20,
    description: '石阶尽头是铜门，门前地砖排列如棋盘。龙纹地砖形成一条隐秘路径——这是步法机关。',
    options: [
      { id: 'solve', text: '沿龙纹路径行走', successRate: 60, skillBonus: [],
        success: { text: '你小心翼翼踏过龙纹地砖，铜门无声打开。步法口诀烙印在心中。', effect: 'item', itemId: 'clue_yy_formation' },
        failure: { text: '踩错一步，铁刺弹出。你忍痛记住了正确路径。', effect: 'item', itemId: 'clue_yy_formation' } },
    ],
  },
  {
    id: 'ev_yy_c6_prepare', title: '铜人苏醒', areaId: 'yunyin', category: 'chain', chainRequires: 'ev_yy_c5_formation', chainNext: 'ev_yy_c7_boss',
    description: '铜门后的石室中央，一尊两米高的铜人静默矗立。当你踏入，它的胸口铜轮缓缓转动，关节发出金属摩擦声。',
    options: [
      { id: 'observe', text: '观察铜人弱点', successRate: 55, skillBonus: [],
        success: { text: '你注意到铜轮转动有规律——每七息停顿一次，那就是攻击间隙。', effect: 'stat_up' },
        failure: { text: '铜人动作太快，你来不及看清。只能硬拼了。', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_yy_c7_boss', title: '铜人试炼', areaId: 'yunyin', category: 'chain', chainRequires: 'ev_yy_c6_prepare',
    requiresItems: ['clue_yy_monk', 'clue_yy_truth', 'clue_yy_five_keys', 'clue_yy_entrance', 'clue_yy_formation'],
    description: '"试...炼...开...始..."铜人举起铁拳，地面震颤。这是洪武年间的守护机关——只有通过试炼，才能获得第二把秘钥。',
    options: [
      { id: 'fight', text: '进入战斗姿态', successRate: 100, skillBonus: [],
        success: { text: '铜人轰然砸来——', effect: 'combat', enemyId: 'bronze_golem' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ── 第四章：黑石矿洞 ── 地下迷城
  // ══════════════════════════════════════════════════════════════════════════

  // ── Repeatable（7个，矿洞势力角逐主题）──
  {
    id: 'ev_hs_rest', title: '暗室歇脚', areaId: 'heishi', category: 'repeatable',
    description: '你找到一间被遗弃的值班室，门还能关上。总算有个安全的地方歇口气。',
    options: [
      { id: 'rest', text: '靠墙打盹', successRate: 75, skillBonus: [],
        success: { text: '浅眠片刻，体力恢复了些。', effect: 'heal', value: 22 },
        failure: { text: '远处传来打斗声，你没敢睡。', effect: 'nothing' } },
      { id: 'bandage', text: '用补给包处理伤口（-8金）', successRate: 100, skillBonus: [],
        success: { text: '你仔细清理了伤口并包扎，疼痛减轻不少。', effect: 'heal', value: 38, goldChange: -8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '继续前进', successRate: 100, skillBonus: [],
        success: { text: '你不敢久留。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_hs_rumor', title: '截获密信', areaId: 'heishi', category: 'repeatable',
    description: '矿道岔路口有一具倒下的匪徒尸体，怀中似乎藏着什么。',
    options: [
      { id: 'search', text: '搜身', successRate: 55, skillBonus: [],
        success: { text: '你从他怀中找到一张纸条，记载着势力动向。', effect: 'rumor' },
        failure: { text: '只有几枚铜板和一壶劣酒。', effect: 'gossip' } },
      { id: 'thorough', text: '仔细翻找暗袋（-5金买火折子照明）', successRate: 100, skillBonus: [],
        success: { text: '火光下你找到了夹层中的密信。', effect: 'rumor', goldChange: -5 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不碰死人', successRate: 100, skillBonus: [],
        success: { text: '你绕过尸体继续走。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_hs_sword', title: '暗中交手', areaId: 'heishi', category: 'repeatable',
    description: '矿洞深处突然窜出一个黑影向你挥刀！是哨兵——你必须速战速决免得引来更多人。',
    options: [
      { id: 'quick_kill', text: '快速制敌', successRate: 60, skillBonus: [],
        success: { text: '你三招之内将对方撂倒。实战让剑法更加凌厉。（剑法+5）', effect: 'skill_up', skillId: 'sword', value: 5 },
        failure: { text: '对方喊了一嗓子才被你放倒，得赶紧走。', effect: 'nothing' } },
      { id: 'decisive', text: '一剑封喉（-8气血拼速度）', successRate: 100, skillBonus: [],
        success: { text: '你不顾对方反击一剑刺出——正中要害。你的剑更快了。（剑法+8）', effect: 'skill_up', skillId: 'sword', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '拔腿就跑', successRate: 100, skillBonus: [],
        success: { text: '你转身消失在黑暗中。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_hs_agility', title: '矿车飞驰', areaId: 'heishi', category: 'repeatable',
    description: '铁轨上有一辆锈迹斑斑的矿车。推一把它就能沿着下坡轨道滑行——如果你跳得上去的话。',
    options: [
      { id: 'jump', text: '推车后跳上去', successRate: 55, skillBonus: [],
        success: { text: '你纵身跃入矿车，在黑暗中飞驰而过。身法更灵活了。（身法+5）', effect: 'skill_up', skillId: 'agility', value: 5 },
        failure: { text: '没跳准，摔了一跤。矿车自己跑了。', effect: 'nothing' } },
      { id: 'ride_blind', text: '闭眼凭感觉跳（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '你在全黑中凭着风声判断矿车位置一跃而上。虽然磕了膝盖但身法大进。（身法+8）', effect: 'skill_up', skillId: 'agility', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '用脚走', successRate: 100, skillBonus: [],
        success: { text: '你沿着轨道步行。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_hs_body', title: '塌方自救', areaId: 'heishi', category: 'repeatable',
    description: '头顶突然传来隆隆声，碎石坠落！你需要用身体顶住倾斜的支撑柱争取逃跑时间。',
    options: [
      { id: 'hold', text: '扛住柱子', successRate: 60, skillBonus: [],
        success: { text: '你咬牙顶住了柱子三息，然后翻滚逃出。体魄更强了。（体魄+5）', effect: 'skill_up', skillId: 'body', value: 5 },
        failure: { text: '柱子太重，你被压了一下才滚出去。', effect: 'damage', value: 5 } },
      { id: 'full_force', text: '用肩膀硬扛到最后（-10气血）', successRate: 100, skillBonus: [],
        success: { text: '你硬生生扛到碎石停止才松手。肩膀几乎脱臼但体魄暴涨。（体魄+8）', effect: 'skill_up', skillId: 'body', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '直接跑', successRate: 100, skillBonus: [],
        success: { text: '你头也不回地冲出去了。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_hs_mind', title: '地脉吐纳', areaId: 'heishi', category: 'repeatable',
    description: '矿洞深处有一处地热涌泉，温暖的水汽让空气潮湿。在此处运功，气血运转格外顺畅。',
    options: [
      { id: 'meditate', text: '就地运功', successRate: 55, skillBonus: [],
        success: { text: '地热辅助内息运转，经脉中有温热流动。（心法+5）', effect: 'skill_up', skillId: 'mind', value: 5 },
        failure: { text: '湿气太重，你反而胸闷。', effect: 'nothing' } },
      { id: 'deep_dive', text: '浸入温泉冥想（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '热水浸透全身，你感到经脉被打开了一丝。心法精进。（心法+8）', effect: 'skill_up', skillId: 'mind', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不敢泡', successRate: 100, skillBonus: [],
        success: { text: '你看了看便走了。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_hs_insight', title: '三方对峙', areaId: 'heishi', category: 'repeatable',
    description: '前方传来争吵声——锦衣卫和山贼正在对峙。你藏在暗处观察局势。',
    options: [
      { id: 'observe', text: '观察双方动向', successRate: 55, skillBonus: [],
        success: { text: '你从双方的站位和气势中判断出了谁占上风。战场感悟加深。（战悟+5）', effect: 'skill_up', skillId: 'insight', value: 5 },
        failure: { text: '他们说的暗语你听不懂。', effect: 'nothing' } },
      { id: 'provoke', text: '扔石头制造混乱趁火打劫（-6金做烟雾弹）', successRate: 100, skillBonus: [],
        success: { text: '你点燃烟雾扔过去，趁混乱摸清了双方底细。谋略又进一步。（战悟+8）', effect: 'skill_up', skillId: 'insight', value: 8, goldChange: -6 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '悄悄绕路', successRate: 100, skillBonus: [],
        success: { text: '你不想卷入纷争。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },

  // ── Chain: 主线（收集5条线索 → Boss: 血狼寨寨主）──
  {
    id: 'ev_hs_c1_entrance', title: '矿洞三岔口', areaId: 'heishi', category: 'chain', chainNext: 'ev_hs_c2_jinyi', minExploration: 5,
    description: '矿洞深处分出三条路。左侧是整齐官靴脚印，中间有火把痕迹，右侧传来笑声和酒气。三方势力都已到了。',
    options: [
      { id: 'scout', text: '三条路都侦察一番', successRate: 60, skillBonus: [],
        success: { text: '你摸清了三方的大致位置和人数。', effect: 'item', itemId: 'clue_hs_three_forces' },
        failure: { text: '只探明了两条路的情况，但足够了。', effect: 'item', itemId: 'clue_hs_three_forces' } },
    ],
  },
  {
    id: 'ev_hs_c2_jinyi', title: '锦衣卫密约', areaId: 'heishi', category: 'chain', chainRequires: 'ev_hs_c1_entrance', chainNext: 'ev_hs_c3_yan', minExploration: 8,
    description: '锦衣卫百户拦住你："你不是朝廷的人，但既然有铜印...或许我们可以合作。血狼寨手里有第三把钥匙。"',
    options: [
      { id: 'agree', text: '达成合作', successRate: 70, skillBonus: [],
        success: { text: '"事成后钥匙归你。"他递来令牌。你的谋略更进一步。', effect: 'item', itemId: 'clue_hs_jinyi_deal' },
        failure: { text: '他只透露了寨主营地方位。但这已是重要情报。', effect: 'item', itemId: 'clue_hs_jinyi_deal' } },
    ],
  },
  {
    id: 'ev_hs_c3_yan', title: '燕王暗卫情报', areaId: 'heishi', category: 'chain', chainRequires: 'ev_hs_c2_jinyi', chainNext: 'ev_hs_c4_truth', minExploration: 12,
    description: '暗室中遇到燕王旧部暗卫。他看到令牌后说："我们目标一样。那寨主嗜酒如命，子时必醉。"',
    options: [
      { id: 'listen', text: '继续套话', successRate: 75, skillBonus: [],
        success: { text: '"有人故意散播藏宝传言，目的是让我们互相消耗。"这份情报价值连城。', effect: 'item', itemId: 'clue_hs_yan_intel' },
        failure: { text: '暗卫有所保留，但"子时动手"你记住了。', effect: 'item', itemId: 'clue_hs_yan_intel' } },
    ],
  },
  {
    id: 'ev_hs_c4_truth', title: '幕后密信', areaId: 'heishi', category: 'chain', chainRequires: 'ev_hs_c3_yan', chainNext: 'ev_hs_c5_camp', minExploration: 16,
    description: '寨主营地外围的垃圾堆里，你发现一封密信："散播传言引三方入洞互斗，趁乱取走钥匙。"落款——飞禽符号。',
    options: [
      { id: 'take', text: '收好密信', successRate: 80, skillBonus: [],
        success: { text: '所有线索串联了——飞禽组织才是幕后黑手。', effect: 'item', itemId: 'clue_hs_conspiracy' },
        failure: { text: '信件部分破损但关键内容清晰。', effect: 'item', itemId: 'clue_hs_conspiracy' } },
    ],
  },
  {
    id: 'ev_hs_c5_camp', title: '营地侦察', areaId: 'heishi', category: 'chain', chainRequires: 'ev_hs_c4_truth', chainNext: 'ev_hs_c6_prepare', minExploration: 20,
    description: '你潜到血狼寨营地高处，仔细观察巡逻规律和布局。',
    options: [
      { id: 'map', text: '画下营地布局图', successRate: 65, skillBonus: [],
        success: { text: '换岗时间、哨位、寨主帐篷位置——全部记下。', effect: 'item', itemId: 'clue_hs_camp_layout' },
        failure: { text: '被发现前只记了大半，但关键信息够了。', effect: 'item', itemId: 'clue_hs_camp_layout' } },
    ],
  },
  {
    id: 'ev_hs_c6_prepare', title: '子时突袭', areaId: 'heishi', category: 'chain', chainRequires: 'ev_hs_c5_camp', chainNext: 'ev_hs_c7_boss',
    description: '子时已到，寨主帐中传出鼾声。你摸黑靠近，一脚踢翻他的酒坛。寨主猛然惊醒，抄起大刀。',
    options: [
      { id: 'confront', text: '趁他酒醉出手', successRate: 70, skillBonus: [],
        success: { text: '你抢得先机一剑削去他半片衣袖。寨主怒吼着完全清醒。', effect: 'stat_up' },
        failure: { text: '寨主酒量惊人，竟然清醒得很快。你失了先手。', effect: 'damage', value: 10 } },
    ],
  },
  {
    id: 'ev_hs_c7_boss', title: '血狼寨之战', areaId: 'heishi', category: 'chain', chainRequires: 'ev_hs_c6_prepare',
    requiresItems: ['clue_hs_three_forces', 'clue_hs_jinyi_deal', 'clue_hs_yan_intel', 'clue_hs_conspiracy', 'clue_hs_camp_layout'],
    description: '寨主身形魁梧，鬼头大刀在火光中映出寒芒。"小子，你以为偷袭就能赢？"他暴喝一声挥刀砸来。',
    options: [
      { id: 'fight', text: '全力迎战', successRate: 100, skillBonus: [],
        success: { text: '刀剑相交，火星四溅——', effect: 'combat', enemyId: 'wolf_chief' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // ── 第五章：龙隐地宫 ── 皇权之谜
  // ══════════════════════════════════════════════════════════════════════════

  // ── Repeatable（7个，地宫机关阵法主题）──
  {
    id: 'ev_ly_rest', title: '龙纹暖室', areaId: 'longyin', category: 'repeatable',
    description: '地宫中有一间龙纹发光的小室，空气温暖干燥。似乎是当年守卫者休息的地方。',
    options: [
      { id: 'rest', text: '在暖室中歇息', successRate: 80, skillBonus: [],
        success: { text: '龙纹散发的温热让你的伤痛缓解了不少。', effect: 'heal', value: 25 },
        failure: { text: '龙纹忽然暗淡，暖意消失了。', effect: 'nothing' } },
      { id: 'absorb', text: '引导龙纹暖气入体（-10金点燃阵眼）', successRate: 100, skillBonus: [],
        success: { text: '你点燃阵眼，暖气涌入全身经脉。', effect: 'heal', value: 45, goldChange: -10 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不敢久留', successRate: 100, skillBonus: [],
        success: { text: '你小心翼翼退出暖室。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_ly_rumor', title: '壁画记事', areaId: 'longyin', category: 'repeatable',
    description: '走廊壁画中隐藏着文字记载，记录着地宫修建的历史和各处机关的暗示。',
    options: [
      { id: 'read', text: '辨认壁画文字', successRate: 55, skillBonus: [],
        success: { text: '你读出了一段关于地宫布局的记载。', effect: 'rumor' },
        failure: { text: '文字太古老了，看不出所以然。', effect: 'gossip' } },
      { id: 'rub', text: '用纸墨拓印（-6金）', successRate: 100, skillBonus: [],
        success: { text: '拓印后文字清晰了许多，你得到了重要信息。', effect: 'rumor', goldChange: -6 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '走马观花', successRate: 100, skillBonus: [],
        success: { text: '你扫了一眼便继续深入。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_ly_sword', title: '剑阵残影', areaId: 'longyin', category: 'repeatable',
    description: '一间圆形石室中，地面刻满了剑法招式图。当你踏入时，龙纹亮起——石像开始演示剑招！',
    options: [
      { id: 'mimic', text: '跟着石像演练', successRate: 60, skillBonus: [],
        success: { text: '石像的剑法古朴厚重，你从中领悟了几分精髓。（剑法+5）', effect: 'skill_up', skillId: 'sword', value: 5 },
        failure: { text: '石像动作太快，你跟不上。', effect: 'nothing' } },
      { id: 'spar_stone', text: '与石像对练（-10气血）', successRate: 100, skillBonus: [],
        success: { text: '石像出手凌厉！你勉力接了数十招，虽然遍体鳞伤但剑法飞进。（剑法+8）', effect: 'skill_up', skillId: 'sword', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不敢靠近', successRate: 100, skillBonus: [],
        success: { text: '你退出石室。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_ly_agility', title: '连环飞刃', areaId: 'longyin', category: 'repeatable',
    description: '前方走廊两侧的墙壁上密布暗孔。你看到地上有无数划痕——这是飞刃通道，需要快速通过。',
    options: [
      { id: 'dash', text: '观察间隙冲过', successRate: 55, skillBonus: [],
        success: { text: '你看准飞刃的间隔，腾挪闪转安然通过。（身法+5）', effect: 'skill_up', skillId: 'agility', value: 5 },
        failure: { text: '被擦伤了一处，但还是过去了。', effect: 'damage', value: 5 } },
      { id: 'blind_rush', text: '不看直接冲（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '你全凭本能闪避，被划了几道但身法在极限中突破。（身法+8）', effect: 'skill_up', skillId: 'agility', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '找别的路', successRate: 100, skillBonus: [],
        success: { text: '你退回去另寻通路。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_ly_body', title: '石门试力', areaId: 'longyin', category: 'repeatable',
    description: '又一道石门。这次没有机关——上面只刻着四个字："力可开山。"门重千斤。',
    options: [
      { id: 'push', text: '双手推门', successRate: 60, skillBonus: [],
        success: { text: '你运足气力，石门缓缓移开。体魄更上一层。（体魄+5）', effect: 'skill_up', skillId: 'body', value: 5 },
        failure: { text: '门纹丝不动。你还不够强。', effect: 'nothing' } },
      { id: 'shoulder', text: '用肩膀死顶（-10气血）', successRate: 100, skillBonus: [],
        success: { text: '你低吼一声以肩抵门，石门终于让步。你的极限又被突破了。（体魄+8）', effect: 'skill_up', skillId: 'body', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '另寻出路', successRate: 100, skillBonus: [],
        success: { text: '你绕道寻找其他通道。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_ly_mind', title: '龙息吐纳', areaId: 'longyin', category: 'repeatable',
    description: '地宫深处有一处龙口石雕，龙口中持续吐出温热的气流。在此处运功有奇效。',
    options: [
      { id: 'breathe', text: '对着龙息运功', successRate: 55, skillBonus: [],
        success: { text: '龙息中似乎蕴含着某种力量，你的内息运转更加精纯。（心法+5）', effect: 'skill_up', skillId: 'mind', value: 5 },
        failure: { text: '气流太猛，扰乱了你的呼吸节奏。', effect: 'nothing' } },
      { id: 'absorb_all', text: '以身纳气（-8气血）', successRate: 100, skillBonus: [],
        success: { text: '你张开双臂迎接龙息，虽然灼热但内功突飞猛进。（心法+8）', effect: 'skill_up', skillId: 'mind', value: 8 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不敢尝试', successRate: 100, skillBonus: [],
        success: { text: '你绕过龙口继续前行。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_ly_insight', title: '阵法推演', areaId: 'longyin', category: 'repeatable',
    description: '地面上刻着一座复杂的八卦阵图。某些位置的石砖可以移动——这是一道谜题。',
    options: [
      { id: 'solve', text: '尝试推演阵法', successRate: 50, skillBonus: [],
        success: { text: '你移动了三块石砖，阵法发出微光——你理解了它的运转逻辑。（战悟+5）', effect: 'skill_up', skillId: 'insight', value: 5 },
        failure: { text: '太复杂了，你怎么移都不对。', effect: 'nothing' } },
      { id: 'brute_solve', text: '逐一试错（-6金做标记）', successRate: 100, skillBonus: [],
        success: { text: '你用粉笔在试过的位置做标记，终于找到了正确组合。（战悟+8）', effect: 'skill_up', skillId: 'insight', value: 8, goldChange: -6 },
        failure: { text: '', effect: 'nothing' } },
      { id: 'pass', text: '不碰', successRate: 100, skillBonus: [],
        success: { text: '你绕过了阵图。', effect: 'nothing' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },

  // ── Chain: 主线（收集5条线索 → Boss: 龙隐守护者）──
  {
    id: 'ev_ly_c1_corridor', title: '龙纹长廊', areaId: 'longyin', category: 'chain', chainNext: 'ev_ly_c2_puzzle', minExploration: 5,
    description: '五钥嵌入石门，大门缓缓开启。面前是一条长廊，金色龙纹在幽暗中微微发光，指引方向。',
    options: [
      { id: 'advance', text: '沿龙纹前行', successRate: 70, skillBonus: [],
        success: { text: '龙纹逐一亮起，你感到奇异力量在脉动。记下了指引规律。', effect: 'item', itemId: 'clue_ly_corridor' },
        failure: { text: '走错岔路触发飞镖。退回正道后记住了路线。', effect: 'item', itemId: 'clue_ly_corridor' } },
    ],
  },
  {
    id: 'ev_ly_c2_puzzle', title: '九宫机关阵', areaId: 'longyin', category: 'chain', chainRequires: 'ev_ly_c1_corridor', chainNext: 'ev_ly_c3_chamber', minExploration: 8,
    description: '大厅地面是巨大九宫格，每块石板刻着天干地支。需按正确顺序踏过。',
    options: [
      { id: 'solve', text: '按六十甲子顺序破解', successRate: 55, skillBonus: [],
        success: { text: '甲子、乙丑、丙寅...石板依次沉下，门打开了。', effect: 'item', itemId: 'clue_ly_puzzle' },
        failure: { text: '踏错一步受了伤，但记住了正确路径。', effect: 'item', itemId: 'clue_ly_puzzle' } },
    ],
  },
  {
    id: 'ev_ly_c3_chamber', title: '皇室密室', areaId: 'longyin', category: 'chain', chainRequires: 'ev_ly_c2_puzzle', chainNext: 'ev_ly_c4_guardian', minExploration: 12,
    description: '石台上摆着锦盒和竹简。竹简记录山川险要与密道关隘。锦盒中是盖着玉玺的绢帛——遗诏。',
    options: [
      { id: 'read_edict', text: '展开遗诏', successRate: 80, skillBonus: [],
        success: { text: '遗诏内容震惊：太祖对皇位传承另有安排。这能改变天下局势。', effect: 'item', itemId: 'clue_ly_edict' },
        failure: { text: '绢帛部分破损，但关键内容已看清。', effect: 'item', itemId: 'clue_ly_edict' } },
    ],
  },
  {
    id: 'ev_ly_c4_guardian', title: '守护者现身', areaId: 'longyin', category: 'chain', chainRequires: 'ev_ly_c3_chamber', chainNext: 'ev_ly_c5_master', minExploration: 16,
    description: '"看够了吗？"苍老而有力的声音从阴影传来。白发老者身穿洪武内卫服饰，腰悬长剑。"我等了三十年。这些东西不能被任何人带走。"',
    options: [
      { id: 'reason', text: '"为何不能？"', successRate: 65, skillBonus: [],
        success: { text: '"无论落入谁手，都是天下大乱。唯有证明你有资格做出选择的人..."他的身份你已了然。', effect: 'item', itemId: 'clue_ly_guardian' },
        failure: { text: '"用你的剑来回答。"他不愿多解释，但你已知道他是谁。', effect: 'item', itemId: 'clue_ly_guardian' } },
    ],
  },
  {
    id: 'ev_ly_c5_master', title: '师父的秘密', areaId: 'longyin', category: 'chain', chainRequires: 'ev_ly_c4_guardian', chainNext: 'ev_ly_c6_prepare', minExploration: 20,
    description: '守护者叹息："你师父...也曾来过这里。他是唯一一个和我打成平手的人。他选择了离开，把选择权留给了你。"',
    options: [
      { id: 'ask', text: '"师父现在在哪？"', successRate: 60, skillBonus: [],
        success: { text: '"他在某处守望着你。这是他留给你的。"老者递来师父的信物。一切真相大白。', effect: 'item', itemId: 'clue_ly_master' },
        failure: { text: '守护者摇头不语。但你已知道师父安好。', effect: 'item', itemId: 'clue_ly_master' } },
    ],
  },
  {
    id: 'ev_ly_c6_prepare', title: '最终试炼', areaId: 'longyin', category: 'chain', chainRequires: 'ev_ly_c5_master', chainNext: 'ev_ly_c7_boss',
    description: '守护者退后三步，长剑横胸。"来吧。证明你配得上做出选择。"地宫龙纹全部亮起，金光涌动。',
    options: [
      { id: 'ready', text: '调整呼吸，全神贯注', successRate: 70, skillBonus: [],
        success: { text: '你的意识前所未有地清醒。三十年的守护者，三十年的等待——今日终结。', effect: 'stat_up' },
        failure: { text: '紧张让你握剑的手微微颤抖。但你知道退无可退。', effect: 'nothing' } },
    ],
  },
  {
    id: 'ev_ly_c7_boss', title: '最终之战', areaId: 'longyin', category: 'chain', chainRequires: 'ev_ly_c6_prepare',
    requiresItems: ['clue_ly_corridor', 'clue_ly_puzzle', 'clue_ly_edict', 'clue_ly_guardian', 'clue_ly_master'],
    description: '龙隐守护者踏步而出，剑势如虹。三十年的修行化作这一剑——试炼开始。',
    options: [
      { id: 'fight', text: '全力以赴', successRate: 100, skillBonus: [],
        success: { text: '剑气纵横，金光与剑影交织——终极之战！', effect: 'combat', enemyId: 'final_guardian' },
        failure: { text: '', effect: 'nothing' } },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────

export function getChapter(id: ChapterId): Chapter {
  return CHAPTERS.find((c) => c.id === id)!;
}

export function getItem(id: string): Item | undefined {
  return ALL_ITEMS.find((i) => i.id === id);
}

export function getEnemiesForChapter(chapterId: ChapterId, completedEventIds: string[] = []): CombatEnemy[] {
  return ALL_ENEMIES.filter((e) => {
    if (e.areaId !== chapterId || e.isBoss) return false;
    if (e.requiresEvent && !completedEventIds.includes(e.requiresEvent)) return false;
    return true;
  });
}

export function getBossForChapter(chapterId: ChapterId): CombatEnemy | undefined {
  return ALL_ENEMIES.find((e) => e.areaId === chapterId && e.isBoss);
}

export function getEventsForChapter(chapterId: ChapterId): GameEvent[] {
  return ALL_EVENTS.filter((e) => e.areaId === chapterId);
}

export function pickRandomEvent(chapterId: ChapterId, completedIds: string[], inventoryIds: string[] = [], exploration: number = 0, weather: string = ''): GameEvent | null {
  const all = ALL_EVENTS.filter((e) => e.areaId === chapterId);
  const eligible = all.filter((e) => {
    if (e.category === 'unique' && completedIds.includes(e.id)) return false;
    if (e.category === 'chain') {
      if (completedIds.includes(e.id)) return false;
      if (e.chainRequires && !completedIds.includes(e.chainRequires)) return false;
    }
    // requiresItems: all listed items must be in inventory
    if (e.requiresItems && !e.requiresItems.every((id) => inventoryIds.includes(id))) return false;
    // minExploration: chapter exploration must be >= this
    if (e.minExploration != null && exploration < e.minExploration) return false;
    // requiresWeather: weather must match
    if (e.requiresWeather && e.requiresWeather !== weather) return false;
    return true;
  });
  if (eligible.length === 0) return null;
  const weights = eligible.map((e) => e.weight ?? (e.category === 'rare' ? 0.3 : e.category === 'chain' ? 2.5 : 1));
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < eligible.length; i++) {
    r -= weights[i];
    if (r <= 0) return eligible[i];
  }
  return eligible[eligible.length - 1];
}

export function getNextChapter(id: ChapterId): ChapterId | null {
  const idx = CHAPTERS.findIndex((c) => c.id === id);
  return idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1].id : null;
}

const WEATHER_TABLE = ['晴', '阴', '多云', '微雨', '大风', '薄雾'];
export function getWeatherForDay(day: number): string {
  return WEATHER_TABLE[(day * 7 + 2) % WEATHER_TABLE.length];
}
