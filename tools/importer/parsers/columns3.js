/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Prepare the header row exactly as in the example
  const headerRow = ['Columns (columns3)'];

  // Each direct child <div> of columnsBlock is a row
  const rows = Array.from(columnsBlock.children);
  if (rows.length === 0) return;

  // For each row, get the columns
  // We want the raw content, not an extra wrapping <div>
  const tableRows = rows.map(row => {
    // Each column is a direct child <div> of the row <div>
    const cols = Array.from(row.children).filter(col => col.nodeType === 1);
    // For each column, extract its meaningful children (not just the wrapping column <div>)
    // If column is an image col, keep as-is. If it's a text col, use its children instead of the wrapper.
    return cols.map(col => {
      // If column has only one child and that child is a <picture>, keep as-is
      // Otherwise, flatten meaningful content
      if (
        col.classList.contains('columns-img-col') ||
        (col.tagName === 'DIV' && col.querySelector('picture'))
      ) {
        return col;
      } else {
        // Return an array of the direct children (e.g. <p>, <ul>, etc.)
        return Array.from(col.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
      }
    });
  });

  // Compose the table data: header, then all row arrays
  const tableData = [headerRow, ...tableRows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
