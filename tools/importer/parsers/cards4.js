/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parsing
  // Find the parent container holding all cards
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Get all card <li> elements
  const cardItems = cardsBlock.querySelectorAll('ul > li');

  // Prepare the table rows
  const rows = [];
  // Header row as specified
  rows.push(['Cards (cards4)']);

  // For each card, extract image and text
  cardItems.forEach((card) => {
    // Image cell
    const imageContainer = card.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageContainer) {
      // Use the <picture> element directly for resilience
      const picture = imageContainer.querySelector('picture');
      if (picture) {
        imageEl = picture;
      }
    }

    // Text cell
    const bodyContainer = card.querySelector('.cards-card-body');
    let textEls = [];
    if (bodyContainer) {
      // Get all children (usually <p> elements)
      textEls = Array.from(bodyContainer.children);
    }

    // Add row: [image, text]
    rows.push([
      imageEl || '',
      textEls.length ? textEls : ''
    ]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(blockTable);
}
