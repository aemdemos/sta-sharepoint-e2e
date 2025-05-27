/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Corrected header row to match the example exactly

  // Extract columns
  const columnElements = Array.from(element.querySelectorAll(':scope > div > div'));

  // Map each column to rows containing extracted content
  const rows = columnElements.map((column) => {
    const cells = [];

    // Extract image if present
    const imageWrapper = column.querySelector('.columns-img-col picture img');
    if (imageWrapper) {
      cells.push(imageWrapper); // Push the image element directly
    }

    // Extract text content
    const textWrapper = column.querySelector(':scope > div:not(.columns-img-col)');
    if (textWrapper) {
      const list = textWrapper.querySelector('ul');
      const button = textWrapper.querySelector('.button-container a');

      const textContent = [];
      if (list) {
        textContent.push(list); // Preserve semantic structure of the list
      }
      if (button) {
        textContent.push(button); // Include button in the same cell
      }

      cells.push(textContent); // Push the combined text content into the cell
    }

    return cells;
  });

  // Create and replace the block table
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}