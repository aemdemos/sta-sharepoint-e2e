/* global WebImporter */
export default function parse(element, { document }) {
  // Get all the rows (direct children of columns block)
  const rowDivs = Array.from(element.querySelectorAll(':scope > div'));
  if (rowDivs.length === 0) return;

  // Each rowDiv is a layout row, with n columns inside
  // We want to produce: [ [header], [row1col1, row1col2, ...], [row2col1, row2col2, ...], ... ]
  const tableRows = [['Columns']];

  for (let i = 0; i < rowDivs.length; i++) {
    const colDivs = Array.from(rowDivs[i].querySelectorAll(':scope > div'));
    // For each column in this row, place the proper element (picture/img or content div)
    const rowCells = colDivs.map(col => {
      if (col.classList.contains('columns-img-col')) {
        // Use the <picture> or <img> inside
        const picture = col.querySelector('picture');
        if (picture) return picture;
        const img = col.querySelector('img');
        if (img) return img;
      }
      // Otherwise, use the div itself (text content)
      return col;
    });
    tableRows.push(rowCells);
  }

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
