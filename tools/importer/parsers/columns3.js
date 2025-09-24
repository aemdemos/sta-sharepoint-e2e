/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Each direct child of .columns.block is a row (2 rows visually)
  const columnGroups = Array.from(columnsBlock.children);
  const rows = [];
  // Always start with the block name as header
  rows.push(['Columns (columns3)']);

  columnGroups.forEach((group) => {
    // Each group contains 2 columns (visually left/right)
    const cols = Array.from(group.children);
    // Defensive: If there are not exactly 2 columns, skip
    if (cols.length !== 2) return;
    // For each column, extract its content
    const row = cols.map((col) => {
      // If the column is an image column, use the <picture> element directly
      if (col.classList.contains('columns-img-col')) {
        const picture = col.querySelector('picture');
        if (picture) return picture;
        return col;
      }
      // Otherwise, use the column as is (contains text, lists, buttons)
      return col;
    });
    rows.push(row);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
