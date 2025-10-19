/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parsing
  // Find the cards container
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Get all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');

  // Prepare table rows
  const rows = [];

  // Header row as required
  rows.push(['Cards (cards4)']);

  // For each card, extract image and text content
  cardItems.forEach((li) => {
    // Image cell: find the picture element inside .cards-card-image
    const imageWrapper = li.querySelector('.cards-card-image');
    let imageCell = '';
    if (imageWrapper) {
      const picture = imageWrapper.querySelector('picture');
      if (picture) {
        imageCell = picture;
      }
    }

    // Text cell: find the .cards-card-body
    const bodyWrapper = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyWrapper) {
      // Defensive: use the bodyWrapper as-is for resilience
      textCell = bodyWrapper;
    }

    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
