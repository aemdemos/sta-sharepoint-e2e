/* global WebImporter */
export default function parse(element, { document }) {
  // Find the nav element
  const nav = element.querySelector('nav');
  if (!nav) return;

  // Get left column (brand + nav-sections)
  const brand = nav.querySelector('.nav-brand');
  const sections = nav.querySelector('.nav-sections');
  const leftCol = document.createElement('div');
  if (brand) leftCol.appendChild(brand);
  if (sections) leftCol.appendChild(sections);

  // Get right column (nav-tools)
  let rightCol = nav.querySelector('.nav-tools');
  if (!rightCol) {
    rightCol = document.createElement('div');
  }

  // Table: header row is single column, next row is two columns
  const cells = [
    ['Columns (columns1)'],
    [leftCol, rightCol]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
