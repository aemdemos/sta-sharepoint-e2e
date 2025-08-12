/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main content block
  // The HTML structure is: element > div.hero-wrapper > div.hero.block > div > div
  // Defensive extraction in case of variations

  // Step 1: Find the deepest div containing actual content
  let contentDiv = element;
  const heroWrapper = element.querySelector(':scope > div.hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector(':scope > div.hero.block');
    if (heroBlock) {
      // Usually: heroBlock > div > div
      let innerDiv = heroBlock;
      const blockDiv1 = heroBlock.querySelector(':scope > div');
      if (blockDiv1) {
        const blockDiv2 = blockDiv1.querySelector(':scope > div');
        if (blockDiv2) {
          innerDiv = blockDiv2;
        } else {
          innerDiv = blockDiv1;
        }
      }
      contentDiv = innerDiv;
    } else {
      contentDiv = heroWrapper;
    }
  }

  // Step 2: Extract image element (picture or img)
  let imageEl = null;
  imageEl = contentDiv.querySelector('picture, img');

  // Step 3: Extract all heading, subheading, CTA, and paragraphs after image
  // We'll collect all h1, h2, h3, h4, p, a in order, but only after the image
  let textEls = [];
  let foundImage = false;
  for (const node of contentDiv.childNodes) {
    if (!foundImage && node.nodeType === 1 && (node.tagName === 'PICTURE' || node.tagName === 'IMG' || node.querySelector && (node.querySelector('picture') || node.querySelector('img'))) ) {
      foundImage = true;
      continue;
    }
    if (foundImage && node.nodeType === 1) {
      // Only add heading tags, paragraphs, and links
      if (/^H[1-6]$/.test(node.tagName) || node.tagName === 'P' || node.tagName === 'A') {
        // Only include non-empty elements
        if (node.textContent.trim() || node.tagName === 'A') {
          textEls.push(node);
        }
      }
    }
  }
  // If nothing found after image, fallback: collect all headings, paragraphs, links
  if (textEls.length === 0) {
    textEls = Array.from(contentDiv.querySelectorAll('h1, h2, h3, h4, p, a'));
    // Remove image/empty paragraphs if present
    textEls = textEls.filter((el) => {
      if (el.querySelector('picture, img')) return false;
      if (el.tagName === 'P' && !el.textContent.trim()) return false;
      return true;
    });
  }

  // Step 4: Compose the block table
  const cells = [
    ['Hero'], // Header as defined in example
    [imageEl], // Image row
    [textEls] // Content row (array of elements)
  ];

  // Step 5: Create table and replace
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
