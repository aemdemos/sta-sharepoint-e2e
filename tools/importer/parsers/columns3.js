/* global WebImporter */
export default function parse(element, { document }) {
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  const rowDivs = Array.from(columnsBlock.children);
  if (rowDivs.length === 0) return;

  // Determine number of columns for content rows
  const firstRowColumns = Array.from(rowDivs[0].children);
  const numCols = firstRowColumns.length;
  if (numCols < 1) return;

  // Build table: header is a single cell (spanning columns), then each row is numCols cells
  const table = [];
  // Create header row as a single cell in an array
  table.push(['Columns']);

  // For each content row, create array of columns (cells)
  rowDivs.forEach((rowDiv) => {
    const colDivs = Array.from(rowDiv.children);
    // if any row has fewer columns than expected, fill with empty strings
    while (colDivs.length < numCols) colDivs.push(document.createTextNode(''));
    table.push(colDivs);
  });

  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
