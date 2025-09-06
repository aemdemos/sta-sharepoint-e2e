/* global WebImporter */
export default function parse(element, { document }) {
  // Always output 3 rows: header, image, content (title, subheading, CTA)
  const headerRow = ['Hero (hero2)'];

  // Find the hero image (picture or img)
  let imageEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    const img = element.querySelector('img');
    if (img) imageEl = img;
  }
  const imageRow = [imageEl ? imageEl : ''];

  // Compose the content row: title (heading), subheading, CTA (all in one cell)
  const contentArr = [];
  // Title (first heading)
  const heading = element.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) contentArr.push(heading.cloneNode(true));
  // Subheading (next heading after the first, if present)
  let subheading = null;
  if (heading) {
    let next = heading.nextElementSibling;
    while (next) {
      if (/^H[1-6]$/.test(next.tagName)) {
        subheading = next;
        break;
      }
      next = next.nextElementSibling;
    }
  }
  if (subheading) contentArr.push(subheading.cloneNode(true));
  // CTA (first link after heading and subheading)
  let cta = null;
  let ctaSearchStart = subheading || heading;
  if (ctaSearchStart) {
    let next = ctaSearchStart.nextElementSibling;
    while (next) {
      const link = next.querySelector && next.querySelector('a');
      if (link) {
        cta = link;
        break;
      }
      next = next.nextElementSibling;
    }
  }
  if (cta) contentArr.push(cta.cloneNode(true));
  // Compose the content row (all in one cell)
  const contentCell = document.createElement('div');
  contentArr.forEach(el => contentCell.appendChild(el));
  const contentRow = [contentArr.length > 0 ? contentCell.childNodes.length === 1 ? contentCell.firstChild : contentCell : ''];

  // Ensure always 3 rows
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
