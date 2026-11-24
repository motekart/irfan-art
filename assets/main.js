(function(){
'use strict';
var $=function(s,c){return (c||document).querySelector(s)};
var $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
var IMG='assets/img/';

/* ---------- bahasa (ID / EN) ---------- */
var LANG='id';try{LANG=localStorage.getItem('von-lang')||'id'}catch(e){}
if(LANG!=='en')LANG='id';
var EN=window.I18N_EN||{};
function norm(s){return String(s).replace(/\s+/g,' ').trim()}
function tr(s){if(LANG!=='en'||s==null)return s;var k=norm(s);return Object.prototype.hasOwnProperty.call(EN,k)?EN[k]:s}
function trDom(root){
  if(LANG!=='en')return;
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){var p=n.parentNode&&n.parentNode.nodeName;return p==='SCRIPT'||p==='STYLE'||p==='NOSCRIPT'?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),n,list=[];
  while((n=w.nextNode()))list.push(n);
  list.forEach(function(t){var v=t.nodeValue,k=norm(v);if(!k||!Object.prototype.hasOwnProperty.call(EN,k))return;var m=v.match(/^(\s*)[\s\S]*?(\s*)$/);t.nodeValue=m[1]+EN[k]+m[2]});
  $$('[alt],[aria-label],[placeholder],[title],meta[name="description"],meta[property^="og:"]',root).forEach(function(el){
    ['alt','aria-label','placeholder','title','content'].forEach(function(a){var v=el.getAttribute(a);if(v){var k=norm(v);if(Object.prototype.hasOwnProperty.call(EN,k))el.setAttribute(a,EN[k])}});
  });
}
document.documentElement.setAttribute('lang',LANG);
if(LANG==='en'){var waF=$('.wa-float');if(waF)waF.href='https://wa.me/6281387884644?text='+encodeURIComponent('Hi Irfan, I saw your Voice of Nature portfolio and would like to discuss a project.')}
trDom(document.documentElement);
(function(){
  var b=$('#langBtn');if(!b)return;
  b.setAttribute('aria-label',LANG==='en'?'Ganti ke Bahasa Indonesia':'Switch to English');
  b.title=LANG==='en'?'Bahasa Indonesia':'English';
  b.addEventListener('click',function(){
    try{localStorage.setItem('von-lang',LANG==='en'?'id':'en');sessionStorage.setItem('von-sy',String(window.scrollY))}catch(e){}
    location.reload();
  });
  try{var sy=sessionStorage.getItem('von-sy');if(sy!==null){sessionStorage.removeItem('von-sy');var y=+sy;window.scrollTo(0,y);window.addEventListener('load',function(){window.scrollTo(0,y)})}}catch(e){}
})();

/* ---------- data karya ---------- */
var CAT={poster:'Poster & Kampanye',info:'Infografis',buku:'Buku & Editorial',satwa:'Ilustrasi Satwa',merch:'Merchandise'};
var WORKS=[
 {id:'wwd-poster',t:'World Wildlife Day 2024',c:'poster',client:'Multispecies Event',type:'Poster acara / kampanye konservasi',d:'Satwa liar bertemu drone, GPS tracking, dan perangkat digital dalam satu lanskap — tema teknologi, sains, dan konservasi.'},
 {id:'keep-tiger',t:'Keep Tiger in the Forest',c:'poster',client:'#keepthewildlifewild',type:'Poster kampanye · Global Tiger Day 2022',d:'Poster peringatan Hari Harimau Sedunia 2022 dengan palet malam hutan dan harimau sumatra sebagai pusat cerita.'},
 {id:'orangutan-info',t:'Infografis Orangutan',c:'info',client:'FORINA',type:'Ilustrasi infografis edukasi',d:'Perbandingan tiga spesies orangutan Indonesia: Sumatera, Tapanuli, dan Kalimantan — dari studi anatomi hingga infografis siap cetak.'},
 {id:'gibbon-day',t:'International Gibbon Day',c:'poster',client:'Karya kampanye',type:'Ilustrasi poster',d:'Owa dalam kanopi hutan penuh daun dan bunga, dengan pita tipografi tangan yang melingkari satwa.'},
 {id:'wildcats-color',t:'Wild Cats of the World',c:'satwa',client:'Proyek pribadi',type:'Ilustrasi sampul buku',d:'Seri kucing liar dunia — singa, harimau, cheetah, serval, hingga kucing hutan — dalam palet hangat savana dan rimba.'},
 {id:'bikecats-poster',t:'Bike Cats Festival',c:'poster',client:'Multispecies Festival',type:'Poster acara · 29–31 Juli 2022',d:'Pesepeda, harimau, dan macan tutul berbagi lanskap kota-hutan; rafflesia menjadi sentuhan khas Indonesia.'},
 {id:'kalender-2024',t:'Infografis Kalender 2024',c:'info',client:'Yayasan KIARA Indonesia',type:'Desain editorial / kalender konservasi',d:'Kalender konservasi yang menyajikan satwa endemik terancam punah seperti Elang Jawa dan Kukang Jawa: status, habitat, dan fakta unik.'},
 {id:'kalender-2026',t:'Kalender 2026 — Cover',c:'info',client:'Yayasan KIARA Indonesia',type:'Desain editorial / sampul kalender',d:'Sampul kalender 2026 Yayasan KIARA: kolase foto dan ilustrasi Owa Jawa dengan tipografi tegas dan pesan "Hutan tidak hanya rumah bagi owa, tetapi juga napas bagi manusia".'},
 {id:'owa-seed',t:'Jadilah Seperti Owa Jawa',c:'info',client:'Yayasan KIARA Indonesia',type:'Infografis edukasi',d:'Alur owa sebagai penyebar biji: dari memakan buah, bijinya terbawa, hingga tumbuh menjadi pohon baru — pesan "terus menanam, bukan menebang".'},
 {id:'made-by-our-hand',t:'Made by Our Hand',c:'satwa',client:'Karya pribadi',type:'Ilustrasi isu lingkungan',d:'Beruang kutub berdiri di atas botol plastik di laut yang tercemar — sampah buatan tangan manusia yang menenggelamkan rumah satwa.'},
 {id:'cassowary',t:'Cassowary — The World\'s Most Dangerous Bird',c:'satwa',client:'Karya pribadi',type:'Ilustrasi sampul',d:'Potret kasuari dengan palet biru dan jingga yang berani serta tipografi tangan yang ekspresif.'},
 {id:'aesthetic-predator',t:'Aesthetic Predator',c:'satwa',client:'Karya pribadi',type:'Ilustrasi digital',d:'Harimau dan macan tutul hitam menyelam berpilin di air toska — studi gerak, warna, dan simetri.'},
 {id:'gps-cover',t:'Sampul Panduan GPS Collar',c:'buku',client:'Forum Harimaukita',type:'Ilustrasi editorial / sampul buku',d:'Sampul buku panduan pemasangan GPS collar pada kucing besar di Indonesia; satwa, peta, dan jalur pelacakan menyatu.'},
 {id:'book-wageningen',t:'Sampul Buku Akademik',c:'buku',client:'Lisa Tanika — Wageningen University & Research',type:'Ilustrasi editorial / sampul buku ilmiah',d:'Tangan menopang tanah dengan pohon di atasnya: hubungan manusia dengan sumber daya air dan keseimbangan ekosistem.'},
 {id:'bugs-collage',t:'Seri Serangga',c:'satwa',client:'Karya pribadi',type:'Ilustrasi naturalis',d:'Tujuh serangga — kumbang, kepik, dan wereng — digambar dengan detail tekstur dan pola warna yang mencolok.'},
 {id:'gibbon-tee',t:'Desain Kaos Owa Jawa',c:'merch',client:'Yayasan KIARA Indonesia',type:'Desain merchandise',d:'Line art Owa Jawa (Hylobates moloch) dengan elemen infografis, dicetak pada kaos hijau tua.'},
 {id:'tee-mockup',t:'Mockup Kaos Owa Jawa',c:'merch',client:'Yayasan KIARA Indonesia',type:'Desain merchandise',d:'Hasil desain pada kaos: edukasi satwa endemik yang bisa dipakai sehari-hari.'},
 {id:'asf-layout',t:'Layout Buku Panduan ASF',c:'buku',client:'Forum Harimaukita',type:'Desain editorial / layout buku',d:'Layout buku penanganan African Swine Fever pada babi hutan dengan grid jelas dan infografis alur untuk materi teknis.'},
 {id:'fhk-1',t:'Buku Cerita Anak: Pak Kasim & Sang Datuk',c:'buku',client:'Ilustrasi buku anak',type:'Ilustrasi cerita',d:'Ilustrasi halaman cerita bernuansa hangat tentang manusia dan harimau di sekitar hutan.'},
 {id:'fhk-2',t:'Buku Cerita Anak: Halaman Dalam',c:'buku',client:'Ilustrasi buku anak',type:'Ilustrasi cerita',d:'Adegan kamar tidur anak dengan palet cokelat hangat dan tipografi yang ikut bercerita.'},
 {id:'grizzly',t:'Infografis Beruang Grizzly',c:'info',client:'Latihan infografis',type:'Ilustrasi vektor',d:'Fakta beruang grizzly: habitat air terjun, jejak kaki, dan ukuran — gaya vektor datar yang ceria.'},
 {id:'asf-carousel',t:'Carousel Instagram Edukasi ASF',c:'info',client:'Media sosial',type:'Desain konten media sosial',d:'Rangkaian carousel untuk menyampaikan informasi ASF secara ringkas dan mudah dipindai di Instagram.'},
 {id:'bikecats-banner',t:'Banner Bike Cats Festival',c:'poster',client:'Multispecies Festival',type:'Banner & materi acara',d:'Banner acara dengan harimau dan macan tutul di antara dedaunan, sejalan dengan poster utama.'},
 {id:'diver',t:'Penyelam',c:'satwa',client:'Karya pribadi',type:'Lukisan digital',d:'Seorang penyelam dengan cahaya kecil di hadapan rahang raksasa laut dalam — permainan skala dan cahaya.'}
];
// semua gambar yang bisa dibuka dari studi kasus
var EXTRA={
 'wwd-event':{t:'Diskusi World Wildlife Day 2024',tag:'Dokumentasi',client:'Multispecies Event',type:'Dokumentasi acara',d:'Poster tampil pada layar saat diskusi panel World Wildlife Day 2024 di Cafe Taman Koleksi, Bogor.'},
 'orangutan-field':{t:'Papan Informasi Orangutan',tag:'Dokumentasi',client:'FORINA',type:'Terpasang di ruang publik',d:'Infografis orangutan setelah dicetak dan dipasang sebagai papan edukasi di taman.'},
 'orangutan-process':{t:'Lembar Proses Orangutan',tag:'Proses',client:'FORINA',type:'Sketsa → revisi → final',d:'Tahapan studi anatomi, sketsa awal, tiga kali revisi, hingga versi final untuk tiga spesies.'},
 'bikecats-stage':{t:'Backdrop Panggung Bike Cats',tag:'Dokumentasi',client:'Multispecies Festival',type:'Backdrop acara',d:'Visual festival diterapkan pada backdrop panggung dan menjadi latar sesi talkshow.'}
};
if(LANG==='en'){
  for(var ck in CAT)CAT[ck]=tr(CAT[ck]);
  WORKS.forEach(function(w){w.t=tr(w.t);w.type=tr(w.type);w.d=tr(w.d);w.client=tr(w.client)});
  for(var ek in EXTRA){var x=EXTRA[ek];x.t=tr(x.t);x.tag=tr(x.tag);x.type=tr(x.type);x.d=tr(x.d);x.client=tr(x.client)}
}
var byId={};
WORKS.forEach(function(w){byId[w.id]=w});

/* ---------- loader ---------- */
window.addEventListener('load',function(){setTimeout(function(){$('#loader').classList.add('done')},350)});
setTimeout(function(){$('#loader').classList.add('done')},3000);

/* ---------- tema siang / malam ---------- */
var root=document.documentElement,modeBtn=$('#mode');
function setTheme(t){root.setAttribute('data-theme',t);modeBtn.setAttribute('aria-pressed',t==='night');try{localStorage.setItem('von-theme',t)}catch(e){}}
try{var saved=localStorage.getItem('von-theme');if(saved)setTheme(saved)}catch(e){}
modeBtn.addEventListener('click',function(){setTheme(root.getAttribute('data-theme')==='night'?'day':'night')});

/* ---------- nav solid ---------- */
var nav=$('#nav');
function onScroll(){
  nav.classList.toggle('solid',window.scrollY>hero.offsetHeight-80);
  hero.style.setProperty('--sy',Math.min(window.scrollY,900));
}
var hero=$('#hero');
window.addEventListener('scroll',onScroll,{passive:true});onScroll();

/* ---------- parallax hero ---------- */
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce){
  hero.addEventListener('pointermove',function(e){
    var r=hero.getBoundingClientRect();
    hero.style.setProperty('--mx',((e.clientX-r.left)/r.width-.5).toFixed(3));
    hero.style.setProperty('--my',((e.clientY-r.top)/r.height-.5).toFixed(3));
  });
  hero.addEventListener('pointerleave',function(){hero.style.setProperty('--mx',0);hero.style.setProperty('--my',0)});
  window.addEventListener('deviceorientation',function(e){
    if(e.gamma==null)return;
    hero.style.setProperty('--mx',(Math.max(-30,Math.min(30,e.gamma))/60).toFixed(3));
    hero.style.setProperty('--my',(Math.max(-30,Math.min(30,(e.beta||0)-45))/60).toFixed(3));
  });
}

/* ---------- kursor kustom ---------- */
var cur=$('#cursor');
if(window.matchMedia('(pointer:fine)').matches){
  var cx=0,cy=0,tx=0,ty=0;
  window.addEventListener('pointermove',function(e){tx=e.clientX;ty=e.clientY});
  (function loop(){cx+=(tx-cx)*.22;cy+=(ty-cy)*.22;cur.style.transform='translate('+cx+'px,'+cy+'px)';requestAnimationFrame(loop)})();
  document.addEventListener('pointerover',function(e){
    var t=e.target.closest&&e.target.closest('.card,.shot');
    cur.classList.toggle('big',!!t);
  });
}

/* ---------- reveal ---------- */
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
$$('.reveal').forEach(function(el){io.observe(el)});

/* ---------- galeri ---------- */
var grid=$('#grid');
WORKS.forEach(function(w,i){
  var b=document.createElement('button');
  b.className='card';b.type='button';b.dataset.cat=w.c;b.dataset.id=w.id;
  b.style.animationDelay=(i%6)*70+'ms';
  b.setAttribute('aria-label',tr('Buka karya:')+' '+w.t);
  b.innerHTML='<img src="'+IMG+w.id+'-t.webp" alt="'+w.t+' — '+w.type+'" loading="lazy"><div class="cap"><small>'+CAT[w.c]+'</small><strong>'+w.t+'</strong></div>';
  grid.appendChild(b);
});
var LIMIT=8,expanded=false,moreWrap=$('#moreWrap'),moreBtn=$('#moreBtn'),moreN=$('#moreN');
function applyMore(){
  if(!moreWrap||!moreBtn)return;
  var small=window.innerWidth<=700,shown=$$('.card:not(.hide)',grid),extra=small&&!expanded?Math.max(0,shown.length-LIMIT):0;
  shown.forEach(function(c,i){c.classList.toggle('more',small&&!expanded&&i>=LIMIT)});
  moreWrap.hidden=!extra;moreN.textContent='(+'+extra+')';
}
if(moreBtn)moreBtn.addEventListener('click',function(){expanded=true;applyMore()});
window.addEventListener('resize',applyMore);applyMore();
$('#filters').addEventListener('click',function(e){
  var c=e.target.closest('.chip');if(!c)return;
  $$('#filters .chip').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-selected','false')});
  c.classList.add('on');c.setAttribute('aria-selected','true');
  var f=c.dataset.f,n=0;
  $$('.card',grid).forEach(function(card){
    var show=f==='all'||card.dataset.cat===f;
    card.classList.toggle('hide',!show);
    if(show){card.style.animation='none';void card.offsetWidth;card.style.animation='';card.style.animationDelay=(n++%6)*60+'ms'}
  });
  expanded=false;applyMore();
});

/* ---------- lightbox ---------- */
var lb=$('#lb'),lbImg=$('#lbImg'),order=[],idx=0,lastFocus=null;
function visibleIds(){return $$('.card:not(.hide)',grid).map(function(c){return c.dataset.id})}
function show(id){
  var w=byId[id],tag,cat;
  if(w){tag=CAT[w.c]}else if(EXTRA[id]){w=EXTRA[id];tag=w.tag}else return;
  lbImg.src=IMG+id+'.webp';lbImg.alt=w.t;
  $('#lbTag').textContent=tag;$('#lbTitle').textContent=w.t;
  $('#lbMeta').innerHTML='<div><dt>'+tr('Klien / Konteks')+'</dt><dd></dd></div><div><dt>'+tr('Jenis')+'</dt><dd></dd></div>';
  var dd=$$('#lbMeta dd');dd[0].textContent=w.client;dd[1].textContent=w.type;
  $('#lbDesc').textContent=w.d;
  var multi=order.length>1;$('#lbPrev').hidden=!multi;$('#lbNext').hidden=!multi;
}
function openLb(id,list){
  order=list&&list.length?list:[id];idx=Math.max(0,order.indexOf(id));
  lastFocus=document.activeElement;
  lb.hidden=false;document.body.style.overflow='hidden';show(order[idx]);$('#lbX').focus();
}
function closeLb(){lb.hidden=true;document.body.style.overflow='';if(lastFocus&&lastFocus.focus)lastFocus.focus()}
function step(d){if(order.length<2)return;idx=(idx+d+order.length)%order.length;show(order[idx])}
grid.addEventListener('click',function(e){var c=e.target.closest('.card');if(c)openLb(c.dataset.id,visibleIds())});
document.addEventListener('click',function(e){var s=e.target.closest('[data-open]');if(s)openLb(s.dataset.open,[s.dataset.open])});
$('#lbX').addEventListener('click',closeLb);
$('#lbPrev').addEventListener('click',function(){step(-1)});
$('#lbNext').addEventListener('click',function(){step(1)});
$('#lbCta').addEventListener('click',closeLb);
lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-box')||e.target.classList.contains('lb-img'))closeLb()});
/* ---------- menu mobile ---------- */
(function(){
  var btn=$('#menuBtn'),panel=$('#mnav'),navEl=$('#nav');if(!btn)return;
  function set(o){panel.classList.toggle('open',o);navEl.classList.toggle('open',o);document.body.classList.toggle('menu-open',o);btn.setAttribute('aria-expanded',o);btn.setAttribute('aria-label',tr(o?'Tutup menu':'Buka menu'));panel.setAttribute('aria-hidden',!o)}
  btn.addEventListener('click',function(){set(!panel.classList.contains('open'))});
  $$('a',panel).forEach(function(a){a.addEventListener('click',function(){set(false)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&panel.classList.contains('open'))set(false)});
  window.addEventListener('resize',function(){if(window.innerWidth>760)set(false)});
})();
document.addEventListener('keydown',function(e){
  if(lb.hidden)return;
  if(e.key==='Escape')closeLb();
  if(e.key==='ArrowLeft')step(-1);
  if(e.key==='ArrowRight')step(1);
});


/* ---------- peta karya ---------- */
if(window.MAPDATA){
try{(function(){
  var M=window.MAPDATA,svg=$('#map'),stage=$('#mapStage'),tilt=$('#mapTilt'),iconsEl=$('#mapIcons'),wrap=$('.map-wrap'),ICON='assets/icons/';
  // Daftar hewan per pulau: n = nama tampil, f = nama file ikon di assets/icons (tanpa ekstensi)
  var REG=[
   {k:'sumatera',n:'Sumatera',s:'Pulau Sumatera',b:'Orangutan Sumatera dan Tapanuli, serta harimau — dua kelompok satwa kunci konservasi Indonesia.',w:['orangutan-info','keep-tiger'],
    a:[{n:'Orangutan Tapanuli',f:'orangutan-tapanuli'},{n:'Harimau Sumatera',f:'harimau-sumatera'},{n:'Gajah Sumatera',f:'gajah-sumatera'},{n:'Badak Sumatera',f:'badak-sumatera'}]},
   {k:'kalimantan',n:'Kalimantan',s:'Pulau Borneo',b:'Habitat orangutan Kalimantan, salah satu dari tiga spesies orangutan Indonesia.',w:['orangutan-info','orangutan-field'],
    a:[{n:'Orangutan Kalimantan',f:'orangutan-kalimantan'},{n:'Bekantan',f:'bekantan'},{n:'Enggang Gading',f:'enggang-gading'},{n:'Beruang Madu',f:'beruang-madu'}]},
   {k:'jawa',n:'Jawa',s:'Bogor · Halimun Salak',b:'Rumah Owa Jawa, Elang Jawa, dan Kukang Jawa — sekaligus tempat festival dan acara konservasi di Bogor.',w:['owa-seed','kalender-2026','kalender-2024','gibbon-tee','bikecats-poster','wwd-poster'],
    a:[{n:'Owa Jawa',f:'owa-jawa'},{n:'Elang Jawa',f:'elang-jawa'},{n:'Kukang Jawa',f:'kukang-jawa'},{n:'Badak Jawa',f:'badak-jawa'},{n:'Macan Tutul Jawa',f:'macan-tutul-jawa'}]},
   {k:'sulawesi',n:'Sulawesi',s:'Pulau Sulawesi',b:'Pulau dengan satwa endemik yang unik, dari anoa hingga tarsius.',w:[],
    a:[{n:'Anoa',f:'anoa'},{n:'Tarsius',f:'tarsius'},{n:'Babirusa',f:'babirusa'},{n:'Maleo',f:'maleo'}]},
   {k:'maluku',n:'Maluku',s:'Kepulauan Maluku',b:'Burung-burung endemik kepulauan rempah.',w:[],
    a:[{n:'Kakatua Maluku',f:'kakatua-maluku'},{n:'Bidadari Halmahera',f:'bidadari-halmahera'},{n:'Kasturi Ternate',f:'kasturi-ternate'}]},
   {k:'nusatenggara',n:'Nusa Tenggara',s:'Bali · Nusa Tenggara',b:'Dari komodo hingga jalak bali, rumah satwa-satwa ikonik.',w:[],
    a:[{n:'Komodo',f:'komodo'},{n:'Jalak Bali',f:'jalak-bali'},{n:'Kakatua Jambul Kuning',f:'kakatua-jambul-kuning'}]},
   {k:'papua',n:'Papua',s:'Tanah Papua',b:'Hutan tropis Papua dan sekitarnya, rumah kasuari.',w:['cassowary'],
    a:[{n:'Kasuari',f:'kasuari'},{n:'Cenderawasih',f:'cenderawasih'},{n:'Kanguru Pohon',f:'kanguru-pohon'}]},
   {k:'global',n:'Lintas Wilayah',s:'Karya global',b:'Karya yang tidak terikat satu wilayah: kucing liar dunia, serangga, owa, dan isu lingkungan global.',w:['wildcats-color','bugs-collage','gibbon-day','gps-cover','aesthetic-predator','made-by-our-hand'],a:[],nomap:true}
  ];
  if(LANG==='en')REG.forEach(function(r){r.n=tr(r.n);r.s=tr(r.s);r.b=tr(r.b);r.a.forEach(function(a){a.n=tr(a.n)})});
  var byK={};REG.forEach(function(r){byK[r.k]=r});
  var LAYERS=10,VB={x:-24,y:-16,w:M.W+48,h:M.H+40};
  // ---- bangun svg ----
  var defs='<defs><linearGradient id="gTop" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="'+M.H+'"><stop offset="0" style="stop-color:var(--g1)"/><stop offset="1" style="stop-color:var(--g2)"/></linearGradient>'+
    '<linearGradient id="gTopHi" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="'+M.H+'"><stop offset="0" style="stop-color:var(--h1)"/><stop offset="1" style="stop-color:var(--h2)"/></linearGradient>'+
    '<filter id="blur" x="-10%" y="-10%" width="120%" height="130%"><feGaussianBlur stdDeviation="5"/></filter>';
  M.isl.forEach(function(s){defs+='<path id="p-'+s.k+'" d="'+s.d+'"/>'});
  defs+='</defs>';
  var h=defs;
  ['th','ph','my','bn','pg','tl','sg','au'].forEach(function(k){if(M.nb[k])h+='<path class="nb" d="'+M.nb[k]+'"/>'});
  M.isl.forEach(function(s,n){
    var reg=byK[s.k],st=!reg;
    h+='<g class="isl'+(st?' static':'')+'" style="--n:'+n+'"'+(st?'':' data-k="'+s.k+'" tabindex="0" role="button" aria-label="'+tr('Pulau')+' '+reg.n+' '+tr('— lihat satwa dan karya')+'"')+'>';
    h+='<use class="gs" href="#p-'+s.k+'"/>';
    for(var i=1;i<=LAYERS;i++)h+='<use class="sl'+(i%2?'':' b')+'" style="--i:'+i+'" href="#p-'+s.k+'"/>';
    h+='<use class="top" href="#p-'+s.k+'"/>';
    if(!st&&s.label){h+='<text class="lbl" x="'+s.label[0]+'" y="'+s.label[1]+'">'+reg.n+'</text>'; if(reg.w.length)h+='<text class="cnt" x="'+s.label[0]+'" y="'+(s.label[1]+12)+'">● '+reg.w.length+' '+tr('KARYA')+'</text>'}
    h+='</g>';
  });
  svg.setAttribute('viewBox',VB.x+' '+VB.y+' '+VB.w+' '+VB.h);stage.style.aspectRatio=VB.w+'/'+VB.h;svg.innerHTML=h;

  // ---- ikon hewan (overlay HTML) ----
  var PAW='<svg class="ph" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><ellipse cx="12" cy="16.2" rx="5" ry="4.1"/><ellipse cx="5.2" cy="11" rx="2.1" ry="2.8"/><ellipse cx="9.2" cy="6.6" rx="2.1" ry="2.9"/><ellipse cx="14.8" cy="6.6" rx="2.1" ry="2.9"/><ellipse cx="18.8" cy="11" rx="2.1" ry="2.8"/></svg>';
  function mkIcon(a){
    var bb=document.createElement('div');bb.className='bb';
    var img=new Image();img.alt=a.n;img.src=ICON+a.f+'.svg';img.dataset.try='svg';
    img.onerror=function(){if(img.dataset.try==='svg'){img.dataset.try='png';img.src=ICON+a.f+'.png'}else{bb.innerHTML=PAW}};
    bb.appendChild(img);return bb;
  }
  var groups={};
  function layout(){
    var sc=stage.clientWidth/VB.w,SW=stage.clientWidth,SH=stage.clientHeight,small=window.innerWidth<=900;
    M.isl.forEach(function(s){
      var reg=byK[s.k];if(!reg||!s.label)return;
      var g=groups[s.k];
      if(!g){
        g=document.createElement('div');g.className='ig';
        reg.a.forEach(function(a,i){
          var ico=document.createElement('div');ico.className='ico';
          var b=document.createElement('div');b.className='b';b.style.setProperty('--d',(i*70)+'ms');
          b.appendChild(mkIcon(a));
          var n=document.createElement('span');n.className='n';n.textContent=a.n;b.appendChild(n);
          ico.appendChild(b);g.appendChild(ico);
        });
        iconsEl.appendChild(g);groups[s.k]=g;
      }
      var px=(s.label[0]-VB.x)*sc,py=(s.label[1]-VB.y)*sc;
      g.style.setProperty('--x',(px/SW*100)+'%');g.style.setProperty('--y',(py/SH*100)+'%');
      var N=reg.a.length,k=small?.72:1;
      var rx=Math.max(80,N*38)*k,ry=Math.max(66,Math.max(80,N*38)*.6)*k;
      var span=N<=1?0:Math.min(130,70+(N-2)*20);
      $$('.ico',g).forEach(function(ico,i){
        var ang=(N===1?-90:(-90+span*(i/(N-1)-.5)))*Math.PI/180;
        var dx=Math.cos(ang)*rx,dy=Math.sin(ang)*ry-8+(i%2?18:0),pad=small?34:42;
        var cx=px+dx,cy=py+dy;
        if(cx<pad)dx+=pad-cx;if(cx>SW-pad)dx-=cx-(SW-pad);
        if(cy<pad)dy+=pad-cy;if(cy>SH-pad-16)dy-=cy-(SH-pad-16);
        var b=$('.b',ico);b.style.setProperty('--dx',dx.toFixed(1)+'px');b.style.setProperty('--dy',dy.toFixed(1)+'px');
      });
    });
  }
  var hoverK=null,selK=null;
  function refresh(){var k=hoverK||selK;Object.keys(groups).forEach(function(x){groups[x].classList.toggle('show',x===k)});$$('#map .isl').forEach(function(g){g.classList.toggle('dim',!!k&&g.dataset.k!==k)})}
  layout();window.addEventListener('resize',layout);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(layout);

  // ---- interaksi pulau ----
  $$('#map .isl:not(.static)').forEach(function(g){
    var k=g.dataset.k;
    g.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse'){hoverK=k;refresh();stage.classList.add('used');if(k==='jawa')owaPlay()}});
    g.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse'){if(hoverK===k)hoverK=null;refresh()}});
    g.addEventListener('focus',function(){hoverK=k;refresh()});
    g.addEventListener('blur',function(){if(hoverK===k)hoverK=null;refresh()});
  });
  // tilt + spotlight
  var fine=window.matchMedia('(pointer:fine)').matches&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(fine){
    stage.addEventListener('pointermove',function(e){
      var r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
      tilt.style.setProperty('--ry',((x-.5)*3.2).toFixed(2)+'deg');tilt.style.setProperty('--rx',((.5-y)*2.4).toFixed(2)+'deg');
      stage.style.setProperty('--sx',(x*100)+'%');stage.style.setProperty('--sy',(y*100)+'%');
    });
    stage.addEventListener('pointerleave',function(){tilt.style.setProperty('--rx','0deg');tilt.style.setProperty('--ry','0deg')});
  }
  // reveal pulau
  new IntersectionObserver(function(es,ob){if(es[0].isIntersecting){wrap.classList.add('in');ob.disconnect()}},{threshold:.25}).observe(wrap);

  // ---- kartu & chip ----
  var chips=$('#regionChips'),card=$('#mapCard');
  REG.forEach(function(r){var b=document.createElement('button');b.type='button';b.className='chip';b.dataset.k=r.k;b.setAttribute('role','tab');b.textContent=r.n;chips.appendChild(b)});
  function title(id){var w=byId[id]||EXTRA[id];return w?w.t:id}
  function esc(s){return String(s).replace(/"/g,'&quot;')}
  /* ---- suara owa: mati secara default, dinyalakan pengunjung ---- */
  var SND={on:false,a:null,last:0,raf:0},sndBtn=$('#sndBtn');
  try{SND.on=localStorage.getItem('von-snd')==='1'}catch(e){}
  function sndAudio(){if(!SND.a){SND.a=new Audio('assets/audio/owa.mp3');SND.a.preload='auto';
    SND.a.addEventListener('play',function(){sndBtn&&sndBtn.classList.add('playing')});
    ['pause','ended'].forEach(function(ev){SND.a.addEventListener(ev,function(){sndBtn&&sndBtn.classList.remove('playing')})})}return SND.a}
  function sndFade(to,ms,done){var a=SND.a;if(!a)return;cancelAnimationFrame(SND.raf);var from=a.volume,t0=performance.now();
    (function step(now){var k=Math.min(1,(now-t0)/ms);try{a.volume=from+(to-from)*k}catch(e){}if(k<1)SND.raf=requestAnimationFrame(step);else if(done)done()})(t0)}
  function owaPlay(force){
    if(!SND.on)return;var a=sndAudio();
    if(!a.paused&&!force)return;
    if(!force&&Date.now()-SND.last<9000)return;
    SND.last=Date.now();try{a.currentTime=0;a.volume=0}catch(e){}
    var p=a.play();if(p&&p.catch)p.catch(function(){});sndFade(.75,700);
  }
  function owaStop(){if(SND.a&&!SND.a.paused)sndFade(0,500,function(){SND.a.pause()})}
  function sndSet(on){SND.on=on;try{localStorage.setItem('von-snd',on?'1':'0')}catch(e){}
    if(sndBtn){sndBtn.setAttribute('aria-pressed',on);var l=tr(on?'Matikan suara owa':'Nyalakan suara owa');sndBtn.setAttribute('aria-label',l);sndBtn.title=l}
    if(!on)owaStop()}
  if(sndBtn){sndSet(SND.on);sndBtn.addEventListener('click',function(){var on=!SND.on;sndSet(on);if(on)owaPlay(true)})}
  document.addEventListener('visibilitychange',function(){if(document.hidden)owaStop()});
  if('IntersectionObserver' in window)new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)owaStop()})}).observe(stage);

  function select(k,user){
    var r=byK[k];if(!r)return;selK=r.nomap?null:k;refresh();
    if(user&&k==='jawa')owaPlay();
    $$('#map .isl:not(.static)').forEach(function(g){g.classList.toggle('on',g.dataset.k===k)});
    $$('#regionChips .chip').forEach(function(c){var on=c.dataset.k===k;c.classList.toggle('on',on);c.setAttribute('aria-selected',on)});
    var fauna=r.a.length?'<div class="fauna">'+r.a.map(function(a,i){return '<span><i class="fi" data-i="'+i+'"></i>'+a.n+'</span>'}).join('')+'</div>':'';
    var right;
    if(r.w.length){
      right='<div class="thumbs">'+r.w.map(function(id){return '<button type="button" data-id="'+id+'" data-t="'+esc(title(id))+'" aria-label="'+tr('Buka karya:')+' '+esc(title(id))+'"><img src="'+IMG+id+'-t.webp" alt="" loading="lazy"></button>'}).join('')+'</div>';
    }else{
      right='<div class="empty"><strong>'+tr('Belum ada karya di wilayah ini')+'</strong><span>'+tr('Saya terbuka untuk proyek ilustrasi satwa dan konservasi di')+' '+r.n+'.</span><a class="btn primary sm" href="#kontak">'+tr('Diskusi proyek →')+'</a></div>';
    }
    card.innerHTML='<div class="rg-text"><span class="rg-sub">'+r.s+'</span><h3>'+r.n+'</h3><p>'+r.b+'</p>'+fauna+'<div class="cnt2">'+(r.w.length?r.w.length+' '+tr('karya terkait'):tr('Belum ada karya'))+'</div>'+(r.w.length?'<a class="btn ghost sm" href="#karya" style="align-self:flex-start;margin-top:4px">'+tr('Lihat semua karya →')+'</a>':'')+'</div>'+right;
    $$('.fauna .fi',card).forEach(function(el){el.appendChild(mkIcon(r.a[+el.dataset.i]))});
    card._r=r;
  }
  svg.addEventListener('click',function(e){var g=e.target.closest('.isl:not(.static)');if(g){select(g.dataset.k,true);stage.classList.add('used')}});
  svg.addEventListener('keydown',function(e){var g=e.target.closest&&e.target.closest('.isl:not(.static)');if(g&&(e.key==='Enter'||e.key===' ')){e.preventDefault();select(g.dataset.k,true)}});
  chips.addEventListener('click',function(e){var c=e.target.closest('.chip');if(c)select(c.dataset.k,true)});
  card.addEventListener('click',function(e){var b=e.target.closest('.thumbs button');if(b&&card._r)openLb(b.dataset.id,card._r.w)});
  select('jawa');
})();}catch(err){console.error('Peta: '+err.message+' | '+String(err.stack||'').split('\n').slice(0,3).join(' / '))}
}

/* ---------- before / after ---------- */
try{
var BA=[
 {before:'wildcats-sketch',after:'wildcats-color',l:'Sketsa',r:'Final',ratio:'1/1',altB:'Sketsa garis Wild Cats of the World',altA:'Wild Cats of the World versi final berwarna'},
 {before:'tiger-gray',after:'tiger-color',l:'Grayscale',r:'Warna final',ratio:'2/1',altB:'Harimau dan elang tahap grayscale',altA:'Harimau dan elang versi berwarna'}
];
var ba=$('#ba'),handle=$('#baHandle');
function setP(p){p=Math.max(0,Math.min(100,p));ba.style.setProperty('--p',p);handle.setAttribute('aria-valuenow',Math.round(p))}
function loadBA(i){
  var d=BA[i];
  ba.style.aspectRatio=d.ratio;ba.style.width=d.ratio==='1/1'?'min(680px,100%)':'min(960px,100%)';
  $('#baBefore').src=IMG+d.before+'.webp';$('#baBefore').alt=tr(d.altB);
  $('#baAfter').src=IMG+d.after+'.webp';$('#baAfter').alt=tr(d.altA);
  $('#baTagL').textContent=tr(d.l);$('#baTagR').textContent=tr(d.r);setP(50);
}
loadBA(0);
$('#baTabs').addEventListener('click',function(e){
  var c=e.target.closest('.chip');if(!c)return;
  $$('#baTabs .chip').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-selected','false')});
  c.classList.add('on');c.setAttribute('aria-selected','true');loadBA(+c.dataset.ba);
});
var dragging=false;
function move(e){var r=ba.getBoundingClientRect();setP((e.clientX-r.left)/r.width*100)}
ba.addEventListener('pointerdown',function(e){dragging=true;ba.setPointerCapture(e.pointerId);move(e)});
ba.addEventListener('pointermove',function(e){if(dragging)move(e)});
ba.addEventListener('pointerup',function(){dragging=false});
ba.addEventListener('pointercancel',function(){dragging=false});
handle.addEventListener('keydown',function(e){
  var v=+handle.getAttribute('aria-valuenow');
  if(e.key==='ArrowLeft'){setP(v-5);e.preventDefault()}
  if(e.key==='ArrowRight'){setP(v+5);e.preventDefault()}
});
// demo gerak kecil saat pertama terlihat
var demoDone=false;
new IntersectionObserver(function(es,ob){
  if(es[0].isIntersecting&&!demoDone&&!reduce){demoDone=true;var t=0;(function a(){t+=.04;setP(50+Math.sin(t*3)*22*Math.max(0,1-t/2.2));if(t<2.2&&!dragging)requestAnimationFrame(a);else setP(dragging?+handle.getAttribute('aria-valuenow'):50)})();ob.disconnect()}
},{threshold:.6}).observe(ba);

/* ---------- wizard brief ---------- */
var wiz=$('#wiz'),stepEls=$$('.step',wiz),bars=$$('.steps i',wiz),stepNo=1;
function goStep(n){
  stepNo=n;
  stepEls.forEach(function(s){s.classList.toggle('on',+s.dataset.step===n)});
  bars.forEach(function(b,i){b.classList.toggle('on',i<n)});
  if(n===3)buildPreview();
}
function chosen(){return $$('#opts input:checked').map(function(i){return tr(i.value)})}
function msg(){
  var n=$('#f-nama').value.trim(),o=$('#f-org').value.trim(),dl=$('#f-dl').value.trim(),b=$('#f-bud').value,d=$('#f-desc').value.trim();
  var L=[tr('Halo Irfan, saya melihat portofolio Voice of Nature dan ingin berdiskusi proyek.'),''];
  L.push(tr('Nama:')+' '+n);
  if(o)L.push(tr('Organisasi/Brand:')+' '+o);
  L.push(tr('Kebutuhan:')+' '+chosen().join(', '));
  if(dl)L.push(tr('Target selesai:')+' '+dl);
  if(b)L.push(tr('Kisaran anggaran:')+' '+b);
  if(d){L.push('');L.push(tr('Gambaran proyek:'));L.push(d)}
  return L.join('\n');
}
function buildPreview(){
  var m=msg();$('#preview').textContent=m;
  $('#sendWa').href='https://wa.me/6281387884644?text='+encodeURIComponent(m);
  $('#sendMail').href='mailto:irfanfirmansyah90@gmail.com?subject='+encodeURIComponent(tr('Proyek ilustrasi —')+' '+($('#f-nama').value.trim()||tr('Brief baru')))+'&body='+encodeURIComponent(m);
}
wiz.addEventListener('click',function(e){
  if(e.target.closest('[data-next]')){
    if(stepNo===1){if(!chosen().length){$('#err1').hidden=false;return}$('#err1').hidden=true}
    if(stepNo===2){if(!$('#f-nama').value.trim()){$('#err2').hidden=false;$('#f-nama').focus();return}$('#err2').hidden=true}
    goStep(stepNo+1);
  }else if(e.target.closest('[data-prev]')){goStep(stepNo-1)}
});
wiz.addEventListener('submit',function(e){e.preventDefault()});

$('#yr').textContent=new Date().getFullYear();
}catch(err){console.error('Proses/Kontak: '+err.message+' | '+String(err.stack||'').split('\n').slice(0,3).join(' / '))}
})();
window.__mainOK=true;
