/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all direct column groups (each group is a row of columns)
  const columnGroups = Array.from(columnsBlock.children);

  // Determine the number of columns by counting the children of the first group
  let numColumns = 0;
  if (columnGroups.length > 0) {
    numColumns = Array.from(columnGroups[0].children).length;
  }

  // Build the rows array for the table
  const rows = [];

  // Header row: create a <th> element that spans all columns
  const th = document.createElement('th');
  th.textContent = 'Columns';
  if (numColumns > 1) {
    th.setAttribute('colspan', numColumns);
  }
  rows.push([th]);

  // For each row of columns (each <div> inside .columns.block)
  columnGroups.forEach((group) => {
    // Each child of this group is a column (usually 2 per row)
    const columns = Array.from(group.children).map((col) => col);
    // Pad with empty strings if needed
    while (columns.length < numColumns) {
      columns.push('');
    }
    rows.push(columns);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
