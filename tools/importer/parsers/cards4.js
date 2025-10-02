/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the inner cards block (may be wrapped)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards.block');
    if (!cardsBlock) return;
  }

  // Find all card <li> elements
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Build each card row
  cardItems.forEach((li) => {
    // Defensive: find image container and body container
    const imgContainer = li.querySelector('.cards-card-image');
    const bodyContainer = li.querySelector('.cards-card-body');

    // Find the image (use <picture> if present, otherwise <img>)
    let imageEl = null;
    if (imgContainer) {
      // Prefer <picture> for robustness
      const picture = imgContainer.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        const img = imgContainer.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Defensive: if no image found, skip this card
    if (!imageEl) return;

    // Text content: use the whole body container
    let textContent = null;
    if (bodyContainer) {
      textContent = bodyContainer;
    }

    // Defensive: if no text content, skip this card
    if (!textContent) return;

    // Add row: [image, text]
    rows.push([imageEl, textContent]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
