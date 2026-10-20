// 움직이는 릴스 HTML(#stage + window.render(t))을 프레임 PNG로 찍고 ffmpeg로 mp4를 만든다.
// 사용법: FONT_CSS=/경로/fonts.css node instagram/tools/render-reel.cjs <reel.html> <초> [출력 mp4] [커버 시각(초)]
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

(async () => {
  const html = path.resolve(process.argv[2]);
  const secs = parseFloat(process.argv[3]);
  const out = path.resolve(process.argv[4] || path.join(path.dirname(html), 'reel.mp4'));
  const coverAt = process.argv[5] !== undefined ? parseFloat(process.argv[5]) : null;
  const fps = 30;
  const frames = fs.mkdtempSync(path.join(require('os').tmpdir(), 'reel-'));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  await page.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await page.goto('file://' + html);
  if (process.env.FONT_CSS) await page.addStyleTag({ url: 'file://' + path.resolve(process.env.FONT_CSS) });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const stage = await page.$('#stage');
  const n = Math.round(secs * fps);
  for (let i = 0; i < n; i++) {
    await page.evaluate(t => window.render(t), i / fps);
    await stage.screenshot({ path: path.join(frames, `f${String(i).padStart(5, '0')}.png`) });
  }
  if (coverAt !== null) {
    await page.evaluate(t => window.render(t), coverAt);
    await stage.screenshot({ path: path.join(path.dirname(out), 'cover.png') });
  }
  await browser.close();
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(fps), '-i', path.join(frames, 'f%05d.png'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
  fs.rmSync(frames, { recursive: true, force: true });
  console.log(out);
})();
