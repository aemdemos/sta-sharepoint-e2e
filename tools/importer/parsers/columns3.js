/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block root (should be the .columns.block)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Each direct child <div> of .columns.block is a row (with two columns)
  const rows = Array.from(columnsBlock.children);
  if (rows.length < 2) return;

  // Header row
  const headerRow = ['Columns (columns3)'];

  // First row: left = text, right = image
  const firstRowCols = Array.from(rows[0].children);
  const firstRow = [firstRowCols[0], firstRowCols[1]];

  // Second row: left = image, right = text
  const secondRowCols = Array.from(rows[1].children);
  const secondRow = [secondRowCols[0], secondRowCols[1]];

  const cells = [
    headerRow,
    firstRow,
    secondRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
