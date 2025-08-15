/* global WebImporter */
export default function parse(element, { document }) {
  const block = element.querySelector(':scope > .columns.block');
  if (!block) return;

  // Each row is a div, each column inside it
  const rows = Array.from(block.children).filter(div => div.nodeType === 1);
  if (!rows.length) return;

  // Determine the max number of columns in any row for proper header colspan
  const maxCols = Math.max(...rows.map(rowDiv => Array.from(rowDiv.children).filter(col => col.nodeType === 1).length));

  // Compose data rows
  const tableRows = rows.map(rowDiv => {
    const columns = Array.from(rowDiv.children).filter(col => col.nodeType === 1);
    return columns.map(col => {
      if (col.classList.contains('columns-img-col')) {
        const pic = col.querySelector('picture');
        return pic || col;
      }
      return Array.from(col.childNodes);
    });
  });

  // Create the table header row with one cell: 'Columns', but set colspan to maxCols
  const th = document.createElement('th');
  th.textContent = 'Columns';
  if (maxCols > 1) th.setAttribute('colspan', maxCols);
  const headerRow = [th];

  // Compose the table
  const cells = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
