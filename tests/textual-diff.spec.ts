import { test, expect } from '@playwright/test';
import { diffLines } from 'diff';

test('Compare visible text content between two URLs', async ({ page }) => {
  const url1 = 'https://main--aem-boilerplate--adobe.aem.page';
  const url2 = 'https://main--sta-aem-boilerplate--aemdemos.aem.page';

  // Go to first URL and extract text
  await page.goto(url1, { waitUntil: 'networkidle' });
  await page.waitForSelector('body');
  const text1 = await page.locator('body').innerText();

  // Go to second URL and extract text
  await page.goto(url2, { waitUntil: 'networkidle' });
  await page.waitForSelector('body');
  const text2 = await page.locator('body').innerText();

  // Compare text directly
  if (text1 !== text2) {
    const diff = diffLines(text1, text2);
    console.log('--- Text from URL 1 ---');
    console.log(text1);
    console.log('--- Text from URL 2 ---');
    console.log(text2);
    console.log('--- Diff ---');
    diff.forEach(part => {
      const color = part.added ? '\x1b[32m' : part.removed ? '\x1b[31m' : '\x1b[0m';
      process.stdout.write(color + part.value + '\x1b[0m');
    });
    console.log();
    throw new Error('Text content does not match between the two URLs.');
  }
});
