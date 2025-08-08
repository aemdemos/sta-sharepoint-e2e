/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero.block inside the element
  const heroBlock = element.querySelector('.hero.block');

  // Defensive: fallback to element if not found
  const blockRoot = heroBlock || element;

  // Get deepest content container inside the block
  // Common structure: <div><div><p><picture>...</picture></p><h1>...</h1></div></div>
  let contentContainer = blockRoot;
  // Look for a single chain of divs inside blockRoot
  while (
    contentContainer.children.length === 1 &&
    contentContainer.children[0].tagName === 'DIV'
  ) {
    contentContainer = contentContainer.children[0];
  }

  // Find picture or img
  let imageEl = null;
  // Accept either <picture> or <img>
  const pictureEl = contentContainer.querySelector('picture');
  if (pictureEl) {
    imageEl = pictureEl;
  } else {
    imageEl = contentContainer.querySelector('img');
  }

  // Collect all headings (h1-h6) and non-empty paragraphs
  const contentEls = [];
  Array.from(contentContainer.children).forEach(child => {
    // Skip picture and wrapping p if picture is inside p
    if (child === pictureEl) return;
    if (pictureEl && child.tagName === 'P' && child.contains(pictureEl)) return;
    // Accept headings
    if (/^H[1-6]$/.test(child.tagName)) {
      contentEls.push(child);
      return;
    }
    // Accept non-empty paragraphs (skip empty/spacing only)
    if (child.tagName === 'P' && child.textContent.trim() !== '') {
      contentEls.push(child);
      return;
    }
  });

  // Table header row
  const headerRow = ['Hero'];
  // Table row 2: image (if present)
  const imageRow = [imageEl ? imageEl : ''];
  // Table row 3: text content (all collected elements)
  let contentRow;
  if (contentEls.length === 0) {
    contentRow = [''];
  } else if (contentEls.length === 1) {
    contentRow = [contentEls[0]];
  } else {
    contentRow = [contentEls];
  }

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // Replace the original block element
  element.replaceWith(table);
}
