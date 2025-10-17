/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns (columns3)'];

  // Helper to get immediate children divs
  const getDirectDivs = (el) => Array.from(el.children).filter(child => child.tagName === 'DIV');

  // Get all direct children of the columns block
  const rows = getDirectDivs(element);

  // Build the table rows as a 2x2 grid
  const tableRows = [headerRow];

  if (rows.length === 2) {
    // First row: left is text/button, right is image
    const firstRowCols = getDirectDivs(rows[0]);
    if (firstRowCols.length === 2) {
      // Top left: all content from firstRowCols[0] as a single cell
      const topLeft = document.createElement('div');
      topLeft.innerHTML = firstRowCols[0].innerHTML;
      // Top right: all content from firstRowCols[1] as a single cell
      const topRight = document.createElement('div');
      topRight.innerHTML = firstRowCols[1].innerHTML;
      tableRows.push([
        topLeft,
        topRight,
      ]);
    }
    // Second row: left is image, right is text/button
    const secondRowCols = getDirectDivs(rows[1]);
    if (secondRowCols.length === 2) {
      const bottomLeft = document.createElement('div');
      bottomLeft.innerHTML = secondRowCols[0].innerHTML;
      const bottomRight = document.createElement('div');
      bottomRight.innerHTML = secondRowCols[1].innerHTML;
      tableRows.push([
        bottomLeft,
        bottomRight,
      ]);
    }
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
