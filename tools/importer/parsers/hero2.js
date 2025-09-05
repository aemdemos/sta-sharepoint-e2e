/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first <picture> or <img> in the block
  let imageEl = element.querySelector('picture') || element.querySelector('img');

  // Find the first heading (h1, h2, h3)
  const headingEl = element.querySelector('h1, h2, h3');

  // Find subheading (h2, h3 after heading) and CTA (first <a> after heading)
  let subheadingEl = null;
  let ctaEl = null;
  if (headingEl) {
    let next = headingEl.nextElementSibling;
    while (next) {
      if (!subheadingEl && (next.tagName === 'H2' || next.tagName === 'H3')) {
        subheadingEl = next;
      }
      if (!ctaEl) {
        const link = next.querySelector && next.querySelector('a');
        if (link) ctaEl = link;
      }
      if (subheadingEl && ctaEl) break;
      next = next.nextElementSibling;
    }
  }

  // Compose the content cell for the third row
  const contentCell = document.createElement('div');
  if (headingEl) contentCell.appendChild(headingEl.cloneNode(true));
  if (subheadingEl) contentCell.appendChild(subheadingEl.cloneNode(true));
  if (ctaEl) contentCell.appendChild(ctaEl.cloneNode(true));

  // Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl.cloneNode(true) : ''];
  const contentRow = [contentCell.childNodes.length ? contentCell : ''];

  // Compose the table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
