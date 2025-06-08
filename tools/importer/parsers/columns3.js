/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .columns.block (the actual columns block)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get each row: each direct > div under columns.block represents a row
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));
  if (rowDivs.length === 0) return;

  // Table header (must match example exactly)
  const headerRow = ['Columns (columns3)'];

  // For each visual row, collect the column block divs (each is a column)
  const tableRows = rowDivs.map(rowDiv => {
    // Each column is a direct > div under the rowDiv
    // If there are no direct > div children, treat rowDiv itself as a column (edge case safety)
    const colDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    if (colDivs.length === 0) return [rowDiv];
    return colDivs;
  });

  // Compose table array
  const tableArray = [headerRow, ...tableRows];

  // Create the table using referenced DOM nodes
  const table = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element
  element.replaceWith(table);
}
