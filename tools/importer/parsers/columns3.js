/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block in case we are passed the wrapper
  let columnsBlock = element;
  if (!columnsBlock.classList.contains('block')) {
    columnsBlock = element.querySelector(':scope > .columns.block');
  }
  if (!columnsBlock) {
    columnsBlock = element;
  }

  // Get all direct row divs inside the columns block
  const rows = Array.from(columnsBlock.querySelectorAll(':scope > div'));

  // Prepare the table rows array
  const tableRows = [];
  // Add the header row exactly as in the example
  tableRows.push(['Columns (columns3)']);

  // For each columns row (each top-level div), extract the columns
  rows.forEach((rowDiv) => {
    // Each column is a direct child div
    const cols = Array.from(rowDiv.querySelectorAll(':scope > div'));
    if (!cols.length) return; // skip if no columns found
    // Each cell: pull in the whole column div to preserve full structure
    const cells = cols.map((colDiv) => colDiv);
    tableRows.push(cells);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original block (not the wrapper) with the table
  columnsBlock.replaceWith(table);
}
