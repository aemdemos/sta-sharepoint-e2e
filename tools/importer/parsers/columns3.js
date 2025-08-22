/* global WebImporter */
export default function parse(element, { document }) {
  // Find columns block (might be element itself or child)
  let block = element.classList.contains('columns') ? element : element.querySelector('.columns');
  if (!block) block = element;

  // Get all direct children (rows)
  const rows = Array.from(block.children);

  // Determine column count from the first row
  let numColumns = 1;
  if (rows.length > 0) {
    numColumns = rows[0].children.length || 1;
  }

  // Create the header row: single cell 'Columns' to be given colspan in table
  // Hack: create a th element with colspan (since createTable can't do this directly)
  // We'll post-process after table creation
  const headerRow = ['Columns'];
  const cells = [headerRow];

  // For each row, push cells
  rows.forEach(row => {
    const columns = Array.from(row.children);
    // Pad to numColumns if not enough
    while (columns.length < numColumns) {
      columns.push(document.createTextNode(''));
    }
    cells.push(columns);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix: Set colspan on the single header cell if needed
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1 && numColumns > 1) {
    firstRow.children[0].setAttribute('colspan', numColumns);
  }

  // Replace original element with table
  element.replaceWith(table);
}
