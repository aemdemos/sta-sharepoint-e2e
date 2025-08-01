/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Find all immediate child rows
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));

  // Find the max number of columns in any row
  let maxCols = 1;
  const contentRows = rowDivs.map((rowDiv) => {
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    if (colDivs.length > maxCols) maxCols = colDivs.length;
    return colDivs.length > 0 ? colDivs : [rowDiv];
  });

  // All content rows, using exactly maxCols cells each (filling with empty if missing)
  const tableRows = [];
  contentRows.forEach((cols) => {
    const row = [];
    for (let i = 0; i < maxCols; i += 1) {
      row.push(cols[i] || '');
    }
    tableRows.push(row);
  });

  // Create the block table WITHOUT header row
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Create a header row with a th cell and set colspan
  const tr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns';
  if (maxCols > 1) {
    th.setAttribute('colspan', maxCols);
  }
  tr.appendChild(th);

  // Insert the header row at the top of the table
  table.insertBefore(tr, table.firstChild);

  // Replace the original element
  element.replaceWith(table);
}
