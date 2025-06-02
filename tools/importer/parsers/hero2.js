/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image dynamically
  const image = element.querySelector('picture img');

  // Extract the heading dynamically
  const heading = element.querySelector('h1');

  // Validate extracted data
  if (!image || !heading) {
    console.error('Missing required content: image or heading.');
    return;
  }

  // Build the header row dynamically
  const headerRow = ['Hero (hero2)'];

  // Build the content row dynamically
  const contentRow = [
    [image, heading], // Combine the image and heading elements into a single cell
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element
  element.replaceWith(table);
}