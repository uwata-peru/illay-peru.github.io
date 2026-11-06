/* =====================================================================
   UWATA · Animación de bienvenida
   Atardecer sobre el río: cielo, sol, selva en silueta, reflejos en el
   agua, luciérnagas, aves y un bufeo colorado que salta de vez en cuando.
   ===================================================================== */
window.UwataHero = function (canvas) {
  'use strict';
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W = 0, H = 0, DPR = 1, bg = null, horizon = 0, sun = null;
  let flies = [], birds = [], dolphin = null, ripples = [], nextJump = 1.5;
  let raf = 0, running = false, last = 0, time = 0;

  function rnd(a, b) { return a + Math.random() * (b - a); }

  /* silueta de copas de árboles a lo largo de una línea */
  function canopy(g, y, amp, step, color, seed) {
    g.fillStyle = color;
    g.beginPath(); g.moveTo(0, H);
    let x = -20, s = seed;
    g.lineTo(x, y);
    while (x < W + 40) {
      s = (s * 9301 + 49297) % 233280; const r = s / 233280;
      const w = step * (0.6 + r), h = amp * (0.4 + r * 0.9);
      g.quadraticCurveTo(x + w / 2, y - h * 1.6, x + w, y - h * 0.2 * r);
      x += w;
    }
    g.lineTo(W + 40, H); g.closePath(); g.fill();
  }
  function palmTree(g, x, base, h, color, lean) {
    g.strokeStyle = color; g.fillStyle = color; g.lineCap = 'round';
    g.lineWidth = Math.max(2, h * 0.035);
    const topX = x + lean * h * 0.25, topY = base - h;
    g.beginPath(); g.moveTo(x, base); g.quadraticCurveTo(x + lean * h * 0.05, base - h * 0.5, topX, topY); g.stroke();
    g.lineWidth = Math.max(1.5, h * 0.022);
    for (let i = 0; i < 9; i++) {
      const a = Math.PI * (1.02 + i * 0.12), len = h * rnd(0.32, 0.42);
      g.beginPath(); g.moveTo(topX, topY);
      g.quadraticCurveTo(topX + Math.cos(a) * len * 0.5, topY + Math.sin(a) * len * 0.5 - len * 0.12, topX + Math.cos(a) * len, topY + Math.sin(a) * len * 0.55 + len * 0.28);
      g.stroke();
    }
  }
  function bigTree(g, x, base, h, color) {
    g.fillStyle = color;
    g.fillRect(x - h * 0.03, base - h * 0.55, h * 0.06, h * 0.55);
    const cy = base - h * 0.7;
    [[0, 0, .32], [-.22, .08, .24], [.24, .06, .26], [-.1, -.14, .22], [.12, -.16, .2]].forEach(([dx, dy, r]) => {
      g.beginPath(); g.arc(x + dx * h, cy + dy * h, r * h, 0, Math.PI * 2); g.fill();
    });
  }

  /* fondo estático: se dibuja una vez por tamaño de pantalla */
  function buildBackground() {
    bg = document.createElement('canvas'); bg.width = W * DPR; bg.height = H * DPR;
    const g = bg.getContext('2d'); g.scale(DPR, DPR);
    horizon = H * (H > W ? 0.5 : 0.6);
    // cielo
    const sky = g.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, '#24133f'); sky.addColorStop(0.35, '#5c2a63'); sky.addColorStop(0.62, '#c94f6a');
    sky.addColorStop(0.85, '#f39a5c'); sky.addColorStop(1, '#ffd08a');
    g.fillStyle = sky; g.fillRect(0, 0, W, horizon + 2);
    // estrellas tenues arriba
    for (let i = 0; i < 70; i++) { g.fillStyle = `rgba(255,240,220,${rnd(0.15, 0.6)})`; g.fillRect(rnd(0, W), rnd(0, horizon * 0.35), 1.2, 1.2); }
    // sol y resplandor
    const sr = Math.min(W, H) * 0.085, sx = W * 0.64, sy = horizon - sr * 0.35;
    sun = { x: sx, y: sy, r: sr };
    const glow = g.createRadialGradient(sx, sy, sr * 0.5, sx, sy, sr * 5);
    glow.addColorStop(0, 'rgba(255,214,140,.75)'); glow.addColorStop(1, 'rgba(255,170,110,0)');
    g.fillStyle = glow; g.fillRect(0, 0, W, horizon);
    g.fillStyle = '#ffe6ad'; g.beginPath(); g.arc(sx, sy, sr, 0, Math.PI * 2); g.fill();
    // capas de selva lejana
    canopy(g, horizon - 4, H * 0.035, 34, 'rgba(120,58,96,.85)', 7);
    canopy(g, horizon + 2, H * 0.028, 26, '#4a2448', 19);
    // río
    const river = g.createLinearGradient(0, horizon, 0, H);
    river.addColorStop(0, '#f2a067'); river.addColorStop(0.25, '#b9586a'); river.addColorStop(1, '#3b1c3c');
    g.fillStyle = river; g.fillRect(0, horizon, W, H - horizon);
    // orillas cercanas (izquierda y derecha) con selva
    const dark = '#1a1024';
    g.fillStyle = dark;
    g.beginPath(); g.moveTo(0, horizon + H * 0.02); g.quadraticCurveTo(W * 0.22, horizon + H * 0.06, W * 0.3, H); g.lineTo(0, H); g.closePath(); g.fill();
    g.beginPath(); g.moveTo(W, horizon + H * 0.04); g.quadraticCurveTo(W * 0.85, horizon + H * 0.1, W * 0.78, H); g.lineTo(W, H); g.closePath(); g.fill();
    const s = Math.min(W, H);
    bigTree(g, W * 0.06, horizon + H * 0.08, s * 0.42, dark);
    bigTree(g, W * 0.17, horizon + H * 0.12, s * 0.3, dark);
    palmTree(g, W * 0.25, horizon + H * 0.2, s * 0.36, dark, 0.4);
    palmTree(g, W * 0.12, horizon + H * 0.3, s * 0.5, dark, -0.2);
    bigTree(g, W * 0.96, horizon + H * 0.1, s * 0.46, dark);
    palmTree(g, W * 0.86, horizon + H * 0.16, s * 0.4, dark, -0.45);
    palmTree(g, W * 0.92, horizon + H * 0.32, s * 0.55, dark, 0.15);
    // casita sobre pilotes en la orilla izquierda
    const hx = W * 0.3, hy = horizon + H * 0.06, hw = s * 0.07;
    g.fillStyle = dark; g.fillRect(hx, hy - hw * 0.45, hw, hw * 0.45);
    g.beginPath(); g.moveTo(hx - hw * 0.15, hy - hw * 0.43); g.lineTo(hx + hw / 2, hy - hw * 0.85); g.lineTo(hx + hw * 1.15, hy - hw * 0.43); g.fill();
    g.fillRect(hx + hw * 0.08, hy, hw * 0.06, hw * 0.25); g.fillRect(hx + hw * 0.86, hy, hw * 0.06, hw * 0.25);
    g.fillStyle = '#ffcf7a'; g.fillRect(hx + hw * 0.4, hy - hw * 0.32, hw * 0.18, hw * 0.16);
  }

  function initActors() {
    flies = Array.from({ length: Math.round(Math.min(60, W / 14)) }, () => ({
      x: rnd(0, W), y: rnd(horizon - H * 0.1, H * 0.95), vx: rnd(-8, 8), vy: rnd(-6, 6), p: rnd(0, Math.PI * 2), s: rnd(1, 2.2)
    }));
    birds = Array.from({ length: 4 }, (_, i) => ({ x: rnd(-W * 0.6, W), y: rnd(H * 0.12, horizon * 0.6), v: rnd(14, 26), s: rnd(5, 9), p: rnd(0, 6) }));
  }

  function resize() {
    const r = canvas.getBoundingClientRect();
    W = Math.max(320, r.width); H = Math.max(320, r.height);
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * DPR; canvas.height = H * DPR;
    buildBackground(); initActors();
    if (!running) drawFrame(0);
  }

  function startJump() {
    const x0 = rnd(W * 0.32, W * 0.6), span = rnd(W * 0.08, W * 0.14);
    const y0 = horizon + (H - horizon) * rnd(0.2, 0.45);
    dolphin = { x0, x1: x0 + span, y0, h: (H - horizon) * rnd(0.22, 0.32), t: 0, dur: 1.3, size: Math.min(W, H) * 0.05 * (0.7 + (y0 - horizon) / (H - horizon)) };
    ripples.push({ x: x0, y: y0, r: 2, a: 0.8 });
  }

  function drawDolphin(d) {
    const k = d.t / d.dur, x = d.x0 + (d.x1 - d.x0) * k, y = d.y0 - Math.sin(Math.PI * k) * d.h;
    const dx = (d.x1 - d.x0), dy = -Math.cos(Math.PI * k) * Math.PI * d.h;
    const ang = Math.atan2(dy, dx), L = d.size;
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    ctx.fillStyle = '#f39ab5';
    ctx.beginPath();
    ctx.moveTo(L, 0);
    ctx.quadraticCurveTo(L * 0.6, -L * 0.32, -L * 0.2, -L * 0.22);
    ctx.quadraticCurveTo(-L * 0.7, -L * 0.12, -L * 0.95, 0);
    ctx.lineTo(-L * 1.15, -L * 0.22); ctx.lineTo(-L * 1.1, 0.02 * L); ctx.lineTo(-L * 1.15, L * 0.22); ctx.lineTo(-L * 0.95, 0.02 * L);
    ctx.quadraticCurveTo(-L * 0.4, L * 0.22, L * 0.4, L * 0.16);
    ctx.quadraticCurveTo(L * 0.8, L * 0.1, L, 0);
    ctx.fill();
    ctx.beginPath(); ctx.moveTo(-L * 0.05, -L * 0.24); ctx.lineTo(-L * 0.25, -L * 0.42); ctx.lineTo(-L * 0.35, -L * 0.2); ctx.fill();
    ctx.restore();
  }

  function drawFrame(dt) {
    time += dt;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.drawImage(bg, 0, 0, W, H);

    // reflejo del sol en el agua
    for (let i = 0; i < 26; i++) {
      const yy = horizon + 6 + i * ((H - horizon) * 0.6 / 26);
      const wv = sun.r * (1.6 - i * 0.03) * (0.6 + 0.4 * Math.sin(time * 1.4 + i * 1.7));
      ctx.fillStyle = `rgba(255,214,150,${0.5 - i * 0.016})`;
      ctx.fillRect(sun.x - wv / 2 + Math.sin(time + i) * 4, yy, wv, 2);
    }
    // brillos del río
    ctx.strokeStyle = 'rgba(255,200,160,.18)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 18; i++) {
      const yy = horizon + 10 + ((i * 53) % (H - horizon - 10));
      const xx = ((i * 137 + time * 12 * (1 + (i % 3))) % (W + 120)) - 60;
      ctx.beginPath(); ctx.moveTo(xx, yy); ctx.lineTo(xx + 30 + (i % 4) * 10, yy); ctx.stroke();
    }

    // aves
    ctx.strokeStyle = 'rgba(30,14,40,.8)'; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
    birds.forEach(b => {
      b.x += b.v * dt; if (b.x > W + 40) { b.x = -40; b.y = rnd(H * 0.1, horizon * 0.6); }
      const f = Math.sin(time * 6 + b.p) * b.s * 0.5;
      ctx.beginPath(); ctx.moveTo(b.x - b.s, b.y - f); ctx.quadraticCurveTo(b.x - b.s * 0.4, b.y - b.s * 0.2, b.x, b.y); ctx.quadraticCurveTo(b.x + b.s * 0.4, b.y - b.s * 0.2, b.x + b.s, b.y - f); ctx.stroke();
    });

    // bufeo
    if (!reduce) {
      nextJump -= dt;
      if (!dolphin && nextJump <= 0) startJump();
      if (dolphin) {
        dolphin.t += dt;
        if (dolphin.t >= dolphin.dur) { ripples.push({ x: dolphin.x1, y: dolphin.y0, r: 2, a: 0.9 }); dolphin = null; nextJump = rnd(5, 9); }
        else drawDolphin(dolphin);
      }
    } else if (dolphin) { drawDolphin(dolphin); }
    ripples = ripples.filter(r => r.a > 0.02);
    ripples.forEach(r => {
      r.r += 26 * dt; r.a -= 0.45 * dt;
      ctx.strokeStyle = `rgba(255,220,200,${Math.max(0, r.a)})`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.ellipse(r.x, r.y, r.r, r.r * 0.28, 0, 0, Math.PI * 2); ctx.stroke();
    });

    // luciérnagas
    flies.forEach(f => {
      f.p += dt * 2; f.x += f.vx * dt + Math.sin(f.p) * 0.3; f.y += f.vy * dt + Math.cos(f.p * 0.7) * 0.3;
      if (f.x < -10) f.x = W + 10; if (f.x > W + 10) f.x = -10; if (f.y < horizon - H * 0.15) f.vy = Math.abs(f.vy); if (f.y > H) f.vy = -Math.abs(f.vy);
      const a = 0.35 + 0.65 * Math.max(0, Math.sin(f.p * 1.3));
      const gr = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.s * 6);
      gr.addColorStop(0, `rgba(255,246,170,${a})`); gr.addColorStop(1, 'rgba(255,246,170,0)');
      ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(f.x, f.y, f.s * 6, 0, Math.PI * 2); ctx.fill();
    });
  }

  function loop(ts) {
    if (!running) return;
    const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0; last = ts;
    drawFrame(dt);
    raf = requestAnimationFrame(loop);
  }

  function start() { if (running || reduce) { if (reduce) drawFrame(0); return; } running = true; last = 0; raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); }

  const ro = new ResizeObserver(() => resize()); ro.observe(canvas);
  const io = new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? start() : stop())), { threshold: 0.05 });
  io.observe(canvas);
  resize();
  if (reduce) { startJump(); dolphin.t = dolphin.dur * 0.45; drawFrame(0); }

  return { destroy() { stop(); ro.disconnect(); io.disconnect(); } };
};
