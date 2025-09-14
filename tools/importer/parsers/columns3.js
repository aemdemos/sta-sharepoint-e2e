/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected structure
  if (!element || !document) return;

  // Header row as specified
  const headerRow = ['Columns (columns3)'];

  // Get top-level columns (each direct child div of the block)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each columnDiv itself contains two child divs (for 2 columns per row)
  // We'll build rows for each columnDiv
  const rows = [];

  columnDivs.forEach((colDiv) => {
    // Defensive: get immediate children (should be two per row)
    const cells = Array.from(colDiv.querySelectorAll(':scope > div'));
    // If there are not exactly two, skip this row
    if (cells.length !== 2) return;
    // For each cell, reference the entire content block
    rows.push([
      cells[0],
      cells[1],
    ]);
  });

  // Build the table array
  const tableArray = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
