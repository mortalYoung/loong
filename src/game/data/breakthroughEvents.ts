import type { GameEvent } from '@/store/useGameStore';

// Chain map: eventId:optionId → nextPhaseKey
export const BT_CHAIN_MAP: Record<string, string> = {
  // Swordplay
  'bt_sword:watch': 'sword_2',
  'bt_sword:ask': 'sword_2',
  'bt_sword_3:kneel': 'sword_4',
  // Agility
  'bt_agility:chase': 'agility_2',
  'bt_agility_2:keep_going': 'agility_3',
  // Body
  'bt_body:learn': 'body_2',
  'bt_body_2:punch': 'body_3',
  // Mind
  'bt_mind:meditate': 'mind_2',
  'bt_mind_2:continue_meditate': 'mind_3',
  // Insight
  'bt_insight:observe': 'insight_2',
  'bt_insight_2:conclude': 'insight_3',
};

export const BREAKTHROUGH_EVENTS: Record<string, GameEvent> = {
  // ═══════════════ 基础剑法：残剑无锋 ═══════════════
  sword: {
    id: 'bt_sword', title: '残剑无锋', areaId: 'qingshi', category: 'unique',
    description: '夜色渐深。你途经一座废弃的土地庙，庙门半掩，里面传来断断续续的金铁交鸣声。推门而入，只见一名灰衣老人正拿着一根木棍，对着空气不断挥舞。他的动作很慢，却让你莫名觉得危险。',
    options: [
      { id: 'watch', text: '驻足观看', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
      { id: 'ask', text: '上前请教', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
      { id: 'leave', text: '转身离开（取消突破）', successRate: 100, skillBonus: [],
        success: { text: '你悄悄退出土地庙。或许时机未到。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  sword_2: {
    id: 'bt_sword_2', title: '残剑无锋', areaId: 'qingshi', category: 'unique',
    description: '老人挥完最后一式，忽然说道："看够了吗？"你一惊——他甚至没有回头。老人随手将木棍丢给你。"来，刺我。"',
    options: [
      { id: 'full_force', text: '全力出剑', successRate: 100, skillBonus: [],
        success: { text: '你不再犹豫，全力刺出——', effect: 'combat', enemyId: 'sword_elder' }, failure: { text: '', effect: 'nothing' } },
      { id: 'hold_back', text: '留三分力', successRate: 30, skillBonus: [],
        success: { text: '你收了力道。老人侧身避过，微微颔首："有分寸。但不够。"他突然出手——', effect: 'combat', enemyId: 'sword_elder' },
        failure: { text: '你留了力，出手迟缓。老人一棍扫来，你仓促格挡。"太慢了。再来。"', effect: 'combat', enemyId: 'sword_elder' } },
    ],
  },
  sword_3: {
    id: 'bt_sword_3', title: '残剑无锋', areaId: 'qingshi', category: 'unique',
    description: '老人第一次后退半步。他笑了。"不错。你终于学会了，不是挥剑，而是用剑。"',
    options: [
      { id: 'kneel', text: '磕头叩谢', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  sword_4: {
    id: 'bt_sword_4', title: '残剑无锋', areaId: 'qingshi', category: 'unique',
    description: '当你准备拜谢时，土地庙已经空无一人。地上只留下一截断木。以及墙上的一句字："剑可胜人，不可胜心。——柳十三"',
    options: [
      { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
        success: { text: '※ 基础剑法突破至熟练。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  // ═══════════════ 基础身法：踏雪无痕 ═══════════════
  agility: {
    id: 'bt_agility', title: '踏雪无痕', areaId: 'qingshi', category: 'unique',
    description: '月明之夜，你在屋顶练习身法。忽然发现远处有一个黑影在瓦面上如履平地，速度快得不可思议。那人停下脚步，似乎在等你。',
    options: [
      { id: 'chase', text: '追上去', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
      { id: 'leave', text: '不追了（取消突破）', successRate: 100, skillBonus: [],
        success: { text: '黑影消失在夜色中。时机未到。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  agility_2: {
    id: 'bt_agility_2', title: '踏雪无痕', areaId: 'qingshi', category: 'unique',
    description: '你全力追赶。黑影时快时慢，引你翻越一个又一个屋顶。渐渐地，你发现自己的步伐越来越轻——脚尖点瓦，身如游鱼。你不再用力蹬踏，而是借力而行。',
    options: [
      { id: 'keep_going', text: '继续追赶', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  agility_3: {
    id: 'bt_agility_3', title: '踏雪无痕', areaId: 'qingshi', category: 'unique',
    description: '追了整整半个时辰，黑影倏然消失。你大口喘气，低头一看——脚下的瓦片竟然没有碎裂一片。远处传来一声轻笑，风中隐约有话："不错，下次再追。"',
    options: [
      { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
        success: { text: '※ 基础身法突破至熟练。', effect: 'breakthrough', skillId: 'agility' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  // ═══════════════ 基础体魄：铁拳开山 ═══════════════
  body: {
    id: 'bt_body', title: '铁拳开山', areaId: 'qingshi', category: 'unique',
    description: '清晨，你在镇外练拳。一个赤膊壮汉路过，看了你几眼后哈哈大笑："小子，你这拳打蚊子都嫌轻。来，我教你什么叫真正的力量。"',
    options: [
      { id: 'learn', text: '虚心请教', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
      { id: 'leave', text: '谢绝好意（取消突破）', successRate: 100, skillBonus: [],
        success: { text: '壮汉摇摇头走了。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  body_2: {
    id: 'bt_body_2', title: '铁拳开山', areaId: 'qingshi', category: 'unique',
    description: '"力从脚起，经腰达拳。记住，拳头不是用手臂打的。"壮汉让你对着一棵枯树反复出拳。你打了上百拳，手臂酸痛，枯树纹丝不动。"不对。再来。用腰。"',
    options: [
      { id: 'punch', text: '沉腰，蓄力，出拳', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  body_3: {
    id: 'bt_body_3', title: '铁拳开山', areaId: 'qingshi', category: 'unique',
    description: '这一拳与之前截然不同。力从脚底涌起，经过腰胯旋转，汇聚于拳面。"嘭——"枯树应声折断。壮汉拍拍你的肩膀："孺子可教。"说完扬长而去，始终未留姓名。',
    options: [
      { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
        success: { text: '※ 基础体魄突破至熟练。', effect: 'breakthrough', skillId: 'body' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  // ═══════════════ 基础心法：静心凝神 ═══════════════
  mind: {
    id: 'bt_mind', title: '静心凝神', areaId: 'qingshi', category: 'unique',
    description: '夜深人静，你在溪边打坐。水声潺潺，月影摇曳。忽然一阵奇异的感觉——你仿佛听到了自己体内血脉流动的声音。',
    options: [
      { id: 'meditate', text: '屏息凝神，感受气息', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
      { id: 'leave', text: '睁眼放弃（取消突破）', successRate: 100, skillBonus: [],
        success: { text: '你摇摇头站起身来。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  mind_2: {
    id: 'bt_mind_2', title: '静心凝神', areaId: 'qingshi', category: 'unique',
    description: '你屏息凝神，将注意力集中在那细微的声音上。渐渐地，你感到一股温热从丹田升起，沿着经脉缓缓流转。你不敢妄动，只是顺着那股气息的方向引导。',
    options: [
      { id: 'continue_meditate', text: '继续引导气息', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  mind_3: {
    id: 'bt_mind_3', title: '静心凝神', areaId: 'qingshi', category: 'unique',
    description: '不知过了多久，那股气息走完了一个完整的循环，回归丹田。你睁开眼，天边已泛起鱼肚白。浑身上下说不出的舒畅——仿佛体内多了一条看不见的通路。',
    options: [
      { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
        success: { text: '※ 基础心法突破至熟练。', effect: 'breakthrough', skillId: 'mind' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  // ═══════════════ 基础战悟：明镜台 ═══════════════
  insight: {
    id: 'bt_insight', title: '明镜台', areaId: 'qingshi', category: 'unique',
    description: '一场苦战之后，你坐在路边擦拭剑身。回想刚才的每一招每一式，忽然发现——你能清晰地"看见"对手出招前的细微征兆。',
    options: [
      { id: 'observe', text: '继续回想战斗细节', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
      { id: 'leave', text: '不再多想（取消突破）', successRate: 100, skillBonus: [],
        success: { text: '你摇摇头站起身来。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  insight_2: {
    id: 'bt_insight_2', title: '明镜台', areaId: 'qingshi', category: 'unique',
    description: '你闭上眼，将每一次攻击、每一次闪避都在脑海中重演。对手的呼吸节奏、重心转移、眼神变化——这些以前忽略的细节，此刻清晰无比。',
    options: [
      { id: 'conclude', text: '将感悟铭记于心', successRate: 100, skillBonus: [],
        success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  insight_3: {
    id: 'bt_insight_3', title: '明镜台', areaId: 'qingshi', category: 'unique',
    description: '你睁开眼，感到眼前的世界似乎变得更加"慢"了一些。不是真的变慢——而是你能在更短的时间内看到更多。这就是战场上的"悟"。',
    options: [
      { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
        success: { text: '※ 基础战悟突破至熟练。', effect: 'breakthrough', skillId: 'insight' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
};
