/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const block = element.querySelector('.block');
  if (!block) return;
  // Get all rows inside the block
  const rows = Array.from(block.children);

  // Prepare the header row with a single column as required
  const headerRow = ['Columns'];
  const tableRows = [headerRow];

  // Each row contains columns: get their children as an array
  rows.forEach((row) => {
    const cols = Array.from(row.children);
    // Add this row as a single array (may have 2 columns per row)
    tableRows.push(cols);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
