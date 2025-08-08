/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block (the direct .columns.block or fallback to element)
  let columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) columnsBlock = element;

  // Each direct child <div> under columnsBlock is a row
  const rows = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (rows.length === 0) return;

  // Determine number of columns from the first row
  const firstRowCols = Array.from(rows[0].querySelectorAll(':scope > div'));
  const numCols = firstRowCols.length;
  if (numCols === 0) return;

  // Header row: single cell (not matching the column count)
  const table = [['Columns']];

  // For each row, collect the column cell content (always numCols per row)
  rows.forEach((row) => {
    const cols = Array.from(row.querySelectorAll(':scope > div'));
    if (cols.length === numCols) {
      const rowCells = cols.map((col) => {
        // All child nodes (including text, elements)
        const children = Array.from(col.childNodes).filter(node => !(node.nodeType === Node.TEXT_NODE && node.textContent.trim() === ''));
        if (children.length === 1) return children[0];
        return children;
      });
      table.push(rowCells);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(table, document);
  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
