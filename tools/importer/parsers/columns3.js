/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns3)'];

  // Extracting the first column block section
  const firstColumn = element.querySelector(':scope > div > div:first-child');
  const paragraph = firstColumn.querySelector('p');
  const list = firstColumn.querySelector('ul');
  const button = firstColumn.querySelector('.button-container');

  const firstImageColumn = element.querySelector(':scope > div > div:first-child .columns-img-col picture');

  // Extracting the second column block section
  const secondColumn = element.querySelector(':scope > div > div:nth-child(2) > div:last-child');
  const secondParagraph = secondColumn.querySelector('p');
  const secondButton = secondColumn.querySelector('.button-container');

  const secondImageColumn = element.querySelector(':scope > div > div:nth-child(2) .columns-img-col picture');

  const cells = [
    headerRow, // Header
    [
      [paragraph, list, button],
      firstImageColumn,
    ],
    [
      secondImageColumn,
      [secondParagraph, secondButton],
    ],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}