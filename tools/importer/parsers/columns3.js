/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .columns.block element
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all rows (each direct child <div> of .columns.block)
  const rows = Array.from(columnsBlock.children);
  if (rows.length === 0) return;

  // Build the header row according to the spec
  const headerRow = ['Columns'];

  // For each row, extract all direct children divs as columns
  const tableRows = rows.map(row => {
    // Each row is a <div>, containing 2 columns as children
    // Don't use querySelectorAll, directly use children for robustness
    const cols = Array.from(row.children);
    // Each col can be a div or any element
    // For each column, collect all its children as an array
    return cols.map(col => {
      // If col has a single element and it's a wrapper div, return its children
      if (col.children.length === 1 && col.firstElementChild.tagName === 'DIV') {
        return Array.from(col.firstElementChild.childNodes).filter(
          n => n.nodeType !== Node.COMMENT_NODE && (n.nodeType !== Node.TEXT_NODE || n.textContent.trim() !== '')
        );
      } else {
        return Array.from(col.childNodes).filter(
          n => n.nodeType !== Node.COMMENT_NODE && (n.nodeType !== Node.TEXT_NODE || n.textContent.trim() !== '')
        );
      }
    });
  });

  // Prepend the header row to the table rows
  const finalTableRows = [headerRow, ...tableRows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(finalTableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
