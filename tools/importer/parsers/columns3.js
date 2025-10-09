/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns3)'];
  const cells = [headerRow];

  // Find the two main rows (each is a direct child div of the columns block)
  const mainRows = Array.from(element.querySelectorAll(':scope > div'));

  // First visual row: left=text, right=image
  if (mainRows.length > 0) {
    const rowDivs = Array.from(mainRows[0].querySelectorAll(':scope > div'));
    if (rowDivs.length === 2) {
      // First row: left=text, right=image
      const row = [];
      // left cell: text
      const leftCell = document.createElement('div');
      Array.from(rowDivs[0].childNodes).forEach(child => {
        leftCell.appendChild(child.cloneNode(true));
      });
      row.push(leftCell);
      // right cell: image
      const rightCell = document.createElement('div');
      Array.from(rowDivs[1].childNodes).forEach(child => {
        rightCell.appendChild(child.cloneNode(true));
      });
      row.push(rightCell);
      cells.push(row);
    }
  }

  // Second visual row: left=image, right=text
  if (mainRows.length > 1) {
    const rowDivs = Array.from(mainRows[1].querySelectorAll(':scope > div'));
    if (rowDivs.length === 2) {
      const row = [];
      // left cell: image
      const leftCell = document.createElement('div');
      Array.from(rowDivs[0].childNodes).forEach(child => {
        leftCell.appendChild(child.cloneNode(true));
      });
      row.push(leftCell);
      // right cell: text
      const rightCell = document.createElement('div');
      Array.from(rowDivs[1].childNodes).forEach(child => {
        rightCell.appendChild(child.cloneNode(true));
      });
      row.push(rightCell);
      cells.push(row);
    }
  }

  // Only output the header and the two rows (no extra empty rows)
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
