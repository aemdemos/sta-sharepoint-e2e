/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct child .columns.block (the block to process)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Each child of columnsBlock is a row (usually a <div>)
  const rows = Array.from(columnsBlock.children);
  if (rows.length === 0) return;

  // Determine number of columns from the first row
  const firstRow = rows[0];
  const firstRowCols = Array.from(firstRow.children);
  const numCols = firstRowCols.length;

  // Helper to collect columns for each row
  function getRowCells(row) {
    // For each cell (column) in this row, reference the whole element
    const cols = Array.from(row.children);
    // If row has less columns than numCols, fill with ''
    return Array.from({ length: numCols }, (_, i) => cols[i] || '');
  }

  // Build table rows. First row: header (single cell as per requirement)
  const tableRows = [];
  tableRows.push(['Columns']); // header row as a single cell

  // Content rows for each row in the columns block
  rows.forEach((row) => {
    tableRows.push(getRowCells(row));
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Fix header cell to span all columns
  const headerTr = blockTable.querySelector('tr');
  if (headerTr && tableRows.length > 1 && numCols > 1) {
    const th = headerTr.querySelector('th');
    if (th) th.setAttribute('colspan', numCols);
  }

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
