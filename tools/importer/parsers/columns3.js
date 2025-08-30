/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Columns (columns3)'];

  // Get the main columns block
  const block = element.querySelector(':scope > .columns.block');

  // For the block, get its direct children (these represent the rows)
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  const tableRows = [];

  rows.forEach(row => {
    // Each row should have two columns (left/right)
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // Defensive: if less than 2 columns, pad with empty divs
    while (cols.length < 2) {
      cols.push(document.createElement('div'));
    }
    tableRows.push([cols[0], cols[1]]);
  });

  // Compose the table: header then content rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...tableRows
  ], document);

  // Replace original element
  element.replaceWith(table);
}
