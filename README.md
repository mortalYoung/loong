
<div align="center">

<h1>

_龙隐山河_

</h1>

<pre>
 _                          
| |    ___   ___  _ __   __ _ 
| |   / _ \ / _ \| '_ \ / _` |
| |__| (_) | (_) | | | | (_| |
|_____\___/ \___/|_| |_|\__, |
                        |___/ 
</pre>

[![powered by happyseeds](https://img.shields.io/badge/powered%20by-happyseeds-18cbef)](https://happyseeds.ai/)


</div>

一个基于 Next.js、React 与 Zustand 构建的在线 Idle Text RPG。

## 项目概览

本文档说明当前项目的产品方向、玩法结构、本地开发方式与核心代码布局。

## 目录

- 产品定位
- 核心玩法循环
- 技术栈
- 项目结构
- 开发方式

## 产品定位

《龙隐山河》是一款以文字表现为核心的武侠调查 RPG，当前只有一个主要自动行为：**游历（Journey）**。

当前目标体验为：
- 仅支持在线游玩
- 游历过程实时展示
- 常规内容自动推进
- 重大主线决策由玩家亲自选择
- 围绕章节、线索、探索与突破构建成长循环

本项目应当呈现为 **Idle Text RPG**，而不是动作 RPG，也不是纯菜单点击器。

## 核心玩法循环

当前预期循环为：

1. 进入当前章节
2. 开始或继续 **游历**
3. 在实时日志中观看过程推进
4. 让常规内容自动结算
5. 在关键剧情节点暂停
6. 由玩家做出决定并推动主线

游历结果不应只有战斗。常规自动结果应包括：
- 小规模战斗
- 传闻与闲话
- 线索碎片
- 探索度提升
- 技能熟练度增长
- 治疗、受伤与资源变化

核心原则：
- 系统执行
- 玩家决策

## 技术栈

- Next.js 16 (App Router)
- React 19
- Zustand 5
- TypeScript 5
- Tailwind CSS 4

本地默认端口：
- `http://localhost:13000`

## 项目结构

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── game/
│   └── data/
│       ├── gameData.ts
│       ├── skillData.ts
│       └── breakthroughEvents.ts
├── store/
│   └── useGameStore.ts
└── ui/
    └── react-game/
        ├── GameShell.tsx
        ├── GamePage.tsx
        ├── TitleScreen.tsx
        ├── SkillTreeModal.tsx
        └── DevPanel.tsx
```

重要文件：
- `src/store/useGameStore.ts`：游戏状态唯一事实源
- `src/ui/react-game/GameShell.tsx`：标题界面与游戏界面切换外壳
- `src/ui/react-game/GamePage.tsx`：游戏主界面
- `src/game/data/gameData.ts`：章节、敌人、事件、物品数据
- `src/game/data/skillData.ts`：基础技能与熟练度逻辑
- `src/game/data/breakthroughEvents.ts`：突破事件链数据

## 开发方式

安装依赖：

```bash
pnpm install
```

本地启动：

```bash
pnpm dev
```

其他常用命令：

```bash
pnpm build
pnpm start
npx tsc --noEmit
```

## 开发约束

- 根路由 `/` 必须始终保持为主游戏界面。
- 保持以文字为主的表现方式。
- 不要加入离线结算逻辑。
- 除非明确进行架构重构，否则不要把核心状态源从 `useGameStore.ts` 中拆走。
- 优先使用数据驱动扩展内容，而不是继续堆硬编码分支。
- 不要混入尚未真正实现的成长表述，例如等级、转职等。

## 当前设计方向

接下来的主要演进方向，是把当前循环进一步推进为更明确的在线 Idle Text 结构：

- 只保留一个核心自动行为：**游历**
- 游历过程中持续实时更新
- 常规内容自动结算
- 主线关键节点暂停并要求玩家做出选择

这样既能保持低操作、强可读、重叙事，也能保留玩家在主线推进上的主动权。
