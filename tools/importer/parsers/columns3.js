/* global WebImporter */
export default function parse(element, { document }) {
  const columnsWrapper = element.querySelector(':scope > div');

  if (!columnsWrapper) {
    return;
  }

  const rows = [];

  // Header row
  const headerRow = ['Columns (columns3)'];
  rows.push(headerRow);

  // First content row
  const firstColumn = columnsWrapper.children[0];
  const textBlock = firstColumn.querySelector('p');
  const ulBlock = firstColumn.querySelector('ul');
  const buttonBlock = firstColumn.querySelector('a');

  // Extract image from first column
  const imageBlock1 = columnsWrapper.querySelector('.columns-img-col picture img');

  rows.push([
    [textBlock, ulBlock, buttonBlock, imageBlock1]
  ]);

  // Second content row
  const secondColumn = columnsWrapper.children[1];
  const imageBlock2 = secondColumn.querySelector('.columns-img-col picture img');
  const textBlock2 = secondColumn.querySelector('p');
  const buttonBlock2 = secondColumn.querySelector('a');

  rows.push([
    [imageBlock2, textBlock2, buttonBlock2]
  ]);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}