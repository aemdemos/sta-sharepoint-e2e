/* global WebImporter */
export default function parse(element, { document }) {
  // Build the table header row as a single cell with 'Columns'
  const headerRow = ['Columns'];

  // Collect all rows: each immediate child div of 'element' is a row
  const blockRows = Array.from(element.querySelectorAll(':scope > div'));

  // For each HTML row, collect its column cells: each immediate child div of the row
  const tableRows = blockRows.map(row => {
    // Each column is an immediate child div of this row
    const columns = Array.from(row.querySelectorAll(':scope > div'));
    // If the row has fewer columns than expected, pad with empty strings
    return columns.length ? columns : [''];
  });

  // Build the table structure: header row, then all table rows
  const cells = [headerRow, ...tableRows];

  // Create the table using the block cells
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
