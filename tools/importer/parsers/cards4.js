/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parsing
  // 1. Find the parent container with all cards
  // 2. For each card, extract image and text content
  // 3. Build a table: header row, then one row per card (image, text)

  // Find the cards block container (the one with <ul><li> structure)
  const cardsBlock = element.querySelector('.cards.block ul');
  if (!cardsBlock) return;

  // Build header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Get all card <li> elements
  const cardItems = Array.from(cardsBlock.children);

  cardItems.forEach((li) => {
    // Image cell: find .cards-card-image and use the <picture> (or <img>)
    const imageContainer = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageContainer) {
      // Prefer <picture> if present, else <img>
      imageEl = imageContainer.querySelector('picture') || imageContainer.querySelector('img');
    }

    // Text cell: find .cards-card-body and use its children
    const bodyContainer = li.querySelector('.cards-card-body');
    let textEls = [];
    if (bodyContainer) {
      // Collect all child nodes (paragraphs, strong, etc.)
      textEls = Array.from(bodyContainer.childNodes).filter((node) => {
        // Only include element nodes and non-empty text nodes
        return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
      });
    }

    // Add row: [image, text]
    rows.push([
      imageEl,
      textEls,
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block table
  element.replaceWith(block);
}
