/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual block containing the columns (may be element itself or a descendant)
  const block = element.querySelector('.columns.block') || element;

  // Get all immediate child divs (each represents a row)
  const rows = Array.from(block.children).filter((r) => r.tagName === 'DIV');

  // Collect table rows
  const tableRows = [];
  rows.forEach(row => {
    // Get direct children (columns)
    const cols = Array.from(row.children).filter((c) => c.tagName === 'DIV');
    if (cols.length === 2) {
      tableRows.push([cols[0], cols[1]]);
    }
  });

  const colCount = tableRows.length > 0 ? tableRows[0].length : 1;

  // Header row - must be a single cell spanning all columns
  // We'll add a special object to signal colspan.
  const th = document.createElement('th');
  th.textContent = 'Columns';
  th.colSpan = colCount;
  const headerRow = [th];

  const cells = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix the first header row to have colspan attribute (since createTable will not do this automatically)
  // (If WebImporter.DOMUtils.createTable already supports colSpan, this is not needed. Otherwise, we fix it.)
  const tableEl = table;
  const header = tableEl.querySelector('tr:first-child th');
  if (header && colCount > 1) {
    header.setAttribute('colspan', colCount);
    // Remove any extra th (should only be one)
    let thSibling = header.nextElementSibling;
    while (thSibling) {
      const toRemove = thSibling;
      thSibling = thSibling.nextElementSibling;
      toRemove.remove();
    }
  }

  element.replaceWith(tableEl);
}
