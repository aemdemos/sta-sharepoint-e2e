/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual block with columns
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all direct child divs of the block (each represents a row of columns)
  const rows = Array.from(columnsBlock.children);

  // Determine number of columns by inspecting first content row
  let numCols = 0;
  if (rows.length > 0) {
    numCols = rows[0].children.length;
  }

  // Table header row: must be exactly one cell, spanning all columns
  // WebImporter.DOMUtils.createTable will render a <th> in a tr with one cell
  const headerRow = ['Columns'];
  const tableRows = [headerRow];

  // For each row of columns, build the cells array
  rows.forEach(row => {
    const columns = Array.from(row.children);
    const cells = columns.map(col => {
      // If it's an image column, use the <picture> element directly
      if (col.classList.contains('columns-img-col')) {
        const pic = col.querySelector('picture');
        if (pic) return pic;
      }
      // Otherwise, include all element children
      const contentEls = Array.from(col.childNodes).filter(
        node => node.nodeType === Node.ELEMENT_NODE
      );
      if (contentEls.length === 1) {
        return contentEls[0];
      } else if (contentEls.length > 1) {
        return contentEls;
      } else {
        return '';
      }
    });
    // If less columns than numCols, pad with empty string
    while (cells.length < numCols) {
      cells.push('');
    }
    tableRows.push(cells);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
