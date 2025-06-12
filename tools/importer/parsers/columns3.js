/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate child divs (rows in the columns block)
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  const bodyRows = [];
  let maxCols = 0;

  // Determine the max number of columns for spanning the header correctly
  rows.forEach(row => {
    const columns = Array.from(row.querySelectorAll(':scope > div'));
    maxCols = Math.max(maxCols, columns.length);
  });
  if (maxCols === 0 && rows.length > 0) {
    // fallback: treat as 1 column if only one div per row
    maxCols = 1;
  }

  // Populate each body row with the correct number of columns
  rows.forEach(row => {
    const columns = Array.from(row.querySelectorAll(':scope > div'));
    if (columns.length > 0) {
      bodyRows.push(columns);
    } else {
      // fallback: treat the row itself as a single cell
      bodyRows.push([row]);
    }
  });

  // Header row: single cell, but should span all columns
  // WebImporter.DOMUtils.createTable does not add colspan, but by putting only one cell in that row,
  // the importer will know to render it as a spanning header
  const headerRow = ['Columns (columns3)'];
  const tableData = [headerRow, ...bodyRows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(table);
}
