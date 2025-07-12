/* global WebImporter */
export default function parse(element, { document }) {
  // Find .columns.block inside .columns-wrapper if present
  let columnsBlock = element;
  if (element.classList.contains('columns-wrapper')) {
    const found = element.querySelector(':scope > .columns.block');
    if (found) columnsBlock = found;
  }

  // Get the max number of columns for the content rows
  const rows = Array.from(columnsBlock.children);
  let maxCols = 0;
  const contentRows = rows.map(row => {
    const cols = Array.from(row.children);
    if (cols.length > maxCols) maxCols = cols.length;
    return cols;
  });

  // Always pad header row to match maxCols (for table consistency)
  const headerRow = Array(maxCols).fill('');
  headerRow[0] = 'Columns';

  // Pad all content rows to maxCols
  const normalizedRows = contentRows.map(cols => {
    const newRow = cols.slice();
    while (newRow.length < maxCols) newRow.push('');
    return newRow;
  });

  const tableArr = [headerRow, ...normalizedRows];
  const table = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(table);
}
