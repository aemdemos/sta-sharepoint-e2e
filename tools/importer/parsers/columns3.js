/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block (direct child with class 'block')
  const block = element.querySelector(':scope > .block');
  if (!block) return;

  // Get all the direct child rows
  const rows = Array.from(block.querySelectorAll(':scope > div'));

  // Determine the max number of columns in any row (should always be 2 for this block)
  let maxCols = 0;
  rows.forEach((row) => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    if (cols.length > maxCols) maxCols = cols.length;
  });
  if (maxCols < 2) maxCols = 2; // ensure at least 2 columns for proper structure

  // Build the table header as a single cell array
  const cells = [ [ 'Columns' ] ];

  // For each content row, collect the columns
  rows.forEach((row) => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // Pad with empty string if not enough columns
    while (cols.length < maxCols) {
      cols.push('');
    }
    cells.push(cols);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
