
let db={},cur='';
fetch('data/travel.json').then(r=>r.json()).then(d=>{db=d;let p=document.getElementById('places');
Object.keys(db).forEach(k=>p.innerHTML+=`<button class=place onclick="showCat('${k}')">${k}</button>`);});
function showCat(c){cur=c;render(db[c]);}
function render(arr){
content.innerHTML=arr.map(x=>`<div class=card><div class=kr>${x.kr}</div><div class=ro>${x.ro}</div><div>${x.zh}</div>
<div class=row>
<button onclick="speak('${x.kr}')">🔊</button>
<button onclick="full('${x.kr}<br><br>${x.zh}')">📱 放大</button>
</div></div>`).join('');
}
search.oninput=e=>{
const q=e.target.value;
let all=[];Object.values(db).forEach(a=>all=all.concat(a));
render(all.filter(x=>x.kr.includes(q)||x.zh.includes(q)||x.ro.includes(q)));
}
function speak(t){let u=new SpeechSynthesisUtterance(t);u.lang='ko-KR';speechSynthesis.speak(u);}
function full(html){fullscreen.innerHTML=html;fullscreen.classList.remove('hidden');fullscreen.onclick=()=>fullscreen.classList.add('hidden');}
