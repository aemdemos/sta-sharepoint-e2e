/* global WebImporter */
export default function parse(element, { document }) {
  // Verify and extract the image
  const imageElement = element.querySelector('picture img');
  const image = imageElement ? imageElement : null;

  // Verify and extract the heading
  const headingElement = element.querySelector('h1');
  const heading = headingElement ? headingElement : null;

  // Create the header row as in the example
  const headerRow = ['Hero (hero2)'];

  // Create the content row by combining extracted elements dynamically
  const contentRow = [image, heading].filter(Boolean); // Ensure no empty elements are added

  // Generate the table
  const table = WebImporter.DOMUtils.createTable([headerRow, [contentRow]], document);

  // Replace the original element with the table
  element.replaceWith(table);
}