/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all top-level rows (each row is a direct child <div> of the columns block)
  const rows = Array.from(columnsBlock.children);
  // Determine the maximum number of columns in any row (for correct header and shape)
  let maxCols = 0;
  rows.forEach(row => {
    const cols = Array.from(row.children);
    if (cols.length > maxCols) maxCols = cols.length;
  });
  // If no columns found, default to 1
  if (maxCols === 0) maxCols = 1;

  // Build the header row: single cell 'Columns', rest empty
  const headerRow = ['Columns'];
  while (headerRow.length < maxCols) headerRow.push('');

  const table = [headerRow];

  // For each row, build a cell array (columns)
  rows.forEach(row => {
    const cols = Array.from(row.children);
    // Ensure row has maxCols columns (fill missing with empty string)
    while (cols.length < maxCols) cols.push('');
    table.push(cols);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(table, document);
  // Replace the original element with the block
  element.replaceWith(block);
}
