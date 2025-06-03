/* global WebImporter */
export default function parse(element, { document }) {
  // Correcting header row capitalization issue
  const headerRow = ['Hero (hero2)'];

  // Extract the background image dynamically
  const picture = element.querySelector(':scope > div > div > div > div > p > picture');

  // Extract title dynamically
  const heading = element.querySelector(':scope > div > div > div > div > h1');

  // Check for missing or empty elements, handle gracefully
  const pictureCell = picture ? picture : document.createTextNode('');
  const headingCell = heading ? heading : document.createTextNode('');

  // Construct Table Content
  const cells = [
    headerRow,
    [pictureCell, headingCell],
  ];

  // Create Table Block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace Original Element
  element.replaceWith(block);
}