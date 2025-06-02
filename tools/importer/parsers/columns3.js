/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns (columns3)'];

  // Define rows array to store content dynamically
  const rows = [];

  // Process the first column (Columns block, list, button)
  const firstColumn = element.querySelector(':scope > div:nth-child(1)');
  const firstColumnContent = [];

  if (firstColumn) {
    // Extract header text
    const header = firstColumn.querySelector('p');
    if (header) {
      firstColumnContent.push(header);
    }

    // Extract list of items
    const list = firstColumn.querySelector('ul');
    if (list) {
      firstColumnContent.push(list);
    }

    // Extract button
    const buttonContainer = firstColumn.querySelector('.button-container');
    if (buttonContainer) {
      const button = buttonContainer.querySelector('a');
      if (button) {
        firstColumnContent.push(button);
      }
    }
  }

  // Process the second column (image)
  const secondColumn = element.querySelector(':scope > div:nth-child(2) .columns-img-col');
  const secondColumnContent = secondColumn ? [secondColumn.querySelector('picture')] : [];

  // Process the third column (image and text)
  const thirdColumn = element.querySelector(':scope > div:nth-child(3)');
  const thirdColumnContent = [];

  if (thirdColumn) {
    // Extract image
    const imageColumn = thirdColumn.querySelector('.columns-img-col picture');
    if (imageColumn) {
      thirdColumnContent.push(imageColumn);
    }

    // Extract text
    const textColumn = thirdColumn.querySelector(':scope > div:nth-child(2) > p');
    if (textColumn) {
      thirdColumnContent.push(textColumn);
    }

    // Extract button (Preview link)
    const previewButton = thirdColumn.querySelector(':scope > div:nth-child(2) .button-container a');
    if (previewButton) {
      thirdColumnContent.push(previewButton);
    }
  }

  // Build the table rows
  rows.push([firstColumnContent, secondColumnContent]);
  rows.push([thirdColumnContent]);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}