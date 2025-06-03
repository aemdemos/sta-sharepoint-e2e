/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row
  const headerRow = ['Columns (columns3)'];

  // Extract content for the first column (text and list)
  const firstCol = element.querySelector(':scope > div > div:first-child');
  if (!firstCol) {
    throw new Error('First column missing');
  }
  const textBlock = firstCol.querySelector('p');
  const listBlock = firstCol.querySelector('ul');
  const buttonBlock = firstCol.querySelector('p.button-container');

  // Extract image for the first column
  const firstImageCol = firstCol.querySelector(':scope > div.columns-img-col picture');

  // Extract content for the second column (image and preview text)
  const secondCol = element.querySelector(':scope > div > div:nth-child(2)');
  if (!secondCol) {
    throw new Error('Second column missing');
  }
  const secondImageCol = secondCol.querySelector(':scope > div.columns-img-col picture');
  const previewTextBlock = secondCol.querySelector(':scope > div > p');
  const previewButtonBlock = secondCol.querySelector(':scope > div > p.button-container');

  // Ensure all required content is present
  if (!textBlock || !listBlock || !buttonBlock || !firstImageCol || !secondImageCol || !previewTextBlock || !previewButtonBlock) {
    console.warn('Warning: Some optional elements are missing. Proceeding with available content.');
  }

  // Create table rows
  const rows = [
    headerRow,
    [
      [textBlock, listBlock, buttonBlock],
      firstImageCol,
    ],
    [
      secondImageCol,
      [previewTextBlock, previewButtonBlock],
    ],
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with the new block table
  element.replaceWith(blockTable);
}