/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero-wrapper inside the section
  const heroWrapper = element.querySelector('.hero-wrapper');
  let heroContent;
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector('.hero.block');
    if (heroBlock) {
      // The content is in heroBlock > div > div
      const deepDiv = heroBlock.querySelector('div > div');
      heroContent = deepDiv || heroBlock;
    } else {
      heroContent = heroWrapper;
    }
  } else {
    heroContent = element;
  }
  // Find the image (picture or img) among children
  let imageEl = null;
  const firstPictureOrImage = Array.from(heroContent.querySelectorAll('picture,img')).find(el => el.closest('picture') === el || el.tagName === 'IMG');
  if (firstPictureOrImage) {
    // Get the containing <picture> if it's an <img> within <picture>
    if (firstPictureOrImage.tagName === 'IMG' && firstPictureOrImage.parentElement && firstPictureOrImage.parentElement.tagName === 'PICTURE') {
      imageEl = firstPictureOrImage.parentElement;
    } else {
      imageEl = firstPictureOrImage;
    }
  }
  // Collect text content, only direct children (ignore image)
  const textEls = [];
  heroContent.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      // Only accept h1, h2, h3, p (skip if <picture> or <img>)
      if (["H1","H2","H3","P"].includes(node.tagName)) {
        // Skip empty <p>
        if (node.tagName === 'P' && !node.textContent.trim() && !node.querySelector('img,picture')) return;
        // Skip <p> only containing the image
        if (node.tagName === 'P' && (node.querySelector('img') || node.querySelector('picture'))) return;
        textEls.push(node);
      }
    }
  });
  // Defensive: If textEls is empty, try to find any heading in the block
  if (textEls.length === 0) {
    const fallbackHeadline = heroContent.querySelector('h1,h2,h3');
    if (fallbackHeadline) textEls.push(fallbackHeadline);
  }
  // Assemble the table
  const cells = [
    ['Hero'],
    [imageEl || ''],
    [textEls.length ? textEls : '']
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
