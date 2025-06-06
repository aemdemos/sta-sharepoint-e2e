/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block with class 'columns block'
  const block = element.querySelector('.columns.block');
  if (!block) return;
  // Get all immediate children (each row of columns)
  const rows = Array.from(block.querySelectorAll(':scope > div'));
  if (rows.length < 2) return;

  // First row: columns
  const firstRowCols = Array.from(rows[0].querySelectorAll(':scope > div'));
  // Second row: columns
  const secondRowCols = Array.from(rows[1].querySelectorAll(':scope > div'));

  // Make sure there are two columns per row (pad with empty divs if needed for robustness)
  while (firstRowCols.length < 2) firstRowCols.push(document.createElement('div'));
  while (secondRowCols.length < 2) secondRowCols.push(document.createElement('div'));

  // The header row must have two columns: header text then an empty string, for alignment
  const headerRow = ['Columns (columns3)', ''];

  const cells = [
    headerRow,
    [firstRowCols[0], firstRowCols[1]],
    [secondRowCols[0], secondRowCols[1]]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
