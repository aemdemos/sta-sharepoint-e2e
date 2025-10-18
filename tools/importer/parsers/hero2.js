/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Hero (hero2)'];

  // Defensive: Find the image (background asset)
  let imageEl = null;
  // Look for <img> inside <picture>
  const picture = element.querySelector('picture');
  if (picture) {
    imageEl = picture.querySelector('img');
  }

  // Defensive: Find the main heading (h1)
  let headingEl = element.querySelector('h1');

  // Row 2: Background image (optional)
  // Only include the <img> element, not the <picture> or its sources
  const imageRow = [imageEl ? imageEl : ''];

  // Row 3: Text content (heading, subheading, CTA)
  // For this example, only heading is present
  const textContent = [];
  if (headingEl) textContent.push(headingEl);
  // No subheading or CTA in this HTML
  const textRow = [textContent.length ? textContent : ''];

  // Compose the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
