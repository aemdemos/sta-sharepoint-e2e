/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main '.columns.block' within the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all direct row divs (children of .columns.block)
  const rows = Array.from(columnsBlock.children);
  if (rows.length === 0) return;

  // The column structure is determined by the first row - how many direct child divs
  const firstRowCols = Array.from(rows[0].children);
  const columnsCount = firstRowCols.length;

  // Header row: must be a single cell with 'Columns'
  const table = [['Columns']];

  // For each row, push an array of its direct column <div>s
  rows.forEach(row => {
    const cols = Array.from(row.children);
    // If this row has fewer cells than the column count (shouldn't happen in this block, but to be robust),
    // fill with empty strings
    while (cols.length < columnsCount) {
      cols.push(document.createTextNode(''));
    }
    table.push(cols);
  });

  // Create the table block and replace
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
