/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header
  const headerRow = ['Columns (columns3)'];

  // Get all direct child divs (each represents a visual row)
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  const tableRows = [headerRow];

  // For each visual row, extract its columns
  rows.forEach(row => {
    // Only consider direct children that are divs (columns)
    const cols = Array.from(row.children).filter(child => child.tagName === 'DIV');
    if (cols.length) {
      // Each cell: include the full content of the column div
      const cells = cols.map(col => col.cloneNode(true));
      tableRows.push(cells);
    }
  });

  // Only output the table if there is at least one content row
  if (tableRows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(tableRows, document);
    element.replaceWith(table);
  } else {
    // fallback: just header
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
  }
}
