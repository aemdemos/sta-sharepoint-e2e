/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: always block name EXACTLY as required
  const headerRow = ['Hero (hero2)'];

  // 2. Find the background image (first <img> in the block)
  const imageEl = element.querySelector('img');

  // 3. Find the main heading (first <h1>, <h2>, or <h3>)
  const headingEl = element.querySelector('h1, h2, h3');

  // 4. Find subheading and CTA (not present in this example, but future-proof)
  // We'll collect all elements after the heading, if any
  let contentEls = [];
  if (headingEl) {
    let sibling = headingEl.nextElementSibling;
    while (sibling) {
      // Only add non-empty elements
      if (sibling.textContent.trim() || sibling.querySelector('a, button')) {
        contentEls.push(sibling);
      }
      sibling = sibling.nextElementSibling;
    }
  }

  // 5. Build table rows
  // Row 2: background image (reference the actual element, not a new one)
  // Row 3: heading (and any additional content)
  const rows = [
    headerRow,
    [imageEl || ''],
    [headingEl ? [headingEl, ...contentEls] : contentEls.length > 0 ? contentEls : '']
  ];

  // 6. Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
