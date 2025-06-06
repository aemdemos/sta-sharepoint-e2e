/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the .cards.block element or use the provided element
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) cardsBlock = element;

  // Find the <ul> containing cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  // Initialize rows for the table
  const rows = [];
  // Header row: must exactly match the required header
  rows.push(['Cards (cards4)']);

  // Process each card <li>
  ul.querySelectorAll('li').forEach((li) => {
    // Image cell (mandatory): reference the .cards-card-image div as-is
    const imgDiv = li.querySelector('.cards-card-image');
    // Text cell (mandatory): reference the .cards-card-body div as-is
    const textDiv = li.querySelector('.cards-card-body');
    // Defensive: Only add row if both image and text exist
    if (imgDiv && textDiv) {
      rows.push([imgDiv, textDiv]);
    } else if (imgDiv) {
      rows.push([imgDiv, '']);
    } else if (textDiv) {
      rows.push(['', textDiv]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
