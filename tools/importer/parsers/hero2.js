/* global WebImporter */
export default function parse(element, { document }) {
  // Get the deepest content div inside the hero block
  let contentDiv = element.querySelector('.hero.block > div > div');
  if (!contentDiv) {
    // fallback for possible variations
    contentDiv = element.querySelector('.hero.block > div');
  }
  // Row 2: extract the image (prefer picture, fallback to img)
  let imageEl = contentDiv ? (contentDiv.querySelector('picture') || contentDiv.querySelector('img')) : null;
  // Row 3: extract all block-level content after image (headings, paragraphs, etc)
  let contentEls = [];
  if (contentDiv) {
    // Find all children
    const children = Array.from(contentDiv.children);
    for (const child of children) {
      // ignore element if it is/contains the image
      if (imageEl && (child === imageEl.parentElement || child === imageEl)) continue;
      // If it's empty <p>, skip
      if (child.tagName === 'P' && !child.textContent.trim() && !child.querySelector('img, picture, source')) continue;
      // If it's not just whitespace, keep
      contentEls.push(child);
    }
  }
  // Table rows
  const rows = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [contentEls.length > 0 ? contentEls : '']
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
