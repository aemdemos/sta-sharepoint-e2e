/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner columns block for compatibility
  let block = element;
  if (!block.classList.contains('block')) {
    block = element.querySelector('.block');
  }
  if (!block) return; // fail gracefully if no block

  // Find rows: each direct child div of the block is a row
  const rows = Array.from(block.children).filter((row) => row.tagName === 'DIV');

  // For each row, create an array of cells by referencing direct children (the column divs)
  const tableRows = rows.map((row) => {
    // Each column is a direct child <div> of the row
    const cols = Array.from(row.children).filter((col) => col.tagName === 'DIV' || col.classList.contains('columns-img-col'));
    return cols;
  });

  // Header row should be a single cell
  const headerRow = ['Columns'];

  // Combine all rows
  const tableData = [headerRow, ...tableRows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // After creation, set the header cell to have colspan equal to the number of columns in the first row
  if (table && table.rows.length > 1) {
    const headerTh = table.rows[0].cells[0];
    const colCount = table.rows[1].cells.length;
    if (colCount > 1) {
      headerTh.colSpan = colCount;
    }
  }

  // Replace the original element
  element.replaceWith(table);
}
