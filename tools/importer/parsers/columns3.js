/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get all direct child divs of the columns block (should be 2 rows)
  const rowDivs = Array.from(columnsBlock.children);
  if (rowDivs.length < 2) return;

  // The header row, always a single cell
  const headerRow = ['Columns'];

  // First row: [columns block (text), green image]
  // Second row: [yellow image, preview text/link]

  // Get left and right columns of first row
  const firstRowLeft = rowDivs[0].children[0];
  const firstRowRight = rowDivs[0].children[1];

  // Get left and right columns of second row
  const secondRowLeft = rowDivs[1].children[0];
  const secondRowRight = rowDivs[1].children[1];

  const tableData = [
    headerRow,
    [firstRowLeft, firstRowRight],
    [secondRowLeft, secondRowRight],
  ];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
