import {test} from 'node:test';import assert from 'node:assert/strict';import {BASES,fresh,addIngredient,finishEffect,migrate} from '../game.js';
test('fire and campfire ignite gunpowder and bombs in both orders, including chained results',()=>{
 for(const heat of ['Fire','Campfire'])for(const explosive of ['Gunpowder','Bomb'])for(const reverse of [false,true])for(const chained of [false,true]){
  const s=fresh();s.started=true;s.discovered.push(explosive);s.slots[10]='Stone';const [a,b]=reverse?[heat,explosive]:[explosive,heat];
  if(chained){s.mix=[{item:a,origin:null}];s.result=true;}else{s.slots[0]=a;assert.equal(addIngredient(s,a,0).type,'added');}
  s.slots[1]=b;assert.equal(addIngredient(s,b,1).type,'explosion');assert.equal(s.effect.type,'explosion');assert(!s.dead);assert.equal(addIngredient(s,'Water').type,'blocked');
  const recovered=migrate(s);finishEffect(recovered);assert(recovered.dead);assert.equal(recovered.effect,null);assert(recovered.slots.every(x=>x===null));assert.deepEqual(recovered.discovered,BASES);assert.equal(recovered.started,true);
 }
});
test('making gunpowder from fire and dust does not detonate it',()=>{const s=fresh();s.slots[0]='Dust';addIngredient(s,'Dust',0);assert.equal(addIngredient(s,'Fire').item,'Gunpowder');assert.equal(s.effect,null);});
