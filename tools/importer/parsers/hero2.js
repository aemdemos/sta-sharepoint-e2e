/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner hero block, or use the first top-level div that contains the block
  let blockDiv = element;
  // Sometimes extra wrappers, so find the deepest hero block
  let heroBlock = blockDiv.querySelector('.hero.block');
  if (heroBlock) {
    blockDiv = heroBlock;
  }

  // Find the innermost content container (usually a div inside .hero.block)
  let mainBlockDiv = blockDiv.querySelector('div');
  if (!mainBlockDiv) mainBlockDiv = blockDiv;

  // Find the first picture/img for the image row
  let pictureEl = mainBlockDiv.querySelector('picture');
  let imgEl = pictureEl ? pictureEl.querySelector('img') : mainBlockDiv.querySelector('img');

  // Prepare the image row content (prefer picture element if present)
  let imageCell = '';
  if (pictureEl) {
    imageCell = pictureEl;
  } else if (imgEl) {
    imageCell = imgEl;
  } else {
    imageCell = '';
  }

  // Prepare content for the last row: headings, paragraphs, etc.
  // Only after the image element in source order
  let foundPicture = false;
  let contentEls = [];
  for (const child of mainBlockDiv.children) {
    if (!foundPicture) {
      if (child.tagName === 'PICTURE' || (child.querySelector && child.querySelector('picture'))) {
        foundPicture = true;
      }
      continue;
    }
    // Only add nodes that have relevant content (headings, non-empty paragraphs, etc)
    if (
      child.matches('h1,h2,h3,h4,h5,h6') ||
      (child.matches('p') && child.textContent.trim())
    ) {
      contentEls.push(child);
    }
  }

  // Edge case: if image is not present, just gather all content (might be rare)
  if (!pictureEl && contentEls.length === 0) {
    // Fallback: include all headings/paragraphs
    for (const child of mainBlockDiv.children) {
      if (
        child.matches('h1,h2,h3,h4,h5,h6') ||
        (child.matches('p') && child.textContent.trim())
      ) {
        contentEls.push(child);
      }
    }
  }

  // If still no content, add empty string
  if (contentEls.length === 0) {
    contentEls = [''];
  }

  // Build the hero block table: 1 column, 3 rows
  // 1st row: Header exactly 'Hero'
  // 2nd row: Image (or empty)
  // 3rd row: Content (heading, paragraph, etc)
  const tableRows = [
    ['Hero'],
    [imageCell],
    [contentEls]
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
