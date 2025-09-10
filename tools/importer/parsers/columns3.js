/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element) return;

  // Header row as specified
  const headerRow = ['Columns (columns3)'];

  // Get immediate children (each column group)
  const columnGroups = Array.from(element.querySelectorAll(':scope > div'));

  // Each column group contains 2 columns (visually)
  // We'll build rows for the table, each with 2 columns
  const rows = [];

  columnGroups.forEach((group) => {
    // Get immediate children of this group
    const cols = Array.from(group.querySelectorAll(':scope > div'));
    // Defensive: pad to 2 columns if needed
    while (cols.length < 2) cols.push(document.createElement('div'));
    rows.push(cols);
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
