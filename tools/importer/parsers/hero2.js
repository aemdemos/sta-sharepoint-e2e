/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero.block element. This is the main block for content extraction
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;

  // The content is typically in hero.block > div > div
  let contentRoot = heroBlock;
  const firstDiv = heroBlock.querySelector(':scope > div');
  if (firstDiv) {
    const secondDiv = firstDiv.querySelector(':scope > div');
    if (secondDiv) {
      contentRoot = secondDiv;
    } else {
      contentRoot = firstDiv;
    }
  }
  const children = Array.from(contentRoot.children);

  // 1. Find the image row (picture inside p)
  let imgCell = '';
  for (const child of children) {
    if (child.tagName === 'P' && child.querySelector('picture')) {
      imgCell = child;
      break;
    }
  }

  // 2. Title and text row (headings, paragraphs except image)
  const contentParts = [];
  for (const child of children) {
    // Include all headings
    if (/^H[1-6]$/.test(child.tagName)) {
      contentParts.push(child);
    } else if (child.tagName === 'P' && !child.querySelector('picture') && child.textContent.trim()) {
      contentParts.push(child);
    }
  }
  // If nothing found, leave as empty string for the cell
  const titleCell = contentParts.length ? contentParts : '';

  // FIX: Ensure header row is exactly 'Hero' (no variants, no extra text)
  const cells = [
    ['Hero'],
    [imgCell],
    [titleCell]
  ];

  // Create the table with the given utility
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
