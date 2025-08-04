/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main hero content container
  let heroContentDiv = null;
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector('.hero.block');
    if (heroBlock) {
      // Drill down to inner content (div > div)
      let targetDiv = heroBlock;
      while (
        targetDiv.children.length === 1 &&
        targetDiv.firstElementChild &&
        targetDiv.firstElementChild.tagName === 'DIV'
      ) {
        targetDiv = targetDiv.firstElementChild;
      }
      heroContentDiv = targetDiv;
    }
  }
  if (!heroContentDiv) heroContentDiv = element;

  // Find the image (picture or img)
  let imageEl = heroContentDiv.querySelector('picture');
  if (!imageEl) imageEl = heroContentDiv.querySelector('img');

  // Collect all non-image, non-empty elements for text cell
  const textElements = [];
  Array.from(heroContentDiv.children).forEach((child) => {
    // Ignore picture/img elements
    if (child.tagName === 'PICTURE' || child.tagName === 'IMG' || child.querySelector('picture, img')) return;
    // Only include non-empty elements
    if (child.textContent && child.textContent.trim().length > 0) {
      textElements.push(child);
    }
  });

  // Compose the table rows
  const headerRow = ['Hero'];
  const imageRow = [imageEl || ''];
  const textRow = [textElements.length > 1 ? textElements : textElements[0] || ''];
  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}