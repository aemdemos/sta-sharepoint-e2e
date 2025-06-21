/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child rows
  const rowDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Build the table rows
  // Header row: single cell with block name
  const cells = [['Columns']];

  // Find all columns for the block table (second row in table)
  const columns = rowDivs.map((rowDiv) => rowDiv);
  if (columns.length > 0) {
    cells.push(columns);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the table
  element.replaceWith(block);
}
