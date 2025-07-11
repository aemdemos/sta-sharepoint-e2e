/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const block = element.querySelector('[data-block-name="columns"]');
  if (!block) return;

  // The header row must be a single cell with 'Columns'
  const cells = [['Columns']];

  // Each direct child of block is a row
  const rows = Array.from(block.children).filter((child) => child.tagName === 'DIV');
  rows.forEach((rowDiv) => {
    // Each row has two columns: left and right (each a DIV)
    const columns = Array.from(rowDiv.children).filter((child) => child.tagName === 'DIV');
    // If the structure is as expected, each columns[0] and columns[1] is a column
    if (columns.length === 2) {
      // For each column, gather all childNodes as a single cell
      const leftCell = Array.from(columns[0].childNodes);
      const rightCell = Array.from(columns[1].childNodes);
      cells.push([leftCell, rightCell]);
    } else {
      // Fallback: treat the row as a single cell, preserving all content
      cells.push([[...rowDiv.childNodes]]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
