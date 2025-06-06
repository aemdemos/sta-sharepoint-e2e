/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards block (it may be the element itself or a child)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards.block');
  }
  if (!cardsBlock) return;

  // Find card rows (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  const rows = [['Cards (cards4)']]; // header

  cardItems.forEach((li) => {
    // Get the card image container (div.cards-card-image)
    const imgDiv = li.querySelector('.cards-card-image');
    // Get the card body container (div.cards-card-body)
    const bodyDiv = li.querySelector('.cards-card-body');
    // Defensive: If either cell is missing, treat as empty
    rows.push([
      imgDiv || document.createElement('div'),
      bodyDiv || document.createElement('div'),
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
