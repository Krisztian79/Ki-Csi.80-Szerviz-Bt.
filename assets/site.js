// Active menu highlight
(function(){
  const path = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.menu a').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });
})();

// Checklist persistence
(function(){
  const box = document.querySelector('[data-checklist]');
  if(!box) return;

  const key = 'kici80_google_checklist_v1';
  const saved = JSON.parse(localStorage.getItem(key) || '{}');

  box.querySelectorAll('input[type="checkbox"]').forEach(cb=>{
    if(saved[cb.id] === true) cb.checked = true;
    cb.addEventListener('change', ()=>{
      saved[cb.id] = cb.checked;
      localStorage.setItem(key, JSON.stringify(saved));
      updateProgress();
    });
  });

  function updateProgress(){
    const all = [...box.querySelectorAll('input[type="checkbox"]')];
    const done = all.filter(x=>x.checked).length;
    const pct = all.length ? Math.round(done/all.length*100) : 0;
    const el = document.querySelector('[data-progress]');
    if(el) el.textContent = `${done}/${all.length} kész (${pct}%)`;
  }
  updateProgress();

  const resetBtn = document.querySelector('[data-reset]');
  if(resetBtn){
    resetBtn.addEventListener('click', ()=>{
      if(!confirm('Biztosan lenullázzam a checklistet?')) return;
      box.querySelectorAll('input[type="checkbox"]').forEach(cb=>cb.checked=false);
      localStorage.removeItem(key);
      location.reload();
    });
  }
})();
