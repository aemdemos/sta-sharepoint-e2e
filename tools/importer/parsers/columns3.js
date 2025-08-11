/* global WebImporter */
export default function parse(element, { document }) {
  // Find the nested columns block
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Get all content rows (each direct child div of the block)
  const rows = Array.from(block.children);

  // Compose the table body rows
  const tableRows = rows.map(row => Array.from(row.children));

  // The header row must be a single cell matching the example
  const headerRow = ['Columns'];

  // Compose the cells array with a single header cell
  const cells = [headerRow, ...tableRows];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
