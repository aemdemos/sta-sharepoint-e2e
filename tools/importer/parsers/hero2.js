/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting image
  const image = element.querySelector(':scope img');

  // Extracting heading
  const heading = element.querySelector(':scope h1');

  // Ensuring header row matches example exactly
  const headerRow = ['Hero (hero2)'];

  // Content row with combined image and heading in one column
  const contentRow = [[image, heading]];

  // Creating block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replacing original element with the new structured block table
  element.replaceWith(table);
}