/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns (columns3)
  const headerRow = ['Columns (columns3)'];

  // Find the main columns block
  const mainBlock = element.querySelector('.columns.block');
  if (!mainBlock) return;

  // Each direct child of mainBlock is a row (with 2 columns)
  const rows = [];
  Array.from(mainBlock.children).forEach((rowDiv) => {
    // Each rowDiv contains two columns (divs)
    const columns = Array.from(rowDiv.children);
    if (columns.length >= 2) {
      const rowCells = columns.map((col) => {
        // If the column is just an image column, use the picture/img directly
        if (col.classList.contains('columns-img-col')) {
          const picture = col.querySelector('picture');
          if (picture) return picture;
          const img = col.querySelector('img');
          if (img) return img;
        }
        // Otherwise, preserve all child nodes as a fragment
        const frag = document.createDocumentFragment();
        Array.from(col.childNodes).forEach((child) => {
          frag.appendChild(child.cloneNode(true));
        });
        return frag;
      });
      rows.push(rowCells);
    }
  });

  // Build the table: header row, then each row
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
