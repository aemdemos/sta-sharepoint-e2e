/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row
  const headerRow = ['Columns'];

  // Find all rows: each :scope > div is a row
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  // For each row, take its two columns as immediate children
  // Each column is a div inside the row
  const dataRows = rows.map(rowDiv => {
    const columns = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // Ensure exactly two columns per row (pad with empty string if not)
    return [columns[0] || '', columns[1] || ''];
  });

  // Compose cells array
  const cells = [headerRow, ...dataRows];

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
