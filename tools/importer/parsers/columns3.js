/* global WebImporter */
export default function parse(element, { document }) {
  // Only target the correct columns block
  if (!element || !element.classList.contains('columns')) return;

  // Header row as required
  const headerRow = ['Columns (columns3)'];

  // Get the two main visual rows (each direct child <div> of .columns)
  const mainRows = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];

  // First row: left (text), right (image)
  if (mainRows[0]) {
    const leftCol = [];
    let rightCol = null;
    Array.from(mainRows[0].children).forEach((child) => {
      if (child.classList.contains('columns-img-col')) {
        rightCol = child;
      } else {
        leftCol.push(child);
      }
    });
    rows.push([
      leftCol.length === 1 ? leftCol[0] : leftCol,
      rightCol,
    ]);
  }

  // Second row: left (image), right (text)
  if (mainRows[1]) {
    let leftCol = null;
    const rightCol = [];
    Array.from(mainRows[1].children).forEach((child) => {
      if (child.classList.contains('columns-img-col')) {
        leftCol = child;
      } else {
        rightCol.push(child);
      }
    });
    rows.push([
      leftCol,
      rightCol.length === 1 ? rightCol[0] : rightCol,
    ]);
  }

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  if (table) {
    element.replaceWith(table);
  }
}
