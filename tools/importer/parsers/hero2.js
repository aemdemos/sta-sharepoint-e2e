/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero2) block: 1 col, 3 rows: [block name], [image], [heading/subheading/cta]
  const headerRow = ['Hero (hero2)'];

  // Find the main image (picture or img)
  let imageEl = null;
  const picture = element.querySelector('picture');
  if (picture && picture.querySelector('img')) {
    imageEl = picture;
  } else {
    // fallback: just img
    imageEl = element.querySelector('img');
  }

  // Find the main heading (h1-h3)
  let headingEl = null;
  for (let i = 1; i <= 3; i++) {
    const h = element.querySelector(`h${i}`);
    if (h) {
      headingEl = h;
      break;
    }
  }

  // Find subheading (h2/h3 after heading) and CTA (a/button)
  let subheadingEl = null;
  let ctaEl = null;
  if (headingEl) {
    let next = headingEl.nextElementSibling;
    while (next) {
      if (!subheadingEl && (/^H[23]$/.test(next.tagName))) {
        subheadingEl = next;
      }
      if (!ctaEl) {
        const link = next.querySelector('a,button');
        if (link) ctaEl = link;
      }
      next = next.nextElementSibling;
    }
  }
  if (!ctaEl) {
    ctaEl = element.querySelector('a,button');
  }

  // Build content row (heading, subheading, cta)
  const content = [];
  if (headingEl) content.push(headingEl);
  if (subheadingEl) content.push(subheadingEl);
  if (ctaEl) content.push(ctaEl);

  // If no heading, fallback to first paragraph
  if (!headingEl) {
    const p = element.querySelector('p');
    if (p) content.push(p);
  }

  // Table rows
  const rows = [
    headerRow,
    [imageEl ? imageEl : ''],
    [content.length > 0 ? content : '']
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
