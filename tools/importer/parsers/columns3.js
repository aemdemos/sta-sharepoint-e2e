/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the two top-level rows (each row is a direct child div of .columns.block)
  const topRows = Array.from(columnsBlock.children);
  if (topRows.length < 2) return;

  // Header row
  const headerRow = ['Columns (columns3)'];

  // --- First visual row ---
  // Left: text, Right: image
  const firstRow = topRows[0];
  const firstCols = Array.from(firstRow.children);
  if (firstCols.length < 2) return;
  const leftCell1 = firstCols[0];
  const rightCell1 = firstCols[1].querySelector('picture, img') || firstCols[1];

  // --- Second visual row ---
  // Left: image, Right: text
  const secondRow = topRows[1];
  const secondCols = Array.from(secondRow.children);
  if (secondCols.length < 2) return;
  const leftCell2 = secondCols[0].querySelector('picture, img') || secondCols[0];
  const rightCell2 = secondCols[1];

  // Compose table rows
  const rows = [
    headerRow,
    [leftCell1, rightCell1],
    [leftCell2, rightCell2],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
