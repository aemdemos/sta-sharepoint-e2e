/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row
  cells.push(['Cards (cards4)']);

  // Process each card
  const cards = element.querySelectorAll(':scope > div.cards.block > ul > li');
  cards.forEach((card) => {
    const imageContainer = card.querySelector(':scope > div.cards-card-image');
    const bodyContainer = card.querySelector(':scope > div.cards-card-body');

    let imageElement = null;
    if (imageContainer) {
      imageElement = imageContainer.querySelector('img');
    }

    let cardText = [];
    if (bodyContainer) {
      const title = bodyContainer.querySelector('p strong');
      const description = bodyContainer.querySelectorAll('p:not(:first-child)');

      if (title) {
        cardText.push(title);
      }

      description.forEach((desc) => {
        cardText.push(desc);
      });
    }

    // Push each card as a separate row
    cells.push([imageElement, cardText]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}