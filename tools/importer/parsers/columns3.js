/* global WebImporter */
export default function parse(element, { document }) {
  // Create a section break with <hr>
  const hr = document.createElement('hr');

  // First column content
  const firstColumnContent = [];

  const paragraph = element.querySelector('p');
  if (paragraph) {
    firstColumnContent.push(paragraph.cloneNode(true));
  }

  const ul = element.querySelector('ul');
  if (ul) {
    firstColumnContent.push(ul.cloneNode(true));
  }

  const firstButton = element.querySelector('.button-container a');
  if (firstButton) {
    firstColumnContent.push(firstButton.cloneNode(true));
  }

  // Extract the first image
  const firstImage = element.querySelector('.columns-img-col img');

  // Second column content
  const secondColumnContent = [];

  const secondParagraph = element.querySelectorAll('div:nth-of-type(2) p')[0];
  if (secondParagraph) {
    secondColumnContent.push(secondParagraph.cloneNode(true));
  }

  const secondButton = element.querySelectorAll('div:nth-of-type(2) .button-container a')[0];
  if (secondButton) {
    secondColumnContent.push(secondButton.cloneNode(true));
  }

  // Extract the second image
  const secondImage = element.querySelectorAll('.columns-img-col img')[1];

  // Create table structure dynamically
  const cells = [
    ['Columns'], // Header row matches example
    [firstColumnContent, firstImage],
    [secondImage, secondColumnContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with the section break and the new block table
  element.replaceWith(hr, block);
}