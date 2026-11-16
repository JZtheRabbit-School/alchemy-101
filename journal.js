export const alphabetic=items=>[...items].sort((a,b)=>a.localeCompare(b));
export function catalogPages(items){const sorted=alphabetic(items),pages=[sorted.slice(0,8)];for(let i=8;i<sorted.length;i+=12)pages.push(sorted.slice(i,i+12));return pages;}
export function catalogSpread(items,index=0){const pages=catalogPages(items),last=Math.max(0,Math.ceil(pages.length/2)-1),current=Math.max(0,Math.min(index,last));return {index:current,left:pages[current*2]||[],right:pages[current*2+1]||[],previous:current>0,next:current<last};}
export function neighbors(items,item){const sorted=alphabetic(items),i=sorted.indexOf(item);return {previous:i>0?sorted[i-1]:null,next:i>=0&&i<sorted.length-1?sorted[i+1]:null};}
