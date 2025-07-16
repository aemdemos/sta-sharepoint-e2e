/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main content div that contains the hero info
  let contentDiv = element;
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector('.hero.block');
    if (heroBlock) {
      // heroBlock usually contains a div > div nesting for content
      const nestedDiv = heroBlock.querySelector(':scope > div > div');
      if (nestedDiv) {
        contentDiv = nestedDiv;
      } else {
        const fallbackDiv = heroBlock.querySelector(':scope > div');
        if (fallbackDiv) contentDiv = fallbackDiv;
      }
    }
  }

  // Find the <picture> for the image row (if present)
  let imgRow = '';
  const picture = contentDiv.querySelector('picture');
  if (picture) {
    imgRow = picture;
  }

  // For the text/content row, gather all block-level elements except the <picture>
  const contentEls = [];
  contentDiv.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      // Skip image-containing paragraphs
      if (node.tagName === 'P' && node.querySelector('picture')) return;
      // Add all headings and paragraphs (and others, if any)
      contentEls.push(node);
    }
  });

  // Build the block table
  const cells = [
    ['Hero'],
    [imgRow],
    [contentEls.length ? contentEls : '']
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
