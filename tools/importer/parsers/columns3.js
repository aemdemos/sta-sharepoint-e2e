/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Get the two rows (each row is a direct child <div> of .columns.block)
  const rows = Array.from(block.children);
  if (rows.length < 2) return;

  // Header row
  const headerRow = ['Columns (columns3)'];

  // First content row (top row)
  const firstRowCols = Array.from(rows[0].children);
  // Left cell: all non-image content
  const leftCell1 = [];
  firstRowCols.forEach((col) => {
    if (!col.classList.contains('columns-img-col')) {
      leftCell1.push(...col.childNodes);
    }
  });
  // Right cell: image column
  const rightImgCol1 = rows[0].querySelector('.columns-img-col');
  const rightCell1 = rightImgCol1 ? [rightImgCol1] : [];

  // Second content row (bottom row)
  const secondRowCols = Array.from(rows[1].children);
  // Left cell: image column
  const leftImgCol2 = rows[1].querySelector('.columns-img-col');
  const leftCell2 = leftImgCol2 ? [leftImgCol2] : [];
  // Right cell: all non-image content
  const rightCell2 = [];
  secondRowCols.forEach((col) => {
    if (!col.classList.contains('columns-img-col')) {
      rightCell2.push(...col.childNodes);
    }
  });

  // Compose table rows
  const cells = [
    headerRow,
    [leftCell1, rightCell1],
    [leftCell2, rightCell2],
  ];

  // Create table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
