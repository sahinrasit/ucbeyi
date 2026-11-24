// Uç Beyi sitesi: belirme, padişah süzgeci, gezgin Lala. Çerez ve izleme yok.
(() => {
  window.ucbHazir = true;
  const d = document;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IO = 'IntersectionObserver' in window;

  // Belirme
  const rise = [...d.querySelectorAll('.rise')];
  if (IO && !reduce) {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -6% 0px' },
    );
    rise.forEach((el) => io.observe(el));
  } else rise.forEach((el) => el.classList.add('in'));

  // Padişah süzgeci
  const box = d.querySelector('.filters');
  if (box) {
    box.hidden = false;
    const btns = [...box.querySelectorAll('button')];
    const cards = [...d.querySelectorAll('.sultan')];
    btns.forEach((b) => b.addEventListener('click', () => {
      const f = b.dataset.f;
      btns.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      cards.forEach((c) => { c.hidden = f !== 'all' && c.dataset.g !== f; });
    }));
  }

  // Menü: bağlantıya basınca kapan
  d.querySelectorAll('.menu a').forEach((a) => a.addEventListener('click', () => a.closest('details').removeAttribute('open')));

  // Gezgin Lala: bölüm değiştikçe bir satır söyler (süs; aynı bilgi sayfada yazılı)
  const g = d.querySelector('.guide');
  if (!g || !IO) return;
  const p = g.querySelector('p');
  let t;
  let last = null;
  const say = (txt) => {
    if (!txt) return;
    p.textContent = txt;
    g.classList.add('say');
    clearTimeout(t);
    t = setTimeout(() => g.classList.remove('say'), 7000);
  };
  const io2 = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting && e.target !== last) { last = e.target; if (g.classList.contains('on')) say(e.target.dataset.lala); } }),
    { rootMargin: '-40% 0px -50% 0px' },
  );
  d.querySelectorAll('[data-lala]').forEach((s) => io2.observe(s));
  const hero = d.querySelector('.hero');
  const foot = d.querySelector('.foot');
  const vis = new Map();
  const io3 = new IntersectionObserver((es) => {
    es.forEach((e) => vis.set(e.target, e.isIntersecting));
    const on = !vis.get(hero) && !vis.get(foot);
    if (on && !g.classList.contains('on') && last) say(last.dataset.lala);
    g.classList.toggle('on', on);
    if (!on) g.classList.remove('say');
  });
  if (hero) io3.observe(hero);
  if (foot) io3.observe(foot);
  g.querySelector('button').addEventListener('click', () => {
    if (g.classList.contains('say')) g.classList.remove('say');
    else say(last ? last.dataset.lala : g.dataset.hi);
  });
  g.querySelector('.bubble').addEventListener('click', () => g.classList.remove('say'));
})();
