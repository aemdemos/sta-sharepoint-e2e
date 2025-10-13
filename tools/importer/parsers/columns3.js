/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Columns (columns3)'];

  // Find the actual columns block (in case wrapper is passed)
  let columnsBlock = element;
  if (!columnsBlock.classList.contains('columns')) {
    columnsBlock = element.querySelector('.columns.block');
    if (!columnsBlock) return;
  }

  // Get all direct children of the columns block (should be the inner columns)
  const rows = Array.from(columnsBlock.children);

  // Defensive: If not enough rows, do nothing
  if (rows.length < 2) return;

  // First visual row: two columns
  const firstRowCols = Array.from(rows[0].children);
  // Second visual row: two columns
  const secondRowCols = Array.from(rows[1].children);

  // Defensive: If either row doesn't have two columns, fallback to single cell
  if (firstRowCols.length !== 2 || secondRowCols.length !== 2) {
    // fallback: treat the whole block as a single cell
    const block = WebImporter.DOMUtils.createTable([
      headerRow,
      [columnsBlock]
    ], document);
    element.replaceWith(block);
    return;
  }

  // Build the table rows
  const tableRows = [
    headerRow,
    [firstRowCols[0], firstRowCols[1]],
    [secondRowCols[0], secondRowCols[1]],
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
