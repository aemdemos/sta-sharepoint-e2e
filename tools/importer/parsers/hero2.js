/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the image (picture or img) and the heading content
  // The structure is: <div><div><p><picture>...</picture></p><h1>...</h1><p></p></div></div>
  
  // Find the first descendant <picture> or <img>
  let imageEl = null;
  const picture = element.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    // fallback: find first img
    const img = element.querySelector('img');
    if (img) imageEl = img;
  }

  // Find the heading and any subheading/paragraphs
  let textContentEls = [];
  // Look for h1, h2, h3, p in direct children of the deepest div
  const innerDiv = element.querySelector('div > div');
  if (innerDiv) {
    // Collect all h1, h2, h3, h4, p in order
    const textNodes = innerDiv.querySelectorAll('h1, h2, h3, h4, p');
    textContentEls = Array.from(textNodes).filter(el => {
      // Filter out empty paragraphs
      if (el.tagName.toLowerCase() === 'p' && !el.textContent.trim() && !el.querySelector('img, picture')) {
        return false;
      }
      return true;
    });
  }

  // Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [textContentEls.length ? textContentEls : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
