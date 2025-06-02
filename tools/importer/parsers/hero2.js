/* global WebImporter */
export default function parse(element, { document }) {
  // Verify that the table header matches the example
  const headerRow = ['Hero (hero2)'];

  // Dynamically extract the image element and verify it exists
  const image = element.querySelector('picture');
  if (!image) {
    throw new Error('Missing picture element in the provided HTML.');
  }

  // Dynamically extract the heading element and verify it exists
  const heading = element.querySelector('h1');
  if (!heading) {
    throw new Error('Missing heading element in the provided HTML.');
  }

  // Create the content row dynamically from extracted elements
  const contentRow = [image, heading];

  // Create the table cells array
  const cells = [headerRow, contentRow];

  // Generate the block table using WebImporter helper
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}