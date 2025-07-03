/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block (the <ul> inside the .cards block)
  const cardsBlock = element.querySelector('.cards.block ul');
  if (!cardsBlock) return;

  const rows = [];
  // Header row - matches the example exactly
  rows.push(['Cards']);

  // For each card item (li)
  cardsBlock.querySelectorAll('li').forEach(li => {
    // Get the image container (mandatory): .cards-card-image
    const imageCell = li.querySelector('.cards-card-image');
    // Get the text content container (mandatory): .cards-card-body
    const bodyCell = li.querySelector('.cards-card-body');

    // Defensive: skip if missing image or text
    if (!imageCell || !bodyCell) return;

    // Reference the existing nodes directly
    rows.push([imageCell, bodyCell]);
  });

  // Create the Cards block table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
