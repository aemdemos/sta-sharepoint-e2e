/* global WebImporter */
export default function parse(element, { document }) {
  // Get direct child divs of the columns block (these are the rows)
  const rowDivs = Array.from(element.querySelectorAll(':scope > div'));
  // Defensive: must have 2 rows for the 2 content rows (each with 2 columns)
  if (rowDivs.length < 2) return;

  // First row: left (text+button), right (image)
  const firstRowCols = Array.from(rowDivs[0].querySelectorAll(':scope > div'));
  // Second row: left (image), right (text+button)
  const secondRowCols = Array.from(rowDivs[1].querySelectorAll(':scope > div'));

  // Defensive: make sure both rows have 2 columns
  if (firstRowCols.length < 2 || secondRowCols.length < 2) return;

  // Table header as in the example markdown
  const headerRow = ['Columns (columns3)'];

  // Build the required table structure
  const tableRows = [
    // Header row
    headerRow,
    // First content row: left cell is text block, right cell is image
    [firstRowCols[0], firstRowCols[1]],
    // Second content row: left cell is image, right cell is text block
    [secondRowCols[0], secondRowCols[1]],
  ];

  // Create the table using the helper
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element with the table
  element.replaceWith(table);
}