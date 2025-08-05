/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all rows (direct children of .columns.block)
  const columnRows = Array.from(columnsBlock.children);

  // Build the table cells
  const cells = [];

  // Header row: must be a single cell array
  cells.push(['Columns']);

  // For each row in the columns block
  for (const row of columnRows) {
    // Each row has columns as direct children
    const rowCols = Array.from(row.children);
    // Add the array of columns for this row (can be multiple columns per row)
    cells.push(rowCols);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}