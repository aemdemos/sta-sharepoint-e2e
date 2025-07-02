/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> that contains all cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Cards table: header row
  const cells = [['Cards']];

  // For each card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // 1. Image cell: use <picture> if available, otherwise <img>.
    let imageCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // 2. Body cell: copy ALL children from .cards-card-body
    let bodyCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Collect all nodes (including elements and relevant text nodes)
      // Filter out whitespace-only text nodes
      const nodes = Array.from(bodyDiv.childNodes).filter(n => {
        return n.nodeType !== Node.TEXT_NODE || n.textContent.trim();
      });
      if (nodes.length === 1) bodyCell = nodes[0];
      else if (nodes.length > 1) bodyCell = nodes;
      // If empty, leave as null
    }

    cells.push([imageCell, bodyCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
