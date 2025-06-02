/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Extract header row dynamically and ensure it matches the example
  const headerRow = ['Columns (columns3)'];

  // Initialize rows array to store content rows
  const rows = [];

  // Extract all immediate children of the main block
  const columnBlocks = Array.from(element.querySelectorAll(':scope > div > div'));

  // Iterate over each column block to extract content
  columnBlocks.forEach((block) => {
    const cells = [];

    // Extract the image column
    const imageCol = block.querySelector('picture');
    if (imageCol) {
      cells.push(imageCol);
    }

    // Extract the text column
    const textCol = block.querySelector(':scope > div:not(.columns-img-col)');
    if (textCol) {
      cells.push(textCol);
    }

    // Add content cells to rows array
    rows.push(cells);
  });

  // Ensure table data matches example structure
  const tableData = [headerRow, ...rows];

  // Create block table using WebImporter helper method
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the generated block table
  element.replaceWith(blockTable);
}