'use strict';
(function(){
  let activeUtterance=null;
  let watchdog=null;
  const status=()=>document.getElementById('voiceStatus');
  function setStatus(message){const el=status();if(el)el.textContent=message||'';}
  function playKorean(text,rate){
    const synth=window.speechSynthesis;
    if(!synth||typeof window.SpeechSynthesisUtterance!=='function'){
      setStatus('此瀏覽器不支援語音播放'); alert('此瀏覽器不支援語音播放'); return;
    }
    const value=String(text||'').trim(); if(!value)return;
    clearTimeout(watchdog);
    try{
      synth.cancel();
      if(synth.paused)synth.resume();
      activeUtterance=new SpeechSynthesisUtterance(value);
      activeUtterance.lang='ko-KR';
      activeUtterance.rate=Number(rate)||0.88;
      activeUtterance.pitch=1;
      activeUtterance.volume=1;
      activeUtterance.onstart=()=>setStatus('正在播放韓文…');
      activeUtterance.onend=()=>{setStatus('播放完成');activeUtterance=null;};
      activeUtterance.onerror=(event)=>{setStatus('播放失敗：'+(event.error||'未知錯誤'));activeUtterance=null;};
      synth.speak(activeUtterance);
      setStatus('正在啟動語音…');
      watchdog=setTimeout(()=>{
        if(activeUtterance && !synth.speaking){
          synth.resume();
          setStatus('語音尚未啟動，請再按一次；並確認裝置不是靜音。');
        }
      },1200);
    }catch(error){setStatus('播放失敗：'+error.message);}
  }
  document.addEventListener('click',function(event){
    const button=event.target.closest('.voice-action');
    if(!button)return;
    event.preventDefault();
    playKorean(button.dataset.text,button.dataset.rate||0.88);
  });
  window.HanVoice={play:playKorean};
})();
