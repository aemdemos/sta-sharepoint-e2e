/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block within the section
  const heroBlock = element.querySelector('.hero.block');
  let heroImage = null;
  let heroTextContent = [];

  if (heroBlock) {
    // The typical structure is: hero.block > div > div > ...
    // Find the innermost content container (usually the first div > div)
    let contentContainer = heroBlock.querySelector(':scope > div > div');
    if (!contentContainer) {
      // Fallback: hero.block > div
      contentContainer = heroBlock.querySelector(':scope > div') || heroBlock;
    }

    // Find the first <picture> element for the hero image
    heroImage = contentContainer.querySelector('picture');

    // Collect all child nodes except the <picture> and empty paragraphs
    heroTextContent = [];
    Array.from(contentContainer.childNodes).forEach((node) => {
      // Skip whitespace-only text nodes
      if (node.nodeType === 3 && !node.textContent.trim()) return;
      // Skip <picture> node
      if (node.nodeType === 1 && node.tagName === 'PICTURE') return;
      // Skip empty paragraphs
      if (node.nodeType === 1 && node.tagName === 'P' && !node.textContent.trim()) return;
      // Include everything else (headings, paragraphs, etc.)
      heroTextContent.push(node);
    });
  }

  // Table structure: [header], [image], [content]
  const cells = [
    ['Hero'],
    [heroImage || ''],
    [heroTextContent.length ? heroTextContent : '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
