/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards block (may be wrapped)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards.block');
  }
  if (!cardsBlock) return;

  // Find all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');

  // Table header
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each card, extract image and text
  cardItems.forEach((li) => {
    // Defensive: get image container and text container
    const imageContainer = li.querySelector('.cards-card-image');
    const bodyContainer = li.querySelector('.cards-card-body');

    let imageEl = null;
    if (imageContainer) {
      // Use the <picture> element directly if present
      const picture = imageContainer.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        // fallback: use first img
        const img = imageContainer.querySelector('img');
        if (img) imageEl = img;
      }
    }
    // Defensive: if no image, leave cell empty
    const imageCell = imageEl ? imageEl : '';

    // Text cell: use the body container directly
    const textCell = bodyContainer ? bodyContainer : '';

    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
