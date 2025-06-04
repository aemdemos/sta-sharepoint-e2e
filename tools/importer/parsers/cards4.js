/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main ul that contains the cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children); // li elements

  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  cards.forEach((li) => {
    // Each li should contain .cards-card-image and .cards-card-body
    const imgDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');
    if (!imgDiv || !bodyDiv) return;
    rows.push([imgDiv, bodyDiv]); // Reference the actual existing elements
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
