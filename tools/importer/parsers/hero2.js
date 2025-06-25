/* global WebImporter */
export default function parse(element, { document }) {
  // Main content is in hero.block > div > div
  const heroContentDiv = element.querySelector('.hero.block > div > div');
  if (!heroContentDiv) {
    // fallback: try direct child
    element.replaceWith(WebImporter.DOMUtils.createTable([
      ['Hero'],
      [''],
      [''],
    ], document));
    return;
  }

  // Extract <picture> (image)
  const picture = heroContentDiv.querySelector('picture');
  // Extract all h1-h6 and p (non-empty)
  const contentNodes = Array.from(heroContentDiv.childNodes)
    .filter(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Only keep non-empty headings and paragraphs
        const tag = node.tagName.toLowerCase();
        return (
          (/^h[1-6]$/).test(tag) || tag === 'p'
        ) && node.textContent.trim().length;
      }
      return false;
    });
  // Remove the <picture> if it is also in contentNodes
  const headingContent = contentNodes.filter(n => n !== picture);

  // Always provide 3 rows: header, image, heading-content
  // If image missing, cell is ''
  // If heading-content is empty, cell is ''
  const cells = [
    ['Hero'],
    [picture || ''],
    [headingContent.length ? headingContent : ''],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
