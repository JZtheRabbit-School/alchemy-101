import {test} from 'node:test';import assert from 'node:assert/strict';import {existsSync} from 'node:fs';
import {ITEMS,HOLY,CONTAINED,fresh,migrate,key,combine,canTouch,addIngredient,storeMix,moveSlot,discard,drink,finishEffect,RECIPES} from '../game.js';
import {sprites} from '../art-map.js';import {descriptions} from '../descriptions.js';
test('new crafting chain and replaced sacred recipe',()=>{
 for(const [a,b,out] of [['Sand','Fire','Glass Pane'],['Glass Pane','Fire','Glass Vessel'],['Plant','Sand','Vine'],['Vine','Water','Grape'],['Grape','Blender','Pulp'],['Pulp','A Glass of Water','Wine'],['Bread','Wine','Jesus'],['Jesus','Unicorn','Sacred Blood'],['Jesus','Wood','Cross'],['Grape','Fire','Raisins'],['Bread','Raisins','Raisins Bread'],['Vine','Flies','Flower'],['Grape','Earth','Vine'],['Frog','Flies','Frog']])assert.equal(combine(a,b),out);
 assert.equal(combine('Unicorn','Bread'),null);assert.equal(combine('Unicorn','Broth'),null);
});
test('all blood vessels are usable recipe substitutes and record actual ingredients',()=>{
 for(const [name,{liquid,vessel}] of Object.entries(CONTAINED)){
  assert.equal(combine(liquid,vessel),name);
  if(liquid==='Holy Water')continue;
  const partner=liquid==='Blood'?'Plant':liquid==='Sacred Blood'?'Love Potion':'Poison';
  const s=fresh();s.slots[0]=name;s.slots[1]=partner;addIngredient(s,name,0);const r=addIngredient(s,partner,1);
  assert.equal(r.item,combine(liquid,partner));assert(s.known.includes(key(name,partner)));assert(!s.known.includes(key(liquid,partner)));
 }
});
test('frog containers break; ingredients are consumed; frog eats flies',()=>{
 for(const c of ['A Glass of Frog','A Pot of Frog']){const s=fresh();s.slots[0]=c;s.slots[1]='Stone';addIngredient(s,c,0);addIngredient(s,'Stone',1);assert.equal(s.mix[0].item,'Frog');assert(s.slots.every(x=>x===null));}
 const s=fresh();s.slots[0]='Frog';s.slots[1]='Flies';addIngredient(s,'Frog',0);addIngredient(s,'Flies',1);assert.equal(s.mix[0].item,'Frog');assert.equal(s.slots.filter(Boolean).length,0);
});
test('holy touch restrictions, protected vessels, fatal holy drinking',()=>{
 const s=fresh();s.vampire=true;
 for(const item of HOLY){s.slots[0]=item;assert(!canTouch(s,item));assert.equal(addIngredient(s,item,0).type,'blocked');assert(!moveSlot(s,0,1));assert(!discard(s,0));}
 for(const name of ['A Glass of Holy Water','A Pot of Holy Water','A Glass of Sacred Blood','A Pot of Sacred Blood']){
  assert(canTouch(s,name));const v=fresh();v.vampire=true;v.slots[0]=name;assert.equal(addIngredient(v,name,0).type,'added');assert.equal(drink(v),'death');assert(v.dead);
  const human=fresh();human.mix=[{item:name}];drink(human);assert(!human.dead);assert.equal(human.mix[0].item,CONTAINED[name].vessel);
 }
 assert(canTouch(s,'Unicorn'));assert(canTouch(s,'Elixir(?) · I'));
});
test('contained blood transformation leaves correct empty vessel and no loose companion',()=>{
 for(const name of ['Blood','A Glass of Blood','A Pot of Blood']){const s=fresh();s.mix=[{item:name}];drink(s);assert(s.vampire);assert.equal(s.mix.length,name==='Blood'?0:1);if(s.mix.length)assert.equal(s.mix[0].item,CONTAINED[name].vessel);}
});
test('drink containers and delayed effects leave vessels, never flat glass',()=>{
 for(const name of ['Potion','Love Potion','Vodka']){const s=fresh();s.mix=[{item:name}];drink(s);finishEffect(s);assert.equal(s.mix[0].item,'Glass Vessel');}
 const s=fresh();s.mix=[{item:'Broth'}];drink(s);assert.equal(s.mix[0].item,'Pot');
});
test('every item has artwork, existing asset, and description',()=>{assert.equal(ITEMS.length,81);for(const item of ITEMS){assert(sprites[item],item);assert(existsSync(new URL('../'+sprites[item].path,import.meta.url)),item);assert(descriptions[item]||item.startsWith('Elixir'),item);}});
test('legacy run migrates names and recipe history without losing inventory',()=>{
 const s=fresh();s.version=1;s.slots[0]='Glass';s.slots[2]='Bottle';s.mix=[{item:'Bottle',origin:2}];s.slots[2]=null;s.discovered.push('Glass','Bottle');s.known=[key('Sand','Fire'),key('Glass','Fire'),key('Unicorn','Bread')];s.achievement=true;
 const m=migrate(s);assert.equal(m.version,2);assert.equal(m.slots[0],'Glass Pane');assert.equal(m.mix[0].item,'Glass Vessel');assert(m.discovered.includes('Glass Vessel'));assert(m.known.includes(key('Glass Pane','Fire')));assert(!m.known.includes(key('Unicorn','Bread')));assert.equal(m.achievement,false);
});
