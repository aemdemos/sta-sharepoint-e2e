/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image
  const imageElement = element.querySelector(':scope img');

  // Extract heading
  const headingElement = element.querySelector(':scope h1');

  // Define table header row
  const headerRow = ['Hero (hero2)'];

  // Define table content row
  const contentRow = [
    [imageElement, headingElement], // Combine the image and heading into a single cell
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    [contentRow], // Fixing the structure to ensure content is a single cell
  ], document);

  // Replace original element with the table
  element.replaceWith(blockTable);
}