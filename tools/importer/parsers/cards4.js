/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the cards block (ul > li structure)
  const cardsBlock = element.querySelector('ul');
  if (!cardsBlock) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Get all card items (li)
  const cardItems = cardsBlock.querySelectorAll(':scope > li');
  cardItems.forEach((li) => {
    // Defensive: Find image container and body container
    const imageContainer = li.querySelector('.cards-card-image');
    const bodyContainer = li.querySelector('.cards-card-body');

    // Get the image (picture or img)
    let imageEl = null;
    if (imageContainer) {
      // Prefer <picture> if present, else <img>
      imageEl = imageContainer.querySelector('picture') || imageContainer.querySelector('img');
    }

    // Get the text content (body)
    let textEl = null;
    if (bodyContainer) {
      // Use the whole body container for resilience
      textEl = bodyContainer;
    }

    // Push row: [image, text]
    rows.push([imageEl, textEl]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
