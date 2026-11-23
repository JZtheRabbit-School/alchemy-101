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


### Agent filename correction
- User clarified that AGENT.md was a typo and intended AGENTS.md.
- Consolidated the complete working agreement into AGENTS.md, removed AGENT.md, and updated the README link.
- The earlier four-file documentation commit was verified on GitHub as 7feb674 before this correction.


## 2026-11-15 — first local playable prototype

### Authorization
- User requested building the prototype for inspection and adjustment.
- Explicitly prohibited GitHub commits/pushes for this phase. All prototype code and documentation changes remain local. No deployment, commits, or pushes were performed.

### Implementation
- Added buildless HTML/CSS/JavaScript game, Node static server, and Node built-in test suite. No package installation required.
- Separated recipe/inventory/player state (game.js), item art (art.js), descriptions, UI/effects (app.js), and styling.
- Added all 63 items and expanded slash-alternative recipes. Unordered mixing, same-item reduction, slot reservation, consumable materials, and persistent basic sources implemented.
- Added manual result storage/discard, duplicate slots, silent animated failure returns, mouse/finger pointer dragging, and landscape prompt for phones.
- Added title/intro screens; moss-green basement, 4x7 lunar shelf, large beaker, separate basic shelf, portrait hardcover and trashcan. No Elixir sign or objective.
- Added alphabetic name catalog, linked ingredient pages, known recipes only, history/back navigation, entry transition, illustrated entries, and draft factual/dark-humor descriptions. Sand uses the approved text.
- Added discovery feedback and hidden GREAT ALCHEMIST trigger.
- Added contextual drinking, empty Glass/Pot, visions/blackout, unskippable word-by-word Love Potion sequence, vampire changes/restrictions, explosion/death, and restart.
- Session storage restores inventory, recipes, player status, and a pending drinking sequence. Refreshing during a sequence replays that sequence rather than skipping its outcome.
- Added reduced-motion treatment for distortion; timing and blackout remain.

### Explicit prototype assumptions / review points
- Two separate Elixirs provisionally labeled Elixir(?) · I and Elixir(?) · II, with the same provisional illustration; final distinct appearance/names need review.
- Items without user-specified drinking behavior (Molotov Cocktail and frog containers) are not drinkable.
- Drafted new entry descriptions and Love Potion narrative for user review; these are not previously approved prose.
- Cupid, hallucinations, room details, item icons, and explosion are preliminary CSS/SVG representations. They are simpler than generated concept paintings. No sound added.
- Introduction uses the previously suggested brief copy with a Continue control.

### Verification
- Seven Node tests passed: 63-item count/reachability and unordered/conflict-free recipes; consumption/result blocking; failed exact-slot returns; full shelf/withdrawal; identical-item reduction; vampire restrictions and restricted-result recipe invariant; drinking/container/effect/death state changes.
- app.js syntax check passed. Local server returned HTTP 200 after restarting it outside the socket-restricted sandbox.
- Built-in browser verified title -> intro -> basement; dragged Fire + Earth -> Magma; stored Magma; moved it into beaker with Air -> Stone; stored/reused Stone; Stone + Water failed and returned Stone to original shelf slot.
- Browser verified discovered-name catalog, Stone entry showing only the tried Magma + Air recipe, and clickable Air ingredient opening its own entry.
- Refresh restored the stored Stone and current run. Drinking Magma displayed only You died. and try again?; try again? cleared the experiment.
- Inspected desktop (1280x720) and phone landscape (844x390) layouts; viewport restored afterward.
- Not verified on actual touchscreen hardware. Full browser playthrough, all drink animations, hidden achievement visual, and individual art fidelity still need player review; logic tests are not a substitute for those checks.
- npm command was unavailable, so tests run directly through node. The package scripts remain optional convenience commands.
- Preview left running at http://127.0.0.1:4173 for user inspection. Fresh empty inventory left after browser checks.

## 2026-11-15 — restore the approved illustrated art direction

- User pointed out that the first playable prototype had drifted from the two approved concept images. Requested restoring their art style.
- Replaced smooth CSS furniture surfaces and geometric item icons with generated, textured ink/stipple/watercolor artwork: cracked moss-green plaster, detailed dark wood, dried herbs, stained cloth, aged leather and parchment.
- Used the built-in image generation tool with both user-provided images as visual references. Added project-local assets/basement-illustrated.png, assets/journal-illustrated.png, and assets/items-illustrated.png. Prompt briefs and asset usage are in assets/ART.md.
- Added illustrated.css to position transparent live controls over the painted room. Re-aligned all 28 slots, four permanent element cards, beaker, journal, and trashcan. Maintained whole-room 16:9 proportions with letterboxing rather than stretching the artwork.
- Replaced item rendering with the 8x8 illustrated sprite atlas, also used on journal entries and drag ghosts. Original vector code remains only as a fallback for unknown items.
- Kept all established omissions: no Elixir sign, completion counter, or page numbers. Journal remains an alphabetical list, with illustrations left and description/known recipes right. Existing gameplay rules unchanged.
- Verification: all seven game-logic tests passed after the visual changes; art.js syntax check passed. Browser checked updated room/book, dragged Fire and Earth to create Magma, stored it in the first painted shelf slot, and opened its textured journal entry showing its tried recipe.
- Corrected an SVG overflow issue found during browser inspection so the atlas is clipped to the selected item.
- Saved room and journal screenshots for user review. Browser left on updated room with the verification Magma stored. The individual sprite drawings remain generated first-pass assets and have not all received close-up review.
- README and this journal updated locally. No GitHub commit, push, or deployment; user's hold remains in effect.

## 2026-11-15 — moon symbol correction

- User requested replacing the odd shelf moon shapes with the clean 28-symbol sequence in their second reference, in its reading order.
- Replaced the overlapping ellipse construction with a single illuminated hemisphere/terminator shape. Sequence begins full, darkens from the right through left half and left crescent to dark, then illuminates from the right back toward full.
- Applied the reference reading order left-to-right, top-to-bottom to the existing 4x7 shelf. Pale ivory and near-black preserve contrast against the wooden cubbies.
- Verified art.js syntax and visually inspected the reloaded local browser. Gameplay and current run were preserved. No commit or GitHub push.

## 2026-11-15 — illustration review sheets

- User requested an out-of-game view matching every item name to its current illustration, to identify desired changes.
- Created three numbered contact sheets (items 1–21, 22–42, 43–63) in the chat visualization folder, using the current atlas and the same crop as art.js. Names follow ITEMS in game.js.
- Inspected all three sheets. These are review artifacts only; no game art, rules, or inventory was changed. No GitHub commit or push.

## 2026-11-16 — container clarifications and revised illustration previews

### Confirmed design revisions (not yet implemented in game logic)
- Magma should flow as molten liquid rather than resemble a solid rock.
- Pot and every pot-based item use unglazed clay pottery, not metal cookware.
- Glass is renamed Glass Pane; Bottle is renamed Glass Vessel. The vessel shape follows the user's supplied right-hand vodka bottle, without a label. Vodka gets the same shape with a VODKA label.
- Drinking contained liquids leaves Glass Vessel/Pot if the player survives, rather than the flat pane.
- Frog containers contain actual frogs without water or eggs. The opaque pot conceals the frog. Either frog container + Stone yields Frog, consuming Stone and the container.
- Remove the branch from Lichen and all stalks/sticks from Moss. Vase is a plain vase holding flowers.
- Loose Blood, Cursed Blood and Sacred Blood are standalone liquid drops in red, purple and gold. Each has a glass-vessel and pottery-pot version: six added discoveries, proposed total 69. GREAT ALCHEMIST should use the revised total when implemented.
- Loose blood remains drinkable. Contained blood has its corresponding drink effect and leaves the empty container for surviving players; contained versions also satisfy recipes requiring that blood.
- Love Potion and Gu Poison supply the glass container for the two Elixirs.
- Container descriptions should use the user's blunt joke: A glass/pot of XXX. What were you expecting? You literally just poured XXX into a glass/pot.

### Generated review assets
- User explicitly requested revised illustrations and preview before implementation.
- Generated 28 revised item illustrations with the built-in image generator, using the existing atlas as a style reference and the supplied vodka drawing as a bottle-shape reference. Kept stippled ink and muted watercolor style.
- Saved non-destructively under assets/revisions-2026-11-16/: items-revised.png, prompt.txt (exact generation prompt), labels.json, all-labels.json, two changes sheets and three complete proposed collection sheets.
- Numbering preserves original 1–63 and appends blood-container discoveries as 64–69.
- The pot of frog has a small incised frog motif for identification; this is a proposed visual choice, not previously requested. Frog remains hidden inside.
- Inspected both revised sheets and all three proposed collection sheets. Adjusted preview crop framing to keep bottle caps intact and exclude neighboring cells.
- Preview assets only: active gameplay, current art mapping and 63-item game data are unchanged pending review. No commit, push or deployment.

## 2026-11-16 — Vine, Grape, Pulp, Wine and Jesus art

- User confirmed Plant + Sand = Vine; Vine + Water = Grape; Grape + Blender = Pulp; Pulp + A Glass of Water = Wine; Bread + Wine = Jesus; Jesus + Unicorn = Sacred Blood.
- Jesus + Unicorn replaces feeding Unicorn Bread/Broth. Five new discoveries bring the proposed collection from 69 to 74; Sacred Blood is an existing item.
- Generated five matching illustrated items with the built-in image tool. Wine uses the reference-shaped bottle with a small grape etching as a proposed distinguishing detail. Jesus is a full-body robed figure with a small halo.
- Saved transparent strip, labeled preview, exact prompt and recipe notes under assets/vine-chain-2026-11-16/.
- Reviewed generated strip for all five requested subjects. This is an art/design review only: no active webpage recipe/art changes, commit, push or deployment.

## 2026-11-16 — holy objects and raisin illustration review

- Confirmed six new items: Cross, Holy Water, A Glass of Holy Water, A Pot of Holy Water, Raisins, Raisins Bread. Proposed total becomes 80.
- Recipes and vampire clarifications are preserved in assets/holy-chain-2026-11-16/README.md, including pouring holy water into vessels, full usability of contained holy liquids, fatal holy drinks for vampires, and Unicorn remaining non-holy.
- Also confirmed Vine + Flies = Flower; Grape + Earth = Vine; Frog + Flies = Frog.
- Generated six matching stippled ink/watercolor illustrations with the built-in image generator; exact prompt, source atlas and numbered recipe preview saved under assets/holy-chain-2026-11-16/.
- Used small halo/glint/cross details to visually distinguish holy liquid variants; these are proposed art details for review.
- Inspected generated artwork and labeled preview. Active prototype and gameplay remain unchanged. No commit, push or deployment.

## 2026-11-16 — integrate all approved art and expand playable game to 80 items

### Implemented locally
- Integrated the 28 revised sprites, five Vine-chain sprites, and six holy/raisin sprites into the live game with stable name-to-sprite coordinates. Artwork no longer depends on item-array order. Added build-art-map.mjs and generated art-map.js.
- Glass Pane and Glass Vessel are now the real game names; legacy saved inventory, mixing contents, discoveries and recipe keys migrate on refresh. Removed the obsolete Unicorn feeding recipe from migrated history.
- Added six blood containers and three Holy Water forms, liquid filling, all vine/grape/pulp/wine/Jesus/cross/raisin recipes, frog-container breaking and Frog eating Flies. Replaced Unicorn + Bread/Broth with Jesus + Unicorn for Sacred Blood.
- All contained blood forms substitute in blood recipes. The journal records only the actual tried ingredients. Both inputs are consumed and one result remains in the beaker, including frog rescue and feeding recipes.
- Drinking uses contents and vessel separately. Containers remain for surviving drinks; Blood alone or contained causes vampirism; Cursed Blood variants explode; Sacred Blood/Holy Water kill vampires; ordinary players survive Holy Water. Potion, Love Potion and Vodka return Glass Vessel; Broth returns Pot. No Wine drinking effect was specified, so Wine is mixable but has no Drink option for now.
- Expanded vampire restrictions to Jesus, Cross, loose Holy Water and loose Sacred Blood, alongside the existing hot items. Contained holy liquids, Elixirs and Unicorn remain touchable. Restored the subtle red overlay above the painted basement.
- Added factual/dark-humor descriptions for new items and the requested blunt container descriptions. Existing Elixir generic descriptions remain. Hidden GREAT ALCHEMIST now requires all 80 discoveries; no visible total or objective added.

### Verification
- Fifteen Node tests passed: all 80 items reachable; unordered recipes have no conflicting outputs; inventory/result blocking; slot returns; identical-item reduction; containers and substitute blood recipes; frog rescue/eating consumption; holy vampire touch/drink rules; empty vessels after effects; complete artwork/description coverage; and legacy save migration.
- Checked app.js syntax. Verified actual source image dimensions before generating atlas coordinates.
- Browser checked all new illustration families in a separate development fixture tab. Found and fixed neighboring sprite leakage for tall/rectangular source crops using explicit SVG clipping.
- Browser dragged Holy Water + Glass Vessel into a contained result, then verified ordinary-player drinking leaves Glass Vessel. Vampire fixture verified Cross stays stuck/crossed out, contained holy liquid can enter beaker, and drinking it displays You died. and try again?.
- Browser inspected the expanded alphabetical catalog and Wine entry with its new art, description and tried Pulp + A Glass of Water recipe.
- Fixture states were isolated to a separate tab and closed after checks. Reloaded the user's original game tab and preserved their Stone/inventory and discoveries. No artificial discoveries were added to their run.
- Local README instructions updated. Real touchscreen hardware, complete visual review of every item, and a full manual 80-item playthrough remain unverified.
- No GitHub commit, push or deployment. User's local-review hold remains active.

## 2026-11-16 — allow immediate beaker chaining

- User revised the earlier mandatory store/discard rule: newly created results must be usable as the first ingredient of the next recipe immediately, without a shelf round trip.
- Removed result blocking in addIngredient while preserving death, effect, capacity and vampire touch restrictions.
- Failed chaining keeps the previous result in the beaker and sends only the added ingredient back to its original shelf slot or basic source. Ordinary failures between two newly added ingredients still return both. Return animation preserves the retained result; failure state is saved immediately.
- Updated instruction text and README to describe chaining. Empty containers left by drinking can also be reused directly.
- Added regression checks for Clay -> Pot chaining, full shelves, save recovery, stored ingredient consumption, recipe records, and both kinds of failed-chain returns. All 19 tests passed; app.js syntax passed.
- Browser verified Water + Earth -> Clay, failed Clay + Air retaining Clay, then Fire added directly -> Pot, with no shelf transfers. Separate QA tab was closed, original game tab reloaded without altering its run.
- This supersedes earlier journal statements requiring results to be cleared before further mixing. No commit, push or deployment.

## 2026-11-16 — catalog pagination and alphabetical page flipping

- User requested one Catalog title on the first left page, no Discoveries/Observations subtitles, first page holding 10 items, then 12 items on every following page. Small collections now stay entirely on the left until the first page fills.
- Added bottom previous/next controls: catalog mode turns two-page spreads; item mode visits discovered entries in alphabetical order. Controls disable at the first/last boundary and do not wrap. No visible page numbers or totals.
- Catalog tab/back navigation preserve the catalog spread from which the item was opened. New book opening starts at the first spread. Entry links and back history remain functional.
- Added pure journal.js pagination/navigation helpers and three regression tests for small catalogs, all 80 items across [10,12,12,12,12,12,10] pages without gaps, and alphabetical neighbors.
- All 22 tests passed; app.js syntax check passed.
- Browser verified the user's five discoveries appear left-only with right blank; Air -> Earth -> Fire via Next. In an isolated full-collection fixture, verified first spread has 10 left/12 right and next spread has 12 on each page with sequential contents. Test tab closed; user's Catalog left open and run preserved.
- Updated local README and JOURNAL. No GitHub commit, push or deployment.

## 2026-11-16 — reduce first catalog page to eight

- User requested 8 entries on the first left Catalog page instead of 10. All following pages remain at 12.
- Updated pagination, first-page row spacing, README and pagination regression expectations. Supersedes the preceding ten-item first-page decision.
- Ran journal pagination tests successfully. No GitHub commit or push.

## 2026-11-16 — inset catalog labels
- User requested moving catalog words/buttons away from the outer paper edge. Added a responsive left inset to both pages' catalog lists and a small button-text inset. Pagination and entry pages are unchanged. No commit or push.


## 2026-11-16 — end-of-session GitHub backup

- User ended the session and explicitly authorized pushing the current version to GitHub, superseding the earlier hold for this snapshot.
- Initialized the existing local project as a Git checkout, fetched origin/main, and based the local branch on the remote documentation history without replacing working files.
- Prepared the complete playable 80-item prototype, illustrated assets and review sheets, recipe/drinking/vampire updates, immediate beaker chaining, eight-item-first-page catalog, alphabetical page controls, spacing correction, tests and documentation for one source commit.
- All 22 Node tests passed before commit. This is a source backup to GitHub, not a public website deployment.
- Remaining discussion: Wine's drinking behavior has not been specified, so Wine is not drinkable. Real touchscreen testing, a full manual 80-item playthrough, and final prose/animation timing review remain future work.
- Ask at session close what the user still cannot explain about the game or changes. No further design answer is required to save this snapshot.

## 2026-11-19 — purification, Wine intoxication and drag visuals

- Added Cursed Blood + Jesus = Sacred Blood, including contained Cursed Blood substitutions through existing rules.
- Wine now uses the same visions/intoxication and five-second blackout sequence as Potion/Vodka, returning Glass Vessel afterward for both ordinary players and vampires.
- Hid item selection ellipses and beaker/trash drop-target backgrounds/shadows; preserved shelf highlighting and forbidden-item cross marks.
- Added a lifted illustrated-style trash lid and dark opening driven by the existing drag-over class. Leaving, dropping, or canceling clears that class and closes the lid. Reduced-motion preference removes transition.
- All existing 22 tests plus two new recipe/Wine tests passed. Inspected open-lid visual fixture in browser and refreshed original prototype without altering inventory. Actual finger hover/movement remains untested on hardware.
- README test command updated. No commit or GitHub push.

## 2026-11-19 — animate the original painted trash lid

- User liked the lid animation but requested the original illustrated lid instead of the newly drawn replacement.
- Replaced the drawn SVG lid with a clipped view of the original basement image, including its painted handle and metal texture. Reused the existing lift/rotation animation and hit area; no new illustration generated and no gameplay changes.
- No GitHub commit or push.

## 2026-11-19 — smaller book, raised shelf and lid alignment

- User requested a smaller closed book with its supporting shelf higher, and translating both the animated lid and dark opening upward.
- Edited the background through the built-in image tool, saved non-destructively as assets/basement-illustrated-v2.png, with exact prompt in assets/basement-v2-prompt.txt. Updated background references and reduced/repositioned the live book hit area to match the returned artwork.
- Moved both lid and opening upward by five percent of the trash target height. Retained original painted lid source and animation.
- Inspected the open-lid visual fixture in browser; verified added shelf clearance and new overlay position. Refreshed the original game tab, preserving inventory. No gameplay code changed, no commit or push.

## 2026-11-19 — five-percent visual refinement

- User requested shrinking the dark trash opening by 5% and enlarging the closed book by about 5%, moving its shelf accordingly.
- Dark ellipse width/height now 95% of previous dimensions, centered at its prior position. Lid dimensions and animation unchanged.
- Generated a localized book/shelf revision using the built-in image tool; saved assets/basement-illustrated-v3.png and exact prompt assets/basement-v3-prompt.txt. Only the book/shelf region is overlaid, keeping the remainder of the v2 room artwork. Book hit area enlarged 5% in width and height.
- Inspected updated open-lid visual fixture and refreshed the user's original tab without changing the run. No gameplay changes, commit or push.

## 2026-11-19 — apply approved comparison B

- User selected the additional 10%-smaller dark trash opening and slightly lowered book/shelf preview.
- Reduced current ellipse width and height by another 10%, preserving its center. Lowered book and shelf by approximately 2% of room height with a localized background patch, retaining the original rest-of-room artwork and original animated lid. Book hit area follows the lower position.
- Edited artwork through built-in image generation; saved assets/basement-illustrated-v4.png. No gameplay changes, commit or push.

## 2026-11-19 — center the closed-book title
- Moved Discoveries slightly right to center it on the painted front cover rather than the cover plus spine. Book size and shelf position are unchanged. Local visual adjustment; no commit or push.


## 2026-11-19 — normalize expansion illustration sizes
- Checked all eleven grape and holy-chain additions against original illustrations. Replaced oversized empty framing for Vine, Grape, Pulp, Wine, and Jesus with individual artwork bounds; tightened Raisins as well. Other holy-chain illustrations already filled their frames consistently.
- Regenerated art-map.js. Shared artwork rendering applies this correction to shelf, beaker, dragged items, and journal. Added tests/art-size-visual.html for repeatable side-by-side visual inspection; verified all eleven additions render without clipped artwork. No gameplay changes, commit, or push.


## 2026-11-20 — approved descriptions, Mold, and Poison
- Applied the approved description drafts, with the final Fire and Poison wording. Grape uses the English tongue-twister draft. Other descriptions unchanged; frog descriptions override the generic container text.
- Renamed Gu Poison to Poison, retaining Curse + Flies and adding Mold + Curse. Added Bread/Grape + Mushroom = Mold. Broth now requires Cooked Meat + A Pot of Water. Both Elixirs display Elixir(?) while keeping separate internal IDs.
- Saved poison inventory/history migrates to the new name. Collection now has 81 entries. Mold uses a simple green branching-fungus vector illustration for the prototype; dedicated painted art remains open for review.
- Updated automated checks and added regression coverage for these recipes, display names, and migration. No commit or push.


## 2026-11-20 — explosive mixing ending
- Fire or Campfire mixed with Gunpowder or Bomb triggers the existing explosion animation, then the standard You died screen and try again? restart. Applies in both ingredient orders and to freshly created results in the beaker.
- Fatal combinations produce no collectible item or recipe. Input is blocked during the effect; refresh recovery finishes the explosion. Death clears inventory and discoveries. Crafting Gunpowder itself remains safe.
- Added regression coverage for all pairs, orders, chaining, effect recovery, and reset. No commit or push.


## 2026-11-20 — escalating room distortion
- Replaced Potion/Vodka/Wine floating-symbol hallucinations with distortion of the actual room, following the supplied warped-world reference. Ten seconds of gradually accelerating ripples and sway, increasing blur, and progressive darkening lead into the existing five-second blackout.
- Love Potion retains its hearts/Cupid/story sequence. Reduced-motion preference keeps the timed blur/darkening without spatial warping. Distortion filters clean up on completion or cancellation.
- Syntax check and all 29 logic checks pass. Browser inspection confirmed early and later distorted frames. No commit or push.


## 2026-11-20 — keep empty vessel visible during intoxication
- Potion, Vodka, and Wine now leave their empty Glass Vessel in the beaker immediately upon drinking, so it distorts with the room instead of disappearing until wake-up. Love Potion also leaves its container immediately.
- Restoring an older saved vision effect with an empty beaker inserts its empty vessel before animation. Added regression coverage for immediate visibility, save recovery, and a single vessel after waking. No commit or push.


## 2026-11-20 — Love Potion letter-by-letter narration
- Changed both Love Potion story variants from words at 250 ms intervals to individual characters at 45 ms intervals. Full text remains unskippable; the final pause and outcomes are unchanged. No commit or push.


## 2026-11-20 — session close and GitHub backup
- User requested committing and pushing all current prototype changes, including the previously local November 19 refinements. Final verification: all 30 automated checks pass and app.js syntax check passes. Letter-by-letter narration has syntax verification; its final pacing still needs player review.
- Includes revised room/book/trash artwork and interaction regions, normalized expansion artwork sizes, Wine intoxication and purification recipe, approved descriptions/Mold/Poison updates, explosive ending, ten-second room distortion with visible empty vessel, and letter-by-letter Love Potion narration.


## 2026-11-21 — Love Potion visual preview
- Added a separate visual-only preview page showing the existing pink tint, floating hearts, and Cupid continuously for inspection. Verified in the built-in browser. Gameplay and saved run are untouched. Preview file remains local; no commit or push.


## 2026-11-21 — illustrated Love Potion preview
- User approved trying the standalone generated pink Cupid/hearts/arrow concept in the separate effect preview. Saved the concept artwork locally and replaced the aligned symbol animation with gently drifting artwork, a soft offset echo, haze, and a vignette over the basement.
- Preview loops continuously for visual review; reduced-motion disables drift. Main gameplay effect remains unchanged pending feedback. Local changes only; no commit or push.


## 2026-11-21 — illustrated Love Potion preview
- User requested trying the approved concept in the separate preview, with consistent Cupid/heart/arrow art and transparent space revealing the basement.
- Generated a true transparent watercolor/engraving overlay with organically scattered hearts and arrow-pierced hearts, two Cupids, soft pink tint and gentle drift. Only the preview was updated; main gameplay effect remains unchanged. Local files only; no commit or push.


## 2026-11-21 — lighter staged Love Potion preview
- Lightened the illustrated artwork to pastel pink. Pink tint builds over six seconds; individual graphics begin emerging after two seconds with staggered fades and independent drifting paths, varied speeds and directions. Added Replay to inspect the entrance again.
- Changes remain confined to the separate preview; main game and saved run untouched. No commit or push.


## 2026-11-21 — repair preview heart crops and add small hearts
- Refined independent clip boundaries to exclude neighboring heart fragments from the lower-left arrow-heart and Cupid regions. Added sixteen small watercolor hearts at scattered positions with varied sizes, fade timing and independent drift. Preview only; no commit or push.


## 2026-11-21 — integrate and publish approved Love Potion visuals
- Integrated approved pastel Cupid, heart and arrow graphics, gradual pink tint, staggered emergence and independent drift into actual Love Potion drinking. Shared love-effect.js and love-effect.css keep review preview and gameplay identical.
- Visual stage lasts 12 seconds so the six-second tint and staggered fades have time to appear, followed by existing blackout, unskippable letter-by-letter story and original outcomes. Empty vessel remains visible beneath transparent artwork.
- Verified actual drinking in a separate browser fixture, observed illustrated stage and transition to narration, refreshed user's prototype without altering its inventory. All 30 automated checks and both JavaScript syntax checks pass. User authorized GitHub push.


## 2026-11-22 — CodePen-ready package
- User requested copy/import-ready files. Added build-codepen.mjs to flatten all game modules and styles into codepen/HTML.html, CSS.css, and JavaScript.js, plus a full index.html and instructions. Artwork URLs use jsDelivr pinned to the existing public GitHub commit; original game source remains unchanged.
- Added alchemy-101-codepen.zip for easy transfer. Checked generated JavaScript syntax, loaded packaged page in built-in browser, verified external artwork and Water + Earth = Clay. No signed-in CodePen import or Pen creation performed. Files remain local, not committed or pushed.


## 2026-11-22 — format CodePen files for reading
- Formatted both CodePen HTML files, combined CSS, and combined JavaScript using Prettier 3.6.2 with two-space indentation and consistent line breaks. No gameplay changes. Verified formatter stability and JavaScript syntax; refreshed ZIP with formatted copies. No commit or push.


## 2026-11-22 — proportional cover title in embedded previews
- User reported oversized Discoveries label in CodePen. Earlier text used viewport units and height breakpoints independent of the painted book dimensions. Made the closed book an inline-size container and sized its title at 12cqw, with a room-proportional fallback. Applied to original stylesheet and formatted CodePen CSS; no gameplay change.
- Local fix only; no commit or push.


## 2026-11-23 — drinkable Poison and Curse
- Added Poison and Curse to drinkable items. Curse immediately kills both ordinary players and vampires. Poison immediately kills ordinary players; vampires experience the same 10-second distortion and five-second blackout as Potion, survive and remain vampires.
- Poison uses its existing glass bottle, leaving an empty Glass Vessel immediately and after recovery. Added checks for immediate death/reset and vampire survival, hallucinations, input blocking, and container return. All 32 checks pass.
- Regenerated and formatted CodePen copies and updated ZIP. No commit or push.


## 2026-11-23 — GitHub backup of CodePen package and drinking updates
- User authorized pushing current work. CodePen drinking-rule changes require replacing JavaScript.js only; CSS.css also contains the earlier proportional cover-title fix. HTML.html and index.html were regenerated/formatted without a gameplay markup change.
- Final verification: all 32 automated checks pass; formatted CodePen JavaScript syntax passes. Includes packaging script, formatted files, ZIP, documentation, book-title fix, and Poison/Curse drinking rules.

