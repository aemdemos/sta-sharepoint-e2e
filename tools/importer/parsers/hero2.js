/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block content
  const heroBlock = element.querySelector('.hero.block');
  let contentDiv;
  if (heroBlock) {
    // Find the deepest div containing a picture or h1
    const innerDivs = Array.from(heroBlock.querySelectorAll('div'));
    contentDiv = innerDivs.find(div => div.querySelector('picture') || div.querySelector('h1')) || heroBlock;
  } else {
    contentDiv = element;
  }

  // Extract the picture and heading
  const picture = contentDiv.querySelector('picture');
  const heading = contentDiv.querySelector('h1');

  // Build the block table: header, image, heading
  const rows = [
    ['Hero'],
    [picture ? picture : ''],
    [heading ? heading : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
