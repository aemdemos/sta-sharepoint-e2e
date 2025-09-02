/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards block (use element if passed, or its child if .cards.block)
  let block = element;
  if (!block.classList.contains('cards')) {
    const maybeBlock = block.querySelector('.cards.block');
    if (maybeBlock) block = maybeBlock;
  }
  const ul = block.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children); // li's

  const rows = [];
  // Table header matches example exactly
  rows.push(['Cards (cards4)']);

  cards.forEach((li) => {
    // First cell: image or icon (use existing <picture> if present, else <img>)
    let imgCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imgCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }
    // Second cell: text content (reference all children as is)
    let textCell = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Collect all non-empty nodes (including elements and text)
      const nodes = Array.from(bodyDiv.childNodes).filter(node => {
        return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
      });
      // If only one node, use it directly, else array for createTable
      textCell = nodes.length === 1 ? nodes[0] : nodes;
    }
    rows.push([
      imgCell,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}