/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Columns (columns3)'];

  // Get all immediate child divs (each is a row of columns)
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  if (rows.length === 0) return;

  // For each row, collect its immediate children (columns)
  const tableRows = rows.map((row) => {
    // Each column is a direct child div
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // Defensive: if no divs, treat the row itself as a single column
    if (cols.length === 0) return [row];
    // For each column, use the column div directly
    return cols;
  });

  // Compose the table data
  const tableData = [headerRow, ...tableRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
