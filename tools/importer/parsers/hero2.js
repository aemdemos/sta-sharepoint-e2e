/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero2)'];

  // Extract content from the given element
  const heroWrapper = element.querySelector(':scope > div.hero-wrapper');
  const imageElement = heroWrapper.querySelector('picture img');
  const titleElement = heroWrapper.querySelector('h1');

  // Combine the image and title into a single cell (as per requirements)
  const combinedCell = [imageElement, titleElement];
  const contentRow = [
    [combinedCell]
  ];

  // Generate the table
  const tableData = [headerRow, ...contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}