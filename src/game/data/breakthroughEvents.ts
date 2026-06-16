import type { GameEvent } from '@/store/useGameStore';

// Chain map: eventId:optionId → nextPhaseKey
export const BT_CHAIN_MAP: Record<string, string> = {
  // Sword（剑谱，入门→熟练）
  'bt_sword:buy': 'sword_2',
  // Sword Mastery（残剑无锋，熟练→精通）— 战斗由 onWin/onLose 处理
  'bt_sword_mastery:watch': 'sword_mastery_2',
  'bt_sword_mastery:ask': 'sword_mastery_2',
  'bt_sword_mastery_3:kneel': 'sword_mastery_4',
  // Sword Grandmaster（折枝，精通→大成）— 战斗由 onWin/onLose 处理
  'bt_sword_grandmaster:lend_sword': 'sword_grandmaster_2',
  'bt_sword_grandmaster:decline': 'sword_grandmaster_2',
  'bt_sword_grandmaster_3_after:pick_sword': 'sword_grandmaster_4',
  'bt_sword_grandmaster_3_after:pick_branch': 'sword_grandmaster_4',
  // Sword Mythic（归鞘，大成→宗师）
  'bt_sword_mythic:go_up': 'sword_mythic_2',
  'bt_sword_mythic:take_sword': 'sword_mythic_2',
  'bt_sword_mythic_2:pull_sword': 'sword_mythic_3',
  'bt_sword_mythic_2:stand_still': 'sword_mythic_3',
  'bt_sword_mythic_3:lay_sword': 'sword_mythic_4',
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
  // Agility Mastery（轻身诀）
  'bt_agility_mastery:go_bookshop': 'agility_mastery_2',
  'bt_agility_mastery:go_wuguan': 'agility_mastery_3',
  'bt_agility_mastery_2:buy_full': 'agility_mastery_6',
  'bt_agility_mastery_2:too_pricey': 'agility_mastery_5',
  'bt_agility_mastery_3:heed_advice': 'agility_mastery_2',
  'bt_agility_mastery_3:keep_asking': 'agility_mastery_5',
  'bt_agility_mastery_5:buy_cheap': 'agility_mastery_6',
  'bt_agility_mastery_5:buy_full_price': 'agility_mastery_6',
  'bt_agility_mastery_6:go_out': 'agility_mastery_7',
  'bt_agility_mastery_6:go_out_with_book': 'agility_mastery_7',
  'bt_agility_mastery_7:help_find': 'agility_mastery_8',
  'bt_agility_mastery_7:ask_direction': 'agility_mastery_8',
  'bt_agility_mastery_8:mimic_rabbit': 'agility_mastery_9',
  'bt_agility_mastery_8:keep_own_way': 'agility_mastery_9',
  'bt_agility_mastery_9:return_town': 'agility_mastery_10',
  'bt_agility_mastery_9:practice_forest': 'agility_mastery_10',
  // Agility Grandmaster（雪无痕，精通→大成）— 战斗由 onWin/onLose 处理
  'bt_agility_grandmaster:follow_now': 'agility_grandmaster_2',
  'bt_agility_grandmaster:ask_innkeeper': 'agility_grandmaster_2',
  'bt_agility_grandmaster_2:go_forest': 'agility_grandmaster_3a',
  'bt_agility_grandmaster_2:go_slope': 'agility_grandmaster_3b',
  'bt_agility_grandmaster_2:go_stream': 'agility_grandmaster_3c',
  'bt_agility_grandmaster_3a:note_down': 'agility_grandmaster_4a',
  'bt_agility_grandmaster_3a:keep_chasing': 'agility_grandmaster_4a',
  'bt_agility_grandmaster_3b:watch_wind': 'agility_grandmaster_4b',
  'bt_agility_grandmaster_3b:keep_chasing': 'agility_grandmaster_4b',
  'bt_agility_grandmaster_3c:study_cracks': 'agility_grandmaster_4c',
  'bt_agility_grandmaster_3c:keep_chasing': 'agility_grandmaster_4c',
  'bt_agility_grandmaster_4a:go_peak': 'agility_grandmaster_5a',
  'bt_agility_grandmaster_4a:track_more': 'agility_grandmaster_5a',
  'bt_agility_grandmaster_4b:go_peak': 'agility_grandmaster_5b',
  'bt_agility_grandmaster_4b:track_more': 'agility_grandmaster_5b',
  'bt_agility_grandmaster_4c:go_peak': 'agility_grandmaster_5c',
  'bt_agility_grandmaster_4c:track_more': 'agility_grandmaster_5c',
  // Agility Mythic（风过无声，大成→宗师）
  'bt_agility_mythic:climb': 'agility_mythic_2',
  'bt_agility_mythic:ponder': 'agility_mythic_2',
  'bt_agility_mythic_2:look_back': 'agility_mythic_3',
  'bt_agility_mythic_2:keep_walking': 'agility_mythic_3',
  // Body Mastery（负重修行）
  'bt_body_mastery:adjust': 'body_mastery_2',
  'bt_body_mastery:start_now': 'body_mastery_2',
  // 幕2：push→幕3（未休息），rest→幕3r（已休息）
  'bt_body_mastery_2:push': 'body_mastery_3',
  'bt_body_mastery_2:rest': 'body_mastery_3r',
  // 幕3（未休息）：push→幕4，rest→幕4r
  'bt_body_mastery_3:push': 'body_mastery_4',
  'bt_body_mastery_3:rest': 'body_mastery_4r',
  // 幕3r（已休息）：push→幕4r，rest→幕4r
  'bt_body_mastery_3r:push': 'body_mastery_4r',
  'bt_body_mastery_3r:rest': 'body_mastery_4r',
  // 幕4（未充分休整）：continue→回幕3
  'bt_body_mastery_4:continue': 'body_mastery_3',
  // 幕4r（已休整）：continue→幕5突破
  'bt_body_mastery_4r:continue': 'body_mastery_5',
  // Body Grandmaster（千斤石，精通→大成）
  'bt_body_grandmaster:help_push': 'body_grandmaster_2',
  'bt_body_grandmaster:observe': 'body_grandmaster_2',
  'bt_body_grandmaster_2:try_again': 'body_grandmaster_3',
  'bt_body_grandmaster_2:rest': 'body_grandmaster_3',
  'bt_body_grandmaster_3:push_together': 'body_grandmaster_4',
  'bt_body_grandmaster_3:command': 'body_grandmaster_4',
  // Body Mythic（镇山人，大成→宗师）
  'bt_body_mythic:go_dam': 'body_mythic_2',
  'bt_body_mythic:help_villagers': 'body_mythic_2',
  'bt_body_mythic_2:step_up': 'body_mythic_3',
  'bt_body_mythic_2:step_up_slow': 'body_mythic_3',
  'bt_body_mythic_3:hold': 'body_mythic_4',
  'bt_body_mythic_3:grit': 'body_mythic_4',
  // Mind Mastery（无字书）
  'bt_mind_mastery:go_market': 'mind_mastery_2a',
  'bt_mind_mastery:go_academy': 'mind_mastery_2b',
  'bt_mind_mastery_2a:ask_elder': 'mind_mastery_3',
  'bt_mind_mastery_2a:follow_hint': 'mind_mastery_3',
  'bt_mind_mastery_2b:follow_teacher': 'mind_mastery_3',
  'bt_mind_mastery_2b:go_alone': 'mind_mastery_3',
  'bt_mind_mastery_3:read_through': 'mind_mastery_4a',
  'bt_mind_mastery_3:observe_elder': 'mind_mastery_4b',
  'bt_mind_mastery_4a:check_again': 'mind_mastery_5',
  'bt_mind_mastery_4a:put_down': 'mind_mastery_5',
  'bt_mind_mastery_4b:open_again': 'mind_mastery_5',
  'bt_mind_mastery_4b:keep_waiting': 'mind_mastery_5',
  // Mind Grandmaster（灯下问答，精通→大成）
  'bt_mind_grandmaster:answer': 'mind_grandmaster_2',
  'bt_mind_grandmaster:sit_down': 'mind_grandmaster_2',
  'bt_mind_grandmaster_2:ask_more': 'mind_grandmaster_3',
  'bt_mind_grandmaster_2:sit_silent': 'mind_grandmaster_3',
  // Mind Mythic（一念，大成→宗师）
  'bt_mind_mythic:sit_and_wait': 'mind_mythic_2',
  'bt_mind_mythic:light_it': 'mind_mythic_2',
  'bt_mind_mythic_2:stay': 'mind_mythic_3',
  'bt_mind_mythic_2:open_eyes': 'mind_mythic_3',
  // Insight Mastery（木人·无影）— 战斗跳转由 onWin/onLose 处理，chain map 只补非战斗链路
  'bt_insight_mastery_2_after:ask_again': 'insight_mastery_3',
  'bt_insight_mastery_2_after:observe': 'insight_mastery_3',
  // Insight Grandmaster（木人·无影·持久，精通→大成）
  'bt_insight_grandmaster_2_after:ask_again': 'insight_grandmaster_3',
  'bt_insight_grandmaster_2_after:observe': 'insight_grandmaster_3',
  // Insight Mythic（木人·无影·破势，大成→宗师）
  'bt_insight_mythic_2_after:ask_again': 'insight_mythic_3',
  'bt_insight_mythic_2_after:observe': 'insight_mythic_3',
};

export const BREAKTHROUGH_EVENTS: Record<string, GameEvent> = {
  // ═══════════════ 基础剑法：剑谱（入门→熟练）═══════════════
  sword: {
    id: 'bt_sword', title: '剑谱', areaId: 'qingshi', category: 'unique',
    description: '你已将基础剑法练到了极限，却始终差一口气。镇上的武器铺掌柜听闻此事，从柜底取出一本泛黄的薄册，说道："这是前人留下的《基础剑谱》，花三十金币，归你了。"',
    options: [
    { id: 'buy', text: '花费30金币购买《基础剑谱》', successRate: 100, skillBonus: [], minGold: 30,
      success: { text: '你翻开剑谱，对照自身所学，诸多疑惑迎刃而解。', effect: 'gold', value: -30 }, failure: { text: '', effect: 'nothing' } },
      { id: 'leave', text: '暂不购买（取消突破）', successRate: 100, skillBonus: [],
        success: { text: '你摇摇头离开了铺子。时机未到。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
  sword_2: {
    id: 'bt_sword_2', title: '剑谱', areaId: 'qingshi', category: 'unique',
    description: '剑谱不长，字里行间却处处点睛。你照着要诀反复练习，原本停滞的剑意，终于再次流动起来。',
    options: [
      { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
        success: { text: '※ 基础剑法突破至熟练。', effect: 'breakthrough', skillId: 'sword' }, failure: { text: '', effect: 'nothing' } },
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
    description: '追了整整半个时辰，黑影倏然消失。你大口喘气，低头一看——脚下的瓦片竟然没有碎裂一片。远处传来一声轻笑，风中隐约有话："不错，下次再追。"那声音消散在夜色里，却像一颗种子，落在了某处。',
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
    description: '这一拳与之前截然不同。力从脚底涌起，经过腰胯旋转，汇聚于拳面。"嘭——"枯树应声折断。壮汉拍拍你的肩膀："孺子可教。"说完扬长而去，始终未留姓名。你望着他的背影消失在晨雾中，心里隐约觉得——这不会是最后一次见面。',
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
    description: '不知过了多久，那股气息走完了一个完整的循环，回归丹田。你睁开眼，天边已泛起鱼肚白。浑身上下说不出的舒畅——仿佛体内多了一条看不见的通路。通路刚刚打开，却还不知道通往何处。',
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
    description: '你睁开眼，感到眼前的世界似乎变得更加"慢"了一些。不是真的变慢——而是你能在更短的时间内看到更多。这就是战场上的"悟"。只是感受到征兆，与真正看见破绽，还有一段距离。',
    options: [
      { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
        success: { text: '※ 基础战悟突破至熟练。', effect: 'breakthrough', skillId: 'insight' }, failure: { text: '', effect: 'nothing' } },
    ],
  },
};

// ═══════════════ 基础剑法：残剑无锋（熟练→精通）═══════════════
BREAKTHROUGH_EVENTS.sword_mastery = {
  id: 'bt_sword_mastery', title: '残剑无锋', areaId: 'qingshi', category: 'unique',
  description: '夜色渐深。你途经一座废弃的土地庙，庙门半掩，里面传来断断续续的金铁交鸣声。推门而入，只见一名灰衣老人正拿着一根木棍，对着空气不断挥舞。他的动作很慢，却让你莫名觉得危险。',
  options: [
    { id: 'watch', text: '驻足观看', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'ask', text: '上前请教', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'leave', text: '转身离开（取消突破）', successRate: 100, skillBonus: [],
      success: { text: '你悄悄退出土地庙。或许时机未到。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.sword_mastery_2 = {
  id: 'bt_sword_mastery_2', title: '残剑无锋', areaId: 'qingshi', category: 'unique',
  description: '老人挥完最后一式，忽然说道："看够了吗？"你一惊——他甚至没有回头。老人随手将木棍丢给你。"来，刺我。"',
  options: [
    { id: 'full_force', text: '全力出剑', successRate: 100, skillBonus: [],
      success: { text: '你不再犹豫，全力刺出——', effect: 'combat', enemyId: 'sword_elder', onWin: 'sword_mastery_3', onLose: 'sword_mastery_2_lose' }, failure: { text: '', effect: 'nothing' } },
    { id: 'hold_back', text: '留三分力', successRate: 30, skillBonus: [],
      success: { text: '你收了力道。老人侧身避过，微微颔首："有分寸。但不够。"他突然出手——', effect: 'combat', enemyId: 'sword_elder', onWin: 'sword_mastery_3', onLose: 'sword_mastery_2_lose' },
      failure: { text: '你留了力，出手迟缓。老人一棍扫来，你仓促格挡。"太慢了。再来。"', effect: 'combat', enemyId: 'sword_elder', onWin: 'sword_mastery_3', onLose: 'sword_mastery_2_lose' } },
  ],
};
BREAKTHROUGH_EVENTS.sword_mastery_2_lose = {
  id: 'bt_sword_mastery_2_lose', title: '残剑无锋', areaId: 'qingshi', category: 'unique',
  description: '你被老人击倒在地。他没有再说话，只是静静收回木棍，重新站好。你盯着地面，忽然明白：你用的是蛮力，而他用的是时机。败，并非因为弱，而是因为你还不懂得等待。',
  options: [
    { id: 'rise', text: '重新站起，再试一次', successRate: 100, skillBonus: [],
      success: { text: '你深吸一口气，重新握紧木棍。', effect: 'combat', enemyId: 'sword_elder', onWin: 'sword_mastery_3', onLose: 'sword_mastery_2_lose' }, failure: { text: '', effect: 'nothing' } },
    { id: 'leave', text: '今日不宜强求（取消突破）', successRate: 100, skillBonus: [],
      success: { text: '你俯身行礼，退出土地庙。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.sword_mastery_3 = {
  id: 'bt_sword_mastery_3', title: '残剑无锋', areaId: 'qingshi', category: 'unique',
  description: '老人第一次后退半步。他笑了。"不错。你终于学会了，不是挥剑，而是用剑。"',
  options: [
    { id: 'kneel', text: '磕头叩谢', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.sword_mastery_4 = {
  id: 'bt_sword_mastery_4', title: '残剑无锋', areaId: 'qingshi', category: 'unique',
  description: '当你准备拜谢时，土地庙已经空无一人。地上只留下一截断木。以及墙上的一句字："剑可胜人，不可胜心。——柳十三"你记下了这句话，却还不明白它的全部含义。',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础剑法突破至精通。', effect: 'breakthrough', skillId: 'sword' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础剑法：折枝（精通→大成）═══════════════
BREAKTHROUGH_EVENTS.sword_grandmaster = {
  id: 'bt_sword_grandmaster', title: '折枝', areaId: 'qingshi', category: 'unique',
  description: '山路蜿蜒，林木苍翠。你行至半山，忽然看见一位老人正在路边砍柴。老人衣着朴素，身旁堆满干柴。见你腰间佩剑，他放下斧头，笑着说道："年轻人。听说你学剑？借我看看。"',
  options: [
    { id: 'lend_sword', text: '将佩剑递给老人', successRate: 100, skillBonus: [],
      success: { text: '老人接过佩剑，却没有拔剑，只是轻轻插在地上。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'decline', text: '婉拒借剑', successRate: 100, skillBonus: [],
      success: { text: '老人没有生气，随手折下一根树枝。"没有剑，也一样。"', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.sword_grandmaster_2 = {
  id: 'bt_sword_grandmaster_2', title: '折枝', areaId: 'qingshi', category: 'unique',
  description: '老人举起那根刚折下的树枝，笑道："来。你用剑，我用树枝。"',
  options: [
    { id: 'full_force', text: '全力出手', successRate: 100, skillBonus: [],
      success: { text: '你握紧剑柄，全力刺出——', effect: 'combat', enemyId: 'branch_elder', onWin: 'sword_grandmaster_3_after', onLose: 'sword_grandmaster_3_after' },
      failure: { text: '', effect: 'nothing' } },
    { id: 'steady', text: '稳扎稳打', successRate: 100, skillBonus: [],
      success: { text: '你沉住气，步步为营——', effect: 'combat', enemyId: 'branch_elder', onWin: 'sword_grandmaster_3_after', onLose: 'sword_grandmaster_3_after' },
      failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.sword_grandmaster_3_after = {
  id: 'bt_sword_grandmaster_3_after', title: '折枝', areaId: 'qingshi', category: 'unique',
  description: '战斗很快结束。你手中的长剑不断挥出，老人只是轻轻挥动树枝，你的每一剑都被化解。最后，老人用树枝轻轻一点，你的长剑脱手而出，插在一旁的泥地里。老人拾起斧头，重新背起柴火。临走前，只留下了一句话："世人都在寻一把好剑。却很少有人想过，为何一根树枝，也能胜剑。"说完，他缓缓下山，再未回头。',
  options: [
    { id: 'pick_sword', text: '拾起长剑继续前行', successRate: 100, skillBonus: [],
      success: { text: '你将长剑从泥地拔出，回想刚才的一切。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'pick_branch', text: '拾起地上的树枝', successRate: 100, skillBonus: [],
      success: { text: '你捡起那根树枝，握在手中，回想刚才的一切。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.sword_grandmaster_4 = {
  id: 'bt_sword_grandmaster_4', title: '折枝', areaId: 'qingshi', category: 'unique',
  description: '山风吹过。刚才切磋的一幕幕不断浮现——老人从未在意自己手里拿着什么，而自己，却始终相信只有握着剑，才能施展剑法。忽然之间，你似乎明白了什么。剑法，并非依附于剑。真正重要的，是执剑之人。你将树枝轻轻放在地上，又将长剑缓缓归鞘。远处山林间，隐约传来老人的笑声："草木皆可为剑。拘于器者，终困于器。"——而土地庙那位老人留下的那句话，此刻忽然又浮上心头：剑可胜人，不可胜心。',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础剑法突破至大成。', effect: 'breakthrough', skillId: 'sword' }, failure: { text: '', effect: 'nothing' } },
  ],
};
// ═══════════════ 基础剑法：归鞘（大成→宗师）═══════════════
BREAKTHROUGH_EVENTS.sword_mythic = {
  id: 'bt_sword_mythic', title: '归鞘', areaId: 'qingshi', category: 'unique',
  description: '多年之后，你再次来到那座废弃的土地庙。神像蒙尘，屋顶漏雨。唯独角落里，还静静放着一柄木剑。木剑下压着一张泛黄的纸，你轻轻展开，上面只有一句话：「若还记得我，便来山顶。」落款：柳十三。',
  options: [
    { id: 'go_up', text: '前往山顶', successRate: 100, skillBonus: [],
      success: { text: '你迈步走出土地庙，向山顶而去。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'take_sword', text: '带上木剑，前往山顶', successRate: 100, skillBonus: [],
      success: { text: '你拾起那柄木剑，向山顶而去。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.sword_mythic_2 = {
  id: 'bt_sword_mythic_2', title: '归鞘', areaId: 'qingshi', category: 'unique',
  description: '山顶没有人。只有一块巨石，巨石上插着一柄早已锈蚀的长剑，旁边立着一块无名石碑，碑前放着一束已经枯萎的野花。这一刻你终于明白——这里不是赴约之地，而是一座墓。山风吹过，石碑背面刻着几行有些模糊的小字：「我这一生，教过很多人。可真正学会的人，很少。」',
  options: [
    { id: 'pull_sword', text: '拔出石上的长剑', successRate: 100, skillBonus: [],
      success: { text: '你伸手握住剑柄，用力拔出——', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'stand_still', text: '静静站立，望着石碑', successRate: 100, skillBonus: [],
      success: { text: '你没有动，只是静静站在那里。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.sword_mythic_3 = {
  id: 'bt_sword_mythic_3', title: '归鞘', areaId: 'qingshi', category: 'unique',
  description: '那把剑早已锈死，任凭如何用力，依旧纹丝不动。你忽然停下动作。脑海中浮现起过去的一幕幕——第一次相见，老人拿着木棍；第二次相见，老人折下一根树枝。他从未向你展示过什么绝世剑法，却总能轻易胜过你。直到今天，你终于明白：他教你的，从来不是如何挥剑，而是如何看待剑。剑，不在手。剑，在心。',
  options: [
    { id: 'lay_sword', text: '将自己的佩剑放在碑前', successRate: 100, skillBonus: [],
      success: { text: '你缓缓拔出佩剑，轻轻放在石碑前。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.sword_mythic_4 = {
  id: 'bt_sword_mythic_4', title: '归鞘', areaId: 'qingshi', category: 'unique',
  description: '没有挥舞，没有出招，只是轻轻放在碑前，随后转身下山。走出数十步，身后忽然传来一声轻响——那柄插在巨石上的锈剑，终于缓缓倒下。你没有回头。因为你知道，需要放下的，从来不是那把剑，而是心中的执着。山风掠过耳畔，仿佛又传来那个熟悉的声音：「剑可胜人，不可胜心。心若已胜，天下何处不可执剑。」',
  options: [
    { id: 'continue', text: '继续前行', successRate: 100, skillBonus: [],
      success: { text: '※ 基础剑法突破至宗师。', effect: 'breakthrough', skillId: 'sword' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础身法：轻身诀（熟练→精通）═══════════════
BREAKTHROUGH_EVENTS.agility_mastery = {
  id: 'bt_agility_mastery', title: '轻身诀', areaId: 'qingshi', category: 'unique',
  description: '连续数日的修炼后，你发现自己的步法越来越快，却始终无法更进一步。无论如何练习，总感觉缺少了一些什么。镇上的人议论道，西街书铺近日收来一本《轻身诀》，据说对初学身法之人大有裨益。',
  options: [
    { id: 'go_bookshop', text: '前往西街书铺打听', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'go_wuguan', text: '前往武馆请教前辈', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕2：书铺
BREAKTHROUGH_EVENTS.agility_mastery_2 = {
  id: 'bt_agility_mastery_2', title: '轻身诀', areaId: 'qingshi', category: 'unique',
  description: '你来到西街书铺。角落里摆放着一本泛黄的小册，封面上写着三个字：《轻身诀》。掌柜见你驻足，笑着说道："这可是一本不错的基础秘籍。售价一百金币。"',
  options: [
    { id: 'buy_full', text: '花费100金币购买', successRate: 100, skillBonus: [], minGold: 100,
      success: { text: '你付了一百金币，将《轻身诀》收入怀中。', effect: 'gold', value: -100 }, failure: { text: '', effect: 'nothing' } },
    { id: 'too_pricey', text: '觉得价格太贵，先离开', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕3：武馆
BREAKTHROUGH_EVENTS.agility_mastery_3 = {
  id: 'bt_agility_mastery_3', title: '轻身诀', areaId: 'qingshi', category: 'unique',
  description: '武馆师傅看了看你的步法，沉默片刻后说道："你练的是脚，不是身法。真正的身法，在于借势。"随后他告诉你："西街书铺有一本《轻身诀》，若有兴趣，不妨去看看。"',
  options: [
    { id: 'heed_advice', text: '听从建议，前往书铺', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'keep_asking', text: '继续向师傅请教', successRate: 100, skillBonus: [],
      success: { text: '师傅摇摇头，不再多言。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕5：机缘巧合
BREAKTHROUGH_EVENTS.agility_mastery_5 = {
  id: 'bt_agility_mastery_5', title: '轻身诀', areaId: 'qingshi', category: 'unique',
  description: '正当你准备离开时，一阵狂风吹来。书铺门口堆放的书卷散落一地，不少纸页被吹向街道。掌柜急得团团转，你连忙上前帮忙。忙碌许久，所有书籍终于整理完毕。掌柜笑道："若不是你，这批书可就毁了。既然与你有缘，这本《轻身诀》便不收原价了——二十金币即可。"',
  options: [
    { id: 'buy_cheap', text: '花费20金币购买《轻身诀》', successRate: 100, skillBonus: [], minGold: 20,
      success: { text: '你付了二十金币，将《轻身诀》收入怀中。', effect: 'gold', value: -20 }, failure: { text: '', effect: 'nothing' } },
    { id: 'buy_full_price', text: '婉拒好意，坚持按100金币购买', successRate: 100, skillBonus: [], minGold: 100,
      success: { text: '你付了一百金币。掌柜愣了愣，郑重地将书递上。', effect: 'gold', value: -100 }, failure: { text: '', effect: 'nothing' } },
    { id: 'leave', text: '放弃购买（取消突破）', successRate: 100, skillBonus: [],
      success: { text: '你摇摇头离开了书铺。时机未到。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕6：研读
BREAKTHROUGH_EVENTS.agility_mastery_6 = {
  id: 'bt_agility_mastery_6', title: '轻身诀', areaId: 'qingshi', category: 'unique',
  description: '回到住处，你翻开《轻身诀》。第一页写着：「身法者，借势而行。」第二页写着：「力可尽，势无穷。」短短几句话，却让你百思不得其解。连续数日研读，依旧毫无收获。就在此时，屋外忽然传来一阵焦急的呼喊。',
  options: [
    { id: 'go_out', text: '出门查看', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'go_out_with_book', text: '带着《轻身诀》一起出门', successRate: 100, skillBonus: [],
      success: { text: '你将书册塞入怀中，推门而出。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕7：求助
BREAKTHROUGH_EVENTS.agility_mastery_7 = {
  id: 'bt_agility_mastery_7', title: '轻身诀', areaId: 'qingshi', category: 'unique',
  description: '一个小女孩站在路边，神情焦急。她养的一只白兔跑进了山林。天色渐晚，她已经寻找许久，却始终没有找到。',
  options: [
    { id: 'help_find', text: '帮助她寻找兔子', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'ask_direction', text: '询问兔子逃跑的方向后再寻找', successRate: 100, skillBonus: [],
      success: { text: '女孩用手指向山林东侧。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕8：山林
BREAKTHROUGH_EVENTS.agility_mastery_8 = {
  id: 'bt_agility_mastery_8', title: '轻身诀', areaId: 'qingshi', category: 'unique',
  description: '你追入树林。白兔速度极快，却总能轻松绕过树木、跨过乱石。它踩着石头借力，顺着斜坡滑下，几乎没有任何多余动作。你忽然想起《轻身诀》中那句话：「身法者，借势而行。」',
  options: [
    { id: 'mimic_rabbit', text: '模仿兔子的步法', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'keep_own_way', text: '继续按照自己的方式追赶', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕9：领悟
BREAKTHROUGH_EVENTS.agility_mastery_9 = {
  id: 'bt_agility_mastery_9', title: '轻身诀', areaId: 'qingshi', category: 'unique',
  description: '你尝试改变步法。借石发力。借树转身。借坡滑行。渐渐地，树林不再成为阻碍，而成为你的助力。不久之后，你轻松来到溪边，将白兔抱了起来。此刻你终于明白：真正的身法，并非跑得更快，而是懂得顺势而行。',
  options: [
    { id: 'return_town', text: '返回镇中，重新研读《轻身诀》', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'practice_forest', text: '在树林中继续练习新的步法', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕10：突破
BREAKTHROUGH_EVENTS.agility_mastery_10 = {
  id: 'bt_agility_mastery_10', title: '轻身诀', areaId: 'qingshi', category: 'unique',
  description: '再次翻开《轻身诀》。原本晦涩难懂的文字，如今变得清晰明了。你轻轻迈出一步——脚步轻盈自然，仿佛与周围环境融为一体。你知道，自己终于跨过了身法修炼的第一道门槛。这双脚学会了借势。而当年屋顶那个黑影说的"下次再追"，不知是否仍在某处等候。',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础身法突破至精通。', effect: 'breakthrough', skillId: 'agility' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础身法：雪无痕（精通→大成）═══════════════
BREAKTHROUGH_EVENTS.agility_grandmaster = {
  id: 'bt_agility_grandmaster', title: '雪无痕', areaId: 'qingshi', category: 'unique',
  description: '大雪封山，你借宿于山间客栈。深夜时分，客栈木门忽然被推开——一名白发老人走入屋内，肩头覆雪，衣摆沾霜，可他走过地面时却没有留下半点水迹。掌柜低声说："踏雪无痕……没想到这门身法还有人练成。"老人喝完一碗热汤，便转身离开，仿佛从未来过。',
  options: [
    { id: 'follow_now', text: '立即跟上', successRate: 100, skillBonus: [],
      success: { text: '你丢下碗筷，追出客栈。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'ask_innkeeper', text: '向掌柜打听', successRate: 100, skillBonus: [],
      success: { text: '掌柜低声说："那老头常在雪山出没，听说没人追得上他。"你点点头，追出客栈。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕2：雪原三岔路
BREAKTHROUGH_EVENTS.agility_grandmaster_2 = {
  id: 'bt_agility_grandmaster_2', title: '雪无痕', areaId: 'qingshi', category: 'unique',
  description: '你追出客栈，外面风雪漫天。远处隐约还能看见老人的背影，可没过多久，背影消失，脚印也消失。眼前只剩三条道路。',
  options: [
    { id: 'go_forest', text: '前往树林', successRate: 100, skillBonus: [],
      success: { text: '你踏入树林，积雪极深，每走一步都十分吃力。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'go_slope', text: '前往山坡', successRate: 100, skillBonus: [],
      success: { text: '你登上山坡，寒风呼啸，雪花不断被吹向同一个方向。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'go_stream', text: '沿溪流寻找', successRate: 100, skillBonus: [],
      success: { text: '你走向溪流，冰面覆盖着薄雪，一片死寂。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕3a：树林（→中闪避版老人）
BREAKTHROUGH_EVENTS.agility_grandmaster_3a = {
  id: 'bt_agility_grandmaster_3a', title: '雪无痕', areaId: 'qingshi', category: 'unique',
  description: '树林中你发现不少树根裸露在雪面之外，树根上残留着极浅的踩踏痕迹。老人一路都踩在树根上借力，因此留下的痕迹极少——脚步之轻，连雪都未能留住。',
  options: [
    { id: 'note_down', text: '记下发现，继续追踪', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'keep_chasing', text: '继续追赶', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕3b：山坡（→中攻击版老人）
BREAKTHROUGH_EVENTS.agility_grandmaster_3b = {
  id: 'bt_agility_grandmaster_3b', title: '雪无痕', areaId: 'qingshi', category: 'unique',
  description: '登上山坡，你很快发现老人留下的痕迹几乎都位于顺风方向，仿佛一直借助风势前行。风力所至，步伐所至——力不在身，在天地之间。',
  options: [
    { id: 'watch_wind', text: '观察风向，记下规律', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'keep_chasing', text: '继续追赶', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕3c：溪流（→中防御版老人）
BREAKTHROUGH_EVENTS.agility_grandmaster_3c = {
  id: 'bt_agility_grandmaster_3c', title: '雪无痕', areaId: 'qingshi', category: 'unique',
  description: '仔细观察冰面后，你发现几道极细微的裂纹，一路延伸向远方。老人并非踏雪而行，而是在冰面借力滑行，因此几乎没有留下脚印——身与地合，动而无迹。',
  options: [
    { id: 'study_cracks', text: '研究裂纹走向', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'keep_chasing', text: '继续追赶', successRate: 100, skillBonus: [],
      success: { text: '', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕4a/4b/4c：再见老人（内容相同，分三路保持路径记忆）
const _agility_gm_4_desc = '天色渐亮，你终于再次看见老人，他站在雪坡之上，静静看着你，随后缓缓开口："追了一夜。可曾看见什么？"说完，老人一步踏出，身影瞬间消失于风雪之间。片刻后，一道声音从远处传来："若看见了，便来山顶。"';
const _agility_gm_4_opts = [
  { id: 'go_peak', text: '前往山顶', successRate: 100, skillBonus: [] as [],
    success: { text: '你抬头望向山顶，迈步向上。', effect: 'nothing' as const }, failure: { text: '', effect: 'nothing' as const } },
  { id: 'track_more', text: '继续寻找踪迹', successRate: 100, skillBonus: [] as [],
    success: { text: '你再次寻找，最终仍来到山顶。', effect: 'nothing' as const }, failure: { text: '', effect: 'nothing' as const } },
];
BREAKTHROUGH_EVENTS.agility_grandmaster_4a = { id: 'bt_agility_grandmaster_4a', title: '雪无痕', areaId: 'qingshi', category: 'unique', description: _agility_gm_4_desc, options: _agility_gm_4_opts };
BREAKTHROUGH_EVENTS.agility_grandmaster_4b = { id: 'bt_agility_grandmaster_4b', title: '雪无痕', areaId: 'qingshi', category: 'unique', description: _agility_gm_4_desc, options: _agility_gm_4_opts };
BREAKTHROUGH_EVENTS.agility_grandmaster_4c = { id: 'bt_agility_grandmaster_4c', title: '雪无痕', areaId: 'qingshi', category: 'unique', description: _agility_gm_4_desc, options: _agility_gm_4_opts };
// 幕5a：战斗（树林路线，中闪避）
BREAKTHROUGH_EVENTS.agility_grandmaster_5a = {
  id: 'bt_agility_grandmaster_5a', title: '雪无痕', areaId: 'qingshi', category: 'unique',
  description: '老人已在山顶等候。风雪之中，他缓缓抬手。',
  options: [
    { id: 'fight', text: '迎上前去', successRate: 100, skillBonus: [],
      success: { text: '你踏雪而上——', effect: 'combat', enemyId: 'snow_elder_dodge', onWin: 'agility_grandmaster_6', onLose: 'agility_grandmaster_6' },
      failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕5b：战斗（山坡路线，中攻击）
BREAKTHROUGH_EVENTS.agility_grandmaster_5b = {
  id: 'bt_agility_grandmaster_5b', title: '雪无痕', areaId: 'qingshi', category: 'unique',
  description: '老人已在山顶等候。风雪之中，他缓缓抬手。',
  options: [
    { id: 'fight', text: '迎上前去', successRate: 100, skillBonus: [],
      success: { text: '你踏雪而上——', effect: 'combat', enemyId: 'snow_elder_attack', onWin: 'agility_grandmaster_6', onLose: 'agility_grandmaster_6' },
      failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕5c：战斗（溪流路线，中防御）
BREAKTHROUGH_EVENTS.agility_grandmaster_5c = {
  id: 'bt_agility_grandmaster_5c', title: '雪无痕', areaId: 'qingshi', category: 'unique',
  description: '老人已在山顶等候。风雪之中，他缓缓抬手。',
  options: [
    { id: 'fight', text: '迎上前去', successRate: 100, skillBonus: [],
      success: { text: '你踏雪而上——', effect: 'combat', enemyId: 'snow_elder_defense', onWin: 'agility_grandmaster_6', onLose: 'agility_grandmaster_6' },
      failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕6：突破
BREAKTHROUGH_EVENTS.agility_grandmaster_6 = {
  id: 'bt_agility_grandmaster_6', title: '雪无痕', areaId: 'qingshi', category: 'unique',
  description: '老人倒没有受伤，反而露出欣慰的笑容："不错，终于追上来了。"你低头望向脚下，雪地里遍布战斗留下的痕迹，可远处，风雪吹过，老人一路走来的脚印早已消失。真正的轻功，从来不是不留下痕迹，而是顺势而行，让天地替你抹去痕迹。老人点了点头，转身走入风雪之中，声音渐渐远去："身轻者，可越山河。迹轻者，可融天地。"不久后，最后一串脚印也消失在雪中。',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础身法突破至大成。', effect: 'breakthrough', skillId: 'agility' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础身法：风过无声（大成→宗师）═══════════════
BREAKTHROUGH_EVENTS.agility_mythic = {
  id: 'bt_agility_mythic', title: '风过无声', areaId: 'qingshi', category: 'unique',
  description: '多年之后，你再次经过那座雪山。积雪早已融化，山谷中只有风声。石壁上刻着几行小字：「风过山林。树知。鸟知。风不知。」',
  options: [
    { id: 'climb', text: '登上山顶', successRate: 100, skillBonus: [],
      success: { text: '你沿着山路向上，步伐不知何时已经悄无声息。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'ponder', text: '留下思索片刻', successRate: 100, skillBonus: [],
      success: { text: '你凝望石壁良久，随后抬步向上。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.agility_mythic_2 = {
  id: 'bt_agility_mythic_2', title: '风过无声', areaId: 'qingshi', category: 'unique',
  description: '山巅空无一人，只有一棵古松。树下摆着一双已经破旧的草鞋，草鞋旁压着一张纸："若觉得自己轻了，便脱下鞋，再走一遍。"你照做了——脚踩山石，没有想象中的疼痛，也没有刻意放轻脚步，只是一步一步向前。忽然发现，耳边除了风声，再没有别的声音。',
  options: [
    { id: 'look_back', text: '回头看看', successRate: 100, skillBonus: [],
      success: { text: '你停下脚步，缓缓回望。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'keep_walking', text: '继续前行', successRate: 100, skillBonus: [],
      success: { text: '你继续向前，风声渐渐也淡了。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.agility_mythic_3 = {
  id: 'bt_agility_mythic_3', title: '风过无声', areaId: 'qingshi', category: 'unique',
  description: '你回头望去——没有人，没有脚印，没有草鞋，甚至连那张纸也已不见。你忽然笑了。曾经，你想着跑得更快；后来，想着走得更轻；如今，你终于明白：真正的身法，不是让别人追不上你，而是让自己，忘记了奔跑。山风吹过，仿佛有人轻声说道："身轻者，可越山河。心轻者，可越天地。"',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础身法突破至宗师。', effect: 'breakthrough', skillId: 'agility' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础体魄：负重修行（入门→熟练）═══════════════
BREAKTHROUGH_EVENTS.body_mastery = {
  id: 'bt_body_mastery', title: '负重修行', areaId: 'qingshi', category: 'unique',
  description: '连续数日的修炼后，你发现自己的体魄已经达到瓶颈。继续挥拳、奔跑、战斗，都无法再有提升。你决定进行一次最简单，也是最困难的修行——负重前行。路线是镇外那条旧道，穿过山林，绕过溪边，没有终点，只有不断前进。那条路你走过，只是上一次，走得很轻。',
  options: [
    { id: 'adjust', text: '调整状态后开始修炼', successRate: 100, skillBonus: [],
      success: { text: '你活动筋骨，调匀呼吸，恢复了些许气力。', effect: 'heal', value: 100 }, failure: { text: '', effect: 'nothing' } },
    { id: 'start_now', text: '立即开始修炼', successRate: 100, skillBonus: [],
      success: { text: '你扛起石块，迈步向前。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕2：第一次前行
BREAKTHROUGH_EVENTS.body_mastery_2 = {
  id: 'bt_body_mastery_2', title: '负重修行', areaId: 'qingshi', category: 'unique',
  description: '沉重的石块压在肩头。刚开始，你还能轻松前进。可随着时间推移，呼吸越来越急促，双腿也开始发沉。你知道，现在的每一步都会消耗体力。',
  options: [
    { id: 'push', text: '咬牙坚持', successRate: 100, skillBonus: [], minHp: 41,
      success: { text: '你强撑着步伐，汗水浸透衣背。', effect: 'damage', value: 40 }, failure: { text: '', effect: 'nothing' } },
    { id: 'rest', text: '原地休息', successRate: 100, skillBonus: [],
      success: { text: '你放下石块，就地坐下，缓了口气。', effect: 'heal', value: 30 }, failure: { text: '', effect: 'nothing' } },
    { id: 'leave', text: '放弃修炼（取消突破）', successRate: 100, skillBonus: [],
      success: { text: '你放下石块，摇摇头离开了。时机未到。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕3：修炼继续（未休息过）
BREAKTHROUGH_EVENTS.body_mastery_3 = {
  id: 'bt_body_mastery_3', title: '负重修行', areaId: 'qingshi', category: 'unique',
  description: '时间一点一点过去。路转过一道坡，隐约是当年追兔子的那片林子，溪水声从树间漏出来。只是此刻肩上压着石块，脚步再也轻不起来。远处有人不断超过你，也有人停下来，再也没有站起。肩上的重量没有变化，真正变重的，是身体。',
  options: [
    { id: 'push', text: '再坚持一段路', successRate: 100, skillBonus: [], minHp: 41,
      success: { text: '你咬紧牙关，又迈出了数十步。', effect: 'damage', value: 40 }, failure: { text: '', effect: 'nothing' } },
    { id: 'rest', text: '停下来恢复体力', successRate: 100, skillBonus: [],
      success: { text: '你放下石块，就地坐下，喘息片刻。', effect: 'heal', value: 30 }, failure: { text: '', effect: 'nothing' } },
    { id: 'leave', text: '放弃修炼（取消突破）', successRate: 100, skillBonus: [],
      success: { text: '你放下石块，缓缓离去。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕3r：修炼继续（已休息过）
BREAKTHROUGH_EVENTS.body_mastery_3r = {
  id: 'bt_body_mastery_3r', title: '负重修行', areaId: 'qingshi', category: 'unique',
  description: '时间一点一点过去。路转过一道坡，隐约是当年追兔子的那片林子，溪水声从树间漏出来。只是此刻肩上压着石块，脚步再也轻不起来。远处有人不断超过你，也有人停下来，再也没有站起。肩上的重量没有变化，真正变重的，是身体。',
  options: [
    { id: 'push', text: '再坚持一段路', successRate: 100, skillBonus: [], minHp: 41,
      success: { text: '你咬紧牙关，又迈出了数十步。', effect: 'damage', value: 40 }, failure: { text: '', effect: 'nothing' } },
    { id: 'rest', text: '停下来恢复体力', successRate: 100, skillBonus: [],
      success: { text: '你放下石块，喘息片刻，身体稍有恢复。', effect: 'heal', value: 30 }, failure: { text: '', effect: 'nothing' } },
    { id: 'leave', text: '放弃修炼（取消突破）', successRate: 100, skillBonus: [],
      success: { text: '你放下石块，缓缓离去。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕4：最后的考验（未曾休息，继续→回幕3）
BREAKTHROUGH_EVENTS.body_mastery_4 = {
  id: 'bt_body_mastery_4', title: '负重修行', areaId: 'qingshi', category: 'unique',
  description: '你已经疲惫不堪，汗水不断滴落。此时你忽然发现：真正阻碍你的，并不是肩上的重量，而是你如何面对疲惫。有的人一味硬撑，最终倒下；有的人稍作恢复，又重新出发。你深吸一口气，等待自己的决定。——尚未充分休整，或许还需要再坚持一程。',
  options: [
    { id: 'continue', text: '继续前进', successRate: 100, skillBonus: [],
      success: { text: '你扛起石块，继续向前。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'leave', text: '放弃修炼（取消突破）', successRate: 100, skillBonus: [],
      success: { text: '你放下石块，缓缓离去。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕4r：最后的考验（休息过，继续→幕5突破）
BREAKTHROUGH_EVENTS.body_mastery_4r = {
  id: 'bt_body_mastery_4r', title: '负重修行', areaId: 'qingshi', category: 'unique',
  description: '你已经疲惫不堪，汗水不断滴落。此时你忽然发现：真正阻碍你的，并不是肩上的重量，而是你如何面对疲惫。有的人一味硬撑，最终倒下；有的人稍作恢复，又重新出发。你深吸一口气——你已经历过了那种抉择。',
  options: [
    { id: 'continue', text: '继续前进', successRate: 100, skillBonus: [],
      success: { text: '你扛起石块，最后一次迈步向前。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'leave', text: '放弃修炼（取消突破）', successRate: 100, skillBonus: [],
      success: { text: '你放下石块，缓缓离去。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕5：突破
BREAKTHROUGH_EVENTS.body_mastery_5 = {
  id: 'bt_body_mastery_5', title: '负重修行', areaId: 'qingshi', category: 'unique',
  description: '不知过去了多久。你再次放下肩上的重物，站在溪边。身体早已疲惫，却依旧能够稳稳站立。对岸的草地上，一只白兔停下来望了你片刻，随即跳入林中。你忽然想起当年那次——那时你脚步轻盈，它跑，你追，最后是你先到溪边。如今你步步沉重，走得极慢，却同样到了这里。那一刻你终于明白：身法借的是外力，体魄靠的是自己。疲惫之后仍能站立，这才是根本。你隐约想起当年教你打枯树的那个壮汉——他说孺子可教，却从未说你已经够了。',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础体魄突破至熟练。', effect: 'breakthrough', skillId: 'body' }, failure: { text: '', effect: 'nothing' } },
  ],
};
// ═══════════════ 基础体魄：千斤石（精通→大成）═══════════════
BREAKTHROUGH_EVENTS.body_grandmaster = {
  id: 'bt_body_grandmaster', title: '千斤石', areaId: 'qingshi', category: 'unique',
  description: '山路之间，你看见几名村民围在一起。道路中央，一块巨石滚落，彻底堵死了通往山下的道路。村民们满脸愁容："再过几天就是赶集日，这石头不搬开，大家都下不了山。"',
  options: [
    { id: 'help_push', text: '帮忙搬石', successRate: 100, skillBonus: [],
      success: { text: '你走上前，加入众人。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'observe', text: '观察情况', successRate: 100, skillBonus: [],
      success: { text: '许多人都尝试过，巨石纹丝不动。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.body_grandmaster_2 = {
  id: 'bt_body_grandmaster_2', title: '千斤石', areaId: 'qingshi', category: 'unique',
  description: '你走到巨石前，深吸一口气，双手抵住石壁。巨石微微晃动，却没有移动，反而震得双臂发麻。村民摇头说道："几十个人试过了，根本推不动。"',
  options: [
    { id: 'try_again', text: '再试一次', successRate: 100, skillBonus: [], minHp: 31,
      success: { text: '你咬牙再度发力，双臂酸痛不已。', effect: 'damage', value: 30 }, failure: { text: '', effect: 'nothing' } },
    { id: 'rest', text: '暂时休息，恢复状态', successRate: 100, skillBonus: [],
      success: { text: '你退后一步，调匀呼吸。', effect: 'heal', value: 30 }, failure: { text: '', effect: 'nothing' } },
  ],
};

BREAKTHROUGH_EVENTS.body_grandmaster_3 = {
  id: 'bt_body_grandmaster_3', title: '千斤石', areaId: 'qingshi', category: 'unique',
  description: '就在此时，越来越多的人来到这里——老人、猎户、樵夫，甚至几个孩子。所有人都站到了巨石后面。有人说道："一个人推不动，那就大家一起。"',
  options: [
    { id: 'push_together', text: '一同发力', successRate: 100, skillBonus: [],
      success: { text: '你站到最前，号子声响起。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'command', text: '负责指挥，协调众人', successRate: 100, skillBonus: [],
      success: { text: '你高声喊出节奏，所有人齐声应和。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.body_grandmaster_4 = {
  id: 'bt_body_grandmaster_4', title: '千斤石', areaId: 'qingshi', category: 'unique',
  description: '号子声响彻山谷。一次，两次，三次——巨石终于缓缓移动，伴随着轰鸣声，道路重新畅通。村民们发出欢呼。你瘫坐在地，双臂已经失去知觉，可心中却异常平静。真正的力量，从来不是举起千斤重物，而是当所有人都推不动时，你依然愿意站出来。——当年那个教你打枯树的壮汉，或许也明白这一点。',
  options: [
    { id: 'continue', text: '继续前行', successRate: 100, skillBonus: [],
      success: { text: '※ 基础体魄突破至大成。', effect: 'breakthrough', skillId: 'body' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础体魄：镇山人（大成→宗师）═══════════════
BREAKTHROUGH_EVENTS.body_mythic = {
  id: 'bt_body_mythic', title: '镇山人', areaId: 'qingshi', category: 'unique',
  description: '暴雨连下数日，山洪暴发。你路过一座山村，发现全村人都聚集在河边——上游的木桥已经断裂，洪水不断冲击堤坝。若堤坝崩塌，整个村子都会被淹没。',
  options: [
    { id: 'go_dam', text: '前往堤坝查看险情', successRate: 100, skillBonus: [],
      success: { text: '你快步走向堤坝，洪声震耳。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'help_villagers', text: '先帮助村民疏散', successRate: 100, skillBonus: [],
      success: { text: '你安排老弱先撤，随后转身走向堤坝。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.body_mythic_2 = {
  id: 'bt_body_mythic_2', title: '镇山人', areaId: 'qingshi', category: 'unique',
  description: '堤坝已经出现裂缝，洪水不断灌入。所有人都知道堤坝坚持不了多久。就在此时，一位老者指向缺口，说道："总得有人顶在那里。"',
  options: [
    { id: 'step_up', text: '站出来', successRate: 100, skillBonus: [],
      success: { text: '你没有多说，走向缺口。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'step_up_slow', text: '沉默片刻，然后站出来', successRate: 100, skillBonus: [],
      success: { text: '你深吸一口气，走向缺口。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.body_mythic_3 = {
  id: 'bt_body_mythic_3', title: '镇山人', areaId: 'qingshi', category: 'unique',
  description: '冰冷的洪水撞击在身体上，每一次冲击都像重锤砸落。你咬紧牙关，死死顶住缺口。时间一点点过去，天色渐暗，村民们不断运来石块加固堤坝，而你始终站在那里，一步未退。',
  options: [
    { id: 'hold', text: '坚持', successRate: 100, skillBonus: [],
      success: { text: '你压低重心，继续承受洪流。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'grit', text: '咬牙坚持', successRate: 100, skillBonus: [],
      success: { text: '意识开始模糊，你强迫自己清醒。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.body_mythic_4 = {
  id: 'bt_body_mythic_4', title: '镇山人', areaId: 'qingshi', category: 'unique',
  description: '天终于亮了。洪水开始退去，堤坝保住了，村子也保住了。你缓缓坐下，全身酸痛，几乎无法动弹。可看着远处升起的炊烟，你忽然明白：体魄的尽头，从来不是拥有多强大的力量，而是在别人需要的时候，能够撑住。仅此而已。',
  options: [
    { id: 'continue', text: '继续前行', successRate: 100, skillBonus: [],
      success: { text: '※ 基础体魄突破至宗师。', effect: 'breakthrough', skillId: 'body' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础心法：无字书（入门→熟练）═══════════════
BREAKTHROUGH_EVENTS.mind_mastery = {
  id: 'bt_mind_mastery', title: '无字书', areaId: 'qingshi', category: 'unique',
  description: '近日城中流传着一个消息：一位隐居多年的老先生手中藏着一本《无字书》。看懂的人，皆有所悟；看不懂的人，只会觉得那是一本白纸。你本不以为意，却发现不少修行之人都曾前去拜访。于是，你决定一探究竟。',
  options: [
    { id: 'go_market', text: '前往集市打听消息', successRate: 100, skillBonus: [],
      success: { text: '你走入熙攘的集市，四处打听。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'go_academy', text: '前往书院查阅资料', successRate: 100, skillBonus: [],
      success: { text: '你前往书院，翻阅典籍。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕2A：集市
BREAKTHROUGH_EVENTS.mind_mastery_2a = {
  id: 'bt_mind_mastery_2a', title: '无字书', areaId: 'qingshi', category: 'unique',
  description: '集市上，人来人往。卖糖人的老人笑道："什么无字书？不过是骗人的把戏。"卖药的商贩却压低声音说："听说有人进去时满腹疑惑，出来时却一句话都不肯说。"就在你准备离开时，角落里一位老人缓缓开口："有些书，本就不是给眼睛看的。"说完，他指向城外的一间旧屋。',
  options: [
    { id: 'ask_elder', text: '继续向老人请教', successRate: 100, skillBonus: [],
      success: { text: '老人微微一笑，说了一些话，随后便不再言语。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'follow_hint', text: '按照老人指的方向寻找', successRate: 100, skillBonus: [],
      success: { text: '你顺着老人所指的方向，向城外走去。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕2B：书院
BREAKTHROUGH_EVENTS.mind_mastery_2b = {
  id: 'bt_mind_mastery_2b', title: '无字书', areaId: 'qingshi', category: 'unique',
  description: '书院中典籍众多。你翻阅了半天，却没有找到任何关于《无字书》的记载。正准备离开时，一位老教习放下茶杯，说道："真正的书，在纸上。"停顿片刻后，又补充道："更在心里。"说完，他递给你一张写着地址的纸条。',
  options: [
    { id: 'follow_teacher', text: '跟随老教习前往', successRate: 100, skillBonus: [],
      success: { text: '老教习起身，带你走出了书院。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'go_alone', text: '独自按照纸条寻找', successRate: 100, skillBonus: [],
      success: { text: '你收好纸条，独自向城外走去。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕3：旧屋
BREAKTHROUGH_EVENTS.mind_mastery_3 = {
  id: 'bt_mind_mastery_3', title: '无字书', areaId: 'qingshi', category: 'unique',
  description: '旧屋十分安静。屋内只有一张木桌、一盏油灯，以及一位白发老人。老人没有询问你的来意，只是从桌下拿出一本书，轻轻放在你的面前——《无字书》。你翻开第一页，空白。第二页，依旧空白。整本书，没有一个字。老人闭目养神，一言不发。',
  options: [
    { id: 'read_through', text: '仔细翻阅整本书', successRate: 100, skillBonus: [],
      success: { text: '你一页一页翻过，试图找到隐藏的内容。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'observe_elder', text: '合上书，静静观察老人', successRate: 100, skillBonus: [],
      success: { text: '你轻轻合上书，将目光转向老人。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕4A：寻找答案
BREAKTHROUGH_EVENTS.mind_mastery_4a = {
  id: 'bt_mind_mastery_4a', title: '无字书', areaId: 'qingshi', category: 'unique',
  description: '你反复翻阅。第一页、第二页、第三页……依旧什么都没有。你开始怀疑：是不是自己遗漏了什么？还是这本书本就是假的？老人依旧闭着眼，没有任何反应。',
  options: [
    { id: 'check_again', text: '再仔细检查一遍', successRate: 100, skillBonus: [],
      success: { text: '你再次从头翻起，一页都不放过。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'put_down', text: '放下书，静静思考', successRate: 100, skillBonus: [],
      success: { text: '你将书轻轻放回桌上，闭目思索。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕4B：观察
BREAKTHROUGH_EVENTS.mind_mastery_4b = {
  id: 'bt_mind_mastery_4b', title: '无字书', areaId: 'qingshi', category: 'unique',
  description: '你没有继续翻书，只是静静坐在那里。老人始终没有说话。屋外微风吹过，书页缓缓翻动。你忽然发现，自己第一次没有急着寻找答案。房间依旧安静，你的心，却慢慢平静下来。',
  options: [
    { id: 'open_again', text: '再次打开《无字书》', successRate: 100, skillBonus: [],
      success: { text: '你重新拿起书，翻开第一页。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'keep_waiting', text: '继续静静等待', successRate: 100, skillBonus: [],
      success: { text: '你放空心神，随着屋外风声静静等候。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// 幕5：领悟
BREAKTHROUGH_EVENTS.mind_mastery_5 = {
  id: 'bt_mind_mastery_5', title: '无字书', areaId: 'qingshi', category: 'unique',
    description: '老人终于睁开双眼，看着桌上的《无字书》，缓缓说道："书，一直都是空的。变的，不是书，而是你的心。"你再次低头望去，纸张依旧洁白，没有一个字。可这一刻，你已经不再执着于寻找答案。真正的心法，不是让内心没有杂念，而是在杂念之中，仍然知道自己该走向何方。那条溪边打坐时开凿的通路，如今终于有了方向。只是路的尽头在哪里，还需要继续走下去才能知道。',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础心法突破至熟练。', effect: 'breakthrough', skillId: 'mind' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础心法：灯下问答（精通→大成）═══════════════
BREAKTHROUGH_EVENTS.mind_grandmaster = {
  id: 'bt_mind_grandmaster', title: '灯下问答', areaId: 'qingshi', category: 'unique',
  description: '你修炼许久，内息越来越顺畅，方向也越来越清晰。可有一日，你忽然发现——越是在意那条通路，它反而越堵。一位行脚僧在路边生火，见你神色凝滞，只是随口问了一句："今夜有风。你觉得，风是从哪里来的？"',
  options: [
    { id: 'answer', text: '认真回答', successRate: 100, skillBonus: [],
      success: { text: '你思索片刻，给出一个答案。僧人微微摇头，指了指旁边的油灯。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'sit_down', text: '坐下来，听他说', successRate: 100, skillBonus: [],
      success: { text: '你在他对面坐下，火光映在两人脸上。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};

BREAKTHROUGH_EVENTS.mind_grandmaster_2 = {
  id: 'bt_mind_grandmaster_2', title: '灯下问答', areaId: 'qingshi', category: 'unique',
  description: '僧人用手指轻轻遮住灯焰。灯灭了。他问："光去了哪里？"你一时语塞。他又问："念头起了，去了哪里？"他没有等你回答，重新点燃油灯，说道："光来了，不是你请来的。光去了，也不是你赶走的。念头也一样。"',
  options: [
    { id: 'ask_more', text: '继续追问', successRate: 100, skillBonus: [],
      success: { text: '僧人摇了摇头："问得越多，离得越远。"他起身，继续赶路。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'sit_silent', text: '不再说话，静静坐着', successRate: 100, skillBonus: [],
      success: { text: '你闭上眼，火光和风声渐渐远去。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.mind_grandmaster_3 = {
  id: 'bt_mind_grandmaster_3', title: '灯下问答', areaId: 'qingshi', category: 'unique',
  description: '不知过了多久，你睁开眼。僧人已经离开，火也熄了。可你的内息，却比任何时候都要平稳——不是因为你在引导，而是因为你停止了引导。那条通路一直都在，堵着它的，是你自己。心法不是压住念头，而是让念头自来自去，就像风过灯焰，来时不拦，去时不追。',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础心法突破至大成。', effect: 'breakthrough', skillId: 'mind' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础心法：一念（大成→宗师）═══════════════
BREAKTHROUGH_EVENTS.mind_mythic = {
  id: 'bt_mind_mythic', title: '一念', areaId: 'qingshi', category: 'unique',
  description: '多年之后，你路过当年那个生火的地方。路边只剩一盏残旧的油灯，灯下压着一张纸："若你还记得那个问题，便在此坐到灯灭。"落款没有名字。你认得出，是当年那位僧人的字迹。',
  options: [
    { id: 'sit_and_wait', text: '坐下，等灯灭', successRate: 100, skillBonus: [],
      success: { text: '你在灯旁坐下，不引气，不观息，只是静静等待。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'light_it', text: '重新点亮油灯，再坐下', successRate: 100, skillBonus: [],
      success: { text: '你取出火折子，将灯重新点燃，随后坐下。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.mind_mythic_2 = {
  id: 'bt_mind_mythic_2', title: '一念', areaId: 'qingshi', category: 'unique',
  description: '灯火在夜风中摇曳。念头来了，又走了。你没有去抓，也没有去推。不知过了多久，风大了一些，灯，灭了。四周陷入黑暗。你忽然想起当年溪边打坐的那个夜晚——那时你第一次听见自己体内血脉的声音，觉得那是一条通路。如今你才明白，那不是通路，那就是你自己。',
  options: [
    { id: 'stay', text: '继续坐着，不动', successRate: 100, skillBonus: [],
      success: { text: '黑暗中，你闭着眼，心里却比任何时候都亮。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'open_eyes', text: '睁开眼', successRate: 100, skillBonus: [],
      success: { text: '你睁开眼，四周漆黑，却莫名觉得什么都看得见。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
BREAKTHROUGH_EVENTS.mind_mythic_3 = {
  id: 'bt_mind_mythic_3', title: '一念', areaId: 'qingshi', category: 'unique',
  description: '天色渐亮。你站起身，活动了一下手脚。脑海里没有什么特别的念头，也没有什么特别的感悟。只是走路的时候，脚步比以前轻了一些。一念起，是心；一念落，也是心。心法修到最后，不是学会了什么，而是不再需要用功。',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础心法突破至宗师。', effect: 'breakthrough', skillId: 'mind' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础战悟：木人·无影（二）破甲（熟练→精通）═══════════════
BREAKTHROUGH_EVENTS.insight_mastery = {
  id: 'bt_insight_mastery', title: '木人·无影·破甲', areaId: 'qingshi', category: 'unique',
  description: '你再次来到武馆，馆主早已等候多时。木人·无影依旧静静立于演武场中央。馆主缓缓说道："上一次，你学会了观察。这一次，你要学会利用观察。开始吧。"',
  options: [
    { id: 'accept', text: '接受挑战', successRate: 100, skillBonus: [],
      success: { text: '你握紧兵刃，走向演武场中央。', effect: 'combat', enemyId: 'wooden_dummy_armored', onWin: 'insight_mastery_2_after', onLose: 'insight_mastery_2_after' },
      failure: { text: '', effect: 'nothing' } },
    { id: 'inspect', text: '查看木人的变化', successRate: 100, skillBonus: [],
      success: { text: '你绕着木人走了一圈——护甲比上次厚重许多。你点点头，走向演武场中央。', effect: 'combat', enemyId: 'wooden_dummy_armored', onWin: 'insight_mastery_2_after', onLose: 'insight_mastery_2_after' },
      failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕2_after
BREAKTHROUGH_EVENTS.insight_mastery_2_after = {
  id: 'bt_insight_mastery_2_after', title: '木人·无影·破甲', areaId: 'qingshi', category: 'unique',
  description: '战斗结束。你的攻击几乎全部命中，然而每一次攻击都像打在厚重的铁壁之上——木人只是微微晃动，没有受到任何实质伤害。馆主说道："现在，你能打中它了。可打中，不代表能打败。"',
  options: [
    { id: 'ask_again', text: '请求再次挑战', successRate: 100, skillBonus: [],
      success: { text: '馆主示意你停下："先观察。"', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'observe', text: '留下观察木人', successRate: 100, skillBonus: [],
      success: { text: '你退到场边，仔细注视木人接受挑战时的每一个动作。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕3：发现护甲缝隙
BREAKTHROUGH_EVENTS.insight_mastery_3 = {
  id: 'bt_insight_mastery_3', title: '木人·无影·破甲', areaId: 'qingshi', category: 'unique',
  description: '你站在演武场旁。木人不断接受其他弟子的挑战——有人挥刀，有人使拳，有人全力一击，结果都一样。忽然，在一次转身之间，你发现木人胸前护甲微微张开，虽然只有短短一瞬，但那里没有任何防护。馆主看向你："再坚固的甲胄，也总会留下缝隙。"',
  options: [
    { id: 'challenge_now', text: '立即再次挑战', successRate: 100, skillBonus: [],
      success: { text: '你握紧兵刃，再次走向演武场中央。', effect: 'combat', enemyId: 'wooden_dummy_cracked', onWin: 'insight_mastery_4_after', onLose: 'insight_mastery_4_after' },
      failure: { text: '', effect: 'nothing' } },
    { id: 'prepare_then', text: '调整状态后再次挑战', successRate: 100, skillBonus: [],
      success: { text: '你深吸一口气，将时机牢记于心，再次走向演武场中央。', effect: 'combat', enemyId: 'wooden_dummy_cracked', onWin: 'insight_mastery_4_after', onLose: 'insight_mastery_4_after' },
      failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕4_after：突破
BREAKTHROUGH_EVENTS.insight_mastery_4_after = {
  id: 'bt_insight_mastery_4_after', title: '木人·无影·破甲', areaId: 'qingshi', category: 'unique',
  description: '战斗再次开始。你没有再盲目攻击。木人挥动手臂，转身——就在那一瞬间，胸前护甲露出一道细小的空隙。你抓住机会，一击落下，木人停止了动作。馆主满意地点了点头："再厚的城墙，也会有城门。再强的敌人，也会有弱点。战悟，不是拼尽全力，而是在正确的地方，用正确的一击。"看见了，也用了。但馆主的眼神里，似乎还留有一分未尽之意。',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础战悟突破至精通。', effect: 'breakthrough', skillId: 'insight' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础战悟：木人·无影（三）持久（精通→大成）═══════════════
BREAKTHROUGH_EVENTS.insight_grandmaster = {
  id: 'bt_insight_grandmaster', title: '木人·无影·持久', areaId: 'qingshi', category: 'unique',
  description: '馆主站在演武场边，神色平静。木人·无影今日换上了加厚的木料，体积比以往更为厚重。馆主说道："上一次，你学会了看见缝隙。这一次，它没有缝隙——但任何机关都有极限。你的任务，是找到它何时会力竭。"',
  options: [
    { id: 'accept', text: '接受挑战', successRate: 100, skillBonus: [],
      success: { text: '你稳住呼吸，走向演武场中央。', effect: 'combat', enemyId: 'wooden_dummy_endurance', onWin: 'insight_grandmaster_2_after', onLose: 'insight_grandmaster_2_after' },
      failure: { text: '', effect: 'nothing' } },
    { id: 'inspect', text: '绕场观察一圈再上', successRate: 100, skillBonus: [],
      success: { text: '你在木人周围慢慢踱步，感受它的分量与节奏，随后走向中央。', effect: 'combat', enemyId: 'wooden_dummy_endurance', onWin: 'insight_grandmaster_2_after', onLose: 'insight_grandmaster_2_after' },
      failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕2_after（高血量，打不穿）
BREAKTHROUGH_EVENTS.insight_grandmaster_2_after = {
  id: 'bt_insight_grandmaster_2_after', title: '木人·无影·持久', areaId: 'qingshi', category: 'unique',
  description: '战斗结束。每一击都命中，但木人仿佛无穷无尽——无论你如何施展，它始终缓缓运转，丝毫未有停歇之意。你气力渐衰，它依旧岿然不动。馆主平静地说："你在和它比力气。但机关不会疲倦——除非你找到让它停下来的理由。"',
  options: [
    { id: 'ask_again', text: '请求再次挑战', successRate: 100, skillBonus: [],
      success: { text: '馆主摇摇头："先停下来，看。"', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'observe', text: '退场观察木人运转', successRate: 100, skillBonus: [],
      success: { text: '你退到场边，凝神注视木人每一次运转的节奏。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕3：发现机关运转周期
BREAKTHROUGH_EVENTS.insight_grandmaster_3 = {
  id: 'bt_insight_grandmaster_3', title: '木人·无影·持久', areaId: 'qingshi', category: 'unique',
  description: '你站在场边，默默计数。木人的动作有一个极细微的停顿——每隔数十下，驱动它的机关会有一次换力的间隙，整体动作略微迟滞。就那么短短半息。但那半息，足够了。馆主低声说："所有持久的力量，都需要换气。"',
  options: [
    { id: 'challenge_now', text: '等待时机，立即再战', successRate: 100, skillBonus: [],
      success: { text: '你盯住节奏，踏入场中，等待那半息的空隙。', effect: 'combat', enemyId: 'wooden_dummy_exhausted', onWin: 'insight_grandmaster_4_after', onLose: 'insight_grandmaster_4_after' },
      failure: { text: '', effect: 'nothing' } },
    { id: 'prepare_then', text: '记下节奏，调整后再战', successRate: 100, skillBonus: [],
      success: { text: '你在心中默记换力的节拍，稳了稳气息，走回场中。', effect: 'combat', enemyId: 'wooden_dummy_exhausted', onWin: 'insight_grandmaster_4_after', onLose: 'insight_grandmaster_4_after' },
      failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕4_after：突破
BREAKTHROUGH_EVENTS.insight_grandmaster_4_after = {
  id: 'bt_insight_grandmaster_4_after', title: '木人·无影·持久', areaId: 'qingshi', category: 'unique',
  description: '这一次，你不再蛮打。你跟着木人的节奏移动，在它换力的那半息，精准落下重击。木人的运转骤然滞涩，终于慢慢停下。馆主说道："力量可以耗尽，意志可以磨断，但节奏——节奏是藏不住的。能读懂节奏，便能读懂战场上的一切。"他顿了顿，"但节奏只是表象。节奏背后，是势。"',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础战悟突破至大成。', effect: 'breakthrough', skillId: 'insight' }, failure: { text: '', effect: 'nothing' } },
  ],
};

// ═══════════════ 基础战悟：木人·无影（四）破势（大成→宗师）═══════════════
BREAKTHROUGH_EVENTS.insight_mythic = {
  id: 'bt_insight_mythic', title: '木人·无影·破势', areaId: 'qingshi', category: 'unique',
  description: '武馆演武场已经空场。馆主独自站在木人旁边，神色罕见地凝重。"这一次，木人换上了重锤臂。"他停顿片刻，"一旦被它打中，后果你自己清楚。"他看着你，"但每一次蓄力，都有征兆。你若看得见，它便不足为惧。"',
  options: [
    { id: 'accept', text: '接受挑战', successRate: 100, skillBonus: [],
      success: { text: '你深吸一口气，走向演武场中央。', effect: 'combat', enemyId: 'wooden_dummy_berserker', onWin: 'insight_mythic_2_after', onLose: 'insight_mythic_2_after' },
      failure: { text: '', effect: 'nothing' } },
    { id: 'inspect', text: '观察木人的重锤臂', successRate: 100, skillBonus: [],
      success: { text: '你绕着木人走了一圈，盯着它的重锤臂记下细节，随后踏入场中。', effect: 'combat', enemyId: 'wooden_dummy_berserker', onWin: 'insight_mythic_2_after', onLose: 'insight_mythic_2_after' },
      failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕2_after（高攻击，被打得很惨）
BREAKTHROUGH_EVENTS.insight_mythic_2_after = {
  id: 'bt_insight_mythic_2_after', title: '木人·无影·破势', areaId: 'qingshi', category: 'unique',
  description: '战斗结束。重锤的力道远超预料——每一击砸来，都带着能改变局面的重量。你或许回避了大半，但那几下命中，已让你深刻明白"势"是什么。馆主没有摇头，也没有点头，只是说："你感受到了它的势。现在，去找到势起之前的那一刻。"',
  options: [
    { id: 'ask_again', text: '请求再次挑战', successRate: 100, skillBonus: [],
      success: { text: '馆主抬手："先坐下，把刚才的每一击重新过一遍。"', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
    { id: 'observe', text: '坐下回想刚才的战斗', successRate: 100, skillBonus: [],
      success: { text: '你坐在场边，闭上眼，将刚才每一次重击来临前的细节在脑中重现。', effect: 'nothing' }, failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕3：发现蓄力前摇
BREAKTHROUGH_EVENTS.insight_mythic_3 = {
  id: 'bt_insight_mythic_3', title: '木人·无影·破势', areaId: 'qingshi', category: 'unique',
  description: '你静静回想。重锤落下之前，木人的腰轴会有一次细微的旋转蓄力——只有半个呼吸的时间，但那半个呼吸，足以让你侧身让开，并在它势尽的空档还击。馆主听你说完，缓缓点头："势，有始有终。看见它的起点，你便掌握了它的终点。"',
  options: [
    { id: 'challenge_now', text: '趁热打铁，立即再战', successRate: 100, skillBonus: [],
      success: { text: '你站起身，走回场中，目光紧紧锁住木人的腰轴。', effect: 'combat', enemyId: 'wooden_dummy_telegraphed', onWin: 'insight_mythic_4_after', onLose: 'insight_mythic_4_after' },
      failure: { text: '', effect: 'nothing' } },
    { id: 'prepare_then', text: '稳定心神后再战', successRate: 100, skillBonus: [],
      success: { text: '你调匀呼吸，将蓄力的前摇烙在心中，缓步走回场中。', effect: 'combat', enemyId: 'wooden_dummy_telegraphed', onWin: 'insight_mythic_4_after', onLose: 'insight_mythic_4_after' },
      failure: { text: '', effect: 'nothing' } },
  ],
};
// 幕4_after：突破
BREAKTHROUGH_EVENTS.insight_mythic_4_after = {
  id: 'bt_insight_mythic_4_after', title: '木人·无影·破势', areaId: 'qingshi', category: 'unique',
  description: '腰轴微转。你已经不在原地。重锤砸空，木人的身形在势尽的瞬间微微前倾——你抬手，一击正中要害。木人轰然停止。馆主久久沉默，最终开口："感受征兆，看见破绽，利用缝隙，读懂节奏，预判势头——你把这一切都走过来了。"他抬头看向远方，"木人已无可教你之处。江湖中真正的对手，等着你去见识。"',
  options: [
    { id: 'continue', text: '继续探索', successRate: 100, skillBonus: [],
      success: { text: '※ 基础战悟突破至宗师。', effect: 'breakthrough', skillId: 'insight' }, failure: { text: '', effect: 'nothing' } },
  ],
};
