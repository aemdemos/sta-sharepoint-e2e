/* global WebImporter */
export default function parse(element, { document }) {
  // Block header: must match example exactly
  const headerRow = ['Hero'];

  // Find the element that contains the main hero content
  let heroBlock = element.querySelector('.hero.block');
  let contentDiv;
  if (heroBlock) {
    // In the markup: .hero.block > div > div contains picture and headings/paragraphs
    const innerDiv = heroBlock.querySelector('div');
    contentDiv = innerDiv ? innerDiv.querySelector('div') : null;
  }

  // Extract the picture (if present)
  let pictureEl = null;
  if (contentDiv) {
    pictureEl = contentDiv.querySelector('picture');
  }

  // Image row: image or empty string if not found
  const imageRow = [pictureEl ? pictureEl : ''];

  // For content (headings, paragraphs, CTAs):
  // We take all children except for the <picture> and empty paragraphs
  let contentCells = [];
  if (contentDiv) {
    Array.from(contentDiv.children).forEach(child => {
      // Exclude the picture (already used) and empty paragraphs
      if (child.tagName.toLowerCase() === 'picture') return;
      if (child.tagName.toLowerCase() === 'p' && child.textContent.trim() === '') return;
      contentCells.push(child);
    });
  }
  // If nothing found, content row is empty string
  if (contentCells.length === 0) {
    contentCells = [''];
  }

  // Block table structure: header, image, then content (all in one column)
  const cells = [
    headerRow,
    imageRow,
    [contentCells.length === 1 ? contentCells[0] : contentCells]
  ];

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
