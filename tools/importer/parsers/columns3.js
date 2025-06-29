/* global WebImporter */
export default function parse(element, { document }) {
  // Find all top-level rows (each row is a flex row in the columns block)
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  if (rows.length === 0) return;
  // Determine the max number of columns in any row
  let maxCols = 0;
  const rowCells = [];
  rows.forEach(row => {
    const cols = Array.from(row.children);
    maxCols = Math.max(maxCols, cols.length);
    rowCells.push(cols);
  });
  // Build header: a single cell containing 'Columns'
  const headerRow = ['Columns'];
  // Compose final table data
  const table = [headerRow, ...rowCells];
  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(table, document);
  // The createTable implementation will use a single header cell, so it will match the example structure
  element.replaceWith(blockTable);
}
