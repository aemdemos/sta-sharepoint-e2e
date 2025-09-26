/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all immediate child divs of the columns block (each represents a row of columns)
  const rows = Array.from(columnsBlock.querySelectorAll(':scope > div'));

  // Table header
  const headerRow = ['Columns (columns3)'];
  const tableRows = [headerRow];

  // For each row (which visually is a set of columns)
  rows.forEach((rowDiv) => {
    // Get all immediate child divs of this row (each is a column)
    const columns = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // Defensive: If no columns found, treat the rowDiv itself as a column
    const cells = columns.length ? columns : [rowDiv];
    // For each cell, collect its content
    const rowCells = cells.map((cellDiv) => {
      // If this cell contains only an image column, use the picture/img directly
      const imgCol = cellDiv.querySelector('.columns-img-col');
      if (imgCol) {
        // Use the picture element inside
        const picture = imgCol.querySelector('picture');
        return picture ? picture : imgCol;
      }
      // Otherwise, use the entire cellDiv (which may include text, lists, buttons)
      return cellDiv;
    });
    tableRows.push(rowCells);
  });

  // All rows after the header must have the same number of columns
  // Find max columns in any row (excluding header)
  const maxCols = tableRows.slice(1).reduce((max, row) => Math.max(max, row.length), 0);
  // Pad rows with fewer columns with empty strings
  for (let i = 1; i < tableRows.length; i++) {
    while (tableRows[i].length < maxCols) {
      tableRows[i].push('');
    }
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element
  element.replaceWith(block);
}
