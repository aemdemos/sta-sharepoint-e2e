/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing all cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Each <li> is a card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image container
    const imgDiv = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imgDiv) {
      // Use the <picture> element directly if present
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        // Fallback: use first <img> if no <picture>
        const img = imgDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Find body container
    const bodyDiv = li.querySelector('.cards-card-body');
    let textEl = null;
    if (bodyDiv) {
      // Use the body div directly for all text content
      textEl = bodyDiv;
    }

    // Only add row if both image and text are present
    if (imageEl && textEl) {
      rows.push([imageEl, textEl]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
