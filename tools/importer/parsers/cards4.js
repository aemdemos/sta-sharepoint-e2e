/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parser
  // Find the parent container holding the cards
  // Defensive: Accept either .cards.block or .cards-wrapper > .cards.block
  let cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock && element.classList.contains('cards')) {
    cardsBlock = element;
  }
  if (!cardsBlock) return;

  // Find all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  cardItems.forEach((li) => {
    // Image cell: find .cards-card-image and use its <picture> or <img>
    const imageContainer = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageContainer) {
      // Prefer <picture> if present, else <img>
      const picture = imageContainer.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        const img = imageContainer.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Text cell: find .cards-card-body and use its content
    const textContainer = li.querySelector('.cards-card-body');
    let textEl = null;
    if (textContainer) {
      // Use the whole body container for resilience
      textEl = textContainer;
    }

    // Defensive: Only add row if both image and text are present
    if (imageEl && textEl) {
      rows.push([imageEl, textEl]);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
