/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards4) block parsing
  // 1. Find the parent container holding all cards
  // 2. For each card, extract image (mandatory) and text content (mandatory)

  // Find the UL of cards (robust to variations)
  const cardsList = element.querySelector('ul');
  if (!cardsList) return;

  // Prepare header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Get all LI elements representing cards
  const cardItems = Array.from(cardsList.children).filter(li => li.tagName === 'LI');

  cardItems.forEach((li) => {
    // Find image container and text container
    const imageContainer = li.querySelector('.cards-card-image');
    const bodyContainer = li.querySelector('.cards-card-body');

    // Defensive: If either is missing, skip this card
    if (!imageContainer || !bodyContainer) return;

    // Extract image element (use <img> inside <picture>)
    let imageEl = imageContainer.querySelector('img');
    // If no img, fallback to the whole imageContainer
    if (!imageEl) imageEl = imageContainer;

    // For text, use the whole bodyContainer (preserves structure: title, description, etc)
    rows.push([imageEl, bodyContainer]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
