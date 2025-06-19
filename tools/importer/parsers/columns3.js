/* global WebImporter */
export default function parse(element, { document }) {
  // Find main columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Each direct child div of columnsBlock represents a row
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  const tableRows = [];

  // Header row - must match the block name exactly as given in requirements
  tableRows.push(['Columns (columns3)']);

  // For each row, collect all direct child divs (columns)
  rowDivs.forEach((rowDiv) => {
    const cellDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // If no direct child divs, treat whole rowDiv as a single cell (edge case handling)
    if (cellDivs.length === 0) {
      tableRows.push([rowDiv]);
    } else {
      tableRows.push(cellDivs.map(cell => cell));
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
