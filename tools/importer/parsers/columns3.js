/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns block (could be element or its child)
  let columnsBlock = element;
  if (!columnsBlock.classList.contains('columns')) {
    columnsBlock = element.querySelector('.columns');
  }
  if (!columnsBlock) return;

  // Header row: single column, exactly as the example
  const headerRow = ['Columns (columns3)'];

  // Each row in the columns block is a <div> containing two <div>s for left/right content
  const rows = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  const tableRows = rows.map(row => {
    // Collect all column divs for this row
    const cols = Array.from(row.children);
    // Combine them into a single cell (one column)
    // This preserves the original elements and their order
    return [cols];
  });

  // Compose the table: header + each row as a single column
  const cells = [headerRow, ...tableRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
