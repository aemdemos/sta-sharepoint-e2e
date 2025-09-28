/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest div containing the hero content
  let contentDiv = element;
  while (contentDiv && contentDiv.querySelector(':scope > div')) {
    contentDiv = contentDiv.querySelector(':scope > div');
  }

  // Find the <picture> (image)
  const picture = contentDiv.querySelector('picture');
  const imageCell = picture ? picture : '';

  // Find the heading (h1-h6)
  const heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');

  // Find subheading and CTA (any elements after heading)
  const extras = [];
  if (heading) {
    let node = heading.nextSibling;
    while (node) {
      if (node.nodeType === Node.ELEMENT_NODE && node.textContent.trim()) {
        extras.push(node);
      }
      node = node.nextSibling;
    }
  }

  // The third row should contain heading, subheading, CTA (all in one cell)
  let textCell = '';
  if (heading && extras.length > 0) {
    textCell = [heading, ...extras];
  } else if (heading) {
    textCell = heading;
  } else if (extras.length > 0) {
    textCell = extras;
  }

  // Compose the table rows: header, [image + text in same row]
  const headerRow = ['Hero (hero2)'];
  const imageAndTextRow = [imageCell];
  const textRow = [textCell];

  // The correct structure is: header, image, then all text content in the third row
  const cells = [headerRow, [imageCell], [textCell]];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
