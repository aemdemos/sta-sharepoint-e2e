/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .cards.block container
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock && element.classList.contains('cards') && element.classList.contains('block')) {
    cardsBlock = element;
  }
  if (!cardsBlock) return;

  // Get all <li> elements (cards)
  const cards = cardsBlock.querySelectorAll('ul > li');

  // Table header, exactly as in example
  const table = [['Cards (cards4)']];

  // Each card: first cell is the image (<picture>), second cell is the body (all text)
  cards.forEach((card) => {
    // Image cell: find the .cards-card-image > picture or img
    let image = null;
    const imgDiv = card.querySelector('.cards-card-image');
    if (imgDiv) {
      image = imgDiv.querySelector('picture') || imgDiv.querySelector('img');
    }

    // Body cell: reference the existing .cards-card-body element
    const bodyDiv = card.querySelector('.cards-card-body');
    
    // Defensive: if either cell is missing, create a fallback cell
    table.push([
      image || '',
      bodyDiv || ''
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(table, document);
  // Replace the element in the DOM
  element.replaceWith(block);
}
