/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns3)'];

  // Find the two main rows (each is a direct child of the columns block)
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  const contentRows = [];

  // For each row, extract its two columns as cells for the table
  rows.forEach((rowDiv) => {
    const cols = Array.from(rowDiv.querySelectorAll(':scope > div'));
    if (cols.length === 2) {
      const rowCells = cols.map((colDiv) => {
        // If column contains only a <picture>, use the picture
        if (colDiv.classList.contains('columns-img-col')) {
          const picture = colDiv.querySelector('picture');
          if (picture) return picture;
        }
        // Otherwise, gather all direct children into a fragment
        const frag = document.createDocumentFragment();
        Array.from(colDiv.childNodes).forEach((child) => {
          frag.appendChild(child.cloneNode(true));
        });
        return frag;
      });
      contentRows.push(rowCells);
    }
  });

  // Build the table: header + two content rows (each with two columns)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...contentRows
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
