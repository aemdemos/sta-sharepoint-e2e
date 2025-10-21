/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parsing
  // Find the parent container holding all cards
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Get all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Table header row (must be a regular row with a single cell)
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  cardItems.forEach((card) => {
    // Image cell: find the image inside .cards-card-image
    const imageContainer = card.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageContainer) {
      // Use the <picture> element directly for resilience
      const picture = imageContainer.querySelector('picture');
      if (picture) imageEl = picture;
    }

    // Text cell: find the body inside .cards-card-body
    const bodyContainer = card.querySelector('.cards-card-body');
    let textEls = [];
    if (bodyContainer) {
      // Collect all children (usually <p> elements)
      textEls = Array.from(bodyContainer.children);
    }

    // Add row: [image, text]
    rows.push([
      imageEl,
      textEls
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
