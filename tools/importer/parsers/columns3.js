/* global WebImporter */
export default function parse(element, { document }) {
  // Find the correct block root
  let block = element.querySelector('.columns.block');
  if (!block) block = element;

  // Get all direct child divs (these are the rows)
  const rowDivs = Array.from(block.querySelectorAll(':scope > div'));

  // Prepare cells array
  const cells = [];
  // Header row: exactly one cell, must match example
  cells.push(['Columns']);

  // For each row, collect the columns
  rowDivs.forEach(rowDiv => {
    // Get all direct children (columns)
    let colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    if (colDivs.length === 0) colDivs = [rowDiv];
    // Each column: collect all non-empty child nodes
    const cols = colDivs.map(col => {
      return Array.from(col.childNodes).filter(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent.trim() !== '';
        }
        return true;
      });
    });
    cells.push(cols);
  });
  // Create table and replace original
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
