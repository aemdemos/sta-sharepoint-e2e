/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all top-level column rows (each row has two columns)
  const rows = Array.from(columnsBlock.children);
  if (rows.length === 0) return;

  // Determine number of columns from the first row
  const firstRow = rows[0];
  const numCols = Array.from(firstRow.children).length;

  // Build the table rows:
  // 1. Header row: a single column containing the block name
  // 2. For each HTML row, an array of cells, one for each column in that row
  const cells = [];
  cells.push(['Columns']); // header row is always a single cell
  rows.forEach((row) => {
    const cols = Array.from(row.children);
    // Pad with empty string if this row has less columns than header
    while (cols.length < numCols) cols.push('');
    cells.push(cols.slice(0, numCols));
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
