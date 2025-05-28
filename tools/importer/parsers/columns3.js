/* global WebImporter */
 export default function parse(element, { document }) {
  const columns = [];

  // Header row
  const headerRow = ['Columns (columns3)'];
  columns.push(headerRow);

  // First content row
  const firstColumn = element.querySelector(':scope > div > div:nth-child(1)');
  const firstBlockContent = [];

  // Add paragraph and list
  const paragraph = firstColumn.querySelector('p');
  if (paragraph) firstBlockContent.push(paragraph);

  const list = firstColumn.querySelector('ul');
  if (list) firstBlockContent.push(list);

  // Add button
  const button = firstColumn.querySelector('p.button-container a');
  if (button) firstBlockContent.push(button);

  const firstImageColumn = element.querySelector(':scope > div > div:nth-child(1) > div.columns-img-col picture');
  const firstImage = firstImageColumn.querySelector('img');

  const firstRow = [
    firstBlockContent,
    firstImage,
  ];
  columns.push(firstRow);

  // Second content row
  const secondImageColumn = element.querySelector(':scope > div > div:nth-child(2) > div.columns-img-col picture');
  const secondImage = secondImageColumn.querySelector('img');

  const secondTextColumn = element.querySelector(':scope > div > div:nth-child(2) > div:nth-child(2)');
  const secondBlockContent = [];
  
  // Add text paragraph
  const textParagraph = secondTextColumn.querySelector('p');
  if (textParagraph) secondBlockContent.push(textParagraph);

  // Add button
  const secondaryButton = secondTextColumn.querySelector('p.button-container em a');
  if (secondaryButton) secondBlockContent.push(secondaryButton);

  const secondRow = [
    secondImage,
    secondBlockContent,
  ];
  columns.push(secondRow);

  // Create table block
  const block = WebImporter.DOMUtils.createTable(columns, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}