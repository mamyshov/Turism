// One-off generator for the illustrated demo landscapes in public/images/demo.
// Needs Playwright (not a project dependency): NODE_PATH=<global node_modules> node scripts/generate-demo-art.js
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const W = 1200, H = 800;
const OUT = path.join(__dirname, "..", "public", "images", "demo");

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ridge(r, baseY, amp, rough, points = 129) {
  const pts = new Array(points).fill(0);
  pts[0] = (r() - 0.5) * amp; pts[points - 1] = (r() - 0.5) * amp;
  let step = points - 1, scale = amp;
  while (step > 1) {
    const half = step / 2;
    for (let i = half; i < points - 1; i += step) pts[i] = (pts[i - half] + pts[i + half]) / 2 + (r() - 0.5) * scale;
    step = half; scale *= rough;
  }
  return pts.map((v, i) => [(i / (points - 1)) * W, baseY + v]);
}
const poly = (pts, bottom = H) => `M0,${bottom} ` + pts.map(([x, y]) => `L${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + ` L${W},${bottom} Z`;
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgb = (c) => `rgb(${c[0]},${c[1]},${c[2]})`;

const PAL = {
  day:    { top: [74, 133, 201], bot: [196, 226, 244], haze: [206, 226, 240], rock: [92, 104, 124], sun: [255, 244, 214], lake: [38, 128, 170] },
  golden: { top: [92, 128, 186], bot: [250, 214, 164], haze: [244, 214, 178], rock: [104, 98, 112], sun: [255, 230, 170], lake: [58, 120, 150] },
  clear:  { top: [46, 112, 196], bot: [168, 214, 244], haze: [190, 220, 240], rock: [84, 100, 124], sun: [255, 250, 230], lake: [30, 118, 176] },
  winter: { top: [120, 150, 190], bot: [226, 236, 246], haze: [226, 236, 246], rock: [120, 130, 150], sun: [255, 255, 255], lake: [120, 160, 190] },
  canyon: { top: [86, 140, 196], bot: [246, 218, 184], haze: [240, 214, 190], rock: [150, 80, 54], sun: [255, 238, 200], lake: [60, 130, 160] },
};

function mountains(r, p, { count, topY, snow, snowLine }) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1 || 1);
    const baseY = topY + t * 170;
    const amp = 270 - t * 110;
    const pts = ridge(r, baseY, amp, 0.58, 129);
    const col = mix(mix(p.rock, [70, 84, 112], 0.4), mix(p.haze, p.rock, 0.5), t * 0.55 - 0.1 + 0.1);
    const d = poly(pts);
    out += `<path d="${d}" fill="${rgb(col)}"/>`;
    out += `<clipPath id="cl${i}"><path d="${d}"/></clipPath>`;
    out += `<path d="${poly([[-120, pts[0][1] + 16], [-60, pts[0][1] + 16], ...pts.map(([x, y]) => [x + 46, y + 16])])}" fill="rgba(12,24,48,0.24)" clip-path="url(#cl${i})"/>`;
    if (snow && i < count - 1) {
      const sl = snowLine - i * 20;
      const top = pts, bottom = pts.map(([x, y]) => {
        const depth = Math.max(0, (sl - y) * (0.35 + r() * 0.35));
        return [x, y + Math.min(depth, 110)];
      });
      const sd = "M" + top.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L") + " L" + bottom.slice().reverse().map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L") + " Z";
      out += `<path d="${sd}" fill="rgba(255,255,255,0.95)" clip-path="url(#cl${i})"/>`;
    }
    out += `<rect x="0" y="${baseY + 40}" width="${W}" height="${H}" fill="url(#hz)" opacity="${(0.3 - t * 0.2).toFixed(2)}" clip-path="url(#cl${i})"/>`;
  }
  return out;
}

function yurt(x, y, s) {
  return `<g transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="0" cy="2" rx="62" ry="7" fill="rgba(0,0,0,0.2)"/>
    <rect x="-50" y="-34" width="100" height="34" fill="#f4efe4"/>
    <path d="M-56,-34 Q0,-96 56,-34 Z" fill="#fbf8f0"/>
    <path d="M-56,-34 Q0,-96 56,-34" fill="none" stroke="#c9302c" stroke-width="3"/>
    <path d="M-50,-18 H50" stroke="#2f7d5b" stroke-width="3"/>
    <circle cx="0" cy="-74" r="6" fill="#d7ccb4"/>
    <rect x="-9" y="-28" width="18" height="28" rx="2" fill="#6b3b24"/>
  </g>`;
}

function pines(r, n, y0, y1, p) {
  let o = "";
  for (let i = 0; i < n; i++) {
    const x = r() * W, y = y0 + r() * (y1 - y0), s = 0.6 + ((y - y0) / (y1 - y0)) * 1.3;
    const g = mix([20, 62, 46], [10, 36, 30], r());
    o += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) scale(${s.toFixed(2)})">
      <rect x="-2" y="-6" width="4" height="10" fill="#3b2a1e"/>
      <path d="M0,-86 L20,-44 H9 L28,-14 H-28 L-9,-44 H-20 Z" fill="${rgb(g)}"/></g>`;
  }
  return o;
}

function scene(kind, seed, palKey) {
  const r = rng(seed), p = PAL[palKey];
  const horizon = kind === "lake" ? 470 : 520;
  let body = "";
  body += `<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${rgb(p.top)}"/><stop offset="1" stop-color="${rgb(p.bot)}"/></linearGradient>
    <radialGradient id="sun" cx="${(0.2 + r() * 0.6).toFixed(2)}" cy="0.28" r="0.5"><stop offset="0" stop-color="${rgb(p.sun)}" stop-opacity="0.95"/><stop offset="0.35" stop-color="${rgb(p.sun)}" stop-opacity="0.25"/><stop offset="1" stop-color="${rgb(p.sun)}" stop-opacity="0"/></radialGradient>
    <linearGradient id="hz" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${rgb(p.haze)}" stop-opacity="0"/><stop offset="1" stop-color="${rgb(p.haze)}" stop-opacity="1"/></linearGradient>
    <filter id="blur" x="-30%" y="-100%" width="160%" height="300%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="soft"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed % 97}"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.07"/></feComponentTransfer></filter>
    <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.35"/></radialGradient>
  </defs>`;
  body += `<rect width="${W}" height="${H}" fill="url(#sky)"/><rect width="${W}" height="${H}" fill="url(#sun)"/>`;
  for (let i = 0; i < 6; i++) {
    const cx = r() * W, cy = 60 + r() * 200, rx = 90 + r() * 170;
    body += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * 0.16}" fill="rgba(255,255,255,0.55)" filter="url(#blur)"/>`;
  }

  const snowy = kind !== "canyon" && kind !== "steppe";
  const topY = kind === "canyon" ? 330 : kind === "winter" ? 210 : 250;
  body += mountains(r, p, { count: 4, topY, snow: snowy, snowLine: kind === "winter" ? 520 : 380 });
  body += `<rect x="0" y="${horizon - 110}" width="${W}" height="150" fill="url(#hz)" opacity="0.55"/>`;

  if (kind === "lake") {
    body += `<rect x="0" y="${horizon}" width="${W}" height="${H - horizon}" fill="${rgb(p.lake)}"/>`;
    body += `<rect x="0" y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#sky)" opacity="0.38"/>`;
    for (let i = 0; i < 38; i++) {
      const y = horizon + 8 + r() * (H - horizon - 20), w = 40 + r() * 220, x = r() * W;
      body += `<rect x="${x}" y="${y}" width="${w}" height="${1 + r() * 2.5}" rx="1" fill="rgba(255,255,255,${(0.1 + r() * 0.22).toFixed(2)})"/>`;
    }
    const shore = ridge(r, horizon + 6, 30, 0.5);
    body += `<path d="${poly(shore, horizon + 40)}" fill="#47663f"/>`;
    const fg = ridge(r, 690, 70, 0.5);
    body += `<path d="${poly(fg)}" fill="#3a5a36"/>` + `<path d="${poly(ridge(r, 745, 40, 0.5))}" fill="#2c4a2c"/>`;
    body += pines(r, 12, 712, 775, p);
  } else if (kind === "steppe") {
    body += `<rect x="0" y="560" width="${W}" height="${H}" fill="#6e9a4e"/>`;
    const hills = [ridge(r, 540, 70, 0.5), ridge(r, 620, 80, 0.5), ridge(r, 710, 60, 0.5)];
    const cols = [[112, 150, 78], [88, 134, 64], [66, 112, 52]];
    hills.forEach((h, i) => (body += `<path d="${poly(h)}" fill="${rgb(cols[i])}"/>`));
    for (let i = 0; i < 70; i++) {
      const x = r() * W, y = 560 + r() * 230;
      body += `<ellipse cx="${x}" cy="${y}" rx="${2 + r() * 4}" ry="${1.5 + r() * 2}" fill="${r() > 0.5 ? "#f3d34a" : "#e9eef2"}" opacity="0.8"/>`;
    }
    body += yurt(300 + r() * 120, 640, 1.15) + yurt(620 + r() * 140, 668, 0.95) + yurt(900 + r() * 80, 625, 0.75);
    for (let i = 0; i < 14; i++) { const x = 150 + r() * 900, y = 700 + r() * 70; body += `<ellipse cx="${x}" cy="${y}" rx="9" ry="6" fill="#f5f2ea"/><circle cx="${x + 8}" cy="${y - 2}" r="3" fill="#2b2b2b"/>`; }
  } else if (kind === "canyon") {
    const layers = [[520, 70, [176, 86, 56]], [590, 80, [150, 64, 44]], [670, 70, [120, 52, 38]]];
    layers.forEach(([y, a, c], k) => {
      const pts = ridge(r, y, a * 1.6, 0.62, 65).map(([x, yy]) => [x, Math.round(yy / 14) * 14]);
      body += `<path d="${poly(pts)}" fill="${rgb(c)}"/>`;
      for (let j = 0; j < 7; j++) body += `<path d="${poly(pts.map(([x, yy]) => [x, yy + 14 + j * 16]))}" fill="none" stroke="rgba(255,210,170,${0.1 + k * 0.03})" stroke-width="2" clip-path="url(#none)"/>`;
    });
    body += `<path d="${poly(ridge(r, 745, 30, 0.5))}" fill="#6e5a3c"/>`;
    body += `<path d="M0,790 Q300,730 560,770 T1200,740 L1200,800 L0,800 Z" fill="#3f6c8a" opacity="0.8"/>`;
  } else if (kind === "winter") {
    body += `<path d="${poly(ridge(r, 600, 60, 0.5))}" fill="#e8f0f8"/>` + `<path d="${poly(ridge(r, 690, 50, 0.5))}" fill="#f6fafd"/>`;
    body += pines(r, 34, 560, 760, p).replace(/rgb\(\d+,\d+,\d+\)/g, "#2d4d46");
    for (let i = 0; i < 70; i++) body += `<circle cx="${r() * W}" cy="${r() * H}" r="${0.8 + r() * 2}" fill="#fff" opacity="${0.4 + r() * 0.5}"/>`;
  } else {
    // "peaks": Ala-Archa style — pine forest + river
    body += `<path d="${poly(ridge(r, 600, 80, 0.5))}" fill="#3d5f46"/>`;
    body += pines(r, 46, 560, 760, p);
    body += `<path d="M520,800 C560,720 640,690 700,640 C740,606 800,596 830,560 L880,560 C850,610 790,630 750,670 C700,720 640,760 620,800 Z" fill="#9ec8da" opacity="0.85"/>`;
  }

  body += `<rect width="${W}" height="${H}" fill="url(#vig)"/><rect width="${W}" height="${H}" filter="url(#grain)"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`;
}

const JOBS = [
  ["hero", "lake", 11, "clear"], ["cover", "peaks", 12, "day"],
  ["issyk-kul-1", "lake", 21, "clear"], ["issyk-kul-2", "peaks", 22, "day"], ["issyk-kul-3", "steppe", 23, "golden"],
  ["osh-1", "steppe", 31, "golden"], ["osh-2", "canyon", 32, "canyon"], ["osh-3", "lake", 33, "golden"],
  ["naryn-1", "steppe", 41, "day"], ["naryn-2", "lake", 42, "clear"], ["naryn-3", "peaks", 43, "golden"],
  ["ala-archa-1", "peaks", 51, "clear"], ["ala-archa-2", "peaks", 52, "day"], ["ala-archa-3", "lake", 53, "clear"],
  ["song-kol-1", "steppe", 61, "golden"], ["song-kol-2", "lake", 62, "golden"], ["song-kol-3", "steppe", 63, "day"],
  ["skazka-1", "canyon", 71, "canyon"], ["skazka-2", "canyon", 72, "golden"], ["skazka-3", "lake", 73, "day"],
  ["karakol-1", "winter", 81, "winter"], ["karakol-2", "winter", 82, "winter"], ["karakol-3", "peaks", 83, "winter"],
  ["arslanbob-1", "peaks", 91, "day"], ["arslanbob-2", "steppe", 92, "clear"], ["arslanbob-3", "peaks", 93, "golden"],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  for (const [name, kind, seed, pal] of JOBS) {
    await page.setContent(`<body style="margin:0">${scene(kind, seed, pal)}</body>`);
    await page.screenshot({ path: path.join(OUT, `${name}.jpg`), type: "jpeg", quality: 80 });
  }
  await browser.close();
  console.log("generated", JOBS.length, "images");
})();
