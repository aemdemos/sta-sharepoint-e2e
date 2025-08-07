/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all row divs (direct children - each row of columns)
  const rowDivs = Array.from(columnsBlock.children);
  if (rowDivs.length === 0) return;

  // Determine the number of columns by the first row
  const firstRowCols = Array.from(rowDivs[0].children).length;

  // Header row: one cell that matches the block name, and will be rendered with colspan
  // To ensure the table builder renders it with colspan, pass an array with one string as the first row
  const headerRow = ['Columns'];

  // Build data rows: each row is an array of the content for that row, as in the HTML
  const tableRows = rowDivs.map(rowDiv => {
    const colDivs = Array.from(rowDiv.children);
    return colDivs.map(colDiv => {
      // If image column
      if (colDiv.classList && colDiv.classList.contains('columns-img-col')) {
        const picture = colDiv.querySelector('picture');
        return picture;
      }
      // Otherwise, preserve all children nodes (text, lists, etc.)
      return Array.from(colDiv.childNodes).filter(
        node => !(node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '')
      );
    });
  });

  // Compose the cells for createTable
  // The first row is a single cell, the rest are N cells each (where N = firstRowCols)
  const cells = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Fix the header row to span all columns
  const th = table.querySelector('th');
  if (th && firstRowCols > 1) th.setAttribute('colspan', firstRowCols);

  element.replaceWith(table);
}
