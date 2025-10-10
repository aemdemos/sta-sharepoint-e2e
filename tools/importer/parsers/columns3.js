/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as header
  const headerRow = ['Columns (columns3)'];

  // Find the main block container (with columns)
  const block = element.querySelector('.columns.block');
  const tableRows = [];

  // Defensive: get all immediate children of the block (each represents a row)
  const rows = Array.from(block.children);
  for (const row of rows) {
    // Each row should have two columns
    const cols = Array.from(row.children);
    if (cols.length !== 2) continue; // skip if not two columns
    const rowCells = [];
    for (const col of cols) {
      // If image column, extract <picture>
      if (col.classList.contains('columns-img-col')) {
        const pic = col.querySelector('picture');
        rowCells.push(pic ? pic : col);
      } else {
        // Otherwise, gather all children (text, list, button)
        // If only one child, use it directly
        if (col.children.length === 1) {
          rowCells.push(col.children[0]);
        } else if (col.children.length > 1) {
          rowCells.push(Array.from(col.children));
        } else {
          rowCells.push(col);
        }
      }
    }
    tableRows.push(rowCells);
  }

  // Compose table: header + rows
  const cells = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
