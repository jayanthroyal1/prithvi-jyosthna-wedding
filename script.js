(() => {
  const C = window.INVITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const NS = "http://www.w3.org/2000/svg";
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  /* ---------- drawings built in code ---------- */
  (function bluebonnet() {
    const g = $("#bbFlorets");
    const rows = [[92, 9, 6], [84, 8.5, 5.6], [76, 8, 5.2], [68, 7.5, 4.8], [60, 7, 4.4], [52, 6, 4], [44, 5, 3.6], [36, 4, 3.2], [29, 2.5, 2.8]];
    rows.forEach(([y, dx, r], i) => {
      const tip = i >= rows.length - 2;
      [[-dx, -25], [dx, 25], [0, 0]].forEach(([ox, rot], k) => {
        const e = document.createElementNS(NS, "ellipse");
        e.setAttribute("cx", 30 + ox); e.setAttribute("cy", y);
        e.setAttribute("rx", r); e.setAttribute("ry", r * .72);
        e.setAttribute("transform", `rotate(${rot} ${30 + ox} ${y})`);
        e.setAttribute("fill", tip ? "#EEF2F8" : k === 2 ? "#3D5A99" : (i % 2 ? "#5574B6" : "#46659F"));
        g.appendChild(e);
      });
    });
    const t = document.createElementNS(NS, "ellipse");
    t.setAttribute("cx", 30); t.setAttribute("cy", 22); t.setAttribute("rx", 3); t.setAttribute("ry", 4.5); t.setAttribute("fill", "#F7F4EC");
    g.appendChild(t);
  })();

  (function sprig() {
    let d = "M40 168C38 120 44 70 40 6";
    for (let y = 160; y > 12; y -= 7) {
      const x = 40 + Math.sin(y / 30) * 2;
      const len = 5 + 13 * (y / 170);
      d += `M${x.toFixed(1)} ${y}l${-len.toFixed(1)} ${-(len * .55).toFixed(1)}M${x.toFixed(1)} ${y}l${len.toFixed(1)} ${-(len * .55).toFixed(1)}`;
    }
    $("#sprigPath").setAttribute("d", d);
  })();

  (function sealShape() {
    let d = "";
    for (let i = 0; i <= 360; i += 3) {
      const a = (i * Math.PI) / 180;
      const r = 46 + 2.4 * Math.sin(a * 11) + 1.3 * Math.sin(a * 4 + 1);
      d += `${i ? "L" : "M"}${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`;
    }
    $("#sealPath").setAttribute("d", d + "Z");
  })();


  (function kalasamLeaves() {
    const g = $("#kalasamLeaves");
    [-72, -36, 0, 36, 72].forEach((a, i) => {
      const leaf = document.createElementNS(NS, "path");
      leaf.setAttribute("d", "M40 38C33 28 33 14 40 2C47 14 47 28 40 38Z");
      leaf.setAttribute("fill", i % 2 ? "#5C8A45" : "#3E6B3A");
      leaf.setAttribute("transform", `rotate(${a} 40 38)`);
      g.appendChild(leaf);
    });
  })();

  /* mamidi thoranam: mango leaves and banthi (marigold) on a cord */
  function torana(svg) {
    const cord = document.createElementNS(NS, "path");
    cord.setAttribute("d", "M0 8Q220 26 440 8");
    cord.setAttribute("stroke", "#8B5A2B"); cord.setAttribute("stroke-width", "1.6"); cord.setAttribute("fill", "none");
    svg.appendChild(cord);
    const n = 23;
    for (let i = 0; i < n; i++) {
      const t = (i + .5) / n, x = 440 * t, y = 8 + 36 * t * (1 - t);
      const g = document.createElementNS(NS, "g");
      g.style.animationDelay = (-Math.random() * 3.6).toFixed(2) + "s";
      if (i % 2 === 0) {
        g.setAttribute("class", "leaf");
        const s = .9 + (i % 4 === 0 ? .2 : 0);
        g.innerHTML = `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s})">` +
          `<path d="M0 0C-8 12 -8 34 0 52C8 34 8 12 0 0Z" fill="${i % 4 === 0 ? "#3E6B3A" : "#5C8A45"}"/>` +
          `<path d="M0 2V48" stroke="#A9C77E" stroke-width=".8"/></g>`;
      } else {
        g.setAttribute("class", "flower");
        g.innerHTML = `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})">` +
          `<path d="M0 0V10" stroke="#8B5A2B" stroke-width="1"/>` +
          `<circle cy="17" r="8" fill="#E8892B"/><circle cy="17" r="5.5" fill="#F2A53C"/><circle cy="17" r="2.4" fill="#C9661E"/>` +
          `<circle cy="30" r="2.4" fill="#A3242B"/><circle cy="36" r="2" fill="#E8B53A"/></g>`;
      }
      svg.appendChild(g);
    }
  }
  $$(".torana").forEach(torana);


  /* ---------- lotus that blooms behind the seal ---------- */
  (function lotus() {
    const g = $("#lotusPetals");
    const layers = [
      { n: 10, len: 92, w: 24, off: 0, fill: "url(#petalOuter)", d: 0 },
      { n: 10, len: 72, w: 20, off: 18, fill: "url(#petalMid)", d: .22 },
      { n: 8, len: 52, w: 15, off: 0, fill: "url(#petalInner)", d: .44 }
    ];
    layers.forEach((L) => {
      for (let i = 0; i < L.n; i++) {
        const a = L.off + i * 360 / L.n;
        const rot = document.createElementNS(NS, "g");
        rot.setAttribute("transform", `rotate(${a})`);
        const p = document.createElementNS(NS, "path");
        const { len: l, w } = L;
        p.setAttribute("d", `M0 0C${-w} ${-l * .3} ${-w * .85} ${-l * .78} 0 ${-l}C${w * .85} ${-l * .78} ${w} ${-l * .3} 0 0Z`);
        p.setAttribute("fill", L.fill);
        p.setAttribute("stroke", "#F6D47E"); p.setAttribute("stroke-width", ".8");
        p.setAttribute("class", "petal");
        p.style.setProperty("--d", (L.d + i * .025).toFixed(3) + "s");
        const vein = document.createElementNS(NS, "path");
        vein.setAttribute("d", `M0 -6V${-l * .82}`);
        vein.setAttribute("stroke", "#FFE9A8"); vein.setAttribute("stroke-width", ".6"); vein.setAttribute("opacity", ".7");
        vein.setAttribute("class", "petal");
        vein.style.setProperty("--d", (L.d + i * .025).toFixed(3) + "s");
        rot.append(p, vein);
        g.appendChild(rot);
      }
    });
  })();

  function petalBurst() {
    const r = $("#seal").getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const cols = ["#B3121F", "#D42A2A", "#E8B53A", "#F6D47E", "#FFF3C8", "#7E0812"];
    for (let i = 0; i < 34; i++) {
      const s = document.createElement("span");
      s.className = "intro-petal";
      s.style.left = cx + "px"; s.style.top = cy + "px";
      s.style.background = cols[i % cols.length];
      document.body.appendChild(s);
      const a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 170;
      s.animate([
        { transform: "translate(-50%,-50%) scale(.3) rotate(0deg)", opacity: 0 },
        { transform: `translate(${Math.cos(a) * d * .5}px, ${Math.sin(a) * d * .5}px) scale(1) rotate(${Math.random() * 180}deg)`, opacity: 1, offset: .3 },
        { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d + 120}px) scale(.8) rotate(${Math.random() * 540}deg)`, opacity: 0 }
      ], { duration: 1800 + Math.random() * 900, delay: 250 + Math.random() * 500, easing: "cubic-bezier(.2,.7,.35,1)", fill: "both" }).onfinish = () => s.remove();
    }
  }

  /* ---------- links ---------- */
  const q = encodeURIComponent(C.venueQuery);
  $("#mapBtn").href = `https://www.google.com/maps/search/?api=1&query=${q}`;
  $("#rsvpBtn").href = C.rsvpUrl;
  const eventDate = new Date(C.date);
  const ics = (d) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  $("#calBtn").href = "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent("Prithvi & Jyosthna — Wedding")}` +
    `&dates=${ics(eventDate)}/${ics(new Date(eventDate.getTime() + 3 * 3600e3))}` +
    `&location=${q}&details=${encodeURIComponent("Wedding Muhurtham 7:49 AM CST. Cocktails & Celebration Sunday, December 20, 6 PM CST onwards.")}`;

  /* ---------- music ---------- */
  const audio = $("#bgm");
  const audioBtn = $("#audioBtn");
  let wantMusic = false;
  audio.src = C.music.src;
  audio.volume = C.music.volume ?? 0.7;
  const setPlaying = (on) => {
    audioBtn.classList.toggle("paused", !on);
    audioBtn.setAttribute("aria-label", on ? "Pause music" : "Play music");
  };
  function playMusic() {
    audio.play().then(() => { wantMusic = true; setPlaying(true); }).catch(() => setPlaying(false));
  }
  audioBtn.addEventListener("click", () => {
    if (audio.paused) playMusic();
    else { audio.pause(); wantMusic = false; setPlaying(false); }
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) audio.pause();
    else if (wantMusic) audio.play().catch(() => {});
  });

  /* ---------- envelope: glow, open, reveal ---------- */
  const intro = $("#intro");
  const page = $("#main");
  let opened = false;

  function sparkles() {
    const box = $("#sparkles");
    const corners = [[0, 0], [100, 0], [0, 100], [100, 100]];
    for (let i = 0; i < 26; i++) {
      const [cx, cy] = corners[i % 4];
      const t = .12 + Math.random() * .8;
      const s = document.createElement("span");
      s.className = "spark";
      s.style.left = 50 + (cx - 50) * t + "%";
      s.style.top = 50 + (cy - 50) * t + "%";
      const size = 6 + Math.random() * 10;
      s.style.width = s.style.height = size + "px";
      box.appendChild(s);
      s.animate([
        { opacity: 0, transform: "translateY(0) scale(.4) rotate(0deg)" },
        { opacity: 1, transform: "translateY(-10px) scale(1) rotate(45deg)", offset: .35 },
        { opacity: 0, transform: `translateY(-${30 + Math.random() * 40}px) scale(.6) rotate(90deg)` }
      ], { duration: 1300 + Math.random() * 900, delay: 300 + Math.random() * 1400, easing: "ease-out", fill: "both" });
    }
  }

  function openInvite() {
    if (opened) return;
    opened = true;
    playMusic();
    enableGyro();
    audioBtn.classList.add("show");
    if (reduceMotion) return finish(0);
    intro.classList.add("s1");
    sparkles();
    petalBurst();
    setTimeout(() => intro.classList.add("s2"), 2000);
    setTimeout(() => intro.classList.add("s3"), 2900);
    setTimeout(() => intro.classList.add("s4"), 3700);
    finish(4400);
  }
  function finish(at) {
    setTimeout(() => {
      document.body.classList.remove("locked");
      window.scrollTo(0, 0);
      pageLive = true;
      heroSection.classList.remove("paused");
      page.classList.add("show");
      intro.classList.add("out");
      initScratch();
      if (hasVideo) heroVideo.play().catch(() => {});
      onScroll();
      // particles start once the envelope has faded, so the hand-over stays smooth
      setTimeout(() => talambralu.start(), 1450);
    }, at);
    setTimeout(() => intro.remove(), at + 1500);
  }

  /* ---------- hero video (assets/hero.mp4) takes over when present ---------- */
  const heroSection = $(".hero");
  let pageLive = false;
  heroSection.classList.add("paused");
  const heroVideoWrap = $("#heroVideoWrap");
  let heroVideo = null, hasVideo = false;
  if (C.heroVideo) {
    heroVideo = document.createElement("video");
    Object.assign(heroVideo, { muted: true, loop: true, playsInline: true, preload: "auto" });
    heroVideo.setAttribute("playsinline", ""); heroVideo.setAttribute("aria-hidden", "true");
    heroVideo.addEventListener("loadeddata", () => {
      hasVideo = true;
      heroVideoWrap.prepend(heroVideo);
      heroSection.classList.add("has-video");
      if (page.classList.contains("show")) heroVideo.play().catch(() => {});
    });
    heroVideo.addEventListener("error", () => heroVideoWrap.remove());
    heroVideo.src = C.heroVideo;
  } else heroVideoWrap.remove();

  intro.addEventListener("click", openInvite);
  intro.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openInvite(); } });

  /* ---------- tap glow on buttons ---------- */
  document.addEventListener("pointerdown", (e) => {
    const t = e.target.closest(".btn, .btn-ghost, .audio-btn");
    if (!t) return;
    const g = document.createElement("span");
    g.className = "glow-ring";
    g.style.left = e.clientX + "px"; g.style.top = e.clientY + "px";
    g.style.position = "fixed";
    document.body.appendChild(g);
    g.animate([{ width: "0px", height: "0px", opacity: 1 }, { width: "170px", height: "170px", opacity: 0 }],
      { duration: 750, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = () => g.remove();
  });

  /* ---------- hero: mandapam details built in code ---------- */
  (function heroDetails() {
    const mk = (tag, attrs, parent) => {
      const el = document.createElementNS(NS, tag);
      for (const k in attrs) el.setAttribute(k, attrs[k]);
      parent.appendChild(el);
      return el;
    };
    const rnd = (a, b) => a + Math.random() * (b - a);
    // string-light bulbs along both cords
    const bulbs = $("#bulbs");
    [[-10, 238, 220, 330, 450, 238]].forEach(([x0, y0, cx, cy, x1, y1]) => {
      for (let i = 1; i <= 17; i++) {
        const t = i / 18;
        const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t * t * x1;
        const y = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t * t * y1;
        const g = mk("g", { class: "bulb" }, bulbs);
        g.style.animationDelay = rnd(-3, 0).toFixed(2) + "s";
        mk("circle", { cx: x.toFixed(1), cy: (y + 5).toFixed(1), r: 7, fill: "#FFE3A0", opacity: .3 }, g);
        mk("circle", { cx: x.toFixed(1), cy: (y + 5).toFixed(1), r: 2.8, fill: "#FFF1C6" }, g);
      }
    });
    // banthi garlands spiralling down the two front pillars
    const pg = $("#pillarGarlands");
    const rings = $("#rings");
    [83, 357].forEach((cx) => {
      [480, 560, 640].forEach((y) => {
        mk("rect", { x: cx - 13, y, width: 26, height: 3, fill: "#FFE7A3" }, rings);
        mk("rect", { x: cx - 13, y: y + 3, width: 26, height: 2.4, fill: "#7E5214" }, rings);
      });
    });
    [83, 357].forEach((cx) => {
      for (let y = 436, i = 0; y < 660; y += 8.5, i++) {
        const x = cx + 8 * Math.sin(y / 16);
        mk("circle", { cx: x.toFixed(1), cy: y, r: 4.3, fill: i % 3 === 0 ? "#F2B33D" : "#E8892B" }, pg);
        if (i % 4 === 0) mk("ellipse", { cx: (x + 5).toFixed(1), cy: y + 3, rx: 1.6, ry: 4, fill: "#4F7A34", transform: `rotate(-30 ${(x + 5).toFixed(1)} ${y + 3})` }, pg);
      }
    });
    // marigold beads along the arch, with short tassels
    const sw = $("#swags");
    const P = [[98, 446], [98, 404], [142, 390], [220, 388], [298, 390], [342, 404], [342, 446]];
    const cubic = (a, b, c, d, t) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d;
    const arch = [];
    for (let i = 0; i <= 16; i++) { const t = i / 16; arch.push([cubic(P[0][0], P[1][0], P[2][0], P[3][0], t), cubic(P[0][1], P[1][1], P[2][1], P[3][1], t)]); }
    for (let i = 1; i <= 16; i++) { const t = i / 16; arch.push([cubic(P[3][0], P[4][0], P[5][0], P[6][0], t), cubic(P[3][1], P[4][1], P[5][1], P[6][1], t)]); }
    arch.forEach(([x, y], i) => {
      mk("circle", { cx: x.toFixed(1), cy: (y + 2).toFixed(1), r: 4.6, fill: i % 2 ? "#F2A53C" : "#E8892B" }, sw);
      if (i % 4 === 2 && i > 3 && i < arch.length - 4) {
        mk("path", { d: `M${x.toFixed(1)} ${(y + 6).toFixed(1)}v10`, stroke: "#8B5A2B", "stroke-width": .8 }, sw);
        mk("circle", { cx: x.toFixed(1), cy: (y + 18).toFixed(1), r: 2.6, fill: "#A3242B" }, sw);
      }
    });
    // kumkum & turmeric dots on the beam
    const bd = $("#beamDots");
    for (let x = 68, i = 0; x <= 372; x += 11, i++) mk("circle", { cx: x, cy: 371, r: 1.9, fill: i % 2 ? "#E8B53A" : "#A3242B" }, bd);
    // dots around the muggu
    const md = $("#mugguDots");
    for (let a = 0; a < 360; a += 22.5) {
      const r = a % 45 ? 53 : 74;
      mk("circle", { cx: (r * Math.cos(a * Math.PI / 180)).toFixed(1), cy: (r * Math.sin(a * Math.PI / 180)).toFixed(1), r: a % 45 ? 2.4 : 3.4 }, md);
    }
    // malle poolu (jasmine) strands hanging inside the arch
    const jas = $("#jasmine");
    [[112, 70], [126, 48], [140, 30], [300, 30], [314, 48], [328, 70]].forEach(([x, len]) => {
      const top = 392 + Math.abs(220 - x) * .1;
      for (let y = top; y < top + len; y += 5) mk("circle", { cx: x, cy: y.toFixed(1), r: 2.1, fill: "#FFFDF6" }, jas);
      mk("circle", { cx: x, cy: (top + len + 3).toFixed(1), r: 2.6, fill: "#E8892B" }, jas);
    });
    // embers rising from the homam
    const emb = $("#embers");
    for (let i = 0; i < 9; i++) {
      const c = mk("circle", { cx: (212 + Math.random() * 16).toFixed(1), cy: 664, r: (.8 + Math.random() * 1.2).toFixed(2), class: "ember" }, emb);
      c.style.animationDelay = (-Math.random() * 3).toFixed(2) + "s";
      c.style.animationDuration = (2.2 + Math.random() * 1.6).toFixed(2) + "s";
      c.style.setProperty("--dx", ((Math.random() - .5) * 30).toFixed(1) + "px");
    }
  })();



  /* ---------- 3D: layers sit at different depths; the stage tilts with pointer / phone tilt / scroll ---------- */
  const stage = $("#stage");
  const tilt = { x: 0, y: 0, tx: 0, ty: 0, scroll: 0 };
  let tiltRaf = 0;
  function renderTilt() {
    tilt.x += (tilt.tx - tilt.x) * .08;
    tilt.y += (tilt.ty - tilt.y) * .08;
    stage.style.setProperty("--px", (tilt.x * 1.3).toFixed(2));
    stage.style.setProperty("--py", (tilt.y * 1.3).toFixed(2));
    if (Math.abs(tilt.tx - tilt.x) > .01 || Math.abs(tilt.ty - tilt.y) > .01) tiltRaf = requestAnimationFrame(renderTilt);
    else tiltRaf = 0;
  }
  const kick = () => { if (!tiltRaf && heroVisibleNow()) tiltRaf = requestAnimationFrame(renderTilt); };
  let heroVisible = true;
  const heroVisibleNow = () => heroVisible || scrollY < innerHeight * 1.5;
  if (!reduceMotion) {
    $("#heroScene").addEventListener("pointermove", (e) => {
      if (e.pointerType === "touch") return;
      const r = e.currentTarget.getBoundingClientRect();
      tilt.tx = ((e.clientX - r.left) / r.width - .5) * 9;
      tilt.ty = -((e.clientY - r.top) / r.height - .5) * 7;
      kick();
    });
    $("#heroScene").addEventListener("pointerleave", () => { tilt.tx = 0; tilt.ty = 0; kick(); });
  }
  let base = null;
  function onOrient(e) {
    if (e.gamma == null) return;
    if (!base) base = { g: e.gamma, b: e.beta };
    tilt.tx = Math.max(-9, Math.min(9, (e.gamma - base.g) * .45));
    tilt.ty = Math.max(-7, Math.min(7, -(e.beta - base.b) * .35));
    kick();
  }
  function enableGyro() {
    if (reduceMotion || !window.DeviceOrientationEvent) return;
    const D = window.DeviceOrientationEvent;
    if (typeof D.requestPermission === "function") {
      D.requestPermission().then((s) => { if (s === "granted") addEventListener("deviceorientation", onOrient); }).catch(() => {});
    } else addEventListener("deviceorientation", onOrient);
  }

  /* ---------- talambralu: rice, pearls and marigold petals drifting down ---------- */
  const talambralu = (() => {
    const cv = $("#talambralu");
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, parts = [], running = false, visible = true, raf = 0;
    const kinds = [
      { c: "#F2C14E", w: 1.6, h: 4.2 },   // turmeric rice
      { c: "#F2C14E", w: 1.6, h: 4.2 },
      { c: "#FFFDF4", w: 2.4, h: 2.4 },   // pearls
      { c: "#E8892B", w: 3.2, h: 5.2 },   // marigold petal
      { c: "#A3242B", w: 1.6, h: 1.6 }    // kumkum speck
    ];
    function size() {
      const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 1.5);
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn(initial) {
      const k = kinds[Math.floor(Math.random() * kinds.length)];
      return { ...k, x: Math.random() * W, y: initial ? Math.random() * H : -10, vy: .35 + Math.random() * .7, ph: Math.random() * 6.28, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .05 };
    }
    // soft bokeh orbs, rendered once to sprites and then just stamped each frame
    const orbCols = ["255,226,160", "255,205,120", "255,246,220", "232,137,43"];
    const sprites = orbCols.map((col) => {
      const c = document.createElement("canvas"); c.width = c.height = 64;
      const g = c.getContext("2d"), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, `rgba(${col},.75)`); gr.addColorStop(.5, `rgba(${col},.35)`); gr.addColorStop(1, `rgba(${col},0)`);
      g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
      return c;
    });
    let orbs = [];
    const newOrb = (initial) => ({ s: sprites[Math.floor(Math.random() * sprites.length)], size: 10 + Math.random() * 26, x: Math.random() * W,
      y: initial ? H * (.2 + Math.random() * .8) : H + 20, vy: .12 + Math.random() * .22, life: initial ? Math.random() : 0 });
    function frame(t) {
      ctx.clearRect(0, 0, W, H);
      for (const o of orbs) {
        o.y -= o.vy; o.life += .0025;
        if (o.y < H * .15 || o.life > 1) Object.assign(o, newOrb(false));
        ctx.globalAlpha = Math.sin(Math.min(o.life, 1) * Math.PI) * .8;
        ctx.drawImage(o.s, o.x - o.size / 2, o.y - o.size / 2, o.size, o.size);
      }
      for (const p of parts) {
        p.y += p.vy; p.rot += p.vr;
        const x = p.x + Math.sin(t / 900 + p.ph) * 10;
        if (p.y > H + 10) Object.assign(p, spawn(false));
        ctx.save(); ctx.translate(x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.c; ctx.globalAlpha = .9;
        ctx.beginPath(); ctx.ellipse(0, 0, p.w, p.h, 0, 0, 6.283); ctx.fill();
        ctx.restore();
      }
      if (running && visible) raf = requestAnimationFrame(frame);
    }
    new IntersectionObserver((e) => {
      visible = e[0].isIntersecting;
      if (visible && running) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
    }).observe(cv);
    addEventListener("resize", () => { if (running) size(); });
    return {
      start() {
        if (running || reduceMotion) return;
        running = true; size();
        parts = Array.from({ length: W < 400 ? 30 : 42 }, () => spawn(true));
        orbs = Array.from({ length: 12 }, () => newOrb(true));
        raf = requestAnimationFrame(frame);
      }
    };
  })();

  /* ---------- scratch to reveal ---------- */
  let scratchReady = false;
  function initScratch() {
    if (scratchReady) return;
    scratchReady = true;
    const boxes = $$(".scratch-box");
    let revealedCount = 0, lastBuzz = 0;

    // moving coin hint over the first card until someone scratches
    const hint = document.createElement("span");
    hint.className = "scratch-hint";
    hint.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="15" fill="#F6E1A8" stroke="#B0802B" stroke-width="2"/><circle cx="20" cy="20" r="10" fill="none" stroke="#B0802B" stroke-width="1"/><path d="M20 13l2 5h5l-4 3 1.6 5L20 23l-4.6 3 1.6-5-4-3h5Z" fill="#B0802B"/></svg>';
    boxes[0].appendChild(hint);
    const dropHint = () => hint.classList.add("gone");

    boxes.forEach((box) => {
      const canvas = $("canvas", box);
      const value = $("b", box);
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      let drawing = false, last = null, moves = 0, done = false, w = 0, h = 0;

      function paint() {
        const r = box.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        w = r.width; h = r.height;
        canvas.width = w * dpr; canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalCompositeOperation = "source-over";
        // brushed-gold foil
        const g = ctx.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, "#A8792A"); g.addColorStop(.22, "#E9C46F"); g.addColorStop(.42, "#FBE7B0");
        g.addColorStop(.6, "#CFA24A"); g.addColorStop(.82, "#F1D58F"); g.addColorStop(1, "#9E6F24");
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
        // fine brushed lines + grain
        for (let y = 0; y < h; y += 1.5) {
          ctx.fillStyle = `rgba(${Math.random() < .5 ? "255,250,230" : "120,80,20"},${(Math.random() * .08).toFixed(3)})`;
          ctx.fillRect(0, y, w, 1);
        }
        for (let i = 0; i < 70; i++) {
          ctx.fillStyle = `rgba(255,252,236,${(Math.random() * .8).toFixed(2)})`;
          ctx.beginPath(); ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.1, 0, 7); ctx.fill();
        }
        // engraved border
        ctx.strokeStyle = "rgba(255,246,214,.75)"; ctx.lineWidth = 1;
        ctx.strokeRect(6.5, 6.5, w - 13, h - 13);
        ctx.strokeStyle = "rgba(120,80,20,.35)";
        ctx.strokeRect(8.5, 8.5, w - 17, h - 17);
        // small muggu flower in the middle
        ctx.save(); ctx.translate(w / 2, h / 2 - 6);
        ctx.strokeStyle = "rgba(120,80,20,.45)"; ctx.lineWidth = 1.1;
        for (let a = 0; a < 8; a++) {
          ctx.rotate(Math.PI / 4);
          ctx.beginPath(); ctx.ellipse(0, -9, 4, 8, 0, 0, 6.283); ctx.stroke();
        }
        ctx.fillStyle = "rgba(163,36,43,.7)";
        ctx.beginPath(); ctx.arc(0, 0, 2.6, 0, 6.283); ctx.fill();
        ctx.restore();
        ctx.fillStyle = "rgba(110,72,18,.7)";
        ctx.font = "500 8.5px Cinzel, serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("S C R A T C H", w / 2, h - 17);
      }

      const pos = (e) => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
      function flakes(p) {
        const r = canvas.getBoundingClientRect();
        for (let i = 0; i < 2; i++) {
          const f = document.createElement("span");
          f.className = "flake";
          f.style.left = r.left + p.x + "px"; f.style.top = r.top + p.y + "px";
          document.body.appendChild(f);
          f.animate([
            { transform: "translate(-50%,-50%) rotate(0)", opacity: 1 },
            { transform: `translate(${(Math.random() - .5) * 40}px, ${30 + Math.random() * 40}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
          ], { duration: 650 + Math.random() * 400, easing: "cubic-bezier(.3,.6,.4,1)" }).onfinish = () => f.remove();
        }
      }
      function scratch(p) {
        ctx.globalCompositeOperation = "destination-out";
        const a = last || p;
        ctx.lineWidth = 24; ctx.lineCap = "round"; ctx.lineJoin = "round";
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(p.x + .1, p.y); ctx.stroke();
        // ragged foil edge
        const steps = Math.max(1, Math.hypot(p.x - a.x, p.y - a.y) / 6);
        for (let i = 0; i <= steps; i++) {
          const x = a.x + (p.x - a.x) * i / steps, y = a.y + (p.y - a.y) * i / steps;
          for (let k = 0; k < 3; k++) {
            const ang = Math.random() * 6.283, d = 11 + Math.random() * 6;
            ctx.beginPath(); ctx.arc(x + Math.cos(ang) * d, y + Math.sin(ang) * d, 1 + Math.random() * 2.4, 0, 6.283); ctx.fill();
          }
        }
        last = p;
        if (++moves % 3 === 0) flakes(p);
        const now = performance.now();
        if (navigator.vibrate && now - lastBuzz > 70) { lastBuzz = now; try { navigator.vibrate(5); } catch (e) {} }
        if (moves % 4 === 0) check();
      }
      function check() {
        const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let clear = 0, total = 0;
        for (let i = 3; i < data.length; i += 32) { total++; if (data[i] === 0) clear++; }
        if (clear / total > .42) reveal();
      }
      function reveal() {
        if (done) return;
        done = true;
        canvas.animate([
          { opacity: 1, transform: "scale(1)", filter: "blur(0px)" },
          { opacity: 0, transform: "scale(1.12)", filter: "blur(4px)" }
        ], { duration: 650, easing: "ease-out", fill: "forwards" });
        box.classList.add("done");
        value.animate([
          { transform: "scale(.55)", opacity: .2 },
          { transform: "scale(1.18)", opacity: 1, offset: .6 },
          { transform: "scale(1)", opacity: 1 }
        ], { duration: 700, easing: "cubic-bezier(.3,.7,.3,1.2)" });
        burst(box.getBoundingClientRect(), 18);
        if (++revealedCount === boxes.length) {
          setTimeout(() => {
            $(".scratch-row").classList.add("all-done");
            $("#dWeekday").classList.add("show");
            $("#saveDate").classList.add("show");
            burst($(".scratch-row").getBoundingClientRect(), 70);
          }, 350);
        }
      }
      canvas.addEventListener("pointerdown", (e) => { dropHint(); drawing = true; last = null; try { canvas.setPointerCapture(e.pointerId); } catch (err) {} scratch(pos(e)); });
      canvas.addEventListener("pointermove", (e) => { if (drawing) scratch(pos(e)); });
      const stop = () => { drawing = false; last = null; if (!done) check(); };
      canvas.addEventListener("pointerup", stop);
      canvas.addEventListener("pointercancel", stop);
      window.addEventListener("resize", () => {
        if (!done && Math.abs(box.getBoundingClientRect().width - w) > 1) paint();
      });
      paint();
      document.fonts.ready.then(() => { if (!done) paint(); });
    });
  }

  function burst(rect, n) {
    const colors = ["#E8892B", "#F2B33D", "#D7A23E", "#A3242B", "#FFF6DA", "#5B7285", "#2E4A3F"];
    const cx = rect.left + rect.width / 2, cy = rect.top + rect.height / 2;
    for (let i = 0; i < n; i++) {
      const s = document.createElement("span");
      s.className = "spark-burst" + (i % 3 === 0 ? " petal" : "");
      s.style.left = cx + "px"; s.style.top = cy + "px";
      s.style.background = colors[i % colors.length];
      document.body.appendChild(s);
      const a = Math.random() * Math.PI * 2, d = 50 + Math.random() * (n > 30 ? 180 : 80);
      s.animate([
        { transform: "translate(-50%,-50%) rotate(0) scale(1)", opacity: 1 },
        { transform: `translate(${Math.cos(a) * d}px, ${Math.sin(a) * d * .7 - 30}px) rotate(${Math.random() * 360}deg) scale(1)`, opacity: 1, offset: .45 },
        { transform: `translate(${Math.cos(a) * d * 1.1}px, ${Math.sin(a) * d * .7 + 90}px) rotate(${Math.random() * 720}deg) scale(.7)`, opacity: 0 }
      ], { duration: 1500 + Math.random() * 800, easing: "cubic-bezier(.2,.6,.4,1)" }).onfinish = () => s.remove();
    }
  }

  /* ---------- scroll: progress bar, hero lean, timeline (reads first, then writes; no per-element work) ---------- */
  const timeline = $("#timeline");
  const marker = $("#tlMarker");
  const tlFill = document.createElement("div");
  tlFill.className = "tl-fill";
  timeline.insertBefore(tlFill, marker);
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);
  const hero = $(".hero-scene");
  const heroText = $(".l-text .hero-text"), scrollCue = $(".scroll-down");
  // layout numbers are measured only when the layout changes, never during scroll
  let docMax = 1, heroH = 1, tlTop = 0, tlTravel = 1, vh = innerHeight;
  function measure() {
    vh = innerHeight;
    docMax = Math.max(1, document.documentElement.scrollHeight - vh);
    heroH = hero.offsetHeight || 1;
    const r = timeline.getBoundingClientRect();
    tlTop = r.top + scrollY;
    tlTravel = Math.max(1, r.height - 70);
  }
  new ResizeObserver(() => { measure(); onScroll(); }).observe(document.body);
  let ticking = false, lastHero = -1;
  // browsers with scroll-driven animations move the hero, fade its text and fill the bar in CSS
  const cssScroll = window.CSS && CSS.supports("animation-timeline: scroll()");
  function onScroll() {
    ticking = false;
    const y = scrollY;
    if (!cssScroll) progress.style.transform = `scaleX(${(y / docMax).toFixed(4)})`;
    if (reduceMotion) return;
    if (!cssScroll && (y < heroH * 1.3 || lastHero !== 1)) {
      const k = Math.min(y / heroH, 1);
      stage.style.setProperty("--sy", (k * heroH).toFixed(1));
      const f = Math.min(y / (heroH * .55), 1);
      heroText.style.opacity = (1 - f).toFixed(3);
      scrollCue.style.opacity = Math.max(0, 1 - y / 120).toFixed(3);
      lastHero = y < heroH * 1.3 ? 0 : 1;
    }
    const p = Math.min(Math.max((y + vh * .55 - tlTop) / tlTravel, 0), 1);
    marker.style.transform = `translateY(${(p * tlTravel).toFixed(1)}px)`;
    tlFill.style.transform = `scaleY(${p.toFixed(4)})`;
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener("resize", () => { measure(); onScroll(); });
  addEventListener("load", () => { measure(); onScroll(); });
  measure();

  /* pause the hero's animations, particles and gold sheen while it is off-screen */
  const sheenSvg = $("#sheenLayer");
  new IntersectionObserver((e) => {
    heroVisible = e[0].isIntersecting;
    heroSection.classList.toggle("paused", !heroVisible || !pageLive);
    try { heroVisible ? sheenSvg.unpauseAnimations() : sheenSvg.pauseAnimations(); } catch (err) {}
  }).observe(hero);

  /* reveal: text rises out of a soft blur, staggered within each batch */
  $$("[data-lift]").forEach((el) => el.classList.add("rv"));
  const io = new IntersectionObserver((entries) => {
    const shown = entries.filter((en) => en.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    shown.forEach((en, i) => {
      const el = en.target;
      if (el.classList.contains("rv")) el.style.transitionDelay = `${i * 90}ms, ${i * 90}ms, ${i * 90}ms, 0ms`;
      el.classList.add("in");
      io.unobserve(el);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
  $$(".rv, [data-fadeup]:not(.photo), [data-fade], [data-fade-late], .tl-item").forEach((el) => io.observe(el));
  // clipped photos can't be seen by the observer, so their chapter triggers the wipe
  const photoIo = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      $(".photo", en.target).classList.add("in");
      photoIo.unobserve(en.target);
    });
  }, { threshold: 0.12 });
  $$(".chapter").forEach((ch) => photoIo.observe(ch));


  /* ---------- map (loads when near) ---------- */
  const mapIo = new IntersectionObserver((entries) => {
    if (!entries[0].isIntersecting) return;
    mapIo.disconnect();
    (window.requestIdleCallback || ((fn) => setTimeout(fn, 300)))(() => {
    const f = document.createElement("iframe");
    f.title = "Map to Serengeti Estates"; f.loading = "lazy"; f.referrerPolicy = "no-referrer-when-downgrade";
    f.src = `https://www.google.com/maps?q=${q}&output=embed`;
    $("#map").appendChild(f);
    }, { timeout: 1500 });
  }, { rootMargin: "400px" });
  mapIo.observe($("#map"));

  /* ---------- countdown: royal split-flap clock ---------- */
  const cd = $("#countdown");
  const units = { d: $('[data-u="d"]', cd), h: $('[data-u="h"]', cd), m: $('[data-u="m"]', cd), s: $('[data-u="s"]', cd) };
  const secCell = units.s.closest(".cd");
  const FLIP = reduceMotion ? 0 : 320;
  function makeDigit() {
    const d = document.createElement("span");
    d.className = "fd";
    d.innerHTML = '<span class="fd-half fd-up"><span>0</span></span><span class="fd-half fd-low"><span>0</span></span>' +
      '<span class="fd-half fd-up fd-flap-top"><span>0</span></span><span class="fd-half fd-low fd-flap-bottom"><span>0</span></span>';
    d.dataset.v = "0";
    return d;
  }
  function setDigit(el, v, fast) {
    const cur = el.dataset.v;
    if (cur === v) return;
    const [up, low, ft, fb] = el.children;
    up.firstChild.textContent = v; fb.firstChild.textContent = v;
    ft.firstChild.textContent = cur; low.firstChild.textContent = cur;
    el.dataset.v = v;
    const dur = fast ? 70 : FLIP;
    el.style.setProperty("--ft", dur + "ms");
    el.classList.remove("flip"); void el.offsetWidth; el.classList.add("flip");
    clearTimeout(el._t);
    el._t = setTimeout(() => { low.firstChild.textContent = v; ft.firstChild.textContent = v; el.classList.remove("flip"); }, dur * 2 + 40);
  }
  function setUnit(key, num, fast) {
    const host = units[key];
    const str = String(num).padStart(2, "0");
    while (host.children.length < str.length) host.appendChild(makeDigit());
    while (host.children.length > str.length) host.lastChild.remove();
    [...str].forEach((ch, i) => setDigit(host.children[i], ch, fast));
  }
  Object.values(units).forEach((b) => { b.textContent = ""; b.append(makeDigit(), makeDigit()); });

  let rolling = false;
  function tick() {
    const diff = (eventDate - Date.now()) / 1000;
    if (diff <= 0) {
      cd.className = "countdown over in";
      cd.textContent = Date.now() - eventDate < 2 * 86400e3 ? "Today we say “I do”" : "Happily ever after";
      return clearInterval(timer);
    }
    if (rolling) return;
    setUnit("d", Math.floor(diff / 86400));
    setUnit("h", Math.floor(diff % 86400 / 3600));
    setUnit("m", Math.floor(diff % 3600 / 60));
    setUnit("s", Math.floor(diff % 60));
    secCell.classList.remove("beat"); void secCell.offsetWidth; secCell.classList.add("beat");
  }
  const timer = setInterval(tick, 1000);
  tick();

  // slot-machine spin the first time the clock scrolls into view
  if (!reduceMotion) {
    const rollIo = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      rollIo.disconnect();
      rolling = true;
      const spin = setInterval(() => {
        Object.keys(units).forEach((k) => {
          const n = units[k].children.length;
          setUnit(k, Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join(""), true);
        });
      }, 160);
      setTimeout(() => { clearInterval(spin); rolling = false; tick(); cd.classList.add("landed"); }, 1700);
    }, { threshold: .5 });
    rollIo.observe(cd);
  }
})();
