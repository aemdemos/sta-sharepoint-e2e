/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside this element
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all direct rows inside the columns block
  const rows = Array.from(columnsBlock.children);

  // Determine the maximum number of columns in any row
  let maxCols = 0;
  rows.forEach(row => {
    const cols = Array.from(row.children);
    if (cols.length > maxCols) maxCols = cols.length;
  });
  if (maxCols === 0) maxCols = 1;

  // For each row, collect its immediate children (columns)
  const tableRows = [];
  rows.forEach(row => {
    const cols = Array.from(row.children);
    // Pad with empty string if the row is short
    while (cols.length < maxCols) cols.push('');
    tableRows.push(cols);
  });

  // Build the table array, start with an empty array for the header row
  const tableArray = [];
  // Add only a single header cell as the first row
  tableArray.push(['Columns (columns3)']);
  // Add all content rows
  tableArray.push(...tableRows);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableArray, document);

  // Fix header row: set colspan on the first <th>
  const firstRow = block.querySelector('tr');
  if (firstRow) {
    const th = firstRow.querySelector('th');
    if (th && maxCols > 1) {
      th.setAttribute('colspan', maxCols);
    }
  }

  // Replace original element with the block table
  element.replaceWith(block);
}
