/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate child divs
  const getImmediateDivs = (el) => Array.from(el.querySelectorAll(':scope > div'));

  // Defensive: find the actual columns block (sometimes wrapped)
  let columnsBlock = element;
  if (element.classList.contains('columns-wrapper')) {
    // Find the first child with class 'columns block'
    columnsBlock = element.querySelector(':scope > .columns.block');
    if (!columnsBlock) columnsBlock = element; // fallback
  }

  // Get the two main column groups (each is a div)
  const mainRows = getImmediateDivs(columnsBlock);
  // Defensive: only proceed if we have at least two main rows
  if (mainRows.length < 2) return;

  // First row: left (text), right (image)
  const firstRowDivs = getImmediateDivs(mainRows[0]);
  // Defensive: expect two columns
  const firstCol = firstRowDivs[0];
  const secondCol = firstRowDivs[1];

  // Second row: left (image), right (text)
  const secondRowDivs = getImmediateDivs(mainRows[1]);
  const thirdCol = secondRowDivs[0];
  const fourthCol = secondRowDivs[1];

  // Table header
  const headerRow = ['Columns (columns3)'];

  // First content row: left (text+list+button), right (image)
  const row1 = [
    firstCol,
    secondCol
  ];

  // Second content row: left (image), right (text+button)
  const row2 = [
    thirdCol,
    fourthCol
  ];

  // Build table
  const cells = [
    headerRow,
    row1,
    row2
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
