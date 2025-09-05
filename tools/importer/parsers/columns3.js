/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Ensure we are working with the .columns.block element
  let block = element;
  if (!block.classList.contains('columns')) {
    block = element.querySelector('.columns.block');
    if (!block) return;
  }

  // Table header row as required
  const headerRow = ['Columns (columns3)'];

  // Each direct child <div> of .columns.block is a row
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  const tableRows = [];

  rows.forEach((rowDiv) => {
    // Each rowDiv contains 2 child divs (columns)
    const cols = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // Defensive: if only one column, wrap in array
    const rowCells = cols.length ? cols : [rowDiv];
    const cells = rowCells.map((colDiv) => {
      // If this is an image column, just use the picture element
      const picture = colDiv.querySelector('picture');
      if (picture) return picture;
      // Otherwise, collect all children as an array
      const children = Array.from(colDiv.childNodes).filter(n => {
        // Remove empty text nodes
        return !(n.nodeType === Node.TEXT_NODE && !n.textContent.trim());
      });
      if (children.length === 1) return children[0];
      if (children.length > 1) return children;
      return colDiv;
    });
    tableRows.push(cells);
  });

  // Build the table
  const cells = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
