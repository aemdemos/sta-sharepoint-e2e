/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block content div
  let contentDiv = element.querySelector('.hero.block > div > div') || element.querySelector('.hero.block > div') || element;
  // Find the picture or image for the background
  let imageEl = contentDiv.querySelector('picture') || contentDiv.querySelector('img');

  // For the image row, use the picture (for all sources) if it exists, otherwise the img
  let imageRowContent = '';
  if (imageEl) {
    // Always prefer <picture> if available
    if (imageEl.tagName.toLowerCase() === 'picture') {
      imageRowContent = imageEl;
    } else {
      imageRowContent = imageEl;
    }
  }

  // For the body row: collect heading and text content (skip empty <p>)
  const contentCells = [];
  const children = Array.from(contentDiv.children);
  for (const child of children) {
    // Skip <picture> or <img> already used
    if (child === imageEl) continue;
    if (imageEl && imageEl.tagName.toLowerCase() === 'picture' && child.contains(imageEl)) continue;
    // Only include if not empty
    if (child.tagName.match(/^H[1-6]$/) || (child.tagName === 'P' && child.textContent.trim() !== '')) {
      contentCells.push(child);
    }
  }
  // If contentCells is empty, add an empty string so the cell exists
  const contentRow = [contentCells.length > 0 ? contentCells : ''];

  // Build the table structure: Header, Image Row, Content Row (1 col, 3 rows)
  const table = WebImporter.DOMUtils.createTable([
    ['Hero'],
    [imageRowContent],
    contentRow
  ], document);

  element.replaceWith(table);
}
