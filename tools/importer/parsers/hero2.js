/* global WebImporter */
export default function parse(element, { document }) {
  // Find the picture element (image)
  const picture = element.querySelector('picture');
  // Find the main heading (h1)
  const headingEl = element.querySelector('h1');

  // Compose table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [picture ? picture : ''];
  // The content row should include heading, subheading, CTA if present, all in one cell
  const contentArr = [];
  if (headingEl) contentArr.push(headingEl);
  // Try to find subheading (h2, h3) and CTA (a inside p)
  const subheading = element.querySelector('h2, h3');
  if (subheading) contentArr.push(subheading);
  const cta = element.querySelector('p a');
  if (cta) {
    // include the whole p if possible
    const ctaP = cta.closest('p');
    if (ctaP) contentArr.push(ctaP);
    else contentArr.push(cta);
  }
  // If nothing found, leave cell empty
  const contentRow = [contentArr.length ? (contentArr.length === 1 ? contentArr[0] : contentArr) : ''];

  // Compose the table (always 3 rows)
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
