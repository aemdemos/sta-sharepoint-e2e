/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the rows (each top-level direct child is a row)
  const rowDivs = columnsBlock.querySelectorAll(':scope > div');
  if (rowDivs.length === 0) return;

  // Find the maximum number of columns in any row
  let maxCols = 0;
  rowDivs.forEach(row => {
    const cellDivs = row.querySelectorAll(':scope > div');
    if (cellDivs.length > maxCols) maxCols = cellDivs.length;
  });
  if (maxCols < 1) maxCols = 1;

  // Table header per block requirement
  const headerRow = ['Columns (columns3)'];

  // Build table rows by referencing each cell div
  const tableRows = Array.from(rowDivs).map(row => {
    const cellDivs = row.querySelectorAll(':scope > div');
    // Reference existing elements, do not clone
    const cells = Array.from(cellDivs);
    // If there are fewer cells than maxCols, pad with empty divs
    while (cells.length < maxCols) {
      const emptyDiv = document.createElement('div');
      cells.push(emptyDiv);
    }
    return cells;
  });

  // Compose final table data
  const cells = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
