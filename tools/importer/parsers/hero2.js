/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero'];

  // 2. Find the deepest content div: section > hero-wrapper > hero.block > div > div
  let contentDiv = element;
  for (let i = 0; i < 4; i++) {
    if (contentDiv && contentDiv.children.length) {
      contentDiv = contentDiv.children[0];
    }
  }

  // 3. Extract image (picture or image in <p>)
  let imageElement = null;
  const possiblePs = Array.from(contentDiv.querySelectorAll('p'));
  for (const p of possiblePs) {
    const pic = p.querySelector('picture');
    if (pic) {
      imageElement = pic;
      break;
    }
  }
  // fallback: first image
  if (!imageElement) {
    const img = contentDiv.querySelector('img');
    if (img) imageElement = img;
  }
  // If the image is inside a <p>, use the <p> as that's what will be rendered when referenced
  if (imageElement && imageElement.parentElement.tagName === 'P') {
    imageElement = imageElement.parentElement;
  }

  // 4. Gather all heading and paragraph content except for the image
  const textElements = [];
  for (const node of Array.from(contentDiv.childNodes)) {
    if (node.nodeType === 1) {
      if ((node.tagName === 'P' && (!node.querySelector('picture') && !node.querySelector('img')) && node.textContent.trim().length > 0) || node.tagName.match(/^H[1-6]$/)) {
        textElements.push(node);
      }
    }
  }

  // 5. Compose rows
  const rows = [
    headerRow,
    imageElement ? [imageElement] : [''],
    [textElements.length === 1 ? textElements[0] : textElements]
  ];

  // 6. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
