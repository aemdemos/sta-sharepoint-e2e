/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Prepare the header for the table
  const headerRow = ['Columns'];
  const tableRows = [headerRow];

  // For each row in the columns block
  const rows = Array.from(columnsBlock.children);
  rows.forEach(row => {
    // Each row has columns: direct children
    const cols = Array.from(row.children);
    // Build each cell by referencing the actual DOM nodes (not cloning)
    const cells = cols.map(col => {
      // Handle columns that are just images or have other content
      const children = Array.from(col.childNodes).filter(node => {
        // Remove empty text nodes
        return node.nodeType !== 3 || node.textContent.trim().length > 0;
      });
      if (children.length === 1) {
        return children[0];
      } else if (children.length > 1) {
        return children;
      } else {
        return '';
      }
    });
    tableRows.push(cells);
  });

  // Create the table block and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
