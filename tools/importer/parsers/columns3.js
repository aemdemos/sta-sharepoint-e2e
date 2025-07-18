/* global WebImporter */
export default function parse(element, { document }) {
  // Find all rows (each direct child div)
  const rows = Array.from(element.querySelectorAll(':scope > div'));

  // Determine the number of columns (from the first row)
  let numCols = 0;
  if (rows.length > 0) {
    numCols = rows[0].querySelectorAll(':scope > div').length;
  }
  if (numCols < 1) numCols = 1;

  // Build the table structure
  const cells = [];
  // Header row: single cell with the block name
  cells.push(['Columns']);

  // Data rows
  rows.forEach(row => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    const tds = cols.map(col => {
      const nodes = Array.from(col.childNodes).filter(n => {
        return !(n.nodeType === Node.TEXT_NODE && n.textContent.trim() === '');
      });
      return nodes.length === 1 ? nodes[0] : nodes;
    });
    if (tds.length && tds.some(cell => cell && (cell.textContent || (Array.isArray(cell) && cell.length > 0)))) {
      cells.push(tds);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Fix the first row to have colspan=numCols if numCols > 1
  if (numCols > 1) {
    const firstRow = table.querySelector('tr');
    if (firstRow) {
      const ths = firstRow.querySelectorAll('th');
      if (ths.length === 1) {
        ths[0].setAttribute('colspan', numCols);
      }
    }
  }
  element.replaceWith(table);
}
