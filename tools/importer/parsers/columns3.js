/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block inside the wrapper (should be only one)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Table header matches the block name and variant
  const headerRow = ['Columns (columns3)'];
  const contentRows = [];

  // Each direct child <div> of the columns block is a "row" in the columns grid
  const rowDivs = Array.from(columnsBlock.querySelectorAll(':scope > div'));

  for (const rowDiv of rowDivs) {
    // Each rowDiv has a set of <div>s for columns in this row
    const columnDivs = Array.from(rowDiv.querySelectorAll(':scope > div'));
    // Defensive: If no divs, treat the rowDiv itself as a single column
    if (columnDivs.length === 0) {
      contentRows.push([rowDiv]);
    } else {
      contentRows.push(columnDivs);
    }
  }

  // Compose the final table structure
  const tableRows = [headerRow, ...contentRows];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
