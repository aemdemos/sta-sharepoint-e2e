/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must be exactly one column with 'Columns'
  const headerRow = ['Columns'];
  const rows = [headerRow];

  // Find all block rows (each visual row): direct children of the .block
  const blockRows = element.querySelectorAll(':scope > div');
  blockRows.forEach((blockRow) => {
    // Each block row contains N columns (each a direct child div)
    const columns = blockRow.querySelectorAll(':scope > div');
    const rowCells = [];
    // Each cell is the content of one visual column
    columns.forEach((col) => {
      rowCells.push(col);
    });
    // Only add if there is at least one column
    if (rowCells.length > 0) {
      rows.push(rowCells);
    }
  });

  // Create the table with the correct structure
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
