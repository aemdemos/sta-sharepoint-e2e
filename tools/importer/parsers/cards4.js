/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we operate on the actual cards block
  let block = element;
  if (block.classList.contains('cards-wrapper')) {
    const inner = block.querySelector(':scope > .cards.block');
    if (inner) block = inner;
  }

  // Find all cards in the block
  const ul = block.querySelector('ul');
  const lis = ul ? Array.from(ul.children) : [];

  const rows = [['Cards (cards4)']]; // Header exactly as in example

  lis.forEach(li => {
    // Each card
    const imageDiv = li.querySelector(':scope > .cards-card-image');
    const bodyDiv = li.querySelector(':scope > .cards-card-body');
    if (imageDiv && bodyDiv) {
      rows.push([imageDiv, bodyDiv]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
