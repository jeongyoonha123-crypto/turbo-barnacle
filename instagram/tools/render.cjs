// 카드뉴스 HTML에서 body 바로 아래의 .card(또는 예전 형식의 .slide)를 한 장씩 1080×1350 PNG로 저장한다.
// 사용법: FONT_CSS=/경로/fonts.css node instagram/tools/render.cjs <slides.html> [출력 폴더]
// FONT_CSS는 Noto Sans KR / Noto Serif KR을 로컬 파일로 선언한 CSS (fetch-fonts.sh로 만든다).
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const html = path.resolve(process.argv[2]);
  const outDir = path.resolve(process.argv[3] || path.dirname(html));
  const fontCss = process.env.FONT_CSS ? path.resolve(process.env.FONT_CSS) : null;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  // 렌더링 환경에서는 웹폰트 요청을 막고 로컬 폰트를 쓴다.
  await page.route(/fonts\.(googleapis|gstatic)\.com/, route => route.abort());
  await page.goto('file://' + html);
  if (fontCss) await page.addStyleTag({ url: 'file://' + fontCss });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);

  // 장은 body 바로 아래 요소만 센다 (장 안에 .card 상자를 쓴 게시물이 있다).
  const slides = await page.$$('body > .card, body > .slide');
  for (let i = 0; i < slides.length; i++) {
    const file = path.join(outDir, `slide-${String(i + 1).padStart(2, '0')}.png`);
    await slides[i].screenshot({ path: file });
    console.log(file);
  }
  await browser.close();
})();
