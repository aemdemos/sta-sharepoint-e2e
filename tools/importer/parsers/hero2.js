/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the hero block root
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) {
    heroBlock = element;
  }

  // 2. Find the innermost content wrapper
  // Look for the deepest <div> that contains the image and headings
  let contentWrapper = heroBlock;
  // Drill down to the deepest div (usually heroBlock > div > div)
  while (
    contentWrapper &&
    contentWrapper.children.length === 1 &&
    contentWrapper.children[0].tagName === 'DIV'
  ) {
    contentWrapper = contentWrapper.children[0];
  }

  // Get all direct children (elements only)
  const children = Array.from(contentWrapper.childNodes).filter(node => node.nodeType === 1);

  // 3. Find the image (typically inside <picture>)
  let imageEl = null;
  let imageWrapper = null;
  for (const child of children) {
    const picture = child.querySelector ? child.querySelector('picture') : null;
    if (picture) {
      imageEl = picture;
      imageWrapper = child;
      break;
    }
  }

  // Fallback: look for img directly if picture not found
  if (!imageEl) {
    for (const child of children) {
      const img = child.querySelector ? child.querySelector('img') : null;
      if (img) {
        imageEl = img;
        imageWrapper = child;
        break;
      }
    }
  }

  // 4. Second row: image cell (retain picture or img, including its container <p> if possible)
  let imageCell = '';
  if (imageWrapper) {
    imageCell = imageWrapper;
  } else if (imageEl) {
    imageCell = imageEl;
  } // else keep as ''

  // 5. Third row: text content (all non-image children, skipping empty nodes)
  const textEls = [];
  for (const child of children) {
    // If child contains the image element, skip it
    if (child === imageWrapper || child.contains && imageEl && child.contains(imageEl)) {
      continue;
    }
    // If the element is empty, skip
    if (child.textContent.trim() === '') continue;
    textEls.push(child);
  }
  let textCell = '';
  if (textEls.length === 1) {
    textCell = textEls[0];
  } else if (textEls.length > 1) {
    textCell = textEls;
  }

  // 6. Build table cells
  const cells = [
    ['Hero'],
    [imageCell],
    [textCell],
  ];

  // 7. Create the table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
