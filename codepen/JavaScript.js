// Alchemy 101 — CodePen JavaScript panel. No preprocessor needed.
(function () {
  function startAlchemy() {
    // ===== game.js =====
    const BASES = ["Fire", "Water", "Air", "Earth"];
    const HOT = new Set(["Fire", "Lightning", "Magma", "Campfire", "Molotov Cocktail"]);
    const HOLY = new Set(["Sacred Blood", "Jesus", "Cross", "Holy Water"]);
    const ELIXIRS = ["Elixir(?) · I", "Elixir(?) · II"];
    const rows = [
      ["Fire", "Air", "Lightning"],
      ["Fire", "Earth", "Magma"],
      ["Air", "Earth", "Dust"],
      ["Air", "Water", "Cloud"],
      ["Earth", "Water", "Clay"],
      ["Cloud", "Earth", "Plant"],
      ["Magma", "Water/Air", "Stone"],
      ["Clay", "Fire", "Pot"],
      ["Dust", "Fire/Lightning", "Gunpowder"],
      ["Plant", "Water", "Algae"],
      ["Algae", "Water", "Frog Eggs"],
      ["Stone", "Fire", "Metal"],
      ["Metal", "Fire", "Blade"],
      ["Metal", "Lightning", "Wire"],
      ["Gunpowder", "Wire", "Bomb"],
      ["Blade/Knife", "Plant", "Wood"],
      ["Blade", "Wood", "Knife"],
      ["Blade", "Lightning", "Blender"],
      ["Frog Eggs", "Water", "Frog"],
      ["Frog", "Lightning", "Twitching Frog Legs"],
      ["Wood", "Fire", "Campfire"],
      ["Campfire", "Air", "Coal"],
      ["Coal", "Fire", "Diamond"],
      ["Air", "Stone", "Sand"],
      ["Sand", "Fire", "Glass"],
      ["Wire", "Glass", "Light Bulb"],
      ["Light Bulb", "Lightning", "Lightened Light Bulb"],
      ["Glass", "Fire", "Bottle"],
      ["Bottle", "Water", "A Glass of Water"],
      ["Pot", "Water", "A Pot of Water"],
      ["A Pot of Water", "Frog Eggs", "A Pot of Frog"],
      ["A Glass of Water", "Frog Eggs", "A Glass of Frog"],
      ["Earth", "Plant", "Mushroom"],
      ["Algae", "Mushroom", "Lichen"],
      ["Lichen", "Stone", "Sand"],
      ["Mushroom", "A Glass of Water", "Potion"],
      ["A Glass of Water/A Pot of Water", "Flower", "Vase"],
      ["Mushroom", "Air", "Flies"],
      ["Flies", "Plant", "Flower"],
      ["Frog/Shark", "Knife/Blade", "Blood"],
      ["Potion", "Blood", "Curse"],
      ["Flower", "Potion", "Love Potion"],
      ["Blood", "Water", "Shark"],
      ["Twitching Frog Legs/Frog", "Fire", "Cooked Meat"],
      ["Cooked Meat", "A Pot of Water", "Broth"],
      ["Algae", "Wood", "Moss"],
      ["Blood", "Plant", "Man Eating Plant"],
      ["Curse", "Shark", "Six-headed Shark"],
      ["Curse", "Flies", "Poison"],
      ["Flies", "Flower", "Seeds"],
      ["Seeds", "Earth", "Plant"],
      ["Seeds", "Stone", "Flour"],
      ["Flour", "Water", "Dough"],
      ["Dough", "Fire", "Bread"],
      ["Seeds", "A Glass of Water", "Vodka"],
      ["Vodka", "Fire", "Molotov Cocktail"],
      ["Lightning", "Plant/Wood", "Fire"],
      ["Man Eating Plant", "Six-headed Shark", "Unicorn"],
      ["Unicorn", "Blade/Knife", "Cursed Blood"],
      ["Unicorn", "Bread/Broth", "Sacred Blood"],
      ["Sacred Blood", "Love Potion", ELIXIRS[0]],
      ["Poison", "Cursed Blood", ELIXIRS[1]],
    ];
    // Rename materials without creating extra discoveries.
    for (const row of rows)
      for (let i = 0; i < 3; i++)
        row[i] = row[i]
          .split("/")
          .map((x) =>
            x === "Glass" ? "Glass Pane" : x === "Bottle" ? "Glass Vessel" : x,
          )
          .join("/");
    rows.splice(
      rows.findIndex((r) => r[0] === "Unicorn" && r[1] === "Bread/Broth"),
      1,
    );
    rows.push(
      ["Bread", "Mushroom", "Mold"],
      ["Grape", "Mushroom", "Mold"],
      ["Mold", "Curse", "Poison"],
      ["Cursed Blood", "Jesus", "Sacred Blood"],
      ["A Pot of Frog/A Glass of Frog", "Stone", "Frog"],
      ["Plant", "Sand", "Vine"],
      ["Vine", "Water", "Grape"],
      ["Grape", "Blender", "Pulp"],
      ["Pulp", "A Glass of Water", "Wine"],
      ["Bread", "Wine", "Jesus"],
      ["Jesus", "Unicorn", "Sacred Blood"],
      ["Jesus", "Wood", "Cross"],
      ["Jesus", "Water", "Holy Water"],
      ["Jesus", "A Glass of Water", "A Glass of Holy Water"],
      ["Jesus", "A Pot of Water", "A Pot of Holy Water"],
      ["Vine", "Flies", "Flower"],
      ["Grape", "Earth", "Vine"],
      ["Frog", "Flies", "Frog"],
      ["Grape", "Fire", "Raisins"],
      ["Bread", "Raisins", "Raisins Bread"],
    );
    const CONTAINED = {};
    for (const liquid of ["Blood", "Cursed Blood", "Sacred Blood", "Holy Water"])
      for (const [prefix, vessel] of [
        ["A Glass of ", "Glass Vessel"],
        ["A Pot of ", "Pot"],
      ]) {
        const name = prefix + liquid;
        CONTAINED[name] = { liquid, vessel };
        rows.push([liquid, vessel, name]);
      }
    const key = (a, b) => [a, b].sort().join("|");
    const RECIPES = [];
    for (const [aa, bb, out] of rows)
      for (const a of aa.split("/"))
        for (const b of bb.split("/")) RECIPES.push({ a, b, out, id: key(a, b) });
    // A container of blood can substitute for its loose drop. Record the actual tried pair.
    for (const recipe of [...RECIPES])
      for (const [name, { liquid }] of Object.entries(CONTAINED)) {
        if (liquid === "Holy Water") continue;
        if (recipe.a === liquid && !["Glass Vessel", "Pot"].includes(recipe.b))
          RECIPES.push({
            a: name,
            b: recipe.b,
            out: recipe.out,
            id: key(name, recipe.b),
          });
        if (recipe.b === liquid && !["Glass Vessel", "Pot"].includes(recipe.a))
          RECIPES.push({
            a: recipe.a,
            b: name,
            out: recipe.out,
            id: key(recipe.a, name),
          });
      }
    const ITEMS = [...new Set([...BASES, ...RECIPES.flatMap((r) => [r.a, r.b, r.out])])];
    const lookup = new Map(RECIPES.map((r) => [r.id, r.out]));
    function combine(a, b) {
      return a === b ? a : lookup.get(key(a, b)) || null;
    }
    function fresh() {
      return {
        version: 2,
        slots: Array(28).fill(null),
        mix: [],
        result: false,
        discovered: [...BASES],
        known: [],
        vampire: false,
        dead: false,
        started: false,
        effect: null,
        achievement: false,
      };
    }
    function migrate(saved) {
      if (!saved || ![1, 2].includes(saved.version)) return fresh();
      const rename = (x) =>
        x === "Glass" ? "Glass Pane" : x === "Bottle" ? "Glass Vessel" : x;
      const s = structuredClone(saved);
      const poisonName = (x) => (x === "Gu Poison" ? "Poison" : x);
      s.slots = s.slots.map((x) => x && poisonName(x));
      s.mix = s.mix.map((m) => ({ ...m, item: poisonName(m.item) }));
      s.discovered = [...new Set(s.discovered.map(poisonName))];
      s.known = s.known.map((id) => id.split("|").map(poisonName).sort().join("|"));
      if (s.discovered.length < ITEMS.length) s.achievement = false;
      if (s.version === 1) {
        s.slots = s.slots.map((x) => x && rename(x));
        s.mix = s.mix.map((m) => ({ ...m, item: rename(m.item) }));
        s.discovered = [...new Set(s.discovered.map(rename))];
        s.known = s.known
          .map((id) => id.split("|").map(rename).sort().join("|"))
          .filter(
            (id) =>
              RECIPES.some((r) => r.id === id) || id.split("|")[0] === id.split("|")[1],
          );
        s.achievement = false;
        s.version = 2;
      }
      if (
        s.slots?.length !== 28 ||
        s.slots.some((x) => x !== null && !ITEMS.includes(x)) ||
        s.mix.length > 1 ||
        s.mix.some((m) => !ITEMS.includes(m.item)) ||
        s.discovered.some((x) => !ITEMS.includes(x))
      )
        return fresh();
      return s;
    }
    const canTouch = (s, item) => !s.vampire || (!HOT.has(item) && !HOLY.has(item));
    const reserved = (s, index) => s.mix.some((m) => m.origin === index);
    function discover(s, item, a, b) {
      const isNew = !s.discovered.includes(item);
      if (isNew) s.discovered.push(item);
      if (a && b) {
        const id = key(a, b);
        if (!s.known.includes(id)) s.known.push(id);
      }
      return isNew;
    }
    function addIngredient(s, item, origin = null) {
      if (
        s.dead ||
        s.effect ||
        s.mix.length >= 2 ||
        !canTouch(s, item) ||
        s.mix.some((m) => !canTouch(s, m.item))
      )
        return { type: "blocked" };
      if (origin === null) {
        if (!BASES.includes(item)) return { type: "blocked" };
      } else if (s.slots[origin] !== item || reserved(s, origin))
        return { type: "blocked" };
      if (origin !== null) s.slots[origin] = null;
      const hadResult = s.result;
      s.mix.push({ item, origin });
      if (s.mix.length === 1) return { type: "added" };
      const [a, b] = s.mix;
      if (
        [a.item, b.item].some((x) => ["Fire", "Campfire"].includes(x)) &&
        [a.item, b.item].some((x) => ["Gunpowder", "Bomb"].includes(x))
      ) {
        s.mix = [];
        s.result = false;
        s.effect = { type: "explosion" };
        return { type: "explosion" };
      }
      const out = combine(a.item, b.item);
      if (!out) {
        const returning = hadResult ? [b] : [a, b];
        for (const m of returning) if (m.origin !== null) s.slots[m.origin] = m.item;
        s.mix = hadResult ? [a] : [];
        s.result = hadResult;
        return { type: "failed", returning };
      }
      const isNew = discover(s, out, a.item, b.item);
      s.mix = [{ item: out, origin: null }];
      s.result = true;
      return { type: "created", item: out, isNew };
    }
    function moveSlot(s, from, to) {
      if (
        s.effect ||
        s.dead ||
        !s.slots[from] ||
        !canTouch(s, s.slots[from]) ||
        s.slots[to] ||
        reserved(s, to)
      )
        return false;
      s.slots[to] = s.slots[from];
      s.slots[from] = null;
      return true;
    }
    function storeMix(s, to) {
      if (
        s.dead ||
        s.effect ||
        s.mix.length !== 1 ||
        s.slots[to] ||
        (reserved(s, to) && s.mix[0].origin !== to) ||
        !canTouch(s, s.mix[0].item)
      )
        return false;
      s.slots[to] = s.mix[0].item;
      s.mix = [];
      s.result = false;
      return true;
    }
    function discard(s, source) {
      if (s.dead || s.effect) return false;
      if (source === "mix") {
        if (s.mix.length !== 1 || !canTouch(s, s.mix[0].item)) return false;
        s.mix = [];
        s.result = false;
        return true;
      }
      if (!s.slots[source] || !canTouch(s, s.slots[source])) return false;
      s.slots[source] = null;
      return true;
    }
    const DRINKS = new Set([
      "Water",
      "Magma",
      "A Glass of Water",
      "A Pot of Water",
      "Potion",
      "Love Potion",
      "Blood",
      "Cursed Blood",
      "Sacred Blood",
      "Holy Water",
      "Broth",
      "Vodka",
      "Wine",
      "Poison",
      "Curse",
      ...ELIXIRS,
      ...Object.keys(CONTAINED),
    ]);
    const VESSELS = {
      "A Glass of Water": "Glass Vessel",
      "A Pot of Water": "Pot",
      Potion: "Glass Vessel",
      "Love Potion": "Glass Vessel",
      Vodka: "Glass Vessel",
      Wine: "Glass Vessel",
      Broth: "Pot",
      Poison: "Glass Vessel",
      Curse: "Glass Vessel",
    };
    function kill(s) {
      const started = s.started;
      Object.assign(s, fresh(), { dead: true, started });
    }
    function drink(s) {
      if (s.dead || s.effect || s.mix.length !== 1 || !DRINKS.has(s.mix[0].item))
        return null;
      const item = s.mix[0].item,
        liquid = CONTAINED[item]?.liquid || item,
        empty = CONTAINED[item]?.vessel || VESSELS[item];
      s.mix = [];
      s.result = false;
      if (
        liquid === "Curse" ||
        (liquid === "Poison" && !s.vampire) ||
        ["Magma", "Cursed Blood", ...ELIXIRS].includes(liquid) ||
        (["Sacred Blood", "Holy Water"].includes(liquid) && s.vampire)
      ) {
        if (liquid === "Cursed Blood") {
          s.effect = { type: "explosion" };
          return "explosion";
        }
        kill(s);
        return "death";
      }
      if (["Potion", "Vodka", "Wine", "Love Potion", "Poison"].includes(liquid)) {
        s.mix = [{ item: empty, origin: null }];
        s.result = true;
        discover(s, empty);
        s.effect = {
          type: liquid === "Love Potion" ? "love" : "visions",
          fatal: liquid === "Love Potion" && s.vampire,
          vessel: empty,
        };
        return s.effect.type;
      }
      if (empty) {
        s.mix = [{ item: empty, origin: null }];
        s.result = true;
        discover(s, empty);
      }
      if (liquid === "Blood") {
        s.vampire = true;
        return "vampire";
      }
      return "consumed";
    }
    function finishEffect(s) {
      const effect = s.effect;
      if (!effect) return;
      if (effect.fatal || effect.type === "explosion") {
        kill(s);
        return;
      }
      const vessel = effect.vessel || "Glass Vessel";
      s.effect = null;
      s.mix = [{ item: vessel, origin: null }];
      s.result = true;
      discover(s, vessel);
    }

    const displayName = (item) => (ELIXIRS.includes(item) ? "Elixir(?)" : item);

    // ===== art-map.js =====
    // Generated by build-art-map.mjs
    const sprites = {
      Fire: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [6.2700000000000005, 6.2700000000000005, 144.21, 144.21],
      },
      Water: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [163.02, 6.2700000000000005, 144.21, 144.21],
      },
      Air: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [319.77, 6.2700000000000005, 144.21, 144.21],
      },
      Earth: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [476.52, 6.2700000000000005, 144.21, 144.21],
      },
      Lightning: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [633.27, 6.2700000000000005, 144.21, 144.21],
      },
      Magma: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          5.925000000000001, 5.925000000000001, 225.14999999999998, 225.14999999999998,
        ],
      },
      Dust: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [946.77, 6.2700000000000005, 144.21, 144.21],
      },
      Cloud: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [1103.52, 6.2700000000000005, 144.21, 144.21],
      },
      Clay: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [6.2700000000000005, 163.02, 144.21, 144.21],
      },
      Plant: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [163.02, 163.02, 144.21, 144.21],
      },
      Stone: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [319.77, 163.02, 144.21, 144.21],
      },
      Pot: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          242.92499999999998, 5.925000000000001, 225.14999999999998, 225.14999999999998,
        ],
      },
      Gunpowder: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [633.27, 163.02, 144.21, 144.21],
      },
      Algae: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [790.02, 163.02, 144.21, 144.21],
      },
      "Frog Eggs": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [946.77, 163.02, 144.21, 144.21],
      },
      Metal: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [1103.52, 163.02, 144.21, 144.21],
      },
      Blade: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [6.2700000000000005, 319.77, 144.21, 144.21],
      },
      Wire: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [163.02, 319.77, 144.21, 144.21],
      },
      Bomb: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [319.77, 319.77, 144.21, 144.21],
      },
      Wood: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [476.52, 319.77, 144.21, 144.21],
      },
      Knife: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [633.27, 319.77, 144.21, 144.21],
      },
      Blender: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [790.02, 319.77, 144.21, 144.21],
      },
      Frog: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [946.77, 319.77, 144.21, 144.21],
      },
      "Twitching Frog Legs": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [1103.52, 319.77, 144.21, 144.21],
      },
      Campfire: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [6.2700000000000005, 476.52, 144.21, 144.21],
      },
      Coal: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [163.02, 476.52, 144.21, 144.21],
      },
      Diamond: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [319.77, 476.52, 144.21, 144.21],
      },
      Sand: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [476.52, 476.52, 144.21, 144.21],
      },
      "Glass Pane": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          479.92499999999995, 5.925000000000001, 225.14999999999998, 225.14999999999998,
        ],
      },
      "Light Bulb": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [790.02, 476.52, 144.21, 144.21],
      },
      "Lightened Light Bulb": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [946.77, 476.52, 144.21, 144.21],
      },
      "Glass Vessel": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [716.925, 5.925000000000001, 225.14999999999998, 225.14999999999998],
      },
      "A Glass of Water": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          5.925000000000001, 242.92499999999998, 225.14999999999998, 225.14999999999998,
        ],
      },
      "A Pot of Water": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          242.92499999999998, 242.92499999999998, 225.14999999999998, 225.14999999999998,
        ],
      },
      "A Pot of Frog": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          479.92499999999995, 242.92499999999998, 225.14999999999998, 225.14999999999998,
        ],
      },
      "A Glass of Frog": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [716.925, 242.92499999999998, 225.14999999999998, 225.14999999999998],
      },
      Mushroom: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [633.27, 633.27, 144.21, 144.21],
      },
      Lichen: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          5.925000000000001, 479.92499999999995, 225.14999999999998, 225.14999999999998,
        ],
      },
      Potion: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          242.92499999999998, 1170.7800000000002, 225.14999999999998, 227.51999999999998,
        ],
      },
      Flower: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [1103.52, 633.27, 144.21, 144.21],
      },
      Vase: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          242.92499999999998, 479.92499999999995, 225.14999999999998, 225.14999999999998,
        ],
      },
      Flies: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [163.02, 790.02, 144.21, 144.21],
      },
      Blood: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          479.92499999999995, 479.92499999999995, 225.14999999999998, 225.14999999999998,
        ],
      },
      Shark: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [476.52, 790.02, 144.21, 144.21],
      },
      Curse: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [633.27, 790.02, 144.21, 144.21],
      },
      "Love Potion": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          479.92499999999995, 1170.7800000000002, 225.14999999999998, 227.51999999999998,
        ],
      },
      "Cooked Meat": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [946.77, 790.02, 144.21, 144.21],
      },
      Broth: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          5.925000000000001, 1407.7800000000002, 225.14999999999998, 246.48000000000002,
        ],
      },
      Moss: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [242.92499999999998, 716.925, 225.14999999999998, 225.14999999999998],
      },
      "Man Eating Plant": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [163.02, 946.77, 144.21, 144.21],
      },
      "Six-headed Shark": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [319.77, 946.77, 144.21, 144.21],
      },
      Seeds: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [633.27, 946.77, 144.21, 144.21],
      },
      Flour: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [790.02, 946.77, 144.21, 144.21],
      },
      Dough: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [946.77, 946.77, 144.21, 144.21],
      },
      Bread: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [1103.52, 946.77, 144.21, 144.21],
      },
      Vodka: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [479.92499999999995, 716.925, 225.14999999999998, 225.14999999999998],
      },
      "Molotov Cocktail": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [716.925, 1407.7800000000002, 225.14999999999998, 246.48000000000002],
      },
      Unicorn: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/items-illustrated.png",
        width: 1254,
        height: 1254,
        box: [319.77, 1103.52, 144.21, 144.21],
      },
      "Cursed Blood": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [716.925, 479.92499999999995, 225.14999999999998, 225.14999999999998],
      },
      "Sacred Blood": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [5.925000000000001, 716.925, 225.14999999999998, 225.14999999999998],
      },
      "Elixir(?) · I": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          242.92499999999998, 1407.7800000000002, 225.14999999999998, 246.48000000000002,
        ],
      },
      "Elixir(?) · II": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          479.92499999999995, 1407.7800000000002, 225.14999999999998, 246.48000000000002,
        ],
      },
      "A Glass of Blood": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [716.925, 716.925, 225.14999999999998, 225.14999999999998],
      },
      "A Pot of Blood": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          5.925000000000001, 953.9250000000001, 225.14999999999998, 225.14999999999998,
        ],
      },
      "A Glass of Cursed Blood": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          242.92499999999998, 953.9250000000001, 225.14999999999998, 225.14999999999998,
        ],
      },
      "A Pot of Cursed Blood": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          479.92499999999995, 953.9250000000001, 225.14999999999998, 225.14999999999998,
        ],
      },
      "A Glass of Sacred Blood": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [716.925, 953.9250000000001, 225.14999999999998, 225.14999999999998],
      },
      "A Pot of Sacred Blood": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [
          5.925000000000001, 1170.7800000000002, 225.14999999999998, 227.51999999999998,
        ],
      },
      Vine: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/vine-chain-2026-11-16/items-new.png",
        width: 2172,
        height: 724,
        box: [60, 125, 374, 485],
      },
      Grape: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/vine-chain-2026-11-16/items-new.png",
        width: 2172,
        height: 724,
        box: [490, 140, 350, 465],
      },
      Pulp: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/vine-chain-2026-11-16/items-new.png",
        width: 2172,
        height: 724,
        box: [870, 285, 430, 290],
      },
      Wine: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/vine-chain-2026-11-16/items-new.png",
        width: 2172,
        height: 724,
        box: [1360, 125, 310, 490],
      },
      Jesus: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/vine-chain-2026-11-16/items-new.png",
        width: 2172,
        height: 724,
        box: [1815, 90, 285, 535],
      },
      Cross: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/holy-chain-2026-11-16/items-new.png",
        width: 1536,
        height: 1024,
        box: [7.68, 7.68, 496.64, 496.64],
      },
      "Holy Water": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/holy-chain-2026-11-16/items-new.png",
        width: 1536,
        height: 1024,
        box: [519.68, 7.68, 496.64, 496.64],
      },
      "A Glass of Holy Water": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/holy-chain-2026-11-16/items-new.png",
        width: 1536,
        height: 1024,
        box: [1031.68, 7.68, 496.64, 496.64],
      },
      "A Pot of Holy Water": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/holy-chain-2026-11-16/items-new.png",
        width: 1536,
        height: 1024,
        box: [7.68, 519.68, 496.64, 496.64],
      },
      Raisins: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/holy-chain-2026-11-16/items-new.png",
        width: 1536,
        height: 1024,
        box: [535, 620, 440, 330],
      },
      "Raisins Bread": {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/holy-chain-2026-11-16/items-new.png",
        width: 1536,
        height: 1024,
        box: [1031.68, 519.68, 496.64, 496.64],
      },
      Mold: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/mold.svg",
        width: 66,
        height: 66,
        box: [3, 3, 60, 60],
      },
      Poison: {
        path: "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/revisions-2026-11-16/items-revised.png",
        width: 948,
        height: 1659,
        box: [716.925, 1170.7800000000002, 225.14999999999998, 227.51999999999998],
      },
    };

    // ===== art.js =====
    const paths = {
      Fire: '<path fill="#bc7044" d="M32 57C5 55 15 29 26 23c-3 12 6 14 6 14S23 16 39 6c-3 18 17 21 15 36-1 11-10 18-22 15Z"/><path fill="#dfb86a" d="M32 53c-10-3-7-14 1-21 0 9 13 10 7 19Z"/>',
      Water:
        '<path fill="#77989b" d="M33 5C26 20 14 32 15 43c1 22 36 22 36 0C51 30 38 16 33 5Z"/><path fill="none" stroke="#cad2bd" d="M22 37q-5 14 8 16"/>',
      Air: '<g fill="none" stroke="#7d8067" stroke-width="3"><path d="M7 27h31c18 0 13-21 2-16-5 3-2 9 2 7M6 35h40c19 0 17 20 4 17-5-2-3-8 1-7M11 43h19c12 0 12 17 2 13"/></g>',
      Earth:
        '<path fill="#8b7c58" d="m6 48 10-22 13-9 16 7 13 25-8 6H15Z"/><path fill="#b09a70" d="m16 26 12 8 1 20H15L6 48Zm13-9 8 19 8-12Z"/><path fill="none" d="m29 34 8 2 13 19M37 36l-5 10"/>',
      Lightning: '<path fill="#d2b566" d="M39 4 14 35h17l-9 27 30-37H35Z"/>',
      Stone:
        '<path fill="#929482" d="m7 43 7-21 19-9 18 11 7 20-16 11H21Z"/><path fill="#b1b09c" d="m14 22 14 10 15-6-10-13Zm14 10-7 23-14-12Z"/><path fill="none" d="m28 32 15-6 15 18M28 32l14 23"/>',
      Plant:
        '<g fill="#7e8c55"><path fill="none" stroke-width="3" d="M32 60V18"/><path d="M31 42C9 45 7 27 12 26c17-2 20 10 19 16Zm2-11c-3-17 10-24 21-23 3 14-6 24-21 23ZM31 55C13 59 7 46 8 43c14-3 23 4 23 12Zm2-8c1-15 17-18 24-13-3 13-13 17-24 13Z"/></g>',
      Mushroom:
        '<path fill="#d1b98b" d="m29 31-4 25q8 5 18-1l-5-25Z"/><path fill="#a76248" d="M6 32C9 3 52-3 59 32c-14 8-36 8-53 0Z"/><g fill="#d8c7a1"><ellipse cx="21" cy="21" rx="4" ry="3"/><ellipse cx="38" cy="14" rx="4" ry="3"/><ellipse cx="47" cy="27" rx="3" ry="2"/><ellipse cx="25" cy="30" rx="2" ry="2"/></g>',
      Sand: '<path fill="#c7af76" d="m4 50 13-9 12-21 7-6 12 26 13 12q-28 11-57-2Z"/><g stroke="#8a734a" stroke-width="1"><path d="m19 43 9-12m9-6 8 20m-14-8 1 3m8 9 2 2M9 55h3m39 2h4m-30-8 2 2m-10-7 1 1"/></g>',
      Blade:
        '<path fill="#c3c6b1" d="m11 52 10-21L58 6 42 43 18 58Z"/><path fill="none" d="m18 53 33-36"/>',
      Knife:
        '<path fill="#bec4ae" d="m23 39 9-19L59 7 43 36 30 44Z"/><path fill="#796047" d="m7 54 17-18 10 10-17 15Z"/><circle fill="#bdb28c" cx="16" cy="52" r="2"/>',
      Wood: '<path fill="#8f7149" d="m9 46 34-28 15 17-33 27Z"/><ellipse fill="#b99c69" cx="17" cy="52" rx="9" ry="12" transform="rotate(-39 17 52)"/><ellipse fill="none" cx="17" cy="52" rx="4" ry="7" transform="rotate(-39 17 52)"/><path fill="none" d="m26 39 25-19m-17 28 20-17"/>',
      Flower:
        '<path fill="none" stroke="#718151" stroke-width="3" d="M33 58V24m0 20L18 36m15 12 14-12"/><g fill="#b98e8a"><ellipse cx="33" cy="14" rx="6" ry="11"/><ellipse cx="33" cy="28" rx="6" ry="10"/><ellipse cx="24" cy="21" rx="10" ry="6"/><ellipse cx="43" cy="21" rx="10" ry="6"/></g><circle fill="#c8b164" cx="33" cy="21" r="6"/>',
      Frog: '<path fill="#8c9b62" d="M19 30c-3-17 14-20 16-9 9-15 23-4 17 6 11 17 1 25-14 26-14 5-29 0-19-23Z"/><path fill="#71814d" d="M20 37C6 34 4 47 17 50L7 56h18m21-20c15-2 16 15 5 16l9 5H41"/><g fill="#d1c69a"><circle cx="25" cy="24" r="5"/><circle cx="43" cy="23" r="5"/></g><g fill="#242d20"><circle cx="26" cy="24" r="2"/><circle cx="43" cy="23" r="2"/></g><path fill="none" d="M26 39q11 6 19-1"/>',
      Glass:
        '<path fill="#b5c3ab44" d="m15 14 5 41q13 8 26 0l5-41Z"/><ellipse fill="#b5c3ab33" cx="33" cy="14" rx="18" ry="5"/><path fill="none" stroke="#d3d3b7" d="m22 23 3 25"/>',
      Pot: '<path fill="#9b805a" d="M12 20h42l-4 31q-18 15-34 0Z"/><ellipse fill="#574d37" cx="33" cy="20" rx="21" ry="7"/><path fill="none" stroke-width="4" d="M13 29C-2 24-2 47 16 43m37-14c14-5 15 16-1 15"/>',
      Bottle:
        '<path fill="#aab99b66" d="M26 9h14v18l11 11v20q-19 6-37 0V38l12-11Z"/><path fill="#89724d" d="M25 5h16v8H25Z"/><path fill="none" stroke="#d9d9bd" d="M20 43v10"/>',
      Wire: '<g fill="none" stroke="#b38d5d" stroke-width="4"><path d="M7 46c6-28 40-38 44-18S4 67 18 37 60 14 55 48"/></g>',
      Seeds:
        '<g fill="#a89158"><ellipse cx="19" cy="34" rx="6" ry="11" transform="rotate(25 19 34)"/><ellipse cx="38" cy="24" rx="6" ry="11" transform="rotate(-30 38 24)"/><ellipse cx="45" cy="45" rx="6" ry="10" transform="rotate(45 45 45)"/><ellipse cx="25" cy="53" rx="4" ry="6"/></g>',
      Bread:
        '<path fill="#bb9359" d="M7 42C3 11 59 9 59 43v9q-25 11-51 0Z"/><path fill="none" stroke="#6d5739" stroke-width="3" d="m19 27 8 10m4-15 8 10m4-9 8 9"/>',
      Diamond:
        '<path fill="#a5c2b6" d="m7 24 12-13h29l12 13-27 36Z"/><path fill="none" d="M7 24h53M19 11l8 13 6 36 9-36 6-13M27 24l6-13 9 13"/>',
      Cloud:
        '<path fill="#b9beaa" d="M13 49C-1 48 0 29 14 28 14 8 42 5 47 25c22-4 27 26 9 27Z"/>',
      Flies:
        '<g fill="#babda755"><ellipse cx="24" cy="23" rx="10" ry="17" transform="rotate(-35 24 23)"/><ellipse cx="43" cy="23" rx="10" ry="17" transform="rotate(35 43 23)"/></g><ellipse fill="#494b37" cx="33" cy="39" rx="8" ry="15"/><path fill="none" d="m27 35-14-4m14 12-15 5m28-13 14-5m-14 13 15 6"/><circle fill="#824b3b" cx="33" cy="25" r="7"/>',
      Unicorn:
        '<path fill="#c5c2a2" d="m12 39 9-20 12-9 10 11 9 18-6 19H22Z"/><path fill="#a29164" d="m32 13 7-12 1 17Z"/><path fill="#9b9f85" d="m22 19-9 8-5 25 13-10m21-21 15 9-5 28-6-19"/><circle cx="29" cy="28" r="2"/><path fill="none" d="m27 43 13 2"/>',
      Shark:
        '<path fill="#7d9690" d="M5 36q24-24 45-2l12-13-3 29-10-10Q20 57 5 36Z"/><path fill="#9cae9f" d="m22 29 7-20 9 21Z"/><circle cx="14" cy="34" r="2"/><path fill="none" d="m13 42 9-1m6-8-1 11m6-11-1 11"/>',
      Blender:
        '<path fill="#a6ba9d55" d="m15 8 5 31h26l5-31Z"/><path fill="#747d69" d="m20 39-7 20h39l-6-20Z"/><path fill="none" d="m22 26 21 6m-19 2 17-10"/><circle fill="#b9ac81" cx="33" cy="49" r="4"/>',
      Bomb: '<circle fill="#4a4c3a" cx="32" cy="39" r="21"/><path fill="#8b7953" d="m27 18 1-8h11v9Z"/><path fill="none" stroke="#a8996c" d="M34 10q17 5 14-8"/><path fill="none" stroke="#d7b36b" d="m45 4 9-2m-5 5 7 4"/>',
      Coal: '<path fill="#3b4033" d="m9 46 3-20 18-12 22 10 7 23-17 9-25-1Z"/><path fill="none" stroke="#7b7f66" d="m13 28 17 8 13-9m-13 9-5 17m5-17 19 12"/>',
      Metal:
        '<path fill="#a1a58f" d="m6 41 14-20h29l11 20-9 14H17Z"/><path fill="#c1c2a6" d="m6 41 14-20h29L36 41Z"/><path fill="none" d="M6 41h54M36 41l-3 14"/>',
    };
    function vectorArt(item) {
      let p = paths[item];
      if (item === "Mold")
        p =
          '<g stroke="#76835b" fill="#a7b78a"><path fill="none" stroke-width="3" d="M9 51 22 38 33 46 45 29 57 41M22 38 18 22M33 46 36 22M45 29 51 15"/><circle cx="18" cy="21" r="7"/><circle cx="36" cy="20" r="9"/><circle cx="52" cy="14" r="6"/><circle cx="12" cy="45" r="7"/><circle cx="53" cy="43" r="8"/></g>';
      if (item === "Magma")
        p =
          paths.Stone +
          '<path fill="#c57a3c" d="m14 23 14 9-5 16 15-3 6 10 5-16-13-10 3-13-9 15Z"/>';
      if (item === "Dust" || item === "Gunpowder" || item === "Flour")
        p = paths.Sand.replace(
          "#c7af76",
          item === "Gunpowder" ? "#555d45" : item === "Flour" ? "#ded0a5" : "#a49473",
        );
      if (["Algae", "Moss", "Lichen"].includes(item))
        p = paths.Plant.replaceAll("#7e8c55", item === "Algae" ? "#668d64" : "#8c9161");
      if (item === "Campfire") p = paths.Wood + paths.Fire;
      if (item === "Twitching Frog Legs")
        p =
          '<path fill="#9aa66b" d="M9 10q29 8 12 25L9 47l15 8-5 7L3 49l11-22Zm40 0q-29 8-12 25l12 12-15 8 5 7 16-13-11-22Z"/>';
      if (item === "Frog Eggs")
        p = Array.from(
          { length: 9 },
          (_, i) =>
            `<circle fill="#a8b8a788" cx="${16 + (i % 3) * 16}" cy="${17 + Math.floor(i / 3) * 15}" r="10"/><circle fill="#414b32" cx="${16 + (i % 3) * 16}" cy="${17 + Math.floor(i / 3) * 15}" r="3"/>`,
        ).join("");
      if (item === "A Glass of Water" || item === "A Glass of Frog")
        p =
          paths.Glass +
          `<path fill="#77989b88" d="m19 31 3 22q11 5 22 0l3-22Z"/>` +
          (item.includes("Frog")
            ? '<circle fill="#404c2c" cx="30" cy="42" r="4"/><circle fill="#404c2c" cx="39" cy="48" r="3"/>'
            : "");
      if (item === "A Pot of Water" || item === "A Pot of Frog" || item === "Broth")
        p =
          paths.Pot +
          `<ellipse fill="${item === "Broth" ? "#ad9657" : "#77989b"}" cx="33" cy="21" rx="17" ry="5"/>` +
          (item.includes("Frog") ? '<circle cx="30" cy="21" r="3"/>' : "");
      if (
        [
          "Blood",
          "Cursed Blood",
          "Sacred Blood",
          "Potion",
          "Love Potion",
          "Vodka",
          ...["Elixir(?) · I", "Elixir(?) · II"],
        ].includes(item)
      ) {
        const c =
          {
            Blood: "#95453c",
            "Cursed Blood": "#5e324d",
            "Sacred Blood": "#c6af65",
            Potion: "#7d8f64",
            "Love Potion": "#bc7f8e",
            Vodka: "#b9c5af",
          }[item] || "#a4946c";
        p = paths.Glass + `<path fill="${c}" d="m19 32 3 21q11 7 22 0l3-21Z"/>`;
      }
      if (item === "Light Bulb" || item === "Lightened Light Bulb")
        p = `<path fill="${item === "Light Bulb" ? "#bfccaf44" : "#e6cb7d"}" d="M22 43C-3 14 28-5 44 10c14 11 7 26-4 33Z"/><path fill="#7e8067" d="M22 44h18v12H22Z"/><path fill="none" d="m26 43-3-16 8 6 8-6-3 16M22 49h18M24 58h14"/>`;
      if (item === "Vase")
        p = '<path fill="#839b8d" d="M23 8h21l-5 18q27 30-6 33C1 58 22 30 27 26Z"/>';
      if (item === "Curse" || item === "Poison")
        p =
          paths.Bottle +
          '<path fill="#4b564066" d="M16 40h33v17H16Z"/><path fill="none" stroke="#b7ab79" d="m25 43 15 10m0-10L25 53"/>';
      if (item === "Molotov Cocktail")
        p = paths.Bottle + '<path fill="#b08a54" d="m27 3 6 21 10-3-6-21Z"/>';
      if (item === "Dough" || item === "Cooked Meat")
        p = `<path fill="${item === "Dough" ? "#d3bd8f" : "#9f7052"}" d="M7 45C2 24 23 18 33 23c26-15 32 24 17 31-10 7-36 7-43-9Z"/><path fill="none" d="m21 33 7 6m7-8 10 7"/>`;
      if (item === "Man Eating Plant")
        p =
          paths.Plant +
          '<path fill="#a27658" d="M12 20q17-25 43 0-25 28-43 0Z"/><path fill="none" stroke="#ded0a3" d="m16 20 5 7 5-9 5 9 5-9 5 9 6-8"/>';
      if (item === "Six-headed Shark")
        p =
          paths.Shark +
          '<path fill="#7d9690" d="M7 23q14-12 24 1L9 29Zm0 23q13-7 22 3L8 54Z"/><circle cx="11" cy="23" r="1"/><circle cx="11" cy="48" r="1"/>';
      return `<svg viewBox="0 0 66 66" fill="none" stroke="#343729" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${p || paths.Stone}</svg>`;
    }
    function art(item) {
      const sprite = sprites[item];
      if (!sprite) return vectorArt(item);
      const [x, y, w, h] = sprite.box,
        id = "sprite-" + item.replace(/[^a-zA-Z0-9]/g, "");
      return `<svg viewBox="${sprite.box.join(" ")}" aria-hidden="true" overflow="hidden"><defs><clipPath id="${id}" clipPathUnits="userSpaceOnUse"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs><image clip-path="url(#${id})" href="${sprite.path}" width="${sprite.width}" height="${sprite.height}"/></svg>`;
    }
    function moon(i) {
      const phase = ((i % 28) + 28) % 28;
      const angle = (phase / 28) * 2 * Math.PI;
      const radius = Math.abs(Math.cos(angle)) * 7;
      let light = "";
      if (phase === 0) light = '<circle cx="8" cy="8" r="7" fill="#f0ebd9"/>';
      else if (phase !== 14) {
        const outerSweep = phase < 14 ? 0 : 1;
        const innerSweep =
          phase < 14 ? (Math.cos(angle) > 0 ? 0 : 1) : Math.cos(angle) < 0 ? 0 : 1;
        const terminator =
          radius < 0.001 ? "L8 1" : `A${radius.toFixed(4)} 7 0 0 ${innerSweep} 8 1`;
        light = `<path d="M8 1A7 7 0 0 ${outerSweep} 8 15${terminator}Z" fill="#f0ebd9"/>`;
      }
      return `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#141813"/>${light}<circle cx="8" cy="8" r="7" fill="none" stroke="#10140e" stroke-width="0.75"/></svg>`;
    }

    // ===== descriptions.js =====
    const descriptions = {
      Fire: "Rapid oxidation, releasing heat and light. Excellent for discovery. Less excellent for curtains.",
      Water:
        "Two hydrogen atoms and one oxygen atom. Remarkably innocent, considering its drowning record.",
      Air: "A mixture of gases you need to breathe. Enjoy the privilege while it lasts.",
      Earth: "Minerals, organic matter, and the remains of things that had plans.",
      Sand: "Small grains of rock and minerals, worn down by weathering. Given enough time, even mountains fall apart. You have considerably less time.",
      Lightning: "A sudden electrical discharge. The sky has very poor impulse control.",
      Magma: "Molten rock beneath the surface. A drink best left unreviewed.",
      Dust: "Fine particles of matter. Most things eventually join the collection.",
      Cloud:
        "Tiny water droplets suspended in air. A remarkably large quantity of impending dampness.",
      Clay: "Fine mineral particles that become pliable when wet. Finally, something with fewer opinions than you.",
      Plant:
        "An organism that turns light into chemical energy. Already more productive than this basement.",
      Stone:
        "A solid piece of rock. It has survived quite a lot without asking for advice.",
      Pot: "A vessel for holding and heating things. It does not take responsibility for the contents.",
      Gunpowder:
        "A combustible powder that produces expanding gases. Best stored away from your remaining ambitions.",
      Algae:
        "Photosynthetic organisms that thrive in water. Your glass has acquired tenants.",
      Metal:
        "A material that conducts heat and electricity. Generous about sharing both with your fingers.",
      Blade: "A sharpened metal edge. The handle is apparently someone else’s problem.",
      Wire: "Metal drawn into a thin strand. An efficient way to carry electricity toward a mistake.",
      Bomb: "An explosive device. An unusually decisive approach to rearranging a room.",
      Wood: "The fibrous structural tissue of trees. A forest, with fewer future prospects.",
      Knife:
        "A handled blade for cutting. Now your bad decisions have a comfortable grip.",
      Blender: "A machine with rotating blades. Texture is a temporary condition.",
      "Frog Eggs":
        "Amphibian embryos protected by jelly. Several futures, none of them consulted.",
      Frog: "An amphibian with permeable skin. It did not volunteer for basement research.",
      "Twitching Frog Legs":
        "Muscles can contract in response to electrical stimulation. Movement is not always good news.",
      Campfire:
        "Burning wood that releases heat and light. Indoor camping has structural consequences.",
      Coal: "Carbon-rich fuel. Ancient life, preparing for one final disappointment.",
      Diamond:
        "Crystalline carbon with exceptional hardness. A handsome way to outlive everyone.",
      Glass:
        "A rigid, noncrystalline solid. Transparent about everything except when it will break.",
      "Light Bulb": "An electric lamp. Currently waiting for a brighter idea.",
      "Lightened Light Bulb":
        "An illuminated electric lamp. At last, a witness to your work.",
      Bottle:
        "A narrow-necked container. Suitable for keeping questionable decisions together.",
      "A Glass of Water":
        "Water in a glass. An achievement civilization continues to underestimate.",
      "A Pot of Water": "Water in a cooking vessel. Optimism, before ingredients.",
      "A Pot of Frog":
        "Frog eggs in a pot of water. The catering arrangements are troubling.",
      "A Glass of Frog":
        "Frog eggs in a glass of water. Not every garnish belongs in a drink.",
      Mushroom:
        "The fruiting body of a fungus. The insects seem to have read the invitation.",
      Lichen:
        "A partnership between fungi and photosynthetic organisms. Even rocks have better social lives.",
      Potion:
        "A prepared liquid mixture. The label seems to have omitted the useful information.",
      Vase: "A vessel used to display flowers. A small memorial to their roots.",
      Flies:
        "Insects with one functional pair of wings. Your work has attracted an audience.",
      Flower:
        "A plant’s reproductive structure. Romance has always been a biological complication.",
      Blood:
        "A fluid that transports oxygen and nutrients. Usually best kept on the inside.",
      Curse:
        "A supposed source of supernatural misfortune. Peer review has become difficult to contact.",
      "Love Potion":
        "A mixture reputed to inspire affection. Consent was not included in the formulation.",
      Shark:
        "A cartilaginous fish with replaceable teeth. Your fingers are less renewable.",
      "Cooked Meat":
        "Animal tissue altered by heat. The experiment is now technically dinner.",
      Broth:
        "A liquid made by cooking ingredients in water. Much has been reduced to this.",
      Moss: "A small, nonvascular plant that favors damp places. The basement is receiving excellent reviews.",
      "Man Eating Plant":
        "A plant with a concerning appetite. Please remain outside the food chain.",
      "Six-headed Shark":
        "One shark, six heads. Nature’s complaints department has stopped answering.",
      "Gu Poison":
        "A poison associated with traditional tales of venomous creatures. Folklore has entered the laboratory.",
      Seeds:
        "Plant embryos with protective coverings and stored food. Hope, in convenient portions.",
      Flour: "Finely ground seeds or grain. Potential, thoroughly pulverized.",
      Dough:
        "Flour mixed with liquid. A promising substance with no idea what comes next.",
      Bread: "Dough transformed by heat. One of humanity’s more defensible experiments.",
      Vodka: "A distilled alcoholic spirit. Scientific judgment sold separately.",
      "Molotov Cocktail":
        "A bottle containing flammable liquid. A terrible substitute for a table lamp.",
      Unicorn:
        "A legendary one-horned creature. The laboratory has abandoned its commitment to ordinary biology.",
      "Cursed Blood":
        "Blood with an unfortunate supernatural reputation. The sample seems personally offended.",
      "Sacred Blood": "Blood considered holy. An unusually complicated donation.",
    };
    descriptions["Glass Pane"] =
      "A flat sheet of glass. A window of opportunity, with sharp edges.";
    descriptions["Glass Vessel"] =
      "A glass bottle for storing liquids. The contents remain your responsibility.";
    descriptions.Pot =
      "A clay vessel hardened by firing. Civilization began with pottery. Your research may end in it.";
    descriptions.Magma =
      "Molten rock, flowing at an unreasonable temperature. The floor is not a suitable container.";
    descriptions.Vine =
      "A climbing plant with curling tendrils. It has found a way up. You are still in the basement.";
    descriptions.Grape =
      "Fruit of a grapevine, rich in water and sugars. Its career is about to become considerably less wholesome.";
    descriptions.Pulp =
      "Crushed grape flesh, skins, seeds and juice. Potential, with its structural integrity removed.";
    descriptions.Wine =
      "An alcoholic drink made from fermented grapes. This laboratory has taken certain liberties with the waiting period.";
    descriptions.Jesus =
      "The central figure of Christianity. The bread and wine appear to have attracted someone’s attention.";
    descriptions.Cross =
      "Two pieces of wood joined at right angles. Its provenance makes this one a problem for certain visitors.";
    descriptions["Holy Water"] =
      "Water blessed for religious use. Still water. Suddenly more selective about its audience.";
    descriptions.Raisins =
      "Dried grapes, with most of their water removed. Time has not improved their complexion.";
    descriptions["Raisins Bread"] =
      "Bread with raisins in it. A discovery that will divide the household.";
    for (const name of [
      ...Object.keys(CONTAINED),
      "A Glass of Water",
      "A Pot of Water",
      "A Glass of Frog",
      "A Pot of Frog",
    ]) {
      const isPot = name.startsWith("A Pot of "),
        content = name.replace(/^A (Glass|Pot) of /, "");
      descriptions[name] =
        `A ${isPot ? "pot" : "glass"} of ${content}. What were you expecting? You literally just ${content === "Frog" ? "put" : "poured"} ${content} into a ${isPot ? "pot" : "glass"}.`;
    }
    delete descriptions.Glass;
    delete descriptions.Bottle;

    // Approved description revisions, November 20, 2026.
    Object.assign(descriptions, {
      "A Glass of Frog":
        "A frog born and raised in a bottle. Even its cousin at the bottom of a well has a bigger world.",
      "A Pot of Frog":
        "A frog born and raised in a pot. The walls are too smooth to climb. Even its cousin at the bottom of a well has a bigger world.",
      Algae: "Photosynthetic organisms that thrive in water. Very slippery. Ewww.",
      Blade: "A sharpened metal edge. Be careful. Try not to cut yourself.",
      Blender: "A machine with rotating blades. Take your hand out before turning it on.",
      Bomb: "An explosive device. Keep it away from fire. The two get along a little too well.",
      Bread:
        "Your first attempt at baking turned out better than expected. Perhaps you should consider a career with fewer explosions.",
      Broth:
        "A liquid made by cooking ingredients in water. Could use a little more seasoning.",
      Campfire:
        "Burning wood that releases heat and light. Best enjoyed somewhere other than indoors.",
      Clay: "Fine mineral particles that become pliable when wet. You should try making something with it.",
      Cloud:
        "Tiny water droplets suspended in air. Store carefully. The basement does not need indoor weather.",
      Coal: "Carbon-rich fuel. Ancient life, ready to shine one final time.",
      Cross:
        "Two pieces of wood joined at right angles. Made holy through suffering and sacrifice.",
      Diamond:
        "Crystalline carbon with exceptional hardness. It will probably outlive everything in this room.",
      Dough: "Flour mixed with liquid. A promising substance with endless possibilities.",
      Dust: "Fine particles of matter. Your basement already has plenty. Why are you making more?",
      Earth:
        "Minerals, organic matter, and the ground beneath your feet. Mother Earth has fed generations. Try not to disappoint her.",
      Fire: "Rapid oxidation, releasing heat and light. Learning to harness it was humanity’s first and most significant revolution.",
      Flies:
        "Insects with one functional pair of wings. Cover the food. You would prefer to believe this is the only one.",
      Flour: "Finely ground seeds or grain. You just sneezed into it. Ewww.",
      Flower:
        "A plant’s reproductive structure. You have never understood why plant genitals make such popular gifts.",
      "Frog Eggs": "Amphibian embryos protected by jelly. Not all of them will survive.",
      Grape:
        "Fruit of a grapevine, rich in water and sugars. To peel or not to peel? Try saying that five times with your mouth full.",
      "Holy Water": "Blessed water. At the end of the day, it is still water.",
      Jesus: "The Messiah. The Lamb of God, who takes away the sin of the world!",
      Knife: "A handled blade for cutting. Just don’t cut yourself.",
      "Man Eating Plant":
        "A plant with a concerning appetite and a very concerning diet. Handle with extreme caution.",
      Metal:
        "A material that conducts heat and electricity. Heat it, hammer it, and persuade it to become something useful.",
      "Molotov Cocktail":
        "A bottle containing flammable liquid. It looks very throwable. You resist the temptation.",
      Moss: "A small, nonvascular plant that favors damp places. It seems quite at home in your basement.",
      Mushroom:
        "The fruiting body of a fungus. Pretty enough to admire. That is not an invitation to eat it.",
      Plant:
        "An organism that turns light into chemical energy. Already more productive than you.",
      Pot: "A clay vessel hardened by firing. Civilization began with pottery.",
      Pulp: "Crushed grape flesh, skins, seeds, and juice. It looks disgusting. Ewww.",
      "Raisins Bread":
        "Bread with raisins in it. You are unsure whether this is an improvement or a setback.",
      Shark:
        "A cartilaginous fish with replaceable teeth. Be careful. Your fingers are much less renewable.",
      "Six-headed Shark":
        "A shark with six heads. It looks like it escaped from a horror film with a very small budget.",
      Stone:
        "A solid piece of rock. A convenient pet. No feeding, no walks, no affection.",
      Unicorn:
        "A mythical one-horned horse. Thank goodness you are still a virgin. Apparently, the alternative is being eaten.",
      Vodka:
        "A distilled alcoholic spirit. That’s the spirit! Your scientific judgment has already left the room.",
      Wine: "An alcoholic drink made from fermented grapes. Apparently, aging improves it. You do not have that kind of patience.",
      Wire: "Metal drawn into a thin strand. An efficient way to carry electricity.",
      Wood: "The fibrous structural tissue of trees. You could also call it a tree’s corpse.",
      Mold: "A fungus growing in branching threads. Your food has started a new life without your permission.",
      Poison: "A substance that disrupts the body’s normal functions. Yours included.",
    });
    delete descriptions["Gu Poison"];

    // ===== journal.js =====
    const alphabetic = (items) => [...items].sort((a, b) => a.localeCompare(b));
    function catalogPages(items) {
      const sorted = alphabetic(items),
        pages = [sorted.slice(0, 8)];
      for (let i = 8; i < sorted.length; i += 12) pages.push(sorted.slice(i, i + 12));
      return pages;
    }
    function catalogSpread(items, index = 0) {
      const pages = catalogPages(items),
        last = Math.max(0, Math.ceil(pages.length / 2) - 1),
        current = Math.max(0, Math.min(index, last));
      return {
        index: current,
        left: pages[current * 2] || [],
        right: pages[current * 2 + 1] || [],
        previous: current > 0,
        next: current < last,
      };
    }
    function neighbors(items, item) {
      const sorted = alphabetic(items),
        i = sorted.indexOf(item);
      return {
        previous: i > 0 ? sorted[i - 1] : null,
        next: i >= 0 && i < sorted.length - 1 ? sorted[i + 1] : null,
      };
    }

    // ===== love-effect.js =====
    // Shared by the game and its visual review page.
    const LOVE_EFFECT_DURATION = 12000;
    async function mountLoveEffect(root) {
      const image = new Image();
      image.src =
        "https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/love-hallucination-overlay.png";
      try {
        await image.decode();
      } catch {}
      root.innerHTML =
        '<div class="love-concept"><div class="pink-veil"></div><div class="love-pieces"></div></div>';
      const regions = [
        [0, 0, 460, 350],
        [790, 0, 270, 170],
        [630, 160, 110, 100],
        [290, 255, 195, 150],
        [535, 310, 425, 275],
        [940, 0, 732, 545],
        [25, 420, 440, 285],
        [0, 710, 410, 231],
        [365, 790, 140, 151],
        [935, 550, 230, 165],
        [1210, 460, 95, 110],
        [1490, 430, 182, 185],
        [1240, 620, 432, 321],
      ];
      function play() {
        root.querySelector(".love-pieces").innerHTML = regions
          .map(
            ([x, y, w, h], i) =>
              `<div class="dream-piece" style="--reveal:${2 + (i % 4) * 0.65}s;--duration:${10 + (i % 5) * 2}s;--offset:-${i * 1.7}s;--origin:${(x + w / 2) / 16.72}% ${(y + h / 2) / 9.41}%;--x1:${i % 2 ? -3 : 2}vw;--y1:${i % 3 ? -3 : 2}vh;--x2:${i % 2 ? 4 : -4}vw;--y2:${i % 3 ? 4 : -5}vh;--x3:${i % 2 ? -5 : 5}vw;--y3:${i % 3 ? -5 : 4}vh"><svg viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><clipPath id="piece-${i}">${i === 0 ? '<polygon points="0,0 460,0 460,130 300,180 300,350 0,350"/>' : i === 1 ? '<polygon points="790,0 1060,0 1060,45 980,85 980,170 790,170"/>' : i === 7 ? '<polygon points="0,710 410,710 410,790 370,790 370,941 0,941"/>' : i === 5 ? '<polygon points="1060,0 1672,0 1672,425 1480,425 1480,545 1320,545 1320,425 1060,425 1060,330 940,330 940,180 1000,180 1000,60 1060,60"/>' : `<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`}</clipPath></defs><image href="https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/love-hallucination-overlay.png" width="1672" height="941" clip-path="url(#piece-${i})"/></svg></div>`,
          )
          .join("");
        const spots = [
          [12, 19],
          [25, 41],
          [43, 17],
          [62, 29],
          [78, 17],
          [88, 53],
          [15, 66],
          [37, 65],
          [53, 77],
          [72, 69],
          [26, 80],
          [57, 44],
          [8, 46],
          [82, 83],
          [48, 55],
          [66, 14],
        ];
        spots.forEach(([left, top], i) => {
          const n = document.createElement("div");
          n.className = "dream-piece small-heart";
          n.style.cssText = `left:${left}%;top:${top}%;width:${25 + (i % 4) * 8}px;height:${27 + (i % 4) * 8}px;inset:auto;--reveal:${2.6 + (i % 5) * 0.45}s;--duration:${8 + (i % 6) * 1.7}s;--offset:-${i * 1.3}s;--origin:center;--x1:-2vw;--y1:2vh;--x2:3vw;--y2:-4vh;--x3:-3vw;--y3:3vh;`;
          n.style.left = left + "%";
          n.style.top = top + "%";
          n.innerHTML =
            '<svg viewBox="630 160 110 100" aria-hidden="true"><image href="https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/love-hallucination-overlay.png" width="1672" height="941"/></svg>';
          root.querySelector(".love-pieces").append(n);
        });
      }
      play();
    }

    // ===== app.js =====
    const $ = (id) => document.getElementById(id),
      STORAGE = "alchemy101.prototype.v1";
    let state = fresh(),
      selected = null,
      drag = null,
      busy = false,
      bookHistory = [],
      effectToken = 0,
      discoveryTimer,
      catalogIndex = 0,
      currentEntry = null;
    try {
      state = migrate(JSON.parse(sessionStorage.getItem(STORAGE)));
    } catch {}
    function save() {
      try {
        sessionStorage.setItem(STORAGE, JSON.stringify(state));
      } catch {}
    }
    function itemNode(item, source) {
      const node = document.createElement("div");
      node.className = "item" + (canTouch(state, item) ? "" : " forbidden");
      node.innerHTML = art(item);
      node.dataset.item = item;
      node.dataset.source = source;
      node.setAttribute("aria-label", displayName(item));
      node.addEventListener("pointerdown", startDrag);
      node.addEventListener("pointerenter", (e) => {
        if (!drag) tooltip(item, e.clientX, e.clientY);
      });
      node.addEventListener("pointermove", (e) => {
        if (!drag) tooltip(item, e.clientX, e.clientY);
      });
      node.addEventListener("pointerleave", hideTooltip);
      return node;
    }
    function render() {
      $("shelf").replaceChildren();
      for (let i = 0; i < 28; i++) {
        const slot = document.createElement("div");
        slot.className = "slot" + (reserved(state, i) ? " reserved" : "");
        slot.dataset.drop = "slot";
        slot.dataset.index = i;
        slot.setAttribute("aria-label", `Moon slot ${i + 1}`);
        slot.innerHTML = `<span class="moon">${moon(i)}</span>`;
        if (state.slots[i]) slot.append(itemNode(state.slots[i], String(i)));
        $("shelf").append(slot);
      }
      $("basics").replaceChildren();
      for (const item of BASES) {
        const cell = document.createElement("div");
        cell.className = "base-slot";
        cell.dataset.base = item;
        cell.append(itemNode(item, "base"));
        $("basics").append(cell);
      }
      $("contents").replaceChildren();
      for (const m of state.mix) $("contents").append(itemNode(m.item, "mix"));
      $("drink").hidden =
        state.mix.length !== 1 ||
        !DRINKS.has(state.mix[0].item) ||
        busy ||
        !!state.effect ||
        state.dead;
      $("room").classList.toggle("vampire", state.vampire);
      $("status").textContent = state.vampire ? "Something has changed." : "";
      $("death").hidden = !state.dead;
      $("instruction").textContent = state.result
        ? "Add another ingredient, store your creation, or discard it."
        : state.mix.length
          ? "One more ingredient."
          : "Drag two ingredients into the beaker.";
      if (!state.dead && state.discovered.length === ITEMS.length && !state.achievement) {
        state.achievement = true;
        $("achievement").hidden = false;
        setTimeout(() => ($("achievement").hidden = true), 6500);
      }
      save();
    }
    function tooltip(text, x, y) {
      $("tooltip").textContent = displayName(text);
      $("tooltip").style.display = "block";
      $("tooltip").style.left =
        Math.max(8, Math.min(x + 14, innerWidth - $("tooltip").offsetWidth - 10)) + "px";
      $("tooltip").style.top = Math.max(8, Math.min(y + 16, innerHeight - 45)) + "px";
    }
    function hideTooltip() {
      $("tooltip").style.display = "none";
    }
    function startDrag(e) {
      if (busy || state.dead || state.effect || e.button !== 0) return;
      e.preventDefault();
      hideTooltip();
      document
        .querySelectorAll(".selected")
        .forEach((n) => n.classList.remove("selected"));
      selected = e.currentTarget;
      selected.classList.add("selected");
      const item = selected.dataset.item;
      tooltip(item, e.clientX, e.clientY);
      if (!canTouch(state, item)) return;
      drag = {
        node: selected,
        item,
        source: selected.dataset.source,
        x: e.clientX,
        y: e.clientY,
        moved: false,
      };
      selected.setPointerCapture(e.pointerId);
    }
    document.addEventListener("pointermove", (e) => {
      if (!drag) return;
      if (Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 5) drag.moved = true;
      if (!drag.moved) return;
      hideTooltip();
      drag.node.classList.add("dragging");
      const ghost = $("drag-ghost");
      ghost.innerHTML = art(drag.item);
      ghost.style.display = "block";
      ghost.style.left = e.clientX + "px";
      ghost.style.top = e.clientY + "px";
      document
        .querySelectorAll(".drop-hover")
        .forEach((n) => n.classList.remove("drop-hover"));
      const target = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest("[data-drop]");
      target?.classList.add("drop-hover");
    });
    document.addEventListener("pointerup", async (e) => {
      if (!drag) return;
      const d = drag;
      drag = null;
      d.node.classList.remove("dragging");
      $("drag-ghost").style.display = "none";
      document
        .querySelectorAll(".drop-hover")
        .forEach((n) => n.classList.remove("drop-hover"));
      if (!d.moved) return;
      hideTooltip();
      const target = document
        .elementFromPoint(e.clientX, e.clientY)
        ?.closest("[data-drop]");
      if (!target) return;
      if (target.dataset.drop === "beaker" && d.source !== "mix") {
        const outcome = addIngredient(
          state,
          d.item,
          d.source === "base" ? null : Number(d.source),
        );
        if (outcome.type === "failed") {
          busy = true;
          save();
          document.body.classList.add("busy");
          animateReturn(outcome.returning);
          setTimeout(() => {
            busy = false;
            document.body.classList.remove("busy");
            render();
          }, 650);
          return;
        }
        render();
        if (outcome.type === "explosion") {
          runEffect();
          return;
        }
        if (outcome.type === "created") {
          const node = $("contents").firstElementChild;
          node?.classList.add("new-item");
          if (outcome.isNew) {
            $("book").classList.add("unread");
            $("discovery").textContent = displayName(outcome.item);
            $("discovery").classList.remove("flash");
            void $("discovery").offsetWidth;
            $("discovery").classList.add("flash");
            clearTimeout(discoveryTimer);
            discoveryTimer = setTimeout(() => ($("discovery").textContent = ""), 3000);
          }
        }
      } else if (target.dataset.drop === "slot") {
        if (d.source === "mix") storeMix(state, Number(target.dataset.index));
        else if (d.source !== "base")
          moveSlot(state, Number(d.source), Number(target.dataset.index));
        render();
      } else if (target.dataset.drop === "trash" && d.source !== "base") {
        discard(state, d.source === "mix" ? "mix" : Number(d.source));
        render();
      }
    });
    document.addEventListener("pointercancel", () => {
      if (drag) {
        drag.node.classList.remove("dragging");
        drag = null;
      }
      $("drag-ghost").style.display = "none";
      document
        .querySelectorAll(".drop-hover")
        .forEach((n) => n.classList.remove("drop-hover"));
    });
    function animateReturn(materials) {
      const from = $("beaker").getBoundingClientRect();
      for (const m of materials) {
        const dest = (
          m.origin === null
            ? document.querySelector(`[data-base="${m.item}"]`)
            : $("shelf").children[m.origin]
        ).getBoundingClientRect();
        const n = document.createElement("div");
        n.className = "return-ghost";
        n.innerHTML = art(m.item);
        n.style.left = from.left + from.width / 2 - 32 + "px";
        n.style.top = from.top + from.height * 0.65 + "px";
        document.body.append(n);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            n.style.transform = `translate(${dest.left + dest.width / 2 - from.left - from.width / 2}px,${dest.top + dest.height / 2 - from.top - from.height * 0.65 - 32}px)`;
            n.style.opacity = ".3";
          }),
        );
        setTimeout(() => n.remove(), 650);
      }
      $("contents").replaceChildren(...state.mix.map((m) => itemNode(m.item, "mix")));
    }
    function reset() {
      effectToken++;
      busy = false;
      document.body.classList.remove("busy");
      state = fresh();
      state.started = true;
      save();
      $("effect").hidden = true;
      $("journal").hidden = true;
      $("title-screen").hidden = true;
      $("intro").hidden = true;
      $("achievement").hidden = true;
      $("book").classList.remove("unread");
      $("discovery").textContent = "";
      hideTooltip();
      render();
    }
    $("restart").onclick = () => {
      if (
        confirm(
          "Restart this experiment? Your discoveries and stored items will be lost.",
        )
      )
        reset();
    };
    $("again").onclick = reset;
    $("begin").onclick = () => {
      $("title-screen").hidden = true;
      $("intro").hidden = false;
    };
    $("enter").onclick = () => {
      state.started = true;
      $("intro").hidden = true;
      save();
    };
    $("book").onclick = () => {
      if (busy || state.effect) return;
      hideTooltip();
      $("book").classList.remove("unread");
      $("journal").hidden = false;
      bookHistory = [];
      catalogIndex = 0;
      catalog();
    };
    $("close-journal").onclick = () => {
      $("journal").hidden = true;
    };
    $("catalog-tab").onclick = () => {
      bookHistory = [];
      catalog();
    };
    $("book-back").onclick = () => {
      bookHistory.pop();
      if (bookHistory.length) entry(bookHistory.pop());
      else catalog();
    };
    function flip(direction) {
      if (currentEntry) {
        const item = neighbors(state.discovered, currentEntry)[direction];
        if (item) entry(item);
      } else catalog(catalogIndex + (direction === "next" ? 1 : -1));
    }
    $("book-prev").onclick = () => flip("previous");
    $("book-next").onclick = () => flip("next");
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        $("journal").hidden = true;
        hideTooltip();
      }
    });
    function turnPage() {
      const spread = document.querySelector(".open-book");
      spread.classList.remove("turn");
      void spread.offsetWidth;
      spread.classList.add("turn");
    }
    function navigation(previous, next, kind) {
      $("book-prev").disabled = !previous;
      $("book-next").disabled = !next;
      $("book-prev").setAttribute("aria-label", `Previous ${kind}`);
      $("book-next").setAttribute("aria-label", `Next ${kind}`);
    }
    function catalog(index = catalogIndex) {
      currentEntry = null;
      const spread = catalogSpread(state.discovered, index);
      catalogIndex = spread.index;
      turnPage();
      document.querySelector(".open-book").classList.add("catalog-mode");
      $("book-back").hidden = true;
      navigation(spread.previous, spread.next, "catalog spread");
      for (const [side, list] of [
        ["left", spread.left],
        ["right", spread.right],
      ]) {
        const page = $(side + "-page");
        page.scrollTop = 0;
        page.innerHTML =
          (side === "left" && catalogIndex === 0 ? "<h2>Catalog</h2>" : "") +
          `<div class="catalog-list" style="--rows:${side === "left" && catalogIndex === 0 ? 8 : 12}"></div>`;
        for (const item of list) {
          const b = document.createElement("button");
          b.textContent = displayName(item);
          b.onclick = () => entry(item);
          page.querySelector(".catalog-list").append(b);
        }
      }
    }
    function entry(item) {
      if (!state.discovered.includes(item)) return;
      turnPage();
      document.querySelector(".open-book").classList.remove("catalog-mode");
      currentEntry = item;
      const adjacent = neighbors(state.discovered, item);
      navigation(adjacent.previous, adjacent.next, "item");
      bookHistory.push(item);
      $("book-back").hidden = false;
      $("left-page").scrollTop = 0;
      $("right-page").scrollTop = 0;
      $("left-page").innerHTML =
        `<h2>${displayName(item)}</h2><div class="specimen">${art(item)}</div>`;
      const desc =
        descriptions[item] ||
        "A preparation of uncertain composition. The confidence of its maker is not a scientific instrument.";
      $("right-page").innerHTML =
        `<h2>${displayName(item)}</h2><p>${desc}</p><h3>Known recipes</h3><div id="recipes"></div>`;
      const tried = RECIPES.filter((r) => r.out === item && state.known.includes(r.id));
      if (state.known.includes([item, item].join("|")))
        tried.push({ a: item, b: item, out: item });
      if (!tried.length) {
        const p = document.createElement("p");
        p.className = "catalog-intro";
        p.textContent = BASES.includes(item)
          ? "Present at the beginning."
          : "No mixing recipe recorded.";
        $("recipes").append(p);
      }
      for (const r of tried) {
        const row = document.createElement("div");
        row.className = "recipe";
        for (const [i, ing] of [r.a, r.b].entries()) {
          if (i) {
            const plus = document.createElement("span");
            plus.textContent = "+";
            row.append(plus);
          }
          const b = document.createElement("button");
          b.textContent = displayName(ing);
          b.onclick = () => entry(ing);
          row.append(b);
        }
        const equal = document.createElement("span");
        equal.textContent = "=";
        row.append(equal, document.createTextNode(displayName(item)));
        $("recipes").append(row);
      }
    }
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    $("drink").onclick = () => {
      hideTooltip();
      const outcome = drink(state);
      save();
      render();
      if (outcome === "vampire") {
        $("discovery").textContent = "Congratulation, you are now an Vampire";
        setTimeout(() => ($("discovery").textContent = ""), 4000);
      }
      if (state.effect) runEffect();
    };
    // Distort the actual room, progressively, rather than placing symbols over it.
    async function distortRoom(alive) {
      const room = $("room"),
        reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.style.position = "absolute";
      svg.innerHTML =
        '<defs><filter id="intoxication-ripple" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="1" seed="8" result="waves"/><feDisplacementMap in="SourceGraphic" in2="waves" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
      document.body.append(svg);
      const noise = svg.querySelector("feTurbulence"),
        displacement = svg.querySelector("feDisplacementMap");
      room.classList.add("intoxicated");
      try {
        await new Promise((resolve) => {
          let start;
          const frame = (now) => {
            if (!alive()) {
              resolve();
              return;
            }
            start ??= now;
            const t = Math.min((now - start) / 10000, 1),
              phase = 2 * Math.PI * (0.22 * 10 * t + (1.4 * 10 * t * t) / 2);
            noise.setAttribute(
              "baseFrequency",
              0.005 +
                Math.sin(phase) * 0.0018 +
                " " +
                (0.008 + Math.cos(phase * 0.73) * 0.0025),
            );
            displacement.setAttribute("scale", reduced ? 0 : 4 + 95 * t * t);
            room.style.filter =
              (reduced ? "" : "url(#intoxication-ripple) ") +
              "blur(" +
              t * t * 7 +
              "px) brightness(" +
              (room.classList.contains("vampire") ? 0.65 : 1) * (1 - 0.92 * t) +
              ")";
            room.style.transform = reduced
              ? "none"
              : "scale(" +
                (1.035 + 0.065 * t) +
                ") rotate(" +
                Math.sin(phase) * t * 1.4 +
                "deg) skewX(" +
                Math.cos(phase * 0.8) * t * 3 +
                "deg)";
            if (t >= 1) resolve();
            else requestAnimationFrame(frame);
          };
          requestAnimationFrame(frame);
        });
      } finally {
        room.style.removeProperty("filter");
        room.style.removeProperty("transform");
        room.classList.remove("intoxicated");
        svg.remove();
      }
    }
    async function runEffect() {
      const token = ++effectToken;
      const e = state.effect;
      if (!e) return;
      if (e.type === "visions" && !state.mix.length) {
        state.mix = [{ item: e.vessel || "Glass Vessel", origin: null }];
        state.result = true;
        render();
      }
      busy = true;
      document.body.classList.add("busy");
      $("drink").hidden = true;
      $("effect").hidden = false;
      $("story").textContent = "";
      $("hallucinations").innerHTML = "";
      const alive = () => token === effectToken;
      if (e.type === "explosion") {
        $("effect").className = "effect explosion";
        await delay(1100);
      } else {
        $("effect").className = "effect " + (e.type === "love" ? "love" : "visions");
        if (e.type === "love") {
          await mountLoveEffect($("hallucinations"));
          if (!alive()) return;
        }
        if (e.type === "love") await delay(LOVE_EFFECT_DURATION);
        else await distortRoom(alive);
        if (!alive()) return;
        $("effect").className = "effect blackout";
        $("hallucinations").replaceChildren();
        if (e.type === "love") {
          await delay(900);
          if (!alive()) return;
          $("effect").className = "effect story";
          const narrative = e.fatal
            ? "You leave your basement with a declaration of eternal love prepared. The front door opens. Sunlight falls across your hands. You never reach their house."
            : "You leave your basement and hurry to your crush’s home. At their door, you confess your eternal love. They find this REALLY WEIRD and turn you down. You refuse to leave. They call the police. You spend five days at the police station, explaining that this is all a misunderstanding. Eventually, the potion wears off. You are back in your basement. Your research has made no meaningful contribution to romance.";
          for (const letter of narrative) {
            if (!alive()) return;
            $("story").textContent += letter;
            await delay(45);
          }
          await delay(1800);
        } else await delay(5000);
      }
      if (!alive()) return;
      finishEffect(state);
      busy = false;
      document.body.classList.remove("busy");
      $("effect").hidden = true;
      render();
    }
    render();
    $("title-screen").hidden = state.started || state.dead;
    if (state.effect) {
      $("title-screen").hidden = true;
      runEffect();
    }
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", startAlchemy, { once: true });
  else startAlchemy();
})();
