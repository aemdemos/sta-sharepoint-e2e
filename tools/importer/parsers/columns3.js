/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block containing the columns structure
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Build the content rows by extracting columns for each row
  const rows = Array.from(columnsBlock.children);
  const contentRows = rows.map((row) => Array.from(row.children));

  // Header row must be exactly one cell, matching the example
  const headerRow = ['Columns'];

  // Assemble the table array: header row (one cell), then all content rows
  const tableRows = [headerRow, ...contentRows];

  // Create the table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
