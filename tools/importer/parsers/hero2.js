/* global WebImporter */
export default function parse(element, { document }) {
  // Attempt to robustly find the hero block inner content
  let contentDiv = null;
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    // usually hero.block > div > div contains the content
    const divs = heroBlock.querySelectorAll(':scope > div > div');
    if (divs.length > 0) {
      contentDiv = divs[0];
    } else {
      // fallback: hero.block > div
      const loneDiv = heroBlock.querySelector(':scope > div');
      if (loneDiv) contentDiv = loneDiv;
    }
  }
  if (!contentDiv) {
    contentDiv = element;
  }

  // Extract the <picture> element (image row)
  const pictureElem = contentDiv.querySelector('picture');

  // Extract the heading (h1-h6) for the third row (must be an element)
  // Look for the FIRST non-empty heading inside contentDiv, fallback to heroBlock
  let headingElem = null;
  const headings = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
  for (const h of headings) {
    if (h.textContent && h.textContent.trim().length > 0) {
      headingElem = h;
      break;
    }
  }
  if (!headingElem && heroBlock) {
    const blockHeadings = heroBlock.querySelectorAll('h1, h2, h3, h4, h5, h6');
    for (const h of blockHeadings) {
      if (h.textContent && h.textContent.trim().length > 0) {
        headingElem = h;
        break;
      }
    }
  }

  // Compose table: header, image, heading (must fill all rows)
  const cells = [
    ['Hero'],
    [pictureElem || ''],
    [headingElem || '']
  ];
  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
