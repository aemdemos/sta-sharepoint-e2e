/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the given element
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the two main rows (each row is a <div> with two columns inside)
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (rowDivs.length !== 2) return;

  // For each row, extract its two column divs
  const row1Columns = Array.from(rowDivs[0].querySelectorAll(':scope > div'));
  const row2Columns = Array.from(rowDivs[1].querySelectorAll(':scope > div'));

  // Defensive: Only proceed if each row has exactly 2 columns
  if (row1Columns.length !== 2 || row2Columns.length !== 2) return;

  // Build the table rows
  const headerRow = ['Columns (columns3)'];
  const contentRow1 = [row1Columns[0], row1Columns[1]];
  const contentRow2 = [row2Columns[0], row2Columns[1]];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow1,
    contentRow2,
  ], document);
  element.replaceWith(table);
}
