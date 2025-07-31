/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner columns block
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Get all immediate row divs
  const rowDivs = Array.from(block.querySelectorAll(':scope > div'));
  if (rowDivs.length === 0) return;

  // Find the number of columns in the first row (used for column count)
  let maxCols = 0;
  rowDivs.forEach((rowDiv) => {
    const cols = rowDiv.querySelectorAll(':scope > div').length;
    if (cols > maxCols) maxCols = cols;
  });
  if (maxCols === 0) maxCols = 1;

  // Header row: exactly one cell with 'Columns'
  const table = [['Columns']];

  // For each visual row, process columns
  rowDivs.forEach((rowDiv) => {
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    let cells;
    if (colDivs.length === 0) {
      // treat rowDiv itself as a single cell
      cells = [rowDiv];
    } else {
      // each column: aggregate children as cell content
      cells = colDivs.map((colDiv) => {
        const nodes = Array.from(colDiv.childNodes).filter(
          n => !(n.nodeType === 3 && n.textContent.trim() === '')
        );
        if (nodes.length === 0) return '';
        if (nodes.length === 1) return nodes[0];
        return nodes;
      });
      // pad row to maxCols if needed (shouldn't be necessary for well-formed input, but for resilience)
      while (cells.length < maxCols) {
        cells.push('');
      }
    }
    table.push(cells);
  });

  // Create the table
  const tbl = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(tbl);
}
