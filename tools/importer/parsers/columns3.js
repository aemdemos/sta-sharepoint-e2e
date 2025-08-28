/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified in the example
  const headerRow = ['Columns (columns3)'];

  // Get all top-level direct child divs (each represents one logical row)
  const rowDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each rowDiv, its children (divs) are the columns for that row
  // Each table row is an array of cells, each cell contains the DOM element from the column
  const rows = rowDivs.map(rowDiv => {
    // Only consider direct children (columns)
    return Array.from(rowDiv.children);
  });

  // Build the table cells: header row + each row
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
