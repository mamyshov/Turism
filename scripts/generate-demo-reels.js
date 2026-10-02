// One-off generator for the demo reels in public/videos/demo (9:16 WebM, ~6s).
// Needs Playwright: NODE_PATH=<global node_modules> node scripts/generate-demo-reels.js
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");
const { scene } = require("./generate-demo-art");

const OUT = path.join(__dirname, "..", "public", "videos", "demo");
const REELS = [
  ["reel-1", "steppe", 301, "golden", 1],
  ["reel-2", "peaks", 302, "clear", -1],
  ["reel-3", "canyon", 303, "canyon", 1],
  ["reel-4", "winter", 304, "winter", -1],
  ["reel-5", "lake", 305, "clear", 1],
  ["reel-6", "steppe", 306, "day", -1],
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const tmp = fs.mkdtempSync(path.join(require("os").tmpdir(), "reels-"));
  const browser = await chromium.launch({ args: ["--no-sandbox"] });
  for (const [name, kind, seed, pal, dir] of REELS) {
    const svg = Buffer.from(scene(kind, seed, pal)).toString("base64");
    const ctx = await browser.newContext({
      viewport: { width: 540, height: 960 },
      recordVideo: { dir: tmp, size: { width: 540, height: 960 } },
    });
    const page = await ctx.newPage();
    await page.setContent(`<style>
      html,body{margin:0;overflow:hidden;background:#000}
      .bg{position:absolute;inset:0;width:100%;height:100%;overflow:hidden}
      .bg div{position:absolute;top:-4%;left:-60%;width:220%;height:108%;
        background:url(data:image/svg+xml;base64,${svg}) center/cover;
        animation:pan 6s ease-in-out forwards}
      @keyframes pan{from{transform:translateX(${dir * -6}%) scale(1.08)}to{transform:translateX(${dir * 6}%) scale(1.22)}}
    </style><div class="bg"><div></div></div>`);
    await page.waitForTimeout(6200);
    const video = page.video();
    await ctx.close();
    fs.copyFileSync(await video.path(), path.join(OUT, `${name}.webm`));
  }
  await browser.close();
  console.log("generated", REELS.length, "reels");
})();
