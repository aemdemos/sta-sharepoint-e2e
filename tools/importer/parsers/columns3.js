/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block inside the wrapper
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Find all direct >div children representing the rows of columns
  const rowDivs = Array.from(block.querySelectorAll(':scope > div'));
  if (!rowDivs.length) return;

  // The columns count is determined by the number of children in the first row
  const firstRowCols = Array.from(rowDivs[0].querySelectorAll(':scope > div'));
  const colCount = firstRowCols.length;

  // Header row: single cell, to be interpreted as spanning all columns
  const headerRow = ['Columns (columns3)'];

  // Now collect each row's columns as arrays (cells)
  const tableRows = rowDivs.map(rowDiv => {
    const cells = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // If a row has fewer cells, pad with empty cells to match colCount
    while (cells.length < colCount) {
      const emptyDiv = document.createElement('div');
      cells.push(emptyDiv);
    }
    return cells;
  });

  // Compose the table: header row as a single-cell array, then colCount-cell arrays per row
  const cells = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // EXPLICITLY set colspan for header row if the createTable function does not handle it
  // (This is a workaround for downstream systems that expect <th colspan=N> for header row)
  if (colCount > 1) {
    const th = table.querySelector('tr th');
    if (th) {
      th.setAttribute('colspan', colCount);
    }
  }

  element.replaceWith(table);
}
