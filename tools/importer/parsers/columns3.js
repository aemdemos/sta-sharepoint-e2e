/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block within the wrapper
  const block = element.querySelector('.columns.block');
  if (!block) return;

  // Get all rows (each row is a direct child of block)
  const rows = Array.from(block.children).filter(row => row.nodeType === 1);
  if (rows.length === 0) return;

  // Get number of columns from the first row
  const firstRow = rows[0];
  const columnsInFirstRow = Array.from(firstRow.children).filter(col => col.nodeType === 1);
  const colCount = columnsInFirstRow.length;

  // Compose content rows (arrays of elements for each row)
  const contentRows = rows.map(row => {
    const cols = Array.from(row.children).filter(col => col.nodeType === 1);
    const cells = [];
    for (let i = 0; i < colCount; i++) {
      if (cols[i]) {
        cells.push(cols[i]);
      } else {
        cells.push('');
      }
    }
    return cells;
  });

  // Create the table manually to support <th colspan>
  const table = document.createElement('table');

  // Header row with a single th spanning all columns
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns';
  if (colCount > 1) th.setAttribute('colspan', String(colCount));
  trHeader.appendChild(th);
  table.appendChild(trHeader);

  // Add content rows
  contentRows.forEach(rowCells => {
    const tr = document.createElement('tr');
    rowCells.forEach(cell => {
      const td = document.createElement('td');
      if (typeof cell === 'string') {
        td.innerHTML = cell;
      } else if (Array.isArray(cell)) {
        td.append(...cell);
      } else if (cell) {
        td.append(cell);
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  element.replaceWith(table);
}
