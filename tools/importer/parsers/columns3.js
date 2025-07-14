/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block (should be the direct child)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all top-level rows
  const rows = Array.from(columnsBlock.children);
  if (rows.length === 0) return;

  // Build the cells array
  const cells = [];
  // Header row: Exactly one cell with 'Columns'
  cells.push(['Columns']);

  // For each row, push an array of columns (each cell is the DOM node for that column)
  rows.forEach(row => {
    const rowCols = Array.from(row.children);
    cells.push(rowCols);
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
