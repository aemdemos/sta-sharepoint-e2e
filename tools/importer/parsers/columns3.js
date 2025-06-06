/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns block (immediate child with .columns.block)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all visible rows
  const rows = Array.from(columnsBlock.children);
  if (rows.length === 0) return;

  // Collect column content arrays for each row
  const rowCols = rows.map((row) => {
    return Array.from(row.children).map((col) => {
      // If the col is only a wrapper for an image, use its <picture> element if present
      const pic = col.querySelector(':scope > picture');
      if (pic) return pic;
      return col;
    });
  });

  // Find the maximum number of columns
  const maxCols = Math.max(...rowCols.map(cols => cols.length));
  // Pad content rows to ensure uniform column count
  rowCols.forEach((cols) => {
    while (cols.length < maxCols) cols.push('');
  });

  // Create the header row as a single cell array
  const headerRow = ['Columns (columns3)'];

  // Compose final cells array
  const cells = [headerRow, ...rowCols];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
