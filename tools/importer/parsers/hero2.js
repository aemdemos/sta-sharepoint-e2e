/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main hero content (deepest div with <picture> or <img> and heading)
  let mainContent = element.querySelector('.hero-wrapper .hero > div > div') ||
                    element.querySelector('.hero-wrapper .hero > div') ||
                    element;

  // Find the image (in a <picture> inside a <p>, or directly <img>)
  let imageElem = null;
  let picture = mainContent.querySelector('picture');
  if (picture) {
    // Reference the <picture> element's parent <p> if available
    if (picture.parentElement && picture.parentElement.tagName === 'P') {
      imageElem = picture.parentElement;
    } else {
      imageElem = picture;
    }
  } else {
    // fallback: find first <img> (rare case)
    let img = mainContent.querySelector('img');
    if (img) {
      imageElem = img;
    }
  }

  // Collect all heading and paragraph nodes after image
  let contentNodes = [];
  let foundImage = false;
  for (let child of mainContent.childNodes) {
    if (!foundImage && ((child.tagName === 'P' && child.querySelector('picture')) || child.tagName === 'PICTURE')) {
      foundImage = true;
      continue;
    }
    if (foundImage) {
      // skip empty paragraphs
      if (child.nodeType === 1 && child.tagName === 'P' && child.textContent.trim() === '') continue;
      if (child.nodeType === 1 && (/^H[1-6]$/.test(child.tagName) || child.tagName === 'P')) {
        contentNodes.push(child);
      }
    }
  }
  // Edge case: if nothing found, try any <h1> after image
  if (contentNodes.length === 0) {
    let h1 = mainContent.querySelector('h1');
    if (h1) contentNodes.push(h1);
  }

  // Ensure output matches the example: 1col x 3row, first row header, then image, then content
  const cells = [
    ['Hero'],
    [imageElem || ''],
    [contentNodes.length ? contentNodes : ['']]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
