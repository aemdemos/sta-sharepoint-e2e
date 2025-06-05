/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all the direct child rows (each is a row in the visual block)
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (rowDivs.length === 0) return;

  // Find the max number of columns by checking the direct children of the first row (and all rows for safety)
  let columnsCount = 0;
  rowDivs.forEach(rowDiv => {
    const count = rowDiv.querySelectorAll(':scope > div').length;
    if (count > columnsCount) columnsCount = count;
  });
  if (columnsCount === 0) columnsCount = 1;

  // Header row: a single cell, as per requirement
  const headerRow = ['Columns (columns3)'];

  // For each visual row, each child div is a column; each td should contain exactly one column's content
  const tableRows = rowDivs.map(rowDiv => {
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // If there are no direct colDivs (shouldn't be the case for valid columns), treat the rowDiv itself as a single cell
    if (colDivs.length === 0) return [rowDiv];
    // Return one cell per column (do not combine divs into a single td)
    // Pad with empty string if not enough columns (edge case)
    while (colDivs.length < columnsCount) colDivs.push('');
    return colDivs;
  });

  // Assemble the final table
  const tableData = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
