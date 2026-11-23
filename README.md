# Alchemy 101

An illustrated alchemy exploration game set in a mysterious basement.

**Status:** first local playable prototype. Artwork and animation are preliminary; no hosted version has been published.

## How to play

Begin with Fire, Water, Air, and Earth on Shelf B. These four sources are permanent.

Drag ingredients into the large beaker using a mouse or a finger. Two ingredients combine automatically. A successful combination consumes stored ingredients and leaves the result in the beaker. A failed combination sends ingredients back to their original shelf slots.

Keep a result in the beaker and drag in another ingredient to combine it immediately, or move it to Shelf A or the trashcan. If a combination with that result fails, the result stays in the beaker and the added ingredient returns to its source. Shelf A has 28 individual slots, arranged four across and seven down, marked with successive moon phases. Duplicate objects each occupy a slot. You can rearrange stored objects and return a single ingredient from the beaker before adding another.

Combining two identical items returns one copy. The permanent basic-element sources remain available.

## Discoveries

Open the hardcover journal to browse discovered items alphabetically. The four starting elements are listed from the beginning.

Select an entry to see its illustration, description, and recipes you have successfully tried. Ingredient names in recipes link to their own entries. Further successful recipes update an existing entry. Consuming or discarding an object does not erase its discovery.

The Catalog fills its first left page with up to 8 names, then uses 12 names per page. Turn catalog spreads with the bottom arrows. On an item entry, those arrows browse discovered entries alphabetically. The journal has no page numbers or completion counter.

## Drinking and restarting

When the beaker contains one drinkable item, a **Drink** option appears. Drinking is optional and may have consequences. When a contained drink is finished and you survive, its empty Glass Vessel or Pot stays in the beaker. Glass Pane is the flat material; Glass Vessel is the bottle.

Restarting or dying clears the run's inventory and discoveries. Refreshing recovers the current run using session storage. Closing the tab normally ends the run, although browser session restoration can sometimes recover it.

## Screens and controls

Item names appear on hover or selection. Phones use finger dragging and landscape orientation to preserve the room layout.

## Project documents

- [AGENTS.md](AGENTS.md): collaboration and learning preferences.
- [JOURNAL.md](JOURNAL.md): development history and full design decisions, including spoilers.




## Run locally

With Node.js installed, open this project folder in a terminal and run:

```sh
node server.mjs
```

Open http://127.0.0.1:4173 in your browser. Keep the server running while playing. No dependency installation is needed. Optional web fonts fall back to Georgia if unavailable.

Run the game-logic checks with:

```sh
node --test tests/game.test.mjs tests/expansion.test.mjs tests/chaining.test.mjs tests/journal.test.mjs tests/wine.test.mjs
```

## Prototype review

The local prototype includes mixing, inventory, the discovery journal, drinking sequences, vampire restrictions, and session recovery. The room, hardcover journal, and item illustrations now use textured ink-and-watercolor artwork matched to the approved visual references. Transparent interactive regions keep the painted furniture functional. Actual touchscreen dragging and the full timing/feel of every drinking sequence still need player review. A reduced-motion preference softens the animated distortion.

Changes in this prototype are intentionally local: do not commit, push, or deploy until the user asks.


Item descriptions have been revised. Soup preparation uses a filled pottery pot; existing sessions preserve discoveries when item names are updated.


Intoxication now makes the room waver, blur, and darken over roughly ten seconds before the blackout. Reduced-motion settings soften the movement.


Love Potion now builds a transparent pink haze with illustrated Cupids, arrow-pierced hearts, and independently drifting small hearts before its story begins.


## CodePen copy
A copy-ready package is available in codepen/ with HTML, CSS, JavaScript, and setup instructions. Regenerate it with node build-codepen.mjs after changing the prototype.


Poison and Curse can now be drunk when placed alone in the beaker. Drinking effects depend on the player's condition.


Some mixtures can produce several results that return directly to the permanent basic-element shelf. The beaker becomes available again after the return animation.

