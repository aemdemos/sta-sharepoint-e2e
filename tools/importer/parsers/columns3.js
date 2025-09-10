/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have the expected structure
  if (!element) return;

  // Find the columns block (the inner .columns.block)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get top-level rows (direct children of .columns.block)
  const rows = Array.from(columnsBlock.children);
  if (rows.length < 2) return;

  // Header row
  const headerRow = ['Columns (columns3)'];

  const tableRows = [];

  // First visual row: left (text), right (image)
  const firstRow = rows[0];
  const firstRowCols = Array.from(firstRow.children);
  if (firstRowCols.length === 2) {
    tableRows.push([
      firstRowCols[0], // left: text, list, button
      firstRowCols[1], // right: image
    ]);
  }

  // Second visual row: left (image), right (text)
  const secondRow = rows[1];
  const secondRowCols = Array.from(secondRow.children);
  if (secondRowCols.length === 2) {
    tableRows.push([
      secondRowCols[0], // left: image
      secondRowCols[1], // right: text, button
    ]);
  }

  // Compose table data
  const tableData = [headerRow, ...tableRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
