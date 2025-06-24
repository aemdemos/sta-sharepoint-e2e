/* global WebImporter */
export default function parse(element, { document }) {
  // Find all column rows (each :scope > div)
  const blockRows = Array.from(element.querySelectorAll(':scope > div'));
  if (!blockRows.length) return;

  // Header row: exactly one column
  const tableRows = [['Columns']];

  // For each visual row (may be 1 or more)
  blockRows.forEach((row) => {
    // For each column in the row (each direct div child)
    const columns = Array.from(row.querySelectorAll(':scope > div'));
    if (columns.length) {
      tableRows.push(columns);
    }
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
