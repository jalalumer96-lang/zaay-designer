// Zaay Designer Game — WhatsApp submit to merchant
const selections = { type:null, color:null, detail:null };
const steps = [...document.querySelectorAll('.step')];
const bar = document.getElementById('bar');

function go(step){ steps.forEach(s=>s.classList.remove('active')); steps[step-1].classList.add('active'); bar.style.width = (step*25)+'%'; window.scrollTo({top:0, behavior:'smooth'}); }

function renderGrid(list, elId){
  const el = document.getElementById(elId);
  el.innerHTML = '';
  list.forEach((o, i)=>{
    const label = document.createElement('label');
    label.className = 'opt';
    label.innerHTML = `
      <input type="radio" name="${elId}" value="${o.v}">
      <div class="thumb"><img src="${o.img}" alt="${o.c}" loading="lazy" style="width:100%;height:100%;object-fit:cover"></div>
      <div class="cap">${o.c}</div>`;
    el.appendChild(label);
    label.addEventListener('click', ()=>{
      [...el.children].forEach(ch=>ch.classList.remove('selected'));
      label.classList.add('selected');
      label.querySelector('input').checked = true;
      if(elId==='typeGrid') selections.type = o.v;
      if(elId==='colorGrid') selections.color = o.v;
      if(elId==='detailGrid') selections.detail = o.v;
    });
    if(i===0) setTimeout(()=>label.click(), 0);
  });
}

const types = [
  {v:'Jhumkas', c:'Jhumkas', img:'assets/sample-5.svg'},
  {v:'Necklace', c:'Necklace', img:'assets/sample-2.svg'},
  {v:'Bridal Set', c:'Bridal Set', img:'assets/sample-1.svg'},
  {v:'Matha Patti', c:'Matha Patti', img:'assets/sample-6.svg'},
];

const colors = [
  {v:'Red-Gold', c:'Ruby Red', img:'assets/sample-1.svg'},
  {v:'Green-Gold', c:'Emerald Green', img:'assets/sample-2.svg'},
  {v:'White-Pearl', c:'Pearl White', img:'assets/sample-3.svg'},
  {v:'Multicolor', c:'Multicolor', img:'assets/sample-4.svg'},
];

const details = [
  {v:'Small Pearls', c:'Small Pearls', img:'assets/sample-3.svg'},
  {v:'Big Pearls', c:'Big Pearls', img:'assets/sample-5.svg'},
  {v:'Meenakari Touch', c:'Meenakari Touch', img:'assets/sample-6.svg'},
  {v:'Extra Sparkle Stones', c:'Extra Sparkle Stones', img:'assets/sample-3.svg'},
];

renderGrid(types, 'typeGrid');
renderGrid(colors, 'colorGrid');
renderGrid(details, 'detailGrid');

document.getElementById('next1').addEventListener('click', ()=>go(2));
document.getElementById('next2').addEventListener('click', ()=>go(3));
document.getElementById('next3').addEventListener('click', ()=>go(4));
document.querySelectorAll('[data-back]').forEach(b=> b.addEventListener('click', e=> go(parseInt(b.getAttribute('data-back')))));

function buildSummary(){
  const name = document.getElementById('custName').value || '—';
  const phone = document.getElementById('custPhone').value || '—';
  const notes = document.getElementById('notes').value || '—';
  const lines = [
    'Zaay — Design Order',
    '--------------------',
    'Type: ' + (selections.type || '—'),
    'Color Theme: ' + (selections.color || '—'),
    'Detailing: ' + (selections.detail || '—'),
    'Notes: ' + notes,
    '',
    'Customer: ' + name,
    'WhatsApp: ' + phone,
    '',
    'Received via: Zaay Designer Game'
  ];
  return lines.join('\n');
}

document.getElementById('finish').addEventListener('click', ()=>{
  const summary = buildSummary();
  const box = document.getElementById('summaryBox');
  box.style.display = 'block';
  box.textContent = summary;
  const merchant = '923116555070'; // +92 311 6555070
  const url = 'https://wa.me/' + merchant + '?text=' + encodeURIComponent(summary);
  window.open(url, '_blank');
});
