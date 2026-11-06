/* =====================================================================
   ILLAY · Lógica de la web
   ===================================================================== */
(function () {
  'use strict';

  const D = window.ILLAY;
  const TT = window.ILLAY_T;

  /* ---------------- utilidades ---------------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* sin almacenamiento */ } }
  };
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function rng(seed) { let a = seed >>> 0; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function km(a, b) {
    const R = 6371, r = x => x * Math.PI / 180;
    const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2;
    return Math.round(2 * R * Math.asin(Math.sqrt(h)));
  }

  /* ---------------- estado ---------------- */
  const params = new URLSearchParams(location.search);
  const S = {
    lang: store.get('illay.lang', 'es'),
    tab: 'map', detail: null, sel: null,
    layer: 'map',
    treeCode: (params.get('arbol') || store.get('illay.tree', '') || '').toUpperCase(),
    treeError: false,
    openLegend: {}
  };
  if (!TT[S.lang]) S.lang = 'es';
  const t = k => (TT[S.lang] && TT[S.lang][k] !== undefined ? TT[S.lang][k] : TT.es[k]);
  const L = o => o == null ? '' : (typeof o === 'string' ? o : (o[S.lang] || o.es));
  const money = n => `${D.config.moneda} ${n}`;
  const fmtDate = d => d.toLocaleDateString({ es: 'es-PE', en: 'en-US', fr: 'fr-FR' }[S.lang], { day: 'numeric', month: 'short', year: 'numeric' });
  const byId = id => D.comunidades.find(c => c.id === id);
  const waLink = text => `https://wa.me/${D.config.whatsapp}?text=${encodeURIComponent(text)}`;
  const isDesk = () => window.matchMedia('(min-width:980px)').matches;

  /* ---------------- ilustraciones (en lugar de fotos) ---------------- */
  let gid = 0;
  const PALS = [
    { sky: ['#f4b99a', '#fbe7c9'], sun: '#ffd27a', far: '#7fa58a', near: '#2f6b4c', tree: '#1f4f37', river: '#c4965a', hi: '#e3c08c' },
    { sky: ['#8fcbe0', '#e6f4ec'], sun: '#fff3b0', far: '#6f9e86', near: '#2b6648', tree: '#1b4a33', river: '#bf9157', hi: '#e2c391' },
    { sky: ['#55386c', '#ec8f6c'], sun: '#ffc36b', far: '#5a5d72', near: '#2c4d40', tree: '#1a3a2e', river: '#a47b4f', hi: '#f0a774' }
  ];
  const hills = (r, y0, amp, col) => { let d = `M0 200 L0 ${y0}`; for (let x = 0; x <= 320; x += 20) d += ` Q${x + 10} ${y0 - amp * r()} ${x + 20} ${y0 - amp * .3 * r()}`; return `<path d="${d} L320 200Z" fill="${col}"/>`; };
  const treeline = (r, y, col) => { let s = ''; for (let x = -10; x < 330; x += 12 + r() * 10) s += `<circle cx="${x}" cy="${y - r() * 8}" r="${9 + r() * 12}" fill="${col}"/>`; return s + `<rect x="0" y="${y}" width="320" height="30" fill="${col}"/>`; };
  const palm = (x, y, h, col) => { let s = `<path d="M${x} ${y} Q${x + 3} ${y - h / 2} ${x + 1} ${y - h}" stroke="${col}" stroke-width="3" fill="none"/>`; for (let i = 0; i < 9; i++) { const a = Math.PI * (1.05 + i * 0.1); s += `<path d="M${x + 1} ${y - h} q${Math.cos(a) * 10} ${Math.sin(a) * 10 - 4} ${Math.cos(a) * 22} ${Math.sin(a) * 14 + 6}" stroke="${col}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`; } return s; };
  const house = (x, y, w, c1, c2) => `<g><line x1="${x + 4}" y1="${y}" x2="${x + 4}" y2="${y + 14}" stroke="#5a3b22" stroke-width="2"/><line x1="${x + w - 4}" y1="${y}" x2="${x + w - 4}" y2="${y + 14}" stroke="#5a3b22" stroke-width="2"/><rect x="${x}" y="${y - 18}" width="${w}" height="18" fill="${c1}"/><rect x="${x + w / 2 - 4}" y="${y - 13}" width="8" height="13" fill="#3d2a1a"/><path d="M${x - 5} ${y - 17} L${x + w / 2} ${y - 34} L${x + w + 5} ${y - 17}Z" fill="${c2}"/></g>`;
  const canoe = (x, y) => `<path d="M${x} ${y} q22 9 48 0 q-6 6 -24 6 q-18 0 -24 -6z" fill="#4a2f1a"/><circle cx="${x + 26}" cy="${y - 6}" r="3.4" fill="#2a1a10"/><path d="M${x + 26} ${y - 3} l0 5" stroke="#2a1a10" stroke-width="3"/><line x1="${x + 31}" y1="${y - 9}" x2="${x + 40}" y2="${y + 8}" stroke="#6b4a2a" stroke-width="1.6"/>`;

  function scene(seed, kind) {
    const r = rng(seed * 977 + 13), p = PALS[seed % 3], id = 's' + (gid++);
    if (kind === 'food') {
      return `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="320" height="200" fill="#e9c995"/><rect y="120" width="320" height="80" fill="#a36b3c"/><ellipse cx="160" cy="132" rx="96" ry="34" fill="#f7f1e6"/><ellipse cx="160" cy="128" rx="74" ry="24" fill="#eadfcb"/><path d="M118 126 q42 -44 84 0 q-42 22 -84 0z" fill="#3f7d3a"/><path d="M160 92 l0 40" stroke="#2d5b2a" stroke-width="2"/><circle cx="214" cy="120" r="9" fill="#d94b2b"/><circle cx="104" cy="122" r="7" fill="#f2c14e"/></svg>`;
    }
    let s = `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.sky[0]}"/><stop offset="1" stop-color="${p.sky[1]}"/></linearGradient></defs><rect width="320" height="200" fill="url(#${id})"/>`;
    s += `<circle cx="${50 + r() * 220}" cy="${38 + r() * 30}" r="${14 + r() * 8}" fill="${p.sun}" opacity=".95"/>`;
    s += hills(r, 105, 22, p.far);
    if (kind === 'city') {
      const cols = ['#f2c14e', '#7cc1c9', '#e98a6b', '#f4efe4', '#a8d08d', '#e7a1b8']; let x = -4;
      while (x < 320) { const w = 22 + r() * 26, h = 24 + r() * 46, c = cols[Math.floor(r() * cols.length)]; s += `<rect x="${x}" y="${142 - h}" width="${w}" height="${h}" fill="${c}"/>`; for (let wy = 142 - h + 6; wy < 136; wy += 11) for (let wx = x + 4; wx < x + w - 6; wx += 9) s += `<rect x="${wx}" y="${wy}" width="4" height="6" fill="rgba(0,0,0,.18)"/>`; x += w + 2; }
      s += palm(40, 142, 40, p.tree) + palm(280, 142, 46, p.tree);
    } else if (kind === 'forest') {
      s += treeline(r, 128, p.near);
      s += `<rect x="150" y="70" width="14" height="80" fill="#6b4a2a"/><circle cx="157" cy="66" r="40" fill="${p.tree}"/><circle cx="128" cy="78" r="26" fill="${p.tree}"/><circle cx="188" cy="78" r="28" fill="${p.tree}"/>`;
      s += palm(60, 150, 60, p.tree) + palm(258, 150, 54, p.tree) + palm(290, 150, 40, p.tree);
    } else {
      s += treeline(r, 126, p.near);
      const n = 2 + Math.floor(r() * 2);
      for (let i = 0; i < n; i++) { const x = 40 + i * (220 / n) + r() * 30; s += house(x, 140, 34 + r() * 10, ['#b77a46', '#c99a63', '#a8693c'][i % 3], ['#d9b36b', '#caa25d', '#e2c27e'][i % 3]); }
      s += palm(18 + r() * 20, 142, 50, p.tree) + palm(290 - r() * 20, 142, 44, p.tree);
    }
    s += `<rect y="146" width="320" height="54" fill="${p.river}"/>`;
    for (let i = 0; i < 7; i++) { const y = 154 + r() * 40, x = r() * 280; s += `<line x1="${x}" y1="${y}" x2="${x + 20 + r() * 30}" y2="${y}" stroke="${p.hi}" stroke-width="2" stroke-linecap="round" opacity=".7"/>`; }
    if (kind !== 'city' && r() > .25) s += canoe(60 + r() * 170, 170 + r() * 12);
    if (kind === 'dolphin') s += `<path d="M200 172 q20 -26 44 -6 q-8 -2 -12 4 q-14 -8 -32 2z" fill="#f08aa8"/><path d="M226 156 l4 -8 l4 8z" fill="#f08aa8"/>`;
    return s + '</svg>';
  }
  function sprout(stage, seed) {
    const h = 18 + stage * 14, leaves = Math.min(2 + stage * 2, 12), r = rng(seed || 7);
    let s = `<svg viewBox="0 0 120 120" aria-hidden="true"><rect width="120" height="120" fill="#e6f1dc"/><circle cx="96" cy="22" r="10" fill="#ffe08a"/><path d="M0 92 Q60 80 120 92 L120 120 L0 120Z" fill="#7a5233"/><path d="M60 92 Q${60 + r() * 6 - 3} ${92 - h / 2} 60 ${92 - h}" stroke="#2f6b3a" stroke-width="3" fill="none"/>`;
    for (let i = 0; i < leaves; i++) { const y = 92 - h * (0.3 + 0.7 * i / leaves), side = i % 2 ? 1 : -1, len = 10 + stage * 2; s += `<path d="M60 ${y} q${side * len * 0.6} ${-len * 0.7} ${side * len} ${-2}q${-side * len * 0.5} ${len * 0.4} ${-side * len} ${2}z" fill="${i % 3 ? '#4c9a4a' : '#3a8040'}"/>`; }
    return s + '</svg>';
  }

  /* ---------------- iconos ---------------- */
  const IC = {
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14M15 6v14"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 20h18M5 20V10l4-3 4 3v10M13 20v-6h6v6M8 13h2"/></svg>',
    legends: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19.5A2 2 0 0 0 6 21.5h13"/><path d="M10 8l4 2.5-4 2.5z"/></svg>',
    tree: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-9"/><path d="M12 12c0-4 3-7 8-7 0 5-3 8-8 7z"/><path d="M12 14c0-3-2-5-7-5 0 4 3 6 7 5z"/></svg>',
    play: '<svg viewBox="0 0 16 16" fill="#fff"><path d="M4 2.5v11l9-5.5z"/></svg>',
    stop: '<svg viewBox="0 0 16 16" fill="#fff"><rect x="3.5" y="3.5" width="9" height="9" rx="1.5"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.2-.2-.2-.4-.3z"/></svg>'
  };

  /* ---------------- voz (audio de prueba) ---------------- */
  let speakingId = null;
  function speak(id, text) {
    const synth = window.speechSynthesis;
    if (!synth) return;
    if (speakingId === id) { synth.cancel(); speakingId = null; markPlaying(); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = { es: 'es-PE', en: 'en-US', fr: 'fr-FR' }[S.lang];
    u.rate = 0.95;
    u.onend = u.onerror = () => { if (speakingId === id) { speakingId = null; markPlaying(); } };
    speakingId = id; markPlaying();
    synth.speak(u);
  }
  function stopSpeech() { if (window.speechSynthesis) window.speechSynthesis.cancel(); speakingId = null; }
  function markPlaying() {
    document.querySelectorAll('[data-speak]').forEach(b => {
      const on = b.dataset.speak === speakingId;
      b.classList.toggle('playing', on);
      const c = b.querySelector('.c'); if (c) c.innerHTML = on ? IC.stop : IC.play;
      const lb = b.querySelector('.lb'); if (lb) lb.textContent = on ? t('stop') : (b.dataset.label || t('listen'));
    });
  }

  /* ---------------- mapa ---------------- */
  let map, cluster, layers, markers = {}, iqMarker;
  function pinHTML(c) {
    return `<div class="wrap"><span class="ph">${scene(c.seed, c.escena)}</span><span class="tip"></span><span class="lbl">${esc(c.nombre)}</span></div>`;
  }
  function initMap() {
    if (!window.L) return;
    const Lf = window.L;
    map = Lf.map('map', { zoomControl: true, attributionControl: true, minZoom: 5, maxZoom: 17, worldCopyJump: false });
    layers = {
      map: Lf.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' }),
      sat: Lf.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { maxZoom: 18, attribution: 'Imágenes &copy; Esri' })
    };
    layers[S.layer].addTo(map);

    cluster = Lf.markerClusterGroup({
      maxClusterRadius: 90,
      showCoverageOnHover: false,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: cl => Lf.divIcon({ className: 'cluster', iconSize: [0, 0], iconAnchor: [0, 0], html: `<div><b>${cl.getChildCount()}</b> ${esc(t('communities'))}</div>` })
    });
    D.comunidades.forEach(c => {
      const m = Lf.marker([c.lat, c.lng], { icon: Lf.divIcon({ className: 'pin', iconSize: [0, 0], iconAnchor: [0, 0], html: pinHTML(c) }), title: c.nombre, keyboard: true });
      m.on('click', () => selectCommunity(c.id));
      markers[c.id] = m;
      cluster.addLayer(m);
    });
    map.addLayer(cluster);

    iqMarker = Lf.marker([D.iquitos.lat, D.iquitos.lng], {
      zIndexOffset: -500, title: 'Iquitos',
      icon: Lf.divIcon({ className: 'pin city', iconSize: [0, 0], iconAnchor: [0, 0], html: `<div class="wrap"><span class="ph">${scene(0, 'city')}</span><span class="tip"></span><span class="lbl">Iquitos</span></div>` })
    }).addTo(map);
    iqMarker.on('click', () => selectCommunity('iquitos'));

    fitAll();
  }
  function fitAll() {
    if (!map) return;
    const pts = D.comunidades.map(c => [c.lat, c.lng]).concat([[D.iquitos.lat, D.iquitos.lng]]);
    map.fitBounds(window.L.latLngBounds(pts), { padding: [70, 70] });
  }
  function setLayer(k) {
    if (!map || k === S.layer) return;
    map.removeLayer(layers[S.layer]); layers[k].addTo(map); S.layer = k;
    document.querySelectorAll('[data-layer]').forEach(b => b.setAttribute('aria-pressed', b.dataset.layer === k));
  }
  function markActive() {
    Object.entries(markers).forEach(([id, m]) => { const el = m.getElement(); if (el) el.classList.toggle('active', id === S.sel); });
    const el = iqMarker && iqMarker.getElement(); if (el) el.classList.toggle('active', S.sel === 'iquitos');
  }
  function selectCommunity(id, fly) {
    S.sel = id;
    if (map && fly !== false) {
      if (id === 'iquitos') map.flyTo([D.iquitos.lat, D.iquitos.lng], Math.max(map.getZoom(), 10), { duration: .6 });
      else { const m = markers[id]; cluster.zoomToShowLayer(m, () => { map.flyTo(m.getLatLng(), Math.max(map.getZoom(), 10), { duration: .6 }); }); }
    }
    renderPeek(); markActive();
  }
  function renderPeek() {
    const pk = document.getElementById('peek');
    if (!S.sel) { pk.hidden = true; document.body.dataset.peek = '0'; return; }
    let html;
    if (S.sel === 'iquitos') {
      html = `<div class="thumb">${scene(2, 'city')}</div><div><h3>${t('iqTitle')}</h3><p>${t('iqText')}</p></div>`;
    } else {
      const c = byId(S.sel);
      html = `<div class="thumb">${scene(c.seed, c.escena)}</div><div><h3>${esc(c.nombre)}</h3><div class="tags" style="margin:2px 0 4px">${tagsFor(c)}</div><p>${esc(L(c.lema))}</p><p style="font-weight:600;color:var(--tinta);margin-top:2px">≈ ${km(D.iquitos, c)} km · ${esc(L(c.rio))}</p><div class="row" style="margin-top:8px"><button class="btn sm pink" data-open="${c.id}">${t('see')}</button></div></div>`;
    }
    pk.innerHTML = html + `<button class="x" data-act="closepeek" aria-label="${t('close')}">×</button>`;
    pk.hidden = false; document.body.dataset.peek = '1';
  }
  function tagsFor(c) {
    let s = c.real ? `<span class="tag real">${t('real')}</span>` : `<span class="tag">${t('ex')}</span>`;
    if (c.ubicacionAproximada) s += ` <span class="tag soft">${t('approx')}</span>`;
    return s;
  }

  /* ---------------- vistas ---------------- */
  function vMapPanel() {
    // En compu: panel con la lista junto al mapa
    return `<div class="pad"><h1 class="title">${t('mapTitle')}</h1><p class="sub">${t('mapSub')}</p>
      <div class="card-list">${communityCards()}</div>
      <div class="tipbox" style="margin-top:16px"><b>${t('iqTitle')}</b><p style="margin-top:4px">${t('iqText')}</p></div></div>`;
  }
  function communityCards() {
    return D.comunidades.map(c => `<button class="card" data-open="${c.id}"><div class="img">${scene(c.seed, c.escena)}</div><div class="tx"><h3>${esc(c.nombre)}</h3><div class="tags">${tagsFor(c)}</div><p>${esc(L(c.lema))}</p><div class="meta"><span>📍 ≈ ${km(D.iquitos, c)} km</span><span>🌊 ${esc(L(c.rio))}</span></div></div></button>`).join('');
  }
  function vList() {
    return `<div class="pad"><h1 class="title">${t('tabList')}</h1><p class="sub">${t('mapSub')}</p>
      <div class="card-list">${communityCards()}</div>
      <div class="tipbox" style="margin-top:16px"><b>${t('iqTitle')}</b><p style="margin-top:4px">${t('iqText')}</p><ul>${t('iqTips').map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div>`;
  }
  function legendCard(c, idPrefix) {
    const lg = D.leyendas[c.leyenda]; if (!lg) return '';
    const key = idPrefix + c.id, open = !!S.openLegend[key];
    return `<div class="legend">
      <span class="free">🎁 ${t('freeLegend')}</span>
      <h3>${esc(L(lg.titulo))}</h3>
      <p class="who">${esc(c.nombre)} · ${t('sampleVersion')}</p>
      <button class="play" data-speak="${key}" data-text="${esc(L(lg.texto))}" data-label="${t('listen')}"><span class="c">${IC.play}</span><span class="lb">${t('listen')}</span><span class="wave"><i></i><i></i><i></i><i></i><i></i></span></button>
      <p class="txt ${open ? '' : 'clamp'}">${esc(L(lg.texto))}</p>
      <button class="more" data-legend="${key}">${open ? t('readLess') : t('readMore')}</button>
      <p class="note" style="color:#b9d2c3">${t('voiceNote')}</p>
    </div>`;
  }
  function lockedItems(c) {
    return `<div class="locked"><span class="lk">🎧</span><span><b>${t('fullCollection')}${c ? ' · ' + esc(c.nombre) : ''}</b><small>${t('fullCollectionTx')}</small></span><span class="tag">${t('soon')}</span></div>`;
  }
  function bookItem() {
    return `<div class="locked"><span class="lk">📖</span><span><b>${t('printedBook')}</b><small>${t('printedBookTx')}</small></span><span class="tag">${t('soon')}</span></div>`;
  }
  function vLegends() {
    return `<div class="pad"><h1 class="title">${t('legendsTitle')}</h1><p class="sub">${t('legendsSub')}</p>
      <div style="margin-top:16px">${D.comunidades.map(c => `<div class="legend-block"><h2>${esc(c.nombre)}</h2>${legendCard(c, 'L-')}${lockedItems(c)}</div>`).join('')}</div>
      ${bookItem()}</div>`;
  }
  function vDetail(id) {
    const c = byId(id); if (!c) return vList();
    const d = km(D.iquitos, c);
    return `<div class="hero">${scene(c.seed + 20, c.escena)}<button class="back" data-back>← ${t('back')}</button><span class="cap">${t('illus')}</span></div>
    <div class="dhead"><h2>${esc(c.nombre)}</h2><p class="lema">${esc(L(c.lema))}</p><div class="tags">${tagsFor(c)}${c.real ? ` <span class="tag">${t('exText')}</span>` : ''}</div></div>
    <div class="pad" style="padding-top:0">
      <div class="facts">
        <div class="fact"><small class="k">${t('distance')}</small><b>≈ ${d} km</b><small>${t('straight')}</small></div>
        <div class="fact"><small class="k">${t('time')}</small><b>${c.tiempo ? esc(L(c.tiempo)) : t('toConfirm')}</b><small>${esc(L(c.rio))}</small></div>
      </div>
      <div class="row"><button class="btn pink" data-request="${c.id}">${t('request')}</button><button class="btn ghost desk-only" data-fly="${c.id}">📍 ${t('seeOnMap')}</button><button class="btn ghost map-only" data-showmap="${c.id}">📍 ${t('seeOnMap')}</button></div>
      <div class="sec"><h3>${t('what')}</h3><p>${esc(L(c.como))}</p></div>
      <div class="sec"><h3>${t('special')}</h3><p>${esc(L(c.especial))}</p></div>
      <div class="sec"><h3>${t('why')}</h3><ul class="list">${L(c.porQue).map((w, i) => `<li><span class="n">${i + 1}</span>${esc(w)}</li>`).join('')}</ul></div>
      <div class="sec"><h3>${t('gallery')}</h3><div class="gal"><div>${scene(c.seed + 31, c.escena)}</div><div>${scene(c.seed + 32, 'forest')}</div><div>${scene(c.seed + 33, 'food')}</div></div></div>
      <div class="sec"><h3>${t('how')}</h3><div class="route">${c.llegar.map(h => { const v = L(h); return `<div class="stop"><b>${esc(v[0])}</b>${v[1] ? `<span>${esc(v[1])}</span>` : ''}</div>`; }).join('')}</div>
        <div class="tipbox" style="margin-top:12px"><b>${t('tips')}</b><ul>${t('iqTips').map(x => `<li>${esc(x)}</li>`).join('')}</ul></div></div>
      <div class="sec"><h3>${t('exps')}</h3>${c.experiencias.map(e => `<div class="exp"><div><b>${esc(L(e.n))}</b><small>${esc(L(e.d))} · ${t('perPerson')}</small></div><span class="price">${money(e.p)}</span></div>`).join('')}
        <button class="btn pink block" data-request="${c.id}" style="margin-top:6px">${t('request')}</button></div>
      <div class="sec plant-cta"><h3>🌱 ${t('plantHere')}</h3><p>${t('plantHereTx')}</p>
        <b style="font-size:14px;color:var(--selva)">${t('speciesHere')}</b>
        <div class="sp-list">${c.especies.map((k, i) => { const sp = D.especies[k]; return `<div class="sp"><span class="ic2">${sprout(3, i * 3 + 5)}</span><span><b>${esc(sp.nombre)}</b><small>${esc(L(sp.desc))}</small></span></div>`; }).join('')}</div>
        <button class="btn ghost" data-tab="tree" style="justify-self:start">${t('tabTree')} →</button></div>
      <div class="sec"><h3>${t('tabLegends')}</h3>${legendCard(c, 'D-')}<div style="margin-top:10px">${lockedItems(c)}</div></div>
      <div class="sec"><h3>${t('history')}</h3><p>${esc(L(c.historia))}</p></div>
    </div>`;
  }

  /* ---------------- mi árbol ---------------- */
  function treeData(code) {
    const a = D.arboles[code]; if (!a) return null;
    const planted = new Date(Date.now() - (a.diasDesdeSiembra || 0) * 864e5);
    const ups = []; const now = Date.now();
    for (let i = 0; i < 24; i++) {
      const dt = new Date(planted.getTime() + i * 30 * 864e5);
      if (dt.getTime() > now) return { a, planted, ups, next: dt };
      ups.push({ dt, i, h: 12 + i * 6, k: ['upd0', 'upd1', 'upd2', 'upd3'][i === 0 ? 0 : 1 + ((i - 1) % 3)] });
    }
    return { a, planted, ups, next: null };
  }
  function qrSVG(text) {
    try {
      const q = window.qrcode(0, 'M'); q.addData(text); q.make();
      return q.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
    } catch (e) { return ''; }
  }
  function vTree() {
    const plans = D.planes.map(p => {
      const base = D.planes[0].precio * p.meses, save = base - p.precio;
      return `<div class="plan"><small>${p.meses === 1 ? t('monthly') : `${p.meses} ${t('months')}`}</small><b>${money(p.precio)}</b>${save > 0 ? `<span class="sv">${t('save')} ${money(save)}</span>` : `<small>/ ${t('month')}</small>`}</div>`;
    }).join('');
    const howBox = `<div class="sec"><h3>${t('howTitle')}</h3><div class="steps">
        <div class="step"><span class="n">1</span><div><b>${t('how1')}</b><span>${t('how1t')}</span></div></div>
        <div class="step"><span class="n">2</span><div><b>${t('how2')}</b><span>${t('how2t')}</span></div></div>
        <div class="step"><span class="n">3</span><div><b>${t('how3')}</b><span>${t('how3t')}</span></div></div></div></div>
      <div class="sec"><h3>${t('plans')}</h3><div class="plans">${plans}</div><p class="note" style="margin-top:8px">${t('plansNote')}</p></div>
      <div class="sec box"><h3 style="font-size:17px;margin-bottom:10px">${t('rulesTitle')}</h3><div class="rules"><div><span class="em">🤝</span><span>${t('rule1')}</span></div><div><span class="em">🌧️</span><span>${t('rule2')}</span></div></div></div>`;

    const td = S.treeCode && treeData(S.treeCode);
    if (!td) {
      const sample = Object.keys(D.arboles)[0];
      return `<div class="pad"><h1 class="title">${t('treeTitle')}</h1><p class="sub">${t('treeSub')}</p>
        <form class="box codebox" style="margin-top:14px" data-form="code">
          <label class="fl" for="code" style="margin-top:0">${t('codeLabel')}</label>
          <input class="in code-in" id="code" autocomplete="off" placeholder="${t('codePh')}" value="${esc(S.treeError ? S.treeCode : '')}">
          ${S.treeError ? `<p class="warn" role="alert">${t('notFound')}</p>` : ''}
          <button class="btn pink block" type="submit">${t('see2')}</button>
          <p class="note">${t('tryCode')}: <button type="button" class="linkish" data-code="${sample}">${sample}</button></p>
        </form>${howBox}</div>`;
    }
    const a = td.a, c = byId(a.comunidad), sp = D.especies[a.especie], plan = D.planes.find(p => p.id === a.plan);
    const stage = Math.min(td.ups.length + 1, 7);
    const waText = t('waTree')(S.treeCode, a.nombre);
    return `<div class="pad"><div class="row" style="justify-content:space-between"><h1 class="title">${t('treeTitle')}</h1><button class="linkish" data-act="logout">${t('logout')}</button></div>
      <div class="tree-hero" style="margin-top:10px"><div class="top2"><div class="pv">${sprout(stage, 11)}</div><div><h2>${esc(a.nombre)}</h2><span class="code-tag">${esc(S.treeCode)}</span>${a.ejemplo ? ` <span class="tag">${t('ex')}</span>` : ''}${td.next ? `<div><span class="next">${t('nextUpdate')}: ${fmtDate(td.next)}</span></div>` : ''}</div></div>
        <div class="kv"><div><small>${t('species')}</small><b>${esc(sp.nombre)}</b></div><div><small>${t('community')}</small><b>${esc(c.nombre)}</b></div><div><small>${t('caretaker')}</small><b>${esc(a.cuidador)}</b></div><div><small>${t('planted')}</small><b>${fmtDate(td.planted)}</b></div><div><small>${t('godparent')}</small><b>${esc(a.padrino)}</b></div><div><small>${t('plan')}</small><b>${plan ? (plan.meses === 1 ? t('monthly') : `${plan.meses} ${t('months')}`) : '—'}</b></div></div></div>
      <div class="row" style="margin-top:12px"><a class="btn wa" href="${waLink(waText)}" target="_blank" rel="noopener">${IC.wa}${t('openWa')}</a><button class="btn ghost" data-showmap="${c.id}">📍 ${t('seeOnMap')}</button></div>
      ${D.config.whatsappEsEjemplo ? `<p class="note" style="margin-top:6px">${t('waExample')}</p>` : ''}
      <div class="sec"><h3>${t('updates')}</h3><div class="tline">${td.ups.slice().reverse().map(u => `<div class="ev"><div class="evi">${sprout(Math.min(u.i + 1, 7), 11 + u.i)}</div><div><b>${t(u.k)}</b><small>${fmtDate(u.dt)} · ${u.h} ${t('heightCm')}</small><br>${u.i > 0 ? `<button class="mini-play" data-speak="T-${u.i}" data-text="${esc(t('careVoice')(a.nombre, u.h))}" data-label="${t('audioMsg')} ${esc(a.cuidador)}"><span class="c">${IC.play}</span><span class="lb">${t('audioMsg')} ${esc(a.cuidador)}</span></button>` : ''}</div></div>`).join('')}</div></div>
      <div class="sec box"><h3 style="font-size:18px;margin-bottom:10px">${t('qrTitle')}</h3><div class="qr-card"><div class="qr">${qrSVG(waLink(waText))}</div><p style="font-size:14px;color:var(--gris)">${t('qrTx')}</p></div></div>
      ${howBox}</div>`;
  }

  /* ---------------- solicitar visita (WhatsApp) ---------------- */
  function openRequest(id) {
    const c = byId(id);
    const today = new Date().toISOString().slice(0, 10);
    sheetOpen(`<h2 style="font-size:24px">${t('reqTitle')} · ${esc(c.nombre)}</h2><p class="sub" style="margin-top:4px">${t('reqSub')}</p>
      <form data-form="req" data-com="${c.id}">
        <div class="grid2"><div><label class="fl" for="rq-date">${t('date')}</label><input class="in" type="date" id="rq-date" min="${today}"></div>
        <div><label class="fl" for="rq-people">${t('people')}</label><input class="in" type="number" id="rq-people" min="1" max="20" value="2"></div></div>
        <label class="fl" for="rq-exp">${t('experience')}</label>
        <select class="in" id="rq-exp">${c.experiencias.map((e, i) => `<option value="${i}">${esc(L(e.n))} · ${money(e.p)}</option>`).join('')}</select>
        <label class="check"><input type="checkbox" id="rq-tree" checked> ${t('wantTree')}</label>
        <label class="fl" for="rq-name">${t('yourName')}</label><input class="in" id="rq-name" autocomplete="name">
        <p class="warn" id="rq-err" role="alert" hidden></p>
        <button class="btn wa block" type="submit" style="margin-top:16px">${IC.wa}${t('sendWa')}</button>
        ${D.config.whatsappEsEjemplo ? `<p class="note" style="margin-top:8px;text-align:center">${t('waExample')}</p>` : ''}
        <button class="btn ghost block" type="button" data-act="closesheet" style="margin-top:10px">${t('close')}</button>
      </form>`);
  }
  function submitRequest(form) {
    const c = byId(form.dataset.com);
    const date = form.querySelector('#rq-date').value, name = form.querySelector('#rq-name').value.trim();
    const err = form.querySelector('#rq-err');
    if (!date || !name) { err.textContent = t('needReq'); err.hidden = false; return; }
    const e = c.experiencias[+form.querySelector('#rq-exp').value];
    const msg = t('waVisit')({ com: c.nombre, date, people: form.querySelector('#rq-people').value, exp: L(e.n), tree: form.querySelector('#rq-tree').checked, name });
    window.open(waLink(msg), '_blank', 'noopener');
  }

  /* ---------------- hoja ---------------- */
  const sheet = document.getElementById('sheet');
  function sheetOpen(html) { sheet.innerHTML = `<div class="panel2">${html}</div>`; sheet.hidden = false; const f = sheet.querySelector('input,select,button'); if (f) f.focus(); }
  function sheetClose() { sheet.hidden = true; sheet.innerHTML = ''; }
  function openAbout() {
    sheetOpen(`<h2 style="font-size:24px">${t('aboutTitle')}</h2><p style="margin-top:8px">${t('aboutTx')}</p><p class="tipbox" style="margin-top:12px">${t('aboutProto')}</p><button class="btn block" data-act="closesheet" style="margin-top:16px">${t('close')}</button>`);
  }

  /* ---------------- render ---------------- */
  const panel = document.getElementById('panel');
  const tabsEl = document.getElementById('tabs');
  function viewName() { return S.detail ? 'detail' : S.tab; }
  function render(keepScroll) {
    stopSpeech();
    document.documentElement.lang = S.lang;
    document.body.dataset.view = viewName();
    document.querySelectorAll('[data-lang]').forEach(b => b.setAttribute('aria-pressed', b.dataset.lang === S.lang));
    document.getElementById('loginTx').textContent = D.arboles[S.treeCode] ? t('tabTree') : t('login');
    document.getElementById('protoBtn').textContent = t('proto');
    document.getElementById('mapTitle').textContent = t('mapTitle');
    document.getElementById('mapSub').textContent = t('mapSub');
    document.getElementById('lyMap').textContent = t('layerMap');
    document.getElementById('lySat').textContent = t('layerSat');
    tabsEl.innerHTML = [['map', 'tabMap'], ['list', 'tabList'], ['legends', 'tabLegends'], ['tree', 'tabTree']]
      .map(([k, lab]) => `<button data-tab="${k}" ${S.tab === k && !S.detail ? 'aria-current="page"' : ''}><span class="ic">${IC[k]}</span>${t(lab)}</button>`).join('');
    const y = panel.scrollTop;
    if (S.detail) panel.innerHTML = vDetail(S.detail);
    else panel.innerHTML = ({ map: vMapPanel, list: vList, legends: vLegends, tree: vTree })[S.tab]();
    panel.scrollTop = keepScroll ? y : 0;
    renderPeek();
    if (map) setTimeout(() => { map.invalidateSize(); markActive(); }, 0);
    syncHash();
  }

  /* hash para poder compartir links: #mapa, #comunidades, #leyendas, #mi-arbol, #comunidad-yanashi */
  const H2T = { mapa: 'map', comunidades: 'list', leyendas: 'legends', 'mi-arbol': 'tree' };
  const T2H = { map: 'mapa', list: 'comunidades', legends: 'leyendas', tree: 'mi-arbol' };
  let hashLock = false;
  function syncHash() {
    const h = S.detail ? `comunidad-${S.detail}` : T2H[S.tab];
    if (location.hash.slice(1) !== h) { hashLock = true; history.replaceState(null, '', `${location.pathname}${location.search}#${h}`); hashLock = false; }
  }
  function readHash() {
    const h = location.hash.slice(1);
    if (h.startsWith('comunidad-') && byId(h.slice(10))) { S.detail = h.slice(10); S.tab = 'list'; }
    else if (H2T[h]) { S.tab = H2T[h]; S.detail = null; }
  }
  window.addEventListener('hashchange', () => { if (!hashLock) { readHash(); render(); } });

  function goTab(tab) { S.tab = tab; S.detail = null; render(); }
  function openDetail(id) {
    S.detail = id; S.sel = id; render();
    if (isDesk() && map) selectCommunity(id);
  }

  /* ---------------- eventos ---------------- */
  document.addEventListener('click', e => {
    const el = e.target.closest('button, a'); if (!el) return;
    const d = el.dataset;
    if (d.lang) { S.lang = d.lang; store.set('illay.lang', S.lang); refreshMapLabels(); render(true); return; }
    if (d.tab) { if (!sheet.hidden) sheetClose(); goTab(d.tab); return; }
    if (d.layer) { setLayer(d.layer); return; }
    if (d.open) { openDetail(d.open); return; }
    if (d.back !== undefined) { S.detail = null; render(); return; }
    if (d.fly) { selectCommunity(d.fly); return; }
    if (d.showmap) { S.detail = null; S.tab = 'map'; render(); setTimeout(() => selectCommunity(d.showmap), 50); return; }
    if (d.request) { openRequest(d.request); return; }
    if (d.speak) { speak(d.speak, el.dataset.text); return; }
    if (d.legend) { S.openLegend[d.legend] = !S.openLegend[d.legend]; render(true); return; }
    if (d.code) { S.treeCode = d.code; S.treeError = false; store.set('illay.tree', S.treeCode); render(); return; }
    if (d.act === 'closepeek') { S.sel = null; renderPeek(); markActive(); return; }
    if (d.act === 'closesheet') { sheetClose(); return; }
    if (d.act === 'about') { openAbout(); return; }
    if (d.act === 'logout') { S.treeCode = ''; S.treeError = false; store.set('illay.tree', ''); render(); return; }
  });
  document.addEventListener('submit', e => {
    const f = e.target; e.preventDefault();
    if (f.dataset.form === 'code') {
      const v = f.querySelector('#code').value.trim().toUpperCase();
      S.treeCode = v; S.treeError = !D.arboles[v];
      store.set('illay.tree', S.treeError ? '' : v);
      render(); return;
    }
    if (f.dataset.form === 'req') submitRequest(f);
  });
  sheet.addEventListener('click', e => { if (e.target === sheet) sheetClose(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) sheetClose(); });
  window.matchMedia('(min-width:980px)').addEventListener('change', () => render(true));

  function refreshMapLabels() { if (cluster) cluster.refreshClusters(); }

  /* ---------------- inicio ---------------- */
  if (params.get('arbol')) { S.tab = 'tree'; S.treeError = !D.arboles[S.treeCode]; }
  else readHash();
  try { initMap(); } catch (err) { console.error('No se pudo cargar el mapa', err); }
  render();
})();
