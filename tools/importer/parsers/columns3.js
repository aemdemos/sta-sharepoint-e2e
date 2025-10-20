/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct header row
  const headerRow = ['Columns (columns3)'];
  const tableRows = [headerRow];

  // Find all top-level rows (each is a horizontal grouping of columns)
  const rows = Array.from(element.querySelectorAll(':scope > div'));

  // Each visual row should have two columns: one text/button, one image
  rows.forEach((row) => {
    // Find both columns in this row
    const columns = Array.from(row.children);
    // Prepare two cells for this row
    let leftCell = null;
    let rightCell = null;
    // Identify image and text columns by class
    columns.forEach((col) => {
      if (col.querySelector('.columns-img-col')) {
        const imgCol = col.querySelector('.columns-img-col');
        const picture = imgCol.querySelector('picture');
        rightCell = picture ? picture.cloneNode(true) : imgCol.cloneNode(true);
      } else {
        // Gather all content (text, lists, buttons) in a fragment
        const frag = document.createDocumentFragment();
        Array.from(col.childNodes).forEach((child) => {
          if (child.nodeType === 1 || (child.nodeType === 3 && child.textContent.trim())) {
            frag.appendChild(child.cloneNode(true));
          }
        });
        leftCell = frag.childNodes.length ? frag : col.cloneNode(true);
      }
    });
    // If both cells are present, add them in order: text, image
    if (leftCell && rightCell) {
      tableRows.push([leftCell, rightCell]);
    } else if (rightCell && leftCell === null) {
      // If only image, put image in left cell and empty right cell
      tableRows.push([rightCell, document.createTextNode('')]);
    } else if (leftCell && rightCell === null) {
      // If only text, put text in left cell and empty right cell
      tableRows.push([leftCell, document.createTextNode('')]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element
  element.replaceWith(block);
}
