/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block (the actual block container)
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Prepare the table header (must match example exactly)
  const headerRow = ['Columns (columns3)'];

  // For each row in the columns block, extract its direct children (<div>s = columns)
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  if (rows.length === 0) return;

  const tableRows = rows.map(row => {
    // Get all direct column <div>s in this row
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // If no direct <div> children (edge case), use the row itself
    if (cols.length === 0) return [row];
    return cols;
  });

  // Assemble all table rows
  const cells = [headerRow, ...tableRows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
