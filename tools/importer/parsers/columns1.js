/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row exactly as specified in the example
  rows.push(['Columns']);

  // Extract cards and their content dynamically
  const cards = element.querySelectorAll('li');

  // Validate and process each card, ensuring all content is included
  if (cards.length > 0) {
    Array.from(cards).forEach((card) => {
      const cardImageContainer = card.querySelector('img');
      const cardImage = document.createElement('img');
      if (cardImageContainer) {
        cardImage.src = cardImageContainer.src;
        cardImage.alt = cardImageContainer.alt || '';
      }

      const cardBodyContainer = card.querySelector('.cards-card-body');
      const cardText = document.createElement('div');
      if (cardBodyContainer) {
        cardText.innerHTML = cardBodyContainer.innerHTML;
      }

      // Add the card content as a single row with separate cells for image and text
      rows.push([cardImage, cardText]);
    });
  }

  // Create the final table for the "Columns" block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}