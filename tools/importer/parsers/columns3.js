/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all direct children of columnsBlock
  // Each child is a 'row' in the columns UI
  const rowDivs = Array.from(columnsBlock.children).filter((child) => child.tagName === 'DIV');

  // Determine the maximum number of columns in any row
  let maxCols = 0;
  rowDivs.forEach(rowDiv => {
    const cols = Array.from(rowDiv.children).filter(col => col.tagName === 'DIV');
    if (cols.length > maxCols) maxCols = cols.length;
  });
  if (maxCols === 0) maxCols = 1;

  // Build header row: a single cell with 'Columns' (will use colspan later)
  const headerRow = new Array(maxCols).fill('');
  headerRow[0] = 'Columns';

  // Build the content rows
  const tableRows = [];
  rowDivs.forEach((rowDiv) => {
    const colDivs = Array.from(rowDiv.children).filter(col => col.tagName === 'DIV');
    // Pad columns with empty string for rows that are missing columns
    while (colDivs.length < maxCols) colDivs.push('');
    tableRows.push(colDivs);
  });

  // Compose the table data
  const cells = [headerRow, ...tableRows];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Set colspan on header if needed
  if (maxCols > 1) {
    const th = table.querySelector('tr:first-child th');
    if (th) th.setAttribute('colspan', maxCols);
    // Remove any extra ths from the header row
    const extraThs = Array.from(table.querySelectorAll('tr:first-child th')).slice(1);
    extraThs.forEach(thEl => thEl.remove());
  }

  // Replace the original element with the table
  element.replaceWith(table);
}
