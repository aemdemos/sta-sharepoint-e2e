/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> of cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Each <li> is a card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image container and body container
    const imgDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Defensive: ensure both exist
    if (!imgDiv || !bodyDiv) return;

    // Get the image element (use <picture> if present)
    let imageEl = null;
    const picture = imgDiv.querySelector('picture');
    if (picture) {
      imageEl = picture;
    } else {
      // fallback: find <img> directly
      const img = imgDiv.querySelector('img');
      if (img) imageEl = img;
    }

    // For text: use the whole bodyDiv (contains <p><strong>...</strong></p> and <p>desc</p>)
    // This ensures we keep formatting and are resilient to variations
    rows.push([
      imageEl,
      bodyDiv
    ]);
  });

  // Create and replace block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
