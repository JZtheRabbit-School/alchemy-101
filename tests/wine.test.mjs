import {test} from 'node:test';import assert from 'node:assert/strict';
import {combine,fresh,drink,finishEffect,DRINKS} from '../game.js';
test('Jesus purifies loose and contained cursed blood',()=>{for(const item of ['Cursed Blood','A Glass of Cursed Blood','A Pot of Cursed Blood'])assert.equal(combine(item,'Jesus'),'Sacred Blood');});
test('Wine shares intoxication and returns its Glass Vessel',()=>{assert(DRINKS.has('Wine'));for(const vampire of [false,true]){const s=fresh();s.vampire=vampire;s.mix=[{item:'Wine',origin:null}];assert.equal(drink(s),'visions');assert.equal(s.effect.type,'visions');assert(!s.effect.fatal);finishEffect(s);assert(!s.dead);assert.equal(s.mix[0].item,'Glass Vessel');assert.equal(s.vampire,vampire);}});
