/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for the table
  const headerRow = ['Columns (columns3)'];

  // Extract the two main column blocks
  const columns = Array.from(element.querySelectorAll(':scope > div > div'));

  // First column
  const column1Content = columns[0];
  const column1Text = column1Content.querySelector('p');
  const column1List = column1Content.querySelector('ul');
  const column1Button = column1Content.querySelector('a.button');

  // Second column image
  const column1Image = column1Content.querySelector('.columns-img-col picture img');

  // Create first row
  const firstRow = [
    [column1Text, column1List, column1Button],
    column1Image
  ];

  // Second column
  const column2Content = columns[1];
  const column2Image = column2Content.querySelector('.columns-img-col picture img');
  const column2Text = column2Content.querySelector('p');
  const column2Button = column2Content.querySelector('a.button.secondary');

  // Create second row
  const secondRow = [
    column2Image,
    [column2Text, column2Button]
  ];

  // Combine rows into a table
  const cells = [
    headerRow,
    firstRow,
    secondRow
  ];

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(tableBlock);
}