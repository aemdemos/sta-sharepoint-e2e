/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Find all column groups (each group is a row)
  const columnGroups = Array.from(columnsBlock.children);
  if (columnGroups.length === 0) return;

  // Determine the correct number of columns
  let numColumns = 0;
  for (const group of columnGroups) {
    const colCount = Array.from(group.children).length;
    if (colCount > numColumns) numColumns = colCount;
  }
  if (numColumns < 2) numColumns = 2; // fallback to 2 columns if unexpected structure

  // Build header row: first cell 'Columns', rest of the cells are empty
  const headerRow = ['Columns'];
  while (headerRow.length < numColumns) {
    headerRow.push('');
  }

  // Build all content rows
  const rows = [headerRow];
  columnGroups.forEach(group => {
    const groupChildren = Array.from(group.children);
    const cells = groupChildren.map(col => {
      if (col.classList.contains('columns-img-col')) {
        const picture = col.querySelector('picture');
        return picture ? picture : col;
      } else if (col.children.length === 1) {
        return col.children[0];
      } else {
        return Array.from(col.children);
      }
    });
    // Pad to numColumns
    while (cells.length < numColumns) {
      cells.push('');
    }
    rows.push(cells);
  });

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
