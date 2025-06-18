/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block containing the content
  const heroBlock = element.querySelector('.hero.block');
  let imageRowContent = '';
  let contentRowContent = '';

  if (heroBlock) {
    // Get image (prefer <p> with <picture> if exists)
    const picture = heroBlock.querySelector('picture');
    if (picture) {
      // Prefer the outer <p> if it contains the <picture>
      const imgPara = picture.closest('p');
      imageRowContent = imgPara || picture;
    }
    // Get heading (h1)
    const heading = heroBlock.querySelector('h1');
    if (heading) {
      // Remove the heading from the DOM so it is not duplicated when table is inserted
      if (heading.parentNode) heading.parentNode.removeChild(heading);
      contentRowContent = heading;
    }
  }

  // Build the table structure exactly as the example
  const rows = [
    ['Hero'],
    [imageRowContent],
    [contentRowContent],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
