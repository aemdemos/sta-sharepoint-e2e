/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Table header row: must be exactly 'Cards' as per the example
  const cells = [['Cards']];

  lis.forEach(li => {
    // First cell: the image/icon
    let imageCell = '';
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      // Reference the <picture> if present, otherwise the <img>
      const picture = imageDiv.querySelector('picture');
      const img = imageDiv.querySelector('img');
      imageCell = picture || img || '';
    }

    // Second cell: text content (title/description/cta)
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Collect all child nodes (preserving strong, p, etc)
      // Use array to ensure elements are not cloned
      const children = Array.from(bodyDiv.childNodes).filter(node => {
        // Keep elements and non-empty text nodes
        return (node.nodeType === Node.ELEMENT_NODE) || (node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      });
      textCell = children;
    }
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
