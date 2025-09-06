/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards block (may be nested)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards.block');
    if (!cardsBlock) return;
  }

  // Find all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each card, extract image and body
  cardItems.forEach((li) => {
    // Defensive: get image container and body container
    const imageContainer = li.querySelector('.cards-card-image');
    const bodyContainer = li.querySelector('.cards-card-body');

    // Defensive: get the image element (picture or img)
    let imageEl = null;
    if (imageContainer) {
      // Prefer <picture> if present, else <img>
      imageEl = imageContainer.querySelector('picture') || imageContainer.querySelector('img');
    }

    // Defensive: get the body content (title + description)
    // We'll reference the whole bodyContainer for resilience
    let bodyEl = null;
    if (bodyContainer) {
      bodyEl = bodyContainer;
    }

    // Only add row if both image and body are present
    if (imageEl && bodyEl) {
      rows.push([imageEl, bodyEl]);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
