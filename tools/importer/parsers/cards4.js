/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parser
  // Find the cards block container
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Find all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Prepare the table rows
  const rows = [];
  // Header row as required
  rows.push(['Cards (cards4)']);

  // For each card, extract image and text content
  cardItems.forEach((li) => {
    // Image cell: find the image inside .cards-card-image
    const imageContainer = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageContainer) {
      // Use the <img> element directly
      imageEl = imageContainer.querySelector('img');
    }

    // Text cell: find the body inside .cards-card-body
    const bodyContainer = li.querySelector('.cards-card-body');
    let textContent = [];
    if (bodyContainer) {
      // Collect all children (usually <p> elements)
      textContent = Array.from(bodyContainer.children);
    }

    // Defensive: ensure image and text are present
    if (imageEl && textContent.length) {
      rows.push([imageEl, textContent]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
