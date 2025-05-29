/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image from <picture>
  const picture = element.querySelector(':scope picture');
  const image = picture?.querySelector('img');

  // Extract heading (mandatory)
  const heading = element.querySelector(':scope h1');

  // Validate content presence
  if (!image || !heading) {
    console.warn('Missing mandatory content in the element');
    return;
  }

  // Create the table rows
  const headerRow = ['Hero (hero2)'];
  const contentRow = [
    [
      image,
      heading
    ] // Combine image and heading properly
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);

}