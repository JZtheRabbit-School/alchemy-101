# Alchemy 101

An illustrated alchemy exploration game set in a mysterious basement.

**Status:** design and documentation stage. The game has not been implemented yet. The instructions below describe the agreed planned behavior.

## How to play

Begin with Fire, Water, Air, and Earth on Shelf B. These four sources are permanent.

Drag ingredients into the large beaker using a mouse or a finger. Two ingredients combine automatically. A successful combination consumes stored ingredients and leaves the result in the beaker. A failed combination sends ingredients back to their original shelf slots.

Drag each result into an empty slot on Shelf A, or into the trashcan, before mixing again. Shelf A has 28 individual slots, arranged four across and seven down, marked with successive moon phases. Duplicate objects each occupy a slot. You can rearrange stored objects and return a single ingredient from the beaker before adding another.

Combining two identical items returns one copy. The permanent basic-element sources remain available.

## Discoveries

Open the hardcover journal to browse discovered items alphabetically. The four starting elements are listed from the beginning.

Select an entry to see its illustration, description, and recipes you have successfully tried. Ingredient names in recipes link to their own entries. Further successful recipes update an existing entry. Consuming or discarding an object does not erase its discovery.

The journal has no page numbers or completion counter.

## Drinking and restarting

When the beaker contains one drinkable item, a **Drink** option appears. Drinking is optional and may have consequences.

Restarting or dying clears the run's inventory and discoveries. Refreshing recovers the current run using session storage. Closing the tab normally ends the run, although browser session restoration can sometimes recover it.

## Screens and controls

Item names appear on hover or selection. Phones use finger dragging and landscape orientation to preserve the room layout.

## Project documents

- [AGENTS.md](AGENTS.md): collaboration and learning preferences.
- [JOURNAL.md](JOURNAL.md): development history and full design decisions, including spoilers.


