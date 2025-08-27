/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block inner content
  const heroBlock = element.querySelector('.hero.block');
  let imageEl = null;
  let contentEls = [];

  if (heroBlock) {
    // The text and image are typically in .hero.block > div > div
    let contentDiv = null;
    // Find the deepest content div
    const nestedDivs = heroBlock.querySelectorAll(':scope > div > div');
    if (nestedDivs.length > 0) {
      contentDiv = nestedDivs[0];
    } else {
      const firstDiv = heroBlock.querySelector(':scope > div');
      if (firstDiv) {
        contentDiv = firstDiv;
      }
    }
    if (contentDiv) {
      // Try to find the image (picture inside a <p>)
      let possibleImageP = Array.from(contentDiv.querySelectorAll('p')).find(p => p.querySelector('picture, img'));
      if (possibleImageP && (possibleImageP.querySelector('picture') || possibleImageP.querySelector('img'))) {
        imageEl = possibleImageP;
      } else {
        // fallback to just picture or img
        const anyPicture = contentDiv.querySelector('picture');
        if (anyPicture) {
          imageEl = anyPicture;
        } else {
          const anyImg = contentDiv.querySelector('img');
          if (anyImg) {
            imageEl = anyImg;
          }
        }
      }
      // Gather heading and paragraphs except the image paragraph
      contentEls = Array.from(contentDiv.children).filter(child => {
        if (imageEl && child === imageEl) return false;
        if (child.tagName === 'P' && child.textContent.trim() === '' && child.querySelector('picture, img')) return false;
        if (child.tagName === 'P' && child.textContent.trim() === '') return false;
        return /^H[1-6]$/.test(child.tagName) || child.tagName === 'P';
      });
    }
  }

  // Build table
  const cells = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [contentEls.length ? contentEls : '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
