/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block: either element itself or its child
  let block = element;
  if (!block.classList.contains('block') || !block.classList.contains('cards')) {
    block = element.querySelector('.cards.block');
  }
  if (!block) return;
  const ul = block.querySelector('ul');
  if (!ul) return;

  // Build table rows
  const rows = [];
  rows.push(['Cards']); // Header row matches the example

  // Each card is an <li>
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image/icon cell (first cell)
    const imgDiv = li.querySelector(':scope > .cards-card-image');
    let imageCell = null;
    if (imgDiv) {
      // Use <picture> if available, else <img>
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Find text content cell (second cell)
    const bodyDiv = li.querySelector(':scope > .cards-card-body');
    let textCell = null;
    if (bodyDiv) {
      // Bring all children nodes (preserves strong, etc)
      let nodes = Array.from(bodyDiv.childNodes).filter(n => !(n.nodeType === 3 && n.textContent.trim() === ''));
      // If only one, use directly, else array
      textCell = nodes.length === 1 ? nodes[0] : nodes;
    }
    rows.push([imageCell, textCell]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
