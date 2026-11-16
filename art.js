import {ITEMS} from './game.js';
import {sprites} from './art-map.js';
const paths={
Fire:'<path fill="#bc7044" d="M32 57C5 55 15 29 26 23c-3 12 6 14 6 14S23 16 39 6c-3 18 17 21 15 36-1 11-10 18-22 15Z"/><path fill="#dfb86a" d="M32 53c-10-3-7-14 1-21 0 9 13 10 7 19Z"/>',
Water:'<path fill="#77989b" d="M33 5C26 20 14 32 15 43c1 22 36 22 36 0C51 30 38 16 33 5Z"/><path fill="none" stroke="#cad2bd" d="M22 37q-5 14 8 16"/>',
Air:'<g fill="none" stroke="#7d8067" stroke-width="3"><path d="M7 27h31c18 0 13-21 2-16-5 3-2 9 2 7M6 35h40c19 0 17 20 4 17-5-2-3-8 1-7M11 43h19c12 0 12 17 2 13"/></g>',
Earth:'<path fill="#8b7c58" d="m6 48 10-22 13-9 16 7 13 25-8 6H15Z"/><path fill="#b09a70" d="m16 26 12 8 1 20H15L6 48Zm13-9 8 19 8-12Z"/><path fill="none" d="m29 34 8 2 13 19M37 36l-5 10"/>',
Lightning:'<path fill="#d2b566" d="M39 4 14 35h17l-9 27 30-37H35Z"/>',
Stone:'<path fill="#929482" d="m7 43 7-21 19-9 18 11 7 20-16 11H21Z"/><path fill="#b1b09c" d="m14 22 14 10 15-6-10-13Zm14 10-7 23-14-12Z"/><path fill="none" d="m28 32 15-6 15 18M28 32l14 23"/>',
Plant:'<g fill="#7e8c55"><path fill="none" stroke-width="3" d="M32 60V18"/><path d="M31 42C9 45 7 27 12 26c17-2 20 10 19 16Zm2-11c-3-17 10-24 21-23 3 14-6 24-21 23ZM31 55C13 59 7 46 8 43c14-3 23 4 23 12Zm2-8c1-15 17-18 24-13-3 13-13 17-24 13Z"/></g>',
Mushroom:'<path fill="#d1b98b" d="m29 31-4 25q8 5 18-1l-5-25Z"/><path fill="#a76248" d="M6 32C9 3 52-3 59 32c-14 8-36 8-53 0Z"/><g fill="#d8c7a1"><ellipse cx="21" cy="21" rx="4" ry="3"/><ellipse cx="38" cy="14" rx="4" ry="3"/><ellipse cx="47" cy="27" rx="3" ry="2"/><ellipse cx="25" cy="30" rx="2" ry="2"/></g>',
Sand:'<path fill="#c7af76" d="m4 50 13-9 12-21 7-6 12 26 13 12q-28 11-57-2Z"/><g stroke="#8a734a" stroke-width="1"><path d="m19 43 9-12m9-6 8 20m-14-8 1 3m8 9 2 2M9 55h3m39 2h4m-30-8 2 2m-10-7 1 1"/></g>',
Blade:'<path fill="#c3c6b1" d="m11 52 10-21L58 6 42 43 18 58Z"/><path fill="none" d="m18 53 33-36"/>',
Knife:'<path fill="#bec4ae" d="m23 39 9-19L59 7 43 36 30 44Z"/><path fill="#796047" d="m7 54 17-18 10 10-17 15Z"/><circle fill="#bdb28c" cx="16" cy="52" r="2"/>',
Wood:'<path fill="#8f7149" d="m9 46 34-28 15 17-33 27Z"/><ellipse fill="#b99c69" cx="17" cy="52" rx="9" ry="12" transform="rotate(-39 17 52)"/><ellipse fill="none" cx="17" cy="52" rx="4" ry="7" transform="rotate(-39 17 52)"/><path fill="none" d="m26 39 25-19m-17 28 20-17"/>',
Flower:'<path fill="none" stroke="#718151" stroke-width="3" d="M33 58V24m0 20L18 36m15 12 14-12"/><g fill="#b98e8a"><ellipse cx="33" cy="14" rx="6" ry="11"/><ellipse cx="33" cy="28" rx="6" ry="10"/><ellipse cx="24" cy="21" rx="10" ry="6"/><ellipse cx="43" cy="21" rx="10" ry="6"/></g><circle fill="#c8b164" cx="33" cy="21" r="6"/>',
Frog:'<path fill="#8c9b62" d="M19 30c-3-17 14-20 16-9 9-15 23-4 17 6 11 17 1 25-14 26-14 5-29 0-19-23Z"/><path fill="#71814d" d="M20 37C6 34 4 47 17 50L7 56h18m21-20c15-2 16 15 5 16l9 5H41"/><g fill="#d1c69a"><circle cx="25" cy="24" r="5"/><circle cx="43" cy="23" r="5"/></g><g fill="#242d20"><circle cx="26" cy="24" r="2"/><circle cx="43" cy="23" r="2"/></g><path fill="none" d="M26 39q11 6 19-1"/>',
Glass:'<path fill="#b5c3ab44" d="m15 14 5 41q13 8 26 0l5-41Z"/><ellipse fill="#b5c3ab33" cx="33" cy="14" rx="18" ry="5"/><path fill="none" stroke="#d3d3b7" d="m22 23 3 25"/>',
Pot:'<path fill="#9b805a" d="M12 20h42l-4 31q-18 15-34 0Z"/><ellipse fill="#574d37" cx="33" cy="20" rx="21" ry="7"/><path fill="none" stroke-width="4" d="M13 29C-2 24-2 47 16 43m37-14c14-5 15 16-1 15"/>',
Bottle:'<path fill="#aab99b66" d="M26 9h14v18l11 11v20q-19 6-37 0V38l12-11Z"/><path fill="#89724d" d="M25 5h16v8H25Z"/><path fill="none" stroke="#d9d9bd" d="M20 43v10"/>',
Wire:'<g fill="none" stroke="#b38d5d" stroke-width="4"><path d="M7 46c6-28 40-38 44-18S4 67 18 37 60 14 55 48"/></g>',
Seeds:'<g fill="#a89158"><ellipse cx="19" cy="34" rx="6" ry="11" transform="rotate(25 19 34)"/><ellipse cx="38" cy="24" rx="6" ry="11" transform="rotate(-30 38 24)"/><ellipse cx="45" cy="45" rx="6" ry="10" transform="rotate(45 45 45)"/><ellipse cx="25" cy="53" rx="4" ry="6"/></g>',
Bread:'<path fill="#bb9359" d="M7 42C3 11 59 9 59 43v9q-25 11-51 0Z"/><path fill="none" stroke="#6d5739" stroke-width="3" d="m19 27 8 10m4-15 8 10m4-9 8 9"/>',
Diamond:'<path fill="#a5c2b6" d="m7 24 12-13h29l12 13-27 36Z"/><path fill="none" d="M7 24h53M19 11l8 13 6 36 9-36 6-13M27 24l6-13 9 13"/>',
Cloud:'<path fill="#b9beaa" d="M13 49C-1 48 0 29 14 28 14 8 42 5 47 25c22-4 27 26 9 27Z"/>',
Flies:'<g fill="#babda755"><ellipse cx="24" cy="23" rx="10" ry="17" transform="rotate(-35 24 23)"/><ellipse cx="43" cy="23" rx="10" ry="17" transform="rotate(35 43 23)"/></g><ellipse fill="#494b37" cx="33" cy="39" rx="8" ry="15"/><path fill="none" d="m27 35-14-4m14 12-15 5m28-13 14-5m-14 13 15 6"/><circle fill="#824b3b" cx="33" cy="25" r="7"/>',
Unicorn:'<path fill="#c5c2a2" d="m12 39 9-20 12-9 10 11 9 18-6 19H22Z"/><path fill="#a29164" d="m32 13 7-12 1 17Z"/><path fill="#9b9f85" d="m22 19-9 8-5 25 13-10m21-21 15 9-5 28-6-19"/><circle cx="29" cy="28" r="2"/><path fill="none" d="m27 43 13 2"/>',
Shark:'<path fill="#7d9690" d="M5 36q24-24 45-2l12-13-3 29-10-10Q20 57 5 36Z"/><path fill="#9cae9f" d="m22 29 7-20 9 21Z"/><circle cx="14" cy="34" r="2"/><path fill="none" d="m13 42 9-1m6-8-1 11m6-11-1 11"/>',
Blender:'<path fill="#a6ba9d55" d="m15 8 5 31h26l5-31Z"/><path fill="#747d69" d="m20 39-7 20h39l-6-20Z"/><path fill="none" d="m22 26 21 6m-19 2 17-10"/><circle fill="#b9ac81" cx="33" cy="49" r="4"/>',
Bomb:'<circle fill="#4a4c3a" cx="32" cy="39" r="21"/><path fill="#8b7953" d="m27 18 1-8h11v9Z"/><path fill="none" stroke="#a8996c" d="M34 10q17 5 14-8"/><path fill="none" stroke="#d7b36b" d="m45 4 9-2m-5 5 7 4"/>',
Coal:'<path fill="#3b4033" d="m9 46 3-20 18-12 22 10 7 23-17 9-25-1Z"/><path fill="none" stroke="#7b7f66" d="m13 28 17 8 13-9m-13 9-5 17m5-17 19 12"/>',
Metal:'<path fill="#a1a58f" d="m6 41 14-20h29l11 20-9 14H17Z"/><path fill="#c1c2a6" d="m6 41 14-20h29L36 41Z"/><path fill="none" d="M6 41h54M36 41l-3 14"/>'
};
function vectorArt(item){
 let p=paths[item];
 if(item==='Magma')p=paths.Stone+'<path fill="#c57a3c" d="m14 23 14 9-5 16 15-3 6 10 5-16-13-10 3-13-9 15Z"/>';
 if(item==='Dust'||item==='Gunpowder'||item==='Flour')p=paths.Sand.replace('#c7af76',item==='Gunpowder'?'#555d45':item==='Flour'?'#ded0a5':'#a49473');
 if(['Algae','Moss','Lichen'].includes(item))p=paths.Plant.replaceAll('#7e8c55',item==='Algae'?'#668d64':'#8c9161');
 if(item==='Campfire')p=paths.Wood+paths.Fire;
 if(item==='Twitching Frog Legs')p='<path fill="#9aa66b" d="M9 10q29 8 12 25L9 47l15 8-5 7L3 49l11-22Zm40 0q-29 8-12 25l12 12-15 8 5 7 16-13-11-22Z"/>';
 if(item==='Frog Eggs')p=Array.from({length:9},(_,i)=>`<circle fill="#a8b8a788" cx="${16+i%3*16}" cy="${17+Math.floor(i/3)*15}" r="10"/><circle fill="#414b32" cx="${16+i%3*16}" cy="${17+Math.floor(i/3)*15}" r="3"/>`).join('');
 if(item==='A Glass of Water'||item==='A Glass of Frog')p=paths.Glass+`<path fill="#77989b88" d="m19 31 3 22q11 5 22 0l3-22Z"/>`+(item.includes('Frog')?'<circle fill="#404c2c" cx="30" cy="42" r="4"/><circle fill="#404c2c" cx="39" cy="48" r="3"/>':'');
 if(item==='A Pot of Water'||item==='A Pot of Frog'||item==='Broth')p=paths.Pot+`<ellipse fill="${item==='Broth'?'#ad9657':'#77989b'}" cx="33" cy="21" rx="17" ry="5"/>`+(item.includes('Frog')?'<circle cx="30" cy="21" r="3"/>':'');
 if(['Blood','Cursed Blood','Sacred Blood','Potion','Love Potion','Vodka',...['Elixir(?) · I','Elixir(?) · II']].includes(item)){
 const c=({'Blood':'#95453c','Cursed Blood':'#5e324d','Sacred Blood':'#c6af65','Potion':'#7d8f64','Love Potion':'#bc7f8e','Vodka':'#b9c5af'})[item]||'#a4946c';
 p=paths.Glass+`<path fill="${c}" d="m19 32 3 21q11 7 22 0l3-21Z"/>`;
 }
 if(item==='Light Bulb'||item==='Lightened Light Bulb')p=`<path fill="${item==='Light Bulb'?'#bfccaf44':'#e6cb7d'}" d="M22 43C-3 14 28-5 44 10c14 11 7 26-4 33Z"/><path fill="#7e8067" d="M22 44h18v12H22Z"/><path fill="none" d="m26 43-3-16 8 6 8-6-3 16M22 49h18M24 58h14"/>`;
 if(item==='Vase')p='<path fill="#839b8d" d="M23 8h21l-5 18q27 30-6 33C1 58 22 30 27 26Z"/>';
 if(item==='Curse'||item==='Gu Poison')p=paths.Bottle+'<path fill="#4b564066" d="M16 40h33v17H16Z"/><path fill="none" stroke="#b7ab79" d="m25 43 15 10m0-10L25 53"/>';
 if(item==='Molotov Cocktail')p=paths.Bottle+'<path fill="#b08a54" d="m27 3 6 21 10-3-6-21Z"/>';
 if(item==='Dough'||item==='Cooked Meat')p=`<path fill="${item==='Dough'?'#d3bd8f':'#9f7052'}" d="M7 45C2 24 23 18 33 23c26-15 32 24 17 31-10 7-36 7-43-9Z"/><path fill="none" d="m21 33 7 6m7-8 10 7"/>`;
 if(item==='Man Eating Plant')p=paths.Plant+'<path fill="#a27658" d="M12 20q17-25 43 0-25 28-43 0Z"/><path fill="none" stroke="#ded0a3" d="m16 20 5 7 5-9 5 9 5-9 5 9 6-8"/>';
 if(item==='Six-headed Shark')p=paths.Shark+'<path fill="#7d9690" d="M7 23q14-12 24 1L9 29Zm0 23q13-7 22 3L8 54Z"/><circle cx="11" cy="23" r="1"/><circle cx="11" cy="48" r="1"/>';
 return `<svg viewBox="0 0 66 66" fill="none" stroke="#343729" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${p||paths.Stone}</svg>`;
}
export function art(item){
 const sprite=sprites[item];if(!sprite)return vectorArt(item);
 const [x,y,w,h]=sprite.box,id='sprite-'+item.replace(/[^a-zA-Z0-9]/g,'');
 return `<svg viewBox="${sprite.box.join(' ')}" aria-hidden="true" overflow="hidden"><defs><clipPath id="${id}" clipPathUnits="userSpaceOnUse"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs><image clip-path="url(#${id})" href="${sprite.path}" width="${sprite.width}" height="${sprite.height}"/></svg>`;
}export function moon(i){
 const phase=((i%28)+28)%28;
 const angle=phase/28*2*Math.PI;
 const radius=Math.abs(Math.cos(angle))*7;
 let light='';
 if(phase===0)light='<circle cx="8" cy="8" r="7" fill="#f0ebd9"/>';
 else if(phase!==14){
  const outerSweep=phase<14?0:1;
  const innerSweep=phase<14?(Math.cos(angle)>0?0:1):(Math.cos(angle)<0?0:1);
  const terminator=radius<0.001?'L8 1':`A${radius.toFixed(4)} 7 0 0 ${innerSweep} 8 1`;
  light=`<path d="M8 1A7 7 0 0 ${outerSweep} 8 15${terminator}Z" fill="#f0ebd9"/>`;
 }
 return `<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="#141813"/>${light}<circle cx="8" cy="8" r="7" fill="none" stroke="#10140e" stroke-width="0.75"/></svg>`;
}
