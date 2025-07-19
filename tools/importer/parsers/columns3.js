/* global WebImporter */
export default function parse(element, { document }) {
  // Find all the rows in the columns block
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  if (rows.length === 0) return;

  // Determine consistent number of columns from the first row
  const firstRowCols = Array.from(rows[0].querySelectorAll(':scope > div'));
  const numCols = firstRowCols.length;

  // Prepare header row (block name)
  const table = [['Columns']];

  // For each row, extract its columns
  rows.forEach(row => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // Defensive: If there are less columns than expected, pad with ''
    const rowCells = [];
    for (let i = 0; i < numCols; i++) {
      if (cols[i]) {
        // For content, include all child nodes (elements and text), filter empty text nodes
        const nodes = Array.from(cols[i].childNodes).filter(n => n.nodeType !== Node.TEXT_NODE || n.textContent.trim());
        rowCells.push(nodes);
      } else {
        rowCells.push('');
      }
    }
    table.push(rowCells);
  });

  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
