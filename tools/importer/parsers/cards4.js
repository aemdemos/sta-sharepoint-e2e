/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards block (could be element itself or child)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards.block');
  }
  if (!cardsBlock) return;

  // Find all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');

  // Header row per block spec
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each card, extract image (first cell) and text (second cell)
  cardItems.forEach((li) => {
    // Defensive: find image container and body
    const imageDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');
    let imageEl = null;
    if (imageDiv) {
      // Use the <picture> or <img> directly
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Defensive: for text, use the body div directly
    let textEl = null;
    if (bodyDiv) {
      textEl = bodyDiv;
    }

    // Only add row if both image and text are present
    if (imageEl && textEl) {
      rows.push([imageEl, textEl]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
