/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns block
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the rows of columns (the columns.block > div children)
  const rows = Array.from(columnsBlock.children);

  // For each row, collect its immediate children as columns
  const tableRows = rows.map(row => {
    // Each row is expected to have two divs (columns)
    const cols = Array.from(row.children);
    // If there are missing columns, fill with empty strings to keep the number of columns consistent
    return cols.length ? cols : [''];
  });

  // Number of columns is determined by the longest row (should be 2 for this example)
  const numCols = tableRows.reduce((max, row) => Math.max(max, row.length), 0);

  // Normalize all rows to have the same number of columns
  const normalizedRows = tableRows.map(row => {
    const filledRow = row.slice();
    while (filledRow.length < numCols) {
      filledRow.push('');
    }
    return filledRow;
  });

  // --- Manually build the table to ensure header uses colspan ---
  const table = document.createElement('table');

  // Header row: one cell, spans all columns
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.innerHTML = 'Columns (columns3)';
  if (numCols > 1) headerTh.colSpan = numCols;
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  // Body rows
  normalizedRows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      if (typeof cell === 'string') {
        td.innerHTML = cell;
      } else if (Array.isArray(cell)) {
        td.append(...cell);
      } else {
        td.append(cell);
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  // Replace the original element with the table
  element.replaceWith(table);
}
