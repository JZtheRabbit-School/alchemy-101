// Generate copy-ready CodePen panels from the working prototype.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
const read=p=>readFileSync(p,'utf8').replace(/^\uFEFF/,'');
const assetBase='https://cdn.jsdelivr.net/gh/JZtheRabbit-School/alchemy-101@887a5236b5e4ec3392776b0da8ac4bdaba7e8138/assets/';
const urls=s=>s.replaceAll('assets/',assetBase);
const strip=s=>s.replace(/^import .*?;\s*/gm,'').replace(/\bexport\s+(?=(?:const|let|function|async function)\b)/g,'');
const jsFiles=['game.js','art-map.js','art.js','descriptions.js','journal.js','love-effect.js','app.js'];
const js='// Alchemy 101 — CodePen JavaScript panel. No preprocessor needed.\n(function(){\nfunction startAlchemy(){\n'+jsFiles.map(p=>'\n// ===== '+p+' =====\n'+urls(strip(read(p)))).join('\n')+'\n}\nif(document.readyState==="loading")document.addEventListener("DOMContentLoaded",startAlchemy,{once:true});else startAlchemy();\n})();\n';
const css=['style.css','illustrated.css','love-effect.css'].map(p=>'/* '+p+' */\n'+urls(read(p))).join('\n');
const html=urls(read('index.html').match(/<body>([\s\S]*?)<\/body>/i)[1].replace(/<link\b[^>]*>/g,'').replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').trim());
mkdirSync('codepen',{recursive:true});
writeFileSync('codepen/HTML.html',html);writeFileSync('codepen/CSS.css',css);writeFileSync('codepen/JavaScript.js',js);
writeFileSync('codepen/index.html','<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Alchemy 101 — CodePen package</title><link rel="stylesheet" href="CSS.css"></head><body>'+html+'<script src="JavaScript.js"></script></body></html>');
console.log('Generated CodePen panels and standalone preview.');
