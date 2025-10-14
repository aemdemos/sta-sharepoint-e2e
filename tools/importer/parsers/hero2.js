/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero2)'];

  // Find image for background (row 2)
  let imageEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    // Reference the actual <img> element (not cloning or using URL)
    imageEl = picture.querySelector('img');
  }

  // Find main heading (row 3)
  let headingEl = null;
  headingEl = element.querySelector('h1, h2, h3, h4, h5, h6');

  // Compose row 2: image only (if present)
  const imageRow = [imageEl ? imageEl : ''];

  // Compose row 3: heading only (if present)
  const textContent = [];
  if (headingEl) textContent.push(headingEl);
  // No subheading or CTA present in this HTML
  const textRow = [textContent.length > 0 ? textContent : ''];

  // Build table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
