/* global WebImporter */

export default function parse(element, { document }) {
  // Define the header row exactly as specified in the example
  const headerRow = ['Columns (columns3)'];

  const rows = [];

  // Query direct child divs within the element
  const columns = element.querySelectorAll(':scope > div > div');

  columns.forEach((column) => {
    const combinedContent = [];

    // Check for images and add them to combined content
    const imageCol = column.querySelector('.columns-img-col picture');
    if (imageCol) {
      combinedContent.push(imageCol);
    }

    // Check for text content and add it to combined content
    const textCol = column.querySelector(':scope > div:not(.columns-img-col)');
    if (textCol) {
      Array.from(textCol.children).forEach((child) => {
        combinedContent.push(child);
      });
    }

    // Push combined content for the column as a single cell
    rows.push([combinedContent]);
  });

  const tableData = [headerRow, ...rows];

  // Create the block table and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}