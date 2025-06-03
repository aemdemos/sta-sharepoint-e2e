/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block inside the wrapper
  let block = element.querySelector('.columns.block');
  if (!block) block = element;

  // Get all direct child rows of the columns block
  const rows = Array.from(block.querySelectorAll(':scope > div'));

  // Prepare header row as in the example
  const headerRow = ['Columns (columns3)'];

  // Each row in the block corresponds to a content row in the table
  const contentRows = rows.map(row => {
    // Each column is a direct child DIV of the row
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // If this row is structurally a single cell (single column), return as single column
    if (cols.length === 0) {
      // Sometimes there may not be div wrappers: treat the row itself as the content
      return [row];
    }
    // Otherwise, each col is a cell
    return cols.map(col => col);
  });

  // Construct table data
  const tableData = [headerRow, ...contentRows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
