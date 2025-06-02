/* global WebImporter */
 export default function parse(element, { document }) {
  // Extract relevant elements from the input
  const image = element.querySelector('picture img');
  const heading = element.querySelector('h1');

  // Validate extracted elements
  if (!image || !heading) {
    console.error('Missing essential content elements.');
    return;
  }

  // Create the table structure
  const headerRow = ['Hero (hero2)'];
  const contentRow = [
    [image, heading]
  ];

  const tableCells = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}