/* global WebImporter */
export default function parse(element, { document }) {
  // The header row as a single cell per the example
  const headerRow = ['Columns'];

  // Each direct child of the block is a visual row
  const blockRows = Array.from(element.children);
  const tableRows = [];

  blockRows.forEach(rowEl => {
    // Each row has two columns (immediate children)
    const colEls = Array.from(rowEl.children);
    // For each column, collect all non-empty child nodes
    const rowCells = colEls.map(colEl => {
      // Grab all non-empty nodes (elements or non-whitespace text)
      const nodes = Array.from(colEl.childNodes).filter(n => n.nodeType !== 3 || n.textContent.trim() !== '');
      return nodes.length === 1 ? nodes[0] : nodes;
    });
    // Only push if there are exactly two cells for this row
    if (rowCells.length === 2) {
      tableRows.push(rowCells);
    }
  });

  // Compose the table: header row, then each table row as per visual row
  const table = [headerRow, ...tableRows];
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
