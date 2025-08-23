/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const columnsBlock = element.querySelector('[data-block-name="columns"]');
  if (!columnsBlock) return;

  // Get all direct children (column groups)
  const groups = Array.from(columnsBlock.children);

  // For each group, collect its direct children as columns
  let maxCols = 0;
  const rowCells = groups.map((group) => {
    const cols = Array.from(group.children);
    maxCols = Math.max(maxCols, cols.length);
    return cols;
  });

  // Pad rows to match maxCols if necessary (to handle uneven column counts)
  const normalizedRows = rowCells.map((row) => {
    if (row.length < maxCols) {
      return row.concat(Array(maxCols - row.length).fill(''));
    }
    return row;
  });

  // Create table manually to ensure <th> has correct colspan
  const table = document.createElement('table');
  // Header row
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns';
  th.colSpan = maxCols;
  trHeader.appendChild(th);
  table.appendChild(trHeader);
  // Data rows
  normalizedRows.forEach((row) => {
    const tr = document.createElement('tr');
    row.forEach((cell) => {
      const td = document.createElement('td');
      if (cell) {
        if (typeof cell === 'string') {
          td.innerHTML = cell;
        } else if (Array.isArray(cell)) {
          td.append(...cell);
        } else {
          td.append(cell);
        }
      }
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  // Replace the original element with the new block table
  element.replaceWith(table);
}
