/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row
  const headerRow = ['Columns (columns3)'];

  const rows = [];

  // Extract immediate child divs of the block
  const blockDivs = Array.from(element.querySelectorAll(':scope > div > div'));

  blockDivs.forEach((blockDiv) => {
    const columns = Array.from(blockDiv.querySelectorAll(':scope > div'));

    const extractedRow = columns.map((column) => {
      const paragraphElements = Array.from(column.querySelectorAll('p'));
      const listElements = column.querySelector('ul');
      const button = column.querySelector('.button-container');

      const imageElement = column.querySelector('img');

      const combinedContent = [
        ...paragraphElements,
        listElements,
        button,
        imageElement,
      ].filter(Boolean); // Ensure no null elements

      // If no valid content is found, provide fallback text
      return combinedContent.length > 0 ? combinedContent : document.createTextNode('No content available');
    });

    rows.push(extractedRow);
  });

  // Create the table
  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(blockTable);
}