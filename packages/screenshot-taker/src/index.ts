// @ts-ignore
import { chromium } from 'playwright';

(async () => {
  let browser = await chromium.launch();

  let page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 1080 });
  await page.goto('https://nytimes.com');
  await page.screenshot({ path: `nyt-playwright-chromium.png` });
  await browser.close();
})();
