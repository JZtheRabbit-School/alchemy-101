import {mountLoveEffect,LOVE_EFFECT_DURATION} from './love-effect.js';
import {displayName,BASES,ITEMS,RECIPES,ELIXIRS,fresh,migrate,canTouch,reserved,addIngredient,storeMix,moveSlot,discard,DRINKS,drink,finishEffect} from './game.js';
import {art,moon} from './art.js';
import {descriptions} from './descriptions.js';
import {catalogSpread,neighbors} from './journal.js';
const $=id=>document.getElementById(id), STORAGE='alchemy101.prototype.v1';
let state=fresh(),selected=null,drag=null,busy=false,bookHistory=[],effectToken=0,discoveryTimer,catalogIndex=0,currentEntry=null;
try{state=migrate(JSON.parse(sessionStorage.getItem(STORAGE)));}catch{}
function save(){try{sessionStorage.setItem(STORAGE,JSON.stringify(state));}catch{}}
function itemNode(item,source){const node=document.createElement('div');node.className='item'+(canTouch(state,item)?'':' forbidden');node.innerHTML=art(item);node.dataset.item=item;node.dataset.source=source;node.setAttribute('aria-label',displayName(item));node.addEventListener('pointerdown',startDrag);node.addEventListener('pointerenter',e=>{if(!drag)tooltip(item,e.clientX,e.clientY);});node.addEventListener('pointermove',e=>{if(!drag)tooltip(item,e.clientX,e.clientY);});node.addEventListener('pointerleave',hideTooltip);return node;}
function render(){
 $('shelf').replaceChildren();for(let i=0;i<28;i++){const slot=document.createElement('div');slot.className='slot'+(reserved(state,i)?' reserved':'');slot.dataset.drop='slot';slot.dataset.index=i;slot.setAttribute('aria-label',`Moon slot ${i+1}`);slot.innerHTML=`<span class="moon">${moon(i)}</span>`;if(state.slots[i])slot.append(itemNode(state.slots[i],String(i)));$('shelf').append(slot);}
 $('basics').replaceChildren();for(const item of BASES){const cell=document.createElement('div');cell.className='base-slot';cell.dataset.base=item;cell.append(itemNode(item,'base'));$('basics').append(cell);}
 $('contents').replaceChildren();for(const m of state.mix)$('contents').append(itemNode(m.item,'mix'));
 $('drink').hidden=state.mix.length!==1||!DRINKS.has(state.mix[0].item)||busy||!!state.effect||state.dead;
 $('room').classList.toggle('vampire',state.vampire);$('status').textContent=state.vampire?'Something has changed.':'';
 $('death').hidden=!state.dead;$('instruction').textContent=state.result?'Add another ingredient, store your creation, or discard it.':state.mix.length?'One more ingredient.':'Drag two ingredients into the beaker.';
 if(!state.dead&&state.discovered.length===ITEMS.length&&!state.achievement){state.achievement=true;$('achievement').hidden=false;setTimeout(()=>$('achievement').hidden=true,6500);}
 save();
}
function tooltip(text,x,y){$('tooltip').textContent=displayName(text);$('tooltip').style.display='block';$('tooltip').style.left=Math.max(8,Math.min(x+14,innerWidth-$('tooltip').offsetWidth-10))+'px';$('tooltip').style.top=Math.max(8,Math.min(y+16,innerHeight-45))+'px';}
function hideTooltip(){$('tooltip').style.display='none';}
function startDrag(e){
 if(busy||state.dead||state.effect||e.button!==0)return;e.preventDefault();hideTooltip();document.querySelectorAll('.selected').forEach(n=>n.classList.remove('selected'));selected=e.currentTarget;selected.classList.add('selected');
 const item=selected.dataset.item;tooltip(item,e.clientX,e.clientY);if(!canTouch(state,item))return;
 drag={node:selected,item,source:selected.dataset.source,x:e.clientX,y:e.clientY,moved:false};selected.setPointerCapture(e.pointerId);
}
document.addEventListener('pointermove',e=>{
 if(!drag)return;if(Math.hypot(e.clientX-drag.x,e.clientY-drag.y)>5)drag.moved=true;if(!drag.moved)return;hideTooltip();drag.node.classList.add('dragging');const ghost=$('drag-ghost');ghost.innerHTML=art(drag.item);ghost.style.display='block';ghost.style.left=e.clientX+'px';ghost.style.top=e.clientY+'px';
 document.querySelectorAll('.drop-hover').forEach(n=>n.classList.remove('drop-hover'));const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-drop]');target?.classList.add('drop-hover');
});
document.addEventListener('pointerup',async e=>{
 if(!drag)return;const d=drag;drag=null;d.node.classList.remove('dragging');$('drag-ghost').style.display='none';document.querySelectorAll('.drop-hover').forEach(n=>n.classList.remove('drop-hover'));if(!d.moved)return;hideTooltip();
 const target=document.elementFromPoint(e.clientX,e.clientY)?.closest('[data-drop]');if(!target)return;
 if(target.dataset.drop==='beaker'&&d.source!=='mix'){
  const outcome=addIngredient(state,d.item,d.source==='base'?null:Number(d.source));
  if(outcome.type==='failed'){busy=true;save();document.body.classList.add('busy');animateReturn(outcome.returning);setTimeout(()=>{busy=false;document.body.classList.remove('busy');render();},650);return;}
  render();if(outcome.type==='explosion'){runEffect();return;}if(outcome.type==='created'){const node=$('contents').firstElementChild;node?.classList.add('new-item');if(outcome.isNew){$('book').classList.add('unread');$('discovery').textContent=displayName(outcome.item);$('discovery').classList.remove('flash');void $('discovery').offsetWidth;$('discovery').classList.add('flash');clearTimeout(discoveryTimer);discoveryTimer=setTimeout(()=>$('discovery').textContent='',3000);}}
 }else if(target.dataset.drop==='slot'){
  if(d.source==='mix')storeMix(state,Number(target.dataset.index));else if(d.source!=='base')moveSlot(state,Number(d.source),Number(target.dataset.index));render();
 }else if(target.dataset.drop==='trash'&&d.source!=='base'){discard(state,d.source==='mix'?'mix':Number(d.source));render();}
});
document.addEventListener('pointercancel',()=>{if(drag){drag.node.classList.remove('dragging');drag=null;}$('drag-ghost').style.display='none';document.querySelectorAll('.drop-hover').forEach(n=>n.classList.remove('drop-hover'));});
function animateReturn(materials){
 const from=$('beaker').getBoundingClientRect();for(const m of materials){const dest=(m.origin===null?document.querySelector(`[data-base="${m.item}"]`):$('shelf').children[m.origin]).getBoundingClientRect();const n=document.createElement('div');n.className='return-ghost';n.innerHTML=art(m.item);n.style.left=(from.left+from.width/2-32)+'px';n.style.top=(from.top+from.height*.65)+'px';document.body.append(n);requestAnimationFrame(()=>requestAnimationFrame(()=>{n.style.transform=`translate(${dest.left+dest.width/2-from.left-from.width/2}px,${dest.top+dest.height/2-from.top-from.height*.65-32}px)`;n.style.opacity='.3';}));setTimeout(()=>n.remove(),650);}
 $('contents').replaceChildren(...state.mix.map(m=>itemNode(m.item,'mix')));
}
function reset(){effectToken++;busy=false;document.body.classList.remove('busy');state=fresh();state.started=true;save();$('effect').hidden=true;$('journal').hidden=true;$('title-screen').hidden=true;$('intro').hidden=true;$('achievement').hidden=true;$('book').classList.remove('unread');$('discovery').textContent='';hideTooltip();render();}
 $('restart').onclick=()=>{if(confirm('Restart this experiment? Your discoveries and stored items will be lost.'))reset();};$('again').onclick=reset;
 $('begin').onclick=()=>{$('title-screen').hidden=true;$('intro').hidden=false;};$('enter').onclick=()=>{state.started=true;$('intro').hidden=true;save();};
 $('book').onclick=()=>{if(busy||state.effect)return;hideTooltip();$('book').classList.remove('unread');$('journal').hidden=false;bookHistory=[];catalogIndex=0;catalog();};$('close-journal').onclick=()=>{$('journal').hidden=true;};$('catalog-tab').onclick=()=>{bookHistory=[];catalog();};$('book-back').onclick=()=>{bookHistory.pop();if(bookHistory.length)entry(bookHistory.pop());else catalog();};
 function flip(direction){if(currentEntry){const item=neighbors(state.discovered,currentEntry)[direction];if(item)entry(item);}else catalog(catalogIndex+(direction==='next'?1:-1));}
 $('book-prev').onclick=()=>flip('previous');$('book-next').onclick=()=>flip('next');
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('journal').hidden=true;hideTooltip();}});
function turnPage(){const spread=document.querySelector('.open-book');spread.classList.remove('turn');void spread.offsetWidth;spread.classList.add('turn');}
function navigation(previous,next,kind){$('book-prev').disabled=!previous;$('book-next').disabled=!next;$('book-prev').setAttribute('aria-label',`Previous ${kind}`);$('book-next').setAttribute('aria-label',`Next ${kind}`);}
function catalog(index=catalogIndex){
 currentEntry=null;const spread=catalogSpread(state.discovered,index);catalogIndex=spread.index;turnPage();document.querySelector('.open-book').classList.add('catalog-mode');
 $('book-back').hidden=true;navigation(spread.previous,spread.next,'catalog spread');
 for(const [side,list] of [['left',spread.left],['right',spread.right]]){
  const page=$(side+'-page');page.scrollTop=0;page.innerHTML=(side==='left'&&catalogIndex===0?'<h2>Catalog</h2>':'')+`<div class="catalog-list" style="--rows:${side==='left'&&catalogIndex===0?8:12}"></div>`;
  for(const item of list){const b=document.createElement('button');b.textContent=displayName(item);b.onclick=()=>entry(item);page.querySelector('.catalog-list').append(b);}
 }
}
function entry(item){
 if(!state.discovered.includes(item))return;turnPage();document.querySelector('.open-book').classList.remove('catalog-mode');currentEntry=item;const adjacent=neighbors(state.discovered,item);navigation(adjacent.previous,adjacent.next,'item');bookHistory.push(item);$('book-back').hidden=false;
 $('left-page').scrollTop=0;$('right-page').scrollTop=0;
 $('left-page').innerHTML=`<h2>${displayName(item)}</h2><div class="specimen">${art(item)}</div>`;
 const desc=descriptions[item]||'A preparation of uncertain composition. The confidence of its maker is not a scientific instrument.';
 $('right-page').innerHTML=`<h2>${displayName(item)}</h2><p>${desc}</p><h3>Known recipes</h3><div id="recipes"></div>`;
 const tried=RECIPES.filter(r=>r.out===item&&state.known.includes(r.id));if(state.known.includes([item,item].join('|')))tried.push({a:item,b:item,out:item});
 if(!tried.length){const p=document.createElement('p');p.className='catalog-intro';p.textContent=BASES.includes(item)?'Present at the beginning.':'No mixing recipe recorded.';$('recipes').append(p);}
 for(const r of tried){const row=document.createElement('div');row.className='recipe';for(const [i,ing] of [r.a,r.b].entries()){if(i){const plus=document.createElement('span');plus.textContent='+';row.append(plus);}const b=document.createElement('button');b.textContent=displayName(ing);b.onclick=()=>entry(ing);row.append(b);}const equal=document.createElement('span');equal.textContent='=';row.append(equal,document.createTextNode(displayName(item)));$('recipes').append(row);}
}
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 $('drink').onclick=()=>{hideTooltip();const outcome=drink(state);save();render();if(outcome==='vampire'){ $('discovery').textContent='Congratulation, you are now an Vampire';setTimeout(()=>$('discovery').textContent='',4000);}if(state.effect)runEffect();};
// Distort the actual room, progressively, rather than placing symbols over it.
async function distortRoom(alive){
 const room=$('room'), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('width','0');svg.setAttribute('height','0');svg.style.position='absolute';
 svg.innerHTML='<defs><filter id="intoxication-ripple" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.006 0.009" numOctaves="1" seed="8" result="waves"/><feDisplacementMap in="SourceGraphic" in2="waves" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
 document.body.append(svg);const noise=svg.querySelector('feTurbulence'), displacement=svg.querySelector('feDisplacementMap');
 room.classList.add('intoxicated');
 try{await new Promise(resolve=>{let start;const frame=now=>{
  if(!alive()){resolve();return;}start??=now;const t=Math.min((now-start)/10000,1),phase=2*Math.PI*(0.22*10*t+1.4*10*t*t/2);
  noise.setAttribute('baseFrequency', (0.005+Math.sin(phase)*0.0018)+' '+(0.008+Math.cos(phase*.73)*0.0025));
  displacement.setAttribute('scale',reduced?0:4+95*t*t);
  room.style.filter=(reduced?'':'url(#intoxication-ripple) ')+ 'blur('+(t*t*7)+'px) brightness('+((room.classList.contains('vampire')?.65:1)*(1-.92*t))+')';
  room.style.transform=reduced?'none':'scale('+(1.035+.065*t)+') rotate('+(Math.sin(phase)*t*1.4)+'deg) skewX('+(Math.cos(phase*.8)*t*3)+'deg)';
  if(t>=1)resolve();else requestAnimationFrame(frame);
 };requestAnimationFrame(frame);});}
 finally{room.style.removeProperty('filter');room.style.removeProperty('transform');room.classList.remove('intoxicated');svg.remove();}
}
async function runEffect(){
 const token=++effectToken;const e=state.effect;if(!e)return;if(e.type==='visions'&&!state.mix.length){state.mix=[{item:e.vessel||'Glass Vessel',origin:null}];state.result=true;render();}busy=true;document.body.classList.add('busy');$('drink').hidden=true;$('effect').hidden=false;$('story').textContent='';$('hallucinations').innerHTML='';
 const alive=()=>token===effectToken;
 if(e.type==='explosion'){$('effect').className='effect explosion';await delay(1100);}
 else{
  $('effect').className='effect '+(e.type==='love'?'love':'visions');
  if(e.type==='love'){await mountLoveEffect($('hallucinations'));if(!alive())return;}
  if(e.type==='love')await delay(LOVE_EFFECT_DURATION);else await distortRoom(alive);if(!alive())return;$('effect').className='effect blackout';$('hallucinations').replaceChildren();
  if(e.type==='love'){
   await delay(900);if(!alive())return;$('effect').className='effect story';
   const narrative=e.fatal?'You leave your basement with a declaration of eternal love prepared. The front door opens. Sunlight falls across your hands. You never reach their house.':'You leave your basement and hurry to your crush’s home. At their door, you confess your eternal love. They find this REALLY WEIRD and turn you down. You refuse to leave. They call the police. You spend five days at the police station, explaining that this is all a misunderstanding. Eventually, the potion wears off. You are back in your basement. Your research has made no meaningful contribution to romance.';
   for(const letter of narrative){if(!alive())return;$('story').textContent+=letter;await delay(45);}await delay(1800);
  }else await delay(5000);
 }
 if(!alive())return;finishEffect(state);busy=false;document.body.classList.remove('busy');$('effect').hidden=true;render();
}
render();$('title-screen').hidden=state.started||state.dead;if(state.effect){$('title-screen').hidden=true;runEffect();}



