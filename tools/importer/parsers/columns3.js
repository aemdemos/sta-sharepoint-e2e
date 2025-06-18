/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Each direct child div of the columnsBlock is a row
  const rows = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (rows.length === 0) return;

  // Determine how many columns are in the first content row
  const firstContentRow = rows[0];
  const numCols = Array.from(firstContentRow.querySelectorAll(':scope > div')).length;

  // Table header row: must be a single cell, even if content rows have multiple columns
  const headerRow = ['Columns (columns3)'];

  // For each row, build the array of cells
  const tableRows = rows.map(row => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // If there are no div children, treat the row itself as a single cell (edge case)
    if (cols.length === 0) return [row];
    return cols;
  });

  // Compose cells array: header is always a single cell
  const cells = [headerRow, ...tableRows];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
