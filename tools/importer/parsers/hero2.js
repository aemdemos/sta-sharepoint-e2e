/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row (must match target block name exactly)
  const headerRow = ['Hero (hero2)'];

  // 2. Extract the background image (first <img> inside <picture>)
  let imageEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      imageEl = img; // Reference the actual <img> element
    }
  }

  // 3. Extract the main heading (h1)
  let headingEl = element.querySelector('h1');

  // 4. Compose table rows
  // Row 1: header
  // Row 2: image (background image)
  // Row 3: content (heading)
  const tableRows = [
    headerRow,
    [imageEl ? imageEl : ''],
    [headingEl ? headingEl : ''],
  ];

  // 5. Create table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // 6. Replace the original element with the table
  element.replaceWith(table);
}
