/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all cards from the provided HTML structure
  const cards = Array.from(element.querySelectorAll(':scope > div.cards > ul > li'));

  // Prepare the header row for the table
  const headerRow = ['Cards (cards4)'];

  // Prepare rows for each card
  const rows = cards.map((card) => {
    const image = card.querySelector('.cards-card-image picture');
    const body = card.querySelector('.cards-card-body');

    return [
      image, // Image or icon in the first cell
      body, // Text content (title, description, CTA) in the second cell
    ];
  });

  // Combine header and rows
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);

  return block;
}