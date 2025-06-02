/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards4)']; // Define the header row

  // Helper function to extract card information
  const extractCardData = (cardElement) => {
    const imageElement = cardElement.querySelector('.cards-card-image img');
    const bodyElement = cardElement.querySelector('.cards-card-body');

    const image = imageElement ? imageElement : ''; // Ensure image is dynamically extracted
    const titleElement = bodyElement.querySelector('p strong');
    const descriptionElements = [...bodyElement.querySelectorAll('p')].filter(
      (p) => p !== titleElement?.parentElement
    );

    const title = titleElement ? titleElement.cloneNode(true) : ''; // Reference existing elements
    const description = descriptionElements.map((desc) => desc.cloneNode(true));

    return [image, [title, ...description]];
  };

  // Extract cards
  const cards = [...element.querySelectorAll(':scope > div > ul > li')].map(
    (card) => extractCardData(card)
  );

  // Combine header and card rows
  const cells = [headerRow, ...cards];

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);

  return blockTable;
}