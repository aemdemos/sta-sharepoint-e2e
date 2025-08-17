/* global WebImporter */
export default function parse(element, { document }) {
  // Table header
  const headerRow = ['Hero'];

  // Find the hero block content wrapper (the deepest div)
  let contentDiv = element;
  // Some implementations nest multiple divs, so walk down to where the actual image/content is
  // We'll look for the div that contains a <picture> or <img> (for robustness)
  let deepestDiv = null;
  const divs = element.querySelectorAll('div');
  for (let div of divs) {
    if (div.querySelector('picture, img')) {
      deepestDiv = div;
    }
  }
  if (deepestDiv) contentDiv = deepestDiv;

  // Get image element (usually inside a <picture> inside a <p>)
  let imageCell = null;
  // Find <picture>, and if wrapped in a <p>, use the <p>
  const picture = contentDiv.querySelector('picture');
  if (picture) {
    const parentP = picture.closest('p');
    imageCell = parentP || picture;
  } else {
    // Fallback: look for <img> directly
    const img = contentDiv.querySelector('img');
    imageCell = img;
  }

  // Collect text content elements (headings, subheadings, paragraphs) after the image
  // We'll take everything after the image's parent (if it's a <p>), as in the example
  let textElements = [];
  if (imageCell) {
    let afterImage = false;
    for (let child of contentDiv.children) {
      if (child === imageCell) {
        afterImage = true;
        continue;
      }
      if (afterImage) {
        // Only include elements with actual text content
        if (child.textContent && child.textContent.trim()) {
          textElements.push(child);
        }
      }
    }
    // If no elements found after image, try to get heading(s)
    if (textElements.length === 0) {
      const heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textElements.push(heading);
    }
  } else {
    // If no image, just collect all child headings/paragraphs
    for (let child of contentDiv.children) {
      if ((/^H[1-6]$/).test(child.tagName) || child.tagName === 'P') {
        if (child.textContent && child.textContent.trim()) {
          textElements.push(child);
        }
      }
    }
  }

  // Only include the image cell if it exists
  const tableRows = [
    headerRow,
    imageCell ? [imageCell] : [''],
    textElements.length ? [textElements.length === 1 ? textElements[0] : textElements] : ['']
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
