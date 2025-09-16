/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Each <li> is a card
  const cards = ul.querySelectorAll(':scope > li');
  cards.forEach((li) => {
    // Defensive: get image container and body container
    const imgContainer = li.querySelector('.cards-card-image');
    const bodyContainer = li.querySelector('.cards-card-body');

    // Find the image (use the <picture> or <img> directly)
    let imageEl = null;
    if (imgContainer) {
      // Prefer <picture> if present
      const picture = imgContainer.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        // Fallback to <img>
        const img = imgContainer.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // For the text cell, use the full body container (preserves <strong>, <p>, etc)
    let textEl = null;
    if (bodyContainer) {
      textEl = bodyContainer;
    }

    // Only push row if both image and text exist
    if (imageEl && textEl) {
      rows.push([imageEl, textEl]);
    }
  });

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
