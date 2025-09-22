/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main rows (each row is a div child of .columns block)
  const rows = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: expect two rows
  // Row 1: left=text, right=image
  // Row 2: left=image, right=text

  // --- Header row ---
  const headerRow = ['Columns (columns3)'];

  // --- Row 1 ---
  let row1 = [];
  if (rows[0]) {
    const cols = Array.from(rows[0].querySelectorAll(':scope > div'));
    if (cols[0] && cols[1]) {
      row1 = [cols[0], cols[1]];
    }
  }

  // --- Row 2 ---
  let row2 = [];
  if (rows[1]) {
    const cols = Array.from(rows[1].querySelectorAll(':scope > div'));
    if (cols[0] && cols[1]) {
      row2 = [cols[0], cols[1]];
    }
  }

  // Compose table, only include non-empty rows
  const tableRows = [headerRow];
  if (row1.length === 2) tableRows.push(row1);
  if (row2.length === 2) tableRows.push(row2);

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
