/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the deepest block content
  let heroContent = element;
  // Try to find the .hero.block (deepest content)
  const block = element.querySelector('.hero.block');
  if (block) heroContent = block;

  // Find the image (background image)
  let imageEl = null;
  // Look for <img> inside <picture> inside a <p>
  const picture = heroContent.querySelector('picture');
  if (picture) {
    imageEl = picture.querySelector('img');
  }

  // Find the heading (h1, h2, etc.)
  let headingEl = null;
  // Only pick the first heading (h1-h3)
  headingEl = heroContent.querySelector('h1, h2, h3');

  // Find subheading (h2/h3 after heading)
  let subheadingEl = null;
  if (headingEl) {
    let sib = headingEl.nextElementSibling;
    while (sib) {
      if (/^H[2-3]$/i.test(sib.tagName)) {
        subheadingEl = sib;
        break;
      }
      sib = sib.nextElementSibling;
    }
  }

  // Find CTA (first <a> after heading/subheading)
  let ctaEl = null;
  if (headingEl) {
    let sib = headingEl.nextElementSibling;
    while (sib) {
      const a = sib.querySelector && sib.querySelector('a');
      if (a) {
        ctaEl = a;
        break;
      }
      sib = sib.nextElementSibling;
    }
  }

  // Compose content cell for row 3
  const contentCell = [];
  if (headingEl) contentCell.push(headingEl);
  if (subheadingEl) contentCell.push(subheadingEl);
  // Add all paragraphs after heading and subheading, but skip if empty
  if (headingEl) {
    let sib = headingEl.nextElementSibling;
    while (sib) {
      if (sib === subheadingEl) {
        sib = sib.nextElementSibling;
        continue;
      }
      if (sib.tagName === 'P' && sib.textContent.trim()) {
        contentCell.push(sib);
      }
      sib = sib.nextElementSibling;
    }
  }
  // Add CTA if found and not already included
  if (ctaEl && !contentCell.includes(ctaEl)) contentCell.push(ctaEl);

  // Build table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
