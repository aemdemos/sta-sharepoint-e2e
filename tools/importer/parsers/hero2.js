/* global WebImporter */
export default function parse(element, { document }) {
  // Find .hero.block or fallback to element
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;

  // Find deepest single-child div (typical pattern)
  let contentDiv = heroBlock;
  while (contentDiv && contentDiv.children.length === 1) {
    contentDiv = contentDiv.children[0];
  }
  if (!(contentDiv instanceof HTMLElement)) contentDiv = heroBlock;

  // Find first image (picture or img), track its container for removal
  let imageEl = null;
  let imageContainerIdx = -1;
  for (let i = 0; i < contentDiv.children.length; i++) {
    const child = contentDiv.children[i];
    const pic = child.querySelector && child.querySelector('picture, img');
    if (pic) {
      imageEl = pic;
      imageContainerIdx = i;
      break;
    }
  }

  // Collect all content after the image (can include h1, h2, h3, p, etc)
  const textNodes = [];
  for (let i = 0; i < contentDiv.children.length; i++) {
    if (i === imageContainerIdx) continue; // skip image's container
    const child = contentDiv.children[i];
    // skip empty <p>
    if (child.tagName === 'P' && child.textContent.trim() === '' && child.children.length === 0) {
      continue;
    }
    textNodes.push(child);
  }

  // If only one node, pass as single element; if >1, as array
  let textCell;
  if (textNodes.length === 0) {
    textCell = '';
  } else if (textNodes.length === 1) {
    textCell = textNodes[0];
  } else {
    textCell = textNodes;
  }

  const rows = [
    ['Hero'],
    [imageEl ? imageEl : ''],
    [textCell],
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
