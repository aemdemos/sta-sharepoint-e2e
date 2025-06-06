/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block's main content div
  const heroBlock = element.querySelector('.hero.block');
  let contentDiv = null;
  if (heroBlock) {
    // Sometimes structure is div.hero.block > div > div
    const possibleContentDiv = heroBlock.querySelector('div > div');
    if (possibleContentDiv) {
      contentDiv = possibleContentDiv;
    } else {
      // fallback if structure is just div.hero.block > div
      contentDiv = heroBlock.querySelector('div');
    }
  }

  // Extract the image (picture or img)
  let imageEl = null;
  if (contentDiv) {
    const picture = contentDiv.querySelector('picture');
    if (picture) {
      imageEl = picture;
    } else {
      // fallback if there's a plain img
      const img = contentDiv.querySelector('img');
      if (img) imageEl = img;
    }
  }

  // Extract all heading and paragraph content after the image
  let textContentEls = [];
  if (contentDiv) {
    // Get all elements after the <picture> or <img>
    const children = Array.from(contentDiv.children);
    let foundImage = false;
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (!foundImage && (child.querySelector('picture') || child.querySelector('img') || child.tagName === 'PICTURE' || child.tagName === 'IMG')) {
        foundImage = true;
        continue;
      }
      if (foundImage) {
        // Only add if it's not an empty <p>
        if (!(child.tagName === 'P' && !child.textContent.trim() && !child.querySelector('img') && !child.querySelector('picture'))) {
          textContentEls.push(child);
        }
      }
    }
    // Edge case: If image is not found, but there is text, include all text except images
    if (!foundImage) {
      textContentEls = children.filter(child => !(child.querySelector('img') || child.querySelector('picture') || child.tagName === 'IMG' || child.tagName === 'PICTURE'));
    }
  }

  // Build the rows for the hero block: header, image, text content
  const rows = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [textContentEls.length ? textContentEls : '']
  ];
  
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
