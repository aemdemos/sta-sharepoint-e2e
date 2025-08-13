/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matches example precisely
  const headerRow = ['Hero'];

  // 2nd row: Image (background image)
  let imgEl = null;
  // Find first <img> inside any <picture> within 'element'
  const pic = element.querySelector('picture');
  if (pic) {
    const img = pic.querySelector('img');
    if (img) {
      imgEl = img;
    }
  }

  // 3rd row: Headline and other text (h1, h2, h3, p, etc.)
  // The example only has a headline, so focus on h1 and paragraphs
  let contentEls = [];
  // Look for text content in the deepest wrapper
  let wrappers = [element];
  // Drill down to .hero-wrapper > .hero.block > div > div
  if (element.querySelector('.hero.block')) {
    wrappers = element.querySelectorAll('.hero.block > div > div');
  }
  let foundContent = false;
  for (const wrap of wrappers) {
    // Only consider direct children
    Array.from(wrap.children).forEach(child => {
      // Ignore <picture> and its container <p>
      if (child.tagName.toLowerCase() === 'p' && child.querySelector('picture')) return;
      if (/^h[1-6]$/.test(child.tagName.toLowerCase()) || child.tagName.toLowerCase() === 'p') {
        if (child.textContent.trim()) {
          contentEls.push(child);
          foundContent = true;
        }
      }
    });
    if (foundContent) break;
  }
  // Fallback: if not found, look in all <h1>, <p> under element
  if (contentEls.length === 0) {
    const fallbackEls = element.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
    fallbackEls.forEach(el => {
      // Exclude anything inside <picture>
      if (!el.querySelector('picture') && el.textContent.trim()) {
        contentEls.push(el);
      }
    });
  }

  // Edge case: If no content found, leave cell blank
  const rowImage = [imgEl ? imgEl : ''];
  const rowContent = [contentEls.length ? contentEls : ''];

  // Compose the table (exactly 1 column, 3 rows)
  const rows = [headerRow, rowImage, rowContent];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
