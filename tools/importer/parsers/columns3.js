/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block (children of columns-wrapper)
  const columnsBlock = element.querySelector(':scope > .columns.block');
  if (!columnsBlock) return;

  // Header row exactly as example
  const headerRow = ['Columns'];
  const rows = [headerRow];

  // Each row is a direct child div of .columns.block
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  rowDivs.forEach(rowDiv => {
    // Each column is a direct child div of the row
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    rows.push(colDivs);
  });

  // Build the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
