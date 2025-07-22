/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const block = element.querySelector('.block.columns');
  if (!block) return;

  // Get all rows: direct child divs of the columns block
  const rows = Array.from(block.children);
  if (rows.length === 0) return;

  // Figure out the number of columns by checking the first row with children
  let numCols = 0;
  for (const row of rows) {
    const cols = Array.from(row.children);
    if (cols.length > numCols) numCols = cols.length;
  }
  if (numCols === 0) numCols = 1;

  // The header row: a single cell with 'Columns'
  const headerRow = ['Columns'];

  // For each row, get its immediate children as columns
  const tableRows = rows.map(row => {
    const cols = Array.from(row.children);
    if (cols.length === 0) return [row];
    return cols;
  });

  // If any rows have fewer columns than numCols, pad with empty string(s) for table consistency
  const normalizedRows = tableRows.map(cells => {
    if (cells.length < numCols) {
      return [...cells, ...Array(numCols - cells.length).fill('')];
    }
    return cells;
  });

  // Build the table data: header row (single cell), then all rows
  const tableData = [headerRow, ...normalizedRows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
