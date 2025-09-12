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
    // Find image container and body container
    const imageDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Defensive: ensure both exist
    if (!imageDiv || !bodyDiv) return;

    // Get the image element (use <picture> if present)
    let imageContent = null;
    const picture = imageDiv.querySelector('picture');
    if (picture) {
      imageContent = picture;
    } else {
      // fallback: use first <img> if no <picture>
      const img = imageDiv.querySelector('img');
      if (img) imageContent = img;
    }

    // Get the text content (body)
    // We want to preserve the structure: heading (strong), then description (p)
    // We'll reference the whole bodyDiv for resilience
    const textContent = bodyDiv;

    // Add the row: [image, text]
    rows.push([imageContent, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
