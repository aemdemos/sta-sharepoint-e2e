/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row as in the example
  const cells = [['Columns']];

  // Find all direct child divs of the block (these are logical rows in the block)
  const blockRows = Array.from(element.querySelectorAll(':scope > div'));

  // For each row in the block, extract the columns
  blockRows.forEach((blockRow) => {
    // Each column is a direct child div of the row
    const cols = Array.from(blockRow.querySelectorAll(':scope > div'));
    // For each column, extract its block of content
    const rowCells = cols.map((col) => {
      if (col.classList.contains('columns-img-col')) {
        // For image columns, use the picture or img element only
        return col.querySelector('picture, img') || '';
      } else {
        // For content columns, use all direct children
        const nodes = Array.from(col.childNodes).filter(node => {
          return node.nodeType !== Node.TEXT_NODE || node.textContent.trim();
        });
        return nodes.length === 1 ? nodes[0] : nodes;
      }
    });
    // Only push if there's at least one non-empty cell (prevent empty rows)
    if (rowCells.length > 0) {
      cells.push(rowCells);
    }
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
