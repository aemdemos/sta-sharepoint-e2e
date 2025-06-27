/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block or list of cards
  // Accept .cards-wrapper or .cards.block or <ul> as entry
  let cardsBlock = element;
  // If the element is the wrapper, find the direct .cards.block child
  if (cardsBlock.classList.contains('cards-wrapper')) {
    const inner = cardsBlock.querySelector('.cards.block');
    if (inner) cardsBlock = inner;
  }

  // Find the <ul> with the cards
  let ul = cardsBlock.querySelector('ul');
  if (!ul && cardsBlock.tagName === 'UL') ul = cardsBlock;
  if (!ul) return;

  const rows = [['Cards']];
  // For each card (li)
  for (const li of ul.children) {
    if (li.tagName !== 'LI') continue; // skip non-li
    // Image cell: prefer 'picture', fallback to 'img', fallback to image div
    let imgCell = null;
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      imgCell = imgDiv.querySelector('picture') || imgDiv.querySelector('img') || imgDiv;
    }
    // Text cell: use the whole body div
    const bodyDiv = li.querySelector('.cards-card-body');
    // If either is missing, skip this card (to avoid empty or malformed rows)
    if (!imgCell || !bodyDiv) continue;
    rows.push([imgCell, bodyDiv]);
  }
  // Only create and replace if there is at least one card row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
