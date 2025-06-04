/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns block (inside columns-wrapper)
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Header row, as specified in the example
  const headerRow = ['Columns (columns3)'];

  // Gather the direct child divs of the block, each represents a row of columns
  const blockRows = Array.from(block.querySelectorAll(':scope > div'));
  if (!blockRows.length) return;

  // Prepare the body rows for the table
  // Each row is an array of direct child divs (columns)
  const bodyRows = blockRows.map(rowDiv => {
    // For each row, get direct children divs which are the columns
    const cols = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // If there are no child divs, fallback to rowDiv as a single column
    if (cols.length === 0) return [rowDiv];
    return cols;
  });

  // Compose the final table array
  const cells = [headerRow, ...bodyRows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element in the DOM with the new table
  element.replaceWith(table);
}
