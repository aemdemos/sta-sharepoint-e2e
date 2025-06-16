/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block (it may be the element itself if not wrapped)
  let colsBlock = element;
  if (!element.classList.contains('columns')) {
    colsBlock = element.querySelector('.columns.block') || element;
  }
  if (!colsBlock) return;

  // Get all direct row divs under columns block
  const rows = Array.from(colsBlock.children);
  if (!rows.length) return;

  // Compose the header row (as in the example: 'Columns (columns3)')
  const headerRow = ['Columns (columns3)'];
  const tableRows = [headerRow];

  // For each row, collect its immediate children as columns
  rows.forEach(row => {
    // Defensive: only process elements
    const cols = Array.from(row.children).filter(e => e.nodeType === 1);
    // If a row is missing columns, fill with empty string to maintain cell count
    // Only pad if at least one row has more columns than others
    tableRows.push(cols);
  });

  // Make all rows same number of columns as the widest row (for block consistency)
  const maxCols = tableRows.slice(1).reduce((n, row) => Math.max(n, row.length), 0);
  for (let i = 1; i < tableRows.length; i++) {
    while (tableRows[i].length < maxCols) {
      tableRows[i].push('');
    }
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
