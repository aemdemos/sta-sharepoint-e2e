/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as specified in the example
  const headerRow = ['Hero (hero2)'];

  // Extract required elements from the source HTML
  const imageElement = element.querySelector('picture img');

  const headingElement = element.querySelector('h1');

  // Combine all extracted content into a single cell in the second row
  const contentRow = [`<div>${imageElement.outerHTML}${headingElement.outerHTML}</div>`];

  // Create the table with the correct structure
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}