/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the block header matches the target block name exactly
  const headerRow = ['Columns (columns3)'];

  // Each direct child <div> of the columns block is a visual row
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  const tableRows = [];

  rows.forEach((rowDiv) => {
    // Each row has two columns (each a <div>)
    const cols = Array.from(rowDiv.children);
    const rowCells = [];
    cols.forEach((colDiv) => {
      // If this column is an image column (contains .columns-img-col)
      if (colDiv.classList.contains('columns-img-col')) {
        // Reference the actual image column element
        rowCells.push(colDiv);
      } else {
        // Otherwise, reference the actual content column element
        rowCells.push(colDiv);
      }
    });
    tableRows.push(rowCells);
  });

  // Compose the final table cells array
  const cells = [headerRow, ...tableRows];

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
