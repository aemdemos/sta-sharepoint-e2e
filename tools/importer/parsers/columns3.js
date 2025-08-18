/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all top-level rows (each direct child div of the .columns.block)
  const rows = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (!rows.length) return;

  // Determine the max number of columns in any row
  let maxCols = 0;
  rows.forEach((row) => {
    const cols = Array.from(row.children);
    if (cols.length > maxCols) maxCols = cols.length;
  });

  // Build the header row as shown in the example: a single cell ['Columns']
  const tableRows = [["Columns"]];

  // For each row, build a table row with as many columns as the layout provides
  rows.forEach((row) => {
    // Only include direct children (columns), do not descend recursively
    const columns = Array.from(row.children);
    // Pad the row if it has fewer columns than the maximum
    while (columns.length < maxCols) {
      columns.push(document.createElement('div'));
    }
    tableRows.push(columns);
  });

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
