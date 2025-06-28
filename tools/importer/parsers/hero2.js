/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the hero-wrapper block to extract the main hero content
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (!heroWrapper) return;
  const heroBlock = heroWrapper.querySelector('.hero.block');
  if (!heroBlock) return;
  // The main content is within heroBlock's first nested div
  const blockContentDiv = heroBlock.querySelector(':scope > div > div');
  if (!blockContentDiv) return;

  // Step 2: Extract the image (picture or img)
  let imageEl = null;
  const picture = blockContentDiv.querySelector('picture');
  if (picture) {
    imageEl = picture;
  } else {
    const img = blockContentDiv.querySelector('img');
    if (img) imageEl = img;
  }

  // Step 3: Extract all content nodes except for the picture element and empty <p>s
  const contentNodes = [];
  blockContentDiv.childNodes.forEach((node) => {
    // Exclude the <picture> element (already handled)
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toLowerCase() === 'picture') return;
    // Exclude empty <p> elements
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.tagName.toLowerCase() === 'p' &&
      node.textContent.trim() === ''
    ) return;
    // Otherwise, include the node (h1, heading, non-empty p, etc)
    contentNodes.push(node);
  });

  // Step 4: Build the block table
  const cells = [];
  // Header row exactly as the spec: single column, only block name
  cells.push(['Hero']);
  // Second row: image (can be null)
  cells.push([imageEl].filter(Boolean));
  // Third row: all content nodes except image/picture and empty p
  cells.push([contentNodes]);

  // Step 5: Create block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
