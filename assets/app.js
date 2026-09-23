
let books=[], idx={}, book=null, page=1;
const $=s=>document.querySelector(s), reader=$('#reader'), img=$('#pageImg'), thumbs=$('#thumbs');

async function init(){
  books=await fetch('data/books.json').then(r=>r.json());
  idx=await fetch('data/search-index.json').then(r=>r.json());
  drawLibrary();
  setPanel('home');
}
function drawLibrary(){
  const lib=$('#library'); lib.innerHTML='';
  books.forEach(b=>{
    const c=document.createElement('div'); c.className='book-card';
    c.innerHTML=`<div class="cover"><img src="${b.cover}"></div><div class="book-body"><div class="kind">${b.kind}</div><h3>${b.title}</h3><p>${b.subtitle}</p><div class="meta"><span class="pill">${b.pages} trang</span><span>Mở sách →</span></div></div>`;
    c.onclick=()=>openBook(b.id,1); lib.appendChild(c);
  });
}
function setPanel(id){
  document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));
  document.querySelector(`#panel-${id}`)?.classList.add('active');
  document.querySelectorAll('.nav button').forEach(x=>x.classList.toggle('active',x.dataset.panel===id));
  window.scrollTo({top:0,behavior:'smooth'});
}
function openBook(id,p=1){
  book=books.find(x=>x.id===id); page=Math.max(1,Math.min(p,book.pages));
  reader.classList.add('active'); $('#readerTitle').textContent=book.title; thumbs.innerHTML='';
  for(let i=1;i<=book.pages;i++){
    let t=document.createElement('div'); t.className='thumb'; t.dataset.p=i;
    t.innerHTML=`<img loading="lazy" src="books/${id}/${String(i).padStart(3,'0')}.jpg"><span>Trang ${i}</span>`;
    t.onclick=()=>go(i); thumbs.appendChild(t)
  }
  show(false);
}
function show(anim=true){
  img.src=`books/${book.id}/${String(page).padStart(3,'0')}.jpg`;
  $('#count').textContent=`${page} / ${book.pages}`;
  document.querySelectorAll('.thumb').forEach(t=>t.classList.toggle('active',+t.dataset.p===page));
  document.querySelector('.thumb.active')?.scrollIntoView({block:'nearest'});
  if(anim){img.classList.remove('flip');void img.offsetWidth;img.classList.add('flip')}
  history.replaceState(null,'',`#${book.id}/${page}`);
}
function go(p){page=Math.max(1,Math.min(p,book.pages));show()}
function prev(){go(page-1)} function next(){go(page+1)}
function closeBook(){reader.classList.remove('active');history.replaceState(null,'','#')}
function search(q){
  let box=$('#results'); if(!q.trim()){box.classList.remove('active');box.innerHTML='';return}
  let n=q.toLowerCase(),hits=[];
  books.forEach(b=>{
    if((b.title+' '+b.subtitle+' '+b.kind).toLowerCase().includes(n))hits.push({id:b.id,p:1,title:b.title,s:b.subtitle});
    (idx[b.id]||[]).forEach((t,i)=>{let k=t.toLowerCase().indexOf(n);if(k>=0)hits.push({id:b.id,p:i+1,title:b.title,s:'…'+t.slice(Math.max(0,k-70),Math.min(t.length,k+180))+'…'})})
  });
  box.innerHTML=hits.slice(0,30).map((h,i)=>`<div class="result" data-i="${i}"><b>${h.title}</b> · Trang ${h.p}<br><small>${h.s}</small></div>`).join('')||'<div class="result">Không tìm thấy nội dung phù hợp.</div>';
  box.classList.add('active');
  box.querySelectorAll('[data-i]').forEach((e,i)=>e.onclick=()=>openBook(hits[i].id,hits[i].p));
}
document.addEventListener('DOMContentLoaded',()=>{
  $('#q').addEventListener('input',e=>search(e.target.value));
  document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>setPanel(b.dataset.panel));
  init().then(()=>{let m=location.hash.match(/^#([^/]+)\/(\d+)/);if(m)openBook(m[1],+m[2])});
});
document.addEventListener('keydown',e=>{if(!reader.classList.contains('active'))return;if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev();if(e.key==='Escape')closeBook()});
