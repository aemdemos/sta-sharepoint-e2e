/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the hero content block (image and text)
  // The structure is: .hero-container > .hero-wrapper > .hero.block > div > div
  let heroContentDiv = element.querySelector('.hero-wrapper .hero.block > div > div');
  if (!heroContentDiv) {
    // fallback if structure changes
    heroContentDiv = element.querySelector('.hero-wrapper .hero.block > div') || element;
  }

  // 2. Find the image (inside <picture>)
  let imageCell = null;
  // Some sites wrap <picture> in a <p>, so search for picture inside any p
  let pictureEl = null;
  const allParagraphs = Array.from(heroContentDiv.querySelectorAll('p'));
  for (const p of allParagraphs) {
    const pic = p.querySelector('picture');
    if (pic) {
      pictureEl = pic;
      break;
    }
  }
  // Fallback: direct child <picture>
  if (!pictureEl) {
    pictureEl = heroContentDiv.querySelector('picture');
  }
  if (pictureEl) {
    imageCell = pictureEl;
  }

  // 3. Find all headings and paragraphs AFTER image
  // We want to preserve heading levels and order
  // We'll get all children after the image paragraph (or the picture itself)
  let contentCell = [];
  let foundImage = false;
  const children = Array.from(heroContentDiv.children);
  for (const child of children) {
    // If this <p> contains the <picture>, this is the image row
    if (child.querySelector && child.querySelector('picture')) {
      foundImage = true;
      continue;
    }
    if (foundImage) {
      // Only include headings and paragraphs
      if (/^h[1-6]$/i.test(child.tagName) || child.tagName === 'P') {
        // Only add if there's content (skip empty <p>)
        if (child.textContent.trim() || child.children.length) {
          contentCell.push(child);
        }
      }
    }
  }
  // If we haven't found anything, fallback to any <h1>-<h3> and <p> without <picture>
  if (contentCell.length === 0) {
    contentCell = children.filter((el) => {
      if (el.querySelector && el.querySelector('picture')) return false;
      return /^h[1-6]$/i.test(el.tagName) || el.tagName === 'P';
    }).filter((el) => el.textContent.trim() || el.children.length);
  }

  // 4. Compose the table rows
  // Header: exactly 'Hero'
  // Row 1: image (can be null)
  // Row 2: headings and paragraphs (can be empty array)
  const cells = [
    ['Hero'],
    [imageCell],
    [contentCell.length > 0 ? contentCell : ''],
  ];

  // 5. Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // 6. Replace the element in place
  element.replaceWith(block);
}
