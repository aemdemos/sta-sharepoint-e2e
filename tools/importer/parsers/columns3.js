/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs in the columns block (these are the visible rows)
  const rowDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Find the max number of columns in any row
  let maxCols = 0;
  const rowCellsArr = rowDivs.map((rowDiv) => {
    const colDivs = Array.from(rowDiv.children);
    if (colDivs.length > maxCols) maxCols = colDivs.length;
    return colDivs;
  });

  // Header row: always a single cell with block name
  const headerRow = ['Columns'];

  // Add the real content rows
  const cells = [headerRow, ...rowCellsArr];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
