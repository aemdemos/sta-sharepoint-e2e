/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parsing
  // 1. Find the cards container
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // 2. Find all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');

  // 3. Prepare table rows
  const rows = [];
  // Header row: block name
  rows.push(['Cards (cards4)']);

  // 4. For each card, extract image and text
  cardItems.forEach((li) => {
    // Image cell: find the picture (or image)
    const imageWrapper = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageWrapper) {
      // Use the <picture> element directly if present
      const picture = imageWrapper.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        // fallback: use img if picture not present
        const img = imageWrapper.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Text cell: use the body div
    const bodyWrapper = li.querySelector('.cards-card-body');
    let textEl = null;
    if (bodyWrapper) {
      // Use the body div directly (contains title and description)
      textEl = bodyWrapper;
    }

    // Defensive: only add row if both image and text are present
    if (imageEl && textEl) {
      rows.push([imageEl, textEl]);
    }
  });

  // 5. Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace the original element with the block table
  element.replaceWith(blockTable);
}
