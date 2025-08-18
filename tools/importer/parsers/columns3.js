/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block
  let columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) columnsBlock = element;

  // Get all row divs (each is a "row" in the columns block)
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));

  // Build array of arrays representing table rows
  const tableRows = [];
  // Determine the number of columns by inspecting the first row
  let numCols = 0;
  rowDivs.forEach(rowDiv => {
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    if (colDivs.length > numCols) numCols = colDivs.length;
  });
  if (numCols === 0) numCols = 1; // fallback if no rows

  // Header row: create an array with a single cell 'Columns' (rest implicit)
  // WebImporter.DOMUtils.createTable will not add colspan, so we must add it manually after table creation
  tableRows.push(['Columns']);

  // For each row, build an array of the direct child divs (columns)
  rowDivs.forEach(rowDiv => {
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    if (colDivs.length) {
      tableRows.push(colDivs);
    }
  });

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Fix the header row to span all columns
  if (blockTable.rows.length > 0 && numCols > 1) {
    const th = blockTable.rows[0].cells[0];
    th.setAttribute('colspan', numCols);
    // Remove any extra header cells if present
    while (blockTable.rows[0].cells.length > 1) {
      blockTable.rows[0].deleteCell(1);
    }
  }

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
