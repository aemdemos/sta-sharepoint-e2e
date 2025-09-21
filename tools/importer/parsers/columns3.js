/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Prepare header row
  const headerRow = ['Columns (columns3)'];
  const tableRows = [headerRow];

  // Each direct child of columnsBlock is a row (2 rows visually)
  const rows = Array.from(columnsBlock.children);
  rows.forEach((row) => {
    // Each row has two columns (divs)
    const cols = Array.from(row.children);
    // Defensive: always push the actual DOM elements so references are kept
    if (cols.length === 2) {
      tableRows.push([cols[0], cols[1]]);
    } else if (cols.length === 1) {
      tableRows.push([cols[0], '']);
    } else if (cols.length > 2) {
      tableRows.push(cols);
    }
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
