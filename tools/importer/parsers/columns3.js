/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as required
  const headerRow = ['Columns (columns3)'];

  // Get all immediate child divs (each represents a row in the columns block)
  const rows = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: if no rows, do nothing
  if (!rows.length) return;

  // For each row, collect its immediate children as columns
  const tableRows = [];

  rows.forEach((rowDiv) => {
    // Each rowDiv should have two direct children (columns)
    const columns = Array.from(rowDiv.children);
    // Defensive: if no columns, skip
    if (!columns.length) return;
    // For each column, collect the entire element (to preserve structure)
    tableRows.push(columns);
  });

  // Compose the table data: header + all rows
  const tableData = [headerRow, ...tableRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
