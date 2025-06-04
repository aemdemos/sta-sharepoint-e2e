/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all direct child divs: one div per row in the columns block
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (!rowDivs.length) return;

  // Build each table row: for each row, get all direct children (columns)
  const tableRows = rowDivs.map(rowDiv => {
    // Get all direct child divs (columns)
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // Defensive: if there is only one child and it's not a div, include it
    if (!colDivs.length) {
      // If there are no child divs, treat the rowDiv itself as the column
      return [rowDiv];
    }
    return colDivs;
  });

  // Create the header row (exact match to the markdown example)
  const headerRow = ['Columns (columns3)'];

  // Compose the cells array for the block table
  const cells = [headerRow, ...tableRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
