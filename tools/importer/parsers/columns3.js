/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const block = element.querySelector('.columns.block');
  // Get all direct child <div>s of the block (these are rows)
  const rowDivs = Array.from(block.querySelectorAll(':scope > div'));

  const table = [];
  // Header row: exactly one cell as in the example
  table.push(['Columns (columns3)']);

  // For each row, extract exactly the direct columns as cells
  rowDivs.forEach(rowDiv => {
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // If there are columns, use as columns
    if (colDivs.length > 0) {
      table.push(colDivs);
    } else {
      // If just a single cell for the row, make it one cell
      table.push([rowDiv]);
    }
  });

  // Create and replace
  const blockTable = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(blockTable);
}
