/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the hero block content. Structure is: section > hero-wrapper > hero.block > div > div
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) return;
  // Get the deepest div that contains the actual content
  let contentDiv = heroBlock;
  // Drill down to the innermost content div
  while (contentDiv && contentDiv.children.length === 1 && contentDiv.firstElementChild.tagName === 'DIV') {
    contentDiv = contentDiv.firstElementChild;
  }

  // 2. Find the picture (image) - usually inside a <p> at the top
  let imageRow = [''];
  let contentRows = [];
  Array.from(contentDiv.children).forEach(child => {
    // If this is a <p> containing a <picture>, treat this as image row
    if (child.tagName === 'P' && child.querySelector('picture')) {
      imageRow = [child.querySelector('picture')];
    } else if (
      // If it's an empty <p> (e.g. <p></p>), skip
      !(child.tagName === 'P' && !child.textContent.trim() && !child.querySelector('*'))
    ) {
      contentRows.push(child);
    }
  });

  // 3. Prepare block table structure: 1 column, 3 rows
  // First row: Header
  const table = [['Hero']];
  // Second row: Image (or blank)
  table.push(imageRow);
  // Third row: All other content elements (as array)
  if (contentRows.length > 0) {
    table.push([contentRows]);
  } else {
    table.push(['']);
  }

  // 4. Create and replace
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
