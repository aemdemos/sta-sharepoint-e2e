/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Always use the required header row
  const headerRow = ['Columns (columns3)'];

  // Find the columns block (the first child of the wrapper)
  const columnsBlock = element.querySelector(':scope > .columns.block');
  if (!columnsBlock) return;

  // Each direct child <div> of columnsBlock is a row
  const rows = Array.from(columnsBlock.children);
  if (rows.length < 2) return;

  // First row: two columns
  const firstRowCols = Array.from(rows[0].children);
  if (firstRowCols.length < 2) return;
  const firstCol = firstRowCols[0].cloneNode(true);
  const secondCol = firstRowCols[1].cloneNode(true);

  // Second row: two columns
  const secondRowCols = Array.from(rows[1].children);
  if (secondRowCols.length < 2) return;
  const thirdCol = secondRowCols[0].cloneNode(true);
  const fourthCol = secondRowCols[1].cloneNode(true);

  // Compose the table rows
  const tableRows = [
    headerRow,
    [firstCol, secondCol],
    [thirdCol, fourthCol],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the wrapper with the new block
  element.replaceWith(block);
}
