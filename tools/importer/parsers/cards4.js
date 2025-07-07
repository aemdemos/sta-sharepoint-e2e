/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> of cards (robust to variations)
  const ul = element.querySelector('ul');
  if (!ul) return;

  const rows = [];
  // Table header must match example exactly
  rows.push(['Cards']);

  // Process each <li> as a card row
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // First column: image or icon
    let imageCell = null;
    const imgContainer = li.querySelector('.cards-card-image');
    if (imgContainer) {
      // Use the <picture> if available, else <img>
      const picture = imgContainer.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imgContainer.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Second column: text content (title, description, etc.)
    let textCell = null;
    const bodyContainer = li.querySelector('.cards-card-body');
    if (bodyContainer) {
      // Reference the body container directly for resilience
      textCell = bodyContainer;
    }
    rows.push([imageCell, textCell]);
  });

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
