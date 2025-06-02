/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting the block name and header row
  const headerRow = ['Hero (hero2)'];

  // Extracting relevant content from the element
  const image = element.querySelector('picture img');
  const heading = element.querySelector('h1');

  // Defining the table rows based on extracted elements
  const cells = [
    headerRow, // Header row with block name
    [
      [image, heading].filter(Boolean) // Content row combining extracted elements
    ]
  ];

  // Creating a structured block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing original element with the newly created block
  element.replaceWith(block);
}