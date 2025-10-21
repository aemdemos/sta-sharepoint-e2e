/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero2) block: 1 column, 3 rows
  // Row 1: block name
  // Row 2: background image (optional)
  // Row 3: headline, subheading, CTA (optional)

  // Find image (background)
  let imageEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) imageEl = img;
  }

  // Find headline (h1, h2, h3)
  let headlineEl = null;
  headlineEl = element.querySelector('h1, h2, h3');

  // Find subheading (next non-empty <p> after headline)
  let subheadingEl = null;
  if (headlineEl) {
    let next = headlineEl.nextElementSibling;
    while (next && (next.tagName.toLowerCase() !== 'p' || !next.textContent.trim())) {
      next = next.nextElementSibling;
    }
    if (next && next.textContent.trim()) {
      subheadingEl = next;
    }
  }

  // Find CTA (first <a> in element)
  let ctaEl = null;
  const links = element.querySelectorAll('a');
  if (links.length > 0) {
    ctaEl = links[0];
  }

  // Compose row 3: headline, subheading, CTA (if present)
  const row3Content = [];
  if (headlineEl) row3Content.push(headlineEl);
  if (subheadingEl) row3Content.push(subheadingEl);
  if (ctaEl) row3Content.push(ctaEl);

  // Table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [row3Content.length > 0 ? row3Content : ''];

  // Create table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
