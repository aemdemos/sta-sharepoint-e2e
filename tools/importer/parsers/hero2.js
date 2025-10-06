/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (picture or img)
  let bgImg = null;
  const pic = element.querySelector('picture');
  if (pic) {
    bgImg = pic;
  } else {
    const img = element.querySelector('img');
    if (img) bgImg = img;
  }

  // Find the main heading (h1)
  const heading = element.querySelector('h1');

  // Find subheading: first non-empty <p> after h1 (if any)
  let subheading = null;
  if (heading) {
    let next = heading.nextElementSibling;
    while (next) {
      if (next.tagName === 'P' && next.textContent.trim()) {
        subheading = next;
        break;
      }
      next = next.nextElementSibling;
    }
  }

  // Compose the content cell for the 3rd row
  const contentNodes = [];
  if (heading) contentNodes.push(heading);
  if (subheading && subheading !== heading) contentNodes.push(subheading);

  // Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentNodes.length ? contentNodes : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
