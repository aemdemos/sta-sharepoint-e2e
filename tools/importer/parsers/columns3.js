/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block
  let block = element;
  if (!block.hasAttribute('data-block-name')) {
    block = element.querySelector('[data-block-name="columns"]') || element;
  }

  // Get the main block rows (each <div> row)
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  // For each row, get its columns (immediate child divs)
  const rowCols = rows.map(row => Array.from(row.querySelectorAll(':scope > div')));
  // Find the maximum number of columns in any row
  const maxCols = rowCols.reduce((m, cols) => Math.max(m, cols.length), 0);

  // Build the cells array
  const cells = [];
  // Header row: one cell only
  cells.push(['Columns']);
  // For each row, ensure correct number of columns
  rowCols.forEach(cols => {
    const row = [];
    for (let i = 0; i < maxCols; i++) {
      row.push(cols[i] || '');
    }
    cells.push(row);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Critical fix: Ensure the first <th> has colspan=maxCols if more than one column
  if (maxCols > 1) {
    const th = table.querySelector('th');
    if (th) th.setAttribute('colspan', maxCols);
  }

  // Replace the original block with the table
  block.replaceWith(table);
}
