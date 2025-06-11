/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all direct children (each row of columns)
  const rows = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (rows.length === 0) return;

  // Prepare the table array
  const table = [];
  // Header row matches the example
  table.push(['Columns (columns3)']);

  // For each row of the columns block:
  rows.forEach((row) => {
    // Collect the immediate child divs, which are the cells (columns)
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    // If there are no divs (edge case), skip this row
    if (cols.length === 0) return;
    // Reference the existing col elements directly
    table.push(cols);
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
