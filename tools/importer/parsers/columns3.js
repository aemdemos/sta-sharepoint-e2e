/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all the first-level row divs
  const rowDivs = Array.from(columnsBlock.children);

  // Prepare the header row with a single cell
  const headerRow = ['Columns (columns3)'];

  // For each row, get its direct children as columns
  const contentRows = rowDivs.map(row => {
    // Each row is a <div> containing two columns (divs)
    // We want those direct children as separate cells
    const cols = Array.from(row.children);
    return cols;
  });

  // Compose the table: header row (single cell), then each row with two cells
  const tableArray = [headerRow, ...contentRows];

  // Create table and replace the element
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(table);
}
