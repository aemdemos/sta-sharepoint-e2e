/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual block with class 'cards block' (could be the element itself or child)
  let block = element;
  if (!block.classList.contains('block')) {
    block = element.querySelector('.cards.block');
  }
  if (!block) return;
  const ul = block.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children); // Each <li>

  const rows = [];
  // Header row exactly as specified
  rows.push(['Cards (cards4)']);

  // Card rows: image in first cell, text in second
  cards.forEach((li) => {
    // Defensive: only add row if both expected elements are present
    const imgDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');
    if (imgDiv || bodyDiv) {
      rows.push([imgDiv || '', bodyDiv || '']);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
