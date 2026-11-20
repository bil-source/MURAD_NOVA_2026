'use strict';

// MURAD NOVA 2026 — edit product names, prices, and images here.
// These are illustrative stock photographs, not photographs of The Murad House.
const menuItems = [
  { name:'Espresso', price:'$0.80', category:'hot', image:'photo-1510707577719-ae7c14805e3a' },
  { name:'Cappuccino', price:'$1.10', category:'hot', image:'photo-1570968915860-54d5c301fa9f' },
  { name:'Tea', price:'$0.80', category:'hot', image:'photo-1544787219-7f47ccb76574' },
  { name:'Nescafé', price:'$1.70', category:'hot', image:'photo-1509042239860-f550ce710b93' },
  { name:'Murad Hot Chocolate', price:'$1.70', category:'hot', image:'photo-1542990253-0b8be3a5f0ed' },
  { name:'Iced Coffee / Iced Latte', price:'$2.20', category:'cold', image:'photo-1461023058943-07fcbe16d735' },
  { name:'Frappé', price:'$3.00', category:'cold', image:'photo-1572490122747-3968b75cc699' },
  { name:'Croissant (Sandee)', price:'$0.80', category:'bakery', image:'photo-1555507036-ab1f4038808a' },
  { name:'Fresh Nutella Croissant', price:'$2.00', category:'bakery', image:'photo-1623334044303-241021148842' },
  { name:'Fresh Cheese Croissant', price:'$1.70', category:'bakery', image:'photo-1555507036-ab1f4038808a' },
  { name:'Turkey & Cheese Croissant', price:'$2.20', category:'bakery', image:'photo-1623334044303-241021148842' },
  { name:'Special Croissant', price:'$3.00', category:'bakery', image:'photo-1555507036-ab1f4038808a' },
  { name:'Chicha', price:'$4.50', category:'shisha', image:null }
];
const categoryNames = {hot:'Hot drinks',cold:'Cold drinks',bakery:'Croissants',shisha:'Chicha'};
const grid = document.getElementById('menuGrid');
function makeCard(item,index){
  const article = document.createElement('article');
  article.className = 'product-card';
  article.dataset.category = item.category;
  const photo = document.createElement('div'); photo.className='product-image';
  if(item.image){
    const img = document.createElement('img');
    img.src = `https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=650&q=80`;
    img.alt = `${item.name} illustrative photo`; img.loading='lazy';
    img.onerror=()=>{img.remove(); photo.style.background='linear-gradient(135deg,#80654d,#271c15)';};
    photo.append(img);
  } else {
    photo.style.background='linear-gradient(135deg,#80654d,#271c15)';
    const placeholder=document.createElement('span');
    placeholder.textContent='THE MURAD HOUSE';
    placeholder.style.cssText='position:absolute;inset:0;display:grid;place-items:center;color:white;font-weight:900;letter-spacing:.1em;text-align:center;padding:12px';
    photo.append(placeholder);
  }
  const tag=document.createElement('span'); tag.className='product-index'; tag.textContent=String(index+1).padStart(2,'0');photo.append(tag);
  const info=document.createElement('div');info.className='product-info';
  const titleBox=document.createElement('div');const cat=document.createElement('small');cat.textContent=categoryNames[item.category];
  const title=document.createElement('h3');title.textContent=item.name;titleBox.append(cat,title);
  const price=document.createElement('strong');price.textContent=item.price;info.append(titleBox,price);
  article.append(photo,info);return article;
}
menuItems.forEach((item,i)=>grid.append(makeCard(item,i)));
document.querySelectorAll('.filter').forEach(button=>{
  button.addEventListener('click',()=>{
    document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false');});
    button.classList.add('active');button.setAttribute('aria-pressed','true');
    const filter=button.dataset.filter;
    document.querySelectorAll('.product-card').forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter);
  });
});

const messages = [
  'Your next good moment might be closer than you think.',
  'You have already survived so much. Keep going.',
  'A little progress is still progress. Be proud.',
  'Your story is still being written. Make today count.',
  'Good things take time. So does good coffee.',
  'One small step today can change everything tomorrow.',
  'The world needs your kind of light.',
  'Take a moment. Breathe. You are doing better than you think.',
  'Keep showing up for the life you believe in.',
  'May your coffee be strong and your heart be hopeful.',
  'Some of the best days begin with an ordinary cup of coffee.',
  'There is always a reason to begin again.'
];
let lastMessage=-1;
function newMessage(){
  const target=document.getElementById('messageText');
  let next=Math.floor(Math.random()*messages.length);
  if(messages.length>1&&next===lastMessage)next=(next+1)%messages.length;
  lastMessage=next;target.textContent=messages[next];
  const body=target.closest('.message-card-body');body.classList.remove('popping');void body.offsetWidth;body.classList.add('popping');
}
document.getElementById('newMessageBtn').addEventListener('click',newMessage);
// A QR opens the published website with ?message=1#message. This gives a new quote on each visit.
const urlParams=new URLSearchParams(location.search);
if(urlParams.get('message')==='1'){
  newMessage();
  window.addEventListener('load',()=>setTimeout(()=>document.getElementById('message').scrollIntoView({behavior:'smooth'}),1300));
}

const menuToggle=document.getElementById('menuToggle');
const mobileNav=document.getElementById('mobileNav');
menuToggle.addEventListener('click',()=>{
  const isOpen=mobileNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));
  menuToggle.setAttribute('aria-label',isOpen?'Close navigation':'Open navigation');
  document.body.classList.toggle('menu-open',isOpen);
});
mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mobileNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');document.body.classList.remove('menu-open');
}));

const revealObserver=('IntersectionObserver' in window)?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});
},{threshold:.12,rootMargin:'0px 0px -25px 0px'}):null;
document.querySelectorAll('.reveal').forEach(el=>revealObserver?revealObserver.observe(el):el.classList.add('visible'));
const progress=document.getElementById('progressBar');
let ticking=false;
window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';ticking=false;
});},{passive:true});
window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('hidden'),1200));
setTimeout(()=>document.getElementById('loader').classList.add('hidden'),2800);
document.getElementById('year').textContent=new Date().getFullYear();

// QR code generator. Only creates a QR for a public HTTP(S) URL, never localhost.
let qrReady=false;
const qrStatus=document.getElementById('qrStatus');
const qrArt=document.getElementById('qrArt');
const downloadBtn=document.getElementById('downloadQr');
document.getElementById('generateQr').addEventListener('click',()=>{
  const host=location.hostname.toLowerCase();
  if(!['https:','http:'].includes(location.protocol)||['localhost','127.0.0.1','0.0.0.0'].includes(host)||host.endsWith('.local')){
    qrStatus.textContent='This is a local preview. Publish to GitHub Pages, open your public website, then click Generate Cup QR.';
    return;
  }
  if(typeof QRCode==='undefined'){
    qrStatus.textContent='The QR library did not load. Connect to the internet, refresh the page, and try again.';
    return;
  }
  const url=new URL(location.href);url.search='';url.hash='';url.searchParams.set('message','1');url.hash='message';
  qrArt.innerHTML='';
  new QRCode(qrArt,{text:url.toString(),width:250,height:250,colorDark:'#17120e',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.H});
  qrStatus.textContent='Your QR is ready. Scan it with your phone before printing stickers.';
  qrReady=true;downloadBtn.disabled=false;
});
downloadBtn.addEventListener('click',()=>{
  if(!qrReady)return;
  const canvas=qrArt.querySelector('canvas');
  const img=qrArt.querySelector('img');
  const triggerDownload=(data)=>{const link=document.createElement('a');link.href=data;link.download='MURAD-CUP-QR.png';document.body.append(link);link.click();link.remove();};
  if(canvas){triggerDownload(canvas.toDataURL('image/png'));return;}
  if(img&&img.src.startsWith('data:'))triggerDownload(img.src);
  else qrStatus.textContent='Could not download automatically. Right-click the QR code and save the image.';
});
