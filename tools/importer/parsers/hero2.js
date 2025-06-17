/* global WebImporter */
export default function parse(element, { document }) {
  // Get the hero content container
  let heroContent = element.querySelector('.hero.block > div > div');
  if (!heroContent) {
    heroContent = element.querySelector('.hero.block > div') || element;
  }

  // Extract the image (prefer <picture>, fallback to <img>)
  let imageEl = heroContent.querySelector('picture') || heroContent.querySelector('img');
  let imageRow = [''];
  let picParent = null;
  let imageIndex = -1;
  if (imageEl) {
    picParent = imageEl.closest('p') || imageEl;
    imageRow = [picParent];
    // Determine the image row's index for content separation
    const childrenArr = Array.from(heroContent.children);
    imageIndex = childrenArr.findIndex(child => child === picParent || child.contains(imageEl));
  }

  // Find all h1-h6 and p after the image row (support for multiple elements in the content cell)
  let contentRow = [''];
  if (imageIndex > -1) {
    const childrenArr = Array.from(heroContent.children);
    const contentCells = [];
    for (let i = imageIndex + 1; i < childrenArr.length; i++) {
      const node = childrenArr[i];
      if (((/^H[1-6]$/).test(node.tagName) || node.tagName === 'P') && node.textContent.trim()) {
        contentCells.push(node);
      }
    }
    if (contentCells.length) {
      contentRow = [contentCells.length === 1 ? contentCells[0] : contentCells];
    }
  }

  // Build the table with exactly three rows
  const table = WebImporter.DOMUtils.createTable([
    ['Hero'],
    imageRow,
    contentRow
  ], document);
  
  element.replaceWith(table);
}
