/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get each row (each top-level <div> child of columnsBlock)
  const rows = Array.from(columnsBlock.children).filter(row => row.tagName === 'DIV');
  if (rows.length === 0) return;

  // For each row, get the columns (immediate children)
  const tableRows = rows.map(row => {
    // The columns are immediate <div> children
    const columns = Array.from(row.children).filter(col => col.tagName === 'DIV');
    // If columns were not found, maybe the row is a single cell (edge case)
    return columns.length > 0 ? columns : [row];
  });

  // Header row: exactly one cell, per example
  const headerRow = ['Columns'];

  // Build the cells array: headerRow + tableRows
  const cells = [headerRow, ...tableRows];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
