/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block child within the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Each direct child of columnsBlock is a row (div)
  const rows = Array.from(columnsBlock.children);
  if (rows.length === 0) return;

  // Get the number of columns from the first content row
  const firstRowCols = Array.from(rows[0].children);
  const columnCount = firstRowCols.length;

  // Compose the table rows
  const cells = [];
  // Header row as per guidelines (single cell)
  cells.push(['Columns']);
  // Add each content row (arrays of column elements)
  rows.forEach(row => {
    const cols = Array.from(row.children);
    // Pad, if necessary, to preserve column consistency
    while (cols.length < columnCount) {
      cols.push('');
    }
    cells.push(cols);
  });

  // Create the table with correct header (single th with colspan, handled by createTable)
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
