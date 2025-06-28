/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside the wrapper
  const columnsBlock = element.querySelector(':scope > .columns.block');
  if (!columnsBlock) return;

  // Select all direct column rows
  const rows = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (rows.length === 0) return;

  // Determine maximum number of columns in any row
  let maxCols = 0;
  rows.forEach(row => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    if (cols.length > maxCols) maxCols = cols.length;
  });
  if (maxCols < 1) return;

  // Prepare block table: header is a single cell, then one row per block row, each cell is the corresponding col div
  const table = [];
  table.push(['Columns']); // Header must be exactly 'Columns' and only one cell

  rows.forEach(row => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // If not enough columns, pad with empty strings
    const cellRow = cols.map(col => col);
    while (cellRow.length < maxCols) cellRow.push('');
    table.push(cellRow);
  });

  const blockTable = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(blockTable);
}
