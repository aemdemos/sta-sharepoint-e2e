/* global WebImporter */
export default function parse(element, { document }) {
  // Find the image (picture or img) and the heading
  let imageEl = null;
  let headingEl = null;

  // Find the first <picture> or <img> inside the element
  const picture = element.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    // fallback: find first img
    const img = element.querySelector('img');
    if (img) imageEl = img;
  }

  // Find the first heading (h1, h2, h3, etc.)
  headingEl = element.querySelector('h1, h2, h3, h4, h5, h6');

  // Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [headingEl ? headingEl : ''];

  const cells = [headerRow, imageRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
