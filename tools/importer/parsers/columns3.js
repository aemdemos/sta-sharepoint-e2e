/* global WebImporter */
export default function parse(element, { document }) {
  // The header row, matching exactly the required format
  const headerRow = ['Columns (columns3)'];

  // Find the main columns block inside the .columns-wrapper if needed
  let columnsRoot = element;
  if (element.classList.contains('columns-wrapper')) {
    const found = element.querySelector(':scope > .columns.block');
    if (found) columnsRoot = found;
  }

  // Extract column rows (each direct >div under columnsRoot)
  const rows = Array.from(columnsRoot.querySelectorAll(':scope > div'));
  const tableRows = [headerRow];

  // For each row, get all direct columns (which are divs)
  rows.forEach((row) => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // If a row has no columns, skip it
    if (cols.length === 0) {
      return;
    }
    // Reference existing column elements directly
    tableRows.push(cols);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
