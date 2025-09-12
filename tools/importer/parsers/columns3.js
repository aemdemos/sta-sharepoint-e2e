/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Find the main columns block (the one with columns-2-cols)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the two rows (each is a direct child div of columnsBlock)
  const rows = Array.from(columnsBlock.children);
  if (rows.length < 2) return;

  // Header row as per spec
  const headerRow = ['Columns (columns3)'];

  // First row: left (text), right (image)
  const firstRowDivs = Array.from(rows[0].children);
  const firstRowCells = [firstRowDivs[0], firstRowDivs[1]];

  // Second row: left (image), right (text)
  const secondRowDivs = Array.from(rows[1].children);
  const secondRowCells = [secondRowDivs[0], secondRowDivs[1]];

  // Compose table data
  const tableData = [
    headerRow,
    firstRowCells,
    secondRowCells,
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original wrapper with the block
  element.replaceWith(block);
}
