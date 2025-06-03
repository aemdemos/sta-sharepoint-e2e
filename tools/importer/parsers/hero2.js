/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the necessary content from the provided element
  const heroWrapper = element.querySelector(':scope > div.hero-wrapper');
  const image = heroWrapper.querySelector('img');
  const heading = heroWrapper.querySelector('h1');

  // Create table header row
  const headerRow = ['Hero (hero2)'];

  // Create the content row with extracted elements merged into one cell
  const contentRow = [
    [image, heading]  // Combine image and heading into a single cell
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}