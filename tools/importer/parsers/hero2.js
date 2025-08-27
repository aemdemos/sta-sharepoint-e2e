/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the hero block content - image and headline
  // Structure is ...hero-container > .hero-wrapper > .hero.block > div > div
  let contentDiv = element.querySelector('.hero-wrapper .hero.block > div > div');
  if (!contentDiv) {
    contentDiv = element.querySelector('.hero-wrapper .hero.block > div');
  }
  if (!contentDiv) {
    contentDiv = element;
  }

  // Get all direct children of contentDiv
  const children = Array.from(contentDiv.children);

  // Find the image (picture or img in a p)
  let imageEl = null;
  for (const el of children) {
    if (el.querySelector && el.querySelector('picture')) {
      imageEl = el.querySelector('picture');
      break;
    }
    if (el.tagName === 'PICTURE') {
      imageEl = el;
      break;
    }
    if (el.querySelector && el.querySelector('img')) {
      imageEl = el.querySelector('img');
      break;
    }
  }

  // Find the headline (h1-h6)
  let headingEl = null;
  for (const el of children) {
    if (/^H[1-6]$/.test(el.tagName)) {
      headingEl = el;
      break;
    }
  }
  // Fallback: look deeper if not found
  if (!headingEl) {
    headingEl = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');
  }

  // Collect all relevant content for the text row
  const textContent = [];
  if (headingEl) textContent.push(headingEl);

  // Any non-empty paragraphs that are not the image's parent
  for (const el of children) {
    if (
      el.tagName === 'P' &&
      el.textContent.trim() !== '' &&
      (!imageEl || !el.contains(imageEl))
    ) {
      textContent.push(el);
    }
  }

  // 2. Build the block table
  const headerRow = ['Hero'];
  const imageRow = [imageEl ? imageEl : ''];
  const textRow = [textContent.length ? textContent : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow,
  ], document);

  element.replaceWith(table);
}
