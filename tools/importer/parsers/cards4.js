/* global WebImporter */
export default function parse(element, { document }) {
  // Find the UL containing the cards
  const cardsUl = element.querySelector('ul');
  if (!cardsUl) return;

  const rows = [];
  // Header row matches the example: 'Cards'
  rows.push(['Cards']);

  // For each card (li)
  Array.from(cardsUl.children).forEach((li) => {
    // Get the image cell
    let imageCell = '';
    const imgWrapper = li.querySelector('.cards-card-image');
    if (imgWrapper) {
      // Use the existing image wrapper element (usually <picture>)
      imageCell = imgWrapper;
    }
    // Get the body text cell
    let textCell = '';
    const bodyWrapper = li.querySelector('.cards-card-body');
    if (bodyWrapper) {
      // Use the entire body wrapper element (contains paragraphs, strong, etc.)
      textCell = bodyWrapper;
    }
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
