/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the .cards block inside the wrapper
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Find all card <li> elements
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Table header row as required
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // For each card, extract image and text content
  cardItems.forEach((li) => {
    // Defensive: find image container and body container
    const imageContainer = li.querySelector('.cards-card-image');
    const bodyContainer = li.querySelector('.cards-card-body');

    // Get the image element (use <img> only)
    let imgEl = null;
    if (imageContainer) {
      const img = imageContainer.querySelector('img');
      if (img) imgEl = img;
    }

    // Get the text content (title and description)
    let textEls = [];
    if (bodyContainer) {
      // Title: <p><strong>...</strong></p>
      const titleP = bodyContainer.querySelector('p strong');
      if (titleP && titleP.parentElement) {
        textEls.push(titleP.parentElement);
      }
      // Description: next <p> sibling after title
      const descP = bodyContainer.querySelectorAll('p');
      if (descP.length > 1) {
        textEls.push(descP[1]);
      }
    }

    // Build the row: [image, text]
    // Defensive: always provide something in each cell
    const row = [imgEl || '', textEls.length ? textEls : ''];
    rows.push(row);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
