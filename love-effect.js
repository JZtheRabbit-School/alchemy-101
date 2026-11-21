// Shared by the game and its visual review page.
export const LOVE_EFFECT_DURATION=12000;
export async function mountLoveEffect(root){
const image=new Image();image.src='assets/love-hallucination-overlay.png';try{await image.decode();}catch{}
root.innerHTML='<div class="love-concept"><div class="pink-veil"></div><div class="love-pieces"></div></div>';
const regions=[[0,0,460,350],[790,0,270,170],[630,160,110,100],[290,255,195,150],[535,310,425,275],[940,0,732,545],[25,420,440,285],[0,710,410,231],[365,790,140,151],[935,550,230,165],[1210,460,95,110],[1490,430,182,185],[1240,620,432,321]];
function play(){root.querySelector('.love-pieces').innerHTML=regions.map(([x,y,w,h],i)=>`<div class="dream-piece" style="--reveal:${2+i%4*.65}s;--duration:${10+i%5*2}s;--offset:-${i*1.7}s;--origin:${(x+w/2)/16.72}% ${(y+h/2)/9.41}%;--x1:${i%2?-3:2}vw;--y1:${i%3?-3:2}vh;--x2:${i%2?4:-4}vw;--y2:${i%3?4:-5}vh;--x3:${i%2?-5:5}vw;--y3:${i%3?-5:4}vh"><svg viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><clipPath id="piece-${i}">${i===0?'<polygon points="0,0 460,0 460,130 300,180 300,350 0,350"/>':i===1?'<polygon points="790,0 1060,0 1060,45 980,85 980,170 790,170"/>':i===7?'<polygon points="0,710 410,710 410,790 370,790 370,941 0,941"/>':i===5?'<polygon points="1060,0 1672,0 1672,425 1480,425 1480,545 1320,545 1320,425 1060,425 1060,330 940,330 940,180 1000,180 1000,60 1060,60"/>':`<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`}</clipPath></defs><image href="assets/love-hallucination-overlay.png" width="1672" height="941" clip-path="url(#piece-${i})"/></svg></div>`).join('');
const spots=[[12,19],[25,41],[43,17],[62,29],[78,17],[88,53],[15,66],[37,65],[53,77],[72,69],[26,80],[57,44],[8,46],[82,83],[48,55],[66,14]];
spots.forEach(([left,top],i)=>{const n=document.createElement('div');n.className='dream-piece small-heart';n.style.cssText=`left:${left}%;top:${top}%;width:${25+i%4*8}px;height:${27+i%4*8}px;inset:auto;--reveal:${2.6+i%5*.45}s;--duration:${8+i%6*1.7}s;--offset:-${i*1.3}s;--origin:center;--x1:-2vw;--y1:2vh;--x2:3vw;--y2:-4vh;--x3:-3vw;--y3:3vh;`;n.style.left=left+'%';n.style.top=top+'%';n.innerHTML='<svg viewBox="630 160 110 100" aria-hidden="true"><image href="assets/love-hallucination-overlay.png" width="1672" height="941"/></svg>';root.querySelector('.love-pieces').append(n)});
};play();

}
