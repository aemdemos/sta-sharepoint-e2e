/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero block inside the section
  const heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) return;

  // The content is inside heroBlock > div > div
  // Defensive: find the deepest content container
  let contentDiv = heroBlock;
  const firstLevelDiv = heroBlock.querySelector(':scope > div');
  if (firstLevelDiv) {
    const secondLevelDiv = firstLevelDiv.querySelector(':scope > div');
    if (secondLevelDiv) {
      contentDiv = secondLevelDiv;
    } else {
      contentDiv = firstLevelDiv;
    }
  }

  // Background image (picture or img in a <p> or as direct child)
  let imageEl = null;
  // Try to find <picture> first
  imageEl = contentDiv.querySelector('picture');
  if (!imageEl) {
    // fallback: find <img>
    imageEl = contentDiv.querySelector('img');
  }

  // Gather text content (all elements after image)
  // Skip any paragraph that only contains the <picture> or <img>
  const textContent = [];
  contentDiv.childNodes.forEach((node) => {
    // If this is a paragraph containing only the image, skip it
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.matches('p') &&
      (node.querySelector('picture, img')) &&
      node.childNodes.length === 1
    ) {
      return;
    }
    // Ignore empty paragraphs
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.matches('p') &&
      node.textContent.trim() === ''
    ) {
      return;
    }
    // Add all non-image, non-empty content
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      !node.matches('picture') &&
      !node.matches('img')
    ) {
      textContent.push(node);
    }
  });

  // Build table rows per the required structure
  const rows = [];
  // Header row: 'Hero'
  rows.push(['Hero']);
  // Second row: background image (if present)
  rows.push([imageEl ? imageEl : '']);
  // Third row: text content (all other content)
  rows.push([textContent.length ? textContent : '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
