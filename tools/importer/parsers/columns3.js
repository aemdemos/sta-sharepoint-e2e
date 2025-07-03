/* global WebImporter */
export default function parse(element, { document }) {
  // Get the .columns.block element directly inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all rows: each immediate child of .columns.block (each row in the visual columns block)
  const rowDivs = Array.from(columnsBlock.children);
  if (!rowDivs.length) return;

  // Calculate the maximum number of columns in any row
  let maxCols = 0;
  const rowsContent = rowDivs.map((rowDiv) => {
    const columnDivs = Array.from(rowDiv.children);
    if (columnDivs.length > maxCols) maxCols = columnDivs.length;
    return columnDivs;
  });

  // Header row: single cell with 'Columns'
  const table = [['Columns']];

  // Fill table rows so that each has maxCols columns
  rowsContent.forEach((cols) => {
    const row = [];
    for (let i = 0; i < maxCols; i++) {
      row.push(cols[i] || '');
    }
    table.push(row);
  });

  const blockTable = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(blockTable);
}
