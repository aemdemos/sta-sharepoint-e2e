/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero2)'];

  // Extract the image element dynamically
  const image = element.querySelector('picture img');

  // Extract the heading element dynamically
  const heading = element.querySelector('h1');

  // Validate extracted content
  const imageContent = image ? image : document.createTextNode('');
  const headingContent = heading ? heading : document.createTextNode('');

  // Create the rows for the table
  const rows = [
    headerRow,
    [imageContent, headingContent]
  ];

  // Create the table block using the provided helper function
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}