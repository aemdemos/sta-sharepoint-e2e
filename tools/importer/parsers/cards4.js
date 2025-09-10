/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the cards block (could be the element itself or a child)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards')) {
    cardsBlock = element.querySelector('.cards');
  }
  if (!cardsBlock) return;

  // Find all card items (li elements)
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const tableRows = [headerRow];

  // For each card, extract image and body content
  cardItems.forEach((li) => {
    // Defensive: find image container and body container
    const imgDiv = li.querySelector('.cards-card-image');
    const bodyDiv = li.querySelector('.cards-card-body');

    // Use the picture or img element directly for the image cell
    let imageCell = '';
    if (imgDiv) {
      // Prefer <picture> if present, else <img>
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Use the body div directly for the text cell
    let textCell = '';
    if (bodyDiv) {
      textCell = bodyDiv;
    }

    tableRows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
