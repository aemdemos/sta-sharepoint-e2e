/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all rows (direct children of .columns.block)
  const rows = Array.from(columnsBlock.children);
  if (rows.length === 0) return;

  // Build the header row: always a single cell ['Columns'] per requirements
  const tableRows = [['Columns']];

  // For each row, get its immediate children (the columns)
  rows.forEach((row) => {
    const cols = Array.from(row.children);
    // Add the content columns to the table row
    tableRows.push(cols);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
