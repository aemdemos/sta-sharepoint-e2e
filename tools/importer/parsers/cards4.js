/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block element with cards
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards.block');
  }
  if (!cardsBlock) return;

  // Find the unordered list containing cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  // Table header row per requirements
  const rows = [['Cards']];

  // For each card (li)
  ul.querySelectorAll('li').forEach((li) => {
    // Image cell: picture or img inside .cards-card-image
    const imgDiv = li.querySelector('.cards-card-image');
    let imgEl = null;
    if (imgDiv) {
      // Prefer <picture>, fallback to <img>
      imgEl = imgDiv.querySelector('picture') || imgDiv.querySelector('img');
    }
    // Text cell: .cards-card-body
    const textDiv = li.querySelector('.cards-card-body');
    // Defensive: always reference existing elements directly
    // If nothing found, use empty string to avoid broken table
    rows.push([
      imgEl || '',
      textDiv || ''
    ]);
  });

  // Create the cards block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the entire incoming element (the wrapper)
  element.replaceWith(table);
}
