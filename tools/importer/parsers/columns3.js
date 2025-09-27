/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children divs
  const getDirectDivs = (el) => Array.from(el.children).filter(child => child.tagName === 'DIV');

  // Header row as specified
  const headerRow = ['Columns (columns3)'];

  // Find the main block (columns block)
  let block = element.querySelector('.columns.block');
  if (!block) {
    // fallback: find first child div
    block = getDirectDivs(element)[0];
  }

  // Get the two main rows (each row is a div)
  const blockRows = getDirectDivs(block);

  // Defensive: If not exactly two rows, fallback to all children
  let row1 = blockRows[0];
  let row2 = blockRows[1];

  // First content row: left = text, right = image
  let row1Cols = getDirectDivs(row1);
  let left1 = row1Cols[0];
  let right1 = row1Cols[1];
  // Defensive: fallback if not found
  if (!left1) left1 = row1;
  if (!right1) right1 = row1.querySelector('.columns-img-col');

  // Second content row: left = image, right = text
  let row2Cols = getDirectDivs(row2);
  let left2 = row2Cols[0];
  let right2 = row2Cols[1];
  if (!left2) left2 = row2.querySelector('.columns-img-col');
  if (!right2) right2 = row2;

  // Build the table rows
  const tableRows = [
    headerRow,
    [left1, right1],
    [left2, right2],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
