/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block (the actual cards container)
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Get all card <li> elements
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Prepare the table rows
  const rows = [];
  // Header row as per spec
  rows.push(['Cards (cards4)']);

  // For each card, extract image (first cell) and text (second cell)
  cardItems.forEach((li) => {
    // Image cell: find the first <img> inside .cards-card-image
    const imageDiv = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }
    // If image is inside a <picture>, use the <picture> element
    let imageCell = null;
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      imageCell = picture ? picture : (imageEl ? imageEl : '');
    }

    // Text cell: use the .cards-card-body div (contains title and description)
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyDiv) {
      // Use the entire bodyDiv for robustness
      textCell = bodyDiv;
    }

    rows.push([imageCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
