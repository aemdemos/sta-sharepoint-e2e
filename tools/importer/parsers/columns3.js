/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Ensure element exists
  if (!element) return;

  // Header row for the block table
  const headerRow = ['Columns (columns3)'];

  // Get all immediate child divs of the columns block (these are the rows)
  const rows = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: If no rows found, do nothing
  if (!rows.length) return;

  // We'll build the table rows below the header
  const tableRows = [];

  // Each row in the columns block corresponds to a table row
  rows.forEach((rowDiv) => {
    // Each rowDiv contains 2 child divs, each representing a column
    const cols = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // Defensive: If no columns, skip
    if (!cols.length) return;
    // For each column, collect its content
    const cells = cols.map((colDiv) => {
      // If this is an image column, just reference the whole div
      if (colDiv.classList.contains('columns-img-col')) {
        return colDiv;
      }
      // Otherwise, reference the whole column div (text, list, button, etc.)
      return colDiv;
    });
    tableRows.push(cells);
  });

  // Build the final cells array for createTable
  // The first row is the header, then each tableRow
  const cells = [headerRow, ...tableRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
