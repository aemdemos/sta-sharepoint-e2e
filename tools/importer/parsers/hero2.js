/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero (hero2)'];

  // Extracting the image
  const imageWrapper = element.querySelector(':scope img');
  const headingElement = element.querySelector(':scope h1');

  // Combine image and heading into one cell for the second row
  const combinedCell = [imageWrapper, headingElement];

  const cells = [
    headerRow,
    [combinedCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}