/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block within the wrapper
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Get all rows (direct children of .columns.block)
  const rows = Array.from(block.children).filter(
    (row) => row.nodeType === 1 && row.tagName === 'DIV'
  );

  // Header should be a single cell: ['Columns']
  const tableRows = [['Columns']];

  // For each row in the columns block
  rows.forEach((row) => {
    // Get all direct columns (DIVs)
    const cols = Array.from(row.children).filter(
      (col) => col.nodeType === 1 && col.tagName === 'DIV'
    );
    // If there are no inner DIVs, treat the row as a single-column row
    let rowCells;
    if (cols.length > 0) {
      rowCells = cols;
    } else {
      rowCells = [row];
    }
    // Only add multi-column rows (rows with more than one col) or rows that are not header
    tableRows.push(rowCells);
  });

  // Create the columns table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace original element
  element.replaceWith(table);
}
