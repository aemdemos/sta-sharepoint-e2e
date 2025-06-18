/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner columns block if the wrapper is passed
  let columnsBlock = element;
  if (!columnsBlock.classList.contains('columns')) {
    columnsBlock = element.querySelector('.columns.block');
  }
  if (!columnsBlock) return;

  // Get all direct column rows
  const rows = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (rows.length === 0) return;

  // The first row may have multiple divs (columns)
  // Determine the number of columns from the first row
  const firstRowCols = Array.from(rows[0].querySelectorAll(':scope > div'));
  const columnsCount = firstRowCols.length;

  // Create table structure: first row is the header
  const table = [];
  table.push(['Columns (columns3)']); // header as in the example

  // For each row, assemble the columns
  rows.forEach(row => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // If the row has the correct number of columns, use as columns
    if (cols.length === columnsCount) {
      table.push(cols);
    } else if (cols.length > 0) {
      // If partial, just add what is found. Pad with empty if needed
      while (cols.length < columnsCount) {
        cols.push(document.createTextNode(''));
      }
      table.push(cols);
    } else {
      // If no div children, treat the row as a single cell
      table.push([row]);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(blockTable);
}
