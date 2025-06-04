/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the provided block name
  const headerRow = ['Hero (hero2)'];

  // The hero block's innermost content contains the image and heading
  // We want to reference the <div> that contains both the <picture> and <h1>
  // From the HTML structure, this is likely the first <div> that has both an <img>/<picture> and an <h1>
  let contentDiv = null;
  // Prefer direct children for robustness
  const divs = element.querySelectorAll('div');
  for (const div of divs) {
    if ((div.querySelector('picture') || div.querySelector('img')) && div.querySelector('h1')) {
      contentDiv = div;
      break;
    }
  }
  // Fallback to the element itself if not found
  if (!contentDiv) {
    contentDiv = element;
  }

  // Build the table structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [contentDiv]
  ], document);

  // Replace the original element with the parsed block table
  element.replaceWith(table);
}
