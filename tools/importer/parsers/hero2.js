/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Unwrap to get the main hero content container
  let main = element;
  // Unwrap .hero-wrapper
  const wrapper = main.querySelector(':scope > .hero-wrapper');
  if (wrapper) main = wrapper;
  // Unwrap .hero.block
  const heroBlock = main.querySelector(':scope > .hero.block');
  if (heroBlock) main = heroBlock;

  // Find the main inner content div (usually <div><div>...</div></div> inside hero block)
  let contentDiv = main.querySelector(':scope > div > div') || main.querySelector(':scope > div');
  if (!contentDiv) contentDiv = main;

  // 2. Find picture or image for background row (first cell, row 2)
  let imageEl = contentDiv.querySelector('picture') || contentDiv.querySelector('img');

  // 3. Collect heading, subheading, paragraph, CTA etc. for last row
  // We'll include all elements except the first <picture> or <img>
  let textEls = [];
  for (const child of contentDiv.children) {
    if (
      (imageEl && (child === imageEl || child.contains(imageEl))) ||
      (imageEl && child.tagName === 'P' && child.querySelector('picture'))
    ) {
      // skip image or parent <p> containing picture
      continue;
    }
    if (child.textContent.trim() !== '' || child.tagName.match(/^H[1-6]$/i)) {
      textEls.push(child);
    }
  }

  // If no textEls (possible with odd HTML), fallback: add all non-picture children
  if (textEls.length === 0) {
    for (const child of contentDiv.children) {
      if (!(child === imageEl || (imageEl && child.contains(imageEl)))) {
        textEls.push(child);
      }
    }
  }

  // 4. Compose the table in the expected format
  // Row 1: header
  // Row 2: image (or empty)
  // Row 3: text content (or empty)
  const rows = [];
  rows.push(['Hero']);
  rows.push([imageEl ? imageEl : '']);
  rows.push([textEls.length > 0 ? textEls : '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
