/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant elements from the provided HTML element
  const image = element.querySelector(':scope img');
  const heading = element.querySelector(':scope h1');

  // Check for missing elements and handle empty states
  const imageCell = image ? image : document.createTextNode('');
  const headingCell = heading ? heading : document.createTextNode('');

  // Combine all content into a single cell for the second row
  const contentCell = document.createElement('div');
  if (imageCell) contentCell.appendChild(imageCell);
  if (headingCell) contentCell.appendChild(headingCell);

  // Create an array representing the table rows and cells
  const headerRow = ['Hero (hero2)']; // Ensure header row contains exactly one column
  const contentRow = [[contentCell]]; // Merge all elements into a single cell

  // Create the block table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...contentRow], document);

  // Replace the original element with the new structured block table
  element.replaceWith(blockTable);
}