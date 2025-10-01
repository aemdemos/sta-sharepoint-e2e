/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children divs
  const getDirectDivs = (el) => Array.from(el.querySelectorAll(':scope > div'));

  // Find the main columns block inside the wrapper
  let columnsBlock = element;
  if (element.classList.contains('columns-wrapper')) {
    columnsBlock = element.querySelector('.columns.block');
  }

  // Get the top-level column groups (each group is a row visually)
  const rowGroups = getDirectDivs(columnsBlock);

  // Defensive: If no rowGroups, fallback to children
  if (rowGroups.length === 0) {
    return;
  }

  // Table header
  const headerRow = ['Columns (columns3)'];

  // We'll build rows for the table
  const tableRows = [];

  // For each rowGroup, extract its columns
  rowGroups.forEach((rowGroup) => {
    const columns = getDirectDivs(rowGroup);
    // Defensive: If no columns, treat rowGroup itself as a column
    const cells = (columns.length > 0 ? columns : [rowGroup]).map((col) => {
      // If column is an image column, just use its content
      if (col.classList.contains('columns-img-col')) {
        // Use the picture element if present
        const picture = col.querySelector('picture');
        if (picture) return picture;
        // Fallback: use the column itself
        return col;
      } else {
        // Otherwise, collect all direct children (paragraphs, lists, buttons)
        // Defensive: If only one child, use it directly
        const children = Array.from(col.childNodes).filter(node => {
          // Only keep elements (not text nodes)
          return node.nodeType === 1;
        });
        if (children.length === 1) return children[0];
        if (children.length > 1) return children;
        // Fallback: use the column itself
        return col;
      }
    });
    tableRows.push(cells);
  });

  // Ensure all rows have the same number of columns as the first content row
  const numColumns = tableRows[0].length;
  tableRows.forEach((row, idx) => {
    if (row.length < numColumns) {
      // Pad with empty strings if needed
      for (let i = row.length; i < numColumns; i++) {
        row.push('');
      }
    }
  });

  // Compose the table data
  const tableData = [headerRow, ...tableRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
