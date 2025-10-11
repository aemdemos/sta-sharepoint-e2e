/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the specified header row
  const headerRow = ['Columns (columns3)'];

  // Get the two main rows (top and bottom)
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  const tableRows = [];

  // Top row: left (text/list/button), right (image)
  if (rows.length > 0) {
    const topRow = rows[0];
    const topCols = Array.from(topRow.querySelectorAll(':scope > div'));
    // Left column: text, list, button
    const leftCol = topCols[0];
    const leftColContent = Array.from(leftCol.childNodes);
    // Right column: image
    const rightCol = topCols[1];
    const rightPicture = rightCol.querySelector('picture');
    tableRows.push([
      leftColContent,
      rightPicture || document.createElement('div')
    ]);
  }

  // Bottom row: left (image), right (text/button)
  if (rows.length > 1) {
    const bottomRow = rows[1];
    const bottomCols = Array.from(bottomRow.querySelectorAll(':scope > div'));
    // Left column: image
    const leftCol = bottomCols[0];
    const leftPicture = leftCol.querySelector('picture');
    // Right column: text/button
    const rightCol = bottomCols[1];
    const rightColContent = Array.from(rightCol.childNodes);
    tableRows.push([
      leftPicture || document.createElement('div'),
      rightColContent
    ]);
  }

  // Compose table
  const cells = [headerRow, ...tableRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
