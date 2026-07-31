function speak(){
const t='안녕하세요';
const u=new SpeechSynthesisUtterance(t);
u.lang='ko-KR';
speechSynthesis.speak(u);
}