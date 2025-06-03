/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Rows of the columns block
  const rowDivs = Array.from(columnsBlock.children);
  if (rowDivs.length < 2) return;

  // Cells for each content row
  const firstRowCells = Array.from(rowDivs[0].children);
  const secondRowCells = Array.from(rowDivs[1].children);

  const numCols = firstRowCells.length;

  // Instead of passing a <th> element (which causes nested <th>),
  // pass a string as the single cell, and let WebImporter.DOMUtils.createTable
  // handle creation of the <th> with appropriate colspan
  // It is assumed that createTable will generate a single <th colspan=numCols>
  // This matches the desired output structure
  const headerRow = ['Columns (columns3)'];
  const tableData = [headerRow, firstRowCells, secondRowCells];

  const table = WebImporter.DOMUtils.createTable(tableData, document);
  // Adjust the header row's <th> colspan if needed
  const th = table.querySelector('tr:first-child th');
  if (th && numCols > 1) {
    th.setAttribute('colspan', numCols);
  }

  element.replaceWith(table);
}
