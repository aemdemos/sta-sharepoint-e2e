/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get each row (direct child) in the columns block
  const rows = Array.from(columnsBlock.children);

  // Prepare the table rows
  // The header row MUST be a single cell: ['Columns']
  const tableRows = [['Columns']];

  // For each row, build the columns (cells)
  rows.forEach(row => {
    // Each row has columns (usually divs)
    const cols = Array.from(row.children);
    // For each column, add the entire col element (preserving all content)
    const cells = cols.map(col => col);
    // Add this row of cells to the table
    if (cells.length) {
      tableRows.push(cells);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Set the header cell to colspan for correct appearance (optional, matches example)
  const th = blockTable.querySelector('th');
  if (th && tableRows.length > 1 && tableRows[1].length > 1) {
    th.setAttribute('colspan', tableRows[1].length);
  }

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
