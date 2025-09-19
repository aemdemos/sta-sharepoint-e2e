/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest div that contains the actual hero content
  let contentDiv = element;
  while (contentDiv && contentDiv.children.length === 1 && contentDiv.firstElementChild.tagName === 'DIV') {
    contentDiv = contentDiv.firstElementChild;
  }

  // Find the image (background image)
  let imgContainer = null;
  const pictures = contentDiv.querySelectorAll('picture');
  if (pictures.length > 0) {
    imgContainer = pictures[0];
  }

  // Find the heading (title)
  let heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');

  // Find subheading and CTA (not present in this example, but code defensively)
  let subheading = null;
  if (heading) {
    let next = heading.nextElementSibling;
    while (next && !/^H[1-6]$/.test(next.tagName)) {
      next = next.nextElementSibling;
    }
    if (next && next !== heading) {
      subheading = next;
    }
  }

  // Collect all paragraphs after heading as possible CTA/description
  let cta = null;
  let paragraphs = [];
  if (heading) {
    let sib = heading.nextElementSibling;
    while (sib) {
      if (sib.tagName === 'P' && sib.textContent.trim()) {
        paragraphs.push(sib);
      }
      sib = sib.nextElementSibling;
    }
  }
  // If any paragraph contains a link, treat as CTA
  for (const p of paragraphs) {
    if (p.querySelector('a')) {
      cta = p;
      break;
    }
  }

  // Compose the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imgContainer ? imgContainer : ''];
  // Compose content cell: heading, subheading, paragraphs, cta
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  for (const p of paragraphs) {
    if (p !== cta) contentCell.push(p);
  }
  if (cta) contentCell.push(cta);
  const contentRow = [contentCell.length ? contentCell : ''];

  // Always output 3 rows: header, image, content
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
