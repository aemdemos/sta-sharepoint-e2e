/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block
  let block = element.querySelector('.block.columns');
  if (!block && element.classList.contains('block') && element.classList.contains('columns')) {
    block = element;
  }
  if (!block) return;

  // Each row is a direct child div of the block
  const blockRows = Array.from(block.children).filter(row => row.tagName === 'DIV');
  if (blockRows.length === 0) return;

  // Get the max number of columns in any row (for colspan)
  let maxColumns = 1;
  const contentRows = [];

  blockRows.forEach(row => {
    const cols = Array.from(row.children).filter(
      col => col.tagName === 'DIV' || col.classList.contains('columns-img-col')
    );
    if (cols.length > 0) {
      contentRows.push(cols);
      if (cols.length > maxColumns) maxColumns = cols.length;
    } else {
      contentRows.push([row]);
    }
  });

  // Build the table manually so we can set colspan on header
  const table = document.createElement('table');

  // Header row with colspan
  const theadTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns';
  if (maxColumns > 1) {
    th.setAttribute('colspan', maxColumns);
  }
  theadTr.appendChild(th);
  table.appendChild(theadTr);

  // Add content rows
  contentRows.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.append(cell);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });

  element.replaceWith(table);
}
