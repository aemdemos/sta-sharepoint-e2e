/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Table header as required by markdown example
  const headerRow = ['Columns (columns3)'];

  // Each child of .columns.block is a row for the table
  const rows = Array.from(columnsBlock.children).filter((child) => child.tagName === 'DIV');
  const tableRows = [];
  for (const row of rows) {
    // For each row, collect its direct children (columns)
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // If no direct child divs, the row itself is a single column
    if (cols.length === 0) {
      tableRows.push([row]);
    } else {
      // Use each child div as a column
      tableRows.push(cols);
    }
  }

  // Build the table
  const cells = [headerRow, ...tableRows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
