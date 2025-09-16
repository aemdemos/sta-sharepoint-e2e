/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns (columns3)'];

  // Find the columns block (the first .columns.block inside the wrapper)
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Each direct child div of .columns.block is a row
  const rows = Array.from(block.children);
  if (rows.length < 2) return;

  // First row: two columns
  const firstRowDivs = Array.from(rows[0].children);
  const firstRowCells = [firstRowDivs[0], firstRowDivs[1]];

  // Second row: two columns
  const secondRowDivs = Array.from(rows[1].children);
  const secondRowCells = [secondRowDivs[0], secondRowDivs[1]];

  // Compose cells array
  const cells = [
    headerRow,
    firstRowCells,
    secondRowCells,
  ];

  // Create table and replace the wrapper
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
