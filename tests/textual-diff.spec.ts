import { test } from '@playwright/test';
import fs from 'fs';
import { diffLines } from 'diff';

function getStructuredDiff(text1: string, text2: string) {
  const diff = diffLines(text1, text2);
  let lineNum1 = 1, lineNum2 = 1;
  let output = '';
  diff.forEach(part => {
    const lines = part.value.split('\n');
    lines.forEach((line, idx) => {
      if (line === '' && idx === lines.length - 1) return; // skip trailing empty
      if (part.added) {
        output += `+ [${lineNum2}] ${line}\n`;
        lineNum2++;
      } else if (part.removed) {
        output += `- [${lineNum1}] ${line}\n`;
        lineNum1++;
      } else {
        output += `  [${lineNum1}|${lineNum2}] ${line}\n`;
        lineNum1++;
        lineNum2++;
      }
    });
  });
  return output;
}

test('Compare visible text content between two URLs', async ({ page }) => {
  const url1 = 'https://main--aem-boilerplate--adobe.aem.page';
  const url2 = 'https://main--sta-aem-boilerplate--aemdemos.aem.page';

  await page.goto(url1, { waitUntil: 'networkidle' });
  await page.waitForSelector('body');
  const text1 = await page.locator('body').innerText();

  await page.goto(url2, { waitUntil: 'networkidle' });
  await page.waitForSelector('body');
  const text2 = await page.locator('body').innerText();

  if (text1 !== text2) {
    const diffOutput = '```diff\n' + getStructuredDiff(text1, text2) + '```';
    const diffFile = 'textual-diff.md';
    fs.writeFileSync(diffFile, diffOutput, 'utf-8');
    console.log(`--- Structured Diff written to ${diffFile} ---`);
    throw new Error('Text content does not match between the two URLs.');
  }
});
