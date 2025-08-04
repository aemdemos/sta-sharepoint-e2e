/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block (the direct descendant w/ data-block-name="columns")
  const columnsBlock = element.querySelector('[data-block-name="columns"]');
  if (!columnsBlock) return;

  // Get all main rows (children of block)
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (!rowDivs.length) return;

  // Build all data rows
  const tableRows = rowDivs.map(rowDiv => {
    // Each immediate child of the row is a column
    const colDivs = Array.from(rowDiv.children);
    // Reference the existing element, not its .innerHTML
    return colDivs.map(colDiv => colDiv);
  });

  // Compose header row (must match exactly: a single column labeled 'Columns')
  const headerRow = ['Columns'];

  // Make the table: header row (single column), then data rows (multiple columns)
  const table = [headerRow, ...tableRows];
  const blockTable = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(blockTable);
}
