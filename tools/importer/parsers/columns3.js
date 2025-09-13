/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row as required
  const headerRow = ['Columns (columns3)'];

  // Find the two main rows (each is a direct child div of the columns block)
  const rows = Array.from(element.querySelectorAll(':scope > div'));
  if (!rows.length) return;

  // For each row, collect its two columns (each is a div)
  const tableRows = rows.map(row => {
    const cols = Array.from(row.children);
    // For each column, collect its content as a fragment
    return cols.map(col => {
      // If the column is an image column, preserve the picture/img
      const imgCol = col.classList.contains('columns-img-col');
      if (imgCol) {
        // Reference the actual <picture> element (not clone)
        const pic = col.querySelector('picture');
        return pic || '';
      }
      // Otherwise, collect all child nodes (text, lists, buttons, etc.)
      const frag = document.createDocumentFragment();
      Array.from(col.childNodes).forEach(node => frag.appendChild(node));
      return frag;
    });
  });

  // Compose the table: header row, then each row
  const cells = [headerRow, ...tableRows];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original block with the table
  element.replaceWith(table);
}
