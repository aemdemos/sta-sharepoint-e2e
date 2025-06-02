/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const heroWrapper = element.querySelector(':scope > .hero-wrapper');
  const heroBlock = heroWrapper?.querySelector(':scope > .hero');

  // Image extraction
  const image = heroBlock?.querySelector('picture img');

  // Heading extraction
  const heading = heroBlock?.querySelector('h1');

  // Validate existence of required elements
  const contentRow = [];
  if (image) contentRow.push(image);
  if (heading) contentRow.push(heading);

  // Structure the table
  const headerRow = ['Hero (hero2)'];

  const cells = [headerRow, [contentRow]];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}