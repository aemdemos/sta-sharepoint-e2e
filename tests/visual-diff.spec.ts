import { test } from '@playwright/test';
import fs from 'fs';
import { PNG } from 'pngjs';

async function captureViewports(page, url, prefix, folder, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector('body');
  await page.waitForTimeout(1000);

  // Ensure the folder exists
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  // Generate a timestamp for filenames
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  let scrollY = 0;
  let index = 1;
  const files: string[] = [];

  while (scrollY < totalHeight) {
    const filename = `${folder}/viewport${index}-${timestamp}.png`;
    await page.screenshot({ path: filename, fullPage: false });
    files.push(filename);
    scrollY += viewport.height;
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(500);
    index++;
  }
  return files;
}

test('Scroll, screenshot, and compare viewports', async ({ page, browser }) => {
  const viewport = { width: 1280, height: 800 };

  // Capture viewports for first URL (prod -> source)
  const prodContext = await browser.newContext();
  const prodPage = await prodContext.newPage();
  const prodFiles = await captureViewports(prodPage, 'https://main--aem-boilerplate--adobe.aem.page', 'prod', 'source', viewport);

  // Capture viewports for second URL (staging -> sink)
  const stagingContext = await browser.newContext();
  const stagingPage = await stagingContext.newPage();
  const stagingFiles = await captureViewports(stagingPage, 'https://main--sta-aem-boilerplate--aemdemos.aem.page', 'staging', 'sink', viewport);

  // Compare corresponding viewports
  const pixelmatch = (await import('pixelmatch')).default;
  const minLen = Math.min(prodFiles.length, stagingFiles.length);

  // Ensure the differences folder exists
  const diffFolder = 'differences';
  if (!fs.existsSync(diffFolder)) {
    fs.mkdirSync(diffFolder, { recursive: true });
  }

  // Generate a timestamp for diff filenames
  const diffTimestamp = new Date().toISOString().replace(/[:.]/g, '-');

  for (let i = 0; i < minLen; i++) {
    const img1 = PNG.sync.read(fs.readFileSync(prodFiles[i]));
    const img2 = PNG.sync.read(fs.readFileSync(stagingFiles[i]));

    if (img1.width !== img2.width || img1.height !== img2.height) {
      console.log(`Viewport ${i + 1}: Screenshot sizes do not match!`);
      continue;
    }

    const diff = new PNG({ width: img1.width, height: img1.height });
    const numDiffPixels = pixelmatch(
      img1.data, img2.data, diff.data,
      img1.width, img1.height,
      { threshold: 0.8 }
    );
    const diffFile = `${diffFolder}/diff-viewport${i + 1}-${diffTimestamp}.png`;
    fs.writeFileSync(diffFile, PNG.sync.write(diff));
    console.log(`Viewport ${i + 1}: Pixels different: ${numDiffPixels} (see ${diffFile})`);
  }
});
