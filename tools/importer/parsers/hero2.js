/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest content wrapper
  let contentWrapper = element;
  while (
    contentWrapper &&
    contentWrapper.children.length === 1 &&
    contentWrapper.firstElementChild.tagName === 'DIV'
  ) {
    contentWrapper = contentWrapper.firstElementChild;
  }

  // Find the image (picture or img)
  let imageEl = null;
  const picture = contentWrapper.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    const img = contentWrapper.querySelector('img');
    if (img) imageEl = img;
  }

  // Find the heading (h1, h2, etc.)
  let headingEl = null;
  const heading = contentWrapper.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) headingEl = heading;

  // Find subheading (next heading after main heading, or paragraph)
  let subheadingEl = null;
  if (headingEl) {
    let sib = headingEl.nextElementSibling;
    while (sib) {
      if (/^H[1-6]$/.test(sib.tagName) && sib !== headingEl) {
        subheadingEl = sib;
        break;
      }
      if (sib.tagName === 'P' && sib.textContent.trim()) {
        subheadingEl = sib;
        break;
      }
      sib = sib.nextElementSibling;
    }
  }

  // Find CTA (a link inside content)
  let ctaEl = null;
  const link = contentWrapper.querySelector('a');
  if (link) ctaEl = link;

  // Table header must match target block name exactly
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const textCellContent = [];
  if (headingEl) textCellContent.push(headingEl);
  if (subheadingEl && subheadingEl !== headingEl) textCellContent.push(subheadingEl);
  if (ctaEl) textCellContent.push(ctaEl);
  const textRow = [textCellContent.length ? textCellContent : ''];

  const rows = [headerRow, imageRow, textRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
