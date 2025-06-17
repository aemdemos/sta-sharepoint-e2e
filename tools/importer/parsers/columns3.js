/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all the top-level row divs (each row in columns)
  const rowDivs = Array.from(columnsBlock.children).filter(n => n.tagName === 'DIV');

  // Build content rows
  const contentRows = rowDivs.map(rowDiv => {
    const colDivs = Array.from(rowDiv.children).filter(n => n.tagName === 'DIV' || n.classList.contains('columns-img-col'));
    if (colDivs.length === 0) {
      return [rowDiv];
    } else {
      return colDivs;
    }
  });

  // Header row: exactly as in the example
  const rows = [['Columns (columns3)',], ...contentRows];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
