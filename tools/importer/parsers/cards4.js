/* global WebImporter */
export default function parse(element, { document }) {
  // Find the core cards block, allowing for a possible wrapper
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    const found = element.querySelector('.cards.block');
    if (found) cardsBlock = found;
  }
  if (!cardsBlock) return;

  // Find the <ul> containing cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  // Gather all <li> card elements
  const cards = Array.from(ul.children);

  // Table header row: must be one cell, but table has two columns, so pad with an empty cell
  const rows = [['Cards', '']];

  // For each card, extract the image and text cell
  for (const li of cards) {
    // Image: first .cards-card-image > picture (or fallback to img)
    let imageCell = '';
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Text: all content from .cards-card-body
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      textCell = bodyDiv;
    }

    rows.push([imageCell, textCell]);
  }

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Make header span two columns for the first row
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 2) {
    firstRow.children[0].setAttribute('colspan', '2');
    firstRow.removeChild(firstRow.children[1]);
  }
  element.replaceWith(table);
}
