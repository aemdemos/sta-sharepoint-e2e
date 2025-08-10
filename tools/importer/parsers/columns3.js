/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block element inside the wrapper
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Get all direct row children (these are the rows of columns)
  const blockRows = Array.from(block.children);
  if (blockRows.length === 0) {
    // No content, just header
    const table = WebImporter.DOMUtils.createTable([['Columns']], document);
    element.replaceWith(table);
    return;
  }

  // Determine number of columns in the first content row (to set for the header row)
  let maxCols = 1;
  for (const row of blockRows) {
    const cols = Array.from(row.children).length;
    if (cols > maxCols) maxCols = cols;
  }

  // Header row: single cell with block name
  const headerRow = ['Columns'];

  // Content rows: each row is an array of its column elements
  const tableRows = blockRows.map(row => {
    const cols = Array.from(row.children);
    return cols.length > 0 ? cols : [row];
  });

  // Create the table using the helper
  const table = WebImporter.DOMUtils.createTable([headerRow, ...tableRows], document);

  // After table creation, set the header cell's colspan to match number of columns
  const th = table.querySelector('th');
  if (th && maxCols > 1) {
    th.setAttribute('colspan', maxCols);
  }

  // Replace the original element with the table
  element.replaceWith(table);
}
