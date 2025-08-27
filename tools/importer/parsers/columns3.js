/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns block (the inner .columns.block)
  let block = element.querySelector('.columns.block');
  if (!block) block = element;
  // Get all top-level rows (each child div is a row)
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  if (rows.length === 0) return;

  // For each row, collect its immediate children (these are the columns for that row)
  const dataRows = rows.map(row => {
    // Get top-level columns in this row
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // Defensive: if row doesn't have div children, treat the row as a single column
    if (cols.length === 0) return [row];
    return cols;
  });
  
  // Find the maximum column count in any row
  const maxCols = dataRows.reduce((max, row) => Math.max(max, row.length), 1);

  // Header row: one cell, but we will set colspan after table creation
  const headerRow = ['Columns'];
  const cells = [headerRow, ...dataRows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Set the header cell to span all columns for valid table structure
  const headerCell = table.querySelector('th');
  if (headerCell && maxCols > 1) {
    headerCell.setAttribute('colspan', maxCols);
  }

  // Replace the original element with the table
  element.replaceWith(table);
}
