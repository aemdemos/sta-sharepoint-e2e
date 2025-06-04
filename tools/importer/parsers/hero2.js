/* global WebImporter */
export default function parse(element, { document }) {
  // The target block is always a single table with header and one content cell
  // We want: [ ['Hero (hero2)'], [mainContent] ]

  // Find the hero block with the content
  let mainContent = null;
  // Usually .hero-wrapper > .hero.block > div > div contains the content
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector('.hero.block');
    if (heroBlock) {
      // Some variations may have extra divs, but we want the main content inside .hero.block
      // Find the first div that contains the image and heading
      let contentDiv = heroBlock.querySelector('div > div');
      if (!contentDiv) contentDiv = heroBlock.querySelector('div');
      if (contentDiv) {
        mainContent = contentDiv;
      } else {
        mainContent = heroBlock;
      }
    } else {
      mainContent = heroWrapper;
    }
  } else {
    mainContent = element;
  }

  // Defensive: If mainContent is null, fallback to the original element
  if (!mainContent) {
    mainContent = element;
  }

  // Assemble the table structure
  const cells = [
    ['Hero (hero2)'],
    [mainContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
  return table;
}
