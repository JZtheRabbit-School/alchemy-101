# Alchemy 101 — development journal

This is a retrospective decision record of the conversation, not a verbatim transcript. No game implementation or gameplay testing has occurred yet. Dates follow America/New_York.

## 2026-11-11 — initial concept and recipe review

The user proposed an interactive alchemy webpage, beginning with Fire, Water, Air, and Earth. The original design named making an Elixir as the goal. Later decisions hide that objective from players.

The initial recipe set was reviewed for plausibility. The user clarified that surprising, frustrating, "WTF?" combinations are intentional; scientific realism must not override that intent. Blade + Wood represents adding a handle. Dust + Fire/Lightning is "fire dust," hence Gunpowder. Campfire + Air = Coal, Mushroom + Air = Flies, Seeds + Water in a glass = Vodka, and the surreal Unicorn chain were retained.

Accepted revisions from the early discussion:
- Algae + Water = Frog Eggs; replace Algae + Earth = Frog Eggs.
- Remove Snail, Escargot, and all recipes involving them.
- Wire + Glass = Light Bulb replaces Glass + Lightning.
- Light Bulb + Lightning = Lightened Light Bulb.
- Unicorn willingly gives Sacred Blood when fed Bread or Broth.
- Both Elixirs kill if drunk. Drinking must remain a player choice.

Dating note: these early messages precede the explicit November 15 context update. Their individual timestamps are not available; this section groups them under the initial November 11 conversation context.

## 2026-11-15 — counts, interaction, consequences, and visual design

### Item count and names
- 63 distinct items: four starting elements and 59 additional items, counting two separate Elixirs.
- Normalize Electricity and the typo Lighting to Lightning; Mushroom spelling and Campfire capitalization are consistent.
- Fire Dust explains Gunpowder, rather than adding another item.
- Empty Glass/Pot are the existing Glass/Pot, so drinking creates no additional collection entries.
- The two Elixirs are distinct internally; their exact distinct presentation remains to be settled. Do not expose their secret effects in player instructions.

### Inventory and mixing
- Shelf A: 28 slots, four columns by seven rows. Each slot has a successive moon phase, left to right, row by row.
- Shelf B: four infinite basic-element sources.
- Multiple copies occupy separate slots. Other ingredients are consumed by successful recipes.
- Large beaker accepts dragged ingredients. Adding the second combines immediately.
- Failed recipes silently fly back to original slots; no "Nothing happened" message.
- Reserve original ingredient slots while mixing so failed ingredients can return.
- A single ingredient may be moved back before the second is added.
- Every result stays in the beaker until manually stored or discarded. No new mixing until it is cleared, including when shelves are full.
- Trashcan accepts unwanted touchable items.
- Every identical-item pair consumes two copies and returns one; basic sources stay permanent.
- Mouse and finger dragging only; the user rejected tap-to-move.
- Drinking is available only with one drinkable item in the beaker.
- New discoveries briefly show their name above the beaker with a glow; collection book glows until opened. Exact animation remains subject to visual review.

### Run persistence
- Death and restart reset inventory, discoveries, known recipes, and player state.
- Session storage is the chosen plan: recover after refresh, normally restart after closing.
- Known limitation accepted for now: reopening tabs or browser session restore may restore session storage.

### Drinking outcomes
- Water: no effect; Shelf B Water source remains.
- Magma: death.
- A Glass of Water / A Pot of Water: liquid consumed; Glass / Pot remains in beaker.
- Potion and Vodka: distortion and hallucinations, then a five-second blackout, wake in basement with Glass in beaker.
- Love Potion: pink tint, hearts and Cupid with arrow, then blackout and word-by-word story. Player runs to crush's home, declares eternal love, is rejected, refuses to leave, police are called, player spends five days at station, effect wears off, returns to basement. Glass remains.
- Story cannot be skipped or instantly revealed; approximately 250 ms per word, adjustable after review. Final prose has not been approved.
- Blood: consumed; show "Congratulation, you are now an Vampire" (user's original wording); become vampire.
- Cursed Blood: basement explodes, then death; progress resets.
- Sacred Blood: kills vampires; otherwise no effect.
- Broth: no effect.
- Both Elixirs: death.
- Other consumed liquids disappear unless an empty container is explicitly specified.
- Drinkability/effects for Molotov Cocktail and frog-filled containers were not specified; do not invent effects.
- Death screen text is only "You died." with a smaller "try again?" button that restarts. No moral, explanation, or immortality promise.

### Vampire state
- Untouchable items: Fire, Lightning, Magma, Campfire, Molotov Cocktail.
- Cannot use, move, or discard these; stored ones occupy slots permanently for that run.
- Selected untouchable items are crossed out.
- Room becomes darker/dimmer with slight red tint.
- Love Potion leads to death because going outside in daylight kills a vampire.
- The user noted that creating a new restricted item requires a restricted ingredient, so it cannot be done after transformation. This was reviewed logically in discussion, not tested in code.
- Additional vampire mechanics remain open for later thought.

### Collection journal
- Closed book is portrait hardcover, approximately 2:3 width to height.
- Click to open/enlarge; first view is an alphabetical list of discovered names, not an illustrated grid.
- Initial four elements appear from the beginning.
- Entry spread: illustration left; short factual description with dark humor and successfully tried recipes right.
- Clicking a recipe ingredient opens its entry. A Back control was proposed to support navigation.
- Recipes accumulate only after successful attempts; no undiscovered recipe spoilers.
- No page numbers, total count, empty locked entries, or visible completion target.
- All 63 discoveries unlock hidden achievement GREAT ALCHEMIST.
- Discoveries survive consuming/discarding ingredients but reset on death/restart.
- Approved Sand description: "Small grains of rock and minerals, worn down by weathering. Given enough time, even mountains fall apart. You have considerably less time."

### Visual direction and opening
- Three generated sample directions: A moss-green basement, B parchment study, C cold blue-gray basement. User selected A.
- Worn dark wood, cracked moss-green walls, muted cream/rust accents, illustrated ink-outlined objects, quiet unsettling basement atmosphere.
- Large central beaker size approved; separate basic-element shelf, trashcan, and journal.
- Item names only on hover or selection.
- Phones rotate sideways to preserve whole room.
- Title: Alchemy 101.
- Title screen, black screen with brief introduction, then basement.
- Suggested introduction, not explicitly finalized: "Four elements. A basement. Find out what you can make."
- Remove the Elixir sign from sample basement. No stated final objective: players should not know when mixing ends.
- Generated journal mockup used Sand, with Stone + Air and Lichen + Stone recipe links, and portrait hardcover inset. These are concept images, not implemented UI.

### Current recipe specification (spoilers)

Slash alternatives expand into separate unordered recipes. Water/glass/pot item names are retained as agreed. Every same-item pair also returns that item.

| Ingredients | Result |
| --- | --- |
| Fire + Air | Lightning |
| Fire + Earth | Magma |
| Air + Earth | Dust |
| Air + Water | Cloud |
| Earth + Water | Clay |
| Cloud + Earth | Plant |
| Magma + Water / Air | Stone |
| Clay + Fire | Pot |
| Dust + Fire / Lightning | Gunpowder |
| Plant + Water | Algae |
| Algae + Water | Frog Eggs |
| Stone + Fire | Metal |
| Metal + Fire | Blade |
| Metal + Lightning | Wire |
| Gunpowder + Wire | Bomb |
| Blade / Knife + Plant | Wood |
| Blade + Wood | Knife |
| Blade + Lightning | Blender |
| Frog Eggs + Water | Frog |
| Frog + Lightning | Twitching Frog Legs |
| Wood + Fire | Campfire |
| Campfire + Air | Coal |
| Coal + Fire | Diamond |
| Air + Stone | Sand |
| Sand + Fire | Glass |
| Wire + Glass | Light Bulb |
| Light Bulb + Lightning | Lightened Light Bulb |
| Glass + Fire | Bottle |
| Bottle + Water | A Glass of Water |
| Pot + Water | A Pot of Water |
| A Pot of Water + Frog Eggs | A Pot of Frog |
| A Glass of Water + Frog Eggs | A Glass of Frog |
| Earth + Plant | Mushroom |
| Algae + Mushroom | Lichen |
| Lichen + Stone | Sand |
| Mushroom + A Glass of Water | Potion |
| A Glass of Water / A Pot of Water + Flower | Vase |
| Mushroom + Air | Flies |
| Flies + Plant | Flower |
| Frog / Shark + Knife / Blade | Blood |
| Potion + Blood | Curse |
| Flower + Potion | Love Potion |
| Blood + Water | Shark |
| Twitching Frog Legs / Frog + Fire | Cooked Meat |
| Cooked Meat + Water | Broth |
| Algae + Wood | Moss |
| Blood + Plant | Man Eating Plant |
| Curse + Shark | Six-headed Shark |
| Curse + Flies | Gu Poison |
| Flies + Flower | Seeds |
| Seeds + Earth | Plant |
| Seeds + Stone | Flour |
| Flour + Water | Dough |
| Dough + Fire | Bread |
| Seeds + A Glass of Water | Vodka |
| Vodka + Fire | Molotov Cocktail |
| Lightning + Plant / Wood | Fire |
| Man Eating Plant + Six-headed Shark | Unicorn |
| Unicorn + Blade / Knife | Cursed Blood |
| Unicorn + Bread / Broth | Sacred Blood |
| Sacred Blood + Love Potion | Elixir(?) — sacred recipe |
| Gu Poison + Cursed Blood | Elixir(?) — cursed recipe |

### Repository creation
- Created public GitHub repository https://github.com/JZtheRabbit-School/alchemy-101 using built-in browser.
- Initial main-branch commit contained README.md and project description.
- User explicitly chose public visibility after assistant initially suggested private.

### Documentation working agreement
- User requested README.md as instruction manual, AGENT.md as collaboration guidance, and JOURNAL.md covering the earlier conversation and future dated progress.
- When requests are unclear, help choose a type of help or ask clarification.
- Make small inspectable/testable changes; separate verification from assumptions.
- End each working session by asking what the user still cannot explain.
- Remind user about GitHub pushes whenever changes are made.
- User authorized creating these documents and pushing them to GitHub.
- Added AGENTS.md as a short entry point pointing to AGENT.md.
- Documentation reviewed against this conversation. Game behavior remains planned and untested.

