# 龙隐山河 — AI Development Rules

## Product Positioning

> [!IMPORTANT]
> Current product target: **Idle Text RPG**.

## Documentation Scope

This file defines the project-level AI development rules for product direction, content design, UI tone, and technical constraints.

## Rule Index

- Product positioning
- Content and interaction rules
- Technical and architecture rules
- Workflow and quality rules
- References

## Product Positioning

- The game is an **online-only Idle Text RPG**.
- The core fantasy is **jianghu investigation, auto-journey, clue discovery, and breakthrough growth**.
- The product should feel like **light-interaction journey management**, not a twitch-action game and not a pure menu simulator.

## Core Experience Rules

1. There is only one primary auto action: **Journey**.
2. The game is **online-only**. Do not design or implement offline settlement.
3. The player should be able to **watch progress live** during journey; do not add a mandatory end-of-run settlement page as the main loop.
4. Journey outcomes must include more than combat:
   - minor combat
   - rumors and gossip
   - clue discovery
   - exploration gain
   - skill proficiency growth
   - healing, damage, or resource changes
5. Combat is part of journey, not the only expression of journey.

## Main Plot Advancement Rules

- Use this principle: **system executes, player decides**.
- Auto journey may advance routine content automatically.
- Auto journey must pause at major story gates and return control to the player.
- Key plot branches, boss commitment, and breakthroughs must remain player-driven.

### Three-layer content model

1. **Auto-resolve layer**
   - Small combat
   - Small gains/losses
   - Repeated rumors
   - Routine exploration progress
   - Routine skill growth

2. **Trigger layer**
   - A suspicious lead appears
   - A witness or location is discovered
   - A route opens
   - A key contradiction between clues appears
   - A boss trail is confirmed

3. **Decision layer**
   - Which lead to pursue
   - Whether to trust a faction or witness
   - Whether to enter a dangerous location now
   - Whether to challenge a boss
   - Whether to trigger a breakthrough event

When trigger-layer content appears, journey should pause and present a clear decision card.

## Content and Interaction Rules

### Text and tone

- Maintain a wuxia / jianghu tone with restrained, readable prose.
- Prioritize clarity over ornamental writing in gameplay-facing text.
- Logs, prompts, and event text should be short enough to scan during live journey.
- Do not use emoji in UI, logs, or labels.
- Prefer traditional in-world markers such as `※`, `——`, `「得」`, `「失」`, `「刃」`.

### UI expression

- The UI is text-led and information-led.
- The main screen should communicate:
  - current chapter
  - current journey state
  - recent live log
  - current objective or clue status
  - pending decision state when paused
- Avoid presenting the game like an action RPG HUD or a damage-heavy combat simulator.

### Progression language

- Prefer consistent progression vocabulary built around:
  - clues
  - journey
  - proficiency
  - breakthrough
  - exploration
  - reputation or jianghu standing
- Avoid mixing in unimplemented progression language such as level/job systems unless they are fully built.

## Technical and Architecture Rules

### Stack and state

- Framework: Next.js App Router
- UI: React
- State: Zustand
- Port: `13000`
- Core game state should remain in `src/store/useGameStore.ts`.

### Architectural direction

- The current product is text-first. Do not force Phaser scene-heavy architecture if DOM UI can express the feature more directly.
- Rendering is secondary to simulation and state.
- Keep the source of truth in store state, not in transient visual objects.
- Auto-journey should be implemented as a state-driven simulation loop, not as tightly coupled UI logic.

### Implementation constraints

- Online only. No offline settlement logic.
- Journey must support live progress updates while running.
- Major story decisions must produce explicit paused states in the store.
- Routine content should be data-driven where possible.

## Workflow and Quality Rules

### Feature priority

- Prioritize the main route `/` and the primary game loop before secondary systems.
- Prefer shipping one complete loop over partially implemented parallel systems.
- For this product, the preferred build order is:
  1. journey loop
  2. live log and pause-for-decision flow
  3. clue and chapter progression
  4. breakthrough and growth systems
  5. secondary polish

### Editing rules

- Keep files focused and reasonably small.
- Reuse existing state shape and naming conventions unless a clear refactor is necessary.
- Avoid introducing placeholder features that contradict product positioning.
- If a mechanic sounds like a traditional action RPG feature, reconsider whether it belongs in this project.

### Validation rules

- Verify TypeScript correctness after meaningful changes.
- Ensure the root route remains a game screen, not a default template page.
- Preserve the text-first tone and readability in every UI change.

## References

- Core store: `src/store/useGameStore.ts`
- Primary UI shell: `src/ui/react-game/GameShell.tsx`
- Main game page: `src/ui/react-game/GamePage.tsx`
- Chapter and event data: `src/game/data/gameData.ts`
- Skill and breakthrough data: `src/game/data/skillData.ts`, `src/game/data/breakthroughEvents.ts`
