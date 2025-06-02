/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header matches the example
  const headerRow = ['Hero (hero2)'];

  // Extract image
  const image = element.querySelector('picture img');

  // Extract heading
  const heading = element.querySelector('h1');

  // Ensure the table structure matches the example
  const cells = [
    headerRow,
    [
      [image || '', heading || ''] // Combine image and heading in a single cell
    ]
  ];

  // Create the table dynamically using the extracted content
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the created table
  element.replaceWith(blockTable);
}