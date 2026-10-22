const $=s=>document.querySelector(s),L=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}},S=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
const fa=n=>Number(n).toLocaleString('fa-IR');
const toast=t=>{const e=$('#tg');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),2200)};
const DEF=[{id:1,im:2,l:'لواسان',t:'ویلای شیشه‌ای لواسان',a:620,r:5,p:48000000000,f:2},{id:2,im:1,l:'لواسان',t:'ویلای مدرن با باغ',a:480,r:4,p:36500000000,f:8},{id:3,im:0,l:'نیاوران',t:'خانه هنری با لابی چوبی',a:390,r:4,p:29000000000,f:56},{id:4,l:'شمال',t:'ویلای استخردار شمال',a:710,r:6,p:61000000000,f:84},{id:5,l:'الهیه',t:'سالن اصلی با پذیرایی باز',a:540,r:5,p:44800000000,f:112},{id:6,l:'نیاوران',t:'پنت‌هاوس نورگیر',a:330,r:3,p:25500000000,f:142}];
let P=L('ao_p3',DEF),C=L('ao_c',[]),O=L('ao_o',[]);
// tour
const imgs=FR.map(s=>{const i=new Image();i.src=s;return i}),cx=$('#cv').getContext('2d'),chs=[...document.querySelectorAll('.ch')],tour=$('#tour');
let tgt=0,cur=0,shown=-1,done=0;
function hideLd(){const l=$('#ld');if(l){l.style.opacity=0;l.style.pointerEvents='none';setTimeout(()=>l.remove(),700)}}
imgs.forEach(i=>{const f=()=>{done++;$('#lp').textContent=fa(Math.min(100,Math.round(done/150*100)))+'٪';if(done>=150)hideLd()};if(i.complete&&i.naturalWidth)f();else{i.onload=i.onerror=f}});
setTimeout(hideLd,3500);
let H=700;function sz(){H=Math.min(innerHeight||700,920);tour.style.height=H*4.8+'px';$('.stick').style.height=H+'px';sc()}
function sc(){const r=tour.getBoundingClientRect();tgt=Math.min(1,Math.max(0,-r.top/(r.height-H)))}
addEventListener('scroll',sc,{passive:true});addEventListener('resize',sz);sz();
(function loop(){cur+=(tgt-cur)*.12;const k=Math.min(149,Math.round(cur*149));if(k!==shown&&imgs[k].complete&&imgs[k].naturalWidth){cx.drawImage(imgs[k],0,0,720,1280);shown=k}
$('#bar').style.width=cur*100+'%';const ci=Math.min(3,Math.floor(cur*4.0));chs.forEach((c,i)=>c.classList.toggle('on',i===ci));
requestAnimationFrame(loop)})();
// products
let F={q:'',r:0,p:0,a:0};$('#sb').onclick=()=>{F={q:$('#sq').value.trim(),r:+$('#sr').value,p:+$('#sp').value,a:+$('#sa').value};grid();$('#props').scrollIntoView()};
function grid(){const L2=P.filter(p=>(!F.q||(p.l||'').includes(F.q)||p.t.includes(F.q))&&p.r>=F.r&&(!F.p||p.p<=F.p)&&p.a>=F.a);$('#gd').innerHTML=(L2.length?L2:[]).map(p=>`<div class="card"><img src="${p.im!=null?PH[p.im]:FR[p.f]}" alt="${p.t}"><div class="in"><h3>${p.t}</h3><div class="m">${p.l||''} | ${fa(p.a)} متر | ${fa(p.r)} خواب</div><div class="pr">${fa(p.p)} تومان</div><button class="btn b" data-a="${p.id}">افزودن به سبد</button></div></div>`).join('');
document.querySelectorAll('.card').forEach(c=>{c.onmousemove=e=>{const b=c.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;c.style.transform=`rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(8px)`};c.onmouseleave=()=>c.style.transform=''})}
$('#gd').onclick=e=>{const id=+e.target.dataset.a;if(!id)return;if(!C.includes(id))C.push(id);S('ao_c',C);cart();toast('به سبد اضافه شد');$('#dr').classList.add('o')};
function cart(){$('#cc').textContent=fa(C.length);const it=C.map(i=>P.find(p=>p.id===i)).filter(Boolean);$('#ci').innerHTML=it.length?it.map(p=>`<div class="row"><span>${p.t}<br><small>${fa(p.p)} تومان</small></span><button class="btn g" data-r="${p.id}">حذف</button></div>`).join(''):'<p style="margin:14px 0;color:var(--mut)">سبد خالی است. یک ملک انتخاب کنید.</p>'}
$('#ci').onclick=e=>{const id=+e.target.dataset.r;if(id){C=C.filter(x=>x!==id);S('ao_c',C);cart()}};
$('#cb').onclick=()=>$('#dr').classList.add('o');$('#cx').onclick=()=>$('#dr').classList.remove('o');
$('#fs').onclick=()=>{const n=$('#fn').value.trim(),f=$('#fp').value.trim();if(!C.length)return toast('سبد خالی است');if(!n||!/^09\d{9}$/.test(f.replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d))))return toast('نام و شماره موبایل معتبر (۰۹...) وارد کنید');
O.unshift({id:Date.now(),n,f,t:$('#ft').value,items:C.map(i=>P.find(p=>p.id===i)?.t),d:new Date().toLocaleDateString('fa-IR'),s:'جدید'});S('ao_o',O);C=[];S('ao_c',C);cart();$('#dr').classList.remove('o');toast('سفارش ثبت شد؛ به‌زودی تماس می‌گیریم')};
// admin
function adm(tab='o'){const b=$('#ab');b.innerHTML=`<div class="tabs"><button class="btn ${tab=='o'?'':'g'}" data-t="o">سفارش‌ها (${fa(O.length)})</button><button class="btn ${tab=='p'?'':'g'}" data-t="p">ملک‌ها</button></div>`+(tab=='o'?(O.length?O.map(o=>`<div class="row"><span><b>${o.n}</b> | <span dir="ltr">${o.f}</span> | ${o.d}<br><small>${o.items.join('، ')}${o.t?' | '+o.t:''}</small></span><span><select data-s="${o.id}">${['جدید','در حال پیگیری','انجام شد'].map(s=>`<option ${s==o.s?'selected':''}>${s}</option>`).join('')}</select><button class="btn g" data-do="${o.id}">حذف</button></span></div>`).join(''):'<p>سفارشی ثبت نشده.</p>'):`<div style="max-width:420px"><input id="pt" placeholder="عنوان ملک"><input id="pa" type="number" placeholder="متراژ"><input id="pr" type="number" placeholder="تعداد خواب"><input id="pp" type="number" placeholder="قیمت (تومان)"><label>تصویر (از فریم‌های تور)<input id="pf" type="range" min="0" max="149" value="60"></label><button class="btn b" id="pad">افزودن ملک</button></div>`+P.map(p=>`<div class="row"><span>${p.t} | ${fa(p.p)}</span><button class="btn g" data-dp="${p.id}">حذف</button></div>`).join(''))}
$('#ab').onclick=e=>{const d=e.target.dataset;if(d.t)adm(d.t);if(d.do){O=O.filter(o=>o.id!=d.do);S('ao_o',O);adm('o')}if(d.dp){P=P.filter(p=>p.id!=d.dp);S('ao_p3',P);grid();adm('p')}
if(e.target.id=='pad'){const t=$('#pt').value.trim();if(!t||!+$('#pp').value)return toast('عنوان و قیمت لازم است');P.push({id:Date.now(),t,a:+$('#pa').value,r:+$('#pr').value,p:+$('#pp').value,f:+$('#pf').value});S('ao_p3',P);grid();adm('p');toast('ملک اضافه شد')}};
$('#ab').onchange=e=>{const id=e.target.dataset.s;if(id){O.find(o=>o.id==id).s=e.target.value;S('ao_o',O)}};
function openA(){if(prompt('رمز مدیر را وارد کنید')==='andisheh1405'){$('#adm').classList.add('o');adm()}else if(location.hash=='#admin')toast('رمز اشتباه است')}
$('#al').onclick=e=>{e.preventDefault();openA()};$('#ax').onclick=()=>{$('#adm').classList.remove('o');history.replaceState(0,'','#top')};
$('#burger').onclick=()=>$('#nv').classList.toggle('o');$('#nv').onclick=()=>$('#nv').classList.remove('o');
document.querySelectorAll('[data-f]').forEach(i=>i.src=FR[i.dataset.f]);document.querySelectorAll('[data-ph]').forEach(i=>i.src=PH[i.dataset.ph]);grid();cart();
