/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Table header row as required
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each card <li>
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Find image/icon (first cell)
    const imageContainer = li.querySelector('.cards-card-image');
    let imageCell = '';
    if (imageContainer) {
      // Use the <picture> or <img> directly
      const picture = imageContainer.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        // fallback: just use the image
        const img = imageContainer.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Find text content (second cell)
    const bodyContainer = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyContainer) {
      // Use the entire body container (preserves <p>, <strong>, etc)
      textCell = bodyContainer;
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
