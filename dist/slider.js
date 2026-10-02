// Reference slider: arrows, dots and swipe position. Used on the start page and the enquiry page.
const refsTrack=document.querySelector('.refs-track');
if(refsTrack){
  const refCards=[...refsTrack.children],refDots=[...document.querySelectorAll('.refs-dots i')];
  const prev=document.querySelector('.refs-prev'),next=document.querySelector('.refs-next');
  const step=()=>refCards[1].offsetLeft-refCards[0].offsetLeft;
  const update=()=>{
    const max=refsTrack.scrollWidth-refsTrack.clientWidth;
    const index=refsTrack.scrollLeft>=max-4?refCards.length-1:Math.round(refsTrack.scrollLeft/step());
    refDots.forEach((dot,i)=>dot.classList.toggle('is-active',i===index));
    prev.disabled=refsTrack.scrollLeft<4;next.disabled=refsTrack.scrollLeft>=max-4;
  };
  prev.addEventListener('click',()=>refsTrack.scrollBy({left:-step(),behavior:'smooth'}));
  next.addEventListener('click',()=>refsTrack.scrollBy({left:step(),behavior:'smooth'}));
  refsTrack.addEventListener('scroll',update,{passive:true});addEventListener('resize',update);update();
}
