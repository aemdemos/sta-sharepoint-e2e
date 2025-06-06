/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the hero block's main content
  let contentRoot = element;
  // Find the .hero.block inside section
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    contentRoot = heroBlock;
  }

  // Drill down if there are extra wrappers
  let innerContent = contentRoot;
  while (innerContent.children.length === 1 && innerContent.children[0].tagName === 'DIV') {
    innerContent = innerContent.children[0];
  }

  // Select the first <picture> for the image row
  const picture = innerContent.querySelector('picture');
  // Select the first heading (h1-h6) for the title row
  const heading = innerContent.querySelector('h1, h2, h3, h4, h5, h6');

  // Build the table according to the markdown example
  const cells = [
    ['Hero'],
    [picture ? picture : ''],
    [heading ? heading : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element with the new block table
  element.replaceWith(table);
}
