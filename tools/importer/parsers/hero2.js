/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block's core content
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;

  // Drill down to the innermost content div
  let innermost = heroBlock;
  while (
    innermost &&
    innermost.children.length === 1 &&
    innermost.firstElementChild.tagName === 'DIV'
  ) {
    innermost = innermost.firstElementChild;
  }

  // Find all direct children of innermost
  const children = Array.from(innermost.children);

  // Find the picture or img (background image)
  let imageCell = null;
  let imageEl = null;
  for (const child of children) {
    if (child.tagName === 'PICTURE') {
      imageEl = child;
      break;
    } else if (child.tagName === 'P' && child.querySelector('picture')) {
      imageEl = child.querySelector('picture');
      imageCell = child;
      break;
    }
  }
  // If found, and not already in a <p>, wrap in <p>
  if (imageEl && !imageCell) {
    const p = document.createElement('p');
    p.appendChild(imageEl);
    imageCell = p;
  }

  // All non-image content except empty <p> tags
  const contentEls = [];
  for (const child of children) {
    // Exclude the image cell or its parent <p>
    if (
      (imageCell && child === imageCell) ||
      (imageEl && child === imageEl) ||
      (imageEl && child.contains && child.contains(imageEl))
    ) {
      continue;
    }
    // Filter out empty <p> tags
    if (child.tagName === 'P' && !child.textContent.trim()) continue;
    contentEls.push(child);
  }

  // Structure table as per block spec: 1 column, 3 rows
  const cells = [];
  // Header row
  cells.push(['Hero']);
  // Background image row
  cells.push([imageCell || '']);
  // Content row (always combine all content in a single cell, even if only one element)
  cells.push([contentEls.length > 0 ? contentEls : '']);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
