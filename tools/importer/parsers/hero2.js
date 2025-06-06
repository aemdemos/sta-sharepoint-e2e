/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero.block container
  const heroBlock = element.querySelector('.hero.block') || element;
  // Try to find where the main content is (usually a div > div)
  let contentDiv = heroBlock;
  const innerDivs = heroBlock.querySelectorAll(':scope > div');
  if (innerDivs.length > 0) {
    contentDiv = innerDivs[0];
  }

  // Find the image (picture element)
  const picture = contentDiv.querySelector('picture');
  // Find the heading (h1-h6)
  const heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');

  // Compose the cells
  const cells = [
    ['Hero'],
    [picture ? picture : ''],
    [heading ? heading : ''],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
