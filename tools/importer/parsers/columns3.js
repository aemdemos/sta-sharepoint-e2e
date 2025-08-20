/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block element inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get each row: each row is a direct child div of columnsBlock
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (rowDivs.length === 0) return;

  // For each row, get the direct children (columns for that row)
  const cellRows = rowDivs.map(row => {
    // Each cell is a direct child div of the row
    // If there are no divs (in some edge cases), treat the row itself as a single cell
    const cells = Array.from(row.querySelectorAll(':scope > div'));
    return cells.length > 0 ? cells : [row];
  });

  // Determine the maximum number of columns among all rows (typically the first content row)
  const maxCols = cellRows.reduce((max, row) => Math.max(max, row.length), 0);

  // Header row must be a single cell array with 'Columns', matching the example
  // This cell should be the only cell in the header row, regardless of columns
  const cells = [];
  cells.push(['Columns']);
  // Add all content rows as-is
  cellRows.forEach(cols => {
    cells.push(cols);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Fix for header cell spanning all columns (colspan)
  // The createTable utility does not set colspan, so we add it manually here.
  const th = block.querySelector('th');
  if (th && maxCols > 1) {
    th.setAttribute('colspan', maxCols);
  }

  // Replace the original element
  element.replaceWith(block);
}
