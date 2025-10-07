/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns3)'];

  // The columns block contains two main rows, each with two columns
  const tableRows = [headerRow];

  // Find the two main rows (each is a direct child of the block)
  const mainRows = Array.from(element.children);
  // For each row, push a row with two columns, even if columns are missing
  mainRows.forEach(rowEl => {
    const cols = Array.from(rowEl.children);
    tableRows.push([
      cols[0] || '',
      cols[1] || ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
