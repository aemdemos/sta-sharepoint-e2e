/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero2) block: 1 column, 3 rows: [block name], [image], [text content]

  // Find image (background/decorative)
  let imageEl = null;
  const img = element.querySelector('img');
  if (img) {
    const picture = img.closest('picture');
    imageEl = picture || img;
  }

  // Find heading (h1, h2, h3)
  let headingEl = null;
  for (let i = 1; i <= 3; i++) {
    const h = element.querySelector(`h${i}`);
    if (h) {
      headingEl = h;
      break;
    }
  }

  // Find subheading (first <h2> or <h3> after heading, or a <p> with text)
  let subheadingEl = null;
  if (headingEl) {
    let next = headingEl.nextElementSibling;
    while (next) {
      if ((/^H[23]$/).test(next.tagName) && next.textContent.trim()) {
        subheadingEl = next;
        break;
      }
      if (next.tagName === 'P' && next.textContent.trim()) {
        subheadingEl = next;
        break;
      }
      next = next.nextElementSibling;
    }
  }

  // Find CTA (first <a> after heading)
  let ctaEl = null;
  if (headingEl) {
    let next = headingEl.nextElementSibling;
    while (next) {
      const a = next.querySelector && next.querySelector('a');
      if (a) {
        ctaEl = a;
        break;
      }
      next = next.nextElementSibling;
    }
  }

  // Compose text content cell (row 3)
  const textCell = [];
  if (headingEl) textCell.push(headingEl);
  if (subheadingEl && subheadingEl !== headingEl) textCell.push(subheadingEl);
  if (ctaEl) textCell.push(ctaEl);

  // Always produce 3 rows: header, image, text
  const rows = [
    ['Hero (hero2)'],
    [imageEl ? imageEl : ''],
    [textCell.length ? textCell : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
