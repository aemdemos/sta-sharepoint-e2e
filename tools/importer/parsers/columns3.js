/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children divs
  const getDirectDivs = (el) => Array.from(el.querySelectorAll(':scope > div'));

  // The block header row
  const headerRow = ['Columns (columns3)'];

  // Defensive: find the main columns block (may be the element itself or a child)
  let columnsBlock = element;
  if (!columnsBlock.classList.contains('columns')) {
    columnsBlock = element.querySelector('.columns.block');
  }
  if (!columnsBlock) {
    // fallback: replace with empty block
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Get the main rows (each visual row in the screenshots)
  const rows = getDirectDivs(columnsBlock);

  // Defensive: If there are not at least 2 rows, fallback
  if (rows.length < 2) {
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // First visual row: 2 columns (left: text, right: image)
  const firstRowDivs = getDirectDivs(rows[0]);
  // Second visual row: 2 columns (left: image, right: text+button)
  const secondRowDivs = getDirectDivs(rows[1]);

  // Defensive: ensure both rows have 2 columns
  if (firstRowDivs.length < 2 || secondRowDivs.length < 2) {
    const table = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(table);
    return;
  }

  // Compose the table rows
  const tableRows = [headerRow];

  // First row: left column is text, right column is image
  tableRows.push([
    firstRowDivs[0], // left: text, list, button
    firstRowDivs[1]  // right: image
  ]);

  // Second row: left column is image, right column is text+button
  tableRows.push([
    secondRowDivs[0], // left: image
    secondRowDivs[1]  // right: text, button
  ]);

  // Create the table and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
