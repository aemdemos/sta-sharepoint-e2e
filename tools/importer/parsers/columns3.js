/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns3)'];
  const tableRows = [headerRow];

  // Find the main content block (the columns block)
  const columnsBlock = element.querySelector('.columns.block');
  if (!columnsBlock) return;

  // Get the two main rows inside the columns block
  const mainRows = Array.from(columnsBlock.children);
  // Defensive: Only proceed if there are exactly two main rows
  if (mainRows.length !== 2) return;

  // For each main row
  mainRows.forEach((mainRow) => {
    // Each main row should have two columns
    const cols = Array.from(mainRow.children);
    if (cols.length !== 2) return;
    const cells = cols.map((col) => {
      // If image column, use the picture element
      const imgCol = col.querySelector('.columns-img-col');
      if (imgCol) {
        const pic = imgCol.querySelector('picture');
        if (pic) return pic;
      }
      // Otherwise, collect all content (including text, lists, buttons, and text nodes)
      const fragment = document.createDocumentFragment();
      Array.from(col.childNodes).forEach((child) => {
        if (child.nodeType === 1 || (child.nodeType === 3 && child.textContent.trim())) {
          fragment.appendChild(child);
        }
      });
      return fragment;
    });
    tableRows.push(cells);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the original element
  element.replaceWith(block);
}
