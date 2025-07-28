/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all rows (each direct child of .columns.block is a row)
  const rows = Array.from(columnsBlock.children);
  if (rows.length === 0) return;

  // Assemble header row
  const table = [ ['Columns'] ];

  // For each block row, assemble columns
  rows.forEach((row) => {
    // Each row is itself a flex of columns (usually 2)
    const cols = Array.from(row.children);
    const cells = cols.map((col) => {
      // If the column is an image col, use the picture directly
      if (col.classList.contains('columns-img-col')) {
        const pic = col.querySelector('picture');
        if (pic) return pic;
      }
      // Otherwise, gather all child nodes (including text, lists, and buttons)
      // Filter out empty text nodes
      const children = Array.from(col.childNodes).filter(
        node => (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim() !== '')
      );
      // If only one element, just return it; else return as array
      if (children.length === 1) return children[0];
      return children;
    });
    table.push(cells);
  });

  // Create the columns block table
  const blockTable = WebImporter.DOMUtils.createTable(table, document);
  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
