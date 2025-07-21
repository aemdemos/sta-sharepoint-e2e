/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero.block element
  const heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) return;

  // The content is under hero.block > div > div
  let contentDiv = heroBlock.querySelector('div > div');
  if (!contentDiv) contentDiv = heroBlock;

  // Find the <picture> for the background image (if present)
  let imageEl = null;
  const pWithPicture = contentDiv.querySelector('p > picture');
  if (pWithPicture) {
    imageEl = pWithPicture.parentElement;
  } else {
    // fallback if picture is not wrapped in <p>
    const directPicture = contentDiv.querySelector('picture');
    if (directPicture) {
      imageEl = directPicture;
    }
  }

  // Get all direct children of contentDiv
  const childNodes = Array.from(contentDiv.childNodes);
  // Remove the image element from the content row (if present)
  let contentNodes = childNodes.filter(node =>
    node !== imageEl &&
    // remove empty text nodes
    !(node.nodeType === 3 && node.textContent.trim() === '') &&
    // remove empty <p>
    !(node.nodeType === 1 && node.tagName === 'P' && node.textContent.trim() === '')
  );

  // Build table rows
  const headerRow = ['Hero'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentNodes.length ? contentNodes : ''];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
