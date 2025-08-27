/* global WebImporter */
export default function parse(element, { document }) {
  // Get the columns block (assume you get passed the columns-wrapper)
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Get all immediate child divs of .columns.block - each is a visual row
  const rowDivs = block.querySelectorAll(':scope > div');

  // Determine the number of columns from the first row (usually the max columns in any row)
  let maxColumns = 0;
  rowDivs.forEach((rowDiv) => {
    const colDivs = rowDiv.querySelectorAll(':scope > div');
    if (colDivs.length > maxColumns) {
      maxColumns = colDivs.length;
    }
  });
  if (!maxColumns) return; // Defensive: do nothing if no columns detected

  // Header row: single cell, should NOT match the number of columns, just one
  const headerRow = ['Columns'];
  const tableRows = [headerRow];

  // Now add data rows with correct number of columns
  rowDivs.forEach((rowDiv) => {
    const colDivs = rowDiv.querySelectorAll(':scope > div');
    const rowCells = [];
    colDivs.forEach((colDiv) => {
      rowCells.push(colDiv);
    });
    // Fill out any missing columns with empty strings so all data rows match maxColumns
    while (rowCells.length < maxColumns) {
      rowCells.push('');
    }
    tableRows.push(rowCells);
  });

  // Create table with WebImporter helper
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
