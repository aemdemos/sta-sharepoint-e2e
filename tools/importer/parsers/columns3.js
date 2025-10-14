/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const columnsBlock = element.querySelector(':scope > .columns.block');
  if (!columnsBlock) return;

  // Get the two main rows (each with two columns)
  const rows = Array.from(columnsBlock.children).filter(child => child.tagName === 'DIV');
  if (rows.length < 2) return;

  // First row columns
  const firstRowCols = Array.from(rows[0].children).filter(child => child.tagName === 'DIV');
  // Second row columns
  const secondRowCols = Array.from(rows[1].children).filter(child => child.tagName === 'DIV');

  // Defensive: expect 2 columns per row
  if (firstRowCols.length !== 2 || secondRowCols.length !== 2) return;

  // Build table rows
  const headerRow = ['Columns (columns3)'];
  const tableRows = [
    headerRow,
    [firstRowCols[0], firstRowCols[1]],
    [secondRowCols[0], secondRowCols[1]],
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
