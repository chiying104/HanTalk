
let data=[],current='全部';
const fav=JSON.parse(localStorage.getItem('fav')||'[]');

fetch('data/travel.json').then(r=>r.json()).then(d=>{
data=d;
buildTabs();
render();
});

function buildTabs(){
const cats=['全部',...new Set(data.map(x=>x.category)),'收藏'];
document.getElementById('tabs').innerHTML=cats.map(c=>`<button class='tab' onclick="changeTab('${c}')">${c}</button>`).join('');
}

function changeTab(c){
current=c;
render();
}

function render(){
const q=document.getElementById('search').value.toLowerCase();
let arr=data;

if(current==='收藏'){
arr=data.filter(x=>fav.includes(x.korean));
}else if(current!=='全部'){
arr=data.filter(x=>x.category===current);
}

arr=arr.filter(x=>
x.korean.includes(q)||
x.chinese.includes(q)||
x.roman.toLowerCase().includes(q));

document.getElementById('list').innerHTML=arr.map(x=>`
<div class='card'>
<div class='kr'>${x.korean}</div>
<div class='ro'>${x.roman}</div>
<div>${x.chinese}</div>
<small>📂 ${x.category}</small>
<div class='row'>
<button onclick="speak('${x.korean}')">🔊</button>
<button onclick="toggleFav('${x.korean}')">${fav.includes(x.korean)?'💖':'🤍'}</button>
</div>
</div>`).join('');
}

document.getElementById('search').oninput=render;

function speak(t){
let u=new SpeechSynthesisUtterance(t);
u.lang='ko-KR';
speechSynthesis.speak(u);
}

function toggleFav(k){
const i=fav.indexOf(k);
if(i>-1) fav.splice(i,1);
else fav.push(k);
localStorage.setItem('fav',JSON.stringify(fav));
render();
}
