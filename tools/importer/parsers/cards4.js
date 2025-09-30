/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards.block element
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) {
    if (element.classList.contains('cards') && element.classList.contains('block')) {
      cardsBlock = element;
    } else {
      cardsBlock = element.querySelector('.cards');
    }
  }
  if (!cardsBlock) return;

  // Find all card <li> elements
  const cardLis = cardsBlock.querySelectorAll('ul > li');
  if (!cardLis.length) return;

  // Table header row
  const rows = [
    ['Cards (cards4)']
  ];

  cardLis.forEach((li) => {
    // Image extraction
    const imgDiv = li.querySelector('.cards-card-image');
    let imgEl = null;
    if (imgDiv) {
      // Use <picture> if present, else <img>
      imgEl = imgDiv.querySelector('picture') || imgDiv.querySelector('img');
    }
    // Defensive: skip if no image
    if (!imgEl) return;

    // Text extraction
    const bodyDiv = li.querySelector('.cards-card-body');
    if (!bodyDiv) return;
    // Move all children of bodyDiv into a fragment
    const textFragment = document.createElement('div');
    Array.from(bodyDiv.childNodes).forEach((node) => {
      textFragment.appendChild(node.cloneNode(true));
    });
    // If only one child, use it directly; else use all children as array
    const textCell = textFragment.childNodes.length === 1 ? textFragment.firstChild : Array.from(textFragment.childNodes);

    rows.push([
      imgEl,
      textCell
    ]);
  });

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
