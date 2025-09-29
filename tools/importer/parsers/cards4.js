/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the .cards block inside the wrapper
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Find all <li> inside the block (each card)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Header row as required
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  cardItems.forEach((li) => {
    // Find image/icon (mandatory)
    const imageDiv = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageDiv) {
      // Use the <picture> or <img> directly
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        // fallback to img if no picture
        const img = imageDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Find text content (mandatory)
    const bodyDiv = li.querySelector('.cards-card-body');
    let textContent = null;
    if (bodyDiv) {
      // Use the bodyDiv as-is (contains <p><strong>...</strong></p> and <p>desc</p>)
      textContent = Array.from(bodyDiv.childNodes);
    }

    // Defensive: ensure both image and text exist
    if (imageEl && textContent) {
      rows.push([imageEl, textContent]);
    }
  });

  // Create the table and replace the block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
