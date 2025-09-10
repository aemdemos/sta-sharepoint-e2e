/* global WebImporter */
export default function parse(element, { document }) {
  // Only parse if element is a columns block
  if (!element || !element.classList.contains('columns')) return;

  // Header row as required
  const headerRow = ['Columns (columns3)'];

  // Find all direct child divs (these are the rows)
  const rows = Array.from(element.children);
  if (rows.length < 2) return;

  // Each row contains two columns (divs)
  const bodyRows = rows.map(row => {
    const cols = Array.from(row.children);
    // Defensive: Only include rows with exactly 2 columns
    if (cols.length !== 2) return null;
    // For each col, wrap its content in a div to ensure content is preserved
    return cols.map(col => {
      const wrapper = document.createElement('div');
      while (col.firstChild) {
        wrapper.appendChild(col.firstChild);
      }
      return wrapper;
    });
  }).filter(Boolean);

  // If no valid body rows, do not proceed
  if (bodyRows.length === 0) return;

  // Build the table rows: header + each row's columns
  const tableRows = [headerRow, ...bodyRows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
