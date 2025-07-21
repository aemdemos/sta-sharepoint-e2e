/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block in case it's wrapped
  let block = element;
  if (block.classList.contains('columns-wrapper')) {
    block = block.querySelector(':scope > .columns.block, :scope > .columns') || block;
  }
  // Get all rows (immediate children of the block)
  const rows = Array.from(block.querySelectorAll(':scope > div'));

  // Determine the maximum number of columns in any row (for header colSpan)
  let maxCols = 1;
  rows.forEach(row => {
    const cols = row.querySelectorAll(':scope > div').length;
    if (cols > maxCols) maxCols = cols;
  });

  // Build header row: one column, or one th with correct colspan if there are multiple columns
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Columns';
  if (maxCols > 1) headerCell.colSpan = maxCols;
  const headerRow = [headerCell];

  // Build table rows
  const tableRows = [headerRow];

  rows.forEach(row => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    const cells = cols.map(col => {
      // Get all non-empty children
      const children = Array.from(col.childNodes).filter(n => (
        n.nodeType !== Node.TEXT_NODE || n.textContent.trim().length > 0
      ));
      if (children.length === 1) return children[0];
      const frag = document.createDocumentFragment();
      children.forEach(child => frag.appendChild(child));
      return frag;
    });
    // If this row has fewer columns than maxCols, fill with empty cells
    while (cells.length < maxCols) {
      cells.push(document.createTextNode(''));
    }
    tableRows.push(cells);
  });

  const tbl = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(tbl);
}
