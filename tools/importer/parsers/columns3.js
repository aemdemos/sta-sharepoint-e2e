/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all row divs (direct children of columns block)
  const rowDivs = Array.from(columnsBlock.children).filter(node => node.nodeType === 1);

  // Determine the max number of columns in any row
  let maxColumns = 0;
  const rowColumns = rowDivs.map(rowDiv => {
    const cols = Array.from(rowDiv.children).filter(node => node.nodeType === 1);
    maxColumns = Math.max(maxColumns, cols.length);
    return cols;
  });

  // Compose the header row as a single cell, as in the example
  const table = [ ['Columns'] ];

  // Add each row; fill missing columns with empty string to align columns
  rowColumns.forEach(cols => {
    const cells = [];
    for (let i = 0; i < maxColumns; i++) {
      cells.push(cols[i] || '');
    }
    table.push(cells);
  });

  // Create the table
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
