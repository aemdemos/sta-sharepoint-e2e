/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards block (it could be the element itself or a child)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards');
  }

  // Get all list items (cards)
  const cards = cardsBlock.querySelectorAll('ul > li');

  // Prepare table rows
  const rows = [];
  // Header - must match example exactly
  rows.push(['Cards (cards4)']);
  // For each card
  cards.forEach(card => {
    // Image cell: get the .cards-card-image div (contains picture > img)
    const imageDiv = card.querySelector('.cards-card-image');
    // Text cell: get the .cards-card-body div
    const textDiv = card.querySelector('.cards-card-body');
    // Defensive: ensure both cells exist
    rows.push([
      imageDiv || document.createElement('div'),
      textDiv || document.createElement('div')
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original wrapper with the table
  element.replaceWith(table);
  return table;
}
