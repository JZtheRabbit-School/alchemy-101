export const BASES=['Fire','Water','Air','Earth'];
export const HOT=new Set(['Fire','Lightning','Magma','Campfire','Molotov Cocktail']);
export const HOLY=new Set(['Sacred Blood','Jesus','Cross','Holy Water']);
export const ELIXIRS=['Elixir(?) · I','Elixir(?) · II'];
const rows=[
['Fire','Air','Lightning'],['Fire','Earth','Magma'],['Air','Earth','Dust'],['Air','Water','Cloud'],['Earth','Water','Clay'],['Cloud','Earth','Plant'],['Magma','Water/Air','Stone'],['Clay','Fire','Pot'],['Dust','Fire/Lightning','Gunpowder'],['Plant','Water','Algae'],['Algae','Water','Frog Eggs'],['Stone','Fire','Metal'],['Metal','Fire','Blade'],['Metal','Lightning','Wire'],['Gunpowder','Wire','Bomb'],['Blade/Knife','Plant','Wood'],['Blade','Wood','Knife'],['Blade','Lightning','Blender'],['Frog Eggs','Water','Frog'],['Frog','Lightning','Twitching Frog Legs'],['Wood','Fire','Campfire'],['Campfire','Air','Coal'],['Coal','Fire','Diamond'],['Air','Stone','Sand'],['Sand','Fire','Glass'],['Wire','Glass','Light Bulb'],['Light Bulb','Lightning','Lightened Light Bulb'],['Glass','Fire','Bottle'],['Bottle','Water','A Glass of Water'],['Pot','Water','A Pot of Water'],['A Pot of Water','Frog Eggs','A Pot of Frog'],['A Glass of Water','Frog Eggs','A Glass of Frog'],['Earth','Plant','Mushroom'],['Algae','Mushroom','Lichen'],['Lichen','Stone','Sand'],['Mushroom','A Glass of Water','Potion'],['A Glass of Water/A Pot of Water','Flower','Vase'],['Mushroom','Air','Flies'],['Flies','Plant','Flower'],['Frog/Shark','Knife/Blade','Blood'],['Potion','Blood','Curse'],['Flower','Potion','Love Potion'],['Blood','Water','Shark'],['Twitching Frog Legs/Frog','Fire','Cooked Meat'],['Cooked Meat','A Pot of Water','Broth'],['Algae','Wood','Moss'],['Blood','Plant','Man Eating Plant'],['Curse','Shark','Six-headed Shark'],['Curse','Flies','Poison'],['Flies','Flower','Seeds'],['Seeds','Earth','Plant'],['Seeds','Stone','Flour'],['Flour','Water','Dough'],['Dough','Fire','Bread'],['Seeds','A Glass of Water','Vodka'],['Vodka','Fire','Molotov Cocktail'],['Lightning','Plant/Wood','Fire'],['Man Eating Plant','Six-headed Shark','Unicorn'],['Unicorn','Blade/Knife','Cursed Blood'],['Unicorn','Bread/Broth','Sacred Blood'],['Sacred Blood','Love Potion',ELIXIRS[0]],['Poison','Cursed Blood',ELIXIRS[1]]];
// Rename materials without creating extra discoveries.
for(const row of rows)for(let i=0;i<3;i++)row[i]=row[i].split('/').map(x=>x==='Glass'?'Glass Pane':x==='Bottle'?'Glass Vessel':x).join('/');
rows.splice(rows.findIndex(r=>r[0]==='Unicorn'&&r[1]==='Bread/Broth'),1);
rows.push(['Jesus','Wine','A Glass of Sacred Blood'],['Blood','Curse','Cursed Blood'],['Bread','Mushroom','Mold'],['Grape','Mushroom','Mold'],['Mold','Curse','Poison'],['Cursed Blood','Jesus','Blood'],['Blood','Jesus','Sacred Blood'],['A Pot of Frog/A Glass of Frog','Stone','Frog'],['Plant','Sand','Vine'],['Vine','Water','Grape'],['Grape','Blender','Pulp'],['Pulp','A Glass of Water','Wine'],['Bread','Wine','Jesus'],['Jesus','Unicorn','Sacred Blood'],['Jesus','Wood','Cross'],['Jesus','Water','Holy Water'],['Jesus','A Glass of Water','A Glass of Holy Water'],['Jesus','A Pot of Water','A Pot of Holy Water'],['Vine','Flies','Flower'],['Grape','Earth','Vine'],['Frog','Flies','Frog'],['Grape','Fire','Raisins'],['Bread','Raisins','Raisins Bread']);
export const CONTAINED={};
for(const liquid of ['Blood','Cursed Blood','Sacred Blood','Holy Water'])for(const [prefix,vessel] of [['A Glass of ','Glass Vessel'],['A Pot of ','Pot']]){
 const name=prefix+liquid;CONTAINED[name]={liquid,vessel};rows.push([liquid,vessel,name]);
}
export const key=(a,b)=>[a,b].sort().join('|');
export const RECIPES=[];
for(const [aa,bb,out] of rows)for(const a of aa.split('/'))for(const b of bb.split('/'))RECIPES.push({a,b,out,id:key(a,b)});
// A container of blood can substitute for its loose drop. Record the actual tried pair.
for(const recipe of [...RECIPES])for(const [name,{liquid}] of Object.entries(CONTAINED)){
 if(liquid==='Holy Water')continue;
 const partner=recipe.a===liquid?recipe.b:recipe.a;
 const preservesVessel=(liquid==='Blood'&&partner==='Curse')||(['Blood','Cursed Blood'].includes(liquid)&&partner==='Jesus');
 const output=preservesVessel?name.slice(0,-liquid.length)+recipe.out:recipe.out;
 if(recipe.a===liquid&&!['Glass Vessel','Pot'].includes(recipe.b))RECIPES.push({a:name,b:recipe.b,out:output,id:key(name,recipe.b)});
 if(recipe.b===liquid&&!['Glass Vessel','Pot'].includes(recipe.a))RECIPES.push({a:recipe.a,b:name,out:output,id:key(recipe.a,name)});
}
export const ITEMS=[...new Set([...BASES,...RECIPES.flatMap(r=>[r.a,r.b,r.out])])];
const lookup=new Map(RECIPES.map(r=>[r.id,r.out]));
export function combine(a,b){return a===b?a:lookup.get(key(a,b))||null;}
export function fresh(){return {version:2,slots:Array(28).fill(null),mix:[],result:false,discovered:[...BASES],known:[],vampire:false,dead:false,started:false,effect:null,achievement:false};}
export function migrate(saved){
 if(!saved||![1,2].includes(saved.version))return fresh();
 const rename=x=>x==='Glass'?'Glass Pane':x==='Bottle'?'Glass Vessel':x;
 const s=structuredClone(saved);
 const poisonName=x=>x==='Gu Poison'?'Poison':x;
 s.slots=s.slots.map(x=>x&&poisonName(x));s.mix=s.mix.map(m=>({...m,item:poisonName(m.item)}));s.discovered=[...new Set(s.discovered.map(poisonName))];s.known=s.known.map(id=>id.split('|').map(poisonName).sort().join('|'));
 if(s.discovered.length<ITEMS.length)s.achievement=false;
 if(s.version===1){s.slots=s.slots.map(x=>x&&rename(x));s.mix=s.mix.map(m=>({...m,item:rename(m.item)}));s.discovered=[...new Set(s.discovered.map(rename))];s.known=s.known.map(id=>id.split('|').map(rename).sort().join('|')).filter(id=>RECIPES.some(r=>r.id===id)||id.split('|')[0]===id.split('|')[1]);s.achievement=false;s.version=2;}
 if(s.slots?.length!==28||s.slots.some(x=>x!==null&&!ITEMS.includes(x))||s.mix.length>1||s.mix.some(m=>!ITEMS.includes(m.item))||s.discovered.some(x=>!ITEMS.includes(x)))return fresh();
 return s;
}
export const canTouch=(s,item)=>!s.vampire||!HOT.has(item)&&!HOLY.has(item);
export const reserved=(s,index)=>s.mix.some(m=>m.origin===index);
export function discover(s,item,a,b){const isNew=!s.discovered.includes(item);if(isNew)s.discovered.push(item);if(a&&b){const id=key(a,b);if(!s.known.includes(id))s.known.push(id);}return isNew;}
export function addIngredient(s,item,origin=null){
 if(s.dead||s.effect||s.mix.length>=2||!canTouch(s,item)||s.mix.some(m=>!canTouch(s,m.item)))return {type:'blocked'};
 if(origin===null){if(!BASES.includes(item))return {type:'blocked'};}else if(s.slots[origin]!==item||reserved(s,origin))return {type:'blocked'};
 if(origin!==null)s.slots[origin]=null;
 const hadResult=s.result;
 s.mix.push({item,origin});
 if(s.mix.length===1)return {type:'added'};
 const [a,b]=s.mix;
 if(([a.item,b.item].some(x=>['Fire','Campfire'].includes(x)))&&([a.item,b.item].some(x=>['Gunpowder','Bomb'].includes(x)))){s.mix=[];s.result=false;s.effect={type:'explosion'};return {type:'explosion'};}
 const out=combine(a.item,b.item);
 if(!out){const returning=hadResult?[b]:[a,b];for(const m of returning)if(m.origin!==null)s.slots[m.origin]=m.item;s.mix=hadResult?[a]:[];s.result=hadResult;return {type:'failed',returning};}
 const isNew=discover(s,out,a.item,b.item);s.mix=[{item:out,origin:null}];s.result=true;
 return {type:'created',item:out,isNew};
}
export function moveSlot(s,from,to){if(s.effect||s.dead||!s.slots[from]||!canTouch(s,s.slots[from])||s.slots[to]||reserved(s,to))return false;s.slots[to]=s.slots[from];s.slots[from]=null;return true;}
export function storeMix(s,to){if(s.dead||s.effect||s.mix.length!==1||s.slots[to]||reserved(s,to)&&s.mix[0].origin!==to||!canTouch(s,s.mix[0].item))return false;s.slots[to]=s.mix[0].item;s.mix=[];s.result=false;return true;}
export function discard(s,source){if(s.dead||s.effect)return false;if(source==='mix'){if(s.mix.length!==1||!canTouch(s,s.mix[0].item))return false;s.mix=[];s.result=false;return true;}if(!s.slots[source]||!canTouch(s,s.slots[source]))return false;s.slots[source]=null;return true;}
export const DRINKS=new Set(['Water','Magma','A Glass of Water','A Pot of Water','Potion','Love Potion','Blood','Cursed Blood','Sacred Blood','Holy Water','Broth','Vodka','Wine','Poison','Curse',...ELIXIRS,...Object.keys(CONTAINED)]);
const VESSELS={'A Glass of Water':'Glass Vessel','A Pot of Water':'Pot',Potion:'Glass Vessel','Love Potion':'Glass Vessel',Vodka:'Glass Vessel',Wine:'Glass Vessel',Broth:'Pot',Poison:'Glass Vessel',Curse:'Glass Vessel'};
export function kill(s){const started=s.started;Object.assign(s,fresh(),{dead:true,started});}
export function drink(s){
 if(s.dead||s.effect||s.mix.length!==1||!DRINKS.has(s.mix[0].item))return null;
 const item=s.mix[0].item,liquid=CONTAINED[item]?.liquid||item,empty=CONTAINED[item]?.vessel||VESSELS[item];s.mix=[];s.result=false;
 if(liquid==='Curse'||liquid==='Poison'&&!s.vampire||['Magma','Cursed Blood',...ELIXIRS].includes(liquid)||['Sacred Blood','Holy Water'].includes(liquid)&&s.vampire){if(liquid==='Cursed Blood'){s.effect={type:'explosion'};return 'explosion';}kill(s);return 'death';}
 if(['Potion','Vodka','Wine','Love Potion','Poison'].includes(liquid)){s.mix=[{item:empty,origin:null}];s.result=true;discover(s,empty);s.effect={type:liquid==='Love Potion'?'love':'visions',fatal:liquid==='Love Potion'&&s.vampire,vessel:empty};return s.effect.type;}
 if(empty){s.mix=[{item:empty,origin:null}];s.result=true;discover(s,empty);}
 if(liquid==='Blood'){s.vampire=true;return 'vampire';}
 return 'consumed';
}
export function finishEffect(s){const effect=s.effect;if(!effect)return;if(effect.fatal||effect.type==='explosion'){kill(s);return;}const vessel=effect.vessel||'Glass Vessel';s.effect=null;s.mix=[{item:vessel,origin:null}];s.result=true;discover(s,vessel);}


export const displayName=item=>ELIXIRS.includes(item)?"Elixir(?)":item;


