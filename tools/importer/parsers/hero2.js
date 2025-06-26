/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block's main content
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) {
    // fallback: just use element itself
    heroBlock = element;
  }

  // Typically: .hero.block > div > div contains the main content
  let contentDiv = heroBlock.querySelector('div > div') || heroBlock;

  // Extract picture (image), heading, and possible empty p for structure
  let picture = contentDiv.querySelector('picture');
  // Only reference the existing heading (h1-h6), prefer h1 but fallback for robustness
  let heading = contentDiv.querySelector('h1, h2, h3, h4, h5, h6');

  // Build table cells
  // 1st row: Header, exactly as shown in the example (no markdown, just string 'Hero')
  // 2nd row: picture element, or empty string if missing
  // 3rd row: heading element, or empty string if missing
  const cells = [
    ['Hero'],
    [picture || ''],
    [heading || ''],
  ];

  // Create block table, referencing original elements only
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new block table
  element.replaceWith(block);
}
