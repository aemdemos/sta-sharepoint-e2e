/* global WebImporter */
export default function parse(element, { document }) {
  // Always start with the header row
  const headerRow = ['Columns (columns3)'];
  const cells = [headerRow];

  // Select the two main visual rows
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  if (rows.length >= 2) {
    // First row: text/list/button and image
    const firstRowCols = Array.from(rows[0].children);
    // Second row: image and text/button
    const secondRowCols = Array.from(rows[1].children);

    // Row 1, Col 1: all content (text, list, button)
    let row1col1 = '';
    if (firstRowCols[0]) {
      // Get all text content, including lists and buttons
      row1col1 = firstRowCols[0].textContent.trim();
    }
    // Row 1, Col 2: image (picture)
    let row1col2 = '';
    if (firstRowCols[1]) {
      const pic = firstRowCols[1].querySelector('picture');
      if (pic) row1col2 = pic;
    }
    cells.push([row1col1, row1col2]);

    // Row 2, Col 1: image (picture)
    let row2col1 = '';
    if (secondRowCols[0]) {
      const pic = secondRowCols[0].querySelector('picture');
      if (pic) row2col1 = pic;
    }
    // Row 2, Col 2: all content (text, button)
    let row2col2 = '';
    if (secondRowCols[1]) {
      row2col2 = secondRowCols[1].textContent.trim();
    }
    cells.push([row2col1, row2col2]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
