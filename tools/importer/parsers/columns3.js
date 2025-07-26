/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block (should be a child of element)
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Get all immediate child divs of the block (each is a row of columns)
  const rowDivs = block.querySelectorAll(':scope > div');

  // Calculate the max number of columns in any content row
  let maxCols = 0;
  rowDivs.forEach((rowDiv) => {
    const colDivs = rowDiv.querySelectorAll(':scope > div');
    if (colDivs.length > maxCols) maxCols = colDivs.length;
  });
  if (maxCols === 0) maxCols = 1;

  // Prepare the rows for the table
  const tableRows = [];

  // We'll generate the table manually to ensure proper colspan is applied to header
  const table = document.createElement('table');

  // Header row with single cell spanning all columns
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns';
  if (maxCols > 1) {
    th.colSpan = maxCols;
  }
  trHeader.appendChild(th);
  table.appendChild(trHeader);

  // For each rowDiv, gather its direct children as columns
  rowDivs.forEach((rowDiv) => {
    const colDivs = rowDiv.querySelectorAll(':scope > div');
    const tr = document.createElement('tr');
    colDivs.forEach((colDiv) => {
      const td = document.createElement('td');
      td.append(colDiv);
      tr.appendChild(td);
    });
    // If this row has fewer columns, fill with empty cells to maintain structure
    for (let i = colDivs.length; i < maxCols; i += 1) {
      const td = document.createElement('td');
      tr.appendChild(td);
    }
    table.appendChild(tr);
  });

  // Replace the original columns-wrapper element with the table
  element.replaceWith(table);
}
