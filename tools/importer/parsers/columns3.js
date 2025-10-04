/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block (should be the first .columns block)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the two rows (each row is a direct child div of .columns.block)
  const rows = Array.from(columnsBlock.children);
  if (rows.length < 2) return;

  // Header row
  const headerRow = ['Columns (columns3)'];

  // --- First row ---
  // Each row has two columns (divs)
  const firstRowCols = Array.from(rows[0].children);
  if (firstRowCols.length < 2) return;
  const leftCell1 = document.createElement('div');
  Array.from(firstRowCols[0].children).forEach(child => leftCell1.appendChild(child.cloneNode(true)));
  const rightPicture1 = firstRowCols[1].querySelector('picture');
  const rightCell1 = document.createElement('div');
  if (rightPicture1) rightCell1.appendChild(rightPicture1.cloneNode(true));

  // --- Second row ---
  const secondRowCols = Array.from(rows[1].children);
  if (secondRowCols.length < 2) return;
  const leftPicture2 = secondRowCols[0].querySelector('picture');
  const leftCell2 = document.createElement('div');
  if (leftPicture2) leftCell2.appendChild(leftPicture2.cloneNode(true));
  const rightCell2 = document.createElement('div');
  Array.from(secondRowCols[1].children).forEach(child => rightCell2.appendChild(child.cloneNode(true)));

  // Compose table rows
  const tableRows = [
    headerRow,
    [leftCell1, rightCell1],
    [leftCell2, rightCell2],
  ];

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
