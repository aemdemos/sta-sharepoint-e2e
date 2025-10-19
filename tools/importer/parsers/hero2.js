/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero2)'];

  // 2. Extract image for background row
  // Find the first <picture> inside a <p>
  let imageEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    // Use the <picture> element itself for best compatibility
    imageEl = picture;
  }

  // 3. Extract text content for content row
  // Find the main heading (h1, h2, h3, etc.)
  let contentEls = [];
  // Try to find the main heading (h1 preferred)
  let heading = element.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    contentEls.push(heading);
  }
  // Optionally, look for subheading or paragraph (if present)
  // In this case, there is only one heading and no subheading/CTA
  // But for resilience, check for paragraphs after the heading
  let paragraphs = Array.from(element.querySelectorAll('p')).filter(p => p.textContent.trim().length > 0);
  // Remove paragraphs that are only used for images
  paragraphs = paragraphs.filter(p => !p.querySelector('picture'));
  // If there are paragraphs after the heading, add them as subheading/content
  if (paragraphs.length > 0) {
    contentEls = contentEls.concat(paragraphs);
  }
  // Optionally, look for CTA (anchor) inside the element
  const cta = element.querySelector('a');
  if (cta) {
    contentEls.push(cta);
  }

  // 4. Build the table rows
  const rows = [
    headerRow,
    [imageEl ? imageEl : ''],
    [contentEls.length > 0 ? contentEls : ''],
  ];

  // 5. Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
